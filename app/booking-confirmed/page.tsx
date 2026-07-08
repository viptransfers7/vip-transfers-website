import Link from "next/link";
import { formatUSD } from "@/lib/format";

export const metadata = { title: "Booking Confirmed" };

function formatAmount(amount: string) {
  const normalized = Number(amount);

  if (!amount || Number.isNaN(normalized) || normalized <= 0) {
    return "Confirmed in your payment receipt";
  }

  return formatUSD(normalized);
}

export default function BookingConfirmedPage({
  searchParams
}: {
  searchParams: { reservation?: string; token?: string; status?: string; amount?: string };
}) {
  const reservation = searchParams.reservation || "Pending reference";
  const token = searchParams.token;
  const isQuote = searchParams.status === "quote";
  const amount = searchParams.amount || "0";
  const statusLabel = isQuote ? "Quote requested" : "Payment successful";
  const nextSteps = isQuote
    ? [
        "The team reviews availability, route timing, luggage fit, and vehicle type.",
        "A confirmed quote and payment instructions are sent before the booking is finalized.",
        "Driver and vehicle details appear on the tracking page only after dispatch assignment."
      ]
    : [
        "Your payment has been recorded for the customer booking.",
        "The team reviews final trip details and prepares dispatch.",
        "Your tracking link will show chauffeur and vehicle details after assignment is confirmed."
      ];

  return (
    <main>
      <section className="section bg-ink text-white">
        <div className="container">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-champagne text-3xl text-champagne md:h-20 md:w-20 md:text-4xl">✓</div>
            <div className="eyebrow mt-6 md:mt-8">{isQuote ? "Quote Request Received" : "Payment Complete"}</div>
            <h1 className="serif-title mt-4 text-[2rem] leading-[1.04] sm:text-4xl md:mt-5 md:text-6xl">{isQuote ? "Your itinerary is in review." : "Your booking is ready for dispatch review."}</h1>
            <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-white/70 md:mt-6 md:text-base md:leading-7">
              {isQuote
                ? "No payment has been collected for this custom quote request. The team will confirm availability and pricing before you are asked to pay."
                : "Your payment was completed. Chauffeur and vehicle assignment details are shared after dispatch confirms the customer-facing trip information."}
            </p>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="surface-card mx-auto max-w-3xl border-t-4 border-champagne p-4 md:p-10">
            <div className="flex flex-col justify-between gap-4 border-b hairline pb-5 md:flex-row md:items-start md:gap-5 md:pb-6">
              <div>
                <div className="serif-title text-2xl md:text-3xl">VIP TRANSFERS</div>
                <div className="mt-1 text-sm text-neutral-500">viptransferskorea.com</div>
              </div>
              <div className="md:text-right">
                <div className="text-[11px] font-bold uppercase tracking-[0.14em] text-neutral-500 md:text-xs md:tracking-[0.16em]">Booking Reference</div>
                <div className="mt-1 text-lg font-black md:text-xl">{reservation}</div>
                <span className={`mt-2 inline-flex px-2.5 py-1.5 text-[11px] font-black uppercase tracking-[0.12em] md:px-3 md:py-2 md:text-xs ${isQuote ? "bg-ivory text-[#9a7b41]" : "bg-[#e6f4ec] text-[#20664a]"}`}>
                  {statusLabel}
                </span>
              </div>
            </div>
            <div className="mt-5 grid gap-2 text-sm md:mt-7 md:gap-3">
              <div className="grid gap-1.5 border-b hairline py-2.5 md:grid-cols-[180px_1fr] md:gap-2 md:py-3">
                <div className="font-bold text-neutral-500">Status</div>
                <div>{isQuote ? "Quote requested / payment not collected" : "Payment successful / dispatch review pending"}</div>
              </div>
              <div className="grid gap-1.5 border-b hairline py-2.5 md:grid-cols-[180px_1fr] md:gap-2 md:py-3">
                <div className="font-bold text-neutral-500">Amount</div>
                <div className={isQuote ? "text-[#8f7241]" : "font-mono font-semibold tracking-[-0.02em] tabular-nums"}>{isQuote ? "Custom quote" : formatAmount(amount)}</div>
              </div>
              {token ? (
                <div className="grid gap-1.5 border-b hairline py-2.5 md:grid-cols-[180px_1fr] md:gap-2 md:py-3">
                  <div className="font-bold text-neutral-500">Tracking</div>
                  <Link href={`/track/${token}`} className="font-bold text-[#9a7b41]">
                    Open customer tracking page
                  </Link>
                </div>
              ) : null}
            </div>
            <div className="mt-6 border hairline bg-neutral-50 p-4 md:mt-7 md:p-5">
              <div className="text-xs font-black uppercase tracking-[0.14em] text-[#9a7b41] md:text-sm">Next steps</div>
              <ul className="mt-4 grid gap-2 text-sm leading-6 text-neutral-700">
                {nextSteps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ul>
            </div>
            <div className="mt-6 border-l-2 border-champagne bg-ivory p-4 text-sm leading-6 text-neutral-700 md:mt-7 md:p-5">
              <strong>Airport pickup note:</strong> For arrival pickups, please proceed to the arrival hall after baggage claim. Name-sign and chauffeur contact details are confirmed before service when included in the booking.
            </div>
            <div className="mt-7 flex flex-wrap gap-2.5 md:mt-8 md:gap-3">
              <Link href="/booking" className="btn">
                New Booking
              </Link>
              <a href="https://wa.me/821096684313" className="btn btn-dark">
                WhatsApp Support
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
