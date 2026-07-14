# VIP Transfers Korea Site Workplan

Last updated: 2026-07-14

This is the coordination document for the VIP Transfers Korea website threads. It defines thread ownership, page/file boundaries, shared component rules, priorities, and pre-implementation checks.

Read first:

- `docs/dashboard-data-handoff.md`
- `docs/pricing-database-tables.md`

Hard boundary:

- Do not modify the Dashboard repo at `/Users/alexchoi/Documents/New project` from website threads.
- The website owns public marketing, catalog, quote, booking request, and customer tracking UI.
- Dashboard/admin owns operations: reservation review, dispatch, driver/vendor assignment, actual vehicle, trip status, invoices, receivables, payables, and settlements.

## 1. Thread Map

| Thread | Role | Primary scope | May edit | Avoid editing |
|---|---|---|---|---|
| `00 Coordination` | Overall planning and collision control | Workplan, scope boundaries, priority order, shared decisions | `docs/*` planning docs | `app/*`, `components/*`, `lib/*` implementation |
| `01 Homepage / Global Content` | Homepage and shared public positioning | Homepage sections, global SEO copy, trust signals, header/footer requests | `app/page.tsx`, relevant public copy docs | Booking flow internals, pricing engine |
| `02 Airport Transfers` | ICN/GMP/Seoul airport pages | Airport transfer landing pages, airport meeting content, route-specific FAQs | `app/airport-transfer-seoul/page.tsx`, `app/incheon-airport-transfer/page.tsx`, `app/gimpo-airport-transfer/page.tsx` | Shared quote calculation logic unless coordinated |
| `03 Chauffeur / Business Services` | Executive, Seoul chauffeur, roadshow, delegation pages | Corporate and government service pages | `app/executive-chauffeur-korea/page.tsx`, `app/seoul-chauffeur-service/page.tsx`, `app/corporate-roadshow-korea/page.tsx`, `app/government-delegation-transport-korea/page.tsx` | Fleet detail and booking API behavior |
| `04 Private Tours` | Tour index and tour detail pages | Private tour pages, tour product content, itinerary positioning | `app/private-tours-korea/page.tsx`, `app/private-tours/*/page.tsx`, content requests for `lib/pricing/tourProducts.ts` | Dashboard reservation fields |
| `05 Fleet / Catalog` | Fleet list and detail pages | Vehicle descriptions, capacities, images, public catalog alignment | `app/fleet/page.tsx`, `app/fleet/*/page.tsx`, `components/FleetCard.tsx`, `components/FleetDetailPage.tsx`, catalog requests | Booking step state machine |
| `06 Booking / Quote Flow` | Customer booking and quote workflow | Booking UI, validation, quote API, pending booking API, confirmation pages | `app/booking/page.tsx`, `app/booking-confirmed/page.tsx`, `app/api/quote/*`, `app/api/bookings/*`, `components/booking/*`, `lib/booking/*`, `lib/pricing/*` | Marketing page copy except CTA targets |
| `07 Payments / Email / Tracking` | Payment, email confirmation, tracking token/page | PayPal flow, email confirmation, track page, secure customer-facing status | `app/api/paypal/*`, `lib/payment/*`, `lib/email/*`, `app/track/*` | Dispatcher/accounting-owned fields |
| `08 Design System / Shared Components` | Shared visual consistency | Reusable page components, global CSS, visual tokens | `app/globals.css`, `components/SectionHeading.tsx`, `components/ServicePage.tsx`, shared component requests | Page-specific copy rewrites unless asked |
| `09 SEO / QA / Release` | Technical SEO and final verification | Sitemap, robots, metadata review, build/lint checks, route QA | `app/sitemap.ts`, `app/robots.ts`, metadata changes across pages after owner coordination | Functional rewrites during release freeze |

If a thread needs a file outside its scope, it should record the need in this document or ask the owning thread instead of making the change directly.

## 2. Page And File Ownership

