import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';

const read=(p)=>fs.readFileSync(p,'utf8');
const seat=read('stb-window-seat-space-utilization-0.7.3.html');
const shell=read('system-build-current.html');
const doctrineSource=read('store-zero-canonical-doctrine.js');
const journeySource=read('stb-canonical-journey.js');
const architecture=read('docs/ARCHITECTURE.md');

function runBrowserScript(source,key){
  const sandbox={window:{}};
  vm.runInNewContext(source,sandbox,{filename:key});
  return sandbox.window;
}
function between(source,start,end){
  const i=source.indexOf(start);
  assert.notEqual(i,-1,`missing start: ${start}`);
  const j=source.indexOf(end,i+start.length);
  assert.notEqual(j,-1,`missing end: ${end}`);
  return source.slice(i,j);
}

const journey=runBrowserScript(journeySource,'stb-canonical-journey.js').STB_CANONICAL_JOURNEY;
const doctrine=runBrowserScript(doctrineSource,'store-zero-canonical-doctrine.js').STBStoreZeroCanonicalDoctrine;

const expectedStages=['scan','configure','store','review','request','yard','terms','recap','record'];
assert.deepEqual([...journey.stages],expectedStages,'canonical stage order drifted');

const expectedGates=[
  ['CONTINUE TO CONFIGURE','scan','configure'],
  ['SEND TO STORE ZERO','configure','store'],
  ['NEXT','store','review'],
  ['CONFIRM THIS VERSION','review','request'],
  ['SEND TO THE YARD / NEXT','request','yard'],
  ['CONTINUE TO TERMS / NEXT','yard','terms'],
  ['NEXT','terms','recap'],
  ['NEXT','recap','record']
];
assert.equal(journey.gates.length,8,'canonical gate count drifted');
assert.deepEqual(journey.gates.map(g=>[g.action,g.source,g.destination]),expectedGates,'canonical gate transitions drifted');

// Gate-mutation matrix: simulate only the mutations the current reference journey actually performs.
const state={
  activeStage:'scan',
  revisionConfirmed:false,
  storeReferenceAnswer:false,
  order:false,offer:false,acceptance:false,payment:false,allocation:false,
  productionRelease:false,machineReadiness:false,cycleStart:false,
  physicalOutcome:false,staging:false,custody:false,closeout:false
};
const untouchedKeys=['order','offer','acceptance','payment','allocation','productionRelease','machineReadiness','cycleStart','physicalOutcome','staging','custody','closeout'];
for(const gate of journey.gates){
  assert.equal(state.activeStage,gate.source,`gate source mismatch at ${gate.id}`);
  const before=structuredClone(state);
  state.activeStage=gate.destination;
  if(gate.id==='configure-to-store')state.storeReferenceAnswer=true;
  if(gate.id==='review-to-request')state.revisionConfirmed=true;
  for(const key of untouchedKeys)assert.equal(state[key],before[key],`${gate.id} mutated forbidden authority: ${key}`);
}
assert.equal(state.activeStage,'record');
assert.equal(state.storeReferenceAnswer,true);
assert.equal(state.revisionConfirmed,true);

// Store doctrine is generic event-class doctrine, not project history.
const names=[...doctrine.processStepsHtml.matchAll(/class="name">([^<]+)</g)].map(m=>m[1]);
assert.deepEqual(names,['Yard review','Offer','Acceptance','Settlement','Material','Production release','Local cell','Primary operations','Completion','Handoff','Custody','Owner record']);
const statuses=[...doctrine.processStepsHtml.matchAll(/class="st">([^]*?)<\/span>/g)].map(m=>m[1].replace(/<[^>]+>/g,'').trim());
assert.deepEqual(statuses,[
  'REQUEST · yard review event',
  'TERMS · offer event',
  'YOU · acceptance event',
  'PAYMENT · settlement event',
  'STORE · allocation event',
  'JOB · production-release event',
  'CELL · readiness event',
  'PARTS · primary-operation outcome',
  'SECONDARY WORK · completion event',
  'READY · handoff-notice event',
  'HANDOFF · custody-transfer event',
  'RECORD · reconciliation event'
]);
for(const completed of ['REQUEST · received','TERMS · returned','JOB · released','PARTS · made to the released definition','READY · notice issued','HANDOFF · recorded','RECORD · reconciled']){
  assert.equal(doctrine.processStepsHtml.includes(completed),false,`completed-looking doctrine label remains: ${completed}`);
}
assert.equal((doctrine.processStepsHtml.match(/class="s"/g)||[]).length,12);
assert.match(doctrine.definitionHtml,/^<b[^>]*>Store Zero is a declared reference lumberyard\.<\/b>/);
assert.equal(/alcove|window seat|45½|94½/i.test(doctrine.definitionHtml+doctrine.processStepsHtml),false,'project facts leaked into generic Store doctrine');

// Shared sources must be loaded directly by both Seat and shell.
assert.match(seat,/stb-canonical-journey\.js\?v=e0619841/);
assert.match(shell,/stb-canonical-journey\.js\?v=e0619841/);
assert.match(seat,/store-zero-canonical-doctrine\.js\?v=f2106553/);
assert.match(shell,/store-zero-canonical-doctrine\.js\?v=f2106553/);
assert.equal(shell.includes('seatJourneyDoctrine'),false,'shell still scrapes Store doctrine from Alcove');
assert.equal(seat.includes('setDoctrine:function'),false,'Seat still accepts runtime Store doctrine injection');

