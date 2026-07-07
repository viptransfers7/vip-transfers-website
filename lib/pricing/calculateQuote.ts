import { getVehiclePricing } from "./pricingData";
import { detectAirport, findRegion } from "./regionRules";
import { getServiceRule } from "./serviceRules";
import { getTourProduct, getTourVehiclePrice } from "./tourProducts";
import type { AirportCode, PlaceSnapshot, QuoteBreakdownItem, QuoteInput, QuoteResponse, RegionRule, ServiceType, VehiclePricing } from "./types";

const airportMeetingInstruction = "We track your flight. After baggage claim, please proceed to the arrival hall. Your chauffeur will meet you with your name sign.";

export function calculateQuote(input: QuoteInput): QuoteResponse {
  const vehicle = getVehiclePricing(input.vehicleCode);
  const serviceRule = getServiceRule(input.serviceType);

  if (!vehicle) return unavailable(input, "Vehicle is not available.", "change_vehicle");
  if (!serviceRule) return unavailable(input, "Service type is not available.", "request_quote", vehicle);

  const advanceError = validateAdvanceTime(input.pickupDate, input.pickupTime, serviceRule.minAdvanceHours);
  if (advanceError) return unavailable(input, advanceError, "change_time", vehicle);

  if (input.passengers > vehicle.maxPax || input.luggage > vehicle.maxLuggage) {
    return unavailable(
      input,
      `${vehicle.vehicleTypeName} cannot fit ${input.passengers} passengers and ${input.luggage} luggage. Please choose a larger vehicle.`,
      "change_vehicle",
      vehicle
    );
  }

  if (input.serviceType === "custom_quote") {
    return customQuote(input, vehicle, "This itinerary will be reviewed by our concierge team.");
  }

  if (input.serviceType === "airport_transfer") return calculateAirportQuote(input, vehicle);
  if (input.serviceType === "point_to_point") return calculatePointToPointQuote(input, vehicle);
  if (input.serviceType === "hourly_charter") return calculateHourlyQuote(input, vehicle);
  if (input.serviceType === "private_tour") return calculateTourQuote(input, vehicle);

  return unavailable(input, "Service type is not supported.", "request_quote", vehicle);
}

function calculateAirportQuote(input: QuoteInput, vehicle: VehiclePricing): QuoteResponse {
  if (input.stopover?.trim()) return customQuote(input, vehicle, "Airport transfers with stopovers require concierge review.");

  const outbound = calculateAirportLeg(
    vehicle,
    input.pickupLocation,
    input.dropoffLocation,
    input.pickupPlace,
    input.dropoffPlace,
    input.stopover,
    input.airport,
    input.isRoundTrip ? "Outbound" : undefined
  );
  if (outbound.reason) return customQuote(input, vehicle, outbound.reason);

  const breakdown: QuoteBreakdownItem[] = [...outbound.breakdown];
  let finalPrice = outbound.price;

  if (input.isRoundTrip) {
    const returnPickupLocation = input.returnPickupLocation || input.dropoffLocation;
    const returnDropoffLocation = input.returnDropoffLocation || input.pickupLocation;
    const returnLeg = calculateAirportLeg(vehicle, returnPickupLocation, returnDropoffLocation, input.returnPickupPlace, input.returnDropoffPlace, undefined, undefined, "Return");
    if (returnLeg.reason) return customQuote(input, vehicle, returnLeg.reason);

    breakdown.push(...returnLeg.breakdown);
    const subtotal = outbound.price + returnLeg.price;
    const discount = roundMoney(subtotal * 0.1);
    finalPrice = roundMoney(subtotal - discount);
    breakdown.push({ label: "Round trip subtotal", amount: subtotal }, { label: "Round trip discount 10%", amount: -discount });
  }

  return {
    available: true,
    requiresCustomQuote: false,
    quoteType: "instant",
    serviceType: "airport_transfer",
    vehicleCode: vehicle.vehicleCode,
    vehicleName: vehicle.vehicleName,
    ...vehicleQuoteFields(vehicle),
    currency: "USD",
    basePrice: outbound.price,
    finalPrice,
    pickupRegion: outbound.pickupRegion?.regionName,
    dropoffRegion: outbound.dropoffRegion?.regionName,
    airport: outbound.airport,
    breakdown,
    suggestedAction: "pay_now",
    notes: [airportMeetingInstruction]
  };
}

