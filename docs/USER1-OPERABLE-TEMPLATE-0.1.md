# JOB 1 OPERABLE TEMPLATE — 0.1

**Purpose:** Freeze the first complete Scan-to-Build dimensional project path as the migration template for every later dimensional job.

**Status:** Candidate reference template · simulation/model basis · no commercial offer · no production release · no live-motion authority.

## 1. First passing checkpoints

The checkpoints in this section are historical provenance for the first passing Job 1 path. The current freshness-hardened Store authority is recorded in Section 3 and supersedes the historical Store pin for new Store requests.

### Store

- Repository: `GeorgePlattDemo/scan-to-build-store`
- Branch: `build/d001-travel-standard-0.1`
- Exact tested SHA: `95c639a1d0d4812df097ad1eb628594b38f921de`
- Workflow: `D-001 Travel Standard Acceptance`
- Successful run: `35757052553`
- Governing standard: `DIMENSIONAL-STORE-TRAVEL-STANDARD-0.1.md`
- Governing evaluator: `evaluateDimensionalTravelJob()`

### System

- Repository: `GeorgePlattDemo/scan-to-build-system`
- Branch: `build/d001-travel-standard-0.1`
- Exact tested SHA: `900dbd13f079f8a5f8d76d49c723fd35279164e8`
- Workflow: `D-001 Travel Integration`
- Successful run: `35753012574`

### Visible Review / Job 1

- Repository: `GeorgePlattDemo/scan-to-build-review`
- Branch: `build/user1-travel-standard-0.1`
- First passing implementation SHA: `a7745cc4e74a00baba2e5921fde11b9cf76871d6`
- Workflow: `Job 1 Operable Template`
- Successful run: `35755307321`

A later documentation-only commit may move the branch head. The implementation checkpoint above is the first exact Review SHA that passed the Job-1-only acceptance.

## 2. Job 1 frozen project truth

Job 1 is the Start Your Own X-brace proof.

Project/configuration facts:

- configuration ID: `SYO-USER1-XBRACE`
- configuration version: `0.1`
- one defined 60 in SPF 2x4 workpiece
- two identified 16 in parts
- 30° face-miter condition
- both ends
- parallel end relation
- long-long outer-edge length datum
- Datum C establishment method: `REFERENCE_CUT`
- three declared/derived saw operations
- two identified `SPOT_ON_LOCATION` features
- each spot is part-relative X = 8.000 in
- spot is centered on the wide face
- no generic finished-hole substitution

The application owns this part-relative demand. It does not own Store capability, machine coordinates, machine movement, modeled occupied time, Store economics, refusal, stock selection, or Store Q.

## 3. Store-issued answer for the frozen fixture

The exact Store evaluator returns:

- material reference SKU: `STB-ZERO-SPF-2X4-72-001`
- Store pricing/reference stock length: 72 in
- project workpiece remains: 60 in
- material: **$3.13**
- modeled D-001 occupied time: **1.4128 min**
- modeled machine service: **$5.89**
- Stage-2 budgetary `Q`: **$9.02**
- derived saw operations: **3**
- derived spots: **2**
- final retained remainder: **27.625 in**
- pricing engine: `STB-STORE-ZERO-PRICE-1 / 0.3.0`
- travel model: `STB-D001-DIMENSIONAL-TRAVEL-0.1 / 0.1.0`
- economics basis: `DECLARED_STAGE2_MODEL`
- measured: `false`
- commissioned: `false`
- current Store authority SHA: `f88ccaf9a2624899e255e66b51111e2b02309dad`
- current Store acceptance run: `35768861705`
- calculation input hash: `e186df5ead47f0c3c233477b18d00206643d8e5e1adf03fdd6dabdc95a0a5168`
- calculation result hash: `425af5de05fb614b87ca308696d0d19af0b2701ce2f3fd51c8a6c3ca84042f4f`

The 72 in SKU is a Store procurement/pricing reference. It does not redefine the 60 in project workpiece.

## 4. Required end-to-end actor chain

Job 1 is considered operable only when one identified definition and one identified Store answer survive the full chain:

`INTENT → DEFINE / CONFIGURE → STORE ANSWER → CONFIRM → ACCEPT / PAY BOUNDARY → STORE / YARD → TERMS → HANDOFF / RECORD`

### Intent / Define

The project carries identified parts, feature coordinates, dimensions, operations, version, and owner choices.

It does not invent Store answers.

### Store Answer

Store alone resolves:

- Store material reference;
- capability/refusal;
- D-001 operation sequence;
- modeled machine movement/time;
- Store machine-service economics;
- complete budgetary Q;
- calculation identity.

### Confirm

Confirmation is allowed only when the exact identified revision has a complete Store answer.

Every press of the Store-submit control is a new Store request. The application must obtain current Store authority again and carry a new request/evaluation receipt. A prior Store answer may remain visible as history, but it may not authorize the new request.

A changed configuration/version must not borrow the prior Store result. An unchanged definition also may not silently reuse a prior Store evaluation if Store authority has moved.

Changed governing demand returns:

`STORE_REFRESH_REQUIRED`

### Accept / Pay boundary

The Store budgetary answer may be complete while these remain null:

- commercial offer: not established;
- acceptance: not established;
- payment: not available / not recorded.

No Q becomes a sale merely because it exists.

### Store / Yard

These remain separate physical-authority events:

- allocation: not established;
- production release: not established;
- machine readiness: not established;
- cycle start: not authorized;
- inspection/staging: not recorded;
- ready: not recorded.

**NO BLOOD ON WOOD.**

### Terms

Terms may answer the identified version. They may not rewrite the project definition or manufacture commercial authority.

