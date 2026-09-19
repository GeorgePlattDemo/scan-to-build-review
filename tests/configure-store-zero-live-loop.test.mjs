import fs from 'node:fs';
import assert from 'node:assert/strict';

const read = p => fs.readFileSync(p, 'utf8');
const startOwn = read('stb-start-own-0.11.html');
const shell = read('system-build-current.html');
const contract = read('stb-store-handoff-contract.js');

assert.match(startOwn, /stb-store-handoff-contract\.js\?v=2b6c3259/);
assert.match(startOwn, /<div class="flowstack" id="flow">[\s\S]*operationPanel\(\)\+modeledWorkPanel\(\)\+referenceCostPanel\(\)/);
assert.match(startOwn, /function currentStoreAuthority\(\)/);
assert.match(startOwn, /function storeCapabilityModel\(\)/);
assert.match(startOwn, /PINNED_STORE_ZERO_OFFERING/);
assert.match(startOwn, /START-OWN-CLASS-SCOPED-RECOVERY-NOT-PUBLISHED/);
assert.match(startOwn, /No retired general recovery formula is selected for Start Your Own/i);
assert.match(startOwn, /CURRENT COMBINED BASIS<\/span><b>NOT COMPLETE<\/b>/);
assert.match(startOwn, /Processing \/ fulfillment recovery/);
assert.match(startOwn, /storeReference:\{/);
assert.match(startOwn, /unresolvedConditions:live\.unresolvedConditions\.slice\(\)/);
assert.match(startOwn, /Every change above recomputes the material and operation demand against the pinned Store Zero offering/);

assert.equal(/setupCharge\s*[:=]/.test(startOwn), false);
assert.equal(/machineHourRate\s*[:=]/.test(startOwn), false);
assert.equal(/35\s*\+\s*100/.test(startOwn), false);
assert.equal(/\$35|\$100\/hour|STB-STORE-ZERO-PRICE-1|0\.2\.2/.test(startOwn+shell), false);
assert.equal(/lens:\{|panels:\{/.test(startOwn), false);
assert.match(startOwn, /function storeMaterialResolution\(\)/);
assert.match(startOwn, /resolveStartOwnMaterial/);
assert.match(startOwn, /Store Zero SKU/);

assert.match(contract, /version:'0\.3'/);
assert.match(contract, /resolveStartOwnMaterial:resolveStartOwnMaterial/);
assert.match(contract, /"storeSku": "STB-ZERO-SPF-2X4-192-001"/);
assert.match(contract, /"sellingPrice": 8\.36/);
assert.match(contract, /doctrinePin:'f88ec61c42446755d00259f88e7fd09f2702fd92'/);
assert.match(contract, /catalogPin:'4402abeb6b0299a5b6db2eec85ed04c3b0236bcc'/);
assert.match(contract, /economicsStatus:'UNRESOLVED_CLASS_SCOPED_RECOVERY'/);
assert.match(contract, /legacyGeneralRecoverySelected:false/);
assert.match(contract, /economicsModel:'STB-STORE-ZERO-WINDOW-SEAT-RECOVERY-0\.1'/);
assert.match(contract, /projectId:'alcove'[\s\S]*economicsModel:null[\s\S]*legacyGeneralRecoverySelected:false/);

assert.match(shell, /stb-store-handoff-contract\.js\?v=2b6c3259/);
assert.match(shell, /stb-start-own-0\.11\.html\?v=7fa1682e/);
assert.match(shell, /payload\.storeReference\?\.unresolvedConditions/);
assert.match(shell, /Array\.isArray\(payload\.storeReference\?\.unresolvedConditions\)/);

console.log('PASS · Configure recomputes a live Store Zero basis without selecting legacy general recovery');
