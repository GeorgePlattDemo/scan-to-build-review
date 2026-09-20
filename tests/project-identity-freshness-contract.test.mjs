import fs from 'node:fs';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';

const read=p=>fs.readFileSync(p,'utf8');
const blob=text=>crypto.createHash('sha1')
  .update('blob '+Buffer.byteLength(text,'utf8')+'\0'+text,'utf8')
  .digest('hex');

const shell=read('system-build-current.html');
const spine=read('stb-recovery-store-spine.js');
const contract=read('stb-store-handoff-contract.js');
const alcove=read('system-build-base-8d8a9dd.html');
const seat=read('stb-window-seat-space-utilization-0.7.4.html');

// Mature project implementations remain frozen.
assert.equal(blob(alcove),'67f3c5324ac7ab2ccd798b0dc0d7179b0912eef4','Alcove base moved during project-identity hardening');
assert.equal(blob(seat),'96c85feef57b1196093e56495e7141452fc749a4','Window Seat moved during project-identity hardening');

// A project page may not open with null project identity.
assert.match(shell,/startOwnTile\.addEventListener[\s\S]{0,500}selectJourneyProject\('start-own'\)[\s\S]{0,300}originalShow\.call\(win, 'start-own-live'\)/);
assert.match(shell,/outdoorTile\.addEventListener[\s\S]{0,500}selectJourneyProject\('outdoor'\)[\s\S]{0,300}originalShow\.call\(win, 'outdoor-build-live'\)/);
assert.equal(/startOwnTile\.addEventListener[\s\S]{0,500}selectJourneyProject\(null\)/.test(shell),false,'Start Your Own enters with null project identity');
assert.equal(/outdoorTile\.addEventListener[\s\S]{0,500}selectJourneyProject\(null\)/.test(shell),false,'Outdoor enters with null project identity');

// Configure targets belong to the active project.
assert.match(shell,/'start-own': Object\.freeze\(\{[\s\S]*scan:'start-own-live',[\s\S]*configure:'start-own-live'/);
assert.match(shell,/outdoor: Object\.freeze\(\{[\s\S]*scan:'outdoor-build-live',[\s\S]*configure:'outdoor-build-live'/);

// A child handoff cannot silently change project identity.
assert.match(shell,/const sourceProject = event\.source === startFrame\?\.contentWindow[\s\S]*'start-own'[\s\S]*'outdoor'/);
assert.match(shell,/if \(!sourceProject \|\| activeJourneyProject !== sourceProject\) return;/);

// Once a project owns the journey nav, every stage click is consumed.
// Failure to resolve must stay put; it may not fall through to legacy data-go routing.
assert.match(shell,/const navButton = event\.target\.closest\?\.\('\.recovery-nav button\[data-journey-stage\]'\)[\s\S]*event\.preventDefault\(\);[\s\S]*event\.stopImmediatePropagation\(\);[\s\S]*showMappedProjectStage\(activeJourneyProject, stage\);/);
assert.equal(/if \(showMappedProjectStage\(activeJourneyProject, stage\)\) \{[\s\S]*event\.preventDefault/.test(shell),false,'journey nav still falls through when project mapping fails');
assert.match(shell,/else if \(stage && activeJourneyProject\) \{[\s\S]*showMappedProjectStage\(activeJourneyProject, stage\);[\s\S]*return;[\s\S]*\}/);

// Start Your Own and Outdoor downstream pages are bound to the same project that created the handoff.
assert.match(spine,/function projectIdForSource\(source\)/);
assert.match(spine,/if\(source === 'start-own'\) return 'start-own'/);
assert.match(spine,/if\(source === 'outdoor'\) return 'outdoor'/);
assert.match(spine,/function expectedHandoffProjectId\(projectId\)/);
assert.match(spine,/if\(String\(payload\.handoff\.projectId \|\| ''\) !== expectedHandoffProjectId\(projectId\)\) return false/);
assert.match(spine,/function matchesProject\(projectId\)/);
assert.match(spine,/function invalidateIfDefinitionChanged\(projectId,definitionId\)[\s\S]*state = null/);
assert.match(spine,/function showStage\(projectId,stage\)[\s\S]*if\(!matchesProject\(projectId\)\) return false/);
assert.match(shell,/recoveryStoreSpine\?\.showStage\(projectId, stage\)/);
assert.match(shell,/STB_RECOVERY_DEFINITION_CURRENT/);
assert.match(shell,/invalidateIfDefinitionChanged\(sourceProject,event\.data\?\.definitionId\)/);

// Freshness / authority: the recovery shell may carry Alcove values, but it may not
// install a second Alcove economics engine or generalized Window Seat recovery formula.
assert.equal(shell.includes('applyAlcoveEconomicsBoundary'),false,'outer shell reintroduced a second Alcove economics authority');
assert.equal(shell.includes('quoteAlcoveInsert'),false,'outer shell reintroduced Alcove re-pricing');
assert.equal(contract.includes('quoteAlcoveInsert'),false,'recovery Store contract reintroduced Alcove re-pricing');
assert.equal(contract.includes('WINDOW_SEAT_RECOVERY'),false,'recovery Store contract imported Window Seat recovery into other project classes');
for(const stale of ['$425','56.16','recovery = 425']) {
  assert.equal(contract.includes(stale),false,'recovery Store contract contains stale generalized recovery '+stale);
}

console.log('PASS · project identity / freshness contract');
