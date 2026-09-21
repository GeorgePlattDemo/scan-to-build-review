import fs from 'node:fs';
import assert from 'node:assert/strict';

const shell = fs.readFileSync('system-build-current.html','utf8');
const own = fs.readFileSync('stb-start-own-0.11.html','utf8');
const outdoor = fs.readFileSync('stb-outdoor-build.html','utf8');

for (const id of ['proof-store','proof-accept','proof-yard','proof-terms','proof-record']) {
  assert.ok(shell.includes("'"+id+"'"), 'missing common handoff page '+id);
}
assert.match(own,/STB_START_OWN_CONFIRMED/);
assert.match(outdoor,/STB_OUTDOOR_CONFIRMED/);
assert.match(shell,/type === 'STB_START_OWN_CONFIRMED'/);
assert.match(shell,/type === 'STB_OUTDOOR_CONFIRMED'/);
assert.match(shell,/proofHandoff = \{job:'JOB 1 · START YOUR OWN'/);
assert.match(shell,/proofHandoff = \{job:'JOB 2 · OUTDOOR BUILD'/);

assert.match(shell,/MATERIAL SOURCE/);
assert.match(shell,/MAPPED STORE SKU/);
assert.match(shell,/MATERIAL VALUE/);
assert.match(shell,/PROCESSING \/ FULFILLMENT RECOVERY/);
assert.match(shell,/CURRENT COMBINED VALUE/);
assert.match(shell,/STORE-PRICING-BRIDGE-GAP/);
assert.match(shell,/no retired square-crosscut recovery formula is reused/i);
assert.match(shell,/no legacy general recovery selected/);
assert.equal(/STB-STORE-ZERO-PRICE-1|0\.2\.2|\$35 setup|\$100\/hour|\$50\.81|\$53\.94/.test(shell),false);

assert.match(shell,/COMMERCIAL OFFER<\/b><span>NOT ESTABLISHED/);
assert.match(shell,/TERMS · COMMERCIAL PATH/);
assert.match(shell,/COMBINED COMMERCIAL PRICE<\/b><span>NOT COMPLETE/);
assert.match(shell,/terms:'proof-terms'/);
assert.match(shell,/PAYMENT<\/b><span>NOT AVAILABLE \/ NOT RECORDED/);
assert.match(shell,/PRODUCTION RELEASE<\/b><span>NOT ESTABLISHED/);
assert.match(shell,/CYCLE START<\/b><span>NOT AUTHORIZED/);
assert.match(shell,/NO BLOOD ON WOOD/);
assert.equal(/\bG0?\d\b|\bM0?3\b|G-code|remote Cycle Start/i.test(shell+own+outdoor),false);

console.log('PASS · common proof Store handoff and pricing-gap contract');
