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
    definitionVersionId:'PARITY-'+angle+(spotDemand?'-SPOT':'-NO-SPOT'),
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

const withSpot=input(30);
const browserSpot=browserStore.evaluate(withSpot);
const directSpot=directMaterial(withSpot);
assert.equal(browserSpot.rawEvaluation.status,directSpot.status);
assert.equal(browserSpot.rawEvaluation.status,'UNRESOLVED');
assert.ok(browserSpot.priceCompleteness.unresolvedConditions.includes('SPOT_TOOL_POINT_GEOMETRY_REQUIRED'));
assert.ok(browserSpot.priceCompleteness.unresolvedConditions.includes('SPOT_CYCLE_TIME_APPLICABILITY_UNRESOLVED'));
assert.equal(browserSpot.mappedCallInputs.definition.spotOperation.operationContract,'SPOT_ON_LOCATION/0.2');
assert.equal(browserSpot.mappedCallInputs.definition.spotOperation.toolDiameterIn,0.1875);
assert.equal(browserSpot.mappedCallInputs.definition.spotOperation.fullDiameterPenetrationIn,0.1875);
assert.equal(browserSpot.mappedCallInputs.definition.spotOperation.depthReference,'ENTRY_SURFACE_ALONG_DRILL_AXIS');
assert.equal(browserSpot.mappedCallInputs.definition.spotOperation.pointGeometryStatus,'UNRESOLVED');
assert.equal(browserSpot.mappedCallInputs.definition.spotOperation.totalTipPenetrationIn,null);

const directSpotEstimate=pricing.estimateBoardSequence(catalog,{
  title:'User-defined Board · 60 in workpiece',
  classId:'app.user-defined-board.v1',
  storeSku:directSpot.storeSku,
  qty:1,
  definedWorkpieceLengthIn:60,
  sawCuts:3,
  sawAngleDeg:30,
  drillCycles:0,
  spotCycles:2,
  drillReferenceDepthIn:0
});
assert.equal(browserSpot.rawEstimate.status,directSpotEstimate.status);
assert.equal(browserSpot.rawEstimate.totals.Q,directSpotEstimate.totals.Q);
assert.equal(browserSpot.rawEstimate.totals.Q,54.29);
assert.equal(browserSpot.rawEstimate.cycle.T_job_min,directSpotEstimate.cycle.T_job_min);
assert.equal(browserSpot.rawEstimate.cycle.T_job_min,9.694);

for(const angle of [30,45]){
  const request=input(angle,null);
  const browser=browserStore.evaluate(request);
  const direct=directMaterial(request);
  assert.equal(direct.status,'MAPPED');
  assert.equal(browser.rawEvaluation.status,direct.capability.status,angle+' degree browser/Store disposition drift');
  assert.equal(browser.rawEvaluation.status,'SUPPORTABLE');
  const directEstimate=pricing.estimateBoardSequence(catalog,{
    title:'User-defined Board · 60 in workpiece',
    classId:'app.user-defined-board.v1',
    storeSku:direct.storeSku,
    qty:1,
    definedWorkpieceLengthIn:60,
    sawCuts:3,
    sawAngleDeg:angle,
    drillCycles:0,
    spotCycles:0,
    drillReferenceDepthIn:0
  });
  assert.equal(browser.rawEstimate.totals.Q,directEstimate.totals.Q);
  assert.equal(browser.rawEstimate.cycle.T_job_min,directEstimate.cycle.T_job_min);
  assert.equal(browser.priceCompleteness.status,'COMPLETE_FOR_ENCODED_DEMAND');
}

const over=input(46,null);
const overBrowser=browserStore.evaluate(over);
const overDirect=directMaterial(over);
assert.equal(overDirect.status,'REFUSED');
assert.equal(overBrowser.rawEvaluation.status,'REFUSED');
assert.equal(overBrowser.rawEstimate,null);

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
assert.ok(directMissingReasons.includes('SPOT_TOOL_POINT_GEOMETRY_REQUIRED'));
assert.ok(missingBrowser.priceCompleteness.unresolvedConditions.includes('SPOT_LOCATION_REQUIRED'));
assert.ok(missingBrowser.priceCompleteness.unresolvedConditions.includes('SPOT_TOOL_POINT_GEOMETRY_REQUIRED'));

const noSpot=input(30,null);
const noSpotBrowser=browserStore.evaluate(noSpot);
assert.equal(noSpotBrowser.mappedCallInputs.definition.spotDemand,null);
assert.equal(noSpotBrowser.mappedCallInputs.definition.spotOperation,null);
assert.equal(noSpotBrowser.mappedCallInputs.estimate.spotCycles,0);

console.log('PASS · generated User 1 browser Store matches exact depth-defined pinned Store behavior');
