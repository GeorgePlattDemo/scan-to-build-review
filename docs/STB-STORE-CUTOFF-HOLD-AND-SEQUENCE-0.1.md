# Store Zero cutoff hold and sequence — 0.1

Declared pin. Do not invent a second catalog. Do not use culls as a substitute.

## What is already on the rack

These SKUs already existed. They were not invented for this pass.

| Length | Inches | SKU | Price |
|---|---|---|---|
| 6 ft | 72 | `STB-ZERO-SPF-2X4-72-001` | $3.13 |
| 8 ft | 96 | `STB-ZERO-SPF-2X4-96-001` | $4.18 |
| 9 ft | 108 | `STB-ZERO-SPF-2X4-108-001` | $4.70 |
| 10 ft | 120 | `STB-ZERO-SPF-2X4-120-001` | $5.69 |
| **12 ft** | **144** | **`STB-ZERO-SPF-2X4-144-001`** | **$6.80** |
| 14 ft | 168 | `STB-ZERO-SPF-2X4-168-001` | $7.31 |
| **16 ft** | **192** | **`STB-ZERO-SPF-2X4-192-001`** | **$8.36** |

Typical outdoor 2×4 rack stops at 16 ft. 20 ft is a yard / special-order conversation, not a default SKU.

## Hold rule

`D-HOLD-OPEN-0.1`

- `holdIn = 24`
- `kerfIn = 0.125`
- basis: declared / unmeasured
- last remain on a driven stick ≥ 24 in
- whole parent (part length = stock length) is not a cutoff; no stub reserved
- culls / warped shorts are yard salvage, not a Store substitute

```
n * (L + 0.125) + 24 <= parent    when L < parent
```

API:

```js
STBStoreHandoffContract.sequenceCrosscuts({ parentLengthIn, parts:[...] })
STBStoreHandoffContract.resolveStartOwnMaterial({ sizeKey:'2x4', parts:[{len,wid,qty}] })
STBStoreHandoffContract.d001Hold
STBStoreHandoffContract.quoteModeledRecovery({ species, sticks, millMinutes:0, material, hardware:0 })
```

## Picnic eight-pack (15.5 in)

| Parent | Result |
|---|---|
| 12 ft / 144 | 7 parts on stick 1, 8th needs a second stick |
| 14 ft / 168 | 8 parts, one stick, $7.31 — current cheapest map |
| 16 ft / 192 | 8 parts, one stick, $8.36, 67 in left |

Do not claim one 12-footer yields eight holdable 15½s.

## What projects must do

1. Call the contract. Do not pack inches locally.
2. Do not invent SKUs, $35 setup, $100/hour, or PRICE-1.
3. Material = `resolveStartOwnMaterial`. Work = `quoteModeledRecovery` with `sticks` from that resolution.
4. Confirmation is not an order.
5. Window Seat / Alcove buy whole parents. Do not run short-piece hold against them.
6. Angle capability may stay unpublished. Hold is independent of 10°.
