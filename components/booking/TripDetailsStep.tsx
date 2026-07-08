"use client";

import { type ReactNode, useMemo, useState } from "react";
import { tourProducts } from "@/lib/pricing/tourProducts";
import type { AirportDirection, PlaceSnapshot, ServiceType } from "@/lib/pricing/types";
import { LocationInput } from "./LocationInput";

export type TripForm = {
  pickupDate: string;
  pickupTime: string;
  pickupLocation: string;
  dropoffLocation: string;
  pickupPlace?: PlaceSnapshot;
  dropoffPlace?: PlaceSnapshot;
  stopover: string;
  airportDirection: AirportDirection;
  flightNumber: string;
  isRoundTrip: boolean;
  returnPickupLocation: string;
  returnDropoffLocation: string;
  returnPickupPlace?: PlaceSnapshot;
  returnDropoffPlace?: PlaceSnapshot;
  returnDate: string;
  returnTime: string;
  returnFlight: string;
  hourlyDuration: 5 | 10 | 12;
  itineraryNote: string;
  tourProductSlug: string;
  passengers: number;
  luggage: number;
};

export function TripDetailsStep({
  serviceType,
  trip,
  setTrip,
  minDateTime
}: {
  serviceType: ServiceType;
  trip: TripForm;
  setTrip: (patch: Partial<TripForm>) => void;
  minDateTime: string;
}) {
  const isAirport = serviceType === "airport_transfer";
  const isHourly = serviceType === "hourly_charter";
  const isTour = serviceType === "private_tour";
  const minDate = minDateTime.slice(0, 10);
  const minTime = trip.pickupDate === minDate ? minDateTime.slice(11, 16) : undefined;
  const detectedAirport = getAirportCodeFromTrip(trip.pickupLocation, trip.dropoffLocation);

  function updateAirportDirection(airportDirection: AirportDirection) {
    const currentAirportLocation = getAirportLocationFromTrip(trip.pickupLocation, trip.dropoffLocation);

    if (airportDirection === "arrival") {
      setTrip({
        airportDirection,
        pickupPlace: undefined,
        dropoffPlace: undefined,
        pickupLocation: currentAirportLocation,
        dropoffLocation: isAirportName(trip.pickupLocation) ? trip.dropoffLocation : trip.pickupLocation
      });
      return;
    }

    setTrip({
      airportDirection,
      pickupPlace: undefined,
      dropoffPlace: undefined,
      pickupLocation: isAirportName(trip.dropoffLocation) ? trip.pickupLocation : trip.dropoffLocation,
      dropoffLocation: currentAirportLocation
    });
  }

  function swapLocations() {
    setTrip({
      pickupLocation: trip.dropoffLocation,
      dropoffLocation: trip.pickupLocation,
      pickupPlace: trip.dropoffPlace,
      dropoffPlace: trip.pickupPlace,
      airportDirection: trip.airportDirection === "arrival" ? "departure" : "arrival"
    });
  }

  function updateRoundTrip(checked: boolean) {
    setTrip({
      isRoundTrip: checked,
      ...(checked
        ? {
            returnPickupLocation: trip.returnPickupLocation || trip.dropoffLocation,
            returnDropoffLocation: trip.returnDropoffLocation || getAirportLocationFromTrip(trip.pickupLocation, trip.dropoffLocation),
            returnPickupPlace: trip.returnPickupPlace || trip.dropoffPlace,
            returnDropoffPlace: trip.returnDropoffPlace
          }
        : {})
    });
  }

  return (
    <div>
      <div className="grid grid-cols-2 gap-3 md:gap-4">
        {isAirport ? (
          <div className="col-span-2 grid grid-cols-2 rounded-xl bg-[#f1eee8] p-1 text-sm font-bold" aria-label="Airport ride direction">
            {[
              ["arrival", "Arriving in Korea"],
              ["departure", "Departing Korea"]
            ].map(([value, title]) => (
              <button
                key={value}
                type="button"
                onClick={() => updateAirportDirection(value as AirportDirection)}
                className={`min-h-10 rounded-lg px-2 text-center text-[13px] font-black transition md:px-3 md:text-sm ${trip.airportDirection === value ? "bg-white text-black shadow-[0_1px_8px_rgba(9,10,11,0.08)]" : "text-neutral-500"}`}
              >
                {title}
              </button>
            ))}
          </div>
        ) : null}

        <div className="col-span-2 overflow-hidden rounded-xl border hairline bg-white px-4">
          <div className="relative">
            <div className="absolute bottom-9 left-[10px] top-9 w-px bg-neutral-200" />
            <button
              type="button"
              onClick={swapLocations}
              className="absolute right-0 top-1/2 z-10 hidden h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border hairline bg-white text-[10px] font-black uppercase text-neutral-600 shadow-[0_4px_14px_rgba(10,10,11,.05)] sm:flex"
              aria-label="Swap pickup and dropoff"
            >
              Swap
            </button>
            <LocationInput
              variant="route"
              marker="pickup"
              label="Pickup"
              value={trip.pickupLocation}
              onChange={(value) => setTrip({ pickupLocation: value })}
              onPlaceSelect={(place) => setTrip({ pickupPlace: place })}
              placeholder="Search hotel, address, or airport"
            />
            <div className="-mx-4 border-t hairline" />
            <LocationInput
              variant="route"
              marker="dropoff"
              label="Dropoff"
              value={trip.dropoffLocation}
              onChange={(value) => setTrip({ dropoffLocation: value })}
              onPlaceSelect={(place) => setTrip({ dropoffPlace: place })}
              placeholder="Search hotel, address, or airport"
            />
          </div>
        </div>

        {detectedAirport ? (
          <div className="col-span-2 -mt-1 flex items-center gap-2 text-xs font-semibold text-neutral-500">
            <span>Airport detected</span>
            <span className="rounded-full bg-[#f5efe2] px-2.5 py-1 font-black text-[#8f7241]">{detectedAirport} · {detectedAirport === "GMP" ? "Gimpo" : "Incheon"}</span>
          </div>
        ) : null}

        <div className={`col-span-2 grid grid-cols-2 rounded-xl border hairline bg-white ${isAirport ? "sm:grid-cols-3" : "sm:grid-cols-2"}`}>
          <CompactField label="Date">
            <DatePickerControl value={trip.pickupDate} min={minDate} onChange={(pickupDate) => setTrip({ pickupDate })} />
          </CompactField>
          <CompactField label="Time">
            <TimePickerControl value={trip.pickupTime} min={minTime} onChange={(pickupTime) => setTrip({ pickupTime })} />
          </CompactField>
          {isAirport ? (
            <CompactField label={trip.airportDirection === "arrival" ? "Arrival flight" : "Departure flight"} className="col-span-2 sm:col-span-1">
              <input className="w-full bg-transparent p-0 text-[15px] font-semibold tracking-tight text-ink outline-none tabular-nums placeholder:text-neutral-400" placeholder={trip.airportDirection === "arrival" ? "KE 086" : "KE 085"} value={trip.flightNumber} onChange={(event) => setTrip({ flightNumber: event.target.value })} />
            </CompactField>
          ) : null}
        </div>

        {isHourly ? (
          <label className="grid gap-1.5 text-[13px] font-bold md:gap-2 md:text-sm">
            Charter duration
            <select className="field" value={trip.hourlyDuration} onChange={(event) => setTrip({ hourlyDuration: Number(event.target.value) as 5 | 10 | 12 })}>
              <option value={5}>5 hours</option>
              <option value={10}>10 hours</option>
              <option value={12}>12 hours</option>
            </select>
          </label>
        ) : null}

        {isTour ? (
          <label className="col-span-2 grid gap-1.5 text-[13px] font-bold md:gap-2 md:text-sm">
            Tour product
            <select className="field" value={trip.tourProductSlug} onChange={(event) => setTrip({ tourProductSlug: event.target.value })}>
              {tourProducts.map((tour) => (
                <option key={tour.slug} value={tour.slug}>
                  {tour.name}
                </option>
              ))}
            </select>
          </label>
        ) : null}

        {!isAirport ? (
          <label className="col-span-2 grid gap-1.5 text-[13px] font-bold md:gap-2 md:text-sm">
            Stopover
            <input className="field" placeholder="Optional stopover or route note" value={trip.stopover} onChange={(event) => setTrip({ stopover: event.target.value })} />
          </label>
        ) : null}

        {isHourly || isTour ? (
          <label className="col-span-2 grid gap-1.5 text-[13px] font-bold md:gap-2 md:text-sm">
            Itinerary note
            <textarea className="field min-h-28" value={trip.itineraryNote} onChange={(event) => setTrip({ itineraryNote: event.target.value })} />
          </label>
        ) : null}

        <div className="col-span-2 grid overflow-hidden rounded-xl border hairline bg-white sm:grid-cols-2">
          <StepperField label="Passengers" hint="Including children" value={trip.passengers} min={1} onChange={(passengers) => setTrip({ passengers })} />
          <StepperField label="Luggage" hint="Check-in size" value={trip.luggage} min={0} onChange={(luggage) => setTrip({ luggage })} />
        </div>

        {isAirport ? (
          <button
            type="button"
            role="switch"
            aria-checked={trip.isRoundTrip}
            onClick={() => updateRoundTrip(!trip.isRoundTrip)}
            className={`col-span-2 flex items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left transition ${
              trip.isRoundTrip ? "border-[#e4d5b9] bg-[#f5efe2]" : "hairline bg-[#fbfaf7]"
            }`}
          >
            <span className="grid min-w-0 gap-0.5">
              <span className="text-sm font-black text-ink">Add return trip</span>
              <span className="text-xs font-semibold text-[#9a7b41]">Save 10% on airport round trip</span>
            </span>
            <span className={`flex h-7 w-12 shrink-0 items-center rounded-full p-1 transition ${trip.isRoundTrip ? "bg-ink" : "bg-neutral-300"}`}>
              <span className={`h-5 w-5 rounded-full bg-white transition ${trip.isRoundTrip ? "translate-x-5" : ""}`} />
            </span>
          </button>
        ) : null}

        {isAirport && trip.isRoundTrip ? (
          <>
            <div className="col-span-2 mt-1 border-t hairline pt-5">
              <div className="text-[11px] font-black uppercase tracking-[0.14em] text-neutral-500 md:text-xs">Return trip · different airport allowed</div>
            </div>
            <div className="col-span-2 overflow-hidden rounded-xl border hairline bg-white px-4">
              <div className="relative">
                <div className="absolute bottom-9 left-[10px] top-9 w-px bg-neutral-200" />
                <LocationInput
                  variant="route"
                  marker="pickup"
                  label="Pickup"
                  value={trip.returnPickupLocation}
                  onChange={(value) => setTrip({ returnPickupLocation: value })}
                  onPlaceSelect={(place) => setTrip({ returnPickupPlace: place })}
                  placeholder="Hotel, address, venue..."
                />
                <div className="-mx-4 border-t hairline" />
                <LocationInput
                  variant="route"
                  marker="dropoff"
                  label="Dropoff"
                  value={trip.returnDropoffLocation}
                  onChange={(value) => setTrip({ returnDropoffLocation: value })}
                  onPlaceSelect={(place) => setTrip({ returnDropoffPlace: place })}
                  placeholder="Gimpo Airport, Incheon Airport Terminal 2..."
                />
              </div>
            </div>
            <div className="col-span-2 grid grid-cols-2 rounded-xl border hairline bg-white sm:grid-cols-3">
              <CompactField label="Return date">
                <DatePickerControl value={trip.returnDate} min={trip.pickupDate || minDate} onChange={(returnDate) => setTrip({ returnDate })} />
              </CompactField>
              <CompactField label="Time">
                <TimePickerControl value={trip.returnTime} onChange={(returnTime) => setTrip({ returnTime })} />
              </CompactField>
              <CompactField label="Return flight" className="col-span-2 sm:col-span-1">
                <input className="w-full bg-transparent p-0 text-[15px] font-semibold tracking-tight text-ink outline-none tabular-nums placeholder:text-neutral-400" placeholder="KE 085" value={trip.returnFlight} onChange={(event) => setTrip({ returnFlight: event.target.value })} />
              </CompactField>
            </div>
          </>
        ) : null}
      </div>
      {isAirport ? <p className="mt-4 text-xs font-semibold leading-5 text-neutral-500">Flight tracking and meet-and-greet are included for airport transfers.</p> : null}
    </div>
  );
}

