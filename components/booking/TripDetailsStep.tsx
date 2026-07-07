"use client";

import { tourProducts } from "@/lib/pricing/tourProducts";
import type { AirportDirection, PlaceSnapshot, ServiceType } from "@/lib/pricing/types";
import { AirportMeetingNotice } from "./AirportMeetingNotice";
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
      <h2 className="text-xl font-black leading-tight md:text-2xl">Trip details</h2>
      <div className="mt-3 grid grid-cols-2 gap-2.5 md:mt-5 md:gap-4">
        <label className="grid gap-1.5 text-[13px] font-bold md:gap-2 md:text-sm">
          Pickup date
          <input className="field" type="date" min={minDate} value={trip.pickupDate} onChange={(event) => setTrip({ pickupDate: event.target.value })} />
        </label>
        <label className="grid gap-1.5 text-[13px] font-bold md:gap-2 md:text-sm">
          Pickup time
          <input className="field" type="time" min={minTime} value={trip.pickupTime} onChange={(event) => setTrip({ pickupTime: event.target.value })} />
        </label>

        {isAirport ? (
          <div className="col-span-2 flex items-center justify-between gap-2 border hairline bg-white p-1 text-sm font-bold">
            <span className="pl-2 text-[10px] font-black uppercase tracking-[0.1em] text-neutral-500 md:pl-3 md:text-xs md:tracking-[0.12em]">Airport ride</span>
            <div className="grid min-w-[150px] grid-cols-2 md:min-w-[188px]">
              {[
                ["arrival", "From"],
                ["departure", "To"]
              ].map(([value, title]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => updateAirportDirection(value as AirportDirection)}
                  className={`h-9 px-2 text-center text-[13px] font-black md:h-10 md:px-3 md:text-sm ${trip.airportDirection === value ? "bg-ivory text-black" : "text-neutral-500"}`}
                >
                  {title}
                </button>
              ))}
            </div>
          </div>
        ) : null}

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

        <LocationInput
          label="Pickup location"
          value={trip.pickupLocation}
          onChange={(value) => setTrip({ pickupLocation: value })}
          onPlaceSelect={(place) => setTrip({ pickupPlace: place })}
          placeholder="Hotel, address, airport, venue..."
        />
        <LocationInput
          label="Dropoff location"
          value={trip.dropoffLocation}
          onChange={(value) => setTrip({ dropoffLocation: value })}
          onPlaceSelect={(place) => setTrip({ dropoffPlace: place })}
          placeholder="Hotel, address, airport, venue..."
        />

        {isAirport ? (
          <label className="grid gap-1.5 text-[13px] font-bold md:gap-2 md:text-sm">
            {trip.airportDirection === "arrival" ? "Arrival flight number" : "Departure flight number"}
            <input className="field" placeholder={trip.airportDirection === "arrival" ? "KE082, OZ202..." : "KE085, OZ203..."} value={trip.flightNumber} onChange={(event) => setTrip({ flightNumber: event.target.value })} />
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

        <label className="grid gap-1.5 text-[13px] font-bold md:gap-2 md:text-sm">
          Passengers
          <input className="field" type="number" min="1" value={trip.passengers} onChange={(event) => setTrip({ passengers: Number(event.target.value) })} />
        </label>
        <label className="grid gap-1.5 text-[13px] font-bold md:gap-2 md:text-sm">
          Luggage
          <input className="field" type="number" min="0" value={trip.luggage} onChange={(event) => setTrip({ luggage: Number(event.target.value) })} />
        </label>

        {isAirport ? (
          <label className="col-span-2 flex flex-wrap items-center gap-2.5 border hairline bg-ivory p-3 text-[13px] font-bold md:gap-3 md:p-4 md:text-sm">
            <input type="checkbox" checked={trip.isRoundTrip} onChange={(event) => updateRoundTrip(event.target.checked)} />
            Round-trip airport booking
            <span className="ml-auto text-xs text-[#9a7b41] md:text-sm">10% round-trip discount</span>
          </label>
        ) : null}

        {isAirport && trip.isRoundTrip ? (
          <>
            <div className="col-span-2 mt-2 border-t hairline pt-5">
              <div className="text-[11px] font-black uppercase tracking-[0.14em] text-[#9a7b41] md:text-xs">Return transfer</div>
              <p className="mt-2 text-sm leading-6 text-neutral-600">Return airport can be different, such as arrival at ICN and departure from GMP.</p>
            </div>
            <LocationInput
              label="Return pickup location"
              value={trip.returnPickupLocation}
              onChange={(value) => setTrip({ returnPickupLocation: value })}
              onPlaceSelect={(place) => setTrip({ returnPickupPlace: place })}
              placeholder="Hotel, address, venue..."
            />
            <LocationInput
              label="Return dropoff airport"
              value={trip.returnDropoffLocation}
              onChange={(value) => setTrip({ returnDropoffLocation: value })}
              onPlaceSelect={(place) => setTrip({ returnDropoffPlace: place })}
              placeholder="Gimpo Airport, Incheon Airport Terminal 2..."
            />
            <label className="grid gap-1.5 text-[13px] font-bold md:gap-2 md:text-sm">
              Return date
              <input className="field" type="date" min={trip.pickupDate || minDate} value={trip.returnDate} onChange={(event) => setTrip({ returnDate: event.target.value })} />
            </label>
            <label className="grid gap-1.5 text-[13px] font-bold md:gap-2 md:text-sm">
              Return time
              <input className="field" type="time" value={trip.returnTime} onChange={(event) => setTrip({ returnTime: event.target.value })} />
            </label>
            <label className="col-span-2 grid gap-1.5 text-[13px] font-bold md:gap-2 md:text-sm">
              Return departure flight
              <input className="field" placeholder="KE085, OZ203..." value={trip.returnFlight} onChange={(event) => setTrip({ returnFlight: event.target.value })} />
            </label>
          </>
        ) : null}
      </div>
      {isAirport ? (
        <div className="mt-4 md:mt-6">
          <AirportMeetingNotice direction={trip.airportDirection} />
        </div>
      ) : null}
    </div>
  );
}

function isAirportName(value = "") {
  return /airport|icn|gmp|incheon|gimpo|공항|인천|김포/i.test(value);
}

function getAirportLocationFromTrip(pickupLocation: string, dropoffLocation: string) {
  if (isAirportName(pickupLocation)) return pickupLocation;
  if (isAirportName(dropoffLocation)) return dropoffLocation;
  return "Incheon International Airport Terminal 2";
}
