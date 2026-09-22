import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';

const shell=fs.readFileSync('system-build-current.html','utf8');
const frame=fs.readFileSync('three-frames.html','utf8');
const contractSource=fs.readFileSync('stb-store-handoff-contract.js','utf8');
const fulfillmentSource=fs.readFileSync('stb-job1-simulated-fulfillment.js','utf8');

const sandbox={window:{}};
vm.runInNewContext(contractSource,sandbox,{filename:'stb-store-handoff-contract.js'});
vm.runInNewContext(fulfillmentSource,sandbox,{filename:'stb-job1-simulated-fulfillment.js'});
const contract=sandbox.window.STBStoreHandoffContract;
const F=sandbox.window.STBJob1SimulatedFulfillment;

const STORE_SHA='95c639a1d0d4812df097ad1eb628594b38f921de';
const INPUT_HASH='5de0367b62087cb0174ef5f1e101e22ded3728ba71906868628a985afafa078b';
const RESULT_HASH='9ad8d16a7c211d420b83e46ed8a8d224bd289e26a48764ff8d0389b6db698604';

const exactDemand={
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
    {partId:'PART-2',lengthIn:16,features:[{featureId:'SPOT-2',kind:'SPOT_ON_LOCATION',xIn:8,locationRule:'CENTERED_ON_PART',acrossWidthRule:'CENTERED_ON_WIDE_FACE'}]},
  ],
};

const storeAnswer=contract.resolveUser1StoreReference(exactDemand);
assert.equal(storeAnswer.complete,true);
assert.equal(storeAnswer.source.storePin,STORE_SHA);
assert.equal(storeAnswer.calculationIdentity.inputHash,INPUT_HASH);
assert.equal(storeAnswer.calculationIdentity.resultHash,RESULT_HASH);
assert.equal(storeAnswer.material,3.13);
assert.equal(storeAnswer.machineService,5.89);
assert.equal(storeAnswer.combinedValue,9.02);
assert.equal(storeAnswer.estimate.cycle.T_job_min,1.4128);

// ENTRY / DEFINE / CONFIRM
assert.match(frame,/Start your own project/);
assert.match(frame,/2×4 · 60 in/);
assert.match(frame,/id="stb-config-length"[^>]*value="16"/);
assert.match(frame,/id="stb-config-angle"[^>]*value="30"/);
assert.match(frame,/Center spot = 16 ÷ 2 = 8 in/);
assert.match(shell,/resolveUser1StoreReference\(storeDemand\)/);
assert.match(shell,/initializeJob1Fulfillment\(true\)/);
assert.match(shell,/originalShow\.call\(win,'proof-store'\)/);

// Exact route order for Job 1.
const mapBlock=shell.slice(
  shell.indexOf("'start-own': Object.freeze({"),
  shell.indexOf("outdoor: Object.freeze({",shell.indexOf("'start-own': Object.freeze({"))
);
assert.match(mapBlock,/store:'proof-store'/);
assert.match(mapBlock,/review:'proof-terms'/);
assert.match(mapBlock,/request:'proof-accept'/);
assert.match(mapBlock,/yard:'proof-yard'/);
assert.match(mapBlock,/record:'proof-record'/);

// STORE REVIEW supports explicit accept / modify / decline.
assert.match(shell,/data-job1-action="STORE_RETURN_FOR_MODIFICATION"/);
assert.match(shell,/data-job1-action="STORE_DECLINE"/);
assert.match(shell,/data-job1-action="STORE_ACCEPT_AS_ASKED"/);

// OFFER / TERMS is before customer acceptance.
assert.match(shell,/OFFER \/ TERMS/);
assert.match(shell,/id="proof-terms-offer-id"/);
assert.match(shell,/data-proof-go="proof-accept">REVIEW OFFER → ACCEPT \/ PAY/);

// ACCEPT / PAY keeps acceptance and settlement separate.
assert.match(shell,/data-job1-action="CUSTOMER_ACCEPT_OFFER"/);
assert.match(shell,/data-job1-action="CUSTOMER_DECLINE_OFFER"/);
assert.match(shell,/data-job1-action="SIMULATE_PURCHASE"/);
assert.match(shell,/NO REAL PAYMENT/);

// FULFILLMENT exposes every downstream gate.
for(const id of [
  'proof-yard-allocation','proof-yard-release','proof-yard-queue','proof-yard-readiness',
  'proof-yard-cycle','proof-yard-operations','proof-yard-inspection','proof-yard-labels',
  'proof-yard-staging','proof-yard-ready'
]) assert.match(shell,new RegExp('id="'+id+'"'));
assert.match(shell,/NO BLOOD ON WOOD/);
assert.match(shell,/data-job1-yard-next/);

// PICKUP / RECORD remains distinct from READY.
assert.match(shell,/data-job1-action="RECORD_PICKUP"/);
assert.match(shell,/data-job1-action="CLOSE_JOB"/);
assert.match(shell,/id="proof-record-ledger"/);

// Same Store identity is displayed at every gate.
for(const gate of ['store','terms','accept','yard','record']){
  assert.match(shell,new RegExp('id="proof-'+gate+'-pin"'));
  assert.match(shell,new RegExp('id="proof-'+gate+'-input-hash"'));
  assert.match(shell,new RegExp('id="proof-'+gate+'-result-hash"'));
}

