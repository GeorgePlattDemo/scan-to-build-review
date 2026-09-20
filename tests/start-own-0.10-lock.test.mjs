import fs from 'node:fs';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';

const read=p=>fs.readFileSync(p,'utf8');
const artifact=read('stb-start-own-0.10.html');
const candidate=read('stb-start-own-recovery.html');
const shell=read('system-build-current.html');
const seat=read('stb-window-seat-space-utilization-0.7.4.html');
const doctrine=read('store-zero-canonical-doctrine.js');
const base=read('system-build-base-8d8a9dd.html');

const gitBlobSha=text=>crypto.createHash('sha1')
  .update('blob '+Buffer.byteLength(text,'utf8')+'\0'+text,'utf8')
  .digest('hex');

assert.equal(
  gitBlobSha(artifact),
  'cbdb02996e161b951704acae29d8da2dd1c68c03',
  'locked Start Your Own 0.10 artifact changed'
);

assert.match(artifact,/Scan-to-Build · Start Your Own · Definition to Doing/);
assert.match(artifact,/Two clicks put it on the bench\. A few more make it yours\./);
assert.match(artifact,/CUT TO LENGTH/);
assert.match(artifact,/These operations are derived from the current parts/);
assert.match(artifact,/LOOKS RIGHT — SEND TO STORE →/);
assert.match(artifact,/The Store answers that version; it does not redesign it/);
assert.match(artifact,/Confirmation is not an order, payment, allocation, production release, machine readiness or Cycle Start/);
assert.match(artifact,/NO BLOOD ON WOOD/);

assert.match(shell,/startOwnTile = ribbon\.querySelector\('\.tile\[data-go="start-own"\]'\)/);
assert.match(shell,/startOwnTile\.removeAttribute\('data-go'\)/);
assert.match(shell,/startOwnTile\.dataset\.startOwnArtifact = 'stb-start-own-recovery\.html'/);
assert.match(shell,/src="stb-start-own-recovery\.html\?v=b9ed1715"/);
assert.equal(gitBlobSha(candidate),'b9ed1715548ff640769608a79f0fa57dd7f67f6c','Start Your Own recovery candidate drifted');
assert.match(candidate,/stb-store-handoff-contract\.js\?v=f740518e/);
assert.match(candidate,/createProjectHandoff/);
assert.match(candidate,/STB_RECOVERY_STORE_HANDOFF/);
assert.match(candidate,/STB_RECOVERY_DEFINITION_CURRENT/);
assert.match(candidate,/Current Store-derived value/);
assert.match(candidate,/Combined value[\s\S]*NOT COMPLETE/);
assert.match(shell,/originalShow\.call\(win, 'start-own-live'\)/);
assert.match(shell,/selectJourneyProject\('start-own'\)/);

// The lock must not disturb the existing gold-standard and shared boundaries.
assert.equal(gitBlobSha(seat),'96c85feef57b1196093e56495e7141452fc749a4','Window Seat 0.7.4 changed');
assert.equal(gitBlobSha(doctrine),'653663671f61dd77e0dae73917d33b8a8e896fd2','Store doctrine changed');
assert.equal(gitBlobSha(base),'67f3c5324ac7ab2ccd798b0dc0d7179b0912eef4','Alcove base changed');

console.log('PASS · Start Your Own 0.10 locked behind project tile');

assert.equal(/startOwnTile\.addEventListener[\s\S]{0,500}selectJourneyProject\(null\)/.test(shell),false,'Start Your Own enters without project identity');
