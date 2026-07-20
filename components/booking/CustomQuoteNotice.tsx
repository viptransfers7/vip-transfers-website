export function CustomQuoteNotice({ reason }: { reason?: string }) {
  return (
    <div className="rounded-xl border border-[#eadfca] bg-[#f5efe2] p-4 md:p-5">
      <div className="text-xs font-black uppercase tracking-[0.14em] text-[#9a7b41] md:text-sm">Custom quote required</div>
      <div className="mt-2 text-xl font-semibold tracking-[-0.02em] text-[#8f7241]">Custom quote</div>
      <p className="mt-3 text-sm leading-6 text-neutral-700">
        {reason || "This route requires a custom quote. Our team will confirm availability and pricing shortly."}
      </p>
      <p className="mt-3 border-t border-[#dfd0b5] pt-3 text-sm font-semibold leading-6 text-neutral-700">
        This is a quote request, not a confirmed reservation. A coordinator will review availability, routing, vehicle fit, and final pricing before payment.
      </p>
    </div>
  );
}
