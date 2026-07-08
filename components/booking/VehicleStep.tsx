"use client";

import Image from "next/image";
import { useState } from "react";
import { vehiclePricing } from "@/lib/pricing/pricingData";
import type { QuoteResponse, VehiclePricing } from "@/lib/pricing/types";
import { QuoteSummary } from "./QuoteSummary";
import { VehicleCard } from "./VehicleCard";

export function VehicleStep({
  selectedVehicleCode,
  setSelectedVehicleCode,
  quotes,
  loading,
  tripSummary
}: {
  selectedVehicleCode: string;
  setSelectedVehicleCode: (code: string) => void;
  quotes: Record<string, QuoteResponse>;
  loading: boolean;
  tripSummary: string;
}) {
  const selectedQuote = quotes[selectedVehicleCode] || null;
  const [previewVehicle, setPreviewVehicle] = useState<VehiclePricing | null>(null);

  return (
    <div>
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end md:gap-4">
        <div>
          <h1 className="text-3xl font-black leading-tight text-ink md:text-4xl">Choose your vehicle</h1>
          <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-neutral-500">{tripSummary}</p>
        </div>
        {loading ? <span className="text-sm font-bold text-[#9a7b41]">Calculating quotes...</span> : null}
      </div>
      <div className="mt-5 grid gap-4 md:mt-7 md:gap-5 xl:grid-cols-[minmax(0,1fr)_320px] 2xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="grid gap-3 xl:grid-cols-2">
          {vehiclePricing.map((vehicle) => (
            <VehicleCard
              key={vehicle.vehicleCode}
              vehicle={vehicle}
              quote={quotes[vehicle.vehicleCode]}
              selected={selectedVehicleCode === vehicle.vehicleCode}
              onSelect={() => setSelectedVehicleCode(vehicle.vehicleCode)}
              onPreview={() => setPreviewVehicle(vehicle)}
            />
          ))}
        </div>
        <div className="xl:sticky xl:top-28 xl:self-start">
          <QuoteSummary quote={selectedQuote} />
        </div>
      </div>
      {previewVehicle ? <VehiclePreview vehicle={previewVehicle} selected={selectedVehicleCode === previewVehicle.vehicleCode} onClose={() => setPreviewVehicle(null)} onSelect={() => setSelectedVehicleCode(previewVehicle.vehicleCode)} /> : null}
    </div>
  );
}

function VehiclePreview({ vehicle, selected, onClose, onSelect }: { vehicle: VehiclePricing; selected: boolean; onClose: () => void; onSelect: () => void }) {
  return (
    <div className="fixed inset-0 z-[80] flex items-end bg-black/48 p-3 backdrop-blur-sm md:items-center md:justify-center" role="dialog" aria-modal="true" aria-label={`${vehicle.vehicleName} preview`}>
      <div className="w-full overflow-hidden rounded-2xl bg-white shadow-soft md:max-w-xl">
        <div className="relative aspect-[16/10] bg-neutral-100">
          <Image src={vehicle.imageUrl} alt={vehicle.vehicleName} fill className="object-cover" sizes="(max-width: 768px) 100vw, 560px" />
          <button type="button" onClick={onClose} className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-black/72 text-sm font-black text-white" aria-label="Close vehicle preview">
            x
          </button>
        </div>
        <div className="p-5">
          <div className="text-[11px] font-black uppercase tracking-[0.14em] text-[#8f7241]">{vehicle.vehicleTypeName}</div>
          <h2 className="mt-2 text-xl font-black text-ink">{vehicle.vehicleName}</h2>
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-xl bg-[#fbfaf7] p-3">
              <div className="text-[10px] font-black uppercase tracking-[0.14em] text-neutral-400">Passengers</div>
              <div className="mt-1 text-lg font-black tracking-tight tabular-nums">{vehicle.maxPax}</div>
            </div>
            <div className="rounded-xl bg-[#fbfaf7] p-3">
              <div className="text-[10px] font-black uppercase tracking-[0.14em] text-neutral-400">Luggage</div>
              <div className="mt-1 text-lg font-black tracking-tight tabular-nums">{vehicle.maxLuggage}</div>
            </div>
          </div>
          <div className="mt-5 flex gap-3">
            <button type="button" className="btn flex-1" onClick={onClose}>
              Close
            </button>
            <button
              type="button"
              className="btn btn-dark flex-1"
              onClick={() => {
                onSelect();
                onClose();
              }}
            >
              {selected ? "Selected" : "Select vehicle"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
