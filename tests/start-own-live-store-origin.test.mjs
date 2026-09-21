import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';

const read = path => fs.readFileSync(path,'utf8');
const surface = read('three-frames.html');
const shell = read('system-build-current.html');
const contractSource = read('stb-store-handoff-contract.js');

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
assert.match(shell,/three-frames\.html\?v=305b7484/);
assert.match(shell,/const definedWorkpieceLengthIn = 60;/);
assert.match(shell,/parentLengthIn:definedWorkpieceLengthIn/);
assert.match(shell,/materialSource:'STORE_ZERO'/);
assert.match(shell,/sequenceDefinedWorkpiece/);
assert.match(shell,/preparationSawCuts/);
assert.match(shell,/const drillCycles = 0/);
assert.equal(shell.includes('previewFromDemand'),false,'active Start Own still invokes legacy Store preview authority');
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
assert.match(shell,/STORE BUDGETARY Q<\/b><span id="proof-store-q"/);
assert.match(shell,/PAYMENT<\/b><span>NOT AVAILABLE \/ NOT RECORDED/);
assert.equal(shell.includes('START-OWN-CLASS-SCOPED-RECOVERY-NOT-PUBLISHED'),false);
assert.equal(shell.includes('60-in customer board'),false);
assert.equal(shell.includes('photo, board, or file you already have'),false);
assert.equal(shell.includes('parentLengthIn = 72'),false);

// Shared contract preserves raw-stock lineage, the 60-in workpiece, and unresolved spot meaning.
const sandbox = {window:{}};
vm.runInNewContext(contractSource,sandbox,{filename:'stb-store-handoff-contract.js'});
const contract = sandbox.window.STBStoreHandoffContract;
assert.equal(contract.version,'0.6');
assert.equal(typeof contract.quoteStartOwnBoardSequence,'function');
assert.equal(typeof contract.sequenceDefinedWorkpiece,'function');

const lineage = contract.sequenceDefinedWorkpiece({
  rawStockLengthIn:72,
  definedWorkpieceLengthIn:60,
  parts:[16,16],
  establishAngledEnd:true
});
assert.equal(lineage.status,'SEQUENCED');
assert.equal(lineage.preparation.required,true);
assert.equal(lineage.preparation.retainedBeforeIn,72);
assert.equal(lineage.preparation.retainedAfterIn,60);
assert.equal(lineage.preparation.offcutIn,11.875);
assert.equal(lineage.production.length,3);
assert.equal(lineage.production[0].kind,'ESTABLISH_ANGLE');
assert.equal(lineage.finalRemainderIn,27.625);
assert.equal(lineage.holdIn,24);
assert.equal(lineage.finalRemainderIn-lineage.holdIn,3.625);

const startQuote = contract.quoteStartOwnBoardSequence({
  material:3.13,
  definedWorkpieceLengthIn:60,
  sawCuts:3,
  preparationSawCuts:1,
  sawAngleDeg:30,
  drillCycles:0,
  unresolvedConditions:[
    'MITER_LIMITED_NUMERIC_ANGLE_RANGE_STAGE2_UNRESOLVED',
    'CENTER_SPOT_TOOLING_ENVELOPE_UNRESOLVED'
  ],
  widthIn:3.5
});
assert.equal(startQuote.status,'BUDGETARY_ESTIMATE');
assert.equal(startQuote.complete,false);
assert.equal(startQuote.completeness,'PARTIAL');
assert.equal(startQuote.material,3.13);
assert.equal(startQuote.cellRecovery,51.45);
assert.equal(startQuote.total,54.58);
assert.equal(startQuote.cycle.T_job_min,9.867);
assert.equal(startQuote.operationBasis.preparationSawCuts,1);
assert.equal(startQuote.operationBasis.productionSawCuts,3);
assert.equal(startQuote.operationBasis.totalModeledSawCuts,4);
assert.equal(startQuote.operationBasis.drillCycles,0);
assert.equal(startQuote.engine.id,'STB-STORE-ZERO-PRICE-1');
assert.equal(startQuote.engine.version,'0.2.2');
assert.equal(startQuote.source.pin,'c51f5f27af9a77bc7581c5d42c56f0a1ed0b650a');

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
const spot = handoff.operationDemand.find(op => op.kind==='SPOT_ON_LOCATION');
assert.ok(spot);
assert.equal(spot.countPerPart,1);
assert.equal(spot.locationAlongLengthIn,8);
assert.equal(spot.derivation.formula,'finishedLengthIn / 2');
assert.equal(spot.toolingStatus,'UNRESOLVED');
assert.equal(handoff.operationDemand.some(op => op.kind==='DRILL'),false,'spot was silently converted into a drill operation');
assert.equal(handoff.authority.physicalFabrication,false);



console.log('PASS · Start Your Own intent → bench → Store → terms preserves one definition, raw-stock lineage, and unresolved spot meaning');
