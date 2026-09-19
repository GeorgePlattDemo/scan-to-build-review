import fs from 'node:fs';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';

const read=p=>fs.readFileSync(p,'utf8');
const artifact=read('stb-start-own-0.10.html');
const shell=read('system-build-current.html');
const candidate=read('stb-start-own-0.11.html');
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
assert.match(shell,/startOwnTile\.dataset\.startOwnArtifact = 'stb-start-own-0\.11\.html'/);
assert.match(shell,/src="stb-start-own-0\.11\.html\?v=9552caea"/);
assert.equal(gitBlobSha(candidate),'9552caea5a7b9259541d894b01913d8115ec4f1e','Start Your Own 0.11 repaired candidate changed unexpectedly');
assert.match(candidate,/ANGLED_CUT/);
assert.match(candidate,/STB_START_OWN_CONFIRMED/);
assert.match(shell,/originalShow\.call\(win, 'start-own-live'\)/);
assert.match(shell,/selectJourneyProject\(null\)/);

// The lock must not disturb the existing gold-standard and shared boundaries.
assert.equal(gitBlobSha(seat),'96c85feef57b1196093e56495e7141452fc749a4','Window Seat 0.7.4 changed');
assert.equal(gitBlobSha(doctrine),'653663671f61dd77e0dae73917d33b8a8e896fd2','Store doctrine changed');
assert.equal(gitBlobSha(base),'67f3c5324ac7ab2ccd798b0dc0d7179b0912eef4','Alcove base changed');

console.log('PASS · Start Your Own 0.10 locked; 0.11 active candidate');