function calculateAirportLeg(
  vehicle: VehiclePricing,
  pickupLocation: string,
  dropoffLocation: string,
  pickupPlace?: PlaceSnapshot,
  dropoffPlace?: PlaceSnapshot,
  stopover = "",
  preferredAirport: AirportCode | "" = "",
  labelPrefix = ""
) {
  const pickupText = locationText(pickupLocation, pickupPlace);
  const dropoffText = locationText(dropoffLocation, dropoffPlace);
  const pickupAirport = detectAirport(pickupText);
  const dropoffAirport = detectAirport(dropoffText);
  const airport = preferredAirport || pickupAirport || dropoffAirport;
  if (!airport) {
    return {
      price: 0,
      breakdown: [] as QuoteBreakdownItem[],
      airport: undefined,
      pickupRegion: undefined,
      dropoffRegion: undefined,
      reason: labelPrefix
        ? `${labelPrefix} transfer needs ICN or GMP airport pricing.`
        : "Please choose ICN or GMP for airport transfer pricing."
    };
  }
  if (pickupAirport && dropoffAirport) {
    return {
      price: 0,
      breakdown: [] as QuoteBreakdownItem[],
      airport,
      pickupRegion: undefined,
      dropoffRegion: undefined,
      reason: "Airport-to-airport transfers require concierge review."
    };
  }

  const pickupRegion = findRegion(pickupText);
  const dropoffRegion = findRegion(dropoffText);
  const serviceRegion = pickupAirport ? dropoffRegion : pickupRegion;
  if (!serviceRegion) {
    return {
      price: 0,
      breakdown: [] as QuoteBreakdownItem[],
      airport,
      pickupRegion,
      dropoffRegion,
      reason: labelPrefix
        ? `${labelPrefix} transfer destination could not be matched to an auto-quote service region.`
        : "We could not confidently match the airport transfer route to an auto-quote service region."
    };
  }

  const customRegion = [serviceRegion].find((region) => region?.requiresCustomQuote || region?.isServiceArea === false);
  if (customRegion) {
    return {
      price: 0,
      breakdown: [] as QuoteBreakdownItem[],
      airport,
      pickupRegion,
      dropoffRegion,
      reason: customRegion.quoteMessage || "This airport route requires a custom quote."
    };
  }

  const flat = airport === "GMP" ? vehicle.gmpFlatUsd : vehicle.icnFlatUsd;
  const regionExtraUnits = airportExtraUnits(serviceRegion, airport);
  const regionExtra = roundMoney(regionExtraUnits * 0.5 * vehicle.hourlyRateUsd);
  const prefix = labelPrefix ? `${labelPrefix} ` : "";
  const breakdown: QuoteBreakdownItem[] = [{ label: `${prefix}${airport} flat rate`, amount: flat }];
  if (regionExtra) breakdown.push({ label: `${prefix}region extra`, amount: regionExtra });

  return {
    price: roundMoney(flat + regionExtra),
    breakdown,
    airport,
    pickupRegion,
    dropoffRegion,
    reason: ""
  };
}