// Guided and Continuous consume the same Seat stage bodies.
for(const stage of ['store','review','request','yard','terms','recap','record']){
  assert.match(seat,new RegExp(`if\\(stage==='${stage}'\\)return build`),`missing canonical builder: ${stage}`);
  assert.match(seat,new RegExp(`data-ws-stage="${stage}"\\] #ws-stage-${stage}`),`guided mode does not isolate shared node: ${stage}`);
}
assert.match(seat,/contract\.stages\.slice\(contract\.stages\.indexOf\('store'\)\)/,'Continuous order is not derived from shared contract');
assert.match(seat,/html\+=journeyStageSection\(buildJourneyStage\(stage,snapshot\)\)/);
assert.match(seat,/html\+=journeyGateHtml\(stage\)/);
assert.equal(seat.includes('var JOURNEY_GATES={'),false,'Seat maintains a second gate contract');

// Scroll/render purity.
const render=between(seat,'var journeyDirty=true;',"document.addEventListener('click',function(e){");
assert.match(render,/currentJourneySnapshot\(false\)/);
assert.equal(render.includes('currentJourneySnapshot(true)'),false,'Continuous render evaluates Store');
assert.equal(render.includes('rev.confirmed='),false,'Continuous render confirms revision');
assert.equal(render.includes('answer=StoreZeroAdapter'),false,'Continuous render creates held Store answer');
assert.equal(/(?:acceptance|payment|allocation|productionRelease|machineReadiness|cycleStart|physicalFabrication)\s*=\s*true/.test(render),false,'Continuous render creates downstream authority');
assert.match(render,/IntersectionObserver/);
assert.match(render,/maybeRefreshJourneyOnScroll/);

const send=between(seat,"$('ws-guided').onclick=function(){","$('btn-inspect').onclick");
assert.match(send,/currentJourneySnapshot\(true\)/,'SEND TO STORE ZERO no longer owns Store evaluation');
const confirm=between(seat,"document.addEventListener('click',function(e){",'window.STBWindowSeatJourney=Object.freeze');
assert.match(confirm,/e\.target\.closest\('\[data-ws-confirm\]'\)/);
assert.match(confirm,/rev\.confirmed=true/,'CONFIRM THIS VERSION no longer owns revision confirmation');

// Configure stays fast: edit cycle marks downstream dirty rather than rebuilding it.
const cycle=between(seat,'function cycle(){','function lv_ok');
assert.match(cycle,/markJourneyDirty\(\)/);
assert.equal(cycle.includes('renderContinuousJourney'),false);
assert.equal(cycle.includes('refreshJourneyIfNeeded'),false);

// Neutral routing contract. Alcove ids are compatibility implementation details only.
assert.match(shell,/const ALCOVE_STAGE_TARGETS = Object\.freeze/);
assert.match(shell,/const LEGACY_TARGET_TO_STAGE = Object\.freeze/);
assert.equal(shell.includes('const seatNavTargets'),false,'Seat reference contract still uses Alcove-named routes');
assert.match(shell,/button\.dataset\.journeyStage = stage/);
assert.match(shell,/const stage = LEGACY_TARGET_TO_STAGE\[target\] \|\| null/);

// Project switching is explicit. View/stage operations may not select Window Seat.
const explicitSeatSelections=(shell.match(/selectJourneyProject\('window-seat'\)/g)||[]).length;
assert.equal(explicitSeatSelections,1,'Window Seat identity can be selected from more than one path');
const openSeat=between(shell,'function openSeatView(mode, stage) {','function showSeatContinuous()');
assert.match(openSeat,/activeJourneyProject !== 'window-seat'/);
assert.equal(openSeat.includes("activeJourneyProject = 'window-seat'"),false);
const messages=between(shell,"window.addEventListener('message', function(event) {","doc.addEventListener('click', function(event) {");
assert.match(messages,/activeJourneyProject !== 'window-seat'/,'iframe messages can implicitly revive Window Seat');
assert.match(shell,/if \(target === 'alcove-capture'\) selectJourneyProject\('alcove'\)/,'Alcove project selection is not explicit');

// STOP/null/historical truth remains first class.
assert.match(seat,/must be settled before SEND TO STORE ZERO/);
assert.match(seat,/STOP/);
assert.match(seat,/PROJECT · /);
assert.match(seat,/STORE · /);
assert.match(seat,/HISTORICAL/);
for(const nullState of ['NOT ESTABLISHED','NOT RECORDED','NOT TRANSFERRED'])assert.match(seat,new RegExp(nullState));

// Owner record / replacement identity.
assert.match(seat,/exact component occurrences/i);
assert.match(seat,/Replacement-component payoff/);
assert.match(seat,/That record does not authorize fabrication/);
assert.match(seat,/Current material, Store, capability, safety and production gates run again/);

// Existing Window Seat product truth / safety.
for(const moduleId of ['ASM-LEFT','ASM-CENTER','ASM-RIGHT'])assert.match(seat,new RegExp(moduleId));
assert.match(seat,/Solid board demand throughout, 3\/4 in finished thickness/);
assert.match(seat,/f88ec61c42446755d00259f88e7fd09f2702fd92/);
assert.match(seat,/D001-BOARD-EDGE-MILL-REF-0\.3/);
assert.match(seat,/STB-STORE-ZERO-WINDOW-SEAT-RECOVERY-0\.1/);
assert.match(seat,/NO CONTROLLER OUTPUT/);
assert.match(seat,/CYCLE START IS LOCAL/);
assert.match(seat,/NO BLOOD ON WOOD/);

// Human-readable manifest mirrors the declarative contract.
assert.match(architecture,/## 16\. Canonical bounded-project journey contract/);
assert.match(architecture,/scan → configure → store → review → request → yard → terms → recap → record/);

console.log('PASS · Window Seat gold-standard journey regression checks');
