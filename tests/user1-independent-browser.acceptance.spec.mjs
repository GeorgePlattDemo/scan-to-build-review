import { test, expect } from '@playwright/test';

const STORE_PIN='34d4c6e7a2cb7e4bce428e396c7d7cbf228d20b7';

function appFrame(page){
  return page.frameLocator('#stb-current').frameLocator('#stb-current');
}

async function retainedDefinition(app){
  return app.locator('body').evaluate(() => JSON.parse(localStorage.getItem('stb-start-own-user1-definition')||'null'));
}

test('actual User 1 journey is demand-driven from finished members through Store-selected parent and record', async ({ page }) => {
  const pageErrors=[];
  page.on('pageerror', error => pageErrors.push(String(error?.stack || error)));
  const base=process.env.STB_REVIEW_URL || 'http://127.0.0.1:4173';
  await page.goto(base+'/system-build-current.html');
  const app=appFrame(page);

  // 1. Real composed entry route.
  await expect(app.locator('#landing.on')).toBeVisible();
  await app.getByRole('button',{name:'NEW USER'}).click();
  await expect(app.locator('#new-user.on')).toBeVisible();
  await app.locator('#new-user button[data-canonical-go="projects"]').click();
  await expect(app.locator('#projects.on')).toBeVisible();
  const startOwn=app.locator('.tile[data-start-own-artifact="three-frames.html"]');
  await expect(startOwn).toBeVisible();
  await startOwn.click();
  await expect(app.locator('#start-own-live.on')).toBeVisible();
  await app.locator('#start-own-live').evaluate(() => new Promise(resolve => setTimeout(resolve, 0)));

  const project=app.frameLocator('#start-own-proof-frame');
  const answer=project.locator('#stb-system-answer');
  await expect(answer,'FAULT_TARGET_STORE_BINDING_MISSING').toHaveAttribute('data-store-authoritative','true');
  await expect(answer).toHaveAttribute('data-store-pin',STORE_PIN);
  await project.locator('.stb-bench-button').click();
  await expect(project.locator('#stb-start-bench-screen')).toBeVisible();

  // 2–4. Finished demand is explicit; material is Store-selected; parent stock is a result.
  await expect(project.locator('#stb-config-length')).toHaveValue('16');
  await expect(project.locator('#stb-config-parts-value')).toHaveText('2 parts');
  await expect(project.locator('#stb-config-angle')).toHaveValue('30');
  await expect(project.locator('#stb-def-parent')).toContainText('STB-ZERO-SPF-2X4-72-001');
  await expect(project.locator('#stb-def-parent')).toContainText('72 in');
  await expect(project.locator('#stb-material-required')).toContainText('72 in Store-selected parent');
  await expect(project.locator('#stb-basis-source-stock')).toContainText('FEWEST_PARENTS_THEN_SHORTEST_PARENT');
  expect(await project.locator('body').innerText()).not.toMatch(/supplied[- ]board|owner[- ]owned|board in the truck/i);

  let retained=await retainedDefinition(app);
  expect(retained.physicalDemand.materialSource).toBe('STORE_SELECTED');
  expect(retained.physicalDemand.finishedPartLengthIn).toBe(16);
  expect(retained.physicalDemand.quantity).toBe(2);
  expect(retained.physicalDemand.definedWorkpieceLengthIn).toBeUndefined();
  expect(retained.physicalDemand.parentLengthIn).toBeUndefined();
  expect(retained.storeReference.authoritativeRequest.finishedPartLengthIn).toBe(16);
  expect(retained.storeReference.authoritativeRequest.quantity).toBe(2);
  expect(retained.storeReference.authoritativeRequest.definedWorkpieceLengthIn).toBeUndefined();
  expect(retained.operationPlan.selected.storeSku).toBe('STB-ZERO-SPF-2X4-72-001');
  expect(retained.operationPlan.selected.parentStockLengthIn).toBe(72);
  expect(retained.operationPlan.intermediateBlank).toBe(null);

  // 5–6. Drawing/ops/remainder/price are one Store plan. Demonstrate spots OFF, then ON.
  await project.locator('#stb-config-spot [data-spot="none"]').click();
  await expect(answer).toHaveAttribute('data-store-disposition','SUPPORTABLE');
  await expect(project.locator('#stb-price-total')).toHaveText('$54.27 · COMPLETE');
  retained=await retainedDefinition(app);
  expect(retained.operationPlan.selected.storeSku).toBe('STB-ZERO-SPF-2X4-72-001');
  expect(retained.operationPlan.selected.parentStockLengthIn).toBe(72);
  expect(retained.operationPlan.intermediateBlank,'FAULT_TARGET_UNJUSTIFIED_BLANK_INSERTED').toBe(null);
  expect(retained.operationPlan.accounting.productionSawCuts).toBe(3);
  expect(retained.operationPlan.accounting.preparationSawCuts).toBe(0);
  expect(
    retained.storeReference.authoritativeAnswer.rawEstimate.operationAccounting.totalModeledSawCuts,
    'FAULT_TARGET_PRICED_PLAN_OMITS_NECESSARY_OPERATION'
  ).toBe(retained.operationPlan.accounting.totalModeledSawCuts);
  await expect(project.locator('#stb-bench-cut-copy'),'FAULT_TARGET_PICTURE_PRICED_PLAN_MISMATCH').toContainText('3 production saw cycles');
  expect(retained.operationPlan.parents[0].remainderIn).toBe(39.625);
  await expect(project.locator('#stb-bench-remain-label')).toContainText('39 5/8 in remains');
  await expect(project.locator('#stb-price-material')).toHaveText('$3.13');
  await expect(project.locator('#stb-price-processing')).toHaveText('$51.14');
  expect(retained.storeReference.authoritativeAnswer.rawEstimate.status).toBe('BUDGETARY_ESTIMATE');
  expect(retained.storeReference.authoritativeAnswer.rawEstimate.totals.Q).toBe(54.27);

  const spotOffVersion=retained.versionId;
  await project.locator('#stb-config-spot [data-spot="centered"]').click();
  await expect(answer).toHaveAttribute('data-store-disposition','UNRESOLVED');
  await expect(project.locator('#stb-price-total'),'FAULT_TARGET_VISIBLE_STORE_VALUE_MISMATCH').toHaveText('$54.27 · PARTIAL');
  retained=await retainedDefinition(app);
  expect(retained.versionId,'FAULT_TARGET_STALE_ANSWER_ON_NEW_REVISION').not.toBe(spotOffVersion);
  expect(retained.versionId).toBe(retained.storeReference.answerVersionId);
  expect(retained.operationPlan.selected.storeSku).toBe('STB-ZERO-SPF-2X4-72-001');
  expect(retained.operationPlan.selected.parentStockLengthIn).toBe(72);
  expect(retained.operationPlan.accounting.productionSawCuts).toBe(3);
  expect(retained.operationPlan.parents[0].remainderIn).toBe(39.625);
  expect(retained.storeReference.authoritativeAnswer.rawEstimate.status).toBe('PARTIAL_BUDGETARY_ESTIMATE');
  expect(retained.storeReference.authoritativeAnswer.rawEstimate.totals.material).toBe(3.13);
  expect(retained.storeReference.authoritativeAnswer.rawEstimate.totals.cell_recovery).toBe(51.14);
  expect(retained.storeReference.authoritativeAnswer.rawEstimate.totals.Q).toBe(54.27);
  expect(retained.storeReference.spotOperation.toolDiameterIn).toBe(0.1875);
  expect(retained.storeReference.spotOperation.fullDiameterPenetrationIn).toBe(0.1875);
  expect(retained.storeReference.spotOperation.pointGeometryStatus).toBe('UNRESOLVED');
  expect(retained.storeReference.unresolvedConditions).toContain('SPOT_TOOL_POINT_GEOMETRY_REQUIRED');
  expect(retained.storeReference.unresolvedConditions).toContain('SPOT_CYCLE_TIME_APPLICABILITY_UNRESOLVED');

  // Return to spots OFF for the independent geometry/quantity edit cases.
  await project.locator('#stb-config-spot [data-spot="none"]').click();
  await expect(answer).toHaveAttribute('data-store-disposition','SUPPORTABLE');
  retained=await retainedDefinition(app);

  // 7. 16 -> 16.5 recomputes the same demand; qty 2 -> 4 changes Store parent/sequence.
  const length=project.locator('#stb-config-length');
  const beforeLengthEdit=retained.versionId;
  await length.fill('16.5');
  await expect(project.locator('#stb-def-length')).toHaveText('16.5 in each');
  retained=await retainedDefinition(app);
  expect(retained.versionId,'FAULT_TARGET_STALE_ANSWER_ON_NEW_REVISION').not.toBe(beforeLengthEdit);
  expect(retained.versionId).toBe(retained.storeReference.answerVersionId);
  expect(retained.physicalDemand.finishedPartLengthIn).toBe(16.5);
  expect(retained.operationPlan.selected.parentStockLengthIn).toBe(72);
  expect(retained.operationPlan.parents[0].remainderIn).toBe(38.625);
  await expect(project.locator('#stb-price-total')).toHaveText('$54.28 · COMPLETE');

  await project.locator('#stb-config-parts [data-parts="4"]').click();
  retained=await retainedDefinition(app);
  expect(retained.physicalDemand.quantity).toBe(4);
  expect(retained.operationPlan.finishedPart.lengthIn,'FAULT_TARGET_STOCK_LENGTH_OVERWRITES_FINISHED_GEOMETRY').toBe(16.5);
  expect(retained.operationPlan.finishedPart.quantity).toBe(4);
  expect(retained.operationPlan.selected.storeSku).toBe('STB-ZERO-SPF-2X4-96-001');
  expect(retained.operationPlan.selected.parentStockLengthIn).toBe(96);
  expect(retained.operationPlan.accounting.productionSawCuts).toBe(5);
  await expect(project.locator('#stb-def-parent')).toContainText('96 in');

  // E. 46 degrees reaches Store and is refused; finished demand is not resized.
  await project.locator('#stb-config-parts [data-parts="2"]').click();
  await length.fill('16');
  const angle=project.locator('#stb-config-angle');
  await angle.fill('46');
  await expect(answer,'FAULT_TARGET_46_DEGREE_MITER_REFUSAL').toHaveAttribute('data-store-disposition','REFUSED');
  retained=await retainedDefinition(app);
  expect(retained.physicalDemand.finishedPartLengthIn).toBe(16);
  expect(retained.physicalDemand.quantity).toBe(2);
  expect(retained.storeReference.refusalConditions).toContain('MITER_ANGLE_OUTSIDE_D001_STAGE2_ENVELOPE');
  expect(retained.storeReference.authoritativeAnswer.rawEstimate).toBe(null);

  // Reset the confirm candidate to the requested baseline and turn spots ON.
  await angle.fill('30');
  await project.locator('#stb-config-spot [data-spot="centered"]').click();
  await expect(answer).toHaveAttribute('data-store-disposition','UNRESOLVED');
  await expect(project.locator('#stb-price-total')).toHaveText('$54.27 · PARTIAL');
  const beforeConfirm=await retainedDefinition(app);
  expect(beforeConfirm.operationPlan.selected.parentStockLengthIn).toBe(72);
  expect(beforeConfirm.operationPlan.parents[0].remainderIn).toBe(39.625);
  expect(beforeConfirm.versionId).toBe(beforeConfirm.storeReference.answerVersionId);

  // 8. Confirmation freezes this revision; downstream keeps the same definition, parent plan, and answer.
  await project.locator('#stb-confirm-store').click();
  await expect(app.locator('#proof-store.on')).toBeVisible();
  await expect(app.locator('#proof-store-version')).toHaveText(beforeConfirm.versionId);
  await expect(app.locator('#proof-store-q')).toContainText('$54.27');
  const confirmed=await app.locator('body').evaluate(() => ({
    bench:JSON.parse(localStorage.getItem('stb-start-own-user1-bench')||'null'),
    proof:JSON.parse(localStorage.getItem('stb-proof-handoff-job1')||'null')
  }));
  expect(confirmed.bench.definition.versionId).toBe(beforeConfirm.versionId);
  expect(confirmed.bench.definition.storeReference.answerVersionId).toBe(beforeConfirm.versionId);
  expect(confirmed.bench.definition.operationPlan.selected.storeSku).toBe('STB-ZERO-SPF-2X4-72-001');
  expect(confirmed.bench.definition.operationPlan.parents[0].remainderIn).toBe(39.625);
  expect(confirmed.proof.payload.versionId).toBe(beforeConfirm.versionId);
  expect(confirmed.proof.payload.definition.operationPlan.selected.parentStockLengthIn).toBe(72);
  expect(confirmed.proof.payload.storeReference.authoritativeAnswer.rawEstimate.totals.Q).toBe(54.27);

  await app.locator('#proof-store [data-proof-go="proof-accept"]').click();
  await expect(app.locator('#proof-accept.on')).toBeVisible();
  await app.locator('#proof-accept [data-proof-go="proof-yard"]').click();
  await expect(app.locator('#proof-yard.on')).toBeVisible();
  await app.locator('#proof-yard [data-proof-go="proof-record"]').click();
  await expect(app.locator('#proof-terms.on')).toBeVisible();
  await expect(app.locator('#proof-terms-version')).toHaveText(beforeConfirm.versionId);
  await app.locator('#proof-terms [data-proof-go="proof-record"]').click();
  await expect(app.locator('#proof-record.on')).toBeVisible();
  await expect(app.locator('#proof-record-version')).toHaveText(beforeConfirm.versionId);
  await expect(app.locator('#proof-record-economics')).toContainText('$54.27');

  // 9. Protected Window Seat remains separate; User 1 retained record does not move.
  const frozenProof=await app.locator('body').evaluate(() => localStorage.getItem('stb-proof-handoff-job1'));
  await app.locator('#proof-record [data-proof-library]').click();
  await expect(app.locator('#projects.on')).toBeVisible();
  await app.locator('.tile[data-window-seat-artifact="stb-window-seat-space-utilization-0.7.4.html"]').click();
  await expect(app.locator('#window-seat-live.on')).toBeVisible();
  const afterSwitch=await app.locator('body').evaluate(() => ({
    proof:localStorage.getItem('stb-proof-handoff-job1'),
    user1:JSON.parse(localStorage.getItem('stb-start-own-user1-definition')||'null')
  }));
  expect(afterSwitch.proof).toBe(frozenProof);
  expect(afterSwitch.user1.versionId).toBe(beforeConfirm.versionId);
  expect(afterSwitch.user1.storeReference.storePin).toBe(STORE_PIN);
  expect(afterSwitch.user1.storeReference.authoritativeAnswer.rawEstimate.totals.Q).toBe(54.27);

  expect(pageErrors,'browser page errors').toEqual([]);
});
