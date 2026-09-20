import fs from 'node:fs';
import vm from 'node:vm';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';

const read = p => fs.readFileSync(p,'utf8');
const blob = text => crypto.createHash('sha1')
  .update('blob '+Buffer.byteLength(text,'utf8')+'\0'+text,'utf8')
  .digest('hex');

const locked = read('stb-start-own-0.10.html');
const startOwn = read('stb-start-own-recovery.html');
const outdoor = read('stb-outdoor-build.html');
const contractSource = read('stb-store-handoff-contract.js');
const shell = read('system-build-current.html');
const recoverySpine = read('stb-recovery-store-spine.js');

assert.equal(blob(locked),'cbdb02996e161b951704acae29d8da2dd1c68c03','locked Start Your Own 0.10 moved');

const sandbox={window:{}};
vm.runInNewContext(contractSource,sandbox,{filename:'stb-store-handoff-contract.js'});
const contract=sandbox.window.STBStoreHandoffContract;
assert.ok(contract,'recovery Store contract did not load');

assert.deepEqual(Object.keys(contract.currentArtifacts).sort(),['outdoor','startOwn']);
assert.equal(contract.storeAuthority('alcove'),null,'recovery contract reached into Alcove');
assert.equal(contract.storeAuthority('windowSeat'),null,'recovery contract reached into Window Seat');
assert.equal(contract.storeAuthority('startOwn').economicsStatus,'UNRESOLVED_CLASS_SCOPED_RECOVERY');
assert.equal(contract.storeAuthority('outdoor').economicsStatus,'UNRESOLVED_CLASS_SCOPED_RECOVERY');

const material=contract.resolveStartOwnMaterial({
  sizeKey:'2x4',
  parts:[{name:'bench leg',len:16.5,wid:3.5,qty:8}]
});
assert.equal(material.status,'MAPPED');
assert.ok(material.storeSku);
assert.ok(Number.isFinite(material.materialTotal));

for (const [name,source] of [['Start Your Own recovery',startOwn],['Outdoor recovery',outdoor]]) {
  assert.match(source,/stb-store-handoff-contract\.js\?v=f740518e/);
  assert.match(source,/createProjectHandoff/);
  assert.match(source,/STB_RECOVERY_STORE_HANDOFF/);
  assert.match(source,/UNRESOLVED_CLASS_SCOPED_RECOVERY/);
  for (const stale of ['$35 setup','$100/hour','$425','56.16']) {
    assert.equal(source.includes(stale),false,name+' contains stale recovery formula '+stale);
  }
}

assert.match(outdoor,/DETACHED BENCH REPLACEMENT LEG/);
assert.match(outdoor,/16½ in cited starting geometry · square ends/);
assert.equal(outdoor.includes('REF.syoPrice'),false,'Outdoor local price authority returned');

assert.match(shell,/src="stb-start-own-recovery\.html\?v=d4196885"/);
assert.match(shell,/src="stb-outdoor-build\.html\?v=01088535"/);
assert.match(shell,/STB_RECOVERY_STORE_HANDOFF/);
assert.match(shell,/stb-recovery-store-spine\.js\?v=88547e04/);
assert.match(shell,/STBRecoveryStoreSpine\?\.install/);
for (const id of ['recovery-store-answer','recovery-accept-pay','recovery-store-yard','recovery-handoff-record'])
  assert.ok(recoverySpine.includes(id),'missing common recovery Store stage '+id);

assert.match(recoverySpine,/Acknowledging a reference answer is not commercial acceptance/);
assert.match(recoverySpine,/CYCLE START<\/b><span>LOCAL · NOT AUTHORIZED HERE/);
assert.match(recoverySpine,/READY remains separate from custody/);
assert.match(recoverySpine,/NO BLOOD ON WOOD/);

console.log('PASS · recovery common Store spine');
