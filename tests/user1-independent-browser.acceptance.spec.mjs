import { test, expect } from '@playwright/test';

const STORE_PIN='ab8a4c5d470c310f27fef82683611622ab976168';

function appFrame(page){
  return page.frameLocator('#stb-current').frameLocator('#stb-current');
}

test('actual User 1 journey carries one authoritative Store answer through confirmation and record', async ({ page }) => {
  const pageErrors=[];
  page.on('pageerror', error => pageErrors.push(String(error?.stack || error)));
  const base=process.env.STB_REVIEW_URL || 'http://127.0.0.1:4173';
  await page.goto(base+'/system-build-current.html');
  const app=appFrame(page);

  await expect(app.locator('#landing.on')).toBeVisible();
  await app.getByRole('button',{name:'NEW USER'}).click();
  await expect(app.locator('#new-user.on')).toBeVisible();
  await app.locator('#new-user button[data-canonical-go="projects"]').click();
  await expect(app.locator('#projects.on')).toBeVisible();

  const startOwn=app.locator('.tile[data-start-own-artifact="three-frames.html"]');
  if (await startOwn.count() === 0) {
    const diagnostic=await app.locator('#projects').evaluate(node => ({
      html:node.innerHTML,
      tiles:[...node.querySelectorAll('.tile')].map(tile=>({
        text:(tile.textContent||'').trim().replace(/\s+/g,' ').slice(0,180),
        dataGo:tile.getAttribute('data-go'),
        startOwnArtifact:tile.getAttribute('data-start-own-artifact')
      })),
      guard:document.documentElement.dataset.s001OutcomeSplit || null
    }));
    throw new Error('Start Your Own integration missing: '+JSON.stringify({diagnostic,pageErrors}));
  }
  await expect(startOwn).toBeVisible();
  await startOwn.click();
  await expect(app.locator('#start-own-live.on')).toBeVisible();
  await app.locator('#start-own-live').evaluate(() => new Promise(resolve => setTimeout(resolve, 0)));

  const project=app.frameLocator('#start-own-proof-frame');
  await expect(project.locator('.stb-bench-button')).toBeVisible();
  await project.locator('.stb-bench-button').click();
  await expect(project.locator('#stb-start-bench-screen')).toBeVisible();

  const answer=project.locator('#stb-system-answer');
  await expect(answer).toHaveAttribute('data-store-authoritative','true');
  await expect(answer).toHaveAttribute('data-store-disposition','SUPPORTABLE');
  await expect(answer).toHaveAttribute('data-store-pin',STORE_PIN);
  await expect(project.locator('#stb-price-total')).toHaveText('$54.82');

  let retained=await app.locator('body').evaluate(() => JSON.parse(localStorage.getItem('stb-start-own-user1-definition')||'null'));
  expect(retained.versionId).toBe(retained.storeReference.answerVersionId);
  expect(retained.storeReference.storePin).toBe(STORE_PIN);
  expect(retained.storeReference.authoritativeRequest.definedWorkpieceLengthIn).toBe(60);
  expect(retained.storeReference.authoritativeRequest.sawAngleDeg).toBe(30);
  expect(retained.storeReference.authoritativeRequest.spotDemand.locationAlongLengthIn).toBe(8);
  expect(retained.storeReference.authoritativeAnswer.rawEvaluation.status).toBe('SUPPORTABLE');
  expect(retained.storeReference.authoritativeAnswer.rawEstimate.totals.Q).toBe(54.82);
  expect(retained.workpieceSequence.finalRemainderIn).toBe(27.625);
  expect(retained.physicalExecutionAuthorized).toBe(false);

  // The frozen visible surface admits 45 but not 46. 46 is covered by exact Store/System acceptance.
  const angle=project.locator('#stb-config-angle');
  await angle.fill('45');
  await angle.dispatchEvent('input');
  await expect(answer).toHaveAttribute('data-store-disposition','SUPPORTABLE');
  retained=await app.locator('body').evaluate(() => JSON.parse(localStorage.getItem('stb-start-own-user1-definition')||'null'));
  expect(retained.intent.angleDeg.value).toBe(45);
  expect(retained.versionId).toBe(retained.storeReference.answerVersionId);

  await angle.fill('30');
  await angle.dispatchEvent('input');
  await expect(answer).toHaveAttribute('data-store-disposition','SUPPORTABLE');
  await expect(project.locator('#stb-price-total')).toHaveText('$54.82');

  const beforeConfirm=await app.locator('body').evaluate(() => JSON.parse(localStorage.getItem('stb-start-own-user1-definition')||'null'));
  await project.locator('#stb-confirm-store').click();
  await expect(app.locator('#proof-store.on')).toBeVisible();
  await expect(app.locator('#proof-store-version')).toHaveText(beforeConfirm.versionId);
  await expect(app.locator('#proof-store-q')).toContainText('$54.82');

  const confirmed=await app.locator('body').evaluate(() => ({
    bench:JSON.parse(localStorage.getItem('stb-start-own-user1-bench')||'null'),
    proof:JSON.parse(localStorage.getItem('stb-proof-handoff-job1')||'null')
  }));
  expect(confirmed.bench.definition.versionId).toBe(beforeConfirm.versionId);
  expect(confirmed.bench.definition.storeReference.answerVersionId).toBe(beforeConfirm.versionId);
  expect(confirmed.proof.payload.versionId).toBe(beforeConfirm.versionId);
  expect(confirmed.proof.payload.storeReference.authoritativeAnswer.rawEstimate.totals.Q).toBe(54.82);

  await app.locator('#proof-store [data-proof-go="proof-accept"]').click();
  await expect(app.locator('#proof-accept.on')).toBeVisible();
  await app.locator('#proof-accept [data-proof-go="proof-yard"]').click();
  await expect(app.locator('#proof-yard.on')).toBeVisible();
  await app.locator('#proof-yard [data-proof-go="proof-record"]').click();
  await expect(app.locator('#proof-record.on')).toBeVisible();
  await expect(app.locator('#proof-record-version')).toHaveText(beforeConfirm.versionId);
  await expect(app.locator('#proof-record-economics')).toContainText('$54.82');

  // Return through the real library and confirm the same unchanged version again.
  const firstProof=await app.locator('body').evaluate(() => localStorage.getItem('stb-proof-handoff-job1'));
  await app.locator('#proof-record [data-proof-library]').click();
  await expect(app.locator('#projects.on')).toBeVisible();
  await startOwn.click();
  await app.locator('#start-own-live').evaluate(() => new Promise(resolve => setTimeout(resolve, 0)));
  await expect(project.locator('.stb-bench-button')).toBeVisible();
  await project.locator('.stb-bench-button').click();
  await project.locator('#stb-confirm-store').click();
  const secondProof=await app.locator('body').evaluate(() => localStorage.getItem('stb-proof-handoff-job1'));
  expect(secondProof).toBe(firstProof);

  // Switch to another protected project; User 1's retained definition/answer must remain its own.
  await project.locator('#stb-bench-library').click();
  await expect(app.locator('#projects.on')).toBeVisible();
  await app.locator('.tile[data-window-seat-artifact="stb-window-seat-space-utilization-0.7.4.html"]').click();
  await expect(app.locator('#window-seat-live.on')).toBeVisible();
  const afterSwitch=await app.locator('body').evaluate(() => localStorage.getItem('stb-proof-handoff-job1'));
  expect(afterSwitch).toBe(firstProof);
});