### Handoff / Record

The owner/Store record retains:

- job/version identity;
- Store SHA;
- calculation input hash;
- calculation result hash;
- Store budgetary economics;
- unresolved/null commercial events;
- unresolved/null physical events.

The record does not invent fabrication.

## 5. Custody invariant

The following identity must survive every Job 1 downstream gate unchanged:

1. project/version identity;
2. exact Store revision;
3. calculation input hash;
4. calculation result hash.

For Job 1 the visible Store, Accept/Pay, Yard, Terms, and Record surfaces all carry those fields.

A later project migration must do the same.

## 6. Same Store twice

The governing dimensional standard requires:

### PASS A

Configure/live Store answer uses the governing Store evaluator.

### PASS B

Confirmation reconciliation uses the same governing Store evaluator again.

For unchanged governing inputs:

- same evaluator;
- same Store/model/economic versions;
- same calculation input identity;
- same result identity;
- same Q.

If unchanged identified inputs produce a different result:

`STORE_CALCULATION_DIVERGENCE`

The System candidate at the exact tested SHA above enforces this reconciliation boundary.

The static Review surface does not run a second pricing engine. It presents only the Store-issued result tied to the tested Store/System authority. Any edited Review definition fails closed until a fresh Store answer exists.

For an unchanged Job 1 definition, every Store-submit press still creates a new request identity and checks current Store authority. In this static Review build, current Store authority is revalidated against the Store repository head. If that authority no longer matches the Store-issued reference, the handoff stops with `STORE_AUTHORITY_CHANGED`; the browser does not calculate a replacement Q. A Store runtime/service may replace this static authority probe later, but it must preserve the same invariant: **new request → fresh Store evaluation → fresh receipt**.

## 7. Navigation integrity invariant

Navigation is part of the job contract.

While a job is active:

1. the top journey bar must retain that job identity;
2. each visible stage button must point directly to a target owned by that job;
3. a button may not merely be relabeled while retaining another project's target;
4. stage navigation must never select another project implicitly;
5. the only cross-project navigation is an explicit exit such as **Project Library**;
6. returning from Store or Yard must return to the same identified job/version;
7. confirmation must land on that job's Store-review surface;
8. viewing, scrolling, or navigation may not manufacture offer, acceptance, payment, allocation, release, readiness, Cycle Start, READY, custody, or closeout;
9. an explicitly invoked simulation may create only labeled simulation receipts, in sequence, and must not promote them into live commerce or physical authority;
10. every project added to acceptance must carry a navigation-regression test proving all visible nav targets stay inside that project's allowed route map or an explicit exit.

For Job 1 the visible journey targets are:

`start-own-live → proof-store → proof-accept → proof-yard → proof-record`

The underlying canonical technical stages remain intact. Job 1 projects the receipt/terms detail into the continuous Yard surface rather than requiring a separate customer stop.

No active Job 1 stage button may target `alcove-capture`, `alcove-config`, `alcove-review`, or another project's page.

## 8. Anti-shortcut rules inherited by every later project

Every later dimensional project must inherit these rules unchanged:

1. **Project defines demand.**
2. **Machine model determines modeled work.**
3. **Store determines capability, refusal, modeled time, economics, and Q.**
4. **Application routes and presents Store answers.**
5. **No second pricing engine.**
6. **No local Store-capability whitelist in project/UI code.**
7. **No project-name pricing shortcut.**
8. **No universal per-cut/per-hole substitute.**
9. **No rejected $35 setup, $100/hour, or 8-minute setup placeholder.**
10. **No material-only subtotal presented as complete Q when machine work exists.**
11. **No unresolved fact silently filled.**
12. **No changed project version borrowing an old Store answer.**
13. **PASS A and PASS B use the same evaluator.**
14. **Calculation identity travels through completion and record.**
15. **Commercial authority and physical authority remain separate from a budgetary Store answer.**
16. **Every Store-submit action creates a new Store evaluation request and receipt.**
17. **A prior Store answer or receipt is history, not authority for a later request.**
18. **Current Store authority changes fail closed and are surfaced before downstream handoff.**

## 9. Migration rule for Job 2 and later

Do **not** copy Job 1 geometry into another project.

Copy the governing pattern:

1. identify the new project's own configuration/version;
2. express its own finished parts and part-relative features;
3. express its own required physical operations;
4. submit that demand to the same Store-owned dimensional contract;
5. let Store resolve material/capability/travel/time/economics/Q;
6. fail closed on missing authority;
7. run confirmation reconciliation through the same evaluator;
8. carry the same calculation identity through Accept/Pay, Yard, Terms, and Record;
9. keep commercial and physical events null unless their own authority exists;
10. add the project to acceptance only after this full path passes.

A project that still uses stale local pricing, incomplete demand, a project-specific Store surrogate, or a different economic mechanism is **not migrated yet**.

Its failure is a useful result. Do not weaken this template to make that project pass.

## 10. Job 1 acceptance boundary

The blocking Review workflow for this branch is intentionally Job-1-only:

- Store authority acceptance;
- Job 1 start-to-finish gate acceptance;
- Job 1 intent/bench preservation.

Alcove, Window Seat, Outdoor, S-001, Picnic, and other projects are not blockers on this branch.

They are expected to remain red or incomplete until they are individually migrated onto this same standard.

## Governing template statement

> **JOB 1 IS THE TEMPLATE, NOT THE EXCEPTION.**
>
> A later project passes only when its own definition travels through the same Store-owned authority chain, same confirmation reconciliation rule, same calculation-identity custody, and same separation of commercial and physical authority.
>
> **Do not make Job 1 weaker to accommodate an older project. Bring the older project up to Job 1.**
