import { test, expect } from '@playwright/test';

const STORE_PIN='7303793620d0ceda509810a661d11e6c31c7d59f';

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
  const answer=project.locator('#stb-system-answer');
  try {
    await expect(answer).toHaveAttribute('data-store-authoritative','true');
    await expect(answer).toHaveAttribute('data-store-pin',STORE_PIN);
  } catch (error) {
    const diagnostic=await project.locator('html').evaluate(root => ({
      readyState:document.readyState,
      intentHidden:document.getElementById('stb-start-intent-screen')?.hidden,
      benchHidden:document.getElementById('stb-start-bench-screen')?.hidden,
      benchButtons:[...document.querySelectorAll('.stb-bench-button')].map(button=>({
        text:(button.textContent||'').trim(),
        disabled:button.disabled,
        connected:button.isConnected
      })),
      answer:{
        authoritative:document.getElementById('stb-system-answer')?.dataset.storeAuthoritative || null,
        disposition:document.getElementById('stb-system-answer')?.dataset.storeDisposition || null,
        pin:document.getElementById('stb-system-answer')?.dataset.storePin || null,
        text:document.getElementById('stb-system-answer')?.textContent || null
      },
      localDefinition:parent.localStorage.getItem('stb-start-own-user1-definition')
    }));
    throw new Error('User 1 host binding did not finish before bench interaction: '+JSON.stringify({diagnostic,pageErrors,cause:String(error)}));
  }
  await expect(project.locator('.stb-bench-button')).toHaveCount(1);
  await expect(project.locator('.stb-bench-button')).toBeVisible();
  await project.locator('.stb-bench-button').click();
  await expect(project.locator('#stb-start-bench-screen')).toBeVisible();

  await expect(answer).toHaveAttribute('data-store-authoritative','true');
  await expect(answer).toHaveAttribute('data-store-disposition','UNRESOLVED');
  await expect(answer).toHaveAttribute('data-store-pin',STORE_PIN);
  await expect(project.locator('#stb-price-total')).toHaveText('$54.29 · PARTIAL');

  let retained=await app.locator('body').evaluate(() => JSON.parse(localStorage.getItem('stb-start-own-user1-definition')||'null'));
  expect(retained.versionId).toBe(retained.storeReference.answerVersionId);
  expect(retained.storeReference.storePin).toBe(STORE_PIN);
  expect(retained.storeReference.authoritativeRequest.definedWorkpieceLengthIn).toBe(60);
  expect(retained.storeReference.authoritativeRequest.sawAngleDeg).toBe(30);
  expect(retained.storeReference.authoritativeRequest.spotDemand.locationAlongLengthIn).toBe(8);
  expect(retained.storeReference.authoritativeAnswer.rawEvaluation.status).toBe('UNRESOLVED');
  expect(retained.storeReference.authoritativeAnswer.rawEstimate.totals.Q).toBe(54.29);
  expect(retained.storeReference.spotOperation.operationContract).toBe('SPOT_ON_LOCATION/0.2');
  expect(retained.storeReference.spotOperation.fullDiameterPenetrationIn).toBe(0.1875);
  expect(retained.storeReference.spotOperation.pointGeometryStatus).toBe('UNRESOLVED');
  expect(retained.storeReference.spotOperation.totalTipPenetrationIn).toBe(null);
  expect(retained.storeReference.unresolvedConditions).toContain('SPOT_TOOL_POINT_GEOMETRY_REQUIRED');
  expect(retained.storeReference.unresolvedConditions).toContain('SPOT_CYCLE_TIME_APPLICABILITY_UNRESOLVED');
  expect(retained.workpieceSequence.finalRemainderIn).toBe(27.625);
  expect(retained.physicalExecutionAuthorized).toBe(false);

  // Use the existing no-spot control to test the 45° miter independently of unresolved spot tooling.
  const angle=project.locator('#stb-config-angle');
  await project.locator('#stb-config-spot [data-spot="none"]').click();
  await angle.fill('45');
  await angle.dispatchEvent('input');
  await expect(answer).toHaveAttribute('data-store-disposition','SUPPORTABLE');
  retained=await app.locator('body').evaluate(() => JSON.parse(localStorage.getItem('stb-start-own-user1-definition')||'null'));
  expect(retained.intent.angleDeg.value).toBe(45);
  expect(retained.storeReference.authoritativeRequest.spotDemand).toBe(null);
  expect(retained.versionId).toBe(retained.storeReference.answerVersionId);

  await angle.fill('30');
  await angle.dispatchEvent('input');
  await project.locator('#stb-config-spot [data-spot="centered"]').click();
  await expect(answer).toHaveAttribute('data-store-disposition','UNRESOLVED');
  await expect(project.locator('#stb-price-total')).toHaveText('$54.29 · PARTIAL');

  const beforeConfirm=await app.locator('body').evaluate(() => JSON.parse(localStorage.getItem('stb-start-own-user1-definition')||'null'));
  await project.locator('#stb-confirm-store').click();
  await expect(app.locator('#proof-store.on')).toBeVisible();
  await expect(app.locator('#proof-store-version')).toHaveText(beforeConfirm.versionId);
  await expect(app.locator('#proof-store-q')).toContainText('$54.29');

  const confirmed=await app.locator('body').evaluate(() => ({
    bench:JSON.parse(localStorage.getItem('stb-start-own-user1-bench')||'null'),
    proof:JSON.parse(localStorage.getItem('stb-proof-handoff-job1')||'null')
  }));
  expect(confirmed.bench.definition.versionId).toBe(beforeConfirm.versionId);
  expect(confirmed.bench.definition.storeReference.answerVersionId).toBe(beforeConfirm.versionId);
  expect(confirmed.proof.payload.versionId).toBe(beforeConfirm.versionId);
  expect(confirmed.proof.payload.storeReference.authoritativeAnswer.rawEstimate.totals.Q).toBe(54.29);

  await app.locator('#proof-store [data-proof-go="proof-accept"]').click();
  await expect(app.locator('#proof-accept.on')).toBeVisible();
  await app.locator('#proof-accept [data-proof-go="proof-yard"]').click();
  await expect(app.locator('#proof-yard.on')).toBeVisible();
  await app.locator('#proof-yard [data-proof-go="proof-record"]').click();
  await expect(app.locator('#proof-terms.on')).toBeVisible();
  await expect(app.locator('#proof-terms-version')).toHaveText(beforeConfirm.versionId);
  await expect(app.locator('#proof-terms-q')).toContainText('$54.29');
  await app.locator('#proof-terms [data-proof-go="proof-record"]').click();
  await expect(app.locator('#proof-record.on')).toBeVisible();
  await expect(app.locator('#proof-record-version')).toHaveText(beforeConfirm.versionId);
  await expect(app.locator('#proof-record-economics')).toContainText('$54.29');

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
