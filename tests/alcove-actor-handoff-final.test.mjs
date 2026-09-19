import fs from 'node:fs';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';

const read=p=>fs.readFileSync(p,'utf8');
const shell=read('system-build-current.html');
const base=read('system-build-base-8d8a9dd.html');
const doctrine=read('store-zero-canonical-doctrine.js');
const seat=read('stb-window-seat-space-utilization-0.7.3.html');

const gitBlobSha=text=>crypto.createHash('sha1').update('blob '+Buffer.byteLength(text,'utf8')+'\0'+text,'utf8').digest('hex');
assert.equal(gitBlobSha(seat),'825a9bce833e982b727e0b48a7416a660543a358','Window Seat changed in Alcove actor-handoff pass');

assert.match(base,/NEXT → CONFIGURE/);
assert.match(base,/CONFIRM &amp; SEND TO STORE ZERO →/);
assert.match(shell,/Store Answer/);
assert.match(shell,/Accept \/ Pay/);
assert.match(shell,/Store \/ Yard/);
assert.match(shell,/Handoff \/ Record/);

assert.ok(shell.includes("returnedOffer.id = 'alcove-store-returned-offer'"));
assert.match(shell,/ACCEPT STORE ANSWER →/);
assert.ok(shell.includes('ALCOVE · ACCEPT / SETTLE'));
assert.match(shell,/Store answered\. You decide\./);
assert.match(shell,/data-alcove-commercial-action="accept-page">ACCEPT STORE ANSWER →/);
assert.match(shell,/data-alcove-commercial-action="accept">ACCEPT REFERENCE OFFER/);
assert.match(shell,/data-alcove-commercial-action="yard" disabled>CONTINUE WITH THIS ORDER →/);
const storeAnswer=shell.slice(shell.indexOf("returnedOffer.id = 'alcove-store-returned-offer'"),shell.indexOf("requestMain.innerHTML = `"));
assert.equal(storeAnswer.includes('data-alcove-commercial-action="accept"'),false,'Store Answer still performs customer acceptance');

assert.ok(shell.includes("['alcove-review','terms','recap']"));
assert.equal(shell.includes("['alcove-review','request','terms','recap']"),false);
assert.match(shell,/review:'store'/);
assert.match(shell,/request:'request'/);
assert.match(shell,/terms:'yard'/);
assert.match(shell,/recap:'record'/);

for(const id of ['request','yard','terms','recap','record']) assert.ok(shell.includes("extractAlcoveLegacyMain('"+id+"'"),'missing conserved source block '+id);
for(const label of ['Edge condition','Shelf-pin boring','Hardware pack','Labels','Finishing','Offcuts','Packaging','Handoff','Who collects','If something is out of stock']) assert.ok(base.includes(label),'missing Store choice '+label);
for(const evidence of ['p-mat','p-basis','p-price','o-sku','o-oh','o-cyc','o-rec']) assert.ok(base.includes('id="'+evidence+'"'),'missing Store evidence '+evidence);
assert.match(shell,/Disabled or unavailable work remains visible/);
assert.match(shell,/No silent substitution is allowed/);

assert.ok(shell.indexOf('Commercial sequence and timing basis') < shell.indexOf("requestMain.innerHTML = `"));
assert.match(shell,/This is not a live ETA/);
assert.match(shell,/This demonstration does not process money/);
assert.match(shell,/Settlement \/ payment remains NOT ESTABLISHED/);

assert.match(shell,/Order status · Store \/ Yard acts/);
assert.match(shell,/does not ask the customer to manually advance them/);
for(const state of ['NOT ALLOCATED','NOT RELEASED','NOT QUEUED','NOT AUTHORIZED HERE','NOT RECORDED','NOT ISSUED']) assert.ok(shell.includes(state),'missing fulfillment state '+state);
assert.match(shell,/Cycle Start remains local/);
assert.match(shell,/READY notice/);

assert.match(shell,/Handoff · record/);
assert.match(shell,/Commercial completion, physical outcome, READY, custody and closeout remain absent unless separately evidenced/);
assert.match(base,/source → observation → configuration → definition → request →/);
assert.match(base,/response → offer → acceptance → settlement → allocation →/);
assert.match(base,/release → production → completion → inspection → staging → custody/);

assert.equal((doctrine.match(/class=\\"s\\"/g)||[]).length,12);
for(const name of ['Yard review','Offer','Acceptance','Settlement','Material','Production release','Local cell','Primary operations','Completion','Handoff','Custody','Owner record']) assert.ok(doctrine.includes('>'+name+'<'),'missing Store transaction meaning '+name);
assert.match(shell,/NO BLOOD ON WOOD/);
console.log('PASS · Alcove actor-handoff final journey');