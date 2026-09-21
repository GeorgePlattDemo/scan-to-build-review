import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';

const read = path => fs.readFileSync(path,'utf8');
const surface = read('three-frames.html');
const shell = read('system-build-current.html');
const contractSource = read('stb-store-handoff-contract.js');
const boardSource = read('stb-user-defined-board-store.js');

// Landing remains the simple Scan-to-Build entry / intent surface.
assert.match(surface,/id="stb-start-intent-screen"/);
assert.match(surface,/Start your own project/);
for(const label of ['1×6 pine','1×6 poplar','1×6 cherry','1×8 oak','2×4 stud','¾ plywood']){
  assert.ok(surface.includes(label),'missing landing material choice '+label);
}
for(const key of ['1x6p','1x6w','1x6c','1x8o','2x4','p75']){
  assert.match(surface,new RegExp('data-store-size-key="'+key+'"'),'missing Store glossary key '+key);
}
assert.match(surface,/These material choices are checked against the current Store/);
assert.match(surface,/Grab a board from the Store and tell us what you want done to it/);
assert.match(surface,/2 parts/);
assert.match(surface,/16 in each/);
assert.match(surface,/30° ends/);
assert.match(surface,/center spot/);
assert.match(surface,/Center spot = 16 ÷ 2 = 8 in/);
assert.match(surface,/TAKE THIS 2×4 TO THE BENCH →/);
assert.equal(surface.includes('<p>2×6 stud</p>'),false);
assert.equal(surface.includes('<p>2×8 stud</p>'),false);
assert.equal(surface.includes('FRAME 1 · THE WARM INTRO'),false);
assert.equal(surface.includes('>USER 1 INTENT<'),false);
assert.equal(surface.includes('PREVIEW — the three frames'),false);

// Bench is a separate, full project-working surface.
assert.match(surface,/id="stb-start-bench-screen" hidden/);
assert.match(surface,/id="stb-bench-back">← Back/);
assert.match(surface,/id="stb-bench-library">← PROJECT LIBRARY/);
assert.match(surface,/Make it yours/);
assert.match(surface,/id="stb-bench-intent-slot"/);
assert.match(surface,/THE SAME BOARD, ON THE BENCH/);
assert.match(surface,/2×4 · 60 in/,'60-in defined workpiece changed');
assert.match(surface,/27⅝ in remains/,'60-in retained math changed');
assert.match(surface,/3⅝ in spare/,'60-in spare math changed');
assert.match(surface,/id="stb-bench-controls"/);
assert.match(surface,/Change of plans\?/);
assert.match(surface,/id="stb-config-length"[^>]*value="16"/);
assert.match(surface,/id="stb-config-angle"[^>]*value="30"/);
assert.match(surface,/data-parts="1"/);
assert.match(surface,/data-parts="2"/);
assert.equal(surface.includes('data-parts="3"'),false,'quantity control escaped the bounded X-brace proof');
assert.match(surface,/RESULTING DEFINITION \/ REFERENCE ORDER — USER 1/);
assert.match(surface,/MATERIAL REQUIRED/);
assert.match(surface,/REFERENCE CALCULATED PRICE/);
assert.match(surface,/STORE \/ PRICE BASIS/);
assert.match(surface,/id="stb-basis-unit-price"/);
assert.match(surface,/id="stb-basis-cell-family"/);
assert.match(surface,/id="stb-basis-supported-ops"/);
assert.match(surface,/Before you send it/);
assert.match(surface,/CONFIRM &amp; SEND TO STORE ZERO →/);
assert.match(surface,/id="stb-bench-dynamic-geometry"/);

// Host carries one definition through intent, bench, Store, Terms and record.
assert.match(shell,/three-frames\.html\?v=8fe09454/);
assert.match(shell,/const parentLengthIn = 60;/);
assert.match(shell,/parentLengthIn:parentLengthIn/);
assert.match(shell,/const spotDemand =/);
assert.match(shell,/physicalDemand\.spotDemand = spotDemand/);
assert.match(shell,/formula:'finishedLengthIn \/ 2'/);
assert.match(shell,/renderBoardGeometry\(definition\)/);
assert.match(shell,/showStartOwnStage\('intent'\)/);
assert.match(shell,/showStartOwnStage\('bench'\)/);
assert.match(shell,/id:'SYO-USER1-XBRACE-0\.1'/);
assert.match(shell,/originalShow\.call\(win,'proof-store'\)/);
assert.match(shell,/ensureProjectJourneyPage\('proof-terms'/);
assert.match(shell,/terms:'proof-terms'/);
assert.match(shell,/target==='proof-record' && go\.closest\('#proof-yard'\)\) target='proof-terms'/);
assert.match(shell,/setTimeout\(\(\) => showStartOwnStage\('bench'\),0\)/);
assert.match(shell,/COMBINED COMMERCIAL PRICE<\/b><span>NOT COMPLETE/);
assert.match(shell,/PAYMENT<\/b><span>NOT AVAILABLE \/ NOT RECORDED/);
assert.match(shell,/START-OWN-CLASS-SCOPED-RECOVERY-NOT-PUBLISHED/);
assert.equal(shell.includes('60-in customer board'),false);
assert.equal(shell.includes('photo, board, or file you already have'),false);
assert.equal(shell.includes('parentLengthIn = 72'),false);

