import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const STORE_PIN='f88ec61c42446755d00259f88e7fd09f2702fd92';
const STAGE2_PIN='b40cdc60a405d6c2a63d846f2c2e89cddc5bb95d';
const root=process.env.STB_STORE_ZERO_WINDOW_ROOT;
if(!root) throw new Error('STB_STORE_ZERO_WINDOW_ROOT is required');

const recoveryDoc=readFileSync(join(root,'STB-STORE-ZERO-WINDOW-SEAT-RECOVERY-0.1.md'),'utf8');
const envelopeDoc=readFileSync(join(root,'D001-BOARD-EDGE-MILL-REFERENCE-0.3.md'),'utf8');

function numberAfter(re,source,label){
  const match=source.match(re);
  if(!match) throw new Error('Unable to parse '+label+' from exact Store source');
  const raw=match[1].replace(/,/g,'').trim();
  const fraction=raw.match(/^([0-9]+(?:\.[0-9]+)?)\/([0-9]+(?:\.[0-9]+)?)$/);
  const value=fraction ? Number(fraction[1])/Number(fraction[2]) : Number(raw);
  if(!Number.isFinite(value)) throw new Error('Parsed non-numeric '+label+' from exact Store source: '+raw);
  return value;
}
const source={
  fixedFulfillment:numberAfter(/fixed_reference_fulfillment\s*=\s*\$([0-9.]+)/,recoveryDoc,'fixed fulfillment'),
  cellBaseline:numberAfter(/Cell consumption \/ wear reserve \| \$([0-9.]+)/,recoveryDoc,'cell baseline'),
  pineCycleAnchor:numberAfter(/\$60\.00\s*\n\s*× \(modeled_cycle_minutes \/ ([0-9.]+)\)/,recoveryDoc,'Pine cycle anchor'),
  pineFeed:numberAfter(/Select Pine[^\n]*→ SOFT WOOD → ([0-9.]+) in\/min/,envelopeDoc,'Pine feed'),
  hardFeed:numberAfter(/Select Poplar[^\n]*→ HARD WOOD → ([0-9.]+) in\/min/,envelopeDoc,'hardwood feed'),
  maxStockWidth:numberAfter(/maximum stock width: \*\*([0-9.]+) in\*\*/,envelopeDoc,'max stock width'),
  maxEdgeRemoval:numberAfter(/maximum total edge removal: \*\*([0-9.]+) in\*\*/,envelopeDoc,'max edge removal'),
  passDepth:numberAfter(/mill depth per pass: \*\*([0-9.]+) in\*\*/,envelopeDoc,'pass depth'),
  spindleRpm:numberAfter(/spindle reference: \*\*([0-9,]+) RPM\*\*/,envelopeDoc,'spindle RPM'),
  cutterDiameter:numberAfter(/cutter reference: \*\*([0-9/]+) in/,envelopeDoc,'cutter diameter fraction'),
  cuttingEdges:numberAfter(/cutter reference: \*\*[0-9/]+ in, ([0-9.]+) cutting edges\*\*/,envelopeDoc,'cutting edges'),
  materialHandlingFabrication:numberAfter(/\| Material handling \/ fabrication \| \$([0-9.]+)/,recoveryDoc,'material handling / fabrication'),
  inspectLabelBundleStage:numberAfter(/\| Inspect \/ label \/ bundle \/ stage \| \$([0-9.]+)/,recoveryDoc,'inspect / label / bundle / stage'),
  facilityAdminRework:numberAfter(/\| Facility \/ admin \/ rework reserve \| \$([0-9.]+)/,recoveryDoc,'facility / admin / rework reserve'),
  serviceCommercialReserve:numberAfter(/\| Service \/ commercial reserve \| \$([0-9.]+)/,recoveryDoc,'service / commercial reserve')
};
source.pineMaterial=numberAfter(/Select Pine \| \$([0-9,.]+) \| 56\.16 min/,recoveryDoc,'Pine material');
source.pineRecovery=numberAfter(/Select Pine \| \$[0-9,.]+ \| 56\.16 min \| \$([0-9,.]+)/,recoveryDoc,'Pine recovery');
source.pineQ=numberAfter(/Select Pine \| \$[0-9,.]+ \| 56\.16 min \| \$[0-9,.]+ \| \$([0-9,.]+)/,recoveryDoc,'Pine selling basis');

