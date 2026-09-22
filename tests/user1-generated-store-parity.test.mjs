import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import vm from 'node:vm';

const STORE_PIN='34d4c6e7a2cb7e4bce428e396c7d7cbf228d20b7';
const storeRoot=process.env.STB_STORE_ZERO_ROOT;
assert.ok(storeRoot,'STB_STORE_ZERO_ROOT is required for parity acceptance');

const store=await import(pathToFileURL(resolve(storeRoot,'store-zero-stage2-store.mjs')).href);
const catalog=store.loadCatalog();

const sandbox={window:{}};
vm.runInNewContext(readFileSync('stb-store-zero-user1.generated.js','utf8'),sandbox,{filename:'stb-store-zero-user1.generated.js'});
const browserStore=sandbox.window.STBStoreZeroUser1;
assert.ok(browserStore);
assert.equal(browserStore.storePin,STORE_PIN);

function centeredSpot(length,quantity){
  return {
    required:true,
    mode:'SPOT_ON_LOCATION',
    countPerPart:1,
    totalCount:quantity,
    locationRule:'CENTERED_ON_PART',
    locationAlongLengthIn:length/2,
    acrossWidthRule:'CENTERED_ON_WIDE_FACE'
  };
}

function input({length=16,quantity=2,angle=30,spot=true}={}){
  return {
    definitionVersionId:'PARITY-'+length+'-'+quantity+'-'+angle+'-'+(spot?'SPOT':'NO-SPOT'),
    materialDemand:{species:'spf',form:'board',nominalT:2,nominalW:4},
    finishedPartLengthIn:length,
    quantity,
    sawAngleDeg:angle,
    drillCycles:0,
    drillDepthIn:null,
    requiredOps:[angle===0?'CROSSCUT':'MITER_LIMITED'],
    cutPlane:'miter-face',
    endIdentity:'both',
    endRelation:'parallel',
    lengthDatum:'long-long-outer-edge',
    spotDemand:spot?centeredSpot(length,quantity):null,
    unresolvedConditions:[]
  };
}

function directMaterial(request){
  return store.resolveBoardMaterial(catalog,{
    ...request.materialDemand,
    finishedPartLengthIn:request.finishedPartLengthIn,
    quantity:request.quantity,
    requiredOps:request.requiredOps,
    sawAngleDeg:request.sawAngleDeg,
    cutPlane:request.cutPlane,
    endIdentity:request.endIdentity,
    endRelation:request.endRelation,
    lengthDatum:request.lengthDatum,
    spotDemand:request.spotDemand
  });
}

for(const angle of [30,45,46]){
  const request=input({angle,spot:false});
  const browser=browserStore.evaluate(request);
  const direct=directMaterial(request);
  const directDisposition=direct.status==='MAPPED' ? direct.capability.status : direct.status;
  assert.equal(
    browser.rawEvaluation.status,
    directDisposition,
    (angle===46?'FAULT_TARGET_46_DEGREE_MITER_REFUSAL · ':'')+angle+' degree browser/Store disposition drift'
  );
  if(angle<=45){
    assert.equal(browser.rawEvaluation.status,'SUPPORTABLE');
    assert.equal(browser.priceCompleteness.status,'COMPLETE_FOR_ENCODED_DEMAND');
  }else{
    assert.equal(browser.rawEvaluation.status,'REFUSED','FAULT_TARGET_46_DEGREE_MITER_REFUSAL');
    assert.equal(browser.rawEstimate,null);
  }
}

const noSpotRequest=input({spot:false});
const noSpotBrowser=browserStore.evaluate(noSpotRequest);
const noSpotDirect=directMaterial(noSpotRequest);
assert.equal(noSpotBrowser.rawEvaluation.status,'SUPPORTABLE');
assert.equal(noSpotDirect.status,'MAPPED');
assert.equal(noSpotBrowser.materialResolution.pricingReferenceSku,'STB-ZERO-SPF-2X4-72-001');
assert.equal(noSpotBrowser.materialResolution.pricingReferenceStockLengthIn,72);
assert.equal(noSpotBrowser.materialResolution.parentCount,1);
assert.equal(noSpotBrowser.materialResolution.plan.intermediateBlank,null);
assert.equal(noSpotBrowser.materialResolution.plan.accounting.productionSawCuts,3);
assert.equal(noSpotBrowser.materialResolution.plan.accounting.preparationSawCuts,0);
assert.equal(noSpotBrowser.materialResolution.plan.parents[0].remainderIn,39.625);
assert.equal(noSpotBrowser.mappedCallInputs.definition.finishedPartLengthIn,16);
assert.equal(noSpotBrowser.mappedCallInputs.definition.finishedPartQuantity,2);
assert.equal(noSpotBrowser.mappedCallInputs.definition.definedWorkpieceLengthIn,undefined);
assert.equal(noSpotBrowser.mappedCallInputs.definition.spotDemand,null);
assert.equal(noSpotBrowser.mappedCallInputs.estimate.spotCycles,0);