function isAirportName(value = "") {
  return /airport|icn|gmp|incheon|gimpo|공항|인천|김포/i.test(value);
}

function getAirportLocationFromTrip(pickupLocation: string, dropoffLocation: string) {
  if (isAirportName(pickupLocation)) return pickupLocation;
  if (isAirportName(dropoffLocation)) return dropoffLocation;
  return "ICN - Incheon Intl T2";
}

function getAirportCodeFromTrip(pickupLocation: string, dropoffLocation: string) {
  const route = `${pickupLocation} ${dropoffLocation}`.toLowerCase();
  if (/gmp|gimpo|김포/.test(route)) return "GMP";
  if (/icn|incheon|인천/.test(route)) return "ICN";
  return "";
}

function CompactField({ label, children, className = "" }: { label: string; children: ReactNode; className?: string }) {
  return (
    <label className={`relative grid gap-2 border-b border-r hairline px-4 py-3 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0 ${className}`}>
      <span className="text-[10px] font-black uppercase tracking-[0.14em] text-neutral-400">{label}</span>
      {children}
    </label>
  );
}

function StepperField({ label, hint, value, min, onChange }: { label: string; hint: string; value: number; min: number; onChange: (value: number) => void }) {
  return (
    <div className="grid grid-cols-[1fr_auto] items-center gap-3 border-b hairline px-4 py-3 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
      <div>
        <div className="text-[10px] font-black uppercase tracking-[0.14em] text-neutral-400">{label}</div>
        <div className="mt-0.5 text-xs font-semibold text-neutral-400">{hint}</div>
      </div>
      <div className="flex items-center gap-3">
        <button type="button" className="flex h-8 w-8 items-center justify-center rounded-full border hairline bg-white text-lg font-black text-neutral-500 transition hover:bg-neutral-50" onClick={() => onChange(Math.max(min, value - 1))}>
          -
        </button>
        <span className="min-w-5 text-center text-lg font-black tracking-tight text-ink tabular-nums">{value}</span>
        <button type="button" className="flex h-8 w-8 items-center justify-center rounded-full border hairline bg-white text-lg font-black text-ink transition hover:bg-neutral-50" onClick={() => onChange(value + 1)}>
          +
        </button>
      </div>
    </div>
  );
}

