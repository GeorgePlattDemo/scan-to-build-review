import fs from 'node:fs';
import assert from 'node:assert/strict';

const alcove=fs.readFileSync('system-build-base-8d8a9dd.html','utf8');
const seat=fs.readFileSync('stb-window-seat-space-utilization-0.7.4.html','utf8');

// Alcove: one bounded option, off by default, derived from existing shelf elevations.
assert.match(alcove,/pilotShelves:false/);
assert.match(alcove,/id="c-pilot-shelves"/);
assert.match(alcove,/3\/16 in pilot spots at shelf elevations/);
assert.match(alcove,/window\.STBAlcoveShelfPilotDemand/);
assert.match(alcove,/kind:'SPOT_ON_LOCATION'/);
assert.match(alcove,/targetRole:'LEFT_UPRIGHT'/);
assert.match(alcove,/targetRole:'RIGHT_UPRIGHT'/);
assert.match(alcove,/partRelativeXIn:sh/);
assert.match(alcove,/reference:'FROM_BASE'/);
assert.match(alcove,/acrossWidthRule:'CENTERED_ON_WIDE_FACE'/);
assert.match(alcove,/toolDiameterIn:0\.1875/);
assert.match(alcove,/basis:'DERIVED_FROM_SHELF_ELEVATION'/);
assert.match(alcove,/id="p-pilot"/);
assert.match(alcove,/id="r-pilot"/);
assert.match(alcove,/pilotFeatures\.length\+' × 3\/16 in SPOT_ON_LOCATION/);
assert.match(alcove,/<circle cx="'\+\(x0\+1\.75\)/);
assert.match(alcove,/<circle cx="'\+\(x1-1\.75\)/);

// The existing Alcove reference price remains untouched by the pilot toggle.
assert.match(alcove,/q=\+\(mat\+rec\+hw\)\.toFixed\(2\)/);
assert.match(alcove,/Legacy Alcove price is not allowed to absorb them; Store migration remains required/);

// Window Seat: same concept, derived from the actual generated tower shelf datums.
assert.match(seat,/shelfPilotSpots:false/);
assert.match(seat,/id="c-shelf-pilot"/);
assert.match(seat,/shelfDatums=\[\]/);
assert.match(seat,/shelfDatums\.push\(r3\(y\)\)/);
assert.match(seat,/shelfDatums\.push\(r3\(datum\)\)/);
assert.match(seat,/shelfPilotDemand:\{enabled:P\.shelfPilotSpots/);
assert.match(seat,/kind:'SPOT_ON_LOCATION'/);
assert.match(seat,/targetOccurrenceId:upright\.id/);
assert.match(seat,/partRelativeXIn:r3\(y\)/);
assert.match(seat,/reference:'FROM_BASE'/);
assert.match(seat,/acrossWidthRule:'CENTERED_ON_WIDE_FACE'/);
assert.match(seat,/toolDiameterIn:0\.1875/);
assert.match(seat,/basis:'DERIVED_FROM_CONFIGURED_SHELF_ELEVATION'/);
assert.match(seat,/operationId:'OP-SHELF-PILOT-SPOTS-316'/);
assert.match(seat,/mode:'SPOT_ON_LOCATION'/);
assert.match(seat,/basis:'GENERATED FROM CONFIGURATION'/);
assert.match(seat,/not a generic finished-hole request/);
assert.match(seat,/current Window Seat price does not absorb this new operation; Store migration remains required/);
assert.match(seat,/def\.shelfPilotDemand\.features\.forEach/);
assert.match(seat,/fill="#2f6f9e"/);

// The local legacy adapter has no special priced branch for the new shelf pilot operation;
// it therefore reaches the declared UNRESOLVED fallback instead of being silently priced.
assert.equal(/if\(o\.operationId==='OP-SHELF-PILOT-SPOTS-316'\)/.test(seat),false);
assert.match(seat,/no declared service line for this request at this pin — the Store answers it, this page does not invent it/);

// Neither project is promoted to the Job-1 Store standard merely by adding the UI option.
assert.match(alcove,/pricingStatus:alcove\.pilotShelves\?'NOT_MIGRATED_TO_JOB1_STORE_STANDARD':'NOT_REQUESTED'/);
assert.match(seat,/pricingStatus:P\.shelfPilotSpots\?'UNPRICED_UNTIL_STORE_MIGRATION':'NOT_REQUESTED'/);

console.log('PASS · Alcove and Window Seat expose optional shelf-elevation SPOT_ON_LOCATION demand without inventing Store pricing');