test('Window Seat browser Store reference matches its exact declared Store sources', async ({page}) => {
  const base=process.env.STB_REVIEW_URL || 'http://127.0.0.1:4173';
  await page.goto(base+'/stb-window-seat-space-utilization-0.7.4.html');
  await page.waitForFunction(() => !!window.STBWindowSeatJourney);
  const snap=await page.evaluate(() => window.STBWindowSeatJourney.snapshot());

  expect(snap.project.id).toBe('window-seat');
  expect(snap.storeReference.pin.commit).toBe(STORE_PIN);
  expect(snap.storeReference.pin.stage2).toBe(STAGE2_PIN);
  expect(snap.storeReference.pin.recovery).toBe('STB-STORE-ZERO-WINDOW-SEAT-RECOVERY-0.1');
  expect(snap.storeReference.pin.envelope).toBe('D001-BOARD-EDGE-MILL-REF-0.3');

  expect(snap.storeReference.profile.feedInPerMin).toBe(source.pineFeed);
  expect(snap.storeReference.profile.cutterDiameterIn).toBe(source.cutterDiameter);
  expect(snap.storeReference.profile.cuttingEdges).toBe(source.cuttingEdges);
  expect(snap.storeReference.profile.spindleRpm).toBe(source.spindleRpm);

  expect(snap.storeReference.recoveryBreakdown.materialHandlingFabrication).toBe(source.materialHandlingFabrication);
  expect(snap.storeReference.recoveryBreakdown.inspectLabelBundleStage).toBe(source.inspectLabelBundleStage);
  expect(snap.storeReference.recoveryBreakdown.facilityAdminRework).toBe(source.facilityAdminRework);
  expect(snap.storeReference.recoveryBreakdown.serviceCommercialReserve).toBe(source.serviceCommercialReserve);
  expect(source.fixedFulfillment).toBe(365);
  expect(source.cellBaseline).toBe(60);
  expect(source.pineCycleAnchor).toBe(56.159065);
  expect(source.maxStockWidth).toBe(12);
  expect(source.maxEdgeRemoval).toBe(1);
  expect(source.passDepth).toBe(0.375);
  expect(source.hardFeed).toBe(216);

  expect(snap.storeReference.material).toBe(source.pineMaterial);
  expect(snap.storeReference.recovery).toBe(source.pineRecovery);
  expect(snap.storeReference.q).toBe(source.pineQ);
  expect(snap.storeReference.minutes).toBeCloseTo(56.16,2);
  expect(snap.authority.physicalFabrication).toBe(false);
  expect(snap.authority.cycleStart).toBe(false);
});

