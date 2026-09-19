import fs from 'node:fs';
import vm from 'node:vm';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';

const read=p=>fs.readFileSync(p,'utf8');
const frozen=read('stb-window-seat-space-utilization-0.7.3.html');
const seat=read('stb-window-seat-space-utilization-0.7.4.html');
const shell=read('system-build-current.html');
const doctrine=read('store-zero-canonical-doctrine.js');
const base=read('system-build-base-8d8a9dd.html');
const journeySource=read('stb-canonical-journey.js');

const gitBlobSha=text=>crypto.createHash('sha1')
  .update('blob '+Buffer.byteLength(text,'utf8')+'\0'+text,'utf8')
  .digest('hex');

function between(source,start,end){
  const i=source.indexOf(start);
  assert.notEqual(i,-1,'missing start: '+start);
  const j=source.indexOf(end,i+start.length);
  assert.notEqual(j,-1,'missing end: '+end);
  return source.slice(i,j);
}
function runBrowserScript(source,key){
  const sandbox={window:{}};
  vm.runInNewContext(source,sandbox,{filename:key});
  return sandbox.window;
}

// Frozen sources remain frozen.
assert.equal(gitBlobSha(frozen),'825a9bce833e982b727e0b48a7416a660543a358','frozen Window Seat 0.7.3 changed');
assert.equal(gitBlobSha(doctrine),'653663671f61dd77e0dae73917d33b8a8e896fd2','Store doctrine changed');
assert.equal(gitBlobSha(base),'67f3c5324ac7ab2ccd798b0dc0d7179b0912eef4','Alcove base changed');

// The nine-stage technical/event contract remains the underlying contract.
const journey=runBrowserScript(journeySource,'stb-canonical-journey.js').STB_CANONICAL_JOURNEY;
assert.deepEqual([...journey.stages],['scan','configure','store','review','request','yard','terms','recap','record']);
assert.equal(journey.gates.length,8);

// Six actor handoffs are a presentation projection, not a replacement technical contract.
assert.match(seat,/var WINDOW_SEAT_ACTOR_STAGES=\['scan','configure','store-answer','accept-pay','store-yard','handoff-record'\]/);
for(const pair of [
  "store:'store-answer'","review:'store-answer'","request:'accept-pay'",
  "yard:'store-yard'","terms:'store-yard'","recap:'handoff-record'","record:'handoff-record'"
]) assert.ok(seat.includes(pair),'missing actor projection '+pair);

assert.match(shell,/const WINDOW_SEAT_STAGE_TO_ACTOR = Object\.freeze/);
for(const pair of [
  "store:'store-answer'","review:'store-answer'","request:'accept-pay'",
  "yard:'store-yard'","terms:'store-yard'","recap:'handoff-record'","record:'handoff-record'"
]) assert.ok(shell.includes(pair),'shell missing actor projection '+pair);
assert.match(shell,/stb-window-seat-space-utilization-0\.7\.4\.html\?v=96c85fee/);

// One canonical content source feeds both Guided and Continuous.
// Guided only filters the same DOM nodes that Continuous renders.
assert.equal(seat.includes('ws-guided-journey'),false,'separate Guided journey copy introduced');
assert.match(seat,/data-ws-actor-group=/);
assert.match(seat,/body\[data-ws-view="guided"\].*data-ws-actor-group/s);
assert.match(seat,/function buildActorGroup\(stage,snapshot\)/);
assert.match(seat,/function renderConfigureReview\(snapshot\)[\s\S]*buildReviewJourney\(snapshot\)/);
const actorBuilder=between(seat,'function buildActorGroup(stage,snapshot){','function renderConfigureReview(snapshot){');
for(const builder of ['buildStoreJourney(snapshot)','buildRequestJourney(snapshot)','buildYardJourney(snapshot)','buildTermsJourney(snapshot)']){
  assert.ok(actorBuilder.includes(builder),'Store Answer lost technical builder '+builder);
}
assert.ok(actorBuilder.includes('buildRecapJourney(snapshot)'),'Handoff / Record lost Recap');
assert.ok(actorBuilder.includes('buildRecordJourney(snapshot)'),'Handoff / Record lost Record');

