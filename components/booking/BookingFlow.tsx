"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { vehiclePricing } from "@/lib/pricing/pricingData";
import { airportPickupInstruction } from "@/lib/pricing/calculateQuote";
import { getTourProduct } from "@/lib/pricing/tourProducts";
import type { BookingPayload, GuestDetails, PendingBookingResponse } from "@/lib/booking/types";
import { validateBookingPayload } from "@/lib/booking/validation";
import type { QuoteInput, QuoteResponse, ServiceType } from "@/lib/pricing/types";
import { BookingProgress } from "./BookingProgress";
import { ConfirmStep } from "./ConfirmStep";
import { ServiceStep } from "./ServiceStep";
import { TripDetailsStep, type TripForm } from "./TripDetailsStep";
import { VehicleStep } from "./VehicleStep";

function dateTimeValue(hoursFromNow: number) {
  const date = new Date(Date.now() + hoursFromNow * 60 * 60 * 1000);
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return date.toISOString().slice(0, 16);
}

function minDateTimeValue() {
  return dateTimeValue(3);
}

const defaultPickupDateTime = dateTimeValue(4);
const bookingSteps = ["Ride", "Vehicle", "Confirm"];
const nextLabels = ["Choose vehicle", "Review booking"];

type PayPalOrderResponse = {
  ok: true;
  order: {
    orderId: string;
  };
};

const initialTrip: TripForm = {
  pickupDate: defaultPickupDateTime.slice(0, 10),
  pickupTime: defaultPickupDateTime.slice(11, 16),
  pickupLocation: "Incheon International Airport Terminal 2",
  dropoffLocation: "Four Seasons Hotel Seoul",
  stopover: "",
  airportDirection: "arrival",
  flightNumber: "",
  isRoundTrip: false,
  returnPickupLocation: "",
  returnDropoffLocation: "",
  returnDate: "",
  returnTime: "",
  returnFlight: "",
  hourlyDuration: 5,
  itineraryNote: "",
  tourProductSlug: "seoul-city-tour-5h",
  passengers: 2,
  luggage: 2
};

const initialGuest: GuestDetails = {
  bookerName: "",
  bookerEmail: "",
  bookerPhone: "",
  bookingForSomeoneElse: false,
  guestName: "",
  guestPhone: "",
  signboardName: "",
  specialRequest: ""
};

