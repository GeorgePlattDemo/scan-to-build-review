import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
const sandbox = { window: {} };
vm.runInNewContext(fs.readFileSync('stb-user-defined-board-store.js','utf8'), sandbox);
const store = sandbox.window.STBUserDefinedBoardStore;
const job = store.evaluateUserDefinedBoardJob({
  sizeKey:'2x4', finishedLengthIn:16.5, partQty:8, angleDeg:10,
  cutPlane:'bevel-thickness', endIdentity:'both', endRelation:'parallel',
  lengthDatum:'long-long-outer-edge'
});
assert.equal(job.status, 'SUPPORTABLE');
assert.equal(job.materialResolution.storeSku, 'STB-ZERO-SPF-2X4-192-001');
assert.equal(job.workpiecePresentation, 'NARROW_FACE_ON_TABLE_WIDE_FACE_TO_FENCE');
const twelve = job.parentLegality.find(row => row.stockLengthIn === 144);
assert.equal(twelve.oneStick, false);
const sixteen = job.parentLegality.find(row => row.stockLengthIn === 192);
assert.equal(sixteen.oneStick, true);
const shell = fs.readFileSync('system-build-current.html','utf8');
assert.match(shell, /stb-start-own-bench-leg-0\.1\.html/);
assert.match(shell, /stb-outdoor-bench-leg-0\.1\.html/);
assert.match(shell, /stb-user-defined-board-store\.js/);
console.log('PASS · bench-leg tiles + 192 in first-proof parent');
