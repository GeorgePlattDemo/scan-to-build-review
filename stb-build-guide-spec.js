(function(g){
  'use strict';

  const VERSION='STB-BUILD-GUIDE-0.1';

  function page(goal,visual,behavior,state,authority,wart,fullBuild){
    return Object.freeze({goal,visual,behavior,state,authority,wart,fullBuild});
  }

  const PAGES=Object.freeze({
    landing:page(
      'Make the system legible before asking for input.',
      'Keep the verb stack and three entry doors above the fold on a normal laptop. The Build Guide is secondary; it must never compete with the customer path.',
      'A door sets entry context only. NEW USER, RETURNING USER and PROFESSIONAL may alter orientation and resume behavior, but all must converge on the same governed project core.',
      'Persist entry context separately from project facts. Back/forward navigation must restore the selected door without silently mutating an existing project.',
      'Opening a door grants no verification, Store, payment or fabrication authority.',
      'Static GitHub Pages has no authenticated session, server route or durable resume token. Refresh/back behavior is browser-driven, not an account contract.',
      'Use explicit routes, authenticated session state, keyboard/focus restoration, deep links and responsive door layout. Do not couple visual navigation to authority.'
    ),
    'new-user':page(
      'Orient once, then get out of the way.',
      'One short orientation. Avoid carousel/tutorial chrome that hides the project library or forces repeat reading.',
      'The user should be able to continue, go back, or leave. Completion of orientation is UX state, not project evidence.',
      'Store orientation completion as account preference only; never mix it into definition/version hashes.',
      'Orientation cannot promote an observation, measurement, material identity or capability.',
      'The prototype is copy-heavy because it is carrying architecture in a static demo. A production onboarding flow needs progressive disclosure and telemetry showing where people actually get stuck.',
      'Instrument abandonment, preserve skip/resume, support keyboard and screen-reader order, and keep onboarding copy versioned outside project truth.'
    ),
    returning:page(
      'Resume without pretending outside facts stood still.',
      'Show the saved project first; show changed external facts as a separate refresh/revalidation concern.',
      'Resume, make another, replace a part, or start new. Reuse should fork a new version rather than edit historical output.',
      'Durable project storage must be account-scoped. Existing versions are append-only; new work gets a new version/receipt chain.',
      'A saved Store answer is history. Resume must revalidate volatile Store facts before a new commercial action.',
      'The demo uses named demo accounts and browser storage. That is not authentication, authorization, concurrency control or backup.',
      'Add real identity, tenancy, version conflict handling, device sync, audit logs and stale-answer UX. Treat “resume” as a state restoration problem, not a page link.'
    ),
    saved:page(
      'Make records findable without flattening their history.',
      'Use status, project type and last meaningful event as scanning aids. Do not reduce every record to a generic card.',
      'Open the exact version, fork a new version, or inspect receipts. Sorting/filtering must not change record truth.',
      'Project list is a query over durable owner records; pagination/search are presentation concerns.',
      'Library access is authorization-sensitive. A list item may expose only records the current principal may read.',
      'The prototype has a tiny fixed set of examples, so it does not prove pagination, search indexing, large-history performance or multi-device conflict behavior.',
      'Build server-side pagination/search, stable IDs, permission-aware indexing, empty/error states, and deterministic resume targets.'
    ),
    professional:page(
      'Let a professional bring structured work without granting extra truth.',
      'The professional door should expose job/plan/takeoff intake without changing the visual grammar of the homeowner path.',
      'Import may seed observations and declared facts, but the professional still has to resolve unsupported or ambiguous conditions.',
      'Record source/provenance for every imported assertion. Keep imported facts separate from system-evaluated facts.',
      'Professional status does not bypass gates, Store authority or machine limits.',
      'The demo does not implement organization accounts, role delegation, licensing, client consent or professional file retention policies.',
      'Add org/workspace roles, client/project separation, provenance, explicit delegation, retention controls and review gates before imported work becomes a definition.'
    ),
    projects:page(
      'Make “what can I do?” obvious without turning the library into a sales wall.',
      'Project tiles need stable art, consistent labels and enough contrast to show which paths are live, bounded, experimental or deferred.',
      'Selecting a project establishes project identity before route handlers run. Library exit must clear the prior active project so one project cannot inherit another project’s route/state.',
      'Each tile maps to a project class and its own definition contract. Shared navigation is a projection, not shared project truth.',
      'Project selection may choose a workflow; it may not create Store, commercial or machine authority.',
      'This proof ladder still mixes mature projects, donor artifacts and quarantined legacy routes. The current shell intercepts several old targets to keep the visible path clean.',
      'Replace route interception with one router/registry, explicit project manifests, feature flags for unfinished classes, lazy loading, and tests proving no cross-project state leak.'
    ),
    'start-own':page(
      'Legacy donor only; do not build the production route from this surface.',
      'Preserve only as provenance while the live Start Your Own shell remains the canonical visible route.',
      'No new customer flow should land here.',
      'Treat any retained values as donor/reference state only.',
      'No authority.',
      'This page remains in the base file because wholesale deletion created regressions during recovery. It is intentionally not the live route.',
      'Remove only after a dependency audit proves no tests, links or recovery paths still depend on it. Migration should be explicit, not a cleanup guess.'
    ),
    intake:page(
      'Accept “bring what you have” without hallucinating a complete job.',
      'File/image/plan intake must show what was received, what was parsed, and what remains unresolved.',
      'Upload is asynchronous. Users need progress, retry, cancel and a way to correct extracted facts before they become a definition.',
      'Store original artifact, content hash, parser/version, extracted assertions and human corrections separately.',
      'Imported text or geometry is evidence, not authority. Unsupported content must stop at a named gap.',
      'The current demo does not implement a hostile-file pipeline, malware scanning, large-file limits, OCR/CAD parser isolation, retention policy or privacy controls.',
      'Use signed uploads, MIME/content validation, sandboxed parsing, quotas, malware scanning, provenance, redaction/PII policy, resumable transfer and explicit parser confidence.'
    ),
    'alcove-capture':page(
      'Separate room context from dimensions that actually control parts.',
      'Keep the room drawing to scale and visually distinguish scan/context, controlling dimensions and observed irregularities.',
      'Users can provide scan context or typed measurements; controlling measurements need explicit confirmation before configuration.',
      'Every measurement needs value, unit, method/source and status. Re-measurements append or supersede by rule; they do not silently overwrite history.',
      'A scan may inform context; it must not silently become cut authority.',
      'The illustration is hand-authored and the static demo does not perform AR calibration, device capability checks, measurement uncertainty or scan quality scoring.',
      'Build a capture adapter layer, unit normalization, uncertainty/tolerance model, device metadata, conflict handling and accessible visual alternatives to the scaled drawing.'
    ),
    'alcove-config':page(
      'Let the customer change the project and see consequences without copying Store logic into the browser.',
      'Controls, derived geometry and Store answer must stay visually linked. Changed values need an obvious dirty/re-evaluating state.',
      'Every relevant change creates a new candidate definition and triggers a fresh Store evaluation. Out-of-order responses must never overwrite a newer candidate.',
      'Definition state and Store answer state are separate. Cache by exact version/request identity; never by loose project name.',
      'The UI may derive project geometry. Store owns parent stock, SKU, capability and economics.',
      'Alcove still carries legacy donor code and one known spotting-definition gap: shelf-elevation intent is not fully bound to identified physical upright components. Static single-file layout also hides request-cancellation/race behavior.',
      'Use a typed definition model, debounced/cancellable evaluation, request correlation, stale-response rejection, explicit unresolved feature mapping and one Store adapter. Do not duplicate Store pricing or stock selection client-side.'
    ),
    'alcove-review':page(
      'Freeze exactly what the customer is confirming.',
      'Present controlling geometry, material preference, unresolved conditions and revision identity in a reviewable hierarchy.',
      'Confirm creates an immutable candidate version. Editing after confirmation forks a new version and requires a fresh Store answer.',
      'Hash/version must cover the authoritative definition, not UI-only formatting.',
      'Review confirmation is not an order, payment, allocation or production release.',
      'The current demo presents enough facts for evaluation but is not a production diff viewer; changes between revisions are not yet shown as a first-class visual comparison.',
      'Add semantic version diff, explicit changed-field review, confirmation timestamp/principal, undo-by-new-version, and accessibility for dense technical summaries.'
    ),
    'window-intake':page(
      'Legacy Window Seat intake reference; current visible implementation lives in the Window Seat artifact.',
      'Do not restyle this donor and call it the live flow.',
      'No new route should depend on it unless intentionally reactivated.',
      'Reference-only.',
      'No authority.',
      'Retained during recovery because the base file still supplies shared copy/tests.',
      'Delete only after the live Window Seat package owns all required copy, routes and regression coverage.'
    ),
    'window-space':page(
      'Legacy Window Seat reference stage.',
      'Retain visual provenance only.',
      'Not the canonical live interaction.',
      'Reference-only.',
      'No authority.',
      'The active Window Seat journey is isolated in a separate artifact to preserve its mature behavior.',
      'Converge on a shared component/state system only after parity tests prove the live artifact is preserved.'
    ),
    'window-span':page(
      'Legacy Window Seat reference stage.',
      'Keep only as donor evidence.',
      'Not the active route.',
      'Reference-only.',
      'No authority.',
      'Split legacy/live surfaces are a maintenance burden but currently safer than rewriting the mature Window Seat.',
      'Plan a measured migration with screenshot, behavior and receipt parity tests.'
    ),
    'window-resolve':page(
      'Legacy Window Seat reference stage.',
      'Do not interpret this as the current resolution engine.',
      'Not the active route.',
      'Reference-only.',
      'No authority.',
      'Historical page remains to avoid accidental loss of technical copy.',
      'Move surviving content into the canonical Window Seat package before removal.'
    ),
    'window-parts':page(
      'Legacy Window Seat parts reference.',
      'Preserve as technical donor only.',
      'Not the active route.',
      'Reference-only.',
      'No authority.',
      'The proof ladder previously mixed this page with live Window Seat routing.',
      'Production should have one project manifest and one active parts renderer per project version.'
    ),
    'window-review':page(
      'Legacy Window Seat review reference.',
      'No new UX work should land here.',
      'Not the active route.',
      'Reference-only.',
      'No authority.',
      'Retained to avoid destructive cleanup during the stabilization phase.',
      'Retire only with an explicit dependency report.'
    ),
    'picnic-chooser':page(
      'Legacy donor for Outdoor Build selection.',
      'Current Outdoor Build uses the live bounded-source artifact.',
      'Visible routing is intercepted to the live artifact.',
      'Donor-only.',
      'No authority.',
      'The old page still exists because it previously supplied project copy and route anchors.',
      'Replace the interception with a project registry when the donor can be safely retired.'
    ),
    'picnic-config':page(
      'Legacy Outdoor/Picnic configuration donor.',
      'Do not present this as current Store-connected behavior.',
      'Quarantined by the live Outdoor route.',
      'Donor-only.',
      'No authority.',
      'Old configuration semantics remain in the file but are not the canonical customer path.',
      'Retire after source-backed Outdoor configuration owns equivalent coverage.'
    ),
    'picnic-review':page(
      'Preserve the bounded-source review and its explicit bridge gap.',
      'Show holder choices separately from structural/machine authority.',
      'Confirmation freezes the user-selected version; it does not invent a Store request.',
      'Keep source-backed facts and unresolved Store-bridge state together.',
      'No Store answer exists until a complete demand packet exists.',
      'This project class still lacks a complete project-to-Store demand packet; the UI can preserve choices but cannot honestly price or route fabrication.',
      'Implement the class-specific demand compiler/adapter, fixture tests and refusal semantics before enabling Yard submission.'
    ),
    store:page(
      'For Alcove, expose Store doctrine and the exact answering basis without turning the page into a black box.',
      'Keep material, capability, economics and process doctrine readable in layers: customer answer first, full basis available below.',
      'Store answer is fetched/evaluated against the identified definition. Changed project facts invalidate the old answer.',
      'Carry Store pin, catalog clock, request identity, calculation identity and unresolved conditions with the answer.',
      'Store owns its material/capability/economics answer; this page cannot turn a budgetary estimate into commerce.',
      'The current proof uses a modeled Store and static app shell. Real availability, quote validity, seller-of-record terms and concurrent inventory changes are not implemented here.',
      'Add real Store API contracts, quote TTL/revalidation, inventory concurrency policy, structured error taxonomy, signed receipts and observability around every external call.'
    ),
    request:page(
      'Keep service choices separate from the frozen Alcove geometry.',
      'Service toggles should read like fulfillment scope, not redesign controls.',
      'Changing service scope creates a revised request/offer basis without silently altering project geometry.',
      'Persist each answer, including explicit noes, so downstream fulfillment knows what was declined as well as selected.',
      'Request is not order; unavailable work must remain visible and reasoned.',
      'Static controls do not yet model seller-specific service catalogs, availability windows, quote expiration or cross-device edits.',
      'Use capability-backed service schemas, explicit option states, optimistic UI only where reversible, and server-side validation at submit.'
    ),
    yard:page(
      'Alcove Yard response should return facts and questions, never silently rewrite the customer definition.',
      'Highlight adjustments and unresolved conditions before timing or commercial next steps.',
      'The Yard may accept, decline or ask; the user resolves only the decisions that actually belong to them.',
      'Response must bind to request/version and preserve reason codes.',
      'No silent substitution. Material identity changes only by explicit acceptance.',
      'The prototype response is modeled and synchronous; it does not exercise concurrent allocation, backorder, substitution approval queues or staff-side workflow.',
      'Implement staff/Store work queues, reason-coded adjustments, explicit substitute proposals, expiry/revalidation and audit-safe customer acceptance.'
    ),
    terms:page(
      'Keep acceptance, settlement, allocation, release and machine readiness separate even when the UI summarizes them.',
      'Use a timeline/status view; do not make later events look complete because they appear on the page.',
      'Each event requires its own trigger/evidence. Scrolling is inert.',
      'Append immutable event records with actor, time, source and preceding identity.',
      'Commercial events cannot grant machine authority; machine readiness remains local.',
      'The current page is a reference sequence, not live commerce. There is no payment processor, refund path, chargeback handling, tax/shipping engine or seller settlement.',
      'Integrate commerce behind idempotency keys, webhook reconciliation, failure/retry states, explicit refund/cancel policy and event-level audit.'
    ),
    recap:page(
      'Summarize without manufacturing missing events.',
      'Use compact chronology plus unresolved conditions. Keep links to detailed receipts.',
      'Recap reads state; it should not create state.',
      'Generate from the append-only record rather than hand-maintained flags.',
      'Missing remains missing.',
      'The demo can summarize a short scripted journey; it does not prove long-running order timelines or partial fulfillment.',
      'Build recap as a projection of canonical events, with pagination/grouping for long histories and clear partial/exception states.'
    ),
    record:page(
      'Close Alcove with a record that distinguishes definition, Store answer, fulfillment and custody.',
      'Make final state printable/exportable without hiding unresolved or simulated fields.',
      'Record is read-mostly. Corrections append a new event/version rather than mutate history.',
      'Owner record should keep durable identifiers, receipts, provenance and custody.',
      'A final page does not prove physical completion unless corresponding evidence exists.',
      'The prototype has no durable owner vault, export signature, retention policy or independent verification of physical outcomes.',
      'Add durable storage, export formats, tamper-evident signing, retention/deletion controls, attachment integrity and role-based read access.'
    ),
    'start-own-live':page(
      'Run the live Job 1 interaction while preserving the mature donor artifact.',
      'The customer surface stays inside the existing iframe; the outer Build Guide fills the rail that was already reserved so the main layout is not squeezed.',
      'Intent → bench → live Store submission. Parent page owns project routing and Store handoff; child owns its bounded interaction.',
      'Cross-frame messages need explicit schema/version and correlation. Parent remains source of journey context; child definition remains project truth.',
      'The child cannot promote Store or physical authority through postMessage.',
      'This is an iframe bridge. That preserved a working artifact during recovery, but it creates two DOMs, two focus contexts, duplicate history concerns and a postMessage seam. Browser localStorage is also carrying demo state.',
      'Production should converge on one routed component tree or a deliberately versioned micro-frontend contract; add typed message schemas, origin checks, focus restoration, deep links, durable backend state, reload recovery and cross-frame a11y tests.'
    ),
    'outdoor-build-live':page(
      'Preserve source-backed Outdoor behavior while keeping its authority separate from Job 1.',
      'Live artifact stays visually self-contained; outer rail documents integration debt without changing the project surface.',
      'Source-backed choices produce that project’s own definition and Store handoff. No Job 1 geometry may leak in.',
      'Retain source citation/provenance with the project definition.',
      'Source-backed geometry is not Store capability and is not structural certification.',
      'Also iframe-hosted. The project is bounded, but its broader Store bridge remains less mature than Job 1 and should fail closed rather than borrow answers.',
      'Use the same typed project manifest, Store adapter contract, receipt correlation, focus/history handling and source-provenance model as other projects.'
    ),
    'window-seat-live':page(
      'Keep the Window Seat as the expanded audit/reference presentation of the same canonical journey.',
      'Guided and continuous modes must render the same underlying facts. Continuous mode is for inspection, not a second data model.',
      'Stage switching changes visibility only. Evaluation and receipts come from the shared journey snapshot.',
      'One canonical snapshot feeds guided sections and the continuous document.',
      'Changing view mode cannot promote a gate.',
      'The mature artifact is still iframe-hosted and maintains its own internal rendering stack. That reduces regression risk now but complicates routing, focus, print/export, analytics and shared design-system work.',
      'Preserve parity while extracting shared journey components, typed snapshot contracts, print/export CSS, keyboard stage navigation and automated visual regression.'
    ),
    'proof-store':page(
      'Show the exact Store answer for Job 1 before any commercial action.',
      'Surface job/version, full Store SHA, input/result hashes, material resolution, machine service, Q and modeled time without truncating audit identity.',
      'Back changes the definition. Continue carries the same identified answer to Accept / Pay.',
      'Store response must be fresh for the submitted request and correlated to the current definition. Stale async responses lose.',
      'Budgetary Store answer is not seller-of-record offer, payment, allocation or production authority.',
      'The live bridge is real to the model but still talks to a modeled Store runtime. Network loss, timeout, duplicate requests and out-of-order responses need stronger visible recovery UX.',
      'Use request cancellation/correlation, idempotent evaluation endpoints, retry/backoff, explicit stale/offline state, signed Store receipts and observability keyed by request/definition identity.'
    ),
    'proof-accept':page(
      'Reduce the customer decision to two actions without collapsing the underlying commercial record.',
      'Left returns to definition. Right is the only forward action and states the whole customer intent: accept quote, pay, send to Yard.',
      'One click writes distinct simulated offer, acceptance and payment receipts in order, then launches the downstream Yard simulation.',
      'The action must be idempotent. Double-click, refresh, retry or network replay may not create duplicate acceptance/payment.',
      'No money moves here; no stock is reserved and no physical authority is created.',
      'This is the largest commercial shortcut in Job 1: one browser function currently synthesizes three labeled simulated events. There is no PSP, webhook reconciliation, tax, fraud, refund, cancellation or seller settlement.',
      'Split UI intent from backend orchestration. Use idempotency keys, server-side order state, payment-provider webhooks, timeout/retry handling, cancellation/refund policy and explicit offer expiry.'
    ),
    'proof-yard':page(
      'Expose the entire paid-job execution chain without making the customer operate internal Yard events.',
      'Use one long scroll with numbered blocks, full audit identifiers, fulfillment register, receipt ledger and one bottom-right handoff action. Dense evidence is intentional; keep hierarchy and wrapping readable.',
      'Accept/Pay explicitly starts the labeled simulation. Viewing/scrolling is inert. Internal receipts are generated in sequence; the only Yard action records custody and opens the final record.',
      'Treat fulfillment as an append-only event chain keyed to the same definition/Store result. READY remains distinct from custody. Failed/rerun events must survive later success.',
      'The page may explain machine-neutral work and local lowering, but current physical production authorization is not issuable. Local Cycle Start belongs to the operator at a commissioned cell.',
      'The browser currently creates the whole downstream simulation synchronously. MachineNeutralOp, LoweringRecord, CellProgramIdentity, CycleRecord and real LabelRecord are still candidate/planned objects; there is no queue service, staff console, machine telemetry, physical inventory, controller postprocessor or live interlock evidence.',
      'Move fulfillment to an event-driven backend: durable queue, worker/staff events, idempotent transitions, retry/dead-letter handling, machine-neutral schema, commissioned-cell registry, signed lowering/program identities, telemetry/cycle receipts, exception/rerun flows, real material reconciliation, and a fulfillment-option schema. Preserve the visible “warts” until each layer is actually replaced by evidence.'
    ),
    'proof-terms':page(
      'Retained receipt-detail surface; Job 1 no longer requires the customer to stop here.',
      'Keep available for audit/debug access without putting another Next button into the customer journey.',
      'Read receipt state only.',
      'Same simulation ledger as Yard/Record.',
      'No authority.',
      'This page remains for compatibility and tests after receipt detail moved into the continuous Yard scroll.',
      'Either expose it as an inspector route or retire it after all deep links/tests migrate; do not reinsert it as a mandatory customer step.'
    ),
    'proof-record':page(
      'Close Job 1 only after custody.',
      'Compact final owner record: exact job/version, Store identities, READY, custody and complete receipt ledger.',
      'Yard handoff creates custody, then this page reads the closed record. No extra close button.',
      'Final status is a projection of the event chain; it must be reproducible from durable receipts.',
      'No physical part is claimed in this simulation.',
      'Current closure lives in browser memory/localStorage and therefore is not durable, multi-device, independently timestamped or tamper-evident.',
      'Persist owner records server-side, sign/export receipts, support attachment hashes and retention controls, and make reconstruction from canonical events a tested invariant.'
    ),
    'playhouse-s001':page(
      'Define the sheet project before asking what a machine can do.',
      'Show the opening/arch geometry and retained extra operations as project facts.',
      'Edits recalculate project geometry but do not borrow dimensional-cell behavior.',
      'Keep sheet definition and operation requests versioned.',
      'Project geometry is not Store supportability.',
      'The sheet path is intentionally narrower and still carries unresolved operation paths.',
      'Formalize the sheet definition schema, operation identities, tolerance model and Store request adapter before broadening controls.'
    ),
    'playhouse-machine':page(
      'Make machine-facing sheet facts inspectable without emitting controller code.',
      'Diagram current routed field, path classes and separate straight-cut demand clearly.',
      'This screen derives a bounded operation definition from the project, then asks Store.',
      'Machine-facing definition must remain deterministic from the project version.',
      'No controller syntax, live toolpath or motion command belongs here.',
      'The current diagram and geometry formulas are in browser code and are not yet a production CAM/postprocessor boundary.',
      'Move geometry kernels into tested pure modules, version operation schemas, add numeric tolerance tests and keep controller-specific generation at the commissioned machine site.'
    ),
    'playhouse-store':page(
      'Let Store answer supported sheet work while leaving other requested work unresolved.',
      'Use split cards for supported versus separate/unresolved operations.',
      'Store can return a mixed answer; partial support must not erase the rest of the request.',
      'Preserve per-operation disposition and material/economics basis.',
      'A supported routed opening does not authorize unrelated cuts or a commercial order.',
      'Material-only/reference economics and capability coverage are incomplete for the full mixed job.',
      'Adopt line-level capability/economics contracts, partial-offer semantics and explicit routing for work outside the local cell.'
    ),
    'playhouse-review':page(
      'Freeze the sheet definition and show exactly what Store did and did not answer.',
      'Supported and unresolved work need equal visual prominence.',
      'Confirming review cannot drop unresolved operations.',
      'Version must include every requested operation, including deferred ones.',
      'No silent scope reduction.',
      'The demo can display unresolved work but does not yet support a rich diff or negotiated partial acceptance.',
      'Add line-level accept/defer/decline choices with new versioning and a clear rule for whether partial fulfillment creates one or multiple orders.'
    ),
    'playhouse-request':page(
      'Carry the exact mixed request forward.',
      'Make unresolved center-route/straight-cut work visible beside supported work.',
      'Submission should transmit all lines, not only the green ones.',
      'Request identity binds to the full definition.',
      'Request is not order.',
      'Full commercial offer is not established for the mixed job.',
      'Implement complete line-item Store request/response contracts before enabling commerce.'
    ),
    'playhouse-yard':page(
      'Return a mixed Yard answer without pretending the whole project is supported.',
      'Keep supported route, material reference and unresolved operation path separate.',
      'User can continue with an honest partial/reference response; no hidden fallback.',
      'Reason codes belong to each unresolved line.',
      'No seller-of-record offer exists yet.',
      'No staff work queue or alternate-operation routing exists behind this screen.',
      'Add Store workflow, alternate provider/secondary-station routing and explicit partial-offer construction.'
    ),
    'playhouse-terms':page(
      'Keep later events null when commerce has not happened.',
      'Explicit NOT ESTABLISHED labels are a feature, not an embarrassment.',
      'Nothing on this page advances state.',
      'Null event fields remain absent in the record.',
      'No offer/payment/allocation/release/readiness.',
      'This is a reference chronology only.',
      'When commerce is added, populate events from real services rather than swapping labels to “complete.”'
    ),
    'playhouse-result':page(
      'Recap what the sheet proof established and what stayed unresolved.',
      'Make the boundary between successful geometry proof and incomplete fulfillment obvious.',
      'Read-only recap.',
      'Derived from definition + Store dispositions.',
      'No promotion.',
      'The proof does not yet reconcile real sheet yield, toolpath execution or physical output.',
      'Add real nesting/yield evidence, controller-site execution receipts and inspection records before claiming physical completion.'
    ),
    'playhouse-record':page(
      'Preserve a useful owner record even when later events are absent.',
      'Show definition, Store evidence, unresolved lines and physical status together.',
      'Read-only projection.',
      'Keep missing events missing.',
      'No physical completion claim.',
      'Static record has no durable owner vault or attachment lifecycle.',
      'Use the same signed durable record service as other projects.'
    ),
    'picnic-store':page(
      'Stop at the real bridge gap instead of inventing a Store answer.',
      'Show valid user choices and missing Store-request state together.',
      'No submit until a complete demand packet exists.',
      'Retain project choices despite deferred Store request.',
      'No SKU, price, capability or refusal may be invented.',
      'The class lacks stable part/material demand publication.',
      'Implement and test the project-to-Store bridge before enabling the next button.'
    ),
    'picnic-request':page(
      'Make deferment explicit without discarding the project.',
      'Disabled Yard action must explain why.',
      'Back preserves all valid choices.',
      'Deferred request is a state, not an error that clears data.',
      'No request means no later commercial events.',
      'Current stop is deliberate technical debt.',
      'Close the bridge gap with stable geometry/material demand and regression fixtures.'
    ),
    'picnic-yard':page(
      'Represent an unreachable stage honestly.',
      'Simple “not reached” state is enough.',
      'No action.',
      'No Yard event exists.',
      'No response may be inferred.',
      'Kept because the canonical stage model is broader than this project’s current implementation.',
      'Remove the placeholder only when a real request path exists.'
    ),
    'picnic-terms':page(
      'Keep downstream commerce null.',
      'No completion styling.',
      'No action.',
      'No commercial events.',
      'No authority.',
      'Placeholder stage.',
      'Populate only from real events.'
    ),
    'picnic-recap':page(
      'Summarize the project stopping point.',
      'Show retained choices and bridge gap.',
      'Read only.',
      'Project record survives.',
      'No backfilled events.',
      'No completed fulfillment.',
      'Generate from canonical state once bridge exists.'
    ),
    'picnic-record':page(
      'Keep a project record even when Store submission never formed.',
      'Show what is known and what never happened.',
      'Read only.',
      'Retain exact customer choices and gap ownership.',
      'No commercial or physical completion.',
      'Static record only.',
      'Move to durable owner record service.'
    ),
    'alcove-store-order-surface':page(
      'Internal Alcove Store surface: preserve the exact request/answer seam.',
      'This helper surface should remain visually subordinate to the customer journey.',
      'Render Store-owned facts only.',
      'Bind to request/version identity.',
      'No customer geometry rewrite.',
      'Injected recovery surface exists because Alcove Store behavior was repaired without rebuilding the mature pages.',
      'Fold into a typed shared Store component only after parity tests.'
    ),
    'alcove-store-service-choices':page(
      'Internal Alcove fulfillment choices.',
      'Keep option states explicit.',
      'Selected/no/unavailable are different values.',
      'Service scope belongs to request/offer state.',
      'No hidden defaults.',
      'Recovery surface, not final component architecture.',
      'Move to schema-driven service controls with Store-backed availability.'
    ),
    'alcove-store-yard-answer':page(
      'Internal Alcove Yard answer surface.',
      'Reasoned adjustments must be readable.',
      'No silent substitution.',
      'Bind response to request.',
      'Store/Yard owns response facts only.',
      'Injected recovery surface.',
      'Replace with shared response component after parity.'
    ),
    'alcove-store-commercial-sequence':page(
      'Internal Alcove commercial chronology.',
      'Keep event separation visible.',
      'No scroll-driven state.',
      'Append-only event model.',
      'No machine authority.',
      'Reference-only chronology.',
      'Populate from real commerce/fulfillment services later.'
    ),
    'alcove-store-returned-offer':page(
      'Internal Alcove offer detail.',
      'Show basis, validity and unresolved conditions.',
      'Offer must expire/revalidate.',
      'Bind to exact definition and Store state.',
      'Offer is not payment or allocation.',
      'No seller-of-record backend in this demo.',
      'Add quote TTL, signatures, idempotent accept and settlement integration.'
    )
  });

  const GLOBAL=Object.freeze({
    visual:'The rail is developer-facing and intentionally narrow. Customer content keeps the existing layout; the rail may be dense and visibly unfinished.',
    wart:'Global prototype limits still apply unless a page says otherwise: static GitHub Pages, no production auth/session service, no durable database, no live payment, no live inventory custody, no commissioned controller, incomplete mobile/a11y hardening, and limited observability.',
    fullBuild:'Production work must add security headers/CSP, authenticated authorization, durable persistence, schema migration, structured logging/tracing, rate limits, offline/retry behavior, accessibility, responsive layouts, automated visual/contract tests, backup/recovery and explicit data retention.'
  });

  function esc(value){
    return String(value ?? '').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  }

  function renderRow(label,text,extraClass){
    return '<div class="row guide-row '+(extraClass||'')+'"><b>'+esc(label)+'</b><span>'+esc(text)+'</span></div>';
  }

  function render(pageId){
    const p=PAGES[pageId] || page(
      'Preserve this surface until its role is either implemented or explicitly retired.',
      'Do not change the customer layout merely to make the developer notes fit.',
      'Treat any interaction as prototype behavior until a page-specific contract exists.',
      'Keep project and event identities explicit.',
      'Do not infer authority.',
      'No page-specific Build Guide entry existed when this rail was generated.',
      'Add a page contract before promoting this surface.'
    );
    return [
      '<p class="hd">BUILD GUIDE · FULL BUILD</p>',
      '<p class="goal">'+esc(p.goal)+'</p>',
      renderRow('VISUAL',p.visual),
      renderRow('BEHAVIOR',p.behavior),
      renderRow('STATE / DATA',p.state),
      renderRow('AUTHORITY',p.authority),
      renderRow('PROTOTYPE WART',p.wart,'guide-wart'),
      renderRow('FULL BUILD GUARDRAIL',p.fullBuild,'guide-guardrail'),
      '<div class="guide-global"><b>GLOBAL WARTS</b><span>'+esc(GLOBAL.wart)+'</span></div>',
      '<div class="guide-global"><b>PRODUCTION BASELINE</b><span>'+esc(GLOBAL.fullBuild)+'</span></div>',
      '<div class="guide-meta"><span>'+esc(pageId)+'</span><span>'+VERSION+'</span></div>'
    ].join('');
  }

  g.STBBuildGuideSpec=Object.freeze({
    version:VERSION,
    pages:PAGES,
    pageIds:Object.freeze(Object.keys(PAGES)),
    global:GLOBAL,
    render
  });
})(window);