export function BookingFlow() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [serviceType, setServiceType] = useState<ServiceType>("airport_transfer");
  const [trip, setTripState] = useState<TripForm>(initialTrip);
  const [vehicleCode, setVehicleCode] = useState("g90");
  const [guest, setGuestState] = useState<GuestDetails>(initialGuest);
  const [quotes, setQuotes] = useState<Record<string, QuoteResponse>>({});
  const [quoteLoading, setQuoteLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const minDateTime = useMemo(() => minDateTimeValue(), []);
  const selectedVehicle = vehiclePricing.find((vehicle) => vehicle.vehicleCode === vehicleCode) || vehiclePricing[0];
  const selectedQuote = quotes[vehicleCode] || null;

  function setTrip(patch: Partial<TripForm>) {
    setTripState((current) => ({ ...current, ...patch }));
  }

  function setGuest(patch: Partial<GuestDetails>) {
    setGuestState((current) => ({ ...current, ...patch }));
  }

  const buildQuoteInput = useCallback(
    (code = vehicleCode): QuoteInput => ({
      serviceType,
      pickupDate: trip.pickupDate,
      pickupTime: trip.pickupTime,
      pickupLocation: trip.pickupLocation,
      dropoffLocation: trip.dropoffLocation,
      pickupPlace: trip.pickupPlace,
      dropoffPlace: trip.dropoffPlace,
      stopover: trip.stopover,
      airport: "",
      airportDirection: trip.airportDirection,
      flightNumber: trip.flightNumber,
      isRoundTrip: trip.isRoundTrip,
      returnPickupLocation: trip.returnPickupLocation,
      returnDropoffLocation: trip.returnDropoffLocation,
      returnPickupPlace: trip.returnPickupPlace,
      returnDropoffPlace: trip.returnDropoffPlace,
      returnDate: trip.returnDate,
      returnTime: trip.returnTime,
      returnFlight: trip.returnFlight,
      hourlyDuration: trip.hourlyDuration,
      itineraryNote: trip.itineraryNote,
      tourProductSlug: trip.tourProductSlug,
      passengers: trip.passengers,
      luggage: trip.luggage,
      vehicleCode: code
    }),
    [serviceType, trip, vehicleCode]
  );

  useEffect(() => {
    let cancelled = false;

    async function loadQuotes() {
      setQuoteLoading(true);
      const nextQuotes: Record<string, QuoteResponse> = {};
      await Promise.all(
        vehiclePricing.map(async (vehicle) => {
          const response = await fetch("/api/quote", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(buildQuoteInput(vehicle.vehicleCode))
          });
          nextQuotes[vehicle.vehicleCode] = await response.json();
        })
      );
      if (!cancelled) {
        setQuotes(nextQuotes);
        setQuoteLoading(false);
      }
    }

    loadQuotes().catch((quoteError) => {
      if (!cancelled) {
        setError(quoteError instanceof Error ? quoteError.message : "Quotes could not be loaded.");
        setQuoteLoading(false);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [buildQuoteInput]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  function buildPayload(): BookingPayload {
    const tour = getTourProduct(trip.tourProductSlug);
    return {
      brand: "VIP Transfers Korea",
      source: "Website",
      serviceType,
      pickupDate: trip.pickupDate,
      pickupTime: trip.pickupTime,
      pickupLocation: trip.pickupLocation,
      dropoffLocation: trip.dropoffLocation,
      pickupPlace: trip.pickupPlace,
      dropoffPlace: trip.dropoffPlace,
      pickupRegion: selectedQuote?.pickupRegion,
      dropoffRegion: selectedQuote?.dropoffRegion,
      stopover: trip.stopover,
      airport: selectedQuote?.airport || "",
      airportDirection: trip.airportDirection,
      flightNumber: trip.flightNumber,
      isRoundTrip: trip.isRoundTrip,
      returnPickupLocation: trip.returnPickupLocation,
      returnDropoffLocation: trip.returnDropoffLocation,
      returnPickupPlace: trip.returnPickupPlace,
      returnDropoffPlace: trip.returnDropoffPlace,
      returnDate: trip.returnDate,
      returnTime: trip.returnTime,
      returnFlight: trip.returnFlight,
      hourlyDuration: trip.hourlyDuration,
      itineraryNote: trip.itineraryNote,
      tourProductSlug: trip.tourProductSlug,
      tourProductName: tour?.name,
      passengers: trip.passengers,
      luggage: trip.luggage,
      vehicleCode,
      vehicleName: selectedVehicle.vehicleName,
      requestedVehicleTypeCode: selectedVehicle.vehicleTypeCode,
      requestedVehicleTypeName: selectedVehicle.vehicleTypeName,
      selectedVehicleOptionName: selectedVehicle.vehicleName,
      quoteAmountUsd: selectedQuote?.finalPrice || 0,
      quoteAmountKrw: Math.round((selectedQuote?.finalPrice || 0) * 1350),
      quoteBreakdown: selectedQuote?.breakdown || [],
      requiresCustomQuote: Boolean(selectedQuote?.requiresCustomQuote),
      paymentStatus: "Unbilled",
      billingStatus: "Unbilled",
      status: selectedQuote?.requiresCustomQuote ? "Quote Requested" : "Pending Payment",
      assignmentStatus: "Unassigned",
      paymentProvider: "PayPal",
      customerTrackingEnabled: true,
      airportMeetingInstruction: serviceType === "airport_transfer" ? airportPickupInstruction : undefined,
      guest
    };
  }

  async function submitBooking() {
    setSubmitting(true);
    setError("");
    const payload = buildPayload();
    const validationErrors = validateBookingPayload(
      payload,
      selectedQuote?.requiresCustomQuote
        ? { allowCustomQuote: true, allowDraftTime: true, enforceVehicleCapacity: false, requirePositiveQuote: false }
        : { allowCustomQuote: false, requirePositiveQuote: true }
    );

    if (validationErrors.length) {
      setError(validationErrors.join(" "));
      setSubmitting(false);
      return;
    }

    try {
      if (selectedQuote?.requiresCustomQuote) {
        const result = await postJson<PendingBookingResponse>("/api/bookings/request-quote", payload);
        router.push(`/booking-confirmed?reservation=${result.reservationNo}&token=${result.trackingToken}&status=quote`);
        return;
      }

      const pending = await postJson<PendingBookingResponse>("/api/bookings/create-pending", payload);
      const order = await postJson<PayPalOrderResponse>("/api/paypal/create-order", pending.payload);
      if (!order.order.orderId) throw new Error("PayPal order could not be created.");

      await postJson<{ ok: true }>("/api/paypal/capture-order", { orderId: order.order.orderId });
      const confirmed = await postJson<PendingBookingResponse>("/api/bookings/confirm", { ...pending.payload, paypalOrderId: order.order.orderId });
      router.push(`/booking-confirmed?reservation=${confirmed.reservationNo}&token=${confirmed.trackingToken}&status=confirmed&amount=${payload.quoteAmountUsd}`);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Booking could not be submitted.");
    } finally {
      setSubmitting(false);
    }
  }

  const payload = buildPayload();
  const isFinalStep = step === bookingSteps.length - 1;
  const finalActionDisabled = submitting || !selectedQuote || (!selectedQuote.available && !selectedQuote.requiresCustomQuote);
  const finalActionLabel = submitting ? "Processing..." : selectedQuote?.requiresCustomQuote ? "Submit quote request" : "Continue to payment";
  const nextActionLabel = !isFinalStep ? nextLabels[step] : finalActionLabel;
  const stickyPriceLabel = selectedQuote?.available ? `$${selectedQuote.finalPrice}` : selectedQuote?.requiresCustomQuote ? "Custom" : "Quote";

  return (
    <div className="min-h-[calc(100vh-104px)] overflow-hidden bg-[#fbfaf7] shadow-[0_16px_44px_rgba(10,10,11,.07)] sm:rounded-lg">
      <div className={step === 0 ? "xl:grid xl:grid-cols-[minmax(0,1fr)_360px]" : ""}>
        <section className="px-5 pb-28 pt-5 sm:px-7 sm:pt-7 md:px-10 md:pb-0 md:pt-9 lg:px-14">
          <BookingProgress step={step} steps={bookingSteps} onStepClick={setStep} onBack={() => setStep(Math.max(0, step - 1))} />
          {error ? <div className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800 md:mb-5 md:p-4">{error}</div> : null}
          {step === 0 ? (
            <div className="grid gap-5 md:gap-7">
              <ServiceStep serviceType={serviceType} setServiceType={setServiceType} />
              <TripDetailsStep serviceType={serviceType} trip={trip} setTrip={setTrip} minDateTime={minDateTime} />
            </div>
          ) : null}
          {step === 1 ? <VehicleStep selectedVehicleCode={vehicleCode} setSelectedVehicleCode={setVehicleCode} quotes={quotes} loading={quoteLoading} tripSummary={`${trip.pickupLocation} to ${trip.dropoffLocation} · ${trip.passengers} pax · ${trip.luggage} luggage`} /> : null}
          {step === 2 ? <ConfirmStep guest={guest} setGuest={setGuest} payload={payload} quote={selectedQuote} submitting={submitting} onSubmit={submitBooking} /> : null}
          <div className={`fixed bottom-0 left-0 right-0 z-40 items-center justify-between gap-3 border-t hairline bg-[#fbfaf7]/95 px-5 py-3 shadow-[0_-12px_30px_rgba(10,10,11,.08)] backdrop-blur md:sticky md:-mx-10 md:mt-9 md:px-10 md:shadow-none lg:-mx-14 lg:px-14 ${step === 0 ? "flex xl:hidden" : "flex"}`}>
            <div className="min-w-0">
              <div className="text-[10px] font-black uppercase tracking-[0.12em] text-neutral-400">Estimated</div>
              <div className="mt-0.5 flex items-baseline gap-1">
                <span className="font-mono text-xl font-semibold text-ink">{stickyPriceLabel}</span>
                <span className="text-xs font-semibold text-neutral-500">{selectedQuote?.available ? "from" : selectedQuote?.requiresCustomQuote ? "quote" : "pending"}</span>
              </div>
            </div>
            {!isFinalStep ? (
              <button type="button" className="btn btn-dark btn-pill min-w-[168px]" onClick={() => setStep(Math.min(bookingSteps.length - 1, step + 1))}>
                {nextActionLabel}
              </button>
            ) : (
              <button type="button" className="btn btn-dark btn-pill min-w-[168px]" onClick={submitBooking} disabled={finalActionDisabled}>
                {nextActionLabel}
              </button>
            )}
          </div>
        </section>
        {step === 0 ? (
          <aside className="hidden border-l hairline bg-white/72 p-8 xl:block">
            <TripSummaryCard
              payload={payload}
              quote={selectedQuote}
              vehicleName={selectedVehicle.vehicleName}
              quoteLoading={quoteLoading}
              onAction={() => setStep(1)}
            />
          </aside>
        ) : null}
      </div>
    </div>
  );
}

async function postJson<T>(url: string, body: unknown): Promise<T> {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  const result = await response.json().catch(() => ({}));

  if (!response.ok || result.ok === false) {
    const message = Array.isArray(result.errors) ? result.errors.join(" ") : result.error || `Request failed with status ${response.status}.`;
    throw new Error(message);
  }

  return result as T;
}

function TripSummaryCard({
  payload,
  quote,
  vehicleName,
  quoteLoading,
  onAction
}: {
  payload: BookingPayload;
  quote: QuoteResponse | null;
  vehicleName: string;
  quoteLoading: boolean;
  onAction: () => void;
}) {
  return (
    <div className="sticky top-28 rounded-xl border hairline bg-white p-5 shadow-[0_10px_32px_rgba(10,10,11,.05)]">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-base font-black text-ink">Trip summary</h2>
        {payload.isRoundTrip ? <span className="rounded-full bg-[#f5efe2] px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.1em] text-[#9a7b41]">Round trip · -10%</span> : null}
      </div>
      <div className="mt-5 grid gap-4 text-sm">
        <div className="relative grid gap-3 pl-6">
          <span className="absolute bottom-4 left-[5px] top-2 w-px bg-neutral-200" />
          <div className="relative">
            <span className="absolute -left-6 top-1.5 h-2.5 w-2.5 rounded-full bg-ink" />
            <div className="font-black text-ink">{shortPlace(payload.pickupLocation)}</div>
            <div className="mt-0.5 text-xs font-semibold text-neutral-400">
              {payload.pickupDate} · {payload.pickupTime}
              {payload.flightNumber ? ` · ${payload.flightNumber}` : ""}
            </div>
          </div>
          <div className="relative">
            <span className="absolute -left-6 top-1.5 h-2.5 w-2.5 rounded-sm bg-[#b8955a]" />
            <div className="font-black text-ink">{shortPlace(payload.dropoffLocation)}</div>
            <div className="mt-0.5 text-xs font-semibold text-neutral-400">
              {payload.passengers} pax · {payload.luggage} luggage
            </div>
          </div>
        </div>
        <div className="border-t hairline pt-4">
          <div className="flex justify-between gap-4">
            <span className="text-neutral-500">{formatService(payload.serviceType)}</span>
            <span className="text-right font-semibold text-ink">{quoteLoading ? "Calculating" : quote?.available ? "Instant quote" : quote?.requiresCustomQuote ? "Custom quote" : "Pending"}</span>
          </div>
          <div className="mt-3 flex justify-between gap-4">
            <span className="text-neutral-500">Vehicle</span>
            <span className="text-right font-semibold text-ink">{vehicleName}</span>
          </div>
        </div>
        {quote?.available ? (
          <div className="border-t hairline pt-4">
            {quote.breakdown.slice(0, 3).map((item) => (
              <div key={item.label} className="mb-2 flex justify-between gap-4 text-sm">
                <span className="text-neutral-500">{item.label}</span>
                <span className="font-mono font-semibold text-ink">{item.amount < 0 ? "-" : ""}${Math.abs(item.amount)}</span>
              </div>
            ))}
            <div className="mt-4 flex items-end justify-between gap-4">
              <span className="font-black text-ink">Total</span>
              <span className="font-mono text-2xl font-semibold text-ink">${quote.finalPrice}</span>
            </div>
          </div>
        ) : null}
      </div>
      <button type="button" onClick={onAction} className="btn btn-dark btn-pill mt-6 w-full">
        Choose vehicle
      </button>
      <p className="mt-4 text-xs font-semibold leading-5 text-neutral-400">Free cancellation up to 24h · Fixed price after confirmation</p>
    </div>
  );
}

function shortPlace(value: string) {
  return value.replace("International Airport Terminal", "Intl Airport · T").replace("International Airport", "Intl Airport");
}

function formatService(serviceType: string) {
  return serviceType.replace(/_/g, " ");
}
