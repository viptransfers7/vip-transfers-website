"use client";

import type { QuoteResponse } from "@/lib/pricing/types";
import { CustomQuoteNotice } from "./CustomQuoteNotice";

export function QuoteSummary({ quote }: { quote: QuoteResponse | null }) {
  if (!quote) {
    return (
      <div className="border hairline bg-white p-3 text-sm text-neutral-600 md:p-4">
        Enter trip details and select a vehicle to receive a server-side quote.
      </div>
    );
  }

  if (quote.requiresCustomQuote) return <CustomQuoteNotice reason={quote.reason} />;

  if (!quote.available) {
    return (
      <div className="border border-red-200 bg-red-50 p-4 text-sm leading-6 text-red-800 md:p-5">
        {quote.reason || "This quote is not available."}
      </div>
    );
  }

  return (
    <div className="border hairline bg-white p-3.5 md:p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-[11px] font-black uppercase tracking-[0.14em] text-[#9a7b41] md:text-xs">Estimated price</div>
          <div className="serif-title mt-1 text-3xl md:text-4xl">${quote.finalPrice}</div>
        </div>
        <span className="bg-[#e6f4ec] px-2.5 py-1.5 text-[11px] font-black uppercase tracking-[0.12em] text-[#20664a] md:px-3 md:py-2 md:text-xs">Instant</span>
      </div>
      <div className="mt-4 grid gap-2 text-sm">
        {quote.breakdown.map((item) => (
          <div key={item.label} className="flex justify-between border-t hairline pt-2">
            <span className="text-neutral-600">{item.label}</span>
            <span className="font-bold">{item.amount < 0 ? "-" : ""}${Math.abs(item.amount)}</span>
          </div>
        ))}
      </div>
      {quote.notes.length ? <p className="mt-4 text-xs leading-5 text-neutral-500">{quote.notes[0]}</p> : null}
    </div>
  );
}
