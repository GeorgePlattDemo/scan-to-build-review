import { test, expect } from '@playwright/test';

const STORE_PIN='4402abeb6b0299a5b6db2eec85ed04c3b0236bcc';

function appFrame(page){
  return page.frameLocator('#stb-current').frameLocator('#stb-current');
}

test('actual S-001 project route carries one exact Store answer through review and record', async ({page}) => {
  const base=process.env.STB_REVIEW_URL || 'http://127.0.0.1:4173';
  await page.goto(base+'/system-build-current.html');
  const app=appFrame(page);

  await expect(app.locator('#landing.on')).toBeVisible();
  await app.getByRole('button',{name:'NEW USER'}).click();
  await expect(app.locator('#new-user.on')).toBeVisible();
  await app.locator('#new-user button[data-canonical-go="projects"]').click();
  await expect(app.locator('#projects.on')).toBeVisible();

  const tile=app.locator('#projects .tile[data-go="window-parts"]');
  await expect(tile).toBeVisible();
  await tile.click();

  await expect(app.locator('#playhouse-s001.on')).toBeVisible();
  await app.locator('#playhouse-s001 [data-canonical-go="playhouse-machine"]').click();
  await expect(app.locator('#playhouse-machine.on')).toBeVisible();

  await expect(app.locator('#s001-live-store-disposition')).toHaveText('SUPPORTABLE · REFERENCE');
  await expect(app.locator('#s001-live-store-material')).toHaveText('$26.55 material-only');
  const initial=await app.locator('body').evaluate(() => JSON.parse(localStorage.getItem('stb-s001-current-definition')||'null'));
  const initialVersionMatch=String(initial.versionId||'').match(/^S001-SARAH-PLAYHOUSE-0\.1-v(\d+)$/);
  expect(initialVersionMatch,'S001_INITIAL_VERSION_ID_INVALID').not.toBeNull();
  const initialRevision=Number(initialVersionMatch[1]);

  const width=app.locator('#s001-opening-width');
  // Playwright fill dispatches the input event; do not inject a second synthetic edit.
  await width.fill('40');
  await expect(app.locator('#s001-opening-width-out'),'S001_EDIT_WIDTH_NOT_PROJECTED').toHaveText('40 in');
  await expect(app.locator('#s001-live-store-disposition'),'S001_EDIT_STORE_NOT_RECOMPUTED').toHaveText('SUPPORTABLE · REFERENCE');
  await expect(app.locator('#s001-live-store-material'),'S001_EDIT_ECONOMICS_DRIFT').toHaveText('$26.55 material-only');

  const current=await app.locator('body').evaluate(() => JSON.parse(localStorage.getItem('stb-s001-current-definition')||'null'));
  expect(current.versionId,'S001_EDIT_REVISION_NOT_ADVANCED').toBe('S001-SARAH-PLAYHOUSE-0.1-v'+(initialRevision+1));
  expect(current.geometry.apertureW_in,'S001_EDIT_GEOMETRY_NOT_RECOMPUTED').toBe(40);
  expect(current.storeAnswer.definitionVersionId,'S001_EDIT_ANSWER_REVISION_DRIFT').toBe(current.versionId);
  expect(current.versionId).toBe(current.storeAnswer.definitionVersionId);
  expect(current.storeAnswer.storePin).toBe(STORE_PIN);
  expect(current.storeAnswer.rawEvaluation.status).toBe('SUPPORTABLE');
  expect(current.storeAnswer.rawEstimate.Q).toBe(26.55);
  expect(current.geometry.routeDepthIn).toBe(0.5);
  expect(current.primaryOperation.jobType).toBe('SHEET_MODE2_ARCHED_APERTURE_V0');
  expect(current.additionalRequests.centerRoute).toBe('RETAINED_SEPARATE');
  expect(current.additionalRequests.straightCuts.status).toBe('RETAINED_SEPARATE');
  expect(current.physicalExecutionAuthorized).toBe(false);

  await app.locator('#playhouse-machine [data-canonical-go="playhouse-store"]').click();
  await expect(app.locator('#playhouse-store.on')).toBeVisible();
  await expect(app.locator('#s001-store-disposition')).toHaveText('SUPPORTABLE · REFERENCE');
  await expect(app.locator('#s001-store-reference-amount')).toHaveText('$26.55 material-only');
  await expect(app.locator('#s001-store-answer-version')).toHaveText(current.versionId);

  await app.locator('#playhouse-store [data-canonical-go="playhouse-review"]').click();
  await expect(app.locator('#playhouse-review.on')).toBeVisible();
  await expect(app.locator('#s001-review-primary-route')).toHaveText('SUPPORTABLE · REFERENCE');
  await expect(app.locator('#s001-review-store-version')).toHaveText(current.versionId);

  await app.locator('#playhouse-review [data-canonical-go="playhouse-request"]').click();
  await expect(app.locator('#playhouse-request.on')).toBeVisible();
  await app.locator('#playhouse-request [data-canonical-go="playhouse-yard"]').click();
  await expect(app.locator('#playhouse-yard.on')).toBeVisible();
  await app.locator('#playhouse-yard [data-canonical-go="playhouse-terms"]').click();
  await expect(app.locator('#playhouse-terms.on')).toBeVisible();
  await app.locator('#playhouse-terms [data-canonical-go="playhouse-result"]').click();
  await expect(app.locator('#playhouse-result.on')).toBeVisible();
  await app.locator('#playhouse-result [data-canonical-go="playhouse-record"]').click();
  await expect(app.locator('#playhouse-record.on')).toBeVisible();

  await expect(app.locator('#s001-record-store-result')).toHaveText('SUPPORTABLE · REFERENCE');
  await expect(app.locator('#s001-record-material-reference')).toHaveText('$26.55 material-only');
  await expect(app.locator('#s001-record-store-pin')).toHaveText(STORE_PIN);
  await expect(app.locator('#s001-record-store-version')).toHaveText(current.versionId);

  const confirmed=await app.locator('body').evaluate(() => JSON.parse(localStorage.getItem('stb-s001-confirmed-definition')||'null'));
  expect(confirmed.versionId).toBe(current.versionId);
  expect(confirmed.storeAnswer.definitionVersionId).toBe(current.versionId);
  expect(confirmed.storeAnswer.storePin).toBe(STORE_PIN);
  expect(confirmed.physicalExecutionAuthorized).toBe(false);
});
