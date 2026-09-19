import fs from 'node:fs';
import assert from 'node:assert/strict';

const shell=fs.readFileSync('system-build-current.html','utf8');
const own=fs.readFileSync('stb-start-own-0.11.html','utf8');
const outdoor=fs.readFileSync('stb-outdoor-build.html','utf8');
const deck=fs.readFileSync('stb-outdoor-build-deck-0.1.html','utf8');
const authority=fs.readFileSync('stb-outdoor-reference-authority-0.3.html','utf8');
const research=fs.readFileSync('STB-OUTDOOR-ANGLED-FRAME-RESEARCH-DOSSIER-0.1.html','utf8');

assert.match(own,/function returnProjectLibrary\(\)/);
assert.match(own,/STB_PROOF_RETURN_LIBRARY/);
assert.match(own,/← PROJECT LIBRARY/);
assert.match(outdoor,/function projectLibrary\(\)/);
assert.match(outdoor,/STB_PROOF_RETURN_LIBRARY/);
assert.match(outdoor,/← PROJECT LIBRARY/);

assert.match(shell,/data-proof-library/);
assert.match(shell,/window-seat-shell-main[\s\S]*data-proof-library/);
assert.match(shell,/\['alcove-capture','alcove-config','store','request','yard','record','window-parts','playhouse-s001'/);
assert.match(shell,/function addProofLibraryControl\(id\)/);
assert.match(shell,/data-proof-return-source/);
assert.match(shell,/proofHandoff\?\.source==='start-own'/);
assert.match(shell,/proofHandoff\?\.source==='outdoor'/);
assert.match(shell,/originalShow\.call\(win,'start-own-live'\)/);
assert.match(shell,/originalShow\.call\(win,'outdoor-build-live'\)/);

assert.match(outdoor,/href="stb-outdoor-build-deck-0\.1\.html" target="_blank" rel="opener"/);
assert.match(deck,/← RETURN TO PROOF LADDER/);
assert.match(authority,/← RETURN TO PROOF LADDER/);
assert.match(research,/← RETURN TO PROOF LADDER/);
assert.equal(/history\.(?:back|go)\(/.test(shell+own+outdoor+deck+authority+research),false);

assert.match(shell,/localStorage\.setItem\('stb-proof-ladder-job1'/);
assert.match(shell,/localStorage\.setItem\('stb-proof-handoff-job1'/);
assert.match(shell,/localStorage\.setItem\('stb-proof-handoff-job2'/);
assert.match(outdoor,/localStorage\.setItem\('stb-proof-ladder-job2'/);
assert.match(outdoor,/localStorage\.getItem\('stb-proof-ladder-job1'/);
assert.match(outdoor,/job1&&job1\.targetMatch&&sameProofPart/);

// Evidence viewing opens separately; source return toggles the already-mounted iframe.
assert.equal(/location\.reload\(|\.src\s*=.*stb-outdoor-build/.test(shell),false);
assert.equal(/localStorage\.(?:clear|removeItem)/.test(shell+own+outdoor),false);

console.log('PASS · proof navigation and state-preservation contract');
