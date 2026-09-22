import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import vm from 'node:vm';

const STORE_PIN='7303793620d0ceda509810a661d11e6c31c7d59f';
const storeRoot=process.env.STB_STORE_ZERO_ROOT;
assert.ok(storeRoot,'STB_STORE_ZERO_ROOT is required for parity acceptance');

const store=await import(pathToFileURL(resolve(storeRoot,'store-zero-stage2-store.mjs')).href);
const pricing=await import(pathToFileURL(resolve(storeRoot,'store-zero-pricing-engine.mjs')).href);
const catalog=store.loadCatalog();

const sandbox={window:{}};
vm.runInNewContext(readFileSync('stb-store-zero-user1.generated.js','utf8'),sandbox,{filename:'stb-store-zero-user1.generated.js'});
const browserStore=sandbox.window.STBStoreZeroUser1;
assert.ok(browserStore);
assert.equal(browserStore.storePin,STORE_PIN);

const centeredSpot={
  required:true,
  mode:'SPOT_ON_LOCATION',
  countPerPart:1,
  totalCount:2,
  locationRule:'CENTERED_ON_PART',
  locationAlongLengthIn:8,
  acrossWidthRule:'CENTERED_ON_WIDE_FACE'
};

function input(angle,spotDemand=centeredSpot){
  return {
    definitionVersionId:'PARITY-'+angle+'-'+(spotDemand?'SPOT':'NO-SPOT'),
    materialDemand:{species:'spf',form:'board',nominalT:2,nominalW:4},
    definedWorkpieceLengthIn:60,
    sawCuts:3,
    sawAngleDeg:angle,
    drillCycles:0,
    drillDepthIn:null,
    requiredOps:['MITER_LIMITED'],
    cutPlane:'miter-face',
    endIdentity:'both',
    endRelation:'parallel',
    lengthDatum:'long-long-outer-edge',
    spotDemand,
    unresolvedConditions:[]
  };
}

function directMaterial(request){
  return store.resolveBoardMaterial(catalog,{
    ...request.materialDemand,
    definedWorkpieceLengthIn:request.definedWorkpieceLengthIn,
    qty:1,
    requiredOps:request.requiredOps,
    sawAngleDeg:request.sawAngleDeg,
    cutPlane:request.cutPlane,
    spotDemand:request.spotDemand
  });
}

// Miter boundaries are tested with otherwise-complete demand.
for(const angle of [30,45,46]){
  const request=input(angle,null);
  const browser=browserStore.evaluate(request);
  const direct=directMaterial(request);
  const directDisposition=direct.status==='MAPPED' ? direct.capability.status : direct.status;
  assert.equal(browser.rawEvaluation.status,directDisposition,(angle===46?'FAULT_TARGET_46_DEGREE_MITER_REFUSAL · ':'')+angle+' degree browser/Store disposition drift');
  if(angle<=45){
    assert.equal(browser.rawEvaluation.status,'SUPPORTABLE');
    assert.equal(browser.priceCompleteness.status,'COMPLETE_FOR_ENCODED_DEMAND');
  }else{
    assert.equal(browser.rawEvaluation.status,'REFUSED','FAULT_TARGET_46_DEGREE_MITER_REFUSAL');
    assert.equal(browser.rawEstimate,null);
  }
}

// The default User 1 spot is depth-defined but point/cycle economics remain explicitly partial.
const spotRequest=input(30,centeredSpot);
const spotBrowser=browserStore.evaluate(spotRequest);
const spotDirect=directMaterial(spotRequest);
assert.equal(spotDirect.status,'UNRESOLVED');
assert.equal(spotBrowser.rawEvaluation.status,'UNRESOLVED');
assert.ok(spotBrowser.priceCompleteness.unresolvedConditions.includes('SPOT_TOOL_POINT_GEOMETRY_REQUIRED'));
assert.ok(spotBrowser.priceCompleteness.unresolvedConditions.includes('SPOT_CYCLE_TIME_APPLICABILITY_UNRESOLVED'));
assert.equal(spotBrowser.mappedCallInputs.definition.spotOperation.toolDiameterIn,0.1875);
assert.equal(spotBrowser.mappedCallInputs.definition.spotOperation.fullDiameterPenetrationIn,0.1875);
assert.equal(spotBrowser.mappedCallInputs.definition.spotOperation.depthReference,'ENTRY_SURFACE_ALONG_DRILL_AXIS');
assert.equal(spotBrowser.mappedCallInputs.definition.spotOperation.pointGeometryStatus,'UNRESOLVED');
assert.equal(spotBrowser.mappedCallInputs.definition.spotOperation.totalTipPenetrationIn,null);

const directSpotEstimate=pricing.estimateBoardSequence(catalog,{
  title:'User-defined Board · 60 in workpiece',
  classId:'app.user-defined-board.v1',
  storeSku:spotDirect.storeSku,
  qty:1,
  definedWorkpieceLengthIn:60,
  sawCuts:3,
  sawAngleDeg:30,
  drillCycles:0,
  spotCycles:2,
  drillReferenceDepthIn:0
});
assert.equal(spotBrowser.rawEstimate.status,directSpotEstimate.status);
assert.equal(spotBrowser.rawEstimate.totals.material,directSpotEstimate.totals.material);
assert.equal(spotBrowser.rawEstimate.totals.cell_recovery,directSpotEstimate.totals.cell_recovery);
assert.equal(spotBrowser.rawEstimate.totals.Q,directSpotEstimate.totals.Q);
assert.equal(spotBrowser.rawEstimate.cycle.T_job_min,directSpotEstimate.cycle.T_job_min);

const missing=input(30,{
  required:true,
  mode:'SPOT_ON_LOCATION',
  countPerPart:1,
  totalCount:2,
  locationRule:'CENTERED_ON_PART',
  acrossWidthRule:'CENTERED_ON_WIDE_FACE'
});
const missingBrowser=browserStore.evaluate(missing);
const missingDirect=directMaterial(missing);
const directMissingReasons=(missingDirect.considered||[]).flatMap(entry=>entry?.capability?.unresolved||[]);
assert.ok(directMissingReasons.includes('SPOT_LOCATION_REQUIRED'));
assert.ok(missingBrowser.priceCompleteness.unresolvedConditions.includes('SPOT_LOCATION_REQUIRED'));

const noSpot=input(30,null);
const noSpotBrowser=browserStore.evaluate(noSpot);
assert.equal(noSpotBrowser.rawEvaluation.status,'SUPPORTABLE');
assert.equal(noSpotBrowser.mappedCallInputs.definition.spotDemand,null);
assert.equal(noSpotBrowser.mappedCallInputs.estimate.spotCycles,0);

console.log('PASS · generated User 1 browser Store matches depth-defined exact Store behavior');