function calculatePointToPointQuote(input: QuoteInput, vehicle: VehiclePricing): QuoteResponse {
  const pickupText = locationText(input.pickupLocation, input.pickupPlace);
  const dropoffText = locationText(input.dropoffLocation, input.dropoffPlace);
  const airport = detectAirport(`${pickupText} ${dropoffText}`);
  if (airport) return customQuote(input, vehicle, "This route includes an airport. Please book it as an Airport Transfer.");

  const pickupRegion = findRegion(pickupText);
  const dropoffRegion = findRegion(dropoffText);
  const hasStopover = Boolean(input.stopover?.trim());
  const stopoverRegion = hasStopover ? findRegion(input.stopover) : undefined;
  const customRegion = [pickupRegion, dropoffRegion, stopoverRegion].find((region) => region?.requiresCustomQuote || region?.isServiceArea === false);
  if (customRegion) return customQuote(input, vehicle, customRegion.quoteMessage || "This point-to-point route requires a custom quote.");
  const unknownRegion = !pickupRegion || !dropoffRegion;
  if (unknownRegion) return customQuote(input, vehicle, "We could not confidently match this route to an auto-quote region.");
  if (hasStopover && !stopoverRegion) return customQuote(input, vehicle, "We could not confidently match the stopover to an auto-quote region.");

  const base = roundMoney(vehicle.seoulPtpHours * vehicle.hourlyRateUsd);
  const regionExtraUnits = Math.max(pointToPointExtraUnits(pickupRegion), pointToPointExtraUnits(dropoffRegion), pointToPointExtraUnits(stopoverRegion));
  const regionExtra = roundMoney(regionExtraUnits * 0.5 * vehicle.hourlyRateUsd);
  const stopoverFee = hasStopover ? roundMoney(vehicle.hourlyRateUsd * 0.5) : 0;
  const breakdown: QuoteBreakdownItem[] = [{ label: "Seoul point-to-point base", amount: base }];
  if (regionExtra) breakdown.push({ label: "Region extra", amount: regionExtra });
  if (stopoverFee) breakdown.push({ label: "Extra stop", amount: stopoverFee });

  return {
    available: true,
    requiresCustomQuote: false,
    quoteType: "instant",
    serviceType: "point_to_point",
    vehicleCode: vehicle.vehicleCode,
    vehicleName: vehicle.vehicleName,
    ...vehicleQuoteFields(vehicle),
    currency: "USD",
    basePrice: base,
    finalPrice: roundMoney(base + regionExtra + stopoverFee),
    pickupRegion: pickupRegion.regionName,
    dropoffRegion: dropoffRegion.regionName,
    breakdown,
    suggestedAction: "pay_now",
    notes: ["Point-to-point quotes are based on service regions, not Google Maps distance."]
  };
}

function calculateHourlyQuote(input: QuoteInput, vehicle: VehiclePricing): QuoteResponse {
  const duration = input.hourlyDuration || 5;
  const packagePrice = duration === 12 ? vehicle.charter12hUsd : duration === 10 ? vehicle.charter10hUsd : vehicle.charter5hUsd;
  const pickupRegion = findRegion(locationText(input.pickupLocation, input.pickupPlace));
  const dropoffRegion = findRegion(locationText(input.dropoffLocation, input.dropoffPlace));
  const hasStopover = Boolean(input.stopover?.trim());
  const stopoverRegion = hasStopover ? findRegion(input.stopover) : undefined;
  const customRegion = [pickupRegion, dropoffRegion, stopoverRegion].find((region) => region?.requiresCustomQuote || region?.isServiceArea === false);
  if (customRegion) return customQuote(input, vehicle, customRegion.quoteMessage || "This charter itinerary requires a custom quote.");
  if (!pickupRegion || !dropoffRegion) return customQuote(input, vehicle, "Hourly charter pickup and dropoff must match an auto-quote service region.");
  if (hasStopover && !stopoverRegion) return customQuote(input, vehicle, "Hourly charter stopover could not be matched to an auto-quote service region.");

  const regionExtraUnits = Math.max(hourlyDispatchExtraUnits(pickupRegion), hourlyDispatchExtraUnits(dropoffRegion), hourlyDispatchExtraUnits(stopoverRegion));
  const regionExtra = roundMoney(regionExtraUnits * 0.5 * vehicle.hourlyRateUsd);
  const breakdown: QuoteBreakdownItem[] = [{ label: `${duration}-hour charter package`, amount: packagePrice }];
  if (regionExtra) breakdown.push({ label: "Region extra", amount: regionExtra });

  return {
    available: true,
    requiresCustomQuote: false,
    quoteType: "instant",
    serviceType: "hourly_charter",
    vehicleCode: vehicle.vehicleCode,
    vehicleName: vehicle.vehicleName,
    ...vehicleQuoteFields(vehicle),
    currency: "USD",
    basePrice: packagePrice,
    finalPrice: roundMoney(packagePrice + regionExtra),
    pickupRegion: pickupRegion?.regionName,
    dropoffRegion: dropoffRegion?.regionName,
    breakdown,
    suggestedAction: "pay_now",
    notes: ["Hourly charter uses fixed 5h / 10h / 12h package pricing. Stopovers and itinerary notes are kept with the booking."]
  };
}