const directNoSpotEstimate=store.estimateResolvedBoardPlan(catalog,noSpotDirect,{
  title:'User-defined Board · 2 × 16 in finished members',
  classId:'app.user-defined-board.v1',
  spotCycles:0
});
assert.equal(noSpotBrowser.rawEstimate.status,directNoSpotEstimate.status);
assert.equal(noSpotBrowser.rawEstimate.totals.material,3.13);
assert.equal(noSpotBrowser.rawEstimate.totals.cell_recovery,51.14);
assert.equal(noSpotBrowser.rawEstimate.totals.Q,54.27);
assert.equal(noSpotBrowser.rawEstimate.cycle.T_job_min,9.686);
assert.deepEqual(
  JSON.parse(JSON.stringify(noSpotBrowser.materialResolution.plan)),
  JSON.parse(JSON.stringify(noSpotDirect.plan)),
  'FAULT_TARGET_BROWSER_STORE_PLAN_DRIFT'
);

const spotRequest=input({spot:true});
const spotBrowser=browserStore.evaluate(spotRequest);
const spotDirect=directMaterial(spotRequest);
assert.equal(spotDirect.status,'MAPPED');
assert.equal(spotDirect.capability.status,'UNRESOLVED');
assert.equal(spotBrowser.rawEvaluation.status,'UNRESOLVED');
assert.equal(spotBrowser.materialResolution.pricingReferenceSku,noSpotBrowser.materialResolution.pricingReferenceSku);
assert.equal(spotBrowser.materialResolution.pricingReferenceStockLengthIn,noSpotBrowser.materialResolution.pricingReferenceStockLengthIn);
assert.equal(spotBrowser.materialResolution.plan.parents[0].remainderIn,noSpotBrowser.materialResolution.plan.parents[0].remainderIn);
assert.ok(spotBrowser.priceCompleteness.unresolvedConditions.includes('SPOT_TOOL_POINT_GEOMETRY_REQUIRED'));
assert.ok(spotBrowser.priceCompleteness.unresolvedConditions.includes('SPOT_CYCLE_TIME_APPLICABILITY_UNRESOLVED'));
assert.equal(spotBrowser.mappedCallInputs.definition.spotOperation.toolDiameterIn,0.1875);
assert.equal(spotBrowser.mappedCallInputs.definition.spotOperation.fullDiameterPenetrationIn,0.1875);
assert.equal(spotBrowser.mappedCallInputs.definition.spotOperation.pointGeometryStatus,'UNRESOLVED');
assert.equal(spotBrowser.mappedCallInputs.definition.spotOperation.totalTipPenetrationIn,null);
assert.equal(spotBrowser.rawEstimate.status,'PARTIAL_BUDGETARY_ESTIMATE');
assert.equal(spotBrowser.rawEstimate.totals.material,3.13);
assert.equal(spotBrowser.rawEstimate.totals.cell_recovery,51.14);
assert.equal(spotBrowser.rawEstimate.totals.Q,54.27);
assert.equal(spotBrowser.rawEstimate.cycle.T_job_min,9.686);

const lengthEdit=browserStore.evaluate(input({length:16.5,spot:false}));
assert.equal(lengthEdit.materialResolution.pricingReferenceStockLengthIn,72);
assert.equal(lengthEdit.materialResolution.plan.parents[0].remainderIn,38.625);
assert.equal(lengthEdit.rawEstimate.totals.Q,54.28);

const qtyEdit=browserStore.evaluate(input({quantity:4,spot:false}));
assert.equal(qtyEdit.materialResolution.pricingReferenceSku,'STB-ZERO-SPF-2X4-96-001');
assert.equal(qtyEdit.materialResolution.pricingReferenceStockLengthIn,96);
assert.equal(qtyEdit.materialResolution.plan.finishedPart.lengthIn,16);
assert.equal(qtyEdit.materialResolution.plan.finishedPart.quantity,4);
assert.equal(qtyEdit.materialResolution.plan.accounting.productionSawCuts,5);
assert.equal(qtyEdit.materialResolution.plan.accounting.preparationSawCuts,0);
assert.equal(qtyEdit.materialResolution.plan.parents[0].remainderIn,31.375);
assert.equal(qtyEdit.rawEstimate.totals.material,4.18);
assert.equal(qtyEdit.rawEstimate.totals.Q,56.18);

const missing=input({spot:true});
delete missing.spotDemand.locationAlongLengthIn;
const missingBrowser=browserStore.evaluate(missing);
assert.ok(missingBrowser.priceCompleteness.unresolvedConditions.includes('SPOT_LOCATION_REQUIRED'));

console.log('PASS · generated User 1 browser Store matches demand-driven exact Store behavior');
