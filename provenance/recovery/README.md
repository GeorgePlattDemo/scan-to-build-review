# Human-path recovery — 2026-09-15

Preservation baseline: `5eb125199d8f48c3d29dcedb7ecb18bdc1c3a4a0`.
Remote preservation branch: `preserve/before-human-path-recovery-2026-09-15`.

The System README already points to `system-build-current.html`. Keep this address stable.
`system-build.html` supplies the full front door, project branches, intake, scan/capture,
configuration and detailed review. Its content is preserved as source, not rewritten from memory.
`system-build-current.html` supplies the newer Store-to-custody explanation, transaction
screens and complete closing text. These are reference screens, not the separate system runtime.

Required Alcove progression:
Landing → New user → Projects → Alcove capture → Configure → Store explanation →
Detailed review → Request → Yard → Terms → Recap → Record.

Other preserved paths:
- Landing → Returning user → Saved projects, or Projects.
- Landing → Professional → Intake.
- Projects → Start your own → Intake → explicit Alcove example.
- Projects → Window intake → Space → Span → Qualified resolution → Parts → Review.
- Projects → Picnic chooser → Configure → Review.

The original capture buttons currently navigate to the example configurator; source
presence does not prove scan upload, measurement extraction, or live services. Recovery
must retain the page without claiming those capabilities. The saved-project source page
is an empty-state explanation; it must not jump silently into Alcove.

Before promotion, verify original text and SVG preservation, all routes, the three landing
doors, configuration changes and downstream summaries, and no browser errors. Keep
all unresolved, reference and machine-authority boundaries. Do not abbreviate pages.

The inventory records every source page's text, controls, SVG count and exact section hash.
Future changes must explain any removal or route change against this baseline.

## Recovery mapping

- All 20 original page IDs remain. Eighteen original sections remain byte-identical.
- `alcove-config` retains its content and controls; its forward route now visits `store`
  before `alcove-review`.
- `alcove-review` retains all original detailed content. The newer review's Store basis
  is included there; it is not substituted for the detailed version, measurements or
  unresolved conditions. Its existing confirmation continues to the request page.
- `store`, `request`, `yard`, `terms`, `recap`, and `record` retain the later complete text.
- Later transaction styles are scoped to those surfaces so they cannot restyle intake,
  capture, configuration, window-seat or picnic-table pages.
- The single router handles Back and forward navigation. Old `#define`, `#review` and
  `#next` links resolve to their retained counterparts.
- The existing reference configurator updates the Store and request summary. No live
  Store connection, upload engine, commercial transaction or production execution is added.

A temporary `preview/full-human-path-recovery.html` is used only for rendered verification.
It is not a new source baseline or README destination and will be removed at promotion.

Run `python tests/recovery/check-preservation.py` from this repository before accepting
further edits. This checks actual content, not line-count statistics.
