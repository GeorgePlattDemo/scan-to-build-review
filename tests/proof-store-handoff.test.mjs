import fs from 'node:fs';
import assert from 'node:assert/strict';

const shell = fs.readFileSync('system-build-current.html','utf8');
const own = fs.readFileSync('stb-start-own-0.11.html','utf8');
const outdoor = fs.readFileSync('stb-outdoor-build.html','utf8');

for (const id of ['proof-store','proof-accept','proof-yard','proof-record']) {
  assert.ok(shell.includes("'"+id+"'"), 'missing common handoff page '+id);
}
assert.match(own,/STB_START_OWN_CONFIRMED/);
assert.match(outdoor,/STB_OUTDOOR_CONFIRMED/);
assert.match(shell,/type === 'STB_START_OWN_CONFIRMED'/);
assert.match(shell,/type === 'STB_OUTDOOR_CONFIRMED'/);
assert.match(shell,/proofHandoff = \{job:'JOB 1 · START YOUR OWN'/);
assert.match(shell,/proofHandoff = \{job:'JOB 2 · OUTDOOR BUILD'/);

const proofStoreBlock = shell.slice(shell.indexOf("ensureProjectJourneyPage('proof-store'"), shell.indexOf("ensureProjectJourneyPage('proof-accept'"));
assert.match(proofStoreBlock,/STB-ZERO-SPF-2X4-72-001 · \$3\.13 \/ ea/);
assert.match(proofStoreBlock,/STORE-PRICING-BRIDGE-GAP/);
assert.match(proofStoreBlock,/MITER_LIMITED/);
assert.match(proofStoreBlock,/10° DOUBLE BEVEL/);
assert.match(proofStoreBlock,/15½ in kept length is also below the current D-001 two-roller 24 in control floor/);
assert.match(proofStoreBlock,/PROJECT-CARRIED MATERIAL BASIS/);
assert.match(proofStoreBlock,/UNRESOLVED · class-scoped recovery not published/);
assert.match(proofStoreBlock,/LEGACY GENERAL RECOVERY<\/b><span>NOT SELECTED/);
assert.doesNotMatch(proofStoreBlock,/STB-STORE-ZERO-PRICE-1 · 0\.2\.2/);
assert.doesNotMatch(proofStoreBlock,/\$35 setup charge/);
assert.doesNotMatch(proofStoreBlock,/\$100\/hour modeled machine recovery/);

assert.match(shell,/COMMERCIAL OFFER<\/b><span>NOT ESTABLISHED/);
assert.match(shell,/PAYMENT<\/b><span>NOT AVAILABLE \/ NOT RECORDED/);
assert.match(shell,/PRODUCTION RELEASE<\/b><span>NOT ESTABLISHED/);
assert.match(shell,/CYCLE START<\/b><span>NOT AUTHORIZED/);
assert.match(shell,/NO BLOOD ON WOOD/);
assert.equal(/\bG0?\d\b|\bM0?3\b|G-code|remote Cycle Start/i.test(shell+own+outdoor),false);

console.log('PASS · common proof Store handoff and pricing-gap contract');
