import fs from 'node:fs';
import assert from 'node:assert/strict';

const read = p => fs.readFileSync(p, 'utf8');
const shell = read('system-build-current.html');
const own11 = read('stb-start-own-0.11.html');
const outdoor = read('stb-outdoor-build.html');
const deck = read('stb-outdoor-build-deck-0.1.html');
const authority = read('stb-outdoor-reference-authority-0.3.html');
const research = read('STB-OUTDOOR-ANGLED-FRAME-RESEARCH-DOSSIER-0.1.html');

assert.match(shell, /\['start-own','picnic-chooser','alcove-capture','window-intake','window-parts'\]\.forEach/);
for (const label of [
  'TEST 01 · FROM A BOARD',
  'TEST 02 · FROM A BOUNDED PROJECT',
  'TEST 03 · FIT THE SPACE',
  'TEST 04 · DEFINE THE ASSEMBLY',
  'TEST 05 · CHANGE THE MATERIAL STREAM'
]) assert.ok(shell.includes(label), 'missing proof label: ' + label);

// Job 1: generic board + explicit angled operation meaning.
assert.match(shell, /TARGET: Define the Sawhorse Bench comparison member yourself/);
assert.match(shell, /2×4 · 15½ in · quantity 8 · 10° source-stated DOUBLE BEVEL/);
assert.match(shell, /two separate bench assemblies × four published end-leg occurrences per bench/);
assert.match(shell, /src="stb-start-own-0\.11\.html\?v=eaebb3bf"/);
assert.match(own11, /STRAIGHT CUT/);
assert.match(own11, /ANGLED CUT/);
assert.match(own11, /Angle alone is not enough/);
for (const token of ['angleDegrees','angleReference','cutPlane','endIdentity','endRelation','lengthDatum']) {
  assert.ok(own11.includes(token), 'missing Job 1 angle semantic: ' + token);
}
assert.match(shell, /sourcePart: 'ANA-WHITE-SAW-HORSE-BENCH\/END-LEG'/);
assert.match(shell, /semanticOutput\.angleDegrees === 10/);
assert.match(shell, /semanticOutput\.cutPlane === 'bevel-thickness'/);
assert.match(shell, /semanticOutput\.endRelation === 'parallel'/);
assert.match(shell, /semanticOutput\.lengthDatum === 'source-length'/);

// Job 2: source-backed table + two separate matching bench instances.
assert.match(outdoor, /Sawhorse outdoor table \+ matching benches/);
assert.match(outdoor, /Ana White · Sawhorse Outdoor Table · DT-03/);
assert.match(outdoor, /Ana White · Sawhorse Outdoor Bench · DB-02/);
assert.match(outdoor, /TABLE/);
assert.match(outdoor, /LEFT BENCH/);
assert.match(outdoor, /RIGHT BENCH/);
assert.match(outdoor, /Sawhorse end leg/);
assert.match(outdoor, /2×4/);
assert.match(outdoor, /15½ in/);
assert.match(outdoor, /10°/);
assert.match(outdoor, /DOUBLE BEVEL \/ ACROSS THICKNESS/);
assert.match(outdoor, /PARALLEL/);
assert.match(outdoor, /two matching bench instances × four published end-leg pieces each/);
assert.match(outdoor, /NEEDS GEOMETRY CHECK · DEFER/);
assert.match(outdoor, /No member is stretched/);

// Stable part/occurrence selection and semantic comparison.
assert.match(outdoor, /function occurrenceIds\(part\)/);
assert.match(outdoor, /LEFT-BENCH\.END-LEG\.01/);
assert.match(outdoor, /function outdoorNormalizedPart\(\)/);
assert.match(outdoor, /function sameProofPart\(a,b\)/);
assert.match(outdoor, /NORMALIZED PART REQUIREMENT/);
assert.match(outdoor, /job1&&job1\.targetMatch&&sameProofPart\(job1\.semanticOutput,current\)/);
assert.match(outdoor, /STORE ECONOMICS/);
assert.match(outdoor, /UNRESOLVED · CURRENT MODEL MISMATCH/);
assert.equal(/\b7 clicks\b/i.test(outdoor), false);

// Same common Store boundary for both jobs; no Review-only price invention.
assert.match(shell, /STB_START_OWN_CONFIRMED/);
assert.match(shell, /STB_OUTDOOR_CONFIRMED/);
assert.match(shell, /STORE-PRICING-BRIDGE-GAP/);
assert.match(shell, /STB-STORE-ZERO-PRICE-1 · 0\.2\.2/);
assert.match(shell, /STB-D001-CYCLE-MODEL-S2-0\.1/);
assert.match(shell, /D001-STAGE2-ENVELOPE-0\.2/);
assert.match(shell, /8-minute modeled job setup/);
assert.match(shell, /\$35 setup charge/);
assert.match(shell, /\$100\/hour modeled machine recovery/);
assert.match(shell, /material \$3\.13 \+ modeled cell recovery \$50\.81 = budgetary Q \$53\.94/);
assert.match(shell, /processing \/ total UNRESOLVED/);
assert.match(shell, /No app-side discount/);

// Evidence navigation remains explicit and state-preserving.
assert.match(outdoor, /href="stb-outdoor-build-deck-0\.1\.html" target="_blank" rel="opener"/);
assert.match(outdoor, /href="stb-outdoor-reference-authority-0\.3\.html" target="_blank" rel="opener"/);
assert.match(outdoor, /href="STB-OUTDOOR-ANGLED-FRAME-RESEARCH-DOSSIER-0\.1\.html" target="_blank" rel="opener"/);
for (const page of [deck, authority, research]) {
  assert.match(page, /← RETURN TO PROOF LADDER/);
  assert.match(page, /onclick="if\(window\.opener\)\{window\.close\(\);return false\}"/);
}
assert.equal(/history\.(?:back|go)\(/.test(own11+outdoor+deck+authority+research), false);

// Project Library routes and bounded Sheet identifiers survive.
assert.match(own11, /← PROJECT LIBRARY/);
assert.match(outdoor, /← PROJECT LIBRARY/);
assert.match(shell, /data-proof-library/);
for (const token of ['s001-opening-path','s001-center-route','s001-tab-markers','s001-geometry-summary']) {
  assert.ok(shell.includes(token), 'bounded Sheet/S-001 token missing: ' + token);
}

assert.match(outdoor, /NO BLOOD ON WOOD/);
assert.match(own11, /NO BLOOD ON WOOD/);
assert.equal(/\b(?:G0?\d\b|M0?3\b|G-code)\b/i.test(own11+outdoor), false);
assert.equal(/remote\s+Cycle Start/i.test(own11+outdoor), false);

console.log('PASS · five-job angled proof ladder contract');
