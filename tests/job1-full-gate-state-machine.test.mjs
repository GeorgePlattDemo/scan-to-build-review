import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';

const source=fs.readFileSync('stb-job1-simulated-fulfillment.js','utf8');
const sandbox={window:{}};
vm.runInNewContext(source,sandbox,{filename:'stb-job1-simulated-fulfillment.js'});
const F=sandbox.window.STBJob1SimulatedFulfillment;
assert.ok(F);
assert.equal(F.version,'STB-JOB1-SIMULATED-FULFILLMENT-0.1');

const seed={
  jobId:'JOB 1 · START YOUR OWN',
  versionId:'SYO-USER1-XBRACE-0.1-v1',
  storePin:'95c639a1d0d4812df097ad1eb628594b38f921de',
  inputHash:'5de0367b62087cb0174ef5f1e101e22ded3728ba71906868628a985afafa078b',
  resultHash:'9ad8d16a7c211d420b83e46ed8a8d224bd289e26a48764ff8d0389b6db698604',
  q:9.02,
  modeledCycleMin:1.4128,
};

let s=F.create(seed);
assert.equal(s.storeReview,'PENDING');
assert.equal(s.events[0].type,'STORE_ANSWER_RECEIVED');
assert.equal(F.canVisit(s,'terms'),false);

assert.throws(()=>F.transition(s,F.ACTIONS.STORE_ALLOCATE),/SETTLEMENT_REQUIRED/);
assert.throws(()=>F.transition(s,F.ACTIONS.CUSTOMER_ACCEPT_OFFER),/ACTIVE_OFFER_REQUIRED/);
assert.throws(()=>F.transition(s,F.ACTIONS.LOCAL_CYCLE_START),/LOCAL_MACHINE_READINESS_REQUIRED/);
assert.throws(()=>F.transition(s,F.ACTIONS.RECORD_PICKUP),/READY_NOTICE_REQUIRED/);

s=F.transition(s,F.ACTIONS.STORE_ACCEPT_AS_ASKED);
assert.equal(s.storeReview,'ACCEPTED_AS_ASKED');
assert.equal(s.offer.status,'ACTIVE');
assert.equal(s.offer.amount,9.02);
assert.equal(F.canVisit(s,'terms'),true);

s=F.transition(s,F.ACTIONS.CUSTOMER_ACCEPT_OFFER);
assert.equal(s.acceptance.status,'ACCEPTED');

s=F.transition(s,F.ACTIONS.SIMULATE_PURCHASE);
assert.equal(s.settlement.status,'SIMULATED_SETTLED');
assert.equal(s.offer.status,'PURCHASED');
assert.equal(F.canVisit(s,'yard'),true);

const expected=[
  F.ACTIONS.STORE_ALLOCATE,
  F.ACTIONS.STORE_RELEASE,
  F.ACTIONS.STORE_QUEUE,
  F.ACTIONS.LOCAL_READY,
  F.ACTIONS.LOCAL_CYCLE_START,
  F.ACTIONS.COMPLETE_OPERATIONS,
  F.ACTIONS.INSPECTION_PASS,
  F.ACTIONS.LABELS_COMPLETE,
  F.ACTIONS.STAGE_JOB,
  F.ACTIONS.ISSUE_READY
];
for(const action of expected){
  assert.equal(F.nextYardAction(s),action);
  s=F.transition(s,action);
}
assert.equal(F.nextYardAction(s),null);
assert.equal(s.ready.status,'SIMULATED_READY_NOTICE');
assert.equal(F.canVisit(s,'record'),true);

s=F.transition(s,F.ACTIONS.RECORD_PICKUP);
assert.equal(s.custody.status,'SIMULATED_PICKED_UP');
assert.equal(s.staging.custodyTransferred,false);

s=F.transition(s,F.ACTIONS.CLOSE_JOB);
assert.equal(s.closeout.status,'SIMULATED_CLOSED');
assert.equal(s.events.at(-1).type,'JOB_CLOSED');

for(const e of s.events){
  assert.equal(e.authority,'SIMULATION_ONLY');
  assert.equal(e.storePin,seed.storePin);
  assert.equal(e.inputHash,seed.inputHash);
  assert.equal(e.resultHash,seed.resultHash);
}
assert.equal(s.liveCommerce,false);
assert.equal(s.liveMotion,false);

// Alternate Store outcomes must not accidentally create an offer.
const modified=F.transition(F.create(seed),F.ACTIONS.STORE_RETURN_FOR_MODIFICATION);
assert.equal(modified.storeReview,'RETURNED_FOR_MODIFICATION');
assert.equal(modified.offer,null);
assert.equal(F.canVisit(modified,'terms'),false);

const declined=F.transition(F.create(seed),F.ACTIONS.STORE_DECLINE);
assert.equal(declined.storeReview,'DECLINED');
assert.equal(declined.offer,null);

console.log('PASS · Job 1 simulated commercial/fulfillment state machine enforces every gate in order');
