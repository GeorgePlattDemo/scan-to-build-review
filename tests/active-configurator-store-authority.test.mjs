import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';

const read=p=>fs.readFileSync(p,'utf8');
const contractSource=read('stb-store-handoff-contract.js');
const outdoor=read('stb-outdoor-bench-leg-0.1.html');
const windowSeat=read('stb-window-seat-space-utilization-0.7.4.html');
const alcove=read('system-build-base-8d8a9dd.html');
const shell=read('system-build-current.html');

const sandbox={window:{}};
vm.runInNewContext(contractSource,sandbox,{filename:'stb-store-handoff-contract.js'});
const contract=sandbox.window.STBStoreHandoffContract;
assert.ok(contract);

const start=contract.storeAuthority('startOwn');
assert.equal(start.capabilityPin,'7303793620d0ceda509810a661d11e6c31c7d59f');
assert.equal(start.materialCatalogPin,'7303793620d0ceda509810a661d11e6c31c7d59f');
assert.equal(start.capabilityBasis,'D001-STAGE2-ENVELOPE-0.4');
assert.equal(start.economicsVersion,'0.2.4');
assert.equal(start.depthDefinedSpotEconomicsStatus,'UNRESOLVED_FOR_DEPTH_DEFINED_SPOT');

const seat=contract.storeAuthority('windowSeat');
assert.equal(seat.materialCatalogPin,'4402abeb6b0299a5b6db2eec85ed04c3b0236bcc');
assert.equal(seat.capabilityPin,'f88ec61c42446755d00259f88e7fd09f2702fd92');
assert.equal(seat.economicsPin,'f88ec61c42446755d00259f88e7fd09f2702fd92');
assert.equal(seat.economicsModel,'STB-STORE-ZERO-WINDOW-SEAT-RECOVERY-0.1');
assert.match(windowSeat,/canonicalCommit:'f88ec61c42446755d00259f88e7fd09f2702fd92'/);
assert.match(windowSeat,/stage2PathPin:'b40cdc60a405d6c2a63d846f2c2e89cddc5bb95d'/);
assert.match(windowSeat,/recoveryRef:'STB-STORE-ZERO-WINDOW-SEAT-RECOVERY-0\.1'/);
assert.match(windowSeat,/id:'D001-BOARD-EDGE-MILL-REF-0\.3'/);

const out=contract.storeAuthority('outdoor');
assert.equal(out.materialCatalogPin,'4402abeb6b0299a5b6db2eec85ed04c3b0236bcc');
assert.equal(out.capabilityPin,'f88ec61c42446755d00259f88e7fd09f2702fd92');
assert.equal(out.economicsModel,null);
assert.equal(out.economicsStatus,'UNRESOLVED_CLASS_SCOPED_RECOVERY');
assert.equal(outdoor.includes('STBStoreZeroUser1'),false,'Outdoor borrowed User1 Store runtime');
assert.equal(outdoor.includes('$54.29'),false,'Outdoor borrowed User1 economics');
assert.match(outdoor,/does not price, order, allocate stock, or claim production readiness/i);

const alc=contract.storeAuthority('alcove');
assert.equal(alc.capabilityPin,'f88ec61c42446755d00259f88e7fd09f2702fd92');
assert.equal(alc.economicsModel,null);
assert.equal(alc.economicsStatus,'PROJECT_NATIVE_REFERENCE');
assert.equal(contractSource.includes('quoteAlcoveInsert'),false,'shared contract reprices Alcove');
assert.match(alcove,/id="review-price">\$374\.42/);
assert.match(alcove,/const RECOVERY=/);

const sheet=contract.storeAuthority('sheetS001');
assert.equal(sheet.materialCatalogPin,'4402abeb6b0299a5b6db2eec85ed04c3b0236bcc');
assert.equal(sheet.capabilityPin,'4402abeb6b0299a5b6db2eec85ed04c3b0236bcc');
assert.equal(sheet.economicsModel,null);
assert.equal(sheet.economicsStatus,'BUDGETARY_MATERIAL_ONLY');
assert.match(shell,/stb-store-zero-s001\.generated\.js\?v=f980dfb4/);
assert.match(shell,/const s001StoreRuntime = window\.STBStoreZeroS001/);

console.log('PASS · active configurators retain separate Store authority and economics ownership');
