import fs from 'node:fs';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';

const read=p=>fs.readFileSync(p,'utf8');
const shell=read('system-build-current.html');
const base=read('system-build-base-8d8a9dd.html');
const doctrine=read('store-zero-canonical-doctrine.js');
const seat=read('stb-window-seat-space-utilization-0.7.3.html');

const gitBlobSha=text=>crypto.createHash('sha1')
  .update('blob '+Buffer.byteLength(text,'utf8')+'\0'+text,'utf8')
  .digest('hex');

assert.equal(gitBlobSha(seat),'825a9bce833e982b727e0b48a7416a660543a358','Window Seat changed during Alcove-only reconciliation');
assert.match(shell,/stb-window-seat-space-utilization-0\.7\.3\.html\?v=825a9bce/,'Window Seat cache pin changed');

assert.match(base,/id="alcove-capture"/);
assert.match(base,/NEXT → CONFIGURE/);
assert.match(base,/id="alcove-config"/);
assert.match(base,/id="confirm-alcove-inline">CONFIRM &amp; SEND TO STORE ZERO →/);
assert.ok(shell.includes("storeOrder.id = 'alcove-store-order-surface'"));
assert.match(shell,/Order status · Store \/ Yard acts/);
assert.match(shell,/Completion · handoff · record/);

assert.match(shell,/review:'store'/);
assert.match(shell,/request:'store'/);
assert.match(shell,/terms:'yard'/);
assert.match(shell,/recap:'record'/);
assert.ok(shell.includes("['alcove-review','request','terms','recap']"));
assert.match(shell,/Store \/ Order/);
assert.match(shell,/Store \/ Yard/);
assert.match(shell,/Completion \/ Record/);

assert.match(shell,/ALCOVE STORE CONTENT CONSERVATION RULE/);
for(const id of ['request','yard','terms','recap','record']){
  assert.ok(shell.includes("extractAlcoveLegacyMain('"+id+"'"),'missing conserved block: '+id);
}
assert.match(shell,/block\.append\(node\)/,'legacy content is not moved intact');
assert.match(shell,/dataset\.alcoveConservedFrom/);

const decisionLabels=[
  'Edge condition','Shelf-pin boring','Hardware pack','Labels','Finishing',
  'Offcuts','Packaging','Handoff','Who collects','If something is out of stock'
];
for(const label of decisionLabels) assert.ok(base.includes(label),'missing Store decision: '+label);
const decisionOptions=[
  'As cut','Deburred','Sanded 150',
  'Class default','Adjustable columns','No bores',
  'No added pack','Yard-sourced pack','I supply my own',
  'Labels only','+ Assembly sheet','+ QR to record',
  'None — raw','Stain + clear',
  'I take them','Disposal','Leave for remnant rack',
  'Loose on cart','Banded','Boxed',
  'Pickup','Pickup later','Curbside','Through the door',
  'Me','Named agent','My contractor',
  'Ask me first','Wait for stock','No substitutes'
];
for(const option of decisionOptions) assert.ok(base.includes(option),'missing Store option: '+option);
assert.match(base,/Stain \+ clear/);
assert.match(base,/disabled/,'unavailable Store work is no longer visibly disabled');

for(const id of ['p-mat','p-basis','p-price','o-sku','o-oh','o-cyc','o-rec']){
  assert.ok(base.includes('id="'+id+'"'),'missing Store evidence field: '+id);
}
assert.match(shell,/Fabrication remains unresolved wherever the current Alcove surface says it is unresolved/);
assert.match(shell,/Disabled or unavailable work remains visible/);
assert.match(shell,/No silent substitution is allowed/);
assert.match(shell,/Reference timing remains reference timing; no live ETA is invented/);
assert.match(base,/YARD ≤2 business h · PICKUP 4 business h after READY/);
assert.match(base,/Stage ≤2 business h after last required cycle/);
assert.match(base,/Pickup 4 business h after READY/);

assert.match(shell,/Acceptance ≠ settlement ≠ allocation ≠ production release/);
assert.match(shell,/NOT ESTABLISHED · NOT LIVE COMMERCE/);
assert.match(shell,/Reference acceptance selected\. Settlement \/ payment remains NOT ESTABLISHED/);
assert.match(shell,/Payment does not start a machine/);
assert.match(shell,/Allocation is not production release/);
assert.match(shell,/Production release is not machine readiness/);
assert.match(shell,/Machine readiness is not Cycle Start/);
assert.match(shell,/Cycle Start remains local/);

assert.match(shell,/READY notice/);
assert.match(shell,/NOT ISSUED/);
assert.match(shell,/custody and closeout remain absent/);
assert.match(base,/Staged did not mean custody transferred/);
assert.match(base,/Custody transferred here/);

assert.equal((doctrine.match(/class=\\"s\\"/g)||[]).length,12,'Store doctrine no longer contains 12 event steps');
for(const name of ['Yard review','Offer','Acceptance','Settlement','Material','Production release','Local cell','Primary operations','Completion','Handoff','Custody','Owner record']){
  assert.ok(doctrine.includes('>'+name+'<'),'missing Store event: '+name);
}
assert.match(shell,/Full twelve-event Store \/ transaction ledger/);

assert.match(base,/source → observation → configuration → definition → request →/);
assert.match(base,/response → offer → acceptance → settlement → allocation →/);
assert.match(base,/release → production → completion → inspection → staging → custody/);
assert.ok(shell.includes("extractAlcoveLegacyMain('recap'"));
assert.ok(shell.includes("extractAlcoveLegacyMain('record'"));
assert.match(shell,/Missing events stay missing/);

assert.equal(shell.includes('LIBRARY PROJECT · READ ONLY'),false);
assert.equal(shell.includes('SAVE THIS PROJECT'),false);
assert.equal(shell.includes('MAKE CHANGES'),false);

assert.match(shell,/NO BLOOD ON WOOD/);
assert.equal(/\bG0\b|\bG1\b|\bM03?\b|remote Cycle Start/i.test(shell),false,'controller / remote machine command language introduced');

console.log('PASS · Alcove commercial journey reconciliation');
