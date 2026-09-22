import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';

const shell = fs.readFileSync('system-build-current.html','utf8');
const frame = fs.readFileSync('three-frames.html','utf8');
const contractSource = fs.readFileSync('stb-store-handoff-contract.js','utf8');

const sandbox={window:{}};
vm.runInNewContext(contractSource,sandbox,{filename:'stb-store-handoff-contract.js'});
const contract=sandbox.window.STBStoreHandoffContract;

const STORE_SHA='f8373520a726090ed91eff82e5e720f4a9634615';
const SYSTEM_SHA='682ce2b2a60c88b5fb6543e2f4f1c9ebfe7b01b8';
const INPUT_HASH='caa7c91f1296c243a5abb05ed35a0c55b5b1f5d4dab32efd64cd2656d75f3036';
const RESULT_HASH='15a8835dd50771136020190db7f5dbed1bd35b78930bf338be63bea8427353c2';

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
assert.equal(storeAnswer.complete,true,'Job 1 did not obtain a complete Store answer');
assert.equal(storeAnswer.status,'MATCHED_STORE_REFERENCE');
assert.equal(storeAnswer.source.storePin,STORE_SHA);
assert.equal(storeAnswer.source.systemIntegrationPin,SYSTEM_SHA);
assert.equal(storeAnswer.calculationIdentity.inputHash,INPUT_HASH);
assert.equal(storeAnswer.calculationIdentity.resultHash,RESULT_HASH);
assert.equal(storeAnswer.material,3.13);
assert.equal(storeAnswer.machineService,5.89);
assert.equal(storeAnswer.combinedValue,9.02);
assert.equal(storeAnswer.estimate.cycle.T_job_min,1.4128);

// ENTRY / DEFINE
assert.match(frame,/Start your own project/);
assert.match(frame,/2×4 · 60 in/);
assert.match(frame,/id="stb-config-length"[^>]*value="16"/);
assert.match(frame,/id="stb-config-angle"[^>]*value="30"/);
assert.match(frame,/Center spot = 16 ÷ 2 = 8 in/);
assert.match(shell,/definitionId:'SYO-USER1-XBRACE-0\.1'/);
assert.match(shell,/configurationId = 'SYO-USER1-XBRACE'/);
assert.match(shell,/configurationVersion = definitionRevision === 1[\s\S]*?'0\.1'/);
assert.match(shell,/parts = Array\.from/);
assert.match(shell,/requiredOps\.push\('SPOT_ON_LOCATION'\)/);
assert.match(shell,/resolveUser1StoreReference\(storeDemand\)/);

// CHANGED DEFINITIONS FAIL CLOSED BEFORE CONFIRM
assert.match(shell,/if \(definition\.storeReference\?\.complete !== true\)/);
assert.match(shell,/STORE_REFRESH_REQUIRED · confirmation is blocked until Store evaluates this exact revision/);
assert.match(shell,/confirmButton\.disabled = !storeComplete/);

// CONFIRM creates one Job 1 handoff with the Store answer attached.
assert.match(shell,/job:'JOB 1 · START YOUR OWN'/);
assert.match(shell,/source:'start-own'/);
assert.match(shell,/storeReference:definition\.storeReference/);
assert.match(shell,/stb-proof-handoff-job1/);
assert.match(shell,/originalShow\.call\(win,'proof-store'\)/);

