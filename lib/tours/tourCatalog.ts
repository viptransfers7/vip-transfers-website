import type { TourProduct, TourVehiclePrice } from "@/lib/pricing/types";

export const tourProducts: TourProduct[] = [
  {
    slug: "seoul-city-tour-5h",
    name: "Seoul Private City Tour 5h",
    status: "published",
    imageUrl: "/brochure/page-2.png",
    heroImageUrl: "/brochure/page-2.png",
    shortDescription: "Private Seoul highlights with a chauffeur and flexible hotel-based routing.",
    durationHours: 5,
    pickupArea: "Seoul",
    description: "A private Seoul city tour for palaces, shopping, dining, viewpoints, and flexible hotel-based schedules.",
    itinerary: ["Hotel pickup", "Palace or historic district", "Shopping or dining stop", "Viewpoint or client-requested area", "Hotel dropoff"],
    included: ["Private chauffeur", "Seoul base area", "5-hour vehicle use"],
    excluded: ["Admission tickets", "Parking", "Toll", "Overtime"],
    isActive: true,
    requiresCustomQuote: false,
    sortOrder: 10
  },
  {
    slug: "nami-island-10h",
    name: "Nami Island Private Day Trip 10h",
    status: "published",
    imageUrl: "/brochure/page-3.png",
    heroImageUrl: "/brochure/page-3.png",
    shortDescription: "A full-day private day trip from Seoul to Nami Island and nearby destinations.",
    durationHours: 10,
    pickupArea: "Seoul",
    description: "A full-day private day trip from Seoul to Nami Island and nearby destinations.",
    itinerary: ["Seoul hotel pickup", "Nami Island", "Optional nearby attraction", "Return to Seoul"],
    included: ["Round-trip from Seoul", "Private chauffeur", "10-hour vehicle use"],
    excluded: ["Admission tickets", "Meals", "Parking", "Overtime"],
    isActive: true,
    requiresCustomQuote: false,
    sortOrder: 20
  },
  {
    slug: "ski-resort-transfer-12h",
    name: "Ski Resort Private Transfer 12h",
    status: "published",
    imageUrl: "/brochure/page-4.png",
    heroImageUrl: "/brochure/page-4.png",
    shortDescription: "Winter ski resort transfer or day itinerary with a private chauffeur.",
    durationHours: 12,
    pickupArea: "Seoul",
    description: "Winter ski resort transfer or day itinerary with a private vehicle and chauffeur.",
    itinerary: ["Seoul pickup", "Ski resort transfer", "Standby or return timing by request", "Seoul dropoff"],
    included: ["Round-trip from Seoul", "12-hour vehicle use"],
    excluded: ["Lift passes", "Equipment rental", "Parking", "Overtime"],
    isActive: true,
    requiresCustomQuote: true,
    sortOrder: 30
  },
  {
    slug: "custom-private-tour",
    name: "Custom Private Tour",
    status: "published",
    imageUrl: "/brochure/page-5.png",
    heroImageUrl: "/brochure/page-5.png",
    shortDescription: "A custom chauffeured itinerary reviewed by the VIP Transfers Korea team.",
    durationHours: 10,
    pickupArea: "Korea",
    description: "A custom chauffeured itinerary reviewed by the VIP Transfers Korea team.",
    itinerary: ["Concierge itinerary review", "Vehicle and route recommendation", "Final quote before payment"],
    included: ["Concierge itinerary review", "Vehicle recommendation"],
    excluded: ["Final pricing until review"],
    isActive: true,
    requiresCustomQuote: true,
    sortOrder: 40
  }
];

export const tourVehiclePrices: TourVehiclePrice[] = [
  { tourSlug: "seoul-city-tour-5h", vehicleCode: "staria", priceUsd: 250, isActive: true },
  { tourSlug: "seoul-city-tour-5h", vehicleCode: "carnival", priceUsd: 250, isActive: true },
  { tourSlug: "seoul-city-tour-5h", vehicleCode: "g90", priceUsd: 350, isActive: true },
  { tourSlug: "seoul-city-tour-5h", vehicleCode: "suburban", priceUsd: 350, isActive: true },
  { tourSlug: "seoul-city-tour-5h", vehicleCode: "escalade", priceUsd: 500, isActive: true },
  { tourSlug: "seoul-city-tour-5h", vehicleCode: "s_class", priceUsd: 550, isActive: true },
  { tourSlug: "seoul-city-tour-5h", vehicleCode: "sprinter_8", priceUsd: 350, isActive: true },
  { tourSlug: "seoul-city-tour-5h", vehicleCode: "sprinter_13", priceUsd: 500, isActive: true },
  { tourSlug: "seoul-city-tour-5h", vehicleCode: "sprinter_lux", priceUsd: 550, isActive: true },
  { tourSlug: "nami-island-10h", vehicleCode: "staria", priceUsd: 400, isActive: true },
  { tourSlug: "nami-island-10h", vehicleCode: "carnival", priceUsd: 400, isActive: true },
  { tourSlug: "nami-island-10h", vehicleCode: "g90", priceUsd: 560, isActive: true },
  { tourSlug: "nami-island-10h", vehicleCode: "suburban", priceUsd: 560, isActive: true },
  { tourSlug: "nami-island-10h", vehicleCode: "sprinter_8", priceUsd: 560, isActive: true },
  { tourSlug: "nami-island-10h", vehicleCode: "sprinter_13", priceUsd: 640, isActive: true },
  { tourSlug: "nami-island-10h", vehicleCode: "escalade", priceUsd: 800, isActive: true },
  { tourSlug: "nami-island-10h", vehicleCode: "s_class", priceUsd: 800, isActive: true },
  { tourSlug: "nami-island-10h", vehicleCode: "sprinter_lux", priceUsd: 800, isActive: true }
];

export function getTourProduct(slug = "") {
  return tourProducts.find((product) => product.slug === slug && product.isActive && product.status !== "archived");
}

export function getTourVehiclePrice(tourSlug: string, vehicleCode: string) {
  return tourVehiclePrices.find((price) => price.tourSlug === tourSlug && price.vehicleCode === vehicleCode && price.isActive);
}
