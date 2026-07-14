# Pricing Logic Simulation

Last updated: 2026-07-14

This report checks the current live Google Sheet pricing logic for reasonableness.

Inputs:

- `/Users/alexchoi/Downloads/2026_2분기/Pricing rules - Pricing_rules.csv`
- `/Users/alexchoi/Downloads/2026_2분기/Pricing rules - Region_Rules.csv`

Assumed live-sheet formulas:

- Airport transfer: `ICN_Flat` or `GMP_Flat`, plus regional extra if the widget applies non-base destination time.
- Seoul/base point-to-point: `Seoul_PTP_h * Hourly Rate ($)`.
- Regional point-to-point: likely `(Seoul_PTP_h + Extra_Hours * 0.5) * Hourly Rate ($)` if kept consistent with the previous widget.
- Hourly charter: fixed `Charter_5h`, `Charter_10h`, or `Charter_12h`.
- Regional charter dispatch, if used: package price plus `Extra_Hours * 0.5 * Hourly Rate ($)`.

Important correction from the previous widget screenshot:

- ICN to Busan shown in the old widget matches `ICN_Flat + Extra_Hours * 0.5 * Hourly Rate ($)`.
- Example: Staria `150 + 18 * 0.5 * 50 = 600`; G90 `200 + 18 * 0.5 * 70 = 830`.
- So although the sheet column is named `Extra_Hours`, current widget behavior treats it like half-hour units.

## Executive Summary

Overall, the pricing model is reasonable if the business goal is simple live pricing that avoids Google Maps distance and protects margins on regional work.

The strongest parts:

- Airport flat rates have a clean 10% GMP discount from ICN across all vehicles.
- Hourly, PTP, and charter pricing generally preserve the vehicle hierarchy.
- `Extra_Hours * 0.5` gives predictable regional scaling and keeps long-distance Korea routes auto-quotable without making every regional route a custom quote.
- Quote snapshots are necessary because Google Sheet edits affect the widget immediately.

The parts to confirm:

- Current repository code does not match the live sheet data. However, its half-hour `extraUnits` concept matches the old widget's ICN to Busan price pattern.
- `Incheon / Songdo / Yeongjong` is marked base area with `Extra_Hours = 0`. If that is intentional, Seoul to Songdo PTP prices equal Seoul local PTP prices.
- `sprinter_8` is priced the same as G90/Suburban for hourly, Seoul PTP, 5h, 10h, and 12h, despite higher capacity. Airport pricing is higher, so this may be intentional.
- `sprinter_13` 10h and 12h packages are comparatively generous versus its 5h package.
- Airport start/end in hourly or all-day charter should not add airport flat on top of charter package. Instead, add a one-hour airport touch surcharge when the charter starts or ends at ICN/GMP.

## Live Vehicle Pricing

| code | vehicle | hourly | Seoul PTP | ICN | GMP | 5h | 10h | 12h | pax | luggage |
|---|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| staria | Hyundai Staria | 50 | 100 | 150 | 135 | 250 | 400 | 500 | 5 | 5 |
| carnival | Kia Carnival | 50 | 100 | 150 | 135 | 250 | 400 | 500 | 5 | 5 |
| g90 | Genesis G90 | 70 | 140 | 200 | 180 | 350 | 560 | 700 | 3 | 3 |
| suburban | Chevrolet Suburban | 70 | 140 | 200 | 180 | 350 | 560 | 700 | 5 | 5 |
| escalade | Cadillac Escalade | 100 | 200 | 300 | 270 | 500 | 800 | 1000 | 5 | 5 |
| s_class | Mercedes S-Class | 100 | 200 | 350 | 315 | 550 | 800 | 1000 | 3 | 3 |
| sprinter_8 | Sprinter (8 Pax) | 70 | 140 | 250 | 225 | 350 | 560 | 700 | 8 | 8 |
| sprinter_13 | Sprinter (13 Pax) | 80 | 160 | 300 | 270 | 500 | 640 | 800 | 13 | 10 |
| sprinter_lux | Sprinter Luxury (7 Pax) | 100 | 200 | 400 | 360 | 550 | 800 | 1000 | 7 | 6 |

## Airport Transfer Check

| vehicle | ICN | GMP | GMP / ICN |
|---|---:|---:|---:|
| Staria / Carnival | 150 | 135 | 90% |
| G90 / Suburban | 200 | 180 | 90% |
| Escalade | 300 | 270 | 90% |
| S-Class | 350 | 315 | 90% |
| Sprinter 8 | 250 | 225 | 90% |
| Sprinter 13 | 300 | 270 | 90% |
| Sprinter Luxury | 400 | 360 | 90% |

Assessment:

