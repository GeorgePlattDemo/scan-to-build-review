import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';

const contractSource = fs.readFileSync('stb-store-handoff-contract.js','utf8');
const shell = fs.readFileSync('system-build-current.html','utf8');
const frame = fs.readFileSync('three-frames.html','utf8');

const sandbox = {window:{}};
vm.runInNewContext(contractSource,sandbox,{filename:'stb-store-handoff-contract.js'});
const contract = sandbox.window.STBStoreHandoffContract;

assert.ok(contract,'Store handoff contract did not load');
assert.equal(contract.version,'0.8');
assert.equal(typeof contract.resolveUser1StoreReference,'function');
assert.equal(typeof contract.quoteStartOwnBoardSequence,'undefined');

const exactDemand = {
  configurationId:'SYO-USER1-XBRACE',
  configurationVersion:'0.1',
  definedWorkpieceLengthIn:60,
  sawAngleDeg:30,
  cutPlane:'miter-face',
  endIdentity:'both',
  endRelation:'parallel',
  lengthDatum:'long-long-outer-edge',
  datumCMethod:'REFERENCE_CUT',
  requiredOps:['MITER_LIMITED','SPOT_ON_LOCATION'],
  declaredSawCuts:3,
  declaredSpotCount:2,
  parts:[
    {partId:'PART-1',lengthIn:16,features:[{featureId:'SPOT-1',kind:'SPOT_ON_LOCATION',xIn:8,locationRule:'CENTERED_ON_PART',acrossWidthRule:'CENTERED_ON_WIDE_FACE'}]},
    {partId:'PART-2',lengthIn:16,features:[{featureId:'SPOT-2',kind:'SPOT_ON_LOCATION',xIn:8,locationRule:'CENTERED_ON_PART',acrossWidthRule:'CENTERED_ON_WIDE_FACE'}]}
  ]
};

const exact = contract.resolveUser1StoreReference(exactDemand);
assert.equal(exact.status,'MATCHED_STORE_REFERENCE');
assert.equal(exact.complete,true);
assert.equal(exact.capabilityStatus,'SUPPORTABLE');
assert.equal(exact.material,3.13);
assert.equal(exact.machineService,5.89);
assert.equal(exact.combinedValue,9.02);
assert.equal(exact.estimate.cycle.T_job_min,1.4128);
assert.equal(exact.estimate.travel.derivedSawCuts,3);
assert.equal(exact.estimate.travel.derivedSpotCount,2);
assert.equal(exact.estimate.travel.finalRemainderIn,27.625);
assert.equal(exact.source.storePin,'95c639a1d0d4812df097ad1eb628594b38f921de');
assert.equal(exact.source.workflowRun,'35757052553');
assert.equal(exact.source.systemIntegrationPin,'900dbd13f079f8a5f8d76d49c723fd35279164e8');
assert.equal(exact.calculationIdentity.inputHash,'5de0367b62087cb0174ef5f1e101e22ded3728ba71906868628a985afafa078b');
assert.equal(exact.calculationIdentity.resultHash,'9ad8d16a7c211d420b83e46ed8a8d224bd289e26a48764ff8d0389b6db698604');

for (const changed of [
  {...exactDemand, configurationVersion:'0.2'},
  {...exactDemand, sawAngleDeg:31},
  {...exactDemand, definedWorkpieceLengthIn:59},
  {...exactDemand, declaredSpotCount:1},
  {...exactDemand, parts:[
    {...exactDemand.parts[0],lengthIn:17},
    exactDemand.parts[1],
  ]},
  {...exactDemand, parts:[
    {...exactDemand.parts[0],features:[{...exactDemand.parts[0].features[0],xIn:7.5}]},
    exactDemand.parts[1],
  ]},
]) {
  const answer = contract.resolveUser1StoreReference(changed);
  assert.equal(answer.status,'STORE_REFRESH_REQUIRED');
  assert.equal(answer.complete,false);
  assert.equal(answer.estimate,null);
  assert.equal(answer.combinedValue,null);
  assert.deepEqual(Array.from(answer.unresolvedConditions),['STORE_REFRESH_REQUIRED']);
}

const user1ContractStart = contractSource.indexOf('var USER1_STORE_REFERENCE');
const user1ContractEnd = contractSource.indexOf('var D001_CYCLE',user1ContractStart);
assert.ok(user1ContractStart >= 0 && user1ContractEnd > user1ContractStart);
const user1ContractBlock = contractSource.slice(user1ContractStart,user1ContractEnd);
for (const forbidden of [
  'quoteStartOwnBoardSequence',
  'machineHourRate',
  'setupCharge:35',
  'Math.cos',
  'sawTraverseIn',
]) {
  assert.equal(user1ContractBlock.includes(forbidden),false,'browser User 1 Store resolver contains forbidden local economics/motion logic: '+forbidden);
}

