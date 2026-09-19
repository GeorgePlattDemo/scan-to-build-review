import fs from 'node:fs';
import assert from 'node:assert/strict';

const read = p => fs.readFileSync(p, 'utf8');
const startOwn = read('stb-start-own-0.11.html');
const shell = read('system-build-current.html');
const contract = read('stb-store-handoff-contract.js');

assert.match(startOwn, /stb-store-handoff-contract\.js\?v=0\.2/);
assert.match(startOwn, /<div class="flowstack" id="flow">[\s\S]*operationPanel\(\)\+modeledWorkPanel\(\)\+referenceCostPanel\(\)/);
assert.match(startOwn, /function currentStoreAuthority\(\)/);
assert.match(startOwn, /function storeCapabilityModel\(\)/);
assert.match(startOwn, /CURRENT_CANONICAL_STORE_ZERO/);
assert.match(startOwn, /START-OWN-CLASS-SCOPED-RECOVERY-NOT-PUBLISHED/);
assert.match(startOwn, /legacy general \$35 setup \+ \$100\/hour recovery is not selected for Start Your Own/i);
assert.match(startOwn, /CURRENT COMBINED BASIS<\/span><b>NOT COMPLETE<\/b>/);
assert.match(startOwn, /Processing \/ fulfillment recovery/);
assert.match(startOwn, /storeReference:\{/);
assert.match(startOwn, /unresolvedConditions:live\.unresolvedConditions\.slice\(\)/);
assert.match(startOwn, /Every change above recomputes the material and operation demand sent to the Store reference/);

assert.equal(/setupCharge\s*[:=]/.test(startOwn), false);
assert.equal(/machineHourRate\s*[:=]/.test(startOwn), false);
assert.equal(/35\s*\+\s*100/.test(startOwn), false);

assert.match(contract, /doctrinePin:'f88ec61c42446755d00259f88e7fd09f2702fd92'/);
assert.match(contract, /catalogPin:'4402abeb6b0299a5b6db2eec85ed04c3b0236bcc'/);
assert.match(contract, /economicsStatus:'UNRESOLVED_CLASS_SCOPED_RECOVERY'/);
assert.match(contract, /legacyGeneralRecoverySelected:false/);
assert.match(contract, /economicsModel:'STB-STORE-ZERO-WINDOW-SEAT-RECOVERY-0\.1'/);

assert.match(shell, /stb-store-handoff-contract\.js\?v=0bc7c076/);
assert.match(shell, /stb-start-own-0\.11\.html\?v=0c7557a5/);
assert.match(shell, /payload\.storeReference\?\.unresolvedConditions/);
assert.match(shell, /Array\.isArray\(payload\.storeReference\?\.unresolvedConditions\)/);

console.log('PASS · Configure recomputes a live Store Zero basis without selecting legacy general recovery');
