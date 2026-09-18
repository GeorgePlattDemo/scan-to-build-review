import fs from 'node:fs';
import assert from 'node:assert/strict';

const base=fs.readFileSync('system-build-base-8d8a9dd.html','utf8');
const front=fs.readFileSync('system-build-front-door-0.5.html','utf8');
const shell=fs.readFileSync('system-build-current.html','utf8');
const doctrine=fs.readFileSync('store-zero-canonical-doctrine.js','utf8');

function pos(text){const i=base.indexOf(text);assert.notEqual(i,-1,'missing '+text);return i;}

const configure=pos('id="alcove-config"');
const review=pos('id="alcove-review"');
const store=pos('id="store"');
const terms=pos('id="terms"');
const status=pos('id="recap"');
const record=pos('id="record"');
assert.ok(configure < review && review < store && store < terms && terms < status && status < record);

assert.match(base,/CURRENT DEFINITION — USER 1/);
assert.match(base,/REVIEW THIS VERSION →/);
assert.equal(base.includes('STORE \/ PRICE BASIS'),false);
assert.match(base,/CONFIRM &amp; SEND TO STORE ZERO →/);
assert.match(base,/show\('store'\)/);
assert.equal(base.includes('<h2>Review your definition<\/h2>'),false);

assert.match(base,/Store Zero answered Version 1/);
assert.match(base,/Same definition in\. Store facts back\./);
assert.match(base,/FULL EVENT LEDGER · 12 SEPARATE EVENTS/);
assert.match(shell,/ledger\.innerHTML = canonicalDoctrine\.processStepsHtml/);
assert.match(doctrine,/Yard review/);
assert.match(doctrine,/Owner record/);

assert.match(base,/Accept, settle, queue/);
assert.match(base,/SHOW ORDER STATUS →/);
assert.match(base,/After acceptance and settlement, you stop pressing Next/);
assert.match(base,/READY notice sent/);
assert.match(base,/Pickup \/ custody transfer/);
assert.match(base,/Keep your project record/);

assert.match(front,/READ-ONLY PREVIEW/);
assert.match(front,/WORKING PROJECT · /);
assert.match(front,/alcoveDownstream && preview\.editing/);
assert.match(shell,/byTarget\.request\.hidden = true/);
assert.match(shell,/byTarget\.yard\.hidden = true/);
assert.match(shell,/byTarget\.terms\.textContent = 'Accept \/ pay'/);
assert.match(shell,/byTarget\.recap\.textContent = 'Status'/);

console.log('PASS · Alcove human-journey regression checks');
