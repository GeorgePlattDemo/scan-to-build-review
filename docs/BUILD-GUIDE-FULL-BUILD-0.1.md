# Scan-to-Build — Full Build Guide Contract 0.1

## Purpose

The right-hand **BUILD GUIDE** is a developer-facing truth rail carried beside the customer experience.

It is not onboarding copy, marketing copy, or a glossary of fashionable technical terms. Its job is to preserve the implementation intent that is easy to lose when a prototype is simplified, rebuilt, or handed to another developer or AI.

Every active page answers the same six questions:

1. **VISUAL** — what must remain visually true, including hierarchy and responsive intent.
2. **BEHAVIOR** — what the user can do and what the UI must do in response.
3. **STATE / DATA** — what the source of truth is and how state survives navigation, refresh, retries, or revision.
4. **AUTHORITY** — what the surface is allowed to establish and what it must never imply.
5. **PROTOTYPE WART** — what is intentionally weak, incomplete, simulated, duplicated, iframe-hosted, or static today, and why.
6. **FULL BUILD GUARDRAIL** — the production requirement that prevents the prototype shortcut from becoming accidental architecture.

The rail deliberately leaves the prototype’s shortcomings visible. A polished demo that hides missing persistence, idempotency, stale-response handling, accessibility, controller boundaries, or commerce plumbing is less useful than an honest one.

## Layout rule

The mature shell already reserves a 172 px right-hand column for the rail.

Restoring the Build Guide must not rewrite, resize, or replace the customer main surface. Existing rails are rewritten in place. Pages that lost the rail receive an `aside.rail` in the already-reserved grid column.

The rail is intentionally dense. Production customer UI does not need to ship these notes unchanged; the production project does need to retain the contracts they describe in code, tests, design-system documentation, ADRs, and operator/developer tooling.

## Global prototype limits

Unless a page says otherwise, the current public build is still a static GitHub Pages demonstration:

- no production authentication/session service;
- no durable multi-user database;
- no live payment processor or seller-of-record settlement;
- no live inventory reservation/custody;
- no commissioned controller or production authorization issuer;
- no complete machine telemetry/cycle evidence;
- iframe seams remain for mature preserved artifacts;
- browser/localStorage state is not durable custody;
- mobile, keyboard, focus, screen-reader and print behavior are not fully hardened;
- observability is limited compared with a production distributed system.

These are not reasons to discard the architecture. They are the work list required to turn the architecture into a production application.

## Production baseline

A full build needs cross-cutting infrastructure that ordinary page mockups rarely show:

- authenticated identity, authorization and tenant/project boundaries;
- durable versioned storage and schema migration;
- append-only event/receipt persistence where the architecture requires chronology;
- idempotency for submit/payment/fulfillment actions;
- request correlation and rejection of stale/out-of-order async responses;
- retries, backoff, cancellation, offline/reconnect behavior and dead-letter handling where appropriate;
- structured errors and reason codes;
- logs, metrics and distributed tracing tied to job/request/receipt identity;
- CSP/security headers, input validation, upload isolation, rate limits and secret management;
- backup/restore, retention/deletion policy and export integrity;
- keyboard/focus behavior, screen-reader semantics, contrast, reduced motion and responsive layouts;
- automated unit, contract, browser, accessibility and visual-regression tests;
- explicit environment/configuration promotion rather than hard-coded production assumptions.

## Important seams preserved by the rail

### Project ↔ Store

Project owns the finished definition. Store owns its material, capability, availability and economics answer.

A browser must not copy Store pricing or stock-selection logic to make the UI feel immediate.

Production concerns include request correlation, timeout/retry behavior, quote expiration, concurrent inventory changes and clear stale-answer UX.

### Store ↔ commerce

A Store answer is not payment.

Production commerce requires seller-of-record authority, offer validity, idempotent acceptance, payment-provider reconciliation, refund/cancel behavior and audit-safe event history.

### Commerce ↔ Yard

Payment is not allocation or production release.

A real Yard needs durable queues, staff-facing work surfaces, material custody, exceptions, substitutions, reruns, staging and READY handling.

### Yard ↔ local cell

The portable definition is not controller code.

A commissioned cell owns local geometry, tooling, offsets, safety/interlock evidence and controller-specific lowering. Network delivery of a job is not remote Cycle Start.

### Machine ↔ operator

The operator remains the local physical authority boundary.

A production build needs explicit load instructions, readiness checks, local Cycle Start, cycle outcomes, fault/recovery semantics and immutable evidence of aborted/rejected/rerun work.

### READY ↔ custody

READY is not handoff.

Custody transfer is its own event and closes the fulfillment transaction only when actually evidenced.

## Current intentional warts worth keeping visible

- **Iframe-hosted mature artifacts.** Kept because rewriting them during recovery caused regressions. Production should converge only under parity tests.
- **Static/browser-held demonstration state.** Useful for a proof; not durable owner custody.
- **One-click simulated commerce.** Keeps customer UX simple while preserving separate receipts; must become real backend orchestration before production.
- **Synchronous downstream Job 1 simulation.** Useful to expose the whole chain; not a production queue or machine service.
- **Candidate machine/control objects.** MachineNeutralOp, LoweringRecord, CellProgramIdentity, CycleRecord and LabelRecord still need formal adoption/implementation.
- **Incomplete project bridges.** Picnic and parts of sheet/secondary-operation coverage stop at explicit bridge gaps instead of fabricating answers.
- **Alcove spotting target mapping gap.** Shelf-elevation intent is not yet fully bound to identified upright components.
- **Modeled Store/cell evidence.** Stage-2 values are modeled until replaced by lab/commissioned evidence under a new explicit version.

## Source

The runtime rail content lives in:

`stb-build-guide-spec.js`

The canonical public shell applies that spec at runtime and modifies only the right-hand `aside.rail` for each page. It does not rewrite customer main content.

The Build Guide should be updated when a production gap is closed. Do not simply delete the wart. Replace it with the evidence, implementation boundary, test, or operational control that made the old warning obsolete.
