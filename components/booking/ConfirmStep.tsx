"use client";

import type { BookingPayload, GuestDetails } from "@/lib/booking/types";
import type { QuoteResponse } from "@/lib/pricing/types";
import { formatUSD } from "@/lib/format";
import { GuestStep } from "./GuestStep";

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
    ["Vehicle", payload.vehicleName],
    ["Guests", `${payload.passengers} pax / ${payload.luggage} luggage`],
    ...(payload.serviceType === "airport_transfer" ? [["Chauffeur", payload.airportDirection === "arrival" ? "Meet & greet" : "Private departure transfer"]] : []),
    ...(returnRoute ? [["Return", returnRoute]] : [])
  ];

  return (
    <div>
      <h1 className="text-3xl font-black leading-tight text-ink md:text-4xl">Almost there</h1>
      <p className="mt-2 text-sm font-semibold leading-6 text-neutral-500">Review your ride and add guest details.</p>
      <div className="mt-4 grid gap-4 md:mt-5 md:gap-5 lg:grid-cols-[minmax(0,560px)_360px] lg:justify-center xl:grid-cols-[minmax(0,560px)_380px]">
        <div className="grid max-w-[560px] gap-4 md:gap-5">
          <div className="overflow-hidden rounded-xl border hairline bg-white">
            <div className="p-4 md:p-5">
              <div className="flex flex-wrap items-center gap-2 text-xs font-black text-[#8f7241]">
                {payload.airport ? <span className="rounded-full bg-[#f5efe2] px-2.5 py-1">{payload.airport} · {payload.airport === "GMP" ? "Gimpo" : "Incheon"}</span> : null}
                <span className="text-neutral-300">to</span>
                <span className="text-ink">{shortPlace(payload.dropoffLocation)}</span>
              </div>
              <div className="mt-4 relative grid gap-3 pl-6 text-sm">
                <span className="absolute bottom-4 left-[5px] top-2 w-px bg-neutral-200" />
                <div className="relative">
                  <span className="absolute -left-6 top-1.5 h-2.5 w-2.5 rounded-full bg-ink" />
                  <div className="font-black text-ink">{shortPlace(payload.pickupLocation)}</div>
                  <div className="mt-0.5 text-xs font-semibold text-neutral-400">
                    {payload.pickupDate} · {payload.pickupTime}
                    {payload.flightNumber ? ` · ${payload.flightNumber}` : ""}
                  </div>
                </div>
                <div className="relative">
                  <span className="absolute -left-6 top-1.5 h-2.5 w-2.5 rounded-sm bg-[#b8955a]" />
                  <div className="font-black text-ink">{shortPlace(payload.dropoffLocation)}</div>
                  <div className="mt-0.5 text-xs font-semibold text-neutral-400">{payload.dropoffPlace?.formattedAddress || `${payload.passengers} pax · ${payload.luggage} luggage`}</div>
                </div>
              </div>
            </div>
            <div className="grid text-sm">
              {rows.map(([label, value]) => (
                <div key={label} className="grid gap-1 border-t hairline px-4 py-3 sm:grid-cols-[120px_1fr] md:px-5">
                  <div className="text-xs font-bold text-neutral-500">{label}</div>
                  <div className="leading-6 text-neutral-900">{value}</div>
                </div>
              ))}
            </div>
          </div>
          <section className="border-t border-[#F1EFE9] pt-5 md:pt-6">
            <GuestStep guest={guest} setGuest={setGuest} compact />
          </section>
        </div>
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <ConfirmPaymentPanel quote={quote} submitting={submitting} cannotSubmit={cannotSubmit} onSubmit={onSubmit} />
        </aside>
      </div>
    </div>
  );
}