// Mirror gate is explicit, exhaustive, and can only return the two approved results.
assert.match(seat,/function actorMirrorAudit\(\)/);
assert.match(seat,/function captureActorMirror\(stage,mode\)/);
assert.match(seat,/JSON\.stringify\(continuous\)===JSON\.stringify\(guided\)/);
assert.match(seat,/data-ws-actor-gate="STORE ANSWER"/);
assert.match(seat,/data-ws-actor-gate="ACCEPT \/ PAY"/);
assert.match(seat,/data-ws-actor-gate="STORE \/ YARD"/);
assert.match(seat,/EXACT MIRROR/);
assert.match(seat,/DEFECT — NOT EXACT MIRROR/);
for(const item of [
  'content','controls','current values','derived values','project state','occurrence identity',
  'parts','board runs','material requirements','Store request','Store answer','service choices',
  'unresolved conditions','warnings','gates','refusal / defer behavior','economics',
  'authority statements','transaction states','machine boundaries','completion states',
  'owner-record consequences','technical meaning'
]) assert.ok(seat.includes("'"+item+"'"),'mirror coverage missing '+item);
assert.match(seat,/ONE CANONICAL DOM CONTENT SOURCE → GUIDED VISIBILITY FILTER \/ CONTINUOUS FULL VISIBILITY/);

// Confirmation now precedes the held Store answer.
assert.match(seat,/if\(ensureAnswer && rev\.confirmed &&/,'Store answer can still be held before confirmation');
const confirmHandler=between(seat,"var confirm=e.target.closest('[data-ws-confirm-send]');","var decision=e.target.closest('[data-ws-decision]');");
assert.ok(confirmHandler.indexOf('rev.confirmed=true;') < confirmHandler.indexOf('currentJourneySnapshot(true)'),'Store evaluates before confirmation');
const configureButton=between(seat,"$('ws-guided').onclick=function(){","$('btn-inspect').onclick");
assert.equal(configureButton.includes('currentJourneySnapshot(true)'),false,'Configure preview still holds Store answer');
assert.match(configureButton,/renderContinuousJourney\(true\)/);

// Store Answer stays separate from Accept / Pay.
assert.match(seat,/Store answers one confirmed Window Seat revision/);
assert.match(seat,/Store answered\. You decide\./);
assert.match(seat,/data-ws-decision="accept"/);
assert.match(seat,/REFERENCE ANSWER ACCEPTED · COMMERCIAL ACCEPTANCE NOT ESTABLISHED/);
assert.match(seat,/Payment \/ settlement','NOT ESTABLISHED/);
assert.match(seat,/Acceptance here is not payment/);

// The customer cannot create internal Store/Yard or machine events.
assert.match(seat,/Customer controls for allocation \/ release \/ readiness \/ machine work \/ inspection \/ staging','NONE/);
for(const forbidden of ['data-ws-allocate','data-ws-release','data-ws-ready','data-ws-cycle','data-ws-inspect','data-ws-stage-parts']){
  assert.equal(seat.includes(forbidden),false,'customer internal-event control introduced: '+forbidden);
}
assert.equal(/(?:allocation|productionRelease|machineReadiness|cycleStart|physicalFabrication)\s*=\s*true/.test(seat),false,'downstream authority mutation introduced');
assert.match(seat,/READY is not custody/);
assert.match(seat,/Cycle Start.*local/is);
assert.match(seat,/NO CONTROLLER OUTPUT/);
assert.match(seat,/NO BLOOD ON WOOD/);

// Gold-standard product truth survives in 0.7.4.
for(const token of [
  'ASM-LEFT','ASM-CENTER','ASM-RIGHT','upper storage','window opening','lower cubbies',
  'Solid board demand throughout, 3/4 in finished thickness','STABLE OCCURRENCE IDENTITY',
  'PART ≠ BOARD RUN','requested secondary operation','STORE-OWNED UNRESOLVED',
  'D001-BOARD-EDGE-MILL-REF-0.3','STB-STORE-ZERO-WINDOW-SEAT-RECOVERY-0.1',
  'f88ec61c42446755d00259f88e7fd09f2702fd92','LOCAL-PINNED-FIXTURE-ADAPTER-0.7.3',
  'Replacement-component payoff','That record does not authorize fabrication'
]) assert.ok(seat.includes(token),'gold-standard content missing: '+token);

// Owner record, economics, Store pins, unresolved conditions and null states survive.
assert.match(seat,/jSection\('Store basis \/ pins'/);
assert.match(seat,/exact component occurrences/i);
for(const nullState of ['NOT ESTABLISHED','NOT RECORDED','NOT TRANSFERRED']) assert.match(seat,new RegExp(nullState));
for(const economic of ['material','recovery','hardware','Reference selling basis']) assert.ok(seat.includes(economic),'economics missing '+economic);

// Visible Window Seat nav is exactly the six actor handoffs while canonical internal pages remain available underneath.
assert.ok(shell.includes("else if (activeJourneyProject === 'window-seat')"));
assert.ok(shell.includes("['alcove-review','terms','recap']"));
for(const label of ['Store Answer','Accept / Pay','Store / Yard','Handoff / Record']) assert.ok(shell.includes(label),'visible nav label missing '+label);

console.log('PASS · Window Seat 0.7.4 actor-handoff + mirror regression checks');
