import fs from 'node:fs';
import assert from 'node:assert/strict';

const read = p => fs.readFileSync(p, 'utf8');
const artifact = read('stb-outdoor-build.html');
const shell = read('system-build-current.html');
const working = read('working-app.html');
const own = read('stb-start-own-0.10.html');
const candidate = read('stb-start-own-0.11.html');

assert.match(artifact, /Sawhorse outdoor table \+ matching benches/);
assert.match(artifact, /TABLE/);
assert.match(artifact, /LEFT BENCH/);
assert.match(artifact, /RIGHT BENCH/);
assert.match(artifact, /Sawhorse end leg/);
assert.match(artifact, /15½ in/);
assert.match(artifact, /DOUBLE BEVEL \/ ACROSS THICKNESS/);
assert.match(artifact, /NEEDS GEOMETRY CHECK · DEFER/);
assert.match(artifact, /NORMALIZED PART REQUIREMENT/);
assert.match(artifact, /STB_OUTDOOR_CONFIRMED/);
assert.match(artifact, /NO BLOOD ON WOOD/);
assert.equal(artifact.includes('stb-start-own-0.4.html'), false);

assert.match(shell, /outdoorTile = ribbon\.querySelector\('\.tile\[data-go="picnic-chooser"\]'\)/);
assert.match(shell, /outdoorTile\.removeAttribute\('data-go'\)/);
assert.match(shell, /outdoorTile\.dataset\.outdoorBuildArtifact = 'stb-outdoor-build\.html'/);
assert.match(shell, /src="stb-outdoor-build\.html\?v=275ac88d"/);
assert.match(shell, /originalShow\.call\(win, 'outdoor-build-live'\)/);

assert.match(working, /location\.href='stb-outdoor-build\.html'/);

// Locked Start Your Own remains provenance; 0.11 is the active generic operation candidate.
assert.match(own, /Scan-to-Build · Start Your Own · Definition to Doing/);
assert.match(candidate, /Start Your Own 0\.11 · Definition to Doing/);
assert.match(shell, /stb-start-own-0\.11\.html\?v=7fa1682e/);

console.log('PASS · Outdoor Sawhorse proof wired behind the Outdoor Build tile');
