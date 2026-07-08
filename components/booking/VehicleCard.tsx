"use client";

import Image from "next/image";
import { formatUSD } from "@/lib/format";
import type { QuoteResponse, VehiclePricing } from "@/lib/pricing/types";

export function VehicleCard({
  vehicle,
  quote,
  selected,
  onSelect,
  onPreview
}: {
  vehicle: VehiclePricing;
  quote?: QuoteResponse;
  selected: boolean;
  onSelect: () => void;
  onPreview: () => void;
}) {
  const disabled = quote?.suggestedAction === "change_vehicle";
  const status = getStatus(quote);

  return (
    <article className={`rounded-xl border bg-white p-3 transition md:p-4 ${selected ? "border-2 border-ink shadow-[0_10px_28px_rgba(10,10,11,.08)]" : "hairline hover:border-neutral-300"} ${disabled ? "opacity-55" : ""}`}>
      <div className="grid grid-cols-[72px_1fr] gap-3 md:grid-cols-[132px_1fr] md:gap-4">
        <button type="button" onClick={onPreview} className="group relative h-[64px] overflow-hidden rounded-lg bg-neutral-100 text-left focus-ring md:h-[92px] md:rounded-xl" aria-label={`View ${vehicle.vehicleName} photo`}>
          <Image src={vehicle.imageUrl} alt={vehicle.vehicleName} fill className="object-cover transition duration-200 group-hover:scale-105" sizes="(max-width: 768px) 72px, 132px" />
          <span className="absolute bottom-1.5 left-1.5 rounded-full bg-black/72 px-2 py-0.5 text-[10px] font-bold text-white opacity-90">View</span>
        </button>
        <button type="button" onClick={onSelect} disabled={disabled} className="grid min-w-0 grid-cols-[1fr_auto] gap-3 rounded-lg text-left outline-none focus-visible:ring-2 focus-visible:ring-[#c6a76a]/30">
          <span className="min-w-0">
            <span className="block truncate text-base font-black text-ink md:text-lg">{vehicle.vehicleName}</span>
            <span className="mt-0.5 block text-sm font-semibold text-neutral-400">{vehicle.category}</span>
          </span>
          <span className="text-right">
            {status.kind === "price" ? (
              <span className="block">
                <span className="block text-[12px] font-normal leading-4 text-neutral-400">from</span>
                <span className="block font-mono text-[15px] font-semibold leading-5 tracking-[-0.02em] text-ink tabular-nums">{status.label}</span>
              </span>
            ) : (
              <span className={`block text-[15px] font-semibold leading-5 ${status.kind === "custom" ? "text-[#8f7241]" : "text-neutral-500"}`}>{status.label}</span>
            )}
            {selected ? <span className="mt-1 inline-block rounded-full bg-[#f5efe2] px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.1em] text-[#8f7241]">Selected</span> : null}
          </span>
        </button>
      </div>
      <button type="button" onClick={onSelect} disabled={disabled} className="mt-3 w-full rounded-lg text-left outline-none focus-visible:ring-2 focus-visible:ring-[#c6a76a]/30">
        <span className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-semibold text-neutral-500 tabular-nums">
          <span>Up to {vehicle.maxPax}</span>
          <span className="text-neutral-300">|</span>
          <span>Up to {vehicle.maxLuggage} luggage</span>
          <span className="text-neutral-300">|</span>
          <span>Wi-Fi · Water</span>
        </span>
        {disabled ? <span className="mt-3 block rounded-lg bg-red-50 px-3 py-2 text-xs font-bold text-red-700">May be tight for this party. Choose a larger vehicle.</span> : null}
      </button>
    </article>
  );
}

function getStatus(quote?: QuoteResponse) {
  if (!quote) return { kind: "muted", label: "Quote pending" };
  if (quote.available) return { kind: "price", label: formatUSD(quote.finalPrice) };
  if (quote.requiresCustomQuote) return { kind: "custom", label: "Custom quote" };
  if (quote.suggestedAction === "change_vehicle") return { kind: "muted", label: "Does not fit" };
  if (quote.suggestedAction === "change_time") return { kind: "muted", label: "Time unavailable" };
  return { kind: "muted", label: "Quote unavailable" };
}
