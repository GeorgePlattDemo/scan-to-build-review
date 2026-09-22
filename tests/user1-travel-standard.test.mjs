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
assert.equal(contract.version,'0.9');
assert.equal(typeof contract.resolveUser1StoreReference,'function');
assert.equal(typeof contract.requestUser1StoreEvaluation,'function');
assert.equal(typeof contract.sameUser1StoreAnswerIdentity,'function');
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
assert.equal(exact.source.storePin,'f88ccaf9a2624899e255e66b51111e2b02309dad');
assert.equal(exact.source.workflowRun,'35768861705');
assert.equal(exact.source.systemIntegrationPin,'900dbd13f079f8a5f8d76d49c723fd35279164e8');
assert.equal(exact.calculationIdentity.inputHash,'e186df5ead47f0c3c233477b18d00206643d8e5e1adf03fdd6dabdc95a0a5168');
assert.equal(exact.calculationIdentity.resultHash,'425af5de05fb614b87ca308696d0d19af0b2701ce2f3fd51c8a6c3ca84042f4f');
assert.equal(exact.freshEvaluation,false);
assert.equal(exact.evaluationReceipt,null);

const formalA = contract.requestUser1StoreEvaluation(exactDemand,{
  requestId:'JOB1-FRESH-A',
  currentStorePin:'f88ccaf9a2624899e255e66b51111e2b02309dad',
  checkedAt:'2026-09-22T18:45:00.000Z'
});
const formalB = contract.requestUser1StoreEvaluation(exactDemand,{
  requestId:'JOB1-FRESH-B',
  currentStorePin:'f88ccaf9a2624899e255e66b51111e2b02309dad',
  checkedAt:'2026-09-22T18:46:00.000Z'
});
assert.equal(formalA.status,'CURRENT_STORE_REFERENCE_REVALIDATED');
assert.equal(formalA.complete,true);
assert.equal(formalA.freshEvaluation,true);
assert.equal(formalA.evaluationReceipt.requestId,'JOB1-FRESH-A');
assert.equal(formalB.evaluationReceipt.requestId,'JOB1-FRESH-B');
assert.notEqual(formalA.evaluationReceipt.requestId,formalB.evaluationReceipt.requestId);
assert.equal(formalA.evaluationReceipt.currentStorePin,'f88ccaf9a2624899e255e66b51111e2b02309dad');
assert.equal(formalA.evaluationReceipt.currentStoreMatchesReference,true);
assert.equal(formalA.evaluationReceipt.machineEnvelopeId,'D001-STAGE2-ENVELOPE-0.3');
assert.equal(formalA.evaluationReceipt.travelStandardId,'STB-D001-DIMENSIONAL-TRAVEL-0.1');
assert.equal(formalA.evaluationReceipt.economicsId,'STB-D001-STORE-ECONOMICS-S2-0.1');
assert.equal(formalA.calculationIdentity.inputHash,formalB.calculationIdentity.inputHash);
assert.equal(formalA.calculationIdentity.resultHash,formalB.calculationIdentity.resultHash);
assert.equal(contract.sameUser1StoreAnswerIdentity(exact,formalA),true);

const movedStore = contract.requestUser1StoreEvaluation(exactDemand,{
  requestId:'JOB1-STORE-MOVED',
  currentStorePin:'0000000000000000000000000000000000000000',
  checkedAt:'2026-09-22T18:47:00.000Z'
});
assert.equal(movedStore.status,'STORE_AUTHORITY_CHANGED');
assert.equal(movedStore.complete,false);
assert.equal(movedStore.freshEvaluation,false);
assert.deepEqual(Array.from(movedStore.unresolvedConditions),['STORE_REFRESH_REQUIRED','STORE_AUTHORITY_CHANGED']);

const noCurrentAuthority = contract.requestUser1StoreEvaluation(exactDemand,{
  requestId:'JOB1-NO-CURRENT-STORE',
  checkedAt:'2026-09-22T18:48:00.000Z'
});
assert.equal(noCurrentAuthority.status,'CURRENT_STORE_AUTHORITY_REQUIRED');
assert.equal(noCurrentAuthority.complete,false);

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
assert.match(shell,/currentStoreAuthorityUrl = 'https:\/\/api\.github\.com\/repos\/GeorgePlattDemo\/scan-to-build-store\/commits\/main'/);
assert.match(shell,/cache:'no-store'/);
assert.match(shell,/nextStoreRequestId/);
assert.match(shell,/requestUser1StoreEvaluation/);
assert.match(shell,/freshStoreAnswer\?\.evaluationReceipt\?\.requestId !== requestId/);
assert.match(shell,/sameUser1StoreAnswerIdentity/);
assert.match(shell,/STORE_ANSWER_CHANGED_RECONFIRM_REQUIRED/);
assert.equal(shell.includes('stbLastConfirmed'),false,'Store-send control regressed to one-use behavior');
assert.match(shell,/STORE_REFRESH_REQUIRED · confirmation is blocked until Store evaluates this exact revision/);
assert.match(shell,/MODELED MACHINE SERVICE/);
assert.match(shell,/machine_service/);
assert.match(shell,/calculationIdentity/);
assert.match(shell,/proof-store/);
assert.match(shell,/proof-accept/);
assert.match(shell,/proof-yard/);
assert.match(shell,/proof-terms/);
assert.match(shell,/proof-record/);
// Store authority remains real-to-the-model while downstream commerce/fulfillment is explicitly simulated.
assert.match(shell,/data-proof-sim-action="pay"/);
assert.match(shell,/SIMULATED_PAYMENT/);
assert.match(shell,/no money moved/);
assert.match(shell,/does not send controller code, command a machine, establish commissioned readiness, or create a live Cycle Start/);
assert.match(shell,/PHYSICAL FABRICATION<\/b><span>NOT CLAIMED · SIMULATION ONLY/);
assert.match(shell,/no live inventory reserved/);
assert.match(shell,/no physical production authority created/);
assert.match(shell,/no live motion or controller command/);

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
