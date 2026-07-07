"use client";

import type { BookingPayload } from "@/lib/booking/types";
import type { QuoteResponse } from "@/lib/pricing/types";
import { AirportMeetingNotice } from "./AirportMeetingNotice";
import { CustomQuoteNotice } from "./CustomQuoteNotice";
import { QuoteSummary } from "./QuoteSummary";

export function ReviewPaymentStep({
  payload,
  quote,
  submitting,
  onSubmit
}: {
  payload: BookingPayload;
  quote: QuoteResponse | null;
  submitting: boolean;
  onSubmit: () => void;
}) {
  const returnRoute =
    payload.isRoundTrip &&
    `${payload.returnDate || "-"} ${payload.returnTime || ""} / ${payload.returnPickupLocation || payload.dropoffLocation} to ${payload.returnDropoffLocation || payload.pickupLocation}${
      payload.returnFlight ? ` / ${payload.returnFlight}` : ""
    }`;

  const rows = [
    ["Service", payload.serviceType.replace(/_/g, " ")],
    ["Date / Time", `${payload.pickupDate} ${payload.pickupTime}`],
    ["Pickup", payload.pickupLocation],
    ["Dropoff", payload.dropoffLocation],
    ...(payload.serviceType === "airport_transfer" ? [["Airport direction", payload.airportDirection === "departure" ? "To airport" : "From airport"]] : []),
    ...(payload.stopover ? [["Stopover", payload.stopover]] : []),
    ...(payload.flightNumber ? [["Flight", payload.flightNumber]] : []),
    ...(returnRoute ? [["Return", returnRoute]] : []),
    ["Passengers / Luggage", `${payload.passengers} pax / ${payload.luggage} luggage`],
    ...(payload.requestedVehicleTypeName ? [["Vehicle type", payload.requestedVehicleTypeName]] : []),
    ["Vehicle option", payload.vehicleName],
    ["Booker", payload.guest.bookerName || "Not provided"],
    ["Email", payload.guest.bookerEmail || "Not provided"],
    ["Phone", payload.guest.bookerPhone || "Not provided"]
  ];

  return (
    <div>
      <h1 className="text-xl font-black leading-tight md:text-2xl">Review and payment</h1>
      <div className="mt-4 grid gap-4 md:mt-5 md:gap-5 lg:grid-cols-[1fr_0.82fr]">
        <div className="grid gap-1 text-sm">
          {rows.map(([label, value]) => (
            <div key={label} className="grid gap-1 border-b hairline py-2 md:grid-cols-[160px_1fr] md:py-2.5">
              <div className="font-bold text-neutral-500">{label}</div>
              <div className="capitalize">{value}</div>
            </div>
          ))}
          {payload.serviceType === "airport_transfer" ? <AirportMeetingNotice direction={payload.airportDirection} /> : null}
        </div>
        <div className="grid content-start gap-4">
          <QuoteSummary quote={quote} />
          {quote?.requiresCustomQuote ? <CustomQuoteNotice reason={quote.reason} /> : null}
          <div className="border hairline bg-white p-3.5 md:p-4">
            <div className="text-[11px] font-black uppercase tracking-[0.14em] text-[#9a7b41] md:text-sm">{quote?.requiresCustomQuote ? "Quote request" : "Payment placeholder"}</div>
            <p className="mt-3 text-sm leading-6 text-neutral-700">
              {quote?.requiresCustomQuote
                ? "This request will be saved as Quote Requested. Payment is not collected until the team confirms pricing."
                : "The next phase will connect server-side PayPal order creation and capture. This demo creates Pending first, then confirms it to prevent data loss."}
            </p>
            <button type="button" onClick={onSubmit} disabled={submitting} className="btn btn-dark mt-4 w-full md:mt-5">
              {submitting ? "Processing..." : quote?.requiresCustomQuote ? "Submit Quote Request" : "Simulate Secure Payment"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