test('Window Seat supported edits recompute definition, Store basis, displayed value, and retained revision coherently', async ({page}) => {
  const base=process.env.STB_REVIEW_URL || 'http://127.0.0.1:4173';
  await page.goto(base+'/stb-window-seat-space-utilization-0.7.4.html');
  await page.waitForFunction(() => !!window.STBWindowSeatJourney);

  const initial=await page.evaluate(() => window.STBWindowSeatJourney.snapshot());
  const initialDisplayed=Number((await page.locator('#e-price').textContent()).replace(/[^0-9.]/g,''));
  expect(initial.project.id,'WINDOW_SEAT_EDIT_WRONG_PROJECT').toBe('window-seat');
  expect(initial.storeReference.pin.commit,'WINDOW_SEAT_EDIT_WRONG_STORE_AUTHORITY').toBe(STORE_PIN);
  expect(initial.definition.mats.every(line => line.family==='Select Pine'),'WINDOW_SEAT_EDIT_INITIAL_MATERIAL_DRIFT').toBe(true);
  expect(initialDisplayed,'WINDOW_SEAT_EDIT_DISPLAY_NOT_STORE_VALUE').toBe(initial.storeReference.q);

  // Change a supported customer choice that materially changes the definition and Store economics
  // without creating a site-fit conflict: Pine -> Poplar.
  await page.locator('#species [data-k="poplar"]').click();
  const edited=await page.evaluate(() => window.STBWindowSeatJourney.snapshot());
  const editedDisplayed=Number((await page.locator('#e-price').textContent()).replace(/[^0-9.]/g,''));

  expect(edited.definition.W,'WINDOW_SEAT_EDIT_GEOMETRY_SHOULD_BE_PRESERVED').toBe(initial.definition.W);
  expect(edited.definition.mats.every(line => line.family==='Select Poplar'),'WINDOW_SEAT_EDIT_DEFINITION_NOT_RECOMPUTED').toBe(true);
  expect(edited.storeRequest.revision,'WINDOW_SEAT_EDIT_REQUEST_REVISION_DRIFT').toBe(edited.revision.number);
  expect(edited.storeReference.revision,'WINDOW_SEAT_EDIT_STORE_REVISION_DRIFT').toBe(edited.revision.number);
  expect(edited.storeReference.pin.commit,'WINDOW_SEAT_EDIT_STORE_AUTHORITY_DRIFT').toBe(STORE_PIN);
  expect(editedDisplayed,'WINDOW_SEAT_EDIT_DISPLAY_NOT_RECOMPUTED_STORE_VALUE').toBe(edited.storeReference.q);
  expect(edited.storeReference.q,'WINDOW_SEAT_EDIT_STORE_VALUE_STALE').not.toBe(initial.storeReference.q);

  await page.locator('[data-ws-confirm-send]').click();
  let confirmed=await page.evaluate(() => window.STBWindowSeatJourney.snapshot());
  expect(confirmed.revision.confirmed,'WINDOW_SEAT_CONFIRM_REVISION_NOT_CONFIRMED').toBe(true);
  expect(confirmed.storeAnswer.atRevision,'WINDOW_SEAT_CONFIRM_ANSWER_REVISION_DRIFT').toBe(confirmed.revision.number);
  expect(confirmed.storeAnswer.pin.commit,'WINDOW_SEAT_CONFIRM_STORE_AUTHORITY_DRIFT').toBe(STORE_PIN);
  expect(confirmed.storeAnswer.q,'WINDOW_SEAT_CONFIRM_ANSWER_NOT_CURRENT_STORE_VALUE').toBe(confirmed.storeReference.q);

  // Confirmation moves the standalone page to the Store stage. Return through the
  // actual actor control before making a second customer edit.
  await page.locator('[data-ws-guided-stage="configure"]:visible').click();
  await expect(page.locator('#species [data-k="oak"]')).toBeVisible();

  // A second supported material edit after confirmation must make the held answer historical.
  await page.locator('#species [data-k="oak"]').click();
  const revised=await page.evaluate(() => window.STBWindowSeatJourney.snapshot());
  expect(revised.definition.mats.every(line => line.family==='Select Red Oak'),'WINDOW_SEAT_REVISE_DEFINITION_NOT_RECOMPUTED').toBe(true);
  expect(revised.revision.number,'WINDOW_SEAT_REVISE_DID_NOT_INCREMENT').toBe(confirmed.revision.number+1);
  expect(revised.revision.confirmed,'WINDOW_SEAT_REVISE_LEFT_REVISION_CONFIRMED').toBe(false);
  expect(revised.storeAnswer.stale,'WINDOW_SEAT_REVISE_OLD_ANSWER_NOT_HISTORICAL').toBe(true);
  expect(revised.storeAnswer.atRevision,'WINDOW_SEAT_REVISE_OLD_ANSWER_IDENTITY_CHANGED').toBe(confirmed.revision.number);
  expect(revised.storeReference.revision,'WINDOW_SEAT_REVISE_LIVE_REFERENCE_STALE').toBe(revised.revision.number);
  expect(revised.storeReference.pin.commit,'WINDOW_SEAT_REVISE_STORE_AUTHORITY_DRIFT').toBe(STORE_PIN);

  await page.locator('[data-ws-confirm-send]').click();
  confirmed=await page.evaluate(() => window.STBWindowSeatJourney.snapshot());
  expect(confirmed.storeAnswer.stale,'WINDOW_SEAT_RECONFIRM_ANSWER_STILL_HISTORICAL').toBe(false);
  expect(confirmed.storeAnswer.atRevision,'WINDOW_SEAT_RECONFIRM_ANSWER_REVISION_DRIFT').toBe(confirmed.revision.number);
  expect(confirmed.storeAnswer.pin.commit,'WINDOW_SEAT_RECONFIRM_STORE_AUTHORITY_DRIFT').toBe(STORE_PIN);
});
