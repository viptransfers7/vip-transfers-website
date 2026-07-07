"use client";

import { vehiclePricing } from "@/lib/pricing/pricingData";
import type { QuoteResponse } from "@/lib/pricing/types";
import { QuoteSummary } from "./QuoteSummary";
import { VehicleCard } from "./VehicleCard";

export function VehicleStep({
  selectedVehicleCode,
  setSelectedVehicleCode,
  quotes,
  loading
}: {
  selectedVehicleCode: string;
  setSelectedVehicleCode: (code: string) => void;
  quotes: Record<string, QuoteResponse>;
  loading: boolean;
}) {
  const selectedQuote = quotes[selectedVehicleCode] || null;

  return (
    <div>
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end md:gap-4">
        <div>
          <h1 className="text-xl font-black leading-tight md:text-2xl">Choose vehicle</h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-600">Choose the vehicle that best fits your guests and luggage.</p>
        </div>
        {loading ? <span className="text-sm font-bold text-[#9a7b41]">Calculating quotes...</span> : null}
      </div>
      <div className="mt-5 grid gap-4 md:mt-7 md:gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="grid gap-3 md:gap-4 2xl:grid-cols-2">
          {vehiclePricing.map((vehicle) => (
            <VehicleCard key={vehicle.vehicleCode} vehicle={vehicle} quote={quotes[vehicle.vehicleCode]} selected={selectedVehicleCode === vehicle.vehicleCode} onSelect={() => setSelectedVehicleCode(vehicle.vehicleCode)} />
          ))}
        </div>
        <div className="xl:sticky xl:top-28 xl:self-start">
          <QuoteSummary quote={selectedQuote} />
        </div>
      </div>
    </div>
  );
}
