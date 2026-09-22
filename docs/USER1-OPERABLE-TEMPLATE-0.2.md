# JOB 1 OPERABLE TEMPLATE — 0.2

**Purpose:** Freeze Job 1 as the first complete Scan-to-Build dimensional template from customer definition through simulated commercial, fulfillment, custody, and closeout gates.

**Status:** Full bounded simulation template · Store pricing/model basis remains Stage-2 · no real payment · no live inventory authority · no live machine motion.

## 1. Proven authority stack

### Store
- Repository: `GeorgePlattDemo/scan-to-build-store`
- Exact Store SHA: `95c639a1d0d4812df097ad1eb628594b38f921de`
- Governing standard: `DIMENSIONAL-STORE-TRAVEL-STANDARD-0.1.md`
- Governing evaluator: `evaluateDimensionalTravelJob()`
- Pricing engine: `STB-STORE-ZERO-PRICE-1 / 0.3.0`

### System contract
- Store/System integration proof remains the boundary that prevents the application from becoming a second Store evaluator.
- Configure submits identified physical demand; Store owns capability, travel/time, economics, refusal, and Q.

### Visible Job 1
- First full-gate passing implementation SHA: `35b5bed6123973455d3dfb65c49340fde4661ab3`
- Workflow: `Job 1 Operable Template`
- Result: **SUCCESS**

## 2. Frozen Job 1 physical truth

- configuration ID: `SYO-USER1-XBRACE`
- configuration version: `0.1`
- one defined 60 in SPF 2x4 workpiece
- two identified 16 in parts
- 30° face-miter condition
- three derived saw operations
- two identified `SPOT_ON_LOCATION` features
- one centered 3/16 in spot per part at part-relative X = 8.000 in
- Store pricing/reference SKU: `STB-ZERO-SPF-2X4-72-001`
- project workpiece remains 60 in
- Store material: **$3.13**
- modeled machine service: **$5.89**
- Stage-2 Store Q: **$9.02**
- modeled D-001 occupied time: **1.4128 min**
- final retained remainder: **27.625 in**
- calculation input hash: `5de0367b62087cb0174ef5f1e101e22ded3728ba71906868628a985afafa078b`
- calculation result hash: `9ad8d16a7c211d420b83e46ed8a8d224bd289e26a48764ff8d0389b6db698604`

## 3. Required full actor/event chain

A later job is not migrated merely because it reaches Store or receives Q.

It must be capable of carrying one identified definition through:

`INTENT → DEFINE → STORE REVIEW → OFFER / TERMS → CUSTOMER ACCEPTANCE → SIMULATED PURCHASE / SETTLEMENT → MATERIAL ALLOCATION → PRODUCTION RELEASE → QUEUE → LOCAL CELL READINESS → LOCAL CYCLE START → MODELED OPERATIONS → INSPECTION → LABELS → STAGING → READY → PICKUP / CUSTODY → CLOSEOUT / OWNER RECORD`

Every arrow is a gate.

No downstream event may exist unless its required predecessor exists.

## 4. Store review gate

The exact confirmed job reaches Store review unchanged.

Store may record exactly one of:

- `ACCEPTED_AS_ASKED`
- `RETURNED_FOR_MODIFICATION`
- `DECLINED`

Only `ACCEPTED_AS_ASKED` may issue the simulated offer used by the Job 1 proof.

Returning for modification does not mutate the confirmed version.

Declining does not create an offer.

## 5. Offer / terms gate

The simulated offer:

- is tied to the same job/version;
- carries the same Store SHA and calculation identity;
- carries the Store Q as its simulated amount;
- has its own offer ID;
- does not recalculate Q;
- is labeled simulation-only.

A changed definition requires a new Store answer and therefore a new offer identity.

**Offer ≠ acceptance.**

## 6. Customer acceptance and purchase gate

Customer decision is separate from settlement.

Possible decision events:

- accept offer;
- decline offer.

Only accepted offer may advance to:

`SIMULATED_PURCHASE / SIMULATED_SETTLEMENT`

