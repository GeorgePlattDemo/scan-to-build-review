import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';

const read = path => fs.readFileSync(path,'utf8');
const shell = read('system-build-current.html');
const startOwn = read('stb-start-own-0.11.html');
const outdoor = read('stb-outdoor-build.html');
const windowSeat = read('stb-window-seat-space-utilization-0.7.4.html');
const contractSource = read('stb-store-handoff-contract.js');

const sandbox = {window:{}};
vm.runInNewContext(contractSource,sandbox,{filename:'stb-store-handoff-contract.js'});
const contract = sandbox.window.STBStoreHandoffContract;

assert.ok(contract,'shared Store handoff contract did not load');
assert.equal(contract.version,'0.3');
assert.deepEqual(
  Array.from(contract.actorOrder),
  ['project-definition','store-answer','accept-pay','store-yard','handoff-record','project-library']
);

assert.equal(contract.currentArtifacts.startOwn.artifact,'stb-start-own-0.11.html');
assert.equal(contract.currentArtifacts.outdoor.artifact,'stb-outdoor-build.html');
assert.equal(contract.currentArtifacts.alcove.artifact,'system-build-current.html#alcove-capture');
assert.equal(contract.currentArtifacts.windowSeat.artifact,'stb-window-seat-space-utilization-0.7.4.html');
assert.equal(contract.currentArtifacts.sheetS001.artifact,'system-build-current.html#playhouse-s001');

assert.equal(contract.storeAuthority('startOwn').capabilityPin,'f88ec61c42446755d00259f88e7fd09f2702fd92');
assert.equal(contract.storeAuthority('startOwn').materialCatalogPin,'4402abeb6b0299a5b6db2eec85ed04c3b0236bcc');
assert.equal(contract.storeAuthority('startOwn').legacyGeneralRecoverySelected,false);
assert.equal(contract.storeAuthority('windowSeat').economicsModel,'STB-STORE-ZERO-WINDOW-SEAT-RECOVERY-0.1');
assert.equal(contract.storeAuthority('alcove').economicsModel,null);
assert.equal(contract.storeAuthority('alcove').legacyGeneralRecoverySelected,false);
const shelfMaterial = contract.resolveStartOwnMaterial({
  sizeKey:'2x4',
  parts:[{name:'Side',len:36,wid:3.5,qty:2},{name:'Shelf',len:27,wid:3.5,qty:4}]
});
assert.equal(shelfMaterial.status,'MAPPED');
assert.equal(shelfMaterial.storeSku,'STB-ZERO-SPF-2X4-192-001');
assert.equal(shelfMaterial.materialTotal,8.36);

assert.match(shell,/stb-store-handoff-contract\.js\?v=/);
assert.match(shell,/dataset\.startOwnArtifact = 'stb-start-own-0\.11\.html'/);
assert.match(shell,/dataset\.outdoorBuildArtifact = 'stb-outdoor-build\.html'/);
assert.match(shell,/dataset\.windowSeatArtifact = 'stb-window-seat-space-utilization-0\.7\.4\.html'/);

const comparisonPart = {
  stockClass:'2x4',
  finishedLength:15.5,
  quantity:8,
  endCondition:'angled',
  straightCut:true,
  angleDegrees:10,
  angleReference:'source-stated',
  cutPlane:'bevel-thickness',
  endIdentity:'both',
  endRelation:'parallel',
  lengthDatum:'source-length'
};

const job1 = contract.createComparisonHandoff({
  projectId:'start-own',
  projectClass:'USER_DEFINED_BOARD',
  definitionId:'SYO-TEST',
  physicalDemand:comparisonPart,
  sourceAuthority:{kind:'USER-DEFINED'},
  unresolvedConditions:['STORE-PRICING-BRIDGE-GAP']
});
const job2 = contract.createComparisonHandoff({
  projectId:'outdoor-build',
  projectClass:'BOUNDED_SOURCE_BACKED',
  definitionId:'OB-SAW-TEST',
  physicalDemand:comparisonPart,
  sourceAuthority:{kind:'BOUNDED SOURCE-BACKED'},
  unresolvedConditions:['STORE-PRICING-BRIDGE-GAP']
});

