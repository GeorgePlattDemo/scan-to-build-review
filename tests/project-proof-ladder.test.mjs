import fs from 'node:fs';
import assert from 'node:assert/strict';

const read = p => fs.readFileSync(p, 'utf8');
const shell = read('system-build-current.html');
const outdoor = read('stb-outdoor-build.html');
const deck = read('stb-outdoor-build-deck-0.1.html');
const authority = read('stb-outdoor-reference-authority-0.3.html');
const research = read('STB-OUTDOOR-ANGLED-FRAME-RESEARCH-DOSSIER-0.1.html');
// Frozen-source preservation is enforced by the dedicated lock, Alcove,
// Store-doctrine, bounded-project and Window Seat regressions run beside this test.

// The visible proof order is exact.
assert.match(shell, /\['start-own','picnic-chooser','alcove-capture','window-intake','window-parts'\]\.forEach/);
for (const label of [
  'TEST 01 · FROM A BOARD',
  'TEST 02 · FROM A BOUNDED PROJECT',
  'TEST 03 · FIT THE SPACE',
  'TEST 04 · DEFINE THE ASSEMBLY',
  'TEST 05 · CHANGE THE MATERIAL STREAM'
]) assert.ok(shell.includes(label), 'missing proof label: ' + label);

// Job 1 is a wrapper around the locked generic floor, not a replacement or prefilled mode.
assert.match(shell, /TARGET: Replace 8 detached bench legs/);
assert.match(shell, /2×4 · 16½ in finished · 8 pieces · square ends/);
assert.match(shell, /Nothing is prefilled for this test by the proof wrapper/);
assert.match(shell, /src="stb-start-own-0\.10\.html\?v=cbdb0299"/);
assert.match(shell, /stb-proof-ladder-job1/);
assert.match(shell, /explicitProjectDecisionCount: proofDecisions\.size/);
assert.match(shell, /uiActions: proofActions/);
assert.match(shell, /endCondition: 'square'/);
assert.match(shell, /holeRequirement: 'NONE'/);

// Job 2 carries bounded facts and requires the three project-specific answers.
assert.match(outdoor, /SAME JOB · BOUNDED PROJECT/);
assert.match(outdoor, /2×4 stock class, square ends and the cited 16½ in reference geometry/);
assert.match(outdoor, /quantity, finished length choice, and whether measured hole spots are required/);
assert.match(outdoor, /Quantity 8 is project-specific \/ user-declared/);
assert.match(outdoor, /published plan as drawn uses 4 legs for two benches/);
assert.match(outdoor, /These are not “standard” holes/);
assert.match(outdoor, /3 in and 7 in are example starting values — measure the old leg/);
assert.match(outdoor, /Spot only/);
assert.match(outdoor, /holeRequirement:S\.spot\?'MEASURED_SPOTS':'NONE'/);
assert.match(outdoor, /endCondition:'square'/);

// The receipt uses recorded counts and refuses a false equality claim.
assert.match(outdoor, /COMPARISON RECEIPT/);
assert.match(outdoor, /SAME EIGHT LEGS\. LESS RE-DEFINITION\./);
assert.match(outdoor, /METRICS\.uiActions/);
assert.match(outdoor, /explicitDecisionList\(\)/);
assert.match(outdoor, /sameCore\(job1Core,job2Core\)/);
assert.match(outdoor, /NORMALIZED CORE REQUIREMENT: NOT CLAIMED AS A MATCH/);
assert.equal(/\b7 clicks\b/i.test(outdoor), false, 'hardcoded click marketing returned');

// Build Deck → Authority → Research remains explicit and one click apart at each layer.
assert.match(outdoor, /href="stb-outdoor-build-deck-0\.1\.html"/);
assert.match(outdoor, /href="stb-outdoor-reference-authority-0\.3\.html"/);
assert.match(outdoor, /href="STB-OUTDOOR-ANGLED-FRAME-RESEARCH-DOSSIER-0\.1\.html"/);
assert.match(deck, /const AUTH="stb-outdoor-reference-authority-0\.3\.html"/);
assert.match(deck, /WHY THESE NUMBERS\?/);
assert.match(authority, /href="STB-OUTDOOR-ANGLED-FRAME-RESEARCH-DOSSIER-0\.1\.html"/);
assert.ok(research.length > 90000, 'research dossier appears reduced');

// Route return is explicit; no downstream authority was collapsed.
assert.match(shell, /STB_PROOF_RETURN_LIBRARY/);
assert.match(shell, /STB_PROOF_OPEN_JOB1/);
assert.match(outdoor, /Confirmation is not an order, payment, allocation, production release, machine readiness or Cycle Start/);
assert.match(outdoor, /NO BLOOD ON WOOD/);
assert.equal(/\b(?:G0?\d\b|M0?3\b|G-code)\b/i.test(outdoor), false, 'controller/G-code output appeared in Outdoor Build');
assert.equal(/remote\s+Cycle Start/i.test(outdoor), false, 'remote Cycle Start appeared');

// The existing bounded sheet path remains present in the shell; its underlying sources are covered by dedicated preservation regressions.
for (const token of ['s001-opening-path','s001-center-route','s001-tab-markers','s001-geometry-summary']) {
  assert.ok(shell.includes(token), 'bounded Sheet/S-001 token missing: ' + token);
}

console.log('PASS · five-job proof ladder contract');
