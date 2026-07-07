import Link from "next/link";

export const metadata = { title: "Booking Confirmed" };

function formatAmount(amount: string) {
  const normalized = Number(amount);

  if (!amount || Number.isNaN(normalized) || normalized <= 0) {
    return "Confirmed in your payment receipt";
  }

  return `$${normalized.toFixed(2)}`;
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
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-champagne text-4xl text-champagne">✓</div>
            <div className="eyebrow mt-8">{isQuote ? "Quote Request Received" : "Payment Complete"}</div>
            <h1 className="serif-title mt-5 text-4xl leading-[1] sm:text-5xl md:text-7xl">{isQuote ? "Your itinerary is in review." : "Your booking is ready for dispatch review."}</h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/70">
              {isQuote
                ? "No payment has been collected for this custom quote request. The team will confirm availability and pricing before you are asked to pay."
                : "Your payment was completed. Chauffeur and vehicle assignment details are shared after dispatch confirms the customer-facing trip information."}
            </p>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="surface-card mx-auto max-w-3xl border-t-4 border-champagne p-6 md:p-10">
            <div className="flex flex-col justify-between gap-5 border-b hairline pb-6 md:flex-row md:items-start">
              <div>
                <div className="serif-title text-3xl">VIP TRANSFERS</div>
                <div className="mt-1 text-sm text-neutral-500">viptransferskorea.com</div>
              </div>
              <div className="md:text-right">
                <div className="text-xs font-bold uppercase tracking-[0.16em] text-neutral-500">Booking Reference</div>
                <div className="mt-1 text-xl font-black">{reservation}</div>
                <span className={`mt-2 inline-flex px-3 py-2 text-xs font-black uppercase tracking-[0.12em] ${isQuote ? "bg-ivory text-[#9a7b41]" : "bg-[#e6f4ec] text-[#20664a]"}`}>
                  {statusLabel}
                </span>
              </div>
            </div>
            <div className="mt-7 grid gap-3 text-sm">
              <div className="grid gap-2 border-b hairline py-3 md:grid-cols-[180px_1fr]">
                <div className="font-bold text-neutral-500">Status</div>
                <div>{isQuote ? "Quote requested / payment not collected" : "Payment successful / dispatch review pending"}</div>
              </div>
              <div className="grid gap-2 border-b hairline py-3 md:grid-cols-[180px_1fr]">
                <div className="font-bold text-neutral-500">Amount</div>
                <div>{isQuote ? "To be confirmed" : formatAmount(amount)}</div>
              </div>
              {token ? (
                <div className="grid gap-2 border-b hairline py-3 md:grid-cols-[180px_1fr]">
                  <div className="font-bold text-neutral-500">Tracking</div>
                  <Link href={`/track/${token}`} className="font-bold text-[#9a7b41]">
                    Open customer tracking page
                  </Link>
                </div>
              ) : null}
            </div>
            <div className="mt-7 border hairline bg-neutral-50 p-5">
              <div className="text-sm font-black uppercase tracking-[0.14em] text-[#9a7b41]">Next steps</div>
              <ul className="mt-4 grid gap-2 text-sm leading-6 text-neutral-700">
                {nextSteps.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ul>
            </div>
            <div className="mt-7 border-l-2 border-champagne bg-ivory p-5 text-sm leading-6 text-neutral-700">
              <strong>Airport pickup note:</strong> For arrival pickups, please proceed to the arrival hall after baggage claim. Name-sign and chauffeur contact details are confirmed before service when included in the booking.
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
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