assert.equal(contract.sameStoreDemand(job1,job2),true,'comparison jobs diverged at Store demand');
assert.notDeepEqual(job1.sourceAuthority,job2.sourceAuthority,'provenance was incorrectly flattened into physical demand');
assert.equal(job1.authority.commercial,false);
assert.equal(job1.authority.productionRelease,false);
assert.equal(job1.authority.machineReadiness,false);
assert.equal(job1.authority.cycleStart,false);
assert.equal(job1.authority.physicalFabrication,false);

assert.match(startOwn,/STB_START_OWN_CONFIRMED/);
assert.match(startOwn,/S\.handoff=\{id:id,definition:/);
assert.match(outdoor,/STB_OUTDOOR_CONFIRMED/);
assert.match(outdoor,/normalizedPart:normalized/);
assert.match(shell,/createComparisonStoreHandoff\('start-own'/);
assert.match(shell,/payload\.storeReference\?\.unresolvedConditions/);
assert.match(shell,/createComparisonStoreHandoff\('outdoor'/);
assert.match(shell,/stb-proof-store-demand-equality/);
assert.match(shell,/sameStoreDemand:storeHandoffContract\.sameStoreDemand\(job1,job2\)/);

assert.match(shell,/Confirmed version sent to Store Zero\./);
assert.match(windowSeat,/project:\{id:'window-seat'/);
assert.match(windowSeat,/storeRequest:req/);
assert.match(windowSeat,/storeAnswer:answer/);
assert.match(windowSeat,/commercial:false/);
assert.match(shell,/PRIMARY STORE REQUEST<\/b><span>SHEET_MODE2_ARCHED_APERTURE_V0/);
assert.match(shell,/PRIMARY STORE RESULT<\/b><span>SUPPORTABLE · REFERENCE/);
assert.match(shell,/CENTER ROUTE \/ STRAIGHT CUTS<\/b><span>UNRESOLVED/);

for (const label of ['STORE ANSWER','ACCEPT / PAY','STORE / YARD','HANDOFF / RECORD']) {
  assert.ok(shell.includes(label),'missing canonical actor label '+label);
}
assert.match(shell,/data-proof-return-source/);
assert.match(shell,/data-proof-library/);
assert.match(shell,/\['alcove-capture','alcove-config','store','request','yard','record','window-parts','playhouse-s001'/);

assert.match(shell,/const QUARANTINED_OUTDOOR_TARGETS = new Set\(\['picnic-chooser','picnic-config','picnic-store','picnic-review','picnic-request','picnic-yard','picnic-terms','picnic-recap','picnic-record'\]\)/);
assert.match(shell,/function openCurrentOutdoorBuildFromLegacyRoute\(\) \{[\s\S]*selectJourneyProject\(null\)[\s\S]*originalShow\.call\(win, 'outdoor-build-live'\)/);
assert.match(shell,/if \(QUARANTINED_OUTDOOR_TARGETS\.has\(target\)\) \{[\s\S]*openCurrentOutdoorBuildFromLegacyRoute\(\)/);
assert.match(shell,/outdoorTile\.removeAttribute\('data-go'\)/);
assert.match(shell,/originalShow\.call\(win, 'outdoor-build-live'\)/);

assert.match(shell,/UNRESOLVED · CURRENT MODEL MISMATCH/);
assert.match(shell,/PAYMENT<\/b><span>NOT AVAILABLE \/ NOT RECORDED/);
assert.match(shell,/PRODUCTION RELEASE<\/b><span>NOT ESTABLISHED/);
assert.match(shell,/CYCLE START<\/b><span>NOT AUTHORIZED/);
assert.match(shell,/PHYSICAL FABRICATION<\/b><span>NOT RECORDED/);

console.log('PASS · current five-project Store convergence and legacy Outdoor quarantine');
