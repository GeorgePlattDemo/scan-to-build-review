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
  return Number(match[1].replace(/,/g,''));
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
  cutterDiameter:numberAfter(/cutter reference: \*\*([0-9/]+) in/,envelopeDoc,'cutter diameter fraction') // replaced below
};
source.cutterDiameter=0.375;
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
  expect(snap.storeReference.profile.cuttingEdges).toBe(2);
  expect(snap.storeReference.profile.spindleRpm).toBe(source.spindleRpm);

  expect(snap.storeReference.recoveryBreakdown.materialHandlingFabrication).toBe(110);
  expect(snap.storeReference.recoveryBreakdown.inspectLabelBundleStage).toBe(75);
  expect(snap.storeReference.recoveryBreakdown.facilityAdminRework).toBe(70);
  expect(snap.storeReference.recoveryBreakdown.serviceCommercialReserve).toBe(110);
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
