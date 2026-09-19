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

assert.match(shell,/STB-STORE-ZERO-PRICE-1 · 0\.2\.2/);
assert.match(shell,/STB-D001-CYCLE-MODEL-S2-0\.1 · CALCULATED · measured false/);
assert.match(shell,/D001-STAGE2-ENVELOPE-0\.2/);
assert.match(shell,/STB-ZERO-SPF-2X4-72-001 · \$3\.13 \/ ea/);
assert.match(shell,/STORE-PRICING-BRIDGE-GAP/);
assert.match(shell,/BOARD_SQUARE_V1/);
assert.match(shell,/CROSSCUT/);
assert.match(shell,/MITER_LIMITED/);
assert.match(shell,/10° DOUBLE BEVEL/);
assert.match(shell,/15½ in kept length is also below the current D-001 two-roller 24 in control floor/);
assert.match(shell,/8-minute modeled job setup/);
assert.match(shell,/\$35 setup charge/);
assert.match(shell,/\$100\/hour modeled machine recovery/);
assert.match(shell,/material \$3\.13 \+ modeled cell recovery \$50\.81 = budgetary Q \$53\.94/);
assert.match(shell,/different square-crosscut demand, not authority to price this double-bevel part/);

assert.match(shell,/COMMERCIAL OFFER<\/b><span>NOT ESTABLISHED/);
assert.match(shell,/PAYMENT<\/b><span>NOT AVAILABLE \/ NOT RECORDED/);
assert.match(shell,/PRODUCTION RELEASE<\/b><span>NOT ESTABLISHED/);
assert.match(shell,/CYCLE START<\/b><span>NOT AUTHORIZED/);
assert.match(shell,/NO BLOOD ON WOOD/);
assert.equal(/\bG0?\d\b|\bM03?\b|G-code|remote Cycle Start/i.test(shell+own+outdoor),false);

console.log('PASS · common proof Store handoff and pricing-gap contract');
