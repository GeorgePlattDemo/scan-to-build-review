import { test, expect } from '@playwright/test';

const STORE_PIN='bc1a77297df752e32fb3687acc883a629c0b5b13';

function appFrame(page){
  return page.frameLocator('#stb-current').frameLocator('#stb-current');
}

async function retainedDefinition(app){
  return app.locator('body').evaluate(() => JSON.parse(localStorage.getItem('stb-start-own-user1-definition')||'null'));
}

test('actual User 1 journey resolves Store stock from finished demand and freezes one matching answer', async ({ page }) => {
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
  await expect(startOwn).toBeVisible();
  await startOwn.click();
  await expect(app.locator('#start-own-live.on')).toBeVisible();
  await app.locator('#start-own-live').evaluate(() => new Promise(resolve => setTimeout(resolve,0)));

  const project=app.frameLocator('#start-own-proof-frame');
  const answer=project.locator('#stb-system-answer');
  try {
    await expect(answer).toHaveAttribute('data-store-authoritative','true');
    await expect(answer).toHaveAttribute('data-store-pin',STORE_PIN);
  } catch (error) {
    const diagnostic=await project.locator('html').evaluate(() => ({
      readyState:document.readyState,
      answer:{
        authoritative:document.getElementById('stb-system-answer')?.dataset.storeAuthoritative || null,
        disposition:document.getElementById('stb-system-answer')?.dataset.storeDisposition || null,
        pin:document.getElementById('stb-system-answer')?.dataset.storePin || null,
        text:document.getElementById('stb-system-answer')?.textContent || null
      },
      localDefinition:parent.localStorage.getItem('stb-start-own-user1-definition')
    }));
    throw new Error('User 1 host binding did not finish: '+JSON.stringify({diagnostic,pageErrors,cause:String(error)}));
  }

  await expect(project.locator('[name*="supplied" i], [id*="supplied" i], [data-supplied]'),'FAULT_TARGET_SUPPLIED_STOCK_CONTROL_PRESENT').toHaveCount(0);
  await expect(project.locator('.stb-bench-button')).toBeVisible();
  await project.locator('.stb-bench-button').click();
  await expect(project.locator('#stb-start-bench-screen')).toBeVisible();

  // F — spots OFF first: material + saw plan resolve completely.
  await project.locator('#stb-config-spot [data-spot="none"]').click();
  await expect(answer).toHaveAttribute('data-store-disposition','SUPPORTABLE');
  await expect(project.locator('#stb-price-total'),'FAULT_TARGET_VISIBLE_STORE_VALUE_MISMATCH').toHaveText('$54.27 · COMPLETE');
  await expect(project.locator('#stb-bench-stock-spec'),'FAULT_TARGET_PICTURE_PRICED_PLAN_MISMATCH').toHaveText('1 × 2×4 × 72 in');
  await expect(project.locator('#stb-material-required'),'FAULT_TARGET_PICTURE_PRICED_PLAN_MISMATCH').toContainText('STB-ZERO-SPF-2X4-72-001');
  await expect(project.locator('#stb-bench-workline'),'FAULT_TARGET_PICTURE_PRICED_PLAN_MISMATCH').toContainText('3 PRODUCTION SAW CUTS');
  await expect(project.locator('#stb-def-retained'),'FAULT_TARGET_PICTURE_PRICED_PLAN_MISMATCH').toContainText('39⅝ in');

  let retained=await retainedDefinition(app);
  expect(retained.versionId,'FAULT_TARGET_STORE_ANSWER_VERSION_MISMATCH').toBe(retained.storeReference.answerVersionId);
  expect(retained.storeReference.storePin).toBe(STORE_PIN);
  expect(retained.storeReference.authoritativeRequest.finishedPartLengthIn).toBe(16);
  expect(retained.storeReference.authoritativeRequest.quantity).toBe(2);
  expect(retained.storeReference.authoritativeRequest.definedWorkpieceLengthIn).toBe(undefined);
  expect(retained.physicalDemand.parentLengthIn).toBe(undefined);
  expect(retained.storePlan.selected.storeSku).toBe('STB-ZERO-SPF-2X4-72-001');
  expect(retained.storePlan.selected.parentStockLengthIn).toBe(72);
  expect(retained.storePlan.selected.parentCount).toBe(1);
  expect(retained.storePlan.intermediateBlank,'FAULT_TARGET_UNJUSTIFIED_BLANK_INSERTED').toBe(null);
  expect(retained.storePlan.accounting.productionSawCuts,'FAULT_TARGET_PRICED_PLAN_OMITS_NECESSARY_OPERATION').toBe(3);
  expect(retained.storePlan.accounting.preparationSawCuts,'FAULT_TARGET_UNJUSTIFIED_BLANK_INSERTED').toBe(0);
  expect(retained.storePlan.parents[0].remainderIn).toBe(39.625);
  expect(retained.storeReference.authoritativeAnswer.rawEstimate.totals.material).toBe(3.13);
  expect(retained.storeReference.authoritativeAnswer.rawEstimate.totals.cell_recovery).toBe(51.14);
  expect(retained.storeReference.authoritativeAnswer.rawEstimate.totals.Q).toBe(54.27);
  expect(retained.storeReference.priceCompleteness).toBe('COMPLETE_FOR_ENCODED_DEMAND');
  expect(retained.physicalExecutionAuthorized).toBe(false);

  // G — edit length invalidates the old answer and recomputes the same demand/Store plan.
  const oldVersion=retained.versionId;
  const length=project.locator('#stb-config-length');
  await length.fill('16.5');
  await length.dispatchEvent('input');
  await expect(answer).toHaveAttribute('data-store-disposition','SUPPORTABLE');
  await expect(project.locator('#stb-price-total')).toHaveText('$54.28 · COMPLETE');
  retained=await retainedDefinition(app);
  expect(retained.versionId,'FAULT_TARGET_STALE_ANSWER_ON_NEW_REVISION').not.toBe(oldVersion);
  expect(retained.storeReference.answerVersionId,'FAULT_TARGET_STALE_ANSWER_ON_NEW_REVISION').toBe(retained.versionId);
  expect(retained.intent.finishedLengthIn.value).toBe(16.5);
  expect(retained.storePlan.selected.parentStockLengthIn).toBe(72);
  expect(retained.storePlan.parents[0].remainderIn).toBe(38.625);
  expect(retained.storeReference.authoritativeAnswer.rawEstimate.totals.Q).toBe(54.28);

  // G — quantity 2 -> 4 makes Store select a different feasible parent without changing finished geometry.
  await length.fill('16');
  await length.dispatchEvent('input');
  await project.locator('#stb-config-parts [data-parts="4"]').click();
  await expect(project.locator('#stb-price-total')).toHaveText('$56.18 · COMPLETE');
  await expect(project.locator('#stb-bench-stock-spec'),'FAULT_TARGET_PICTURE_PRICED_PLAN_MISMATCH').toHaveText('1 × 2×4 × 96 in');
  retained=await retainedDefinition(app);
  expect(retained.intent.finishedLengthIn.value,'FAULT_TARGET_STOCK_LENGTH_OVERWRITES_FINISHED_GEOMETRY').toBe(16);
  expect(retained.intent.partQty.value).toBe(4);
  expect(retained.storePlan.selected.storeSku).toBe('STB-ZERO-SPF-2X4-96-001');
  expect(retained.storePlan.selected.parentStockLengthIn).toBe(96);
  expect(retained.storePlan.accounting.productionSawCuts).toBe(5);
  expect(retained.storePlan.accounting.preparationSawCuts).toBe(0);
  expect(retained.storePlan.parents[0].remainderIn).toBe(31.375);

  // E — 46 degrees crosses the same Store boundary and is refused; the job is not resized.
  await project.locator('#stb-config-parts [data-parts="2"]').click();
  const angle=project.locator('#stb-config-angle');
  await angle.fill('46');
  await angle.dispatchEvent('input');
  await expect(answer).toHaveAttribute('data-store-disposition','REFUSED');
  await expect(project.locator('#stb-price-total')).toHaveText('NOT COMPLETE');
  retained=await retainedDefinition(app);
  expect(retained.intent.finishedLengthIn.value).toBe(16);
  expect(retained.intent.partQty.value).toBe(2);
  expect(retained.intent.angleDeg.value).toBe(46);
  expect(retained.storeReference.refusalConditions).toContain('MITER_ANGLE_OUTSIDE_D001_STAGE2_ENVELOPE');

  await angle.fill('30');
  await angle.dispatchEvent('input');
  await expect(answer).toHaveAttribute('data-store-disposition','SUPPORTABLE');

  // F — spots ON: same saw/material plan, point geometry and spot-cycle economics remain unresolved.
  await project.locator('#stb-config-spot [data-spot="centered"]').click();
  await expect(answer).toHaveAttribute('data-store-disposition','UNRESOLVED');
  await expect(project.locator('#stb-price-total')).toHaveText('$54.27 · PARTIAL');
  retained=await retainedDefinition(app);
  expect(retained.storePlan.selected.storeSku).toBe('STB-ZERO-SPF-2X4-72-001');
  expect(retained.storePlan.selected.parentStockLengthIn).toBe(72);
  expect(retained.storePlan.parents[0].remainderIn).toBe(39.625);
  expect(retained.storePlan.accounting.productionSawCuts).toBe(3);
  expect(retained.storePlan.accounting.preparationSawCuts).toBe(0);
  expect(retained.storeReference.authoritativeRequest.spotDemand.locationAlongLengthIn).toBe(8);
  expect(retained.storeReference.spotOperation.operationContract).toBe('SPOT_ON_LOCATION/0.2');
  expect(retained.storeReference.spotOperation.fullDiameterPenetrationIn).toBe(0.1875);
  expect(retained.storeReference.spotOperation.pointGeometryStatus).toBe('UNRESOLVED');
  expect(retained.storeReference.spotOperation.totalTipPenetrationIn).toBe(null);
  expect(retained.storeReference.unresolvedConditions).toContain('SPOT_TOOL_POINT_GEOMETRY_REQUIRED');
  expect(retained.storeReference.unresolvedConditions).toContain('SPOT_CYCLE_TIME_APPLICABILITY_UNRESOLVED');
  expect(retained.storeReference.authoritativeAnswer.rawEstimate.totals.material).toBe(3.13);
  expect(retained.storeReference.authoritativeAnswer.rawEstimate.totals.cell_recovery).toBe(51.14);
  expect(retained.storeReference.authoritativeAnswer.rawEstimate.totals.Q).toBe(54.27);

  // Confirm freezes this exact revision and the downstream Store surface carries the same demand and parent plan.
  const beforeConfirm=retained;
  await project.locator('#stb-confirm-store').click();
  await expect(app.locator('#proof-store.on')).toBeVisible();
  await expect(app.locator('#proof-store-version')).toHaveText(beforeConfirm.versionId);
  await expect(app.locator('#proof-store-workpiece')).toContainText('2 × 16 in');
  await expect(app.locator('#proof-store-material-sku')).toContainText('STB-ZERO-SPF-2X4-72-001');
  await expect(app.locator('#proof-store-material-sku')).toContainText('72 in');
  await expect(app.locator('#proof-store-q')).toContainText('$54.27');

  const confirmed=await app.locator('body').evaluate(() => ({
    bench:JSON.parse(localStorage.getItem('stb-start-own-user1-bench')||'null'),
    proof:JSON.parse(localStorage.getItem('stb-proof-handoff-job1')||'null')
  }));
  expect(confirmed.bench.definition.versionId).toBe(beforeConfirm.versionId);
  expect(confirmed.bench.definition.storeReference.answerVersionId).toBe(beforeConfirm.versionId);
  expect(confirmed.proof.payload.versionId).toBe(beforeConfirm.versionId);
  expect(confirmed.proof.payload.physicalDemand.finishedLength).toBe(16);
  expect(confirmed.proof.payload.physicalDemand.quantity).toBe(2);
  expect(confirmed.proof.payload.storeReference.materialResolution.pricingReferenceStockLengthIn).toBe(72);
  expect(confirmed.proof.payload.storeReference.authoritativeAnswer.rawEstimate.totals.Q).toBe(54.27);

  await app.locator('#proof-store [data-proof-go="proof-accept"]').click();
  await expect(app.locator('#proof-accept.on')).toBeVisible();
  await app.locator('#proof-accept [data-proof-go="proof-yard"]').click();
  await expect(app.locator('#proof-yard.on')).toBeVisible();
  await app.locator('#proof-yard [data-proof-go="proof-record"]').click();
  await expect(app.locator('#proof-terms.on')).toBeVisible();
  await expect(app.locator('#proof-terms-version')).toHaveText(beforeConfirm.versionId);
  await expect(app.locator('#proof-terms-q')).toContainText('$54.27');
  await app.locator('#proof-terms [data-proof-go="proof-record"]').click();
  await expect(app.locator('#proof-record.on')).toBeVisible();
  await expect(app.locator('#proof-record-version')).toHaveText(beforeConfirm.versionId);
  await expect(app.locator('#proof-record-economics')).toContainText('$54.27');

  // Reopening and confirming without edits keeps the already-confirmed revision unchanged.
  const firstProof=await app.locator('body').evaluate(() => localStorage.getItem('stb-proof-handoff-job1'));
  await app.locator('#proof-record [data-proof-library]').click();
  await expect(app.locator('#projects.on')).toBeVisible();
  await startOwn.click();
  await app.locator('#start-own-live').evaluate(() => new Promise(resolve => setTimeout(resolve,0)));
  await project.locator('.stb-bench-button').click();
  await project.locator('#stb-confirm-store').click();
  const secondProof=await app.locator('body').evaluate(() => localStorage.getItem('stb-proof-handoff-job1'));
  expect(secondProof).toBe(firstProof);

  // H — protected Window Seat remains separate.
  await project.locator('#stb-bench-library').click();
  await expect(app.locator('#projects.on')).toBeVisible();
  await app.locator('.tile[data-window-seat-artifact="stb-window-seat-space-utilization-0.7.4.html"]').click();
  await expect(app.locator('#window-seat-live.on')).toBeVisible();
  const afterSwitch=await app.locator('body').evaluate(() => localStorage.getItem('stb-proof-handoff-job1'));
  expect(afterSwitch).toBe(firstProof);
  expect(pageErrors,'unexpected page errors').toEqual([]);
});
