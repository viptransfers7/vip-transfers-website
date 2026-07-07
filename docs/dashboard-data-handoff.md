# Website Data Handoff

Last updated: 2026-07-07

This document is for the VIP Transfers Korea website thread. The website repo is separate from this dashboard repo. Do not directly modify dashboard files from the website thread.

## Dashboard Role

The dashboard is the operational source of truth for:

- Reservations
- Dispatch assignment
- Driver/vendor job status
- Customer confirmations and receipts
- Accounting, receivables, vendor payables, and internal driver settlements

The public website should focus on:

- Marketing pages
- Vehicle/service catalog
- Tour products
- Quote/booking request flow
- Published pricing display

The website should send clean booking/request data into the dashboard-compatible structure, but it should not own dispatch status, driver assignment, settlement, or invoice state.

## Key Dashboard Contract

The central object is `Reservation` in `lib/reservations.ts`.

Minimum fields the website booking flow should send or map:

| Field | Meaning | Website responsibility |
| --- | --- | --- |
| `date` | Service date | Required |
| `time` | Service time | Required when fixed transfer; optional for quote drafts |
| `serviceType` | Transfer, airport, hourly, full day, tour, etc. | Required |
| `company` | Booking source/client | Use `Website` or selected partner/company |
| `reservationNo` | Dashboard reservation number | Dashboard can generate if blank |
| `companyConfirmationNo` | External/client confirmation number | Optional |
| `customerName` | Passenger/customer name | Required |
| `customerPhone` | Customer phone | Optional in dashboard, useful for WhatsApp |
| `pickup` | Pickup location | Required |
| `destination` | Destination | Required unless hourly/as directed |
| `passengers` | Passenger count | Required |
| `luggage` | Luggage count | Optional, default 0 |
| `vehicle` | Requested vehicle type | Required as catalog vehicle type, not actual vehicle |
| `priceKRW` | KRW quoted/sold amount | Optional depending on quote flow |
| `priceUSD` | USD quoted/sold amount | Optional depending on quote flow |
| `paymentMethod` | Invoice, Card, Cash, Bank Transfer, PayPal, etc. | Optional |
| `paymentStatus` | Unbilled, Unpaid, Paid | Usually `Unbilled` or `Unpaid` from website |
| `billingStatus` | Unbilled, Draft, Billed, Partially Paid, Paid, Overdue, Void | Usually `Unbilled` |
| `status` | Pending, Assigned, In Progress, Completed, Cancelled | Website-created bookings should start as `Pending` |
| `note` | Internal memo | Include special requests, flight info, child seat, name sign, etc. |

Fields the website should not set directly unless there is a clear reason:

- `driverName`
- `driverPhone`
- `vehicleNumber`
- `assignmentType`
- `vendorName`
- `vendorContact`
- `assignmentStatus`
- `tripStartTime`
- `tripEndTime`
- `tripStartKm`
- `tripEndKm`
- `actualVehicle`
- `actualVehicleNumber`
- `expenseItems`
- `driverFee`
- `invoiceNo`
- `invoiceDate`
- `invoiceDueDate`
- `invoicePaidDate`
- `invoicePaidAmountKRW`
- `invoicePaidAmountUSD`
- `invoiceBalanceKRW`
- `invoiceBalanceUSD`

These are dispatcher/accounting/driver workflow fields.

## Vehicle Type Contract

Dashboard treats `vehicle` as requested vehicle type, not the actual assigned car.

Recommended website-facing vehicle types:

- `Executive Sedan`
- `Luxury Sedan`
- `SUV`
- `MPV`
- `Sprinter`
- `Minibus`
- `Coach 28`
- `Coach 44`

Actual vehicle assignment belongs to dashboard/admin vehicle data:

- Driver
- Driver phone
- Plate number
- Actual operated vehicle
- Vendor/internal ownership

## Catalog / Pricing Separation

Recommended separation:

### Website/catalog tables

Use these for public quote and marketing.

- vehicle types
- vehicle images
- passenger/luggage capacity
- service types
- tour products
- route/zone pricing
- hourly/full-day pricing
- pricing version
- draft/published state

### Dashboard/reservation tables

Use these for operations.

- reservations
- drivers
- vehicles
- vendors
- clients
- invoices/accounting
- settlements

Website should read only published catalog/pricing records. Dashboard/admin can later manage drafts and publish them.

## Booking To Reservation Mapping

When a website booking is submitted:

1. Website collects quote/customer/trip data.
2. Website stores the booking request or sends it to Supabase/API.
3. Dashboard receives or reads it as a `Pending` reservation.
4. Dispatcher reviews details, confirms pricing, assigns driver/vendor.
5. Accounting/invoice fields are updated later from dashboard.

Recommended default values for new website reservations:

```ts
{
  company: "Website",
  status: "Pending",
  assignmentType: "Internal",
  assignmentStatus: "Unassigned",
  paymentStatus: "Unbilled",
  billingStatus: "Unbilled",
  driverFee: 0,
  priceKRW: 0,
  priceUSD: 0
}
```

If the website collects payment immediately, set:

```ts
{
  paymentMethod: "Card",
  paymentStatus: "Paid",
  billingStatus: "Paid"
}
```

and provide the paid amount fields only if the dashboard schema/API supports them for the website flow.

## API / DB Contract Recommendation

For the website quote engine:

- Read published catalog/pricing only.
- Do not read operational reservations unless it is an authenticated admin workflow.
- Do not expose driver/vendor/accounting data publicly.

For booking submission:

- Prefer a server-side API endpoint over direct browser writes to Supabase.
- Validate required fields before insert.
- Normalize vehicle type to one of the approved values.
- Store special requests and flight/name-sign details in `note` until dedicated website booking fields are added.
- Current website booking APIs normalize payloads server-side before persistence placeholders:
  - Vehicle display names and dashboard `vehicle` come from the published website vehicle catalog by `vehicleCode`.
  - Instant-payment bookings require a positive quote amount and an active, capacity-valid vehicle.
  - Custom quote requests stay `Unbilled`, use no PayPal payment method, and remain dashboard `Pending` reservations with `[Website Status] Quote Requested` in `note`.

## Security Notes

Public website should never expose:

- Supabase service role key
- Dashboard admin credentials
- Driver/vendor login credentials
- Full reservation table read access
- Accounting/settlement data

Use restricted public API routes or Supabase RLS policies when the booking workflow becomes public.
