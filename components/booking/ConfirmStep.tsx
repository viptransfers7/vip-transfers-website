"use client";

import type { BookingPayload, GuestDetails } from "@/lib/booking/types";
import type { QuoteResponse } from "@/lib/pricing/types";
import { AirportMeetingNotice } from "./AirportMeetingNotice";
import { GuestStep } from "./GuestStep";
import { QuoteSummary } from "./QuoteSummary";

export function ConfirmStep({
  guest,
  setGuest,
  payload,
  quote,
  submitting,
  onSubmit
}: {
  guest: GuestDetails;
  setGuest: (patch: Partial<GuestDetails>) => void;
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
  const cannotSubmit = submitting || !quote || (!quote.available && !quote.requiresCustomQuote);

  const rows = [
    ["Service", payload.serviceType.replace(/_/g, " ")],
    ["Pickup", `${payload.pickupDate} ${payload.pickupTime}`],
    ["Route", `${payload.pickupLocation} to ${payload.dropoffLocation}`],
    ...(payload.serviceType === "airport_transfer" ? [["Airport ride", payload.airportDirection === "departure" ? "To airport" : "From airport"]] : []),
    ...(payload.flightNumber ? [["Flight", payload.flightNumber]] : []),
    ...(returnRoute ? [["Return", returnRoute]] : []),
    ["Passengers", `${payload.passengers} pax / ${payload.luggage} luggage`],
    ...(payload.requestedVehicleTypeName ? [["Vehicle type", payload.requestedVehicleTypeName]] : []),
    ["Vehicle option", payload.vehicleName]
  ];

  return (
    <div>
      <h1 className="text-xl font-black leading-tight md:text-2xl">Confirm booking</h1>
      <div className="mt-4 grid gap-4 md:mt-5 md:gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="grid gap-4 md:gap-5">
          <div className="rounded-xl border hairline bg-white p-4 md:p-5">
            <GuestStep guest={guest} setGuest={setGuest} compact />
          </div>
          <div className="overflow-hidden rounded-xl border hairline bg-white">
            <div className="px-4 pt-4 text-[11px] font-black uppercase tracking-[0.14em] text-[#9a7b41] md:px-5 md:text-xs md:tracking-[0.16em]">Review</div>
            <div className="mt-3 grid text-sm">
              {rows.map(([label, value]) => (
                <div key={label} className="grid gap-1 border-t hairline px-4 py-3 sm:grid-cols-[120px_1fr] md:px-5">
                  <div className="text-xs font-bold text-neutral-500">{label}</div>
                  <div className="leading-6 text-neutral-900">{value}</div>
                </div>
              ))}
            </div>
            {payload.serviceType === "airport_transfer" ? (
              <div className="px-4 pb-4 md:px-5">
                <AirportMeetingNotice direction={payload.airportDirection} />
              </div>
            ) : null}
          </div>
        </div>
        <aside className="grid content-start gap-4 xl:sticky xl:top-28">
          <QuoteSummary quote={quote} />
          <div className="rounded-xl border hairline bg-[#fbfaf6] p-4">
            <div className="text-[11px] font-black uppercase tracking-[0.14em] text-[#9a7b41] md:text-xs md:tracking-[0.16em]">{quote?.requiresCustomQuote ? "Concierge quote" : "Secure payment"}</div>
            <p className="mt-3 text-sm leading-6 text-neutral-700">
              {quote?.requiresCustomQuote
                ? "Our team will review the route, vehicle, and timing before confirming the final price."
                : "Your reservation details are saved before payment, so the request is protected if checkout is interrupted."}
            </p>
            <div className="mt-4 hidden xl:block">
              <button type="button" onClick={onSubmit} disabled={cannotSubmit} className="btn btn-dark w-full">
                {submitting ? "Processing..." : quote?.requiresCustomQuote ? "Submit quote request" : "Continue to payment"}
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
