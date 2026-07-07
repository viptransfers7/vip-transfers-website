import type { TourProduct, TourVehiclePrice } from "./types";

export const tourProducts: TourProduct[] = [
  {
    slug: "seoul-city-tour-5h",
    name: "Seoul Private City Tour 5h",
    durationHours: 5,
    pickupArea: "Seoul",
    description: "A private Seoul city tour for palaces, shopping, dining, viewpoints, and flexible hotel-based schedules.",
    included: ["Private chauffeur", "Seoul base area", "5-hour vehicle use"],
    excluded: ["Admission tickets", "Parking", "Toll", "Overtime"],
    isActive: true,
    requiresCustomQuote: false
  },
  {
    slug: "nami-island-10h",
    name: "Nami Island Private Day Trip 10h",
    durationHours: 10,
    pickupArea: "Seoul",
    description: "A full-day private day trip from Seoul to Nami Island and nearby destinations.",
    included: ["Round-trip from Seoul", "Private chauffeur", "10-hour vehicle use"],
    excluded: ["Admission tickets", "Meals", "Parking", "Overtime"],
    isActive: true,
    requiresCustomQuote: false
  },
  {
    slug: "ski-resort-transfer-12h",
    name: "Ski Resort Private Transfer 12h",
    durationHours: 12,
    pickupArea: "Seoul",
    description: "Winter ski resort transfer or day itinerary with a private vehicle and chauffeur.",
    included: ["Round-trip from Seoul", "12-hour vehicle use"],
    excluded: ["Lift passes", "Equipment rental", "Parking", "Overtime"],
    isActive: true,
    requiresCustomQuote: true
  },
  {
    slug: "custom-private-tour",
    name: "Custom Private Tour",
    durationHours: 10,
    pickupArea: "Korea",
    description: "A custom chauffeured itinerary reviewed by the VIP Transfers Korea team.",
    included: ["Concierge itinerary review", "Vehicle recommendation"],
    excluded: ["Final pricing until review"],
    isActive: true,
    requiresCustomQuote: true
  }
];

export const tourVehiclePrices: TourVehiclePrice[] = [
  { tourSlug: "seoul-city-tour-5h", vehicleCode: "g90", priceUsd: 330, isActive: true },
  { tourSlug: "seoul-city-tour-5h", vehicleCode: "sclass", priceUsd: 430, isActive: true },
  { tourSlug: "seoul-city-tour-5h", vehicleCode: "escalade", priceUsd: 470, isActive: true },
  { tourSlug: "seoul-city-tour-5h", vehicleCode: "staria", priceUsd: 360, isActive: true },
  { tourSlug: "seoul-city-tour-5h", vehicleCode: "sprinter", priceUsd: 620, isActive: true },
  { tourSlug: "nami-island-10h", vehicleCode: "g90", priceUsd: 560, isActive: true },
  { tourSlug: "nami-island-10h", vehicleCode: "sclass", priceUsd: 730, isActive: true },
  { tourSlug: "nami-island-10h", vehicleCode: "escalade", priceUsd: 790, isActive: true },
  { tourSlug: "nami-island-10h", vehicleCode: "staria", priceUsd: 610, isActive: true },
  { tourSlug: "nami-island-10h", vehicleCode: "sprinter", priceUsd: 980, isActive: true }
];

export function getTourProduct(slug = "") {
  return tourProducts.find((product) => product.slug === slug && product.isActive);
}

export function getTourVehiclePrice(tourSlug: string, vehicleCode: string) {
  return tourVehiclePrices.find((price) => price.tourSlug === tourSlug && price.vehicleCode === vehicleCode && price.isActive);
}
