import type { ServiceRule } from "./types";

export const serviceRules: ServiceRule[] = [
  {
    serviceType: "airport_transfer",
    label: "Airport Transfer",
    allowRoundTrip: true,
    roundTripDiscountPercent: 10,
    minAdvanceHours: 3,
    allowStopovers: false,
    requiresFlightForAirport: true,
    isActive: true
  },
  {
    serviceType: "point_to_point",
    label: "Point to Point",
    allowRoundTrip: false,
    roundTripDiscountPercent: 0,
    minAdvanceHours: 3,
    allowStopovers: true,
    requiresFlightForAirport: false,
    isActive: true
  },
  {
    serviceType: "hourly_charter",
    label: "Hourly Charter",
    allowRoundTrip: false,
    roundTripDiscountPercent: 0,
    minAdvanceHours: 3,
    allowStopovers: true,
    requiresFlightForAirport: false,
    isActive: true
  },
  {
    serviceType: "private_tour",
    label: "Private Tour",
    allowRoundTrip: false,
    roundTripDiscountPercent: 0,
    minAdvanceHours: 3,
    allowStopovers: true,
    requiresFlightForAirport: false,
    isActive: true
  },
  {
    serviceType: "custom_quote",
    label: "Custom Quote",
    allowRoundTrip: false,
    roundTripDiscountPercent: 0,
    minAdvanceHours: 3,
    allowStopovers: true,
    requiresFlightForAirport: false,
    isActive: true
  }
];

export function getServiceRule(serviceType: string) {
  return serviceRules.find((rule) => rule.serviceType === serviceType && rule.isActive);
}
