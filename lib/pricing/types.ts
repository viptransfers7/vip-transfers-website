export type ServiceType = "airport_transfer" | "point_to_point" | "hourly_charter" | "private_tour" | "custom_quote";
export type AirportCode = "ICN" | "GMP";
export type AirportDirection = "arrival" | "departure";
export type QuoteType = "instant" | "custom" | "unavailable";
export type CurrencyCode = "USD" | "KRW";
export type VehicleTypeCode = "EXECUTIVE_SEDAN" | "LUXURY_SEDAN" | "SUV" | "MPV" | "SPRINTER" | "MINIBUS" | "COACH_28" | "COACH_44";

export type PlaceSnapshot = {
  placeId?: string;
  name?: string;
  formattedAddress?: string;
  lat?: number;
  lng?: number;
  addressComponents?: Array<{
    longName: string;
    shortName: string;
    types: string[];
  }>;
};

export type VehiclePricing = {
  vehicleCode: string;
  vehicleName: string;
  vehicleTypeCode: VehicleTypeCode;
  vehicleTypeName: string;
  representativeVehicle: string;
  category: string;
  maxPax: number;
  maxLuggage: number;
  imageUrl: string;
  hourlyRateUsd: number;
  seoulPtpHours: number;
  icnFlatUsd: number;
  gmpFlatUsd: number;
  charter5hUsd: number;
  charter10hUsd: number;
  charter12hUsd: number;
  currency: CurrencyCode;
  isActive: boolean;
  sortOrder: number;
};

export type RegionRule = {
  regionName: string;
  aliases: string[];
  extraUnits: number;
  extraUnitType: "half_hour";
  airportExtraUnits?: Partial<Record<AirportCode, number>>;
  pointToPointExtraUnits?: number;
  hourlyDispatchExtraUnits?: number;
  isBaseArea: boolean;
  isServiceArea: boolean;
  requiresCustomQuote: boolean;
  quoteMessage?: string;
  sortOrder: number;
};

export type ServiceRule = {
  serviceType: ServiceType;
  label: string;
  allowRoundTrip: boolean;
  roundTripDiscountPercent: number;
  minAdvanceHours: number;
  allowStopovers: boolean;
  requiresFlightForAirport: boolean;
  isActive: boolean;
};

export type TourProduct = {
  slug: string;
  name: string;
  durationHours: number;
  pickupArea: string;
  description: string;
  included: string[];
  excluded: string[];
  isActive: boolean;
  requiresCustomQuote: boolean;
};

export type TourVehiclePrice = {
  tourSlug: string;
  vehicleCode: string;
  priceUsd: number;
  isActive: boolean;
};

export type QuoteInput = {
  serviceType: ServiceType;
  pickupDate: string;
  pickupTime: string;
  pickupLocation: string;
  dropoffLocation: string;
  pickupPlace?: PlaceSnapshot;
  dropoffPlace?: PlaceSnapshot;
  stopover?: string;
  airport?: AirportCode | "";
  airportDirection?: AirportDirection;
  flightNumber?: string;
  isRoundTrip?: boolean;
  returnPickupLocation?: string;
  returnDropoffLocation?: string;
  returnPickupPlace?: PlaceSnapshot;
  returnDropoffPlace?: PlaceSnapshot;
  returnDate?: string;
  returnTime?: string;
  returnFlight?: string;
  hourlyDuration?: 5 | 10 | 12;
  itineraryNote?: string;
  tourProductSlug?: string;
  passengers: number;
  luggage: number;
  vehicleCode: string;
};

export type QuoteBreakdownItem = {
  label: string;
  amount: number;
};

export type QuoteResponse = {
  available: boolean;
  requiresCustomQuote: boolean;
  quoteType: QuoteType;
  serviceType: ServiceType;
  vehicleCode: string;
  vehicleName: string;
  vehicleTypeCode?: VehicleTypeCode;
  vehicleTypeName?: string;
  representativeVehicle?: string;
  currency: CurrencyCode;
  basePrice: number;
  finalPrice: number;
  pickupRegion?: string;
  dropoffRegion?: string;
  airport?: AirportCode;
  breakdown: QuoteBreakdownItem[];
  reason?: string;
  suggestedAction?: "pay_now" | "request_quote" | "change_vehicle" | "change_time";
  notes: string[];
};