// Canonical downstream actor mapping for Job 1.
assert.match(shell,/'start-own': Object\.freeze\(\{[\s\S]*?store:'proof-store'[\s\S]*?request:'proof-accept'[\s\S]*?yard:'proof-yard'[\s\S]*?terms:'proof-terms'[\s\S]*?record:'proof-record'/);

// Gate navigation is one-way capable from Store answer to final record.
assert.match(shell,/data-proof-go="proof-accept">CONTINUE → ACCEPT \/ PAY/);
assert.match(shell,/data-proof-go="proof-yard">CONTINUE REFERENCE DEMONSTRATION/);
assert.match(shell,/if\(proofHandoff\?\.source==='start-own' && target==='proof-record' && go\.closest\('#proof-yard'\)\) target='proof-terms'/);
assert.match(shell,/data-proof-go="proof-record">CONTINUE → HANDOFF \/ RECORD/);

// Each downstream gate exposes the same custody spine.
for(const gate of ['store','accept','yard','terms','record']){
  assert.match(shell,new RegExp('id="proof-'+gate+'-pin"'),'missing Store SHA field on '+gate);
  assert.match(shell,new RegExp('id="proof-'+gate+'-input-hash"'),'missing input hash field on '+gate);
  assert.match(shell,new RegExp('id="proof-'+gate+'-result-hash"'),'missing result hash field on '+gate);
}
for(const gate of ['store','accept','yard','terms','record']){
  assert.match(
    shell,
    new RegExp("'proof-"+gate+"-pin'"),
    'Store SHA is not synchronized into '+gate
  );
  assert.match(
    shell,
    new RegExp("'proof-"+gate+"-input-hash'"),
    'input hash is not synchronized into '+gate
  );
  assert.match(
    shell,
    new RegExp("'proof-"+gate+"-result-hash'"),
    'result hash is not synchronized into '+gate
  );
}

// Store answer is the only complete economics answer.
assert.match(shell,/MODELED MACHINE SERVICE/);
assert.match(shell,/STORE BUDGETARY Q/);
assert.match(shell,/machine_service/);
assert.match(shell,/estimate\?\.cycle\?\.T_job_min/,'visible Job 1 must present Store-returned modeled time rather than hard-code a cycle value');
assert.equal(shell.includes('quoteStartOwnBoardSequence'),false,'Job 1 has a second browser pricing engine');
assert.equal(shell.includes('machineHourRate'),false,'Job 1 browser contains a Store machine rate');
assert.equal(shell.includes('setupCharge'),false,'Job 1 browser contains a Store setup charge');

// ACCEPT/PAY: commercial events remain null.
assert.match(shell,/COMMERCIAL OFFER<\/b><span>NOT ESTABLISHED/);
assert.match(shell,/ACCEPTANCE<\/b><span>NOT ESTABLISHED/);
assert.match(shell,/PAYMENT<\/b><span>NOT AVAILABLE \/ NOT RECORDED/);

// STORE/YARD: physical authority remains null.
assert.match(shell,/ALLOCATION<\/b><span>NOT ESTABLISHED/);
assert.match(shell,/PRODUCTION RELEASE<\/b><span>NOT ESTABLISHED/);
assert.match(shell,/MACHINE READINESS<\/b><span>NOT ESTABLISHED/);
assert.match(shell,/CYCLE START<\/b><span>NOT AUTHORIZED/);
assert.match(shell,/READY<\/b><span>NOT RECORDED/);
assert.match(shell,/NO BLOOD ON WOOD/);

// TERMS cannot mutate the definition or manufacture a sale.
assert.match(shell,/One version, one answer/);
assert.match(shell,/Terms never rewrite the confirmed definition/);
assert.match(shell,/OFFER VALIDITY<\/b><span>NOT ESTABLISHED/);

// RECORD retains the same definition and Store answer, with no invented fabrication event.
assert.match(shell,/KEEP THE DEFINITION AND THE STORE ANSWER/);
assert.match(shell,/Owner-record consequence/);
assert.match(shell,/PHYSICAL FABRICATION<\/b><span>NOT RECORDED/);
assert.match(shell,/resultHash/);

// Template authority: Review points to the tested Store and System candidates.
assert.equal(contract.storeAuthority('startOwn').economicsPin,STORE_SHA);
assert.equal(contract.user1StoreReference.source.storePin,STORE_SHA);
assert.equal(contract.user1StoreReference.source.systemIntegrationPin,SYSTEM_SHA);
assert.equal(contract.user1StoreReference.estimate.calculationIdentity.inputHash,INPUT_HASH);
assert.equal(contract.user1StoreReference.estimate.calculationIdentity.resultHash,RESULT_HASH);

// Any changed governing input is not allowed to borrow Job 1's Store result.
for(const changed of [
  {...exactDemand,configurationVersion:'0.2'},
  {...exactDemand,sawAngleDeg:31},
  {...exactDemand,declaredSawCuts:2},
  {...exactDemand,parts:[{...exactDemand.parts[0],lengthIn:17},exactDemand.parts[1]]},
]){
  const answer=contract.resolveUser1StoreReference(changed);
  assert.equal(answer.status,'STORE_REFRESH_REQUIRED');
  assert.equal(answer.complete,false);
  assert.equal(answer.combinedValue,null);
}

// No live machine/control vocabulary crosses the browser boundary.
assert.equal(/\bG0?\d\b|\bM0?3\b|G-code|remote Cycle Start/i.test(shell+frame),false);

console.log('PASS · JOB 1 OPERABLE TEMPLATE · intent → definition → Store → confirm → accept/pay boundary → Store/yard → terms → handoff/record');
