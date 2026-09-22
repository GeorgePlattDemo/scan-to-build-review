import { test, expect } from '@playwright/test';

const USER1_STORE_PIN='7303793620d0ceda509810a661d11e6c31c7d59f';
const S001_STORE_PIN='4402abeb6b0299a5b6db2eec85ed04c3b0236bcc';
const WINDOW_SEAT_STORE_PIN='f88ec61c42446755d00259f88e7fd09f2702fd92';

function appFrame(page){
  return page.frameLocator('#stb-current').frameLocator('#stb-current');
}

test('project switching preserves separate definitions, Store answers, prices, and revision identity', async ({page}) => {
  const base=process.env.STB_REVIEW_URL || 'http://127.0.0.1:4173';
  await page.goto(base+'/system-build-current.html');
  const app=appFrame(page);

  await expect(app.locator('#landing.on')).toBeVisible();
  await app.getByRole('button',{name:'NEW USER'}).click();
  await app.locator('#new-user button[data-canonical-go="projects"]').click();
  await expect(app.locator('#projects.on')).toBeVisible();

  // 1. Start Your Own / User 1 — exact 730379 Store authority and partial spot economics.
  const startOwn=app.locator('.tile[data-start-own-artifact="three-frames.html"]');
  await expect(startOwn).toBeVisible();
  await startOwn.click();
  await expect(app.locator('#start-own-live.on')).toBeVisible();
  await app.locator('#start-own-live').evaluate(() => new Promise(resolve => setTimeout(resolve,0)));

  const startFrame=app.frameLocator('#start-own-proof-frame');
  const user1Answer=startFrame.locator('#stb-system-answer');
  await expect(user1Answer,'ISOLATION_USER1_STORE_BINDING_MISSING').toHaveAttribute('data-store-authoritative','true');
  await expect(user1Answer,'ISOLATION_USER1_STORE_PIN_DRIFT').toHaveAttribute('data-store-pin',USER1_STORE_PIN);
  await startFrame.locator('.stb-bench-button').click();
  await expect(startFrame.locator('#stb-price-total'),'ISOLATION_USER1_PRICE_DRIFT').toHaveText('$54.29 · PARTIAL');

  const user1=await app.locator('body').evaluate(() => JSON.parse(localStorage.getItem('stb-start-own-user1-definition')||'null'));
  expect(user1.versionId,'ISOLATION_USER1_VERSION_MISSING').toBeTruthy();
  expect(user1.versionId,'ISOLATION_USER1_ANSWER_VERSION_DRIFT').toBe(user1.storeReference.answerVersionId);
  expect(user1.storeReference.storePin,'ISOLATION_USER1_RETAINED_STORE_PIN_DRIFT').toBe(USER1_STORE_PIN);
  expect(user1.storeReference.authoritativeAnswer.rawEstimate.totals.Q,'ISOLATION_USER1_RETAINED_PRICE_DRIFT').toBe(54.29);

  await startFrame.locator('#stb-bench-library').click();
  await expect(app.locator('#projects.on')).toBeVisible();

  // 2. S-001 — a separate generated Store runtime and material-only economics.
  const s001Tile=app.locator('#projects .tile[data-go="window-parts"]');
  await expect(s001Tile).toBeVisible();
  await s001Tile.click();
  await expect(app.locator('#playhouse-s001.on')).toBeVisible();
  await app.locator('#playhouse-s001 [data-canonical-go="playhouse-machine"]').click();
  await expect(app.locator('#playhouse-machine.on')).toBeVisible();
  await expect(app.locator('#s001-live-store-disposition'),'ISOLATION_S001_STORE_ANSWER_MISSING').toHaveText('SUPPORTABLE · REFERENCE');
  await expect(app.locator('#s001-live-store-material'),'ISOLATION_S001_PRICE_DRIFT').toHaveText('$26.55 material-only');

  const afterS001=await app.locator('body').evaluate(() => ({
    user1:JSON.parse(localStorage.getItem('stb-start-own-user1-definition')||'null'),
    s001:JSON.parse(localStorage.getItem('stb-s001-current-definition')||'null')
  }));
  expect(afterS001.s001.storeAnswer.storePin,'ISOLATION_S001_STORE_PIN_DRIFT').toBe(S001_STORE_PIN);
  expect(afterS001.s001.storeAnswer.rawEstimate.Q,'ISOLATION_S001_RETAINED_PRICE_DRIFT').toBe(26.55);
  expect(afterS001.s001.versionId,'ISOLATION_S001_ANSWER_VERSION_DRIFT').toBe(afterS001.s001.storeAnswer.definitionVersionId);
  expect(afterS001.s001.versionId,'ISOLATION_S001_BORROWED_USER1_VERSION').not.toBe(user1.versionId);
  expect(afterS001.user1.versionId,'ISOLATION_S001_SWITCH_MUTATED_USER1_VERSION').toBe(user1.versionId);
  expect(afterS001.user1.storeReference.authoritativeAnswer.rawEstimate.totals.Q,'ISOLATION_S001_SWITCH_MUTATED_USER1_PRICE').toBe(54.29);

  await app.locator('#playhouse-machine [data-canonical-go="playhouse-s001"]').click();
  await expect(app.locator('#playhouse-s001.on')).toBeVisible();
  await app.locator('#playhouse-s001 [data-canonical-go="projects"]').click();
  await expect(app.locator('#projects.on')).toBeVisible();

  // Closing a read-only library preview intentionally restores the published baseline.
  // Capture the normalized S-001 state here so the next assertion tests Window Seat
  // isolation rather than mistaking S-001's own preview-close lifecycle for leakage.
  const afterS001Exit=await app.locator('body').evaluate(() => ({
    user1:JSON.parse(localStorage.getItem('stb-start-own-user1-definition')||'null'),
    s001:JSON.parse(localStorage.getItem('stb-s001-current-definition')||'null')
  }));
  expect(afterS001Exit.s001.versionId,'ISOLATION_S001_EXIT_VERSION_MISSING').toMatch(/^S001-SARAH-PLAYHOUSE-0\\.1-v\\d+$/);
  expect(afterS001Exit.s001.storeAnswer.definitionVersionId,'ISOLATION_S001_EXIT_ANSWER_VERSION_DRIFT').toBe(afterS001Exit.s001.versionId);
  expect(afterS001Exit.s001.storeAnswer.storePin,'ISOLATION_S001_EXIT_STORE_PIN_DRIFT').toBe(S001_STORE_PIN);
  expect(afterS001Exit.s001.storeAnswer.rawEstimate.Q,'ISOLATION_S001_EXIT_PRICE_DRIFT').toBe(26.55);
  expect(afterS001Exit.user1.versionId,'ISOLATION_S001_EXIT_MUTATED_USER1_VERSION').toBe(user1.versionId);

  // 3. Window Seat — native project-specific Store recovery/capability authority.
  const seatTile=app.locator('.tile[data-window-seat-artifact="stb-window-seat-space-utilization-0.7.4.html"]');
  await expect(seatTile).toBeVisible();
  await seatTile.click();
  await expect(app.locator('#window-seat-live.on')).toBeVisible();

  const seat=app.frameLocator('#window-seat-live .window-seat-shell-frame');
  await expect(seat.locator('body')).toBeVisible();
  const seatSnapshot=await seat.locator('body').evaluate(() => window.STBWindowSeatJourney.snapshot());
  expect(seatSnapshot.project.id,'ISOLATION_WINDOW_SEAT_WRONG_PROJECT').toBe('window-seat');
  expect(seatSnapshot.storeReference.pin.commit,'ISOLATION_WINDOW_SEAT_STORE_PIN_DRIFT').toBe(WINDOW_SEAT_STORE_PIN);
  expect(seatSnapshot.storeReference.q,'ISOLATION_WINDOW_SEAT_BORROWED_USER1_PRICE').not.toBe(54.29);
  expect(seatSnapshot.storeReference.q,'ISOLATION_WINDOW_SEAT_BORROWED_S001_PRICE').not.toBe(26.55);
  expect(seatSnapshot.storeReference.revision,'ISOLATION_WINDOW_SEAT_REFERENCE_REVISION_DRIFT').toBe(seatSnapshot.revision.number);

  const afterSeat=await app.locator('body').evaluate(() => ({
    user1:JSON.parse(localStorage.getItem('stb-start-own-user1-definition')||'null'),
    s001:JSON.parse(localStorage.getItem('stb-s001-current-definition')||'null')
  }));
  expect(afterSeat.user1.versionId,'ISOLATION_WINDOW_SWITCH_MUTATED_USER1_VERSION').toBe(user1.versionId);
  expect(afterSeat.user1.storeReference.storePin,'ISOLATION_WINDOW_SWITCH_MUTATED_USER1_STORE').toBe(USER1_STORE_PIN);
  expect(afterSeat.s001.versionId,'ISOLATION_WINDOW_SWITCH_MUTATED_S001_VERSION').toBe(afterS001Exit.s001.versionId);
  expect(afterSeat.s001.storeAnswer.definitionVersionId,'ISOLATION_WINDOW_SWITCH_MUTATED_S001_ANSWER_VERSION').toBe(afterS001Exit.s001.storeAnswer.definitionVersionId);
  expect(afterSeat.s001.storeAnswer.storePin,'ISOLATION_WINDOW_SWITCH_MUTATED_S001_STORE').toBe(S001_STORE_PIN);
  expect(afterSeat.s001.storeAnswer.rawEstimate.Q,'ISOLATION_WINDOW_SWITCH_MUTATED_S001_PRICE').toBe(26.55);

  // Return to User 1 and prove the original retained definition/answer still owns that path.
  await app.locator('#window-seat-live [data-proof-library]').click();
  await expect(app.locator('#projects.on')).toBeVisible();
  await startOwn.click();
  await expect(app.locator('#start-own-live.on')).toBeVisible();
  await app.locator('#start-own-live').evaluate(() => new Promise(resolve => setTimeout(resolve,0)));
  await startFrame.locator('.stb-bench-button').click();

  const returned=await app.locator('body').evaluate(() => JSON.parse(localStorage.getItem('stb-start-own-user1-definition')||'null'));
  expect(returned.versionId,'ISOLATION_RETURN_USER1_VERSION_DRIFT').toBe(user1.versionId);
  expect(returned.storeReference.answerVersionId,'ISOLATION_RETURN_USER1_ANSWER_VERSION_DRIFT').toBe(user1.storeReference.answerVersionId);
  expect(returned.storeReference.storePin,'ISOLATION_RETURN_USER1_STORE_PIN_DRIFT').toBe(USER1_STORE_PIN);
  expect(returned.storeReference.authoritativeAnswer.rawEstimate.totals.Q,'ISOLATION_RETURN_USER1_PRICE_DRIFT').toBe(54.29);
});

/*
Coverage boundary:
- This browser isolation check exercises three materially different Store paths:
  User 1 generated Store runtime, S-001 generated published-job runtime, and Window Seat native project-specific recovery/capability logic.
- Outdoor intentionally has no class-scoped recovery model, and Alcove retains project-native/frozen economics.
  Their authority ownership remains covered by the separate active-configurator authority test and their existing journey tests.
  They are not forced through another project's Store runtime merely to make this isolation test broader.
*/