| Area | Routes/files | Owner thread | Notes |
|---|---|---|---|
| Homepage | `app/page.tsx` | `01 Homepage / Global Content` | Keep primary CTA aligned with `app/booking/page.tsx`. |
| Airport transfer pages | `app/airport-transfer-seoul/page.tsx`, `app/incheon-airport-transfer/page.tsx`, `app/gimpo-airport-transfer/page.tsx` | `02 Airport Transfers` | Must reflect airport booking requirements and meeting-point language. |
| Business service pages | `app/executive-chauffeur-korea/page.tsx`, `app/seoul-chauffeur-service/page.tsx`, `app/corporate-roadshow-korea/page.tsx`, `app/government-delegation-transport-korea/page.tsx` | `03 Chauffeur / Business Services` | Use corporate tone; avoid unsupported operational promises. |
| Private tour pages | `app/private-tours-korea/page.tsx`, `app/private-tours/seoul-city-tour/page.tsx`, `app/private-tours/nami-island-private-tour/page.tsx` | `04 Private Tours` | Product availability and price behavior should follow published catalog rules. |
| Fleet pages | `app/fleet/page.tsx`, `app/fleet/cadillac-escalade/page.tsx`, `app/fleet/genesis-g90/page.tsx`, `app/fleet/hyundai-staria/page.tsx`, `app/fleet/mercedes-s-class/page.tsx`, `app/fleet/mercedes-sprinter/page.tsx` | `05 Fleet / Catalog` | Vehicle type must map to dashboard contract names from `dashboard-data-handoff.md`. |
| Booking UI | `app/booking/page.tsx`, `components/BookingForm.tsx`, `components/booking/*` | `06 Booking / Quote Flow` | Changes here can affect conversion and reservation payloads; coordinate before altering shared steps. |
| Quote/pricing logic | `app/api/quote/route.ts`, `lib/pricing/*` | `06 Booking / Quote Flow` | Read published catalog/pricing only. No Google Maps distance-based pricing. |
| Booking submission | `app/api/bookings/*`, `lib/booking/*`, `lib/supabase/server.ts` | `06 Booking / Quote Flow` | Website-created reservations start as `Pending` and avoid operational fields. |
| Confirmation/tracking | `app/booking-confirmed/page.tsx`, `app/track/[token]/page.tsx`, `app/track/demo/page.tsx` | `07 Payments / Email / Tracking` | Public tracking must not expose internal dispatch/accounting data. |
| Payments/email | `app/api/paypal/*`, `lib/payment/paypal.ts`, `lib/email/sendConfirmationEmail.ts` | `07 Payments / Email / Tracking` | Confirm payment state only through supported website flow. |
| Shared presentation | `components/SectionHeading.tsx`, `components/ServicePage.tsx`, `components/FleetCard.tsx`, `components/FleetDetailPage.tsx`, `app/globals.css`, `public/Images/*` | `08 Design System / Shared Components` with page owner coordination | Shared component changes require checking all consuming pages. |
| SEO infrastructure | `app/layout.tsx`, `app/sitemap.ts`, `app/robots.ts`, per-page metadata | `09 SEO / QA / Release` | Route owners propose metadata; SEO owner normalizes sitewide. |
| Planning docs | `docs/*` | `00 Coordination` | Keep implementation requests and decisions visible here. |

## 3. Shared Component Rules

1. Shared components are contract surfaces. Before changing props, layout behavior, or semantic markup in shared components, list affected routes and get owner acknowledgement.
2. Prefer page-local copy and composition changes over changing a shared component for a single page.
3. If a shared component needs variant behavior, add a small typed prop only when at least two pages need it or when the component already has an established variant pattern.
4. Do not mix pricing, booking state, or dashboard mapping logic into presentational components.
5. Do not add operational dashboard fields to customer-facing components. Internal fields such as `driverName`, `vehicleNumber`, `assignmentStatus`, invoice fields, settlement fields, and actual vehicle data stay dashboard-owned.
6. Image changes must preserve stable public paths or include a route owner checklist for every page using the image.
7. Global CSS changes need mobile and desktop visual checks across homepage, booking, fleet, and at least one service page.
8. API route changes need payload examples documented in the owning thread or a docs file before release.