- The airport table is internally consistent.
- S-Class is intentionally above Escalade for airport flat even though both use 100 hourly.
- Sprinter Luxury is the premium airport option and is highest across ICN/GMP.

## Point-To-Point Regional Simulation

Formula: `(Seoul_PTP_h + Extra_Hours * 0.5) * Hourly Rate ($)`.

| region | extra hours | Staria | G90 | Escalade | S-Class | Sprinter 8 | Sprinter 13 | Sprinter Lux |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Seoul/base | 0 | 100 | 140 | 200 | 200 | 140 | 160 | 200 |
| Anyang | 1 | 125 | 175 | 250 | 250 | 175 | 200 | 250 |
| Uijeongbu | 1.5 | 138 | 193 | 275 | 275 | 193 | 220 | 275 |
| Yongin | 2 | 150 | 210 | 300 | 300 | 210 | 240 | 300 |
| Gapyeong | 3 | 175 | 245 | 350 | 350 | 245 | 280 | 350 |
| Chuncheon | 4 | 200 | 280 | 400 | 400 | 280 | 320 | 400 |
| Daejeon | 7 | 275 | 385 | 550 | 550 | 385 | 440 | 550 |
| Busan | 18 | 550 | 770 | 1100 | 1100 | 770 | 880 | 1100 |
| Yeosu | 20 | 600 | 840 | 1200 | 1200 | 840 | 960 | 1200 |
| Geoje/Jindo/Namhae | 22 | 650 | 910 | 1300 | 1300 | 910 | 1040 | 1300 |

Assessment:

- For nearby Gyeonggi routes, the results look reasonable and easy to explain.
- For regional cities, this formula is much more customer-friendly and supports the goal of avoiding custom quote whenever possible.
- If operational risk is a concern, use custom quote only for unsupported islands, multi-stop itineraries, or rows explicitly marked unavailable, not merely because `Extra_Hours` is high.

## Airport To Non-Base Simulation

Previous widget formula: `ICN_Flat + Extra_Hours * 0.5 * Hourly Rate ($)`.

| ICN to | extra hours | Staria | G90 | Escalade | S-Class | Sprinter 8 | Sprinter 13 | Sprinter Lux |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| Anyang | 1 | 175 | 235 | 350 | 400 | 285 | 340 | 450 |
| Yongin | 2 | 200 | 270 | 400 | 450 | 320 | 380 | 500 |
| Gapyeong | 3 | 225 | 305 | 450 | 500 | 355 | 420 | 550 |
| Daejeon | 7 | 325 | 445 | 650 | 700 | 495 | 580 | 750 |
| Busan | 18 | 600 | 830 | 1200 | 1250 | 880 | 1020 | 1300 |

Assessment:

- This exactly matches the provided old-widget ICN to Busan prices.
- This is the best fit for the stated goal: avoid custom quote as much as possible while still charging for regional distance/time.
- Airport-to-regional routes can be auto-quoted if the destination matches a `Region_Rules` row.

## Charter Package Check

| vehicle | 5h vs hourly | 10h vs hourly | 12h vs hourly |
|---|---:|---:|---:|
| Staria / Carnival | 100% | 80% | 83% |
| G90 / Suburban | 100% | 80% | 83% |
| Escalade | 100% | 80% | 83% |
| S-Class | 110% | 80% | 83% |
| Sprinter 8 | 100% | 80% | 83% |
| Sprinter 13 | 125% | 80% | 83% |
| Sprinter Luxury | 110% | 80% | 83% |

Assessment:

- 10h packages are consistently discounted to 80% of hourly-rate math.
- 12h packages are about 83% of hourly-rate math.
- S-Class, Sprinter 13, and Sprinter Luxury have premium 5h minimums, which is sensible.
- Sprinter 13 has the biggest jump-down after 5h: 5h is 500, 10h is 640, 12h is 800. This is customer-friendly but may be low if driver/vendor costs scale with time.

## Hourly / All-Day With Airport Start Or End

Recommended formula:

- Do not add `ICN_Flat` or `GMP_Flat` to hourly/all-day charter.
- Treat ICN/GMP as base area with `Extra_Hours = 0` for regional surcharge purposes.
- Add an airport touch surcharge of `1 * Hourly Rate ($)` if the charter starts or ends at ICN/GMP.
- Use package price plus the highest non-base regional extra among pickup, dropoff, and stopovers.

Formula:

`Charter Package + airport_touch_surcharge + max_region_extra * 0.5 * Hourly Rate ($)`

Where:

- `airport_touch_surcharge = 1 * Hourly Rate ($)` if pickup or dropoff is ICN/GMP.
- Default to one airport touch surcharge per charter booking.
- If there are two separate airport meet-and-greet events in one itinerary, review whether it should be a custom quote or a two-surcharge itinerary.

