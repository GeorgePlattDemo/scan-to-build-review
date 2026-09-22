import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';

const read = path => fs.readFileSync(path,'utf8');
const surface = read('three-frames.html');
const shell = read('system-build-current.html');
const generatedStoreSource = read('stb-store-zero-user1.generated.js');
const contractSource = read('stb-store-handoff-contract.js');

assert.match(surface,/id="stb-start-intent-screen"/);
assert.match(surface,/Start your own project/);
assert.match(surface,/Grab a board from the Store and tell us what you want done to it/);
assert.match(surface,/id="stb-start-bench-screen" hidden/);
assert.match(surface,/id="stb-config-length"[^>]*value="16"/);
assert.match(surface,/id="stb-config-angle"[^>]*max="89"[^>]*value="30"/);
assert.match(surface,/data-parts="2"/);
assert.match(surface,/data-parts="4"/);
assert.match(surface,/data-angle="46"/);
assert.match(surface,/Store-selected parent/);
assert.match(surface,/long-long outer edge/);
assert.equal(/supplied[- ]board|owner[- ]owned|board in the truck/i.test(surface),false);

assert.match(shell,/three-frames\.html/);
assert.match(shell,/materialSource:'STORE_SELECTED'/);
assert.match(shell,/finishedPartLengthIn:finishedLengthIn/);
assert.match(shell,/quantity:partQty/);
assert.match(shell,/operationPlan:selectedPlan/);
assert.match(shell,/selectedParentPlan:definition\.operationPlan/);
assert.equal(shell.includes('const definedWorkpieceLengthIn = 60;'),false);
assert.equal(shell.includes('parentLengthIn:definedWorkpieceLengthIn'),false);
assert.equal(shell.includes('sequenceDefinedWorkpiece({'),false);
assert.equal(shell.includes("materialSource:'STORE_ZERO'"),false);
assert.equal(shell.includes('54.29'),false);
assert.equal(shell.includes('54.82'),false);
assert.match(shell,/originalShow\.call\(win,'proof-store'\)/);
assert.match(shell,/ensureProjectJourneyPage\('proof-terms'/);
assert.match(shell,/PAYMENT<\/b><span>NOT AVAILABLE \/ NOT RECORDED/);
assert.match(shell,/CYCLE START<\/b><span>NOT AUTHORIZED/);

const sandbox = {window:{}};
vm.runInNewContext(generatedStoreSource,sandbox,{filename:'stb-store-zero-user1.generated.js'});
vm.runInNewContext(contractSource,sandbox,{filename:'stb-store-handoff-contract.js'});
const runtime=sandbox.window.STBStoreZeroUser1;
const contract=sandbox.window.STBStoreHandoffContract;
assert.ok(runtime);
assert.equal(runtime.storePin,'bc1a77297df752e32fb3687acc883a629c0b5b13');
assert.equal(contract.storeAuthority('startOwn').materialCatalogPin,runtime.storePin);
assert.equal(contract.storeAuthority('startOwn').capabilityPin,runtime.storePin);
assert.equal(contract.storeAuthority('startOwn').economicsPin,runtime.storePin);
assert.equal(contract.storeAuthority('startOwn').economicsVersion,'0.3.0');

const base={
  definitionVersionId:'STATIC-BASE',
  materialDemand:{species:'spf',form:'board',nominalT:2,nominalW:4},
  finishedPartLengthIn:16,
  quantity:2,
  sawAngleDeg:30,
  drillCycles:0,
  drillDepthIn:null,
  requiredOps:['MITER_LIMITED'],
  cutPlane:'miter-face',
  endIdentity:'both',
  endRelation:'parallel',
  lengthDatum:'long-long-outer-edge',
  spotDemand:null,
  unresolvedConditions:[]
};
const off=runtime.evaluate(base);
assert.equal(off.rawEvaluation.status,'SUPPORTABLE');
assert.equal(off.materialResolution.pricingReferenceSku,'STB-ZERO-SPF-2X4-72-001');
assert.equal(off.materialResolution.pricingReferenceStockLengthIn,72);
assert.equal(off.materialResolution.parentCount,1);
assert.equal(off.materialResolution.finishedPartLengthIn,16);
assert.equal(off.materialResolution.finishedPartQuantity,2);
assert.equal(off.materialResolution.plan.intermediateBlank,null);
assert.equal(off.materialResolution.plan.accounting.productionSawCuts,3);
assert.equal(off.materialResolution.plan.accounting.preparationSawCuts,0);
assert.equal(off.materialResolution.plan.parents[0].remainderIn,39.625);
assert.equal(off.rawEstimate.status,'BUDGETARY_ESTIMATE');
assert.equal(off.rawEstimate.totals.material,3.13);
assert.equal(off.rawEstimate.totals.cell_recovery,51.14);
assert.equal(off.rawEstimate.totals.Q,54.27);
assert.equal(off.rawEstimate.cycle.T_job_min,9.686);

const spotDemand={
  required:true,mode:'SPOT_ON_LOCATION',countPerPart:1,totalCount:2,
  locationRule:'CENTERED_ON_PART',locationAlongLengthIn:8,acrossWidthRule:'CENTERED_ON_WIDE_FACE'
};
const on=runtime.evaluate({...base,definitionVersionId:'STATIC-SPOT',spotDemand});
assert.equal(on.rawEvaluation.status,'UNRESOLVED');
assert.equal(on.materialResolution.pricingReferenceSku,off.materialResolution.pricingReferenceSku);
assert.equal(on.materialResolution.plan.parents[0].remainderIn,off.materialResolution.plan.parents[0].remainderIn);
assert.equal(on.rawEstimate.status,'PARTIAL_BUDGETARY_ESTIMATE');
assert.equal(on.rawEstimate.totals.material,3.13);
assert.equal(on.rawEstimate.totals.cell_recovery,51.14);
assert.equal(on.rawEstimate.totals.Q,54.27);
assert.ok(on.priceCompleteness.unresolvedConditions.includes('SPOT_TOOL_POINT_GEOMETRY_REQUIRED'));
assert.ok(on.priceCompleteness.unresolvedConditions.includes('SPOT_CYCLE_TIME_APPLICABILITY_UNRESOLVED'));

const quote=contract.quoteStartOwnBoardSequence({
  definitionVersionId:'CONTRACT-BASE',
  finishedPartLengthIn:16,
  quantity:2,
  sawAngleDeg:30,
  spotDemand:null
});
assert.equal(quote.total,54.27);
assert.equal(quote.complete,true);
assert.equal(quote.operationBasis.finishedPartLengthIn,16);
assert.equal(quote.operationBasis.quantity,2);
assert.equal(quote.operationBasis.selectedParentLengthIn,72);
assert.equal(quote.operationBasis.productionSawCuts,3);
assert.equal(quote.operationBasis.preparationSawCuts,0);
assert.equal(quote.plan.parents[0].remainderIn,39.625);
assert.equal(quote.source.pin,runtime.storePin);

const refused=runtime.evaluate({...base,definitionVersionId:'STATIC-46',sawAngleDeg:46});
assert.equal(refused.rawEvaluation.status,'REFUSED');
assert.ok(refused.refusalConditions.includes('MITER_ANGLE_OUTSIDE_D001_STAGE2_ENVELOPE'));
assert.equal(refused.materialResolution.finishedPartLengthIn,16);
assert.equal(refused.rawEstimate,null);

console.log('PASS · Start Your Own carries finished-member demand to Store-selected stock without a parent-length seed');
