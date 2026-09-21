import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';

const read = path => fs.readFileSync(path,'utf8');
const surface = read('three-frames.html');
const shell = read('system-build-current.html');
const contractSource = read('stb-store-handoff-contract.js');
const boardSource = read('stb-user-defined-board-store.js');

assert.match(surface,/2×4 · 60 in/,'60-in defined workpiece changed');
assert.match(surface,/27⅝ in remains/,'60-in retained math changed');
assert.match(surface,/3⅝ in spare/,'60-in spare math changed');
assert.match(surface,/id="stb-user1-length"[^>]*value="16"/);
assert.match(surface,/id="stb-user1-angle"[^>]*value="30"/);
assert.match(surface,/Center spot = 16 ÷ 2 = 8 in/);
assert.equal(surface.includes('FRAME 1 · THE WARM INTRO'),false,'FRAME 1 artifact returned');
assert.equal(surface.includes('>USER 1 INTENT<'),false,'intent frame label returned');
assert.equal(surface.includes('PREVIEW — the three frames'),false,'preview artifact returned');
assert.equal(surface.includes('<p>2×6 stud</p>'),false,'2×6 was re-added to the six-item Store glossary');
assert.equal(surface.includes('<p>2×8 stud</p>'),false,'2×8 was re-added to the six-item Store glossary');
for(const key of ['1x6p','1x6w','1x6c','1x8o','2x4','p75']){
  assert.match(surface,new RegExp('data-store-size-key="'+key+'"'),'missing Store glossary key '+key);
}

assert.match(shell,/const parentLengthIn = 60;/,'60-in project fact is not frozen in the live definition');
assert.match(shell,/parentLengthIn:parentLengthIn/,'60-in workpiece is not carried into physical demand');
assert.match(shell,/spotDemand:\{/,'center spot is not structured demand');
assert.match(shell,/formula:'finishedLengthIn \/ 2'/,'center-spot derivation is not retained');
assert.match(shell,/same 60-in defined workpiece/,'Store answer no longer names the same 60-in definition');
assert.equal(shell.includes('60-in customer board'),false,'customer-supplied-board wording returned');
assert.equal(shell.includes('photo, board, or file you already have'),false,'bring-your-own physical board path returned');
assert.match(shell,/stb-store-handoff-contract\.js\?v=6be08595/);
assert.match(shell,/three-frames\.html\?v=9f0bf567/);

const sandbox = {window:{}};
vm.runInNewContext(contractSource,sandbox,{filename:'stb-store-handoff-contract.js'});
const contract = sandbox.window.STBStoreHandoffContract;
assert.equal(contract.version,'0.5','shared Store contract version changed');

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
assert.equal(contract.sameStoreDemand(legacyStart,legacyOutdoor),true,'optional Start Own fields changed legacy comparison demand');

const defined = {
  stockClass:'2x4',
  parentLengthIn:60,
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
  spotDemand:{
    required:true,
    mode:'SPOT_ON_LOCATION',
    countPerPart:1,
    locationRule:'CENTERED_ON_PART',
    locationAlongLengthIn:8,
    acrossWidthRule:'CENTERED_ON_WIDE_FACE',
    derivation:{basis:'DERIVED',formula:'finishedLengthIn / 2',input:{finishedLengthIn:16},output:{locationAlongLengthIn:8}},
    toolingStatus:'UNRESOLVED'
  }
};
const handoff = contract.createComparisonHandoff({
  projectId:'start-own',
  projectClass:'USER_DEFINED_BOARD',
  definitionId:'SYO-USER1-XBRACE-0.1',
  physicalDemand:defined,
  unresolvedConditions:['CENTER_SPOT_TOOLING_ENVELOPE_UNRESOLVED']
});
assert.equal(handoff.requiredGeometryDatumFacts.parentLengthIn,60,'Store handoff rewrote the 60-in workpiece');
const drill = handoff.operationDemand.find(op => op.kind==='DRILL');
assert.ok(drill,'center spot did not reach structured Store demand');
assert.equal(drill.countPerPart,1);
assert.equal(drill.locationAlongLengthIn,8);
assert.equal(drill.derivation.formula,'finishedLengthIn / 2');
assert.equal(handoff.authority.physicalFabrication,false);

const boardSandbox = {window:{}};
vm.runInNewContext(boardSource,boardSandbox,{filename:'stb-user-defined-board-store.js'});
const boardStore = boardSandbox.window.STBUserDefinedBoardStore;
const sequence = boardStore.sequenceCrosscuts({parentLengthIn:60,parts:[16,16],establishAngledEnd:true});
assert.equal(sequence.status,'SEQUENCED');
assert.equal(sequence.rows[0].remainingIn,27.625);
assert.equal(sequence.holdIn,24);
assert.equal(sequence.rows[0].remainingIn-sequence.holdIn,3.625);

console.log('PASS · Start Your Own preserves Store-origin 60-in one-definition path');
