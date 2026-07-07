import type { BookingPayload } from "./types";
import { getVehiclePricing } from "../pricing/pricingData";
import { getServiceRule } from "../pricing/serviceRules";

type BookingValidationOptions = {
  allowCustomQuote?: boolean;
  allowDraftTime?: boolean;
  enforceVehicleCapacity?: boolean;
  requirePayPalOrderId?: boolean;
  requirePositiveQuote?: boolean;
  requireReservationNo?: boolean;
  requireTrackingToken?: boolean;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizeBookingPayload(input: Partial<BookingPayload>): BookingPayload {
  const vehicle = getVehiclePricing(clean(input.vehicleCode));
  const guest = input.guest || ({} as BookingPayload["guest"]);

  return {
    ...input,
    brand: "VIP Transfers Korea",
    source: "Website",
    serviceType: input.serviceType as BookingPayload["serviceType"],
    pickupDate: clean(input.pickupDate),
    pickupTime: clean(input.pickupTime),
    pickupLocation: clean(input.pickupLocation),
    dropoffLocation: clean(input.dropoffLocation),
    stopover: clean(input.stopover),
    airport: clean(input.airport),
    airportDirection: input.airportDirection,
    flightNumber: clean(input.flightNumber),
    isRoundTrip: Boolean(input.isRoundTrip),
    returnPickupLocation: clean(input.returnPickupLocation),
    returnDropoffLocation: clean(input.returnDropoffLocation),
    returnDate: clean(input.returnDate),
    returnTime: clean(input.returnTime),
    returnFlight: clean(input.returnFlight),
    hourlyDuration: input.hourlyDuration,
    itineraryNote: clean(input.itineraryNote),
    tourProductSlug: clean(input.tourProductSlug),
    tourProductName: clean(input.tourProductName),
    passengers: safeInteger(input.passengers, 0),
    luggage: safeInteger(input.luggage, 0),
    vehicleCode: clean(input.vehicleCode),
    vehicleName: vehicle?.vehicleName || clean(input.vehicleName),
    requestedVehicleTypeCode: vehicle?.vehicleTypeCode || input.requestedVehicleTypeCode,
    requestedVehicleTypeName: vehicle?.vehicleTypeName || clean(input.requestedVehicleTypeName),
    selectedVehicleOptionName: vehicle?.vehicleName || clean(input.selectedVehicleOptionName),
    quoteAmountUsd: safeMoney(input.quoteAmountUsd),
    quoteAmountKrw: safeMoney(input.quoteAmountKrw),
    quoteBreakdown: Array.isArray(input.quoteBreakdown) ? input.quoteBreakdown : [],
    requiresCustomQuote: Boolean(input.requiresCustomQuote),
    paymentStatus: input.paymentStatus || "Unbilled",
    billingStatus: input.billingStatus || "Unbilled",
    status: input.status || "Pending Payment",
    assignmentStatus: "Unassigned",
    paymentProvider: input.paymentProvider,
    paymentId: clean(input.paymentId),
    paypalOrderId: clean(input.paypalOrderId),
    customerTrackingToken: clean(input.customerTrackingToken),
    customerTrackingEnabled: Boolean(input.customerTrackingEnabled),
    airportMeetingInstruction: clean(input.airportMeetingInstruction),
    guest: {
      bookerName: clean(guest.bookerName),
      bookerEmail: clean(guest.bookerEmail),
      bookerPhone: clean(guest.bookerPhone),
      bookingForSomeoneElse: Boolean(guest.bookingForSomeoneElse),
      guestName: clean(guest.guestName),
      guestPhone: clean(guest.guestPhone),
      signboardName: clean(guest.signboardName),
      specialRequest: clean(guest.specialRequest)
    }
  } as BookingPayload;
}

export function validateGuestDetails(payload: BookingPayload) {
  const errors: string[] = [];
  if (!payload.guest.bookerName.trim()) errors.push("Booker name is required.");
  if (!emailPattern.test(payload.guest.bookerEmail)) errors.push("A valid email is required.");
  if (!payload.guest.bookerPhone.trim()) errors.push("Phone / WhatsApp is required.");
  if (payload.guest.bookingForSomeoneElse && !payload.guest.guestName.trim()) errors.push("Guest name is required.");
  if (payload.guest.bookingForSomeoneElse && !payload.guest.guestPhone.trim()) errors.push("Guest phone is required.");
  if (payload.serviceType === "airport_transfer" && !payload.flightNumber?.trim()) errors.push("Flight number is required for airport pickups.");
  if (payload.serviceType === "airport_transfer" && payload.isRoundTrip) {
    if (!payload.returnPickupLocation?.trim()) errors.push("Return pickup location is required.");
    if (!payload.returnDropoffLocation?.trim()) errors.push("Return dropoff airport is required.");
    if (!payload.returnDate?.trim()) errors.push("Return date is required.");
    if (!payload.returnTime?.trim()) errors.push("Return time is required.");
    if (!payload.returnFlight?.trim()) errors.push("Return flight number is required.");
  }
  return errors;
}

export function validateBookingPayload(input: BookingPayload, options: BookingValidationOptions = {}) {
  const payload = normalizeBookingPayload(input);
  const errors = validateGuestDetails(payload);
  const serviceRule = getServiceRule(payload.serviceType);
  const vehicle = getVehiclePricing(payload.vehicleCode);
  const allowDraftTime = options.allowDraftTime === true && payload.requiresCustomQuote;
  const enforceVehicleCapacity = options.enforceVehicleCapacity !== false;

  if (!serviceRule) errors.push("Service type is required.");
  if (!payload.pickupDate || !isValidDate(payload.pickupDate)) errors.push("Pickup date is required.");
  if (!allowDraftTime && (!payload.pickupTime || !isValidTime(payload.pickupTime))) errors.push("Pickup time is required.");
  if (payload.pickupDate && payload.pickupTime && serviceRule) {
    const advanceError = validateAdvanceTime(payload.pickupDate, payload.pickupTime, serviceRule.minAdvanceHours);
    if (advanceError) errors.push(advanceError);
  }

  if (!payload.pickupLocation) errors.push("Pickup location is required.");
  if (payload.serviceType !== "hourly_charter" && !payload.dropoffLocation) errors.push("Dropoff location is required.");

  if (!Number.isInteger(payload.passengers) || payload.passengers < 1) errors.push("Passenger count must be at least 1.");
  if (!Number.isInteger(payload.luggage) || payload.luggage < 0) errors.push("Luggage count cannot be negative.");

  if (!vehicle) {
    errors.push("Selected vehicle is not available.");
  } else if (enforceVehicleCapacity && (payload.passengers > vehicle.maxPax || payload.luggage > vehicle.maxLuggage)) {
    errors.push(`${vehicle.vehicleTypeName} cannot fit ${payload.passengers} passengers and ${payload.luggage} luggage.`);
  }

  if (!options.allowCustomQuote && payload.requiresCustomQuote) errors.push("Custom quote requests must use the quote request endpoint.");
  if (options.requirePositiveQuote && payload.quoteAmountUsd <= 0) errors.push("A positive quoted amount is required before payment.");
  if (options.requireReservationNo && !payload.reservationNo?.trim()) errors.push("Reservation number is required.");
  if (options.requireTrackingToken && !payload.customerTrackingToken?.trim()) errors.push("Customer tracking token is required.");
  if (options.requirePayPalOrderId && !payload.paypalOrderId?.trim()) errors.push("PayPal order ID is required.");

  return errors.filter((error, index) => errors.indexOf(error) === index);
}

function validateAdvanceTime(date: string, time: string, minAdvanceHours: number) {
  const pickupAt = new Date(`${date}T${time}`);
  if (Number.isNaN(pickupAt.getTime())) return "Pickup date and time is invalid.";

  const minimum = Date.now() + minAdvanceHours * 60 * 60 * 1000;
  if (pickupAt.getTime() < minimum) {
    return `Bookings must be made at least ${minAdvanceHours} hours in advance. For urgent requests, please contact us on WhatsApp.`;
  }

  return "";
}

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function safeInteger(value: unknown, fallback: number) {
  const numberValue = typeof value === "number" ? value : Number(value);
  return Number.isFinite(numberValue) ? Math.trunc(numberValue) : fallback;
}

function safeMoney(value: unknown) {
  const numberValue = typeof value === "number" ? value : Number(value);
  return Number.isFinite(numberValue) && numberValue > 0 ? Math.round(numberValue) : 0;
}

function isValidDate(value: string) {
  return /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(new Date(`${value}T00:00`).getTime());
}

function isValidTime(value: string) {
  return /^\d{2}:\d{2}$/.test(value);
}