## 4. Work Priorities

| Priority | Workstream | Goal | Dependencies | Owner |
|---:|---|---|---|---|
| P0 | Confirm data boundary | Ensure all booking/reservation planning follows Dashboard handoff | `docs/dashboard-data-handoff.md` | `00 Coordination`, `06 Booking / Quote Flow` |
| P0 | Booking payload audit | Verify website request payload maps only allowed fields and defaults to `Pending`/`Unbilled` | Current `lib/booking/*`, booking API routes | `06 Booking / Quote Flow` |
| P0 | Live pricing sheet sync | Align repository pricing data with current `Pricing_rules` and `Region_Rules` sheets because sheet edits are reflected in the live widget | `docs/pricing-database-tables.md`, `lib/pricing/*` | `06 Booking / Quote Flow` |
| P1 | Quote/catalog consistency | Align visible fleet options, pricing logic, and live pricing table contract | `docs/pricing-database-tables.md`, `lib/pricing/*` | `05 Fleet / Catalog`, `06 Booking / Quote Flow` |
| P1 | Primary conversion path | Homepage/service/fleet CTAs should drive to the correct booking or quote flow | Route copy and `app/booking/page.tsx` | `01`, `02`, `03`, `04`, `05`, `06` |
| P1 | Airport transfer completeness | ICN/GMP pages must reflect flight requirement, meet-and-greet expectations, and route quote behavior | Booking validation and airport notices | `02 Airport Transfers`, `06 Booking / Quote Flow` |
| P2 | Fleet content polish | Confirm capacity, luggage, vehicle type, and images per public catalog | `public/Images/*`, fleet pages | `05 Fleet / Catalog` |
| P2 | Tour product polish | Make tour pages consistent with quote/tour product records | `lib/pricing/tourProducts.ts` | `04 Private Tours`, `06 Booking / Quote Flow` |
| P2 | Tracking/payment/email QA | Ensure customer confirmation and tracking show only public-safe fields | PayPal/email/tracking routes | `07 Payments / Email / Tracking` |
| P3 | SEO QA | Normalize metadata, sitemap inclusion, robots behavior, structured internal links | Route ownership stable | `09 SEO / QA / Release` |
| P3 | Visual consistency pass | Remove cross-page layout drift after content and booking flows settle | Shared components stable | `08 Design System / Shared Components` |

## 5. Common Decisions

Record cross-thread decisions here so later implementation threads do not rediscover them.