// Exercise the actual gate engine all the way through.
let state=F.create({
  jobId:'JOB 1 · START YOUR OWN',
  versionId:'SYO-USER1-XBRACE-0.1-v1',
  storePin:STORE_SHA,
  inputHash:INPUT_HASH,
  resultHash:RESULT_HASH,
  q:storeAnswer.combinedValue,
  modeledCycleMin:storeAnswer.estimate.cycle.T_job_min
});

const sequence=[
  F.ACTIONS.STORE_ACCEPT_AS_ASKED,
  F.ACTIONS.CUSTOMER_ACCEPT_OFFER,
  F.ACTIONS.SIMULATE_PURCHASE,
  F.ACTIONS.STORE_ALLOCATE,
  F.ACTIONS.STORE_RELEASE,
  F.ACTIONS.STORE_QUEUE,
  F.ACTIONS.LOCAL_READY,
  F.ACTIONS.LOCAL_CYCLE_START,
  F.ACTIONS.COMPLETE_OPERATIONS,
  F.ACTIONS.INSPECTION_PASS,
  F.ACTIONS.LABELS_COMPLETE,
  F.ACTIONS.STAGE_JOB,
  F.ACTIONS.ISSUE_READY,
  F.ACTIONS.RECORD_PICKUP,
  F.ACTIONS.CLOSE_JOB
];
for(const action of sequence) state=F.transition(state,action);

assert.equal(state.storeReview,'ACCEPTED_AS_ASKED');
assert.equal(state.offer.status,'PURCHASED');
assert.equal(state.acceptance.status,'ACCEPTED');
assert.equal(state.settlement.status,'SIMULATED_SETTLED');
assert.equal(state.allocation.status,'SIMULATED_ALLOCATED');
assert.equal(state.productionRelease.status,'SIMULATED_RELEASED');
assert.equal(state.queue.status,'SIMULATED_QUEUED');
assert.equal(state.machineReadiness.status,'SIMULATED_READY');
assert.equal(state.cycleStart.status,'SIMULATED_STARTED');
assert.equal(state.operations.status,'SIMULATED_COMPLETE');
assert.equal(state.inspection.status,'SIMULATED_PASS');
assert.equal(state.labels.status,'SIMULATED_COMPLETE');
assert.equal(state.staging.status,'SIMULATED_STAGED');
assert.equal(state.ready.status,'SIMULATED_READY_NOTICE');
assert.equal(state.custody.status,'SIMULATED_PICKED_UP');
assert.equal(state.closeout.status,'SIMULATED_CLOSED');

for(const event of state.events){
  assert.equal(event.storePin,STORE_SHA);
  assert.equal(event.inputHash,INPUT_HASH);
  assert.equal(event.resultHash,RESULT_HASH);
  assert.equal(event.authority,'SIMULATION_ONLY');
}
assert.equal(state.liveCommerce,false);
assert.equal(state.liveMotion,false);

// Out-of-order advancement is forbidden.
const fresh=F.create({
  jobId:'JOB 1 · START YOUR OWN',
  versionId:'SYO-USER1-XBRACE-0.1-v1',
  storePin:STORE_SHA,
  inputHash:INPUT_HASH,
  resultHash:RESULT_HASH,
  q:9.02,
  modeledCycleMin:1.4128
});
assert.throws(()=>F.transition(fresh,F.ACTIONS.SIMULATE_PURCHASE),/ACCEPTED_OFFER_REQUIRED/);
assert.throws(()=>F.transition(fresh,F.ACTIONS.STORE_RELEASE),/ALLOCATION_REQUIRED/);
assert.throws(()=>F.transition(fresh,F.ACTIONS.LOCAL_CYCLE_START),/LOCAL_MACHINE_READINESS_REQUIRED/);
assert.throws(()=>F.transition(fresh,F.ACTIONS.ISSUE_READY),/STAGING_REQUIRED/);
assert.throws(()=>F.transition(fresh,F.ACTIONS.CLOSE_JOB),/CUSTODY_REQUIRED/);

// Changed project truth still cannot borrow Job 1's Store answer.
for(const changed of [
  {...exactDemand,configurationVersion:'0.2'},
  {...exactDemand,sawAngleDeg:31},
  {...exactDemand,declaredSawCuts:2},
]) {
  const answer=contract.resolveUser1StoreReference(changed);
  assert.equal(answer.status,'STORE_REFRESH_REQUIRED');
  assert.equal(answer.complete,false);
}

// Browser still owns no Store pricing formula or live controller commands.
assert.equal(shell.includes('quoteStartOwnBoardSequence'),false);
assert.equal(shell.includes('machineHourRate'),false);
assert.equal(shell.includes('setupCharge'),false);
assert.equal(/\bG0?\d\b|\bM0?3\b|G-code|remote Cycle Start/i.test(shell+frame),false);

console.log('PASS · JOB 1 FULL TEMPLATE · definition → Store review → offer/terms → accept/purchase → allocation/release/queue → local simulated run → inspection/staging/READY → pickup/custody → closeout');
