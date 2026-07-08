"use client";

import Image from "next/image";
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
  const statusLabel = getStatusLabel(quote);

  return (
    <article className={`grid grid-cols-[92px_1fr] gap-3 rounded-xl border bg-white p-2 transition ${selected ? "border-ink shadow-[0_8px_24px_rgba(10,10,11,.06)]" : "hairline hover:border-neutral-300"} ${disabled ? "opacity-45" : ""}`}>
      <button type="button" onClick={onPreview} className="group relative h-[68px] overflow-hidden rounded-lg bg-neutral-100 text-left focus-ring md:h-[76px]" aria-label={`View ${vehicle.vehicleName} photo`}>
        <Image src={vehicle.imageUrl} alt={vehicle.vehicleName} fill className="object-cover transition duration-200 group-hover:scale-105" sizes="92px" />
        <span className="absolute bottom-1.5 left-1.5 rounded-full bg-black/72 px-2 py-0.5 text-[10px] font-bold text-white opacity-90">View</span>
      </button>
      <button type="button" onClick={onSelect} disabled={disabled} className="grid min-w-0 grid-cols-[1fr_auto] items-center gap-3 py-1 pr-1 text-left">
        <span className="min-w-0">
          <span className="block text-[10px] font-black uppercase tracking-[0.14em] text-[#8f7241]">{vehicle.vehicleTypeName}</span>
          <span className="mt-1 block truncate text-sm font-black text-ink md:text-base">{vehicle.vehicleName}</span>
          <span className="mt-1 block text-xs font-semibold text-neutral-500">
            {vehicle.maxPax} pax / {vehicle.maxLuggage} luggage
          </span>
          {disabled ? <span className="mt-2 block rounded-md bg-red-50 px-2 py-1 text-xs font-bold text-red-700">Does not fit this party</span> : null}
        </span>
        <span className="text-right">
          <span className="block font-mono text-sm font-semibold text-ink">{statusLabel}</span>
          <span className={`mt-2 inline-flex h-5 w-5 rounded-full border ${selected ? "border-ink bg-ink" : "border-neutral-300"}`} aria-hidden="true" />
        </span>
      </button>
    </article>
  );
}

function getStatusLabel(quote?: QuoteResponse) {
  if (!quote) return "Quote pending";
  if (quote.available) return `$${quote.finalPrice}`;
  if (quote.requiresCustomQuote) return "Custom quote";
  if (quote.suggestedAction === "change_vehicle") return "Does not fit";
  if (quote.suggestedAction === "change_time") return "Time unavailable";
  return "Quote unavailable";
}