The Job 1 application does not charge money or contact a payment processor.

The settlement event proves the data/actor sequence only.

**Acceptance ≠ settlement.**

## 7. Store / yard fulfillment gates

After simulated settlement, Store advances one event at a time:

1. material allocation;
2. production release;
3. queue placement;
4. local-cell readiness.

None is inferred from the preceding event.

**Settlement ≠ allocation.**

**Allocation ≠ production release.**

**Production release ≠ machine readiness.**

## 8. Local-cell / machine proof gates

After local readiness:

1. simulated local Cycle Start;
2. modeled required operations complete;
3. inspection pass;
4. labels complete;
5. staging;
6. READY notice.

Cycle Start is explicitly local-cell simulation.

The application does not emit controller code, G-code, or remote machine commands.

The Store travel model remains the source of modeled operation time.

**NO BLOOD ON WOOD.**

## 9. READY / custody / closeout gates

READY is not custody.

After READY:

1. simulated customer pickup records custody transfer;
2. closeout records the completed owner record.

The final record retains the entire event ledger.

**Staged ≠ READY.**

**READY ≠ pickup.**

**Pickup / custody ≠ closeout.**

## 10. Calculation-identity custody

Every Job 1 event carries:

- job ID;
- version ID;
- Store SHA;
- calculation input hash;
- calculation result hash;
- event basis;
- simulation/live-authority status.

The physical definition, Store answer, commercial proof events, fulfillment proof events, and owner record remain joined by identity rather than by project name or UI location.

## 11. Navigation integrity

Navigation is part of acceptance.

While Job 1 is active, the visible route is:

`Start / Intent → Define → Store Review → Offer / Terms → Accept / Pay → Fulfillment → Pickup / Record`

Underlying Job 1 pages are:

`start-own-live → proof-store → proof-terms → proof-accept → proof-yard → proof-record`

The top navigation:

- remains bound to Job 1;
- cannot fall through to Alcove pages;
- cannot jump ahead of an unpassed gate;
- has **Project Library** as the deliberate cross-project exit.

## 12. Simulation boundary

The full Job 1 path is operational as a **bounded simulation**.

It does not claim:

- real seller-of-record status;
- real payment;
- real material reservation;
- real inventory allocation;
- real production release;
- real machine readiness;
- real Cycle Start;
- real fabrication;
- real inspection;
- real staging;
- real READY notice;
- real custody transfer.

Those event types are modeled separately so the architecture can prove their order and custody without pretending the external systems already exist.

## 13. Anti-shortcut inheritance

Every later job must inherit all of these rules:

1. project owns physical demand;
2. machine model owns modeled machine work;
3. Store owns Store answer and Q;
4. application does not duplicate Store evaluation;
5. changed definition cannot borrow an old Store answer;
6. Store review must explicitly accept, modify, or decline;
7. offer, acceptance, settlement, allocation, release, readiness, Cycle Start, production outcome, quality, READY, custody, and closeout remain separate events;
8. no event may be created out of order;
9. navigation cannot bypass the gate engine;
10. the same job/version/calculation identity travels through every event;
11. missing authority fails closed;
12. simulated authority is labeled simulated;
13. real-world authority is never implied by a passing simulation.

## 14. Migration rule

Do not copy Job 1 geometry into another project.

Copy the contract:

`PROJECT-SPECIFIC DEFINITION → SAME STORE AUTHORITY → SAME GATE ENGINE → SAME IDENTITY CUSTODY → PROJECT-SPECIFIC OWNER RECORD`

A later project should be expected to fail until its own physical definition can satisfy the same gates.

Do not weaken Job 1 to make an older project pass.

## Governing statement

> **JOB 1 IS FULLY RESOLVED AS A BOUNDED SIMULATION TEMPLATE ONLY WHEN THE SAME IDENTIFIED JOB CAN PASS EVERY GATE FROM DEFINITION THROUGH CLOSEOUT WITHOUT INVENTING STORE LOGIC, COLLAPSING EVENTS, OR CLAIMING LIVE AUTHORITY.**