Why:

- Airport flat is for airport transfer service.
- Hourly/all-day is a vehicle-use package.
- Adding airport flat on top of charter would double-charge the airport leg.
- Adding one hourly unit better reflects terminal handling, waiting, flight timing, and airport pickup/dropoff complexity.

### Airport Base Cases

No regional extra applies if the itinerary stays within airport/Seoul/base regions, but the one-hour airport touch surcharge applies.

| case | vehicle | 5h | 10h | 12h |
|---|---|---:|---:|---:|
| ICN start to Seoul end | Staria | 300 | 450 | 550 |
| ICN start to Seoul end | G90 | 420 | 630 | 770 |
| ICN start to Seoul end | S-Class | 650 | 900 | 1100 |
| ICN start to Seoul end | Sprinter 13 | 580 | 720 | 880 |
| Seoul start to ICN end | Staria | 300 | 450 | 550 |
| Seoul start to ICN end | G90 | 420 | 630 | 770 |
| ICN start to ICN end | Staria | 300 | 450 | 550 |
| ICN start to ICN end | G90 | 420 | 630 | 770 |

### Airport Plus Regional End

Add the one-hour airport touch surcharge plus the destination region surcharge.

| case | vehicle | 5h | 10h | 12h |
|---|---|---:|---:|---:|
| ICN start to Yongin end | Staria | 350 | 500 | 600 |
| ICN start to Yongin end | G90 | 490 | 700 | 840 |
| ICN start to Yongin end | S-Class | 750 | 1000 | 1200 |
| ICN start to Yongin end | Sprinter 13 | 660 | 800 | 960 |
| ICN start to Busan end | Staria | 750 | 900 | 1000 |
| ICN start to Busan end | G90 | 1050 | 1260 | 1400 |
| ICN start to Busan end | S-Class | 1550 | 1800 | 2000 |
| ICN start to Busan end | Sprinter 13 | 1300 | 1440 | 1600 |

Assessment:

- This policy supports maximum instant pricing while avoiding airport flat double-charging.
- Airport transfer ICN to Busan and hourly charter ICN to Busan become different products:
  - Airport transfer charges `ICN_Flat + regional extra`.
  - Hourly/all-day charter charges `package + one airport hour + regional extra`.
- If the selected package duration is operationally too short for the route, the product UI should either force a longer package or mark the route custom. Avoid silently selling a 5h charter for an itinerary that obviously needs a full day.

## Region Table Health

Current CSV:

- 159 rows total.
- 4 base rows.
- 155 non-base rows.
- Non-base `Extra_Hours` range: 1 to 22. With the widget multiplier, this means 0.5 to 11 billable surcharge hours.
- Median non-base extra: 13.

Potential cleanup:

- `ncheon / Songdo / Yeongjong / 인천 / 송도 / 영종` appears to have a missing leading `I`. Normalize to `Incheon`.
- Decide whether `Incheon / Songdo / Yeongjong` should truly be base area. If yes, Seoul to Songdo PTP stays very low. If no, assign an `Extra_Hours` value.

## Current Code Gap

Current repository files do not yet implement this live-sheet model:

- `lib/pricing/pricingData.ts` uses older hardcoded vehicle codes and older prices.
- `lib/pricing/regionRules.ts` uses a small hardcoded region list.
- `lib/pricing/types.ts` models region extras as `extraUnits` with `extraUnitType: "half_hour"`, which matches the old widget's ICN to Busan behavior.
- `lib/pricing/calculateQuote.ts` calculates region extras as `extraUnits * 0.5 * hourlyRateUsd`, which is directionally correct, but the region table and vehicle pricing are outdated.

Required implementation change:

- Replace or adapt hardcoded data to the live sheet contract.
- Import `Region_Rules.Extra_Hours` into an internal `extraUnits` field, or store `extra_unit_hours = 0.5`.
- Calculate regional additions as `Extra_Hours * 0.5 * hourlyRateUsd`.
- Preserve quote snapshots because live sheet edits change future quote output.

## Recommendation

Use the current old-widget regional multiplier, with three guardrails:

1. Keep `Region_Rules.Extra_Hours` as the single source of regional scaling.
2. Auto-quote every matched city row unless a service-specific rule blocks it.
3. Sync the website code to the live sheet contract before relying on the widget for production checkout/payment.

Suggested custom quote policy:

- Do not use a simple `Extra_Hours` threshold if the business goal is maximum instant pricing.
- Custom quote only when the city is not matched, the vehicle cannot fit passengers/luggage, the route has complex stopovers, or the destination has a manual `requires_custom_quote` flag.
- Store quote snapshots for every instant quote.
