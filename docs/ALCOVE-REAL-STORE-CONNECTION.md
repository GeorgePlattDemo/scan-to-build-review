# Alcove real Store connection — continuation contract

## Purpose and preservation

Store Zero is a simulation test surface for the declared bounded manufacturing cell. The user edits Alcove's existing controls to test job scopes. Preserve its imagery, Scan content, controls, dimensions, navigation, and downstream pages. Do not relax Store limits to make a job pass, remove requested operations, insert browser economics, or replace Store with stored answers.

## Actual path

Existing `buildAlcoveStoreDefinition` in `system-build-base-8d8a9dd.html` → `stb-alcove-store-bridge.js` → endpoint in `stb-store-runtime.json` → System `POST /api/store-zero/job` → existing `createStoreAdapter()` / `ALCOVE_INSERT_V1` handler → pinned Store evaluator → existing Alcove display.

The bridge reads deployment configuration without cache. Missing deployment is `STORE_RUNTIME_NOT_DEPLOYED`. Public pages cannot use a loopback endpoint. HTTP is allowed only for a local page calling a loopback server. Responses must match project, revision, request, payload, and Store pin. Requests time out after 20 seconds. No fallback evaluation exists.

## Frozen starting sources

- Review: 8c979d468c34d71df24f37c35b3a608e9d21ecb1
- System starting point: 0abedaecb42d5540a767e76de85ca53b9df2c3e8
- Store starting point: 0224e99f96dc65759bd7d3761d99e0708ad23e4a

## Verified demand-driven candidate pins

- System: 22bb9738436fa089935a45b8d75450f54b5134c2
- Store: 39a1b318063f62220c9c20c42200389098e0c687

These candidates pass the real pinned cross-repository Alcove integration. The Review bridge expects the exact Store pin above.

## Current status: NOT YET VISIBLE / DEPLOYMENT REQUIRED

The configuration intentionally contains `jobEndpoint: null`: no verified public runtime URL is available. Railway was discovered but was not connected. This branch must not be described as a working public connection or promoted as complete.

## Exact next deployment steps

1. Connect the hosting account. Deploy the existing System source above with repository-root Dockerfile `Dockerfile.store-zero`. Do not create a second evaluator. The startup command fetches and verifies the pinned Store checkout. Allow its outbound GitHub fetch.
2. Obtain the service HTTPS origin. Check `/healthz` and browser preflight from `https://georgeplattdemo.github.io`; health alone is insufficient.
3. Set `stb-store-runtime.json` `jobEndpoint` to that verified origin plus `/api/store-zero/job`. Never put credentials in this file.
4. Run the real-runtime test below and the actual public-browser journey. Preserve the exact source revisions tested.
5. In the existing Alcove, vary species, depth, width, shelf count, and spot demand. Inspect real POST requests and their returned calculation identity, operations, material, time, and Q. Verify the display follows the current response and old requests do not overwrite new scope. Check Store outage and refused demand remain visible and cannot become a complete answer.
6. Check confirmation and downstream records separately; this bridge change does not establish their full reconciliation. Do not claim those gates verified from this test.
7. Promote only the tested Review commit and repin System's README button; inspect the public route again. Record the actual deployed URL and verification evidence here.

## Reproducible integration check

Use clean checkouts of the exact System and Store sources above:

```
STB_SYSTEM_ROOT=/absolute/path/to/system STB_STORE_ZERO_ROOT=/absolute/path/to/store node --test tests/alcove-real-runtime.test.mjs
```

This test executes the existing page's definition-building functions and the actual bridge against the real hosted System HTTP server and pinned Store. It does not substitute a Store evaluator. Node supplies the browser Origin header; this is an HTTP integration test, not evidence of browser CORS or public deployment.

Checked scope: 65 in high, 44 in wide, 14 in deep, five shelves, spots off. Store returned pine material 272.86 + hardware 18 + machine service 132.43 = modeled Q 423.29. Poplar returned 568.79. Changing pine depth to 11 in returned 254.15. These are observed model outputs, not independent validation of the machine timing model, and are not fixture prices to embed in the application.

The test also checks repeat evaluation identity, species/depth changes, arithmetic, response-revision fault rejection, missing deployment, and rejection of public-to-localhost wiring.

## Known limits to preserve honestly

Spotting enabled currently prevents Alcove's complete dimensional batch evaluation. Inspect the returned demand and declared cell capability before addressing that specific operation. Do not silently turn spots off or alter limits. Existing parent-board demand and component planning are unchanged by this connection patch; no claim of general stock-planning correctness is made.

Future projects should reuse the real service and manufacturing rules. Translating project geometry into demand is allowed; supplying project-specific prices or capabilities is not. A green local test is not public completion.

## Regression evidence

Actor-handoff, exact-entry, and restore/correct checks passed. `alcove-commercial-journey.test.mjs` fails on its expected Window Seat `0.7.4?v=96c85fee` cache pin. Both that test and the HTML it reads are unchanged from the starting commit. No test expectation was edited. No full-suite green or public-browser pass is claimed.
