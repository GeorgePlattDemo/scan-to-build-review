import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import vm from 'node:vm';

const STORE_PIN='ab8a4c5d470c310f27fef82683611622ab976168';
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
    definitionVersionId:'PARITY-'+angle,
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

for(const angle of [30,45,46]){
  const request=input(angle);
  const browser=browserStore.evaluate(request);
  const direct=directMaterial(request);
  const directDisposition=direct.status==='MAPPED' ? direct.capability.status : direct.status;
  assert.equal(browser.rawEvaluation.status,directDisposition,angle+' degree browser/Store disposition drift');

  if(direct.status==='MAPPED'){
    const directEstimate=pricing.estimateBoardSequence(catalog,{
      title:'User-defined Board · 60 in workpiece',
      classId:'app.user-defined-board.v1',
      storeSku:direct.storeSku,
      qty:1,
      definedWorkpieceLengthIn:60,
      sawCuts:3,
      sawAngleDeg:angle,
      drillCycles:0,
      spotCycles:2,
      drillReferenceDepthIn:0
    });
    assert.equal(browser.rawEstimate.totals.Q,directEstimate.totals.Q,angle+' degree browser/Store Q drift');
    assert.equal(browser.rawEstimate.cycle.T_job_min,directEstimate.cycle.T_job_min,angle+' degree browser/Store cycle drift');
  } else {
    assert.equal(browser.rawEstimate,null);
  }
}

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
const noSpotDirect=directMaterial(noSpot);
assert.equal(noSpotBrowser.rawEvaluation.status,noSpotDirect.capability.status);
assert.equal(noSpotBrowser.mappedCallInputs.definition.spotDemand,null);
assert.equal(noSpotBrowser.mappedCallInputs.estimate.pieces[0].spots,0);

console.log('PASS · generated User 1 browser Store matches exact pinned Store behavior');
