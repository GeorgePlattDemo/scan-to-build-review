import fs from 'node:fs';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';

const read = p => fs.readFileSync(p,'utf8');
const gitBlobSha = text => crypto.createHash('sha1')
  .update('blob '+Buffer.byteLength(text,'utf8')+'\0'+text,'utf8')
  .digest('hex');

const immutable = new Map([
  ['system-build-base-8d8a9dd.html','67f3c5324ac7ab2ccd798b0dc0d7179b0912eef4'],
  ['stb-window-seat-space-utilization-0.7.3.html','825a9bce833e982b727e0b48a7416a660543a358'],
  ['stb-window-seat-space-utilization-0.7.4.html','96c85feef57b1196093e56495e7141452fc749a4'],
  ['system-build-front-door-0.5.html','5ac9677bdd7b508a633c357d46a217062708cdb2'],
  ['stb-canonical-journey.js','e0619841d245b392b4065d5aa5770fe7feaeb7eb'],
  ['store-zero-canonical-doctrine.js','653663671f61dd77e0dae73917d33b8a8e896fd2'],
  ['stb-outdoor-reference-authority-0.3.html','289e178b1c7a526c802e908155d4405e593cc706'],
  ['STB-OUTDOOR-ANGLED-FRAME-RESEARCH-DOSSIER-0.1.html','5c7d1acb78f65ab421423f531c87d2b4eb41059a'],
  ['stb-outdoor-build-deck-0.1.html','8d619fbec7954c13d82a3b187c7d4fc5b84f46e7']
]);

for (const [file,expected] of immutable) {
  assert.equal(gitBlobSha(read(file)),expected,'RECOVERY PRESERVATION FAILURE: '+file+' changed');
}

const shell = read('system-build-current.html');

// Alcove stays a mature reference implementation. Recovery wiring must route around it.
for (const token of [
  'Store Answer',
  'Accept / Pay',
  'Store / Yard',
  'Handoff / Record',
  "returnedOffer.id = 'alcove-store-returned-offer'",
  'ALCOVE STORE CONTENT CONSERVATION RULE',
  'NO BLOOD ON WOOD'
]) assert.ok(shell.includes(token),'RECOVERY PRESERVATION FAILURE: missing Alcove invariant '+token);

// Window Seat stays on the accepted 0.7.4 artifact and retains the actor projection.
assert.match(shell,/stb-window-seat-space-utilization-0\.7\.4\.html\?v=96c85fee/);
for (const token of ['Store Answer','Accept / Pay','Store / Yard','Handoff / Record'])
  assert.ok(shell.includes(token),'RECOVERY PRESERVATION FAILURE: missing Window Seat actor label '+token);

console.log('PASS · recovery preservation guard · Alcove and Window Seat frozen');