| Date | Decision | Applies to | Owner |
|---|---|---|---|
| 2026-07-07 | Website repo and Dashboard repo are separate. Website threads must not modify `/Users/alexchoi/Documents/New project`. | All threads | `00 Coordination` |
| 2026-07-07 | Website owns public marketing, catalog, quote, booking request, and published pricing display only. | All pages and booking APIs | `00 Coordination` |
| 2026-07-07 | Dashboard owns dispatch, driver/vendor assignment, actual vehicle, job status, invoice/accounting, and settlement fields. | Booking/reservation mapping | `06 Booking / Quote Flow` |
| 2026-07-07 | New website-originated reservations should start as `Pending`, usually `Unbilled`, with `company: "Website"`. | Booking APIs | `06 Booking / Quote Flow` |
| 2026-07-07 | Public vehicle selection should use catalog vehicle options, while Dashboard `vehicle` should receive the approved vehicle type/category. | Fleet, quote, booking mapping | `05 Fleet / Catalog`, `06 Booking / Quote Flow` |
| 2026-07-07 | Pricing should be based on flat airport prices, region rules, service extra rules, and quote snapshots, not Google Maps distance pricing. | Quote engine and pricing docs | `06 Booking / Quote Flow` |
| 2026-07-07 | Website should read only published catalog/pricing records when database-backed pricing is introduced. | Quote/catalog work | `06 Booking / Quote Flow` |
| 2026-07-07 | Store special requests, flight info, child seat, name sign, and similar customer context in `note` until dedicated website booking fields exist. | Booking payload | `06 Booking / Quote Flow` |
| 2026-07-14 | Current Google Sheet tabs `Pricing_rules` and `Region_Rules` are the live pricing source; edits there are reflected in the website widget. | Quote widget and pricing sync | `06 Booking / Quote Flow` |
| 2026-07-14 | Existing widget pricing for ICN to Busan shows `Region_Rules.Extra_Hours` is charged as half-hour units: `Extra_Hours * 0.5 * hourly_rate`. Keep this behavior unless the pricing sheet is intentionally redefined. | Regional quote calculation | `06 Booking / Quote Flow` |
| 2026-07-14 | For hourly/all-day charter that starts or ends at ICN/GMP, do not add airport flat. Add one airport touch surcharge equal to `1 * hourly_rate`, then add any non-base regional extra. | Hourly/all-day quote calculation | `06 Booking / Quote Flow` |
| 2026-07-14 | Current live vehicle codes include `s_class`, `sprinter_8`, `sprinter_13`, and `sprinter_lux`; older repository codes such as `sclass` and `sprinter` need sync review before implementation changes. | Fleet, quote, booking mapping | `05 Fleet / Catalog`, `06 Booking / Quote Flow` |
| 2026-07-14 | Tour packages should be managed as separate product catalog entries with image, itinerary, inclusions/exclusions, and vehicle-specific prices, not mixed into generic transfer pricing. | Tour catalog and booking quote flow | `04 Private Tours`, `06 Booking / Quote Flow` |

## 6. Implementation Checklist

Use this before a thread edits implementation files:

- Confirm the file is within the thread's ownership area.
- Read `docs/dashboard-data-handoff.md` if the change touches booking, quote, reservation mapping, tracking, payment, or customer confirmation.
- Read `docs/pricing-database-tables.md` if the change touches vehicle options, fleet capacity, tour products, quote amounts, route rules, or published pricing.
- For pricing changes, compare against the live Google Sheet contract documented in `docs/pricing-database-tables.md`; do not assume hardcoded repository values are current.
- Check whether the file is a shared component or global CSS. If yes, list affected routes before editing.
- Avoid Dashboard operational fields in public website code and UI.
- Preserve the website-to-dashboard defaults: `company: "Website"`, `status: "Pending"`, `paymentStatus: "Unbilled"` or supported paid state, and `billingStatus: "Unbilled"` unless payment flow proves otherwise.
- Validate that customer-facing pages do not promise dispatch details, assigned driver details, exact vehicle plate numbers, invoice state, or settlement details.
- Keep public API routes server-side for booking submissions; never expose service role keys or unrestricted reservation reads.
- For booking/quote changes, include at least one example request and expected reservation/quote behavior in the implementation thread summary.
- Run appropriate checks before handoff: `npm run build` for broad route/API changes, and a browser/mobile pass for visual page work.

## 7. Open Coordination Items

| Item | Why it matters | Suggested owner | Status |
|---|---|---|---|
| Confirm whether `vehicle` in reservation payload should store catalog option label or dashboard vehicle type label. | Handoff says Dashboard treats `vehicle` as requested vehicle type; pricing doc separates `vehicle_option` and `vehicle_type`. | `06 Booking / Quote Flow` with Dashboard owner | Open |
| Sync hardcoded pricing code with live sheets. | Current `lib/pricing/pricingData.ts` and `lib/pricing/regionRules.ts` do not match the 2026-07-14 live CSV values/codes. | `06 Booking / Quote Flow` | Open |
| Decide whether live sheet or DB-backed published pricing is the next operational source. | The current widget reflects Google Sheet edits immediately, while DB docs describe a future published pricing model. | `00 Coordination`, `06 Booking / Quote Flow` | Open |
| Define public tracking field allowlist. | Tracking page must be useful without leaking dispatch/accounting internals. | `07 Payments / Email / Tracking` | Open |
| Decide release QA route list. | Shared visual/global changes need a stable smoke-test set. | `09 SEO / QA / Release` | Open |
