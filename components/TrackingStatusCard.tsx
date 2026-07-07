import Link from "next/link";

type TrackingPhase = "pre-assignment" | "assigned";

type TrackingRow = {
  label: string;
  value: string;
  sensitive?: boolean;
};

const phaseCopy: Record<
  TrackingPhase,
  {
    title: string;
    badge: string;
    badgeClassName: string;
    summary: string;
    supportLabel: string;
  }
> = {
  "pre-assignment": {
    title: "Your trip is being prepared.",
    badge: "Preparing",
    badgeClassName: "bg-ivory text-[#9a7b41]",
    summary:
      "Your booking or quote request has been received. Chauffeur and vehicle details are shared here only after dispatch confirms the assignment.",
    supportLabel: "WhatsApp Support"
  },
  assigned: {
    title: "Your chauffeur details are ready.",
    badge: "Assigned",
    badgeClassName: "bg-[#e6f4ec] text-[#20664a]",
    summary:
      "Dispatch has confirmed the customer-facing assignment details for this trip. Use the contact details below only for day-of-travel coordination.",
    supportLabel: "Contact Support"
  }
};

export function TrackingStatusCard({
  tokenLabel,
  phase,
  rows,
  airportMeeting = true,
  demo = false
}: {
  tokenLabel: string;
  phase: TrackingPhase;
  rows: TrackingRow[];
  airportMeeting?: boolean;
  demo?: boolean;
}) {
  const copy = phaseCopy[phase];

  return (
    <section className="section bg-ink text-white">
      <div className="container grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <div className="eyebrow">Customer Tracking</div>
          <h1 className="serif-title mt-4 text-[2rem] leading-[1.04] sm:text-4xl md:mt-5 md:text-6xl">{copy.title}</h1>
          <p className="mt-5 max-w-2xl text-sm leading-6 text-white/70 md:mt-6 md:text-base md:leading-7">{copy.summary}</p>
          <div className="mt-6 grid gap-2 text-sm leading-6 text-white/64 md:mt-8 md:gap-3">
            <p>Tracking links show customer-facing trip information only.</p>
            <p>Behind-the-scenes operation details stay private while the service team prepares your trip.</p>
          </div>
          <div className="mt-7 flex flex-wrap gap-2.5 md:mt-9 md:gap-3">
            <a href="https://wa.me/821096684313" className="btn btn-gold">
              {copy.supportLabel}
            </a>
            <Link href="/booking" className="btn btn-light">
              New Booking
            </Link>
          </div>
        </div>
        <div className="surface-card bg-white p-4 text-ink md:p-6">
          <div className="flex flex-col gap-4 border-b hairline pb-4 sm:flex-row sm:items-start sm:justify-between md:pb-5">
            <div>
              <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#9a7b41] md:text-xs md:tracking-[0.16em]">{demo ? "Demo Tracking" : "Tracking Link"}</div>
              <div className="mt-1 break-all text-lg font-black md:text-xl">{tokenLabel}</div>
            </div>
            <span className={`inline-flex w-fit px-2.5 py-1.5 text-[11px] font-black uppercase tracking-[0.12em] md:px-3 md:py-2 md:text-xs ${copy.badgeClassName}`}>{copy.badge}</span>
          </div>
          <div className="mt-4 grid gap-1 md:mt-5">
            {rows.map((row) => (
              <div key={row.label} className="grid gap-1.5 border-b hairline py-2.5 text-sm md:grid-cols-[160px_1fr] md:gap-2 md:py-3">
                <div className="font-bold text-neutral-500">{row.label}</div>
                <div className={row.sensitive ? "font-semibold text-[#20664a]" : "font-semibold"}>{row.value}</div>
              </div>
            ))}
          </div>
          {airportMeeting ? (
            <div className="mt-5 border-l-2 border-champagne bg-ivory p-3 text-sm leading-6 text-neutral-700 md:mt-6 md:p-4">
              <strong>Airport meeting:</strong> For arrival pickups, please proceed to the arrival hall after baggage claim. Name-sign and chauffeur contact details are confirmed before service when included in the booking.
            </div>
          ) : null}
          <div className="mt-5 text-xs font-semibold uppercase leading-5 tracking-[0.12em] text-neutral-400">
            This customer link shows only the information needed for your trip.
          </div>
        </div>
      </div>
    </section>
  );
}
