import fs from 'node:fs';
import assert from 'node:assert/strict';

const read = p => fs.readFileSync(p, 'utf8');
const artifact = read('stb-outdoor-build.html');
const shell = read('system-build-current.html');
const working = read('working-app.html');
const own = read('stb-start-own-0.10.html');

assert.match(artifact, /Scan-to-Build · Outdoor Build · Project 1/);
assert.match(artifact, /Find the part/);
assert.match(artifact, /16½ in/);
assert.match(artifact, /These are not “standard” holes/);
assert.match(artifact, /stb-start-own-0\.10\.html/);
assert.equal(artifact.includes('stb-start-own-0.4.html'), false);
assert.match(artifact, /Looks right — send to Store/);
assert.match(artifact, /Nothing is ordered/);
assert.match(artifact, /NO BLOOD ON WOOD/);

assert.match(shell, /outdoorTile = ribbon\.querySelector\('\.tile\[data-go="picnic-chooser"\]'\)/);
assert.match(shell, /outdoorTile\.removeAttribute\('data-go'\)/);
assert.match(shell, /outdoorTile\.dataset\.outdoorBuildArtifact = 'stb-outdoor-build\.html'/);
assert.match(shell, /src="stb-outdoor-build\.html\?v=020d5dbd"/);
assert.match(shell, /originalShow\.call\(win, 'outdoor-build-live'\)/);

assert.match(working, /location\.href='stb-outdoor-build\.html'/);

// Locked Start Your Own stays the Path A floor and is not rewritten here.
assert.match(own, /Scan-to-Build · Start Your Own · Definition to Doing/);

console.log('PASS · Outdoor Build Project 1 wired behind the Outdoor Build tile');
