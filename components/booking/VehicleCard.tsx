"use client";

import Image from "next/image";
import type { QuoteResponse, VehiclePricing } from "@/lib/pricing/types";

export function VehicleCard({
  vehicle,
  quote,
  selected,
  onSelect
}: {
  vehicle: VehiclePricing;
  quote?: QuoteResponse;
  selected: boolean;
  onSelect: () => void;
}) {
  const disabled = quote?.suggestedAction === "change_vehicle";
  const statusLabel = getStatusLabel(quote);

  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={disabled}
      className={`grid min-h-[196px] overflow-hidden border bg-white text-left transition sm:grid-cols-[220px_minmax(0,1fr)] ${
        selected ? "border-champagne shadow-soft" : "hairline"
      } ${disabled ? "opacity-45" : "hover:-translate-y-0.5"}`}
    >
      <div className="relative aspect-[16/10] min-h-[150px] bg-neutral-100 sm:aspect-auto sm:h-full">
        <Image src={vehicle.imageUrl} alt={vehicle.vehicleName} fill className="object-cover" sizes="(max-width: 768px) 100vw, 220px" />
      </div>
      <div className="flex min-w-0 flex-col p-5">
        <div className="text-xs font-bold uppercase tracking-[0.14em] text-[#9a7b41]">{vehicle.vehicleTypeName}</div>
        <div className="mt-2 text-lg font-black">{vehicle.vehicleName}</div>
        <div className="mt-1 text-xs font-bold text-neutral-500">{vehicle.category}</div>
        <div className="mt-3 text-sm text-neutral-600">
          Max {vehicle.maxPax} pax / {vehicle.maxLuggage} luggage
        </div>
        <div className="mt-auto pt-5 text-sm font-black">{statusLabel}</div>
      </div>
    </button>
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