function calculateTourQuote(input: QuoteInput, vehicle: VehiclePricing): QuoteResponse {
  const tour = getTourProduct(input.tourProductSlug);
  if (!tour) return customQuote(input, vehicle, "Please select a private tour product.");
  if (tour.requiresCustomQuote) return customQuote(input, vehicle, `${tour.name} requires concierge review before payment.`);
  const pickupRegion = findRegion(locationText(input.pickupLocation, input.pickupPlace));
  if (tour.pickupArea.toLowerCase() === "seoul" && !pickupRegion?.isBaseArea) {
    return customQuote(input, vehicle, `${tour.name} auto-pricing is available for Seoul pickup only.`);
  }

  const tourPrice = getTourVehiclePrice(tour.slug, vehicle.vehicleCode);
  if (!tourPrice) return customQuote(input, vehicle, `${tour.name} is not auto-priced for ${vehicle.vehicleTypeName}.`);

  return {
    available: true,
    requiresCustomQuote: false,
    quoteType: "instant",
    serviceType: "private_tour",
    vehicleCode: vehicle.vehicleCode,
    vehicleName: vehicle.vehicleName,
    ...vehicleQuoteFields(vehicle),
    currency: "USD",
    basePrice: tourPrice.priceUsd,
    finalPrice: tourPrice.priceUsd,
    breakdown: [{ label: `${tour.name} package`, amount: tourPrice.priceUsd }],
    suggestedAction: "pay_now",
    notes: [`${tour.durationHours}-hour private tour package.`, ...tour.included.map((item) => `Included: ${item}`)]
  };
}

function customQuote(input: QuoteInput, vehicle: VehiclePricing, reason: string): QuoteResponse {
  return {
    available: false,
    requiresCustomQuote: true,
    quoteType: "custom",
    serviceType: input.serviceType,
    vehicleCode: vehicle.vehicleCode,
    vehicleName: vehicle.vehicleName,
    ...vehicleQuoteFields(vehicle),
    currency: "USD",
    basePrice: 0,
    finalPrice: 0,
    pickupRegion: findRegion(locationText(input.pickupLocation, input.pickupPlace))?.regionName,
    dropoffRegion: findRegion(locationText(input.dropoffLocation, input.dropoffPlace))?.regionName,
    breakdown: [],
    reason,
    suggestedAction: "request_quote",
    notes: ["This is a quote request. Your reservation is not confirmed until payment is completed."]
  };
}

function unavailable(input: QuoteInput, reason: string, suggestedAction: QuoteResponse["suggestedAction"], vehicle?: VehiclePricing): QuoteResponse {
  return {
    available: false,
    requiresCustomQuote: false,
    quoteType: "unavailable",
    serviceType: input.serviceType,
    vehicleCode: vehicle?.vehicleCode || input.vehicleCode,
    vehicleName: vehicle?.vehicleName || "Selected vehicle",
    ...vehicleQuoteFields(vehicle),
    currency: "USD",
    basePrice: 0,
    finalPrice: 0,
    breakdown: [],
    reason,
    suggestedAction,
    notes: []
  };
}

function validateAdvanceTime(date: string, time: string, minAdvanceHours: number) {
  if (!date || !time) return "Please select pickup date and time.";
  const pickupAt = new Date(`${date}T${time}`);
  if (Number.isNaN(pickupAt.getTime())) return "Pickup date and time is invalid.";
  const minimum = Date.now() + minAdvanceHours * 60 * 60 * 1000;
  if (pickupAt.getTime() < minimum) return "Bookings must be made at least 3 hours in advance. For urgent requests, please contact us on WhatsApp.";
  return "";
}

function roundMoney(value: number) {
  return Math.round(value);
}

function vehicleQuoteFields(vehicle?: VehiclePricing) {
  if (!vehicle) return {};
  return {
    vehicleTypeCode: vehicle.vehicleTypeCode,
    vehicleTypeName: vehicle.vehicleTypeName,
    representativeVehicle: vehicle.representativeVehicle
  };
}

function airportExtraUnits(region: RegionRule | undefined, airport: AirportCode) {
  return region?.airportExtraUnits?.[airport] ?? region?.extraUnits ?? 0;
}

function pointToPointExtraUnits(region: RegionRule | undefined) {
  return region?.pointToPointExtraUnits ?? region?.extraUnits ?? 0;
}

function hourlyDispatchExtraUnits(region: RegionRule | undefined) {
  return region?.hourlyDispatchExtraUnits ?? region?.extraUnits ?? 0;
}

function locationText(location: string, place?: PlaceSnapshot) {
  return [
    location,
    place?.name,
    place?.formattedAddress,
    place?.placeId,
    ...(place?.addressComponents?.flatMap((component) => [component.longName, component.shortName]) || [])
  ]
    .filter(Boolean)
    .join(" ");
}

export const airportPickupInstruction = airportMeetingInstruction;
