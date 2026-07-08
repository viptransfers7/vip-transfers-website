"use client";

import Image from "next/image";
import { useState } from "react";
import type { BookingPayload } from "@/lib/booking/types";
import { vehiclePricing } from "@/lib/pricing/pricingData";
import type { QuoteResponse, VehiclePricing } from "@/lib/pricing/types";
import { QuoteSummary } from "./QuoteSummary";
import { VehicleCard } from "./VehicleCard";

export function VehicleStep({
  selectedVehicleCode,
  setSelectedVehicleCode,
  quotes,
  loading,
  tripSummary,
  payload,
  selectedVehicleName,
  onContinue
}: {
  selectedVehicleCode: string;
  setSelectedVehicleCode: (code: string) => void;
  quotes: Record<string, QuoteResponse>;
  loading: boolean;
  tripSummary: string;
  payload: BookingPayload;
  selectedVehicleName?: string;
  onContinue: () => void;
}) {
  const selectedQuote = quotes[selectedVehicleCode] || null;
  const [previewVehicle, setPreviewVehicle] = useState<VehiclePricing | null>(null);
  const canContinue = Boolean(selectedQuote && (selectedQuote.available || selectedQuote.requiresCustomQuote));

  return (
    <div className="mx-auto max-w-[1180px] 2xl:max-w-[1240px]">
      <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end md:gap-4">
        <div>
          <h1 className="text-3xl font-black leading-tight text-ink md:text-4xl">Choose your vehicle</h1>
          <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-neutral-500">{tripSummary}</p>
        </div>
        {loading ? <span className="text-sm font-bold text-[#9a7b41]">Calculating quotes...</span> : null}
      </div>
      <div className="mt-5 grid gap-4 md:mt-7 md:gap-5 lg:grid-cols-[minmax(0,760px)_360px] xl:grid-cols-[minmax(0,800px)_380px] 2xl:grid-cols-[minmax(0,840px)_400px]">
        <div className="grid max-w-[560px] gap-3 lg:max-w-none">
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
        <aside className="order-first grid gap-3 lg:order-none lg:sticky lg:top-28 lg:self-start">
          <VehicleTripSummary payload={payload} quote={selectedQuote} quoteLoading={loading} vehicleName={selectedVehicleName} />
          {selectedQuote ? <QuoteSummary quote={selectedQuote} /> : null}
          <button type="button" onClick={onContinue} disabled={!canContinue} className="btn btn-dark btn-pill hidden w-full lg:inline-flex">
            Review booking
          </button>
        </aside>
      </div>
      {previewVehicle ? <VehiclePreview vehicle={previewVehicle} selected={selectedVehicleCode === previewVehicle.vehicleCode} onClose={() => setPreviewVehicle(null)} onSelect={() => setSelectedVehicleCode(previewVehicle.vehicleCode)} /> : null}
    </div>
  );
}

function VehicleTripSummary({
  payload,
  quote,
  quoteLoading,
  vehicleName
}: {
  payload: BookingPayload;
  quote: QuoteResponse | null;
  quoteLoading: boolean;
  vehicleName?: string;
}) {
  const hasReturnRoute = Boolean(payload.isRoundTrip && payload.returnPickupLocation && payload.returnDropoffLocation);

  return (
    <div className="rounded-xl border hairline bg-white p-4 shadow-[0_10px_32px_rgba(10,10,11,.04)] md:p-5">
      <div className="flex items-start justify-between gap-3">
        <h2 className="text-base font-black text-ink">Trip summary</h2>
        {payload.isRoundTrip ? <span className="rounded-full bg-[#f5efe2] px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.1em] text-[#9a7b41]">Round trip</span> : null}
      </div>

      <div className="mt-4 grid gap-4 text-sm">
        <RouteTimeline
          pickup={payload.pickupLocation}
          dropoff={payload.dropoffLocation}
          meta={`${payload.pickupDate} · ${payload.pickupTime}${payload.flightNumber ? ` · ${payload.flightNumber}` : ""}`}
          detail={`${payload.passengers} pax · ${payload.luggage} luggage`}
        />

        {hasReturnRoute ? (
          <div className="rounded-xl bg-[#fbfaf7] p-3">
            <div className="mb-3 text-[10px] font-black uppercase tracking-[0.14em] text-neutral-400">Return trip</div>
            <RouteTimeline
              pickup={payload.returnPickupLocation || ""}
              dropoff={payload.returnDropoffLocation || ""}
              meta={`${payload.returnDate || "Date pending"} · ${payload.returnTime || "Time pending"}${payload.returnFlight ? ` · ${payload.returnFlight}` : ""}`}
              detail="Different airport allowed"
              compact
            />
          </div>
        ) : null}

        <div className="grid gap-3 border-t hairline pt-4">
          <SummaryRow label="Service" value={formatService(payload.serviceType)} />
          {payload.serviceType === "airport_transfer" ? <SummaryRow label="Direction" value={payload.airportDirection === "departure" ? "Departing Korea" : "Arriving in Korea"} /> : null}
          <SummaryRow label="Vehicle" value={vehicleName || "Select vehicle next"} strong />
          <SummaryRow label="Quote" value={getQuoteStatus({ quote, quoteLoading, vehicleName })} strong />
        </div>

        <p className="text-xs font-semibold leading-5 text-neutral-400">Free cancellation up to 24h · Fixed price after confirmation</p>
      </div>
    </div>
  );
}

function RouteTimeline({
  pickup,
  dropoff,
  meta,
  detail,
  compact = false
}: {
  pickup: string;
  dropoff: string;
  meta: string;
  detail: string;
  compact?: boolean;
}) {
  return (
    <div className={`relative grid pl-6 ${compact ? "gap-2" : "gap-3"}`}>
      <span className="absolute bottom-4 left-[5px] top-2 w-px bg-neutral-200" />
      <div className="relative min-w-0">
        <span className="absolute -left-6 top-1.5 h-2.5 w-2.5 rounded-full bg-ink" />
        <div className="truncate font-black text-ink">{shortPlace(pickup)}</div>
        <div className="mt-0.5 text-xs font-semibold text-neutral-400">{meta}</div>
      </div>
      <div className="relative min-w-0">
        <span className="absolute -left-6 top-1.5 h-2.5 w-2.5 rounded-sm bg-[#b8955a]" />
        <div className="truncate font-black text-ink">{shortPlace(dropoff)}</div>
        <div className="mt-0.5 text-xs font-semibold text-neutral-400">{detail}</div>
      </div>
    </div>
  );
}

function SummaryRow({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-neutral-500">{label}</span>
      <span className={`text-right ${strong ? "font-black text-ink" : "font-semibold text-neutral-700"}`}>{value}</span>
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

function getQuoteStatus({ quote, quoteLoading, vehicleName }: { quote: QuoteResponse | null; quoteLoading: boolean; vehicleName?: string }) {
  if (!vehicleName) return "After vehicle";
  if (quote?.available) return "Instant quote";
  if (quote?.requiresCustomQuote) return "Custom quote";
  if (quoteLoading) return "Checking route";
  return "Review required";
}

function shortPlace(value: string) {
  return value.replace("International Airport Terminal", "Intl Airport · T").replace("International Airport", "Intl Airport");
}

function formatService(serviceType: string) {
  return serviceType.replace(/_/g, " ");
}
