import fs from 'node:fs';
import assert from 'node:assert/strict';

const read = p => fs.readFileSync(p, 'utf8');
const locked = read('stb-start-own-0.10.html');
const candidate = read('stb-start-own-0.11.html');

assert.match(locked, /Scan-to-Build · Start Your Own · Definition to Doing/);
assert.equal(locked.includes('STB_START_OWN_CONFIRMED'), false);
assert.equal(locked.includes('ANGLED_CUT'), false);

assert.match(candidate, /Start Your Own 0\.11 · Definition to Doing/);
assert.match(candidate, /function angledCutDefinition\(\)/);
assert.match(candidate, /function operationValidation\(\)/);
assert.match(candidate, /Angle alone is not enough\./);
assert.match(candidate, /STRAIGHT CUT/);
assert.match(candidate, /ANGLED CUT/);
assert.match(candidate, /MITER \/ ACROSS FACE/);
assert.match(candidate, /BEVEL \/ ACROSS THICKNESS/);
assert.match(candidate, /DEGREES OFF SQUARE/);
assert.match(candidate, /SOURCE-STATED ANGLE/);
assert.match(candidate, /FIRST END/);
assert.match(candidate, /SECOND END/);
assert.match(candidate, /BOTH ENDS/);
assert.match(candidate, /PARALLEL \/ SAME DIRECTION/);
assert.match(candidate, /OPPOSED \/ NON-PARALLEL/);
assert.match(candidate, /LONG POINT → LONG POINT/);
assert.match(candidate, /LONG POINT → SHORT POINT/);
assert.match(candidate, /SOURCE CUT-LIST LENGTH \/ STATED EDGE DATUM/);
assert.match(candidate, /angleDegrees:S\.cutOps\.angle/);
assert.match(candidate, /angleReference:S\.cutOps\.angleReference/);
assert.match(candidate, /cutPlane:S\.cutOps\.cutPlane/);
assert.match(candidate, /endIdentity:S\.cutOps\.endIdentity/);
assert.match(candidate, /endRelation:S\.cutOps\.endIdentity==='both'\?S\.cutOps\.endRelation:null/);
assert.match(candidate, /lengthDatum:S\.cutOps\.lengthDatum/);
assert.match(candidate, /function angleDefinitionDrawing\(\)/);
assert.match(candidate, /TOP \/ FACE VIEW/);
assert.match(candidate, /SIDE \/ THICKNESS VIEW/);
assert.match(candidate, /The picture is a definition view, not a machine program/);
assert.match(candidate, /Complete the angled-cut definition before confirming/);
assert.match(candidate, /STB_START_OWN_CONFIRMED/);
assert.match(candidate, /STORE-PRICING-BRIDGE-GAP/);
assert.match(candidate, /NO BLOOD ON WOOD/);
assert.equal(/\bG0?\d\b|G-code|remote Cycle Start/i.test(candidate), false);

console.log('PASS · Start Your Own 0.11 generic operation contract');
