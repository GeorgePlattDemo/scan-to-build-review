import fs from 'node:fs';
import assert from 'node:assert/strict';

const read = p => fs.readFileSync(p, 'utf8');
const artifact = read('stb-outdoor-build.html');
const shell = read('system-build-current.html');
const working = read('working-app.html');
const own = read('stb-start-own-0.10.html');

assert.match(artifact, /Scan-to-Build · Outdoor Build · Project 1/);
assert.match(artifact, /Replace the part/);
assert.match(artifact, /DETACHED BENCH REPLACEMENT LEG/);
assert.match(artifact, /16½ in/);
assert.match(artifact, /These are not “standard” holes/);
assert.match(artifact, /stb-start-own-0\.10\.html/);
assert.equal(artifact.includes('stb-start-own-0.4.html'), false);
assert.match(artifact, /Looks right — send to Store/);
assert.match(artifact, /stb-store-handoff-contract\.js\?v=f740518e/);
assert.match(artifact, /createProjectHandoff/);
assert.match(artifact, /STB_RECOVERY_STORE_HANDOFF/);
assert.match(artifact, /OPEN OUTDOOR AUTHORITY/);
assert.equal(artifact.includes('REF.syoPrice'), false, 'Outdoor local material-price authority returned');
assert.match(artifact, /UNRESOLVED_CLASS_SCOPED_RECOVERY/);
assert.match(artifact, /Nothing is ordered/);
assert.match(artifact, /NO BLOOD ON WOOD/);

assert.match(shell, /outdoorTile = ribbon\.querySelector\('\.tile\[data-go="picnic-chooser"\]'\)/);
assert.match(shell, /outdoorTile\.removeAttribute\('data-go'\)/);
assert.match(shell, /outdoorTile\.dataset\.outdoorBuildArtifact = 'stb-outdoor-build\.html'/);
assert.match(shell, /src="stb-outdoor-build\.html\?v=01088535"/);
assert.match(shell, /originalShow\.call\(win, 'outdoor-build-live'\)/);
assert.match(shell, /selectJourneyProject\('outdoor'\)/);
assert.equal(/outdoorTile\.addEventListener[\s\S]{0,500}selectJourneyProject\(null\)/.test(shell),false,'Outdoor enters without project identity');

assert.match(working, /location\.href='stb-outdoor-build\.html'/);

// Locked Start Your Own stays the Path A floor and is not rewritten here.
assert.match(own, /Scan-to-Build · Start Your Own · Definition to Doing/);

console.log('PASS · Outdoor Build Project 1 wired behind the Outdoor Build tile');