// Shared contract preserves 60-in geometry + structured drill demand and old callers.
const sandbox = {window:{}};
vm.runInNewContext(contractSource,sandbox,{filename:'stb-store-handoff-contract.js'});
const contract = sandbox.window.STBStoreHandoffContract;
assert.equal(contract.version,'0.5');

const legacyPart = {
  stockClass:'2x4',finishedLength:15.5,quantity:8,endCondition:'angled',straightCut:true,
  angleDegrees:10,angleReference:'source-stated',cutPlane:'bevel-thickness',
  endIdentity:'both',endRelation:'parallel',lengthDatum:'source-length'
};
const legacyStart = contract.createComparisonHandoff({
  projectId:'start-own',projectClass:'USER_DEFINED_BOARD',definitionId:'SYO-TEST',
  physicalDemand:legacyPart,sourceAuthority:{kind:'USER-DEFINED'}
});
const legacyOutdoor = contract.createComparisonHandoff({
  projectId:'outdoor-build',projectClass:'BOUNDED_SOURCE_BACKED',definitionId:'OB-SAW-TEST',
  physicalDemand:legacyPart,sourceAuthority:{kind:'BOUNDED SOURCE-BACKED'}
});
assert.equal(contract.sameStoreDemand(legacyStart,legacyOutdoor),true);

const defined = {
  stockClass:'2x4',parentLengthIn:60,finishedLength:16,quantity:2,endCondition:'angled',straightCut:false,
  angleDegrees:30,angleReference:'USER_1_INTENT_IMAGE',cutPlane:'miter-face',
  endIdentity:'both',endRelation:'parallel',lengthDatum:'long-long-outer-edge',
  spotDemand:{
    required:true,mode:'SPOT_ON_LOCATION',countPerPart:1,locationRule:'CENTERED_ON_PART',
    locationAlongLengthIn:8,acrossWidthRule:'CENTERED_ON_WIDE_FACE',
    derivation:{basis:'DERIVED',formula:'finishedLengthIn / 2',input:{finishedLengthIn:16},output:{locationAlongLengthIn:8}},
    toolingStatus:'UNRESOLVED'
  }
};
const handoff = contract.createComparisonHandoff({
  projectId:'start-own',projectClass:'USER_DEFINED_BOARD',definitionId:'SYO-USER1-XBRACE-0.1',
  physicalDemand:defined,unresolvedConditions:['CENTER_SPOT_TOOLING_ENVELOPE_UNRESOLVED']
});
assert.equal(handoff.requiredGeometryDatumFacts.parentLengthIn,60);
const drill = handoff.operationDemand.find(op => op.kind==='DRILL');
assert.ok(drill);
assert.equal(drill.countPerPart,1);
assert.equal(drill.locationAlongLengthIn,8);
assert.equal(drill.derivation.formula,'finishedLengthIn / 2');
assert.equal(handoff.authority.physicalFabrication,false);

const boardSandbox = {window:{}};
vm.runInNewContext(boardSource,boardSandbox,{filename:'stb-user-defined-board-store.js'});
const boardStore = boardSandbox.window.STBUserDefinedBoardStore;
const sequence = boardStore.sequenceCrosscuts({parentLengthIn:60,parts:[16,16],establishAngledEnd:true});
assert.equal(sequence.status,'SEQUENCED');
assert.equal(sequence.rows.length,1);
assert.equal(sequence.rows[0].remainingIn,27.625);
assert.equal(sequence.holdIn,24);
assert.equal(sequence.rows[0].remainingIn-sequence.holdIn,3.625);

console.log('PASS · Start Your Own intent → bench → Store → terms path preserves one 60-in definition');