function DatePickerControl({ value, min, onChange }: { value: string; min: string; onChange: (value: string) => void }) {
  const [open, setOpen] = useState(false);
  const options = useMemo(() => getDateOptions(min, 120), [min]);

  return (
    <div className="relative">
      <button type="button" className={`flex w-full items-center justify-between gap-2 bg-transparent p-0 text-left text-[15px] font-semibold tracking-tight outline-none tabular-nums ${value ? "text-ink" : "text-neutral-400"}`} onClick={() => setOpen((current) => !current)} aria-expanded={open}>
        <span>{value ? formatDateLabel(value) : "Select date"}</span>
        <span className="text-neutral-500">⌄</span>
      </button>
      {open ? (
        <div className="absolute left-0 right-0 top-[calc(100%+12px)] z-50 max-h-64 overflow-y-auto rounded-xl border hairline bg-white p-1 shadow-[0_14px_36px_rgba(10,10,11,.14)]">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm font-semibold transition hover:bg-[#fbfaf7] ${option.value === value ? "bg-[#F5EFE2] text-[#8F7241]" : "text-ink"}`}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
            >
              <span>{option.label}</span>
              <span className="text-xs text-neutral-400">{option.weekday}</span>
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function TimePickerControl({ value, min, onChange }: { value: string; min?: string; onChange: (value: string) => void }) {
  const [open, setOpen] = useState(false);
  const options = useMemo(() => getTimeOptions(min, value), [min, value]);

  return (
    <div className="relative">
      <button type="button" className={`flex w-full items-center justify-between gap-2 bg-transparent p-0 text-left font-mono text-[15px] font-semibold tracking-tight outline-none tabular-nums ${value ? "text-ink" : "text-neutral-400"}`} onClick={() => setOpen((current) => !current)} aria-expanded={open}>
        <span>{value || "Select time"}</span>
        <span className="font-sans text-neutral-500">⌄</span>
      </button>
      {open ? (
        <div className="absolute left-0 right-0 top-[calc(100%+12px)] z-50 max-h-64 overflow-y-auto rounded-xl border hairline bg-white p-1 shadow-[0_14px_36px_rgba(10,10,11,.14)]">
          {options.map((option) => (
            <button
              key={option}
              type="button"
              className={`w-full rounded-lg px-3 py-2 text-left font-mono text-sm font-semibold tabular-nums transition hover:bg-[#fbfaf7] ${option === value ? "bg-[#F5EFE2] text-[#8F7241]" : "text-ink"}`}
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
            >
              {option}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function getDateOptions(min: string, days: number) {
  const start = parseDateValue(min) || new Date();
  return Array.from({ length: days }, (_, index) => {
    const date = new Date(start);
    date.setDate(start.getDate() + index);
    return {
      value: toDateValue(date),
      label: date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
      weekday: date.toLocaleDateString("en-US", { weekday: "short" })
    };
  });
}

function getTimeOptions(min?: string, currentValue?: string) {
  const options: string[] = [];
  for (let hour = 0; hour < 24; hour += 1) {
    for (let minute = 0; minute < 60; minute += 15) {
      const value = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
      if (!min || value >= min) options.push(value);
    }
  }
  if (currentValue && !options.includes(currentValue)) {
    options.push(currentValue);
    options.sort();
  }
  return options;
}

function formatDateLabel(value: string) {
  const date = parseDateValue(value);
  if (!date) return value;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function parseDateValue(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  if (!year || !month || !day) return null;
  return new Date(year, month - 1, day);
}

function toDateValue(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}