const syncStart = shell.indexOf('const syncDefinition = reason =>');
const syncEnd = shell.indexOf('const renderBoardGeometry = definition =>',syncStart);
assert.ok(syncStart >= 0 && syncEnd > syncStart);
const syncBlock = shell.slice(syncStart,syncEnd);
assert.match(syncBlock,/resolveUser1StoreReference/);
assert.match(syncBlock,/parts = Array\.from/);
assert.match(syncBlock,/requiredOps\.push\('SPOT_ON_LOCATION'\)/);
assert.match(syncBlock,/configurationVersion/);
for (const forbidden of [
  'quoteStartOwnBoardSequence',
  'resolveStartOwnMaterial',
  'sequenceDefinedWorkpiece',
  'machineHourRate',
  'setupCharge',
  'Math.cos',
  'angleDeg > 45',
]) {
  assert.equal(syncBlock.includes(forbidden),false,'visible configurator reclaimed Store authority: '+forbidden);
}

assert.match(shell,/definition\.storeReference\?\.complete !== true/);
assert.match(shell,/STORE_REFRESH_REQUIRED · confirmation is blocked until Store evaluates this exact revision/);
assert.match(shell,/MODELED MACHINE SERVICE/);
assert.match(shell,/machine_service/);
assert.match(shell,/calculationIdentity/);
assert.match(shell,/proof-store/);
assert.match(shell,/proof-accept/);
assert.match(shell,/proof-yard/);
assert.match(shell,/proof-terms/);
assert.match(shell,/proof-record/);
assert.match(shell,/data-job1-action="SIMULATE_PURCHASE"/);
assert.match(shell,/data-job1-yard-next/);
assert.match(shell,/data-job1-action="RECORD_PICKUP"/);
assert.match(shell,/NO REAL PAYMENT/);
assert.match(shell,/NO BLOOD ON WOOD/);
assert.match(shell,/SIMULATED PHYSICAL COMPLETION/);
assert.match(shell,/liveCommerce:false/);
assert.match(shell,/liveMotion:false/);

assert.match(frame,/Modeled machine service/);
assert.match(frame,/id="stb-config-length"[^>]*value="16"/);
assert.match(frame,/id="stb-config-angle"[^>]*value="30"/);
assert.match(frame,/2×4 · 60 in/);
assert.match(frame,/Center spot = 16 ÷ 2 = 8 in/);

const handoff = contract.createComparisonHandoff({
  projectId:'start-own',
  projectClass:'USER_DEFINED_BOARD',
  definitionId:'SYO-USER1-XBRACE-0.1',
  versionId:'SYO-USER1-XBRACE-0.1-v1',
  physicalDemand:{
    stockClass:'2x4',
    parentLengthIn:60,
    definedWorkpieceLengthIn:60,
    finishedLength:16,
    quantity:2,
    endCondition:'angled',
    straightCut:false,
    angleDegrees:30,
    angleReference:'USER_1_INTENT_IMAGE',
    cutPlane:'miter-face',
    endIdentity:'both',
    endRelation:'parallel',
    lengthDatum:'long-long-outer-edge',
    datumCMethod:'REFERENCE_CUT',
    requiredOps:['MITER_LIMITED','SPOT_ON_LOCATION'],
    declaredSawCuts:3,
    declaredSpotCount:2,
    parts:exactDemand.parts,
    spotDemand:{
      required:true,
      mode:'SPOT_ON_LOCATION',
      countPerPart:1,
      locationRule:'CENTERED_ON_PART',
      locationAlongLengthIn:8,
      acrossWidthRule:'CENTERED_ON_WIDE_FACE',
      totalCount:2,
    },
  },
  unresolvedConditions:[],
});
assert.equal(handoff.requiredGeometryDatumFacts.datumCMethod,'REFERENCE_CUT');
assert.deepEqual(Array.from(handoff.requiredGeometryDatumFacts.requiredOps),['MITER_LIMITED','SPOT_ON_LOCATION']);
assert.equal(handoff.requiredGeometryDatumFacts.declaredSawCuts,3);
assert.equal(handoff.requiredGeometryDatumFacts.declaredSpotCount,2);
assert.equal(handoff.requiredGeometryDatumFacts.identifiedParts.length,2);
assert.equal(handoff.requiredGeometryDatumFacts.identifiedParts[0].features[0].xIn,8);
assert.equal(handoff.authority.physicalFabrication,false);

console.log('PASS · User 1 visible configurator carries exact demand to a pinned Store-issued travel answer and fails closed on any changed revision');