function ConfirmPaymentPanel({
  quote,
  submitting,
  cannotSubmit,
  onSubmit
}: {
  quote: QuoteResponse | null;
  submitting: boolean;
  cannotSubmit: boolean;
  onSubmit: () => void;
}) {
  return (
    <div className="overflow-hidden rounded-xl border hairline bg-white shadow-[0_10px_32px_rgba(10,10,11,.04)]">
      <div className="divide-y divide-[#F1EFE9]">
        <section className="p-4 md:p-5">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="text-[11px] font-black uppercase tracking-[0.14em] text-[#9a7b41] md:text-xs">Estimated price</div>
              {quote?.available ? (
                <div className="mt-1 font-mono text-[28px] font-semibold tracking-[-0.02em] text-ink tabular-nums">{formatUSD(quote.finalPrice)}</div>
              ) : quote?.requiresCustomQuote ? (
                <div className="mt-1 text-[20px] font-black text-[#8f7241]">Custom quote</div>
              ) : (
                <div className="mt-1 text-sm font-black text-ink">Not shown yet</div>
              )}
            </div>
            {quote?.available ? <span className="rounded-full bg-[#EDF3EE] px-2.5 py-1.5 text-[11px] font-black uppercase tracking-[0.12em] text-[#4A7C59]">Instant</span> : null}
          </div>
          {quote?.available ? (
            <div className="mt-4 grid gap-2 text-sm">
              {quote.breakdown.map((item) => (
                <div key={item.label} className="flex justify-between gap-4">
                  <span className="text-neutral-600">{item.label}</span>
                  <span className={`font-mono font-semibold tabular-nums ${item.amount < 0 ? "text-[#8f7241]" : "text-ink"}`}>{formatUSD(item.amount)}</span>
                </div>
              ))}
            </div>
          ) : quote?.requiresCustomQuote ? (
            <p className="mt-3 text-sm leading-6 text-neutral-600">{quote.reason || "Our team will review the route, vehicle, and timing before confirming the final price."}</p>
          ) : (
            <p className="mt-3 text-sm leading-6 text-neutral-600">Select an available vehicle to continue.</p>
          )}
        </section>
        <section className="p-4 md:p-5">
          <div className="text-[11px] font-black uppercase tracking-[0.14em] text-[#9a7b41] md:text-xs">{quote?.requiresCustomQuote ? "Concierge quote" : "Secure payment"}</div>
          <p className="mt-3 text-sm leading-6 text-neutral-700">
            {quote?.requiresCustomQuote
              ? "No payment is collected until availability and final pricing are confirmed in USD."
              : "Your reservation details are saved before payment, so the request is protected if checkout is interrupted."}
          </p>
          <div className="mt-4 flex items-center justify-between gap-4 text-sm">
            <span className="font-semibold text-neutral-500">Payment method</span>
            <span className="text-right font-black text-ink">{quote?.requiresCustomQuote ? "After quote confirmation" : "Direct payment"}</span>
          </div>
          {!quote?.requiresCustomQuote ? <p className="mt-2 text-xs font-semibold leading-5 text-neutral-500">Payment is collected immediately in USD at checkout.</p> : null}
        </section>
        <section className="p-4 md:p-5">
          <div className="flex items-center gap-2 text-xs font-semibold leading-5 text-neutral-500">
            <LockIcon />
            <span>Payments processed in USD by secure checkout · Secure</span>
          </div>
          <button type="button" onClick={onSubmit} disabled={cannotSubmit} className="btn btn-dark btn-pill mt-4 hidden w-full lg:inline-flex">
            {submitting ? "Processing..." : quote?.requiresCustomQuote ? "Submit quote request" : "Continue to payment"}
          </button>
        </section>
      </div>
    </div>
  );
}

function shortPlace(value: string) {
  return value.replace("International Airport Terminal", "Intl Airport · T").replace("International Airport", "Intl Airport");
}

function LockIcon() {
  return (
    <svg aria-hidden="true" className="h-3.5 w-3.5 shrink-0 text-[#8f7241]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="18" height="11" x="3" y="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}
