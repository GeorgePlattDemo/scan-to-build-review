import fs from 'node:fs';
import assert from 'node:assert/strict';

const shell=fs.readFileSync('system-build-current.html','utf8');
const readme=fs.readFileSync('README.md','utf8');

assert.equal((shell.match(/<\/html>/g)||[]).length,1,'canonical shell contains duplicate HTML tails');
assert.equal((shell.match(/<script\b/g)||[]).length,(shell.match(/<\/script>/g)||[]).length,'script tag counts are unbalanced');
assert.match(shell,/<\/html>\s*$/,'content exists after the canonical HTML close');

// The README must open the actual current build, not the obsolete presentation preview.
assert.match(readme,/https:\/\/georgeplattdemo\.github\.io\/scan-to-build-review\/system-build-current\.html/);
assert.equal(readme.includes('/working-app.html"><kbd>▶ OPEN WORKING APP'),false,'README button still opens obsolete presentation preview');
assert.match(shell,/three-frames\.html\?v=8fbe4542/);
assert.match(shell,/stb-store-handoff-contract\.js\?v=82c7dcf3/);

// Job 1 owns an explicit route map. No Job 1 stage target may be an Alcove page.
const mapBlock=shell.slice(
  shell.indexOf("'start-own': Object.freeze({"),
  shell.indexOf("outdoor: Object.freeze({",shell.indexOf("'start-own': Object.freeze({"))
);
assert.match(mapBlock,/scan:'start-own-live'/);
assert.match(mapBlock,/configure:'start-own-live'/);

assert.match(shell,/stage === 'configure' \? 'definition-boundary' : null/);
assert.match(shell,/const confirmBlock = childDoc\.querySelector\('\.confirm-block'\)/);
assert.match(shell,/confirmBlock\.scrollIntoView\(\{block:'end'\}\)/);
assert.match(mapBlock,/store:'proof-store'/);
assert.match(mapBlock,/request:'proof-accept'/);
assert.match(mapBlock,/yard:'proof-yard'/);
assert.match(mapBlock,/terms:'proof-yard'/);
assert.match(mapBlock,/record:'proof-record'/);
for(const forbidden of ['alcove-capture','alcove-config','alcove-review']) {
  assert.equal(mapBlock.includes(forbidden),false,'Job 1 route map leaks to Alcove: '+forbidden);
}

// The top bar is physically rewired, not merely relabeled.
assert.match(shell,/function wireStartOwnJourneyNav\(nav\)/);
assert.match(shell,/button\.setAttribute\('data-go',directTarget\)/);
assert.match(shell,/button\.dataset\.jobProject = 'start-own'/);
assert.match(shell,/button\.dataset\.jobTarget = directTarget/);
assert.match(shell,/JOB 1 · START YOUR OWN/);
assert.match(shell,/button\.dataset\.jobExit = 'project-library'/);
assert.match(shell,/button\.textContent = '← Project Library'/);

// Legacy duplicate stage buttons are hidden while Job 1 is active.
assert.match(shell,/stage === 'review' \|\| stage === 'terms' \|\| stage === 'recap'/);

// Clicking the project-library exit clears Job 1 identity before leaving.
assert.match(shell,/data-job-exit="project-library"/);
assert.match(shell,/selectJourneyProject\(null\);[\s\S]*?originalShow\.call\(win,'projects'\)/);

// Stage clicks remain bound to the selected job and cannot implicitly select Alcove.
assert.match(shell,/showMappedProjectStage\(activeJourneyProject, stage\)/);
assert.match(shell,/A route or stage change never selects a project implicitly/);

// Confirm lands on Job 1 Store Review and keeps the top nav on Store.
assert.match(shell,/originalShow\.call\(win,'proof-store'\);[\s\S]*?syncJourneyNav\('store'\)/);

// Returning from Store goes back to Job 1 Define, not an Alcove configurator.
assert.match(shell,/proofHandoff\?\.source==='start-own'[\s\S]*?originalShow\.call\(win,'start-own-live'\)[\s\S]*?showStartOwnStage\('bench'\)/);

// Job 1 downstream controls stay in Job 1 proof pages.
assert.match(shell,/'proof-store':'store'/);
assert.match(shell,/'proof-accept':'request'/);
assert.match(shell,/'proof-yard':'yard'/);
assert.match(shell,/'proof-terms':'terms'/);
assert.match(shell,/'proof-record':'record'/);

// Current-step highlighting is synchronized on Job 1 navigation.
assert.match(shell,/function syncJourneyNav\(stage\)/);
assert.match(shell,/syncJourneyNav\('scan'\)/);
assert.match(shell,/syncJourneyNav\('configure'\)/);

// Navigation is a routing surface only; it cannot manufacture gate completion.
for(const forbidden of [
  'payment=true',
  'allocation=true',
  'productionRelease=true',
  'cycleStart=true'
]) {
  assert.equal(shell.includes(forbidden),false,'navigation manufactures authority: '+forbidden);
}

console.log('PASS · Job 1 navigation remains project-bound and direct-targeted from intent through record');
