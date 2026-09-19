import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';

const read = p => fs.readFileSync(p, 'utf8');
const startOwn = read('stb-start-own-0.11.html');
const shell = read('system-build-current.html');
const contract = read('stb-store-handoff-contract.js');

const slice = (src, start, end) => {
  const a = src.indexOf(start);
  assert.notEqual(a, -1, 'missing start marker: ' + start);
  const b = src.indexOf(end, a + start.length);
  assert.notEqual(b, -1, 'missing end marker: ' + end);
  return src.slice(a, b);
};

assert.match(startOwn, /stb-store-handoff-contract\.js\?v=2fa55141/);
assert.match(startOwn, /<div class="flowstack" id="flow">[\s\S]*operationPanel\(\)\+modeledWorkPanel\(\)\+referenceCostPanel\(\)/);
assert.match(startOwn, /function currentStoreContract\(\)/);
assert.match(startOwn, /function currentStoreOfferings\(sizeKey\)/);
assert.match(startOwn, /function currentStoreCatalogSource\(\)/);
assert.match(startOwn, /function currentStoreAuthority\(\)/);
assert.match(startOwn, /function requiredStoreOps\(\)/);
assert.match(startOwn, /function storeCapabilityModel\(\)/);
assert.match(startOwn, /PINNED_STORE_ZERO_CATALOG_PLUS_CURRENT_CAPABILITY_AUTHORITY/);
assert.match(startOwn, /START-OWN-CLASS-SCOPED-RECOVERY-NOT-PUBLISHED/);
assert.match(startOwn, /legacy general \$35 setup \+ \$100\/hour recovery is not selected for Start Your Own/i);
assert.match(startOwn, /CURRENT COMBINED BASIS<\/span><b>NOT COMPLETE<\/b>/);
assert.match(startOwn, /Processing \/ fulfillment recovery/);
assert.match(startOwn, /materialSku:live\.materialSku/);
assert.match(startOwn, /materialCatalogSource:live\.materialCatalogSource/);
assert.match(startOwn, /requiredOps:live\.requiredOps\.slice\(\)/);
assert.match(startOwn, /declaredOps:live\.declaredOps\.slice\(\)/);
assert.match(startOwn, /Every change above recomputes the material and operation demand sent to the Store reference/);

const buyBoards = slice(startOwn, 'function buyBoards', 'function yieldOf');
const buySheets = slice(startOwn, 'function buySheets', 'function buyList');
assert.match(buyBoards, /currentStoreOfferings\(s\.k\)/);
assert.match(buyBoards, /offering\.sellingPrice/);
assert.match(buyBoards, /storeSku:offering\.storeSku/);
assert.doesNotMatch(buyBoards, /s\.lens/);
assert.match(buySheets, /currentStoreOfferings\(s\.k\)/);
assert.match(buySheets, /offering\.sellingPrice/);
assert.match(buySheets, /storeSku:offering\.storeSku/);
assert.doesNotMatch(buySheets, /s\.panels/);

assert.equal(/setupCharge\s*[:=]/.test(startOwn), false);
assert.equal(/machineHourRate\s*[:=]/.test(startOwn), false);
assert.equal(/35\s*\+\s*100/.test(startOwn), false);

assert.match(contract, /doctrinePin:'f88ec61c42446755d00259f88e7fd09f2702fd92'/);
assert.match(contract, /catalogPin:'4402abeb6b0299a5b6db2eec85ed04c3b0236bcc'/);
assert.match(contract, /PINNED_STORE_ZERO_CATALOG_SLICE/);
assert.match(contract, /economicsStatus:'UNRESOLVED_CLASS_SCOPED_RECOVERY'/);
assert.match(contract, /legacyGeneralRecoverySelected:false/);
assert.match(contract, /economicsModel:'STB-STORE-ZERO-WINDOW-SEAT-RECOVERY-0\.1'/);

const sandbox = { window: {} };
vm.runInNewContext(contract, sandbox, { filename: 'stb-store-handoff-contract.js' });
const api = sandbox.window.STBStoreHandoffContract;
assert.equal(api.version, '0.3');
assert.equal(api.startOwnMaterialCatalog().source.pin, '4402abeb6b0299a5b6db2eec85ed04c3b0236bcc');
assert.equal(api.startOwnMaterialCatalog().source.kind, 'PINNED_STORE_ZERO_CATALOG_SLICE');

const twoByFour192 = api.startOwnOfferings('2x4').find(o => o.stockL_in === 192);
assert.ok(twoByFour192);
assert.equal(twoByFour192.storeSku, 'STB-ZERO-SPF-2X4-192-001');
assert.equal(twoByFour192.sellingPrice, 8.36);
assert.ok(twoByFour192.supportedOps.includes('CROSSCUT'));
assert.ok(twoByFour192.supportedOps.includes('MITER_LIMITED'));
assert.ok(twoByFour192.supportedOps.includes('DRILL'));

const threeQuarterPly = api.startOwnOfferings('p75');
assert.ok(threeQuarterPly.some(o => o.storeSku === 'STB-ZERO-PLY-075-48X48-001' && o.sellingPrice === 33.54));
assert.ok(threeQuarterPly.some(o => o.storeSku === 'STB-ZERO-PLY-075-48X96-001' && o.sellingPrice === 57.82));

assert.match(shell, /stb-store-handoff-contract\.js\?v=2fa55141/);
assert.match(shell, /stb-start-own-0\.11\.html\?v=b6c5e4a6/);
assert.match(shell, /payload\.storeReference\?\.unresolvedConditions/);
assert.match(shell, /Array\.isArray\(payload\.storeReference\?\.unresolvedConditions\)/);

console.log('PASS · Configure material and capability are bound to the pinned Store Zero catalog; legacy general recovery is not selected');
