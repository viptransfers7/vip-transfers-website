export function CustomQuoteNotice({ reason }: { reason?: string }) {
  return (
    <div className="border-l-2 border-champagne bg-ivory p-4 md:p-5">
      <div className="text-xs font-black uppercase tracking-[0.14em] text-[#9a7b41] md:text-sm">Custom quote required</div>
      <p className="mt-3 text-sm leading-6 text-neutral-700">
        {reason || "This route requires a custom quote. Our team will confirm availability and pricing shortly."}
      </p>
      <p className="mt-2 text-xs font-bold uppercase tracking-[0.12em] text-neutral-500">This is a quote request. Your reservation is not confirmed until payment is completed.</p>
    </div>
  );
}
