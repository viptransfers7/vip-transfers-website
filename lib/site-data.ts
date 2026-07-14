export type FleetSlug =
  | "genesis-g90"
  | "mercedes-s-class"
  | "cadillac-escalade"
  | "hyundai-staria"
  | "mercedes-sprinter";

export type FleetVehicle = {
  slug: FleetSlug;
  name: string;
  category: string;
  requestedType: string;
  passengers: string;
  luggage: string;
  image: string;
  summary: string;
  profile: string;
  bestUseCase: string;
  comfort: string;
  capacityNote: string;
  luggageNote: string;
  bookingNote: string;
  bestFor: string[];
  details: string[];
  planningNotes: string[];
};

export const vehicles: FleetVehicle[] = [
  {
    slug: "genesis-g90",
    name: "Genesis G90",
    category: "Executive sedan",
    requestedType: "Executive Sedan",
    passengers: "1-3",
    luggage: "2-3",
    image: "/Images/g90.webp",
    summary:
      "A refined Korean flagship sedan for airport transfers, executive meetings, and discreet private movement in Seoul.",
    profile:
      "Best when the schedule calls for a polished executive arrival without drawing too much attention. The G90 is a strong fit for one or two guests who want a quiet rear cabin, simple luggage handling, and smooth movement between airports, hotels, offices, and dining appointments.",
    bestUseCase: "Executive arrivals and city meetings",
    comfort: "Quiet flagship cabin with premium rear seating",
    capacityNote: "Ideal for 1-2 guests; up to 3 when luggage is light.",
    luggageNote: "Best with 2 large suitcases, or 3 smaller cases.",
    bookingNote: "Request this as an Executive Sedan. The assigned sedan is confirmed by dispatch before service.",
    bestFor: ["Executive airport arrivals", "Hotel and residence transfers", "Business district schedules"],
    details: ["Representative vehicle for Executive Sedan requests", "Discreet profile for board-level and private guests", "Comfortable for Seoul point-to-point and half-day chauffeur use"],
    planningNotes: ["Choose this when presentation matters but SUV space is not required.", "For three passengers with full-size luggage, consider an SUV or MPV.", "Works well for ICN, GMP, hotels, restaurants, offices, and private residences."]
  },
  {
    slug: "mercedes-s-class",
    name: "Mercedes-Benz S-Class",
    category: "Luxury sedan",
    requestedType: "Luxury Sedan",
    passengers: "1-3",
    luggage: "2-3",
    image: "/Images/sclass.webp",
    summary:
      "A global executive standard for VIP guests who expect calm, privacy, and an immaculate ride experience.",
    profile:
      "The S-Class is the right request when the vehicle itself is part of the guest experience. It suits senior executives, diplomatic-style visits, luxury hotel arrivals, and private guests who expect a refined rear-seat environment with careful presentation.",
    bestUseCase: "VIP arrivals, protocol-sensitive meetings, and luxury hotel transfers",
    comfort: "Executive rear cabin with premium ride quality",
    capacityNote: "Ideal for 1-2 VIP guests; up to 3 for short city transfers.",
    luggageNote: "Best with 2 large suitcases plus small carry-ons.",
    bookingNote: "Request this as a Luxury Sedan. Dispatch confirms the representative S-Class or equivalent luxury sedan for the day.",
    bestFor: ["VIP airport transfer Korea", "Diplomatic-style movement", "Private meetings and luxury hotels"],
    details: ["Representative vehicle for Luxury Sedan requests", "High-comfort rear cabin for long airport approaches", "A subtle but clearly premium arrival presence"],
    planningNotes: ["Choose this for the most refined sedan experience.", "For family travel or several large bags, an Escalade or Staria is usually more practical.", "Works especially well for ICN arrivals, board meetings, embassy-style movement, and hosted VIP guests."]
  },
  {
    slug: "cadillac-escalade",
    name: "Cadillac Escalade",
    category: "Luxury SUV",
    requestedType: "SUV",
    passengers: "1-5",
    luggage: "4-5",
    image: "/Images/escalade.webp",
    summary:
      "A spacious premium SUV for high-profile private travelers, families, and guests carrying additional luggage.",
    profile:
      "The Escalade is the practical luxury choice when passengers, luggage, and presence all matter. It gives VIP guests more room than a sedan, handles airport luggage comfortably, and suits families or private groups that still want a premium arrival.",
    bestUseCase: "VIP family travel, airport luggage, and private guest movement",
    comfort: "Commanding cabin space with generous luggage capacity",
    capacityNote: "Comfortable for 3-4 guests; up to 5 depending on luggage.",
    luggageNote: "Strong choice for 4-5 large suitcases.",
    bookingNote: "Request this as an SUV. Actual operated vehicle details remain part of dispatch assignment.",
    bestFor: ["Luxury family travelers", "Private VIP guests", "Airport arrivals with luggage"],
    details: ["Representative vehicle for SUV requests", "Premium road presence for high-profile guests", "More flexible passenger and luggage balance than a sedan"],
    planningNotes: ["Choose this when a sedan feels too tight but a van feels too formal.", "For six passengers, book an MPV or Sprinter instead.", "Works well for ICN arrivals, golf transfers, private security-conscious movement, and luxury family schedules."]
  },
  {
    slug: "hyundai-staria",
    name: "Hyundai Staria",
    category: "Premium van",
    requestedType: "MPV",
    passengers: "1-6",
    luggage: "5-7",
    image: "/Images/staria.webp",
    summary:
      "A practical premium van for families, small delegations, and comfortable point-to-point travel around Korea.",
    profile:
      "The Staria is the most versatile option for families, small groups, and tour days where easy entry, luggage room, and flexible routing matter more than a formal luxury-sedan arrival. It is comfortable, practical, and efficient across Seoul and regional day trips.",
    bestUseCase: "Families, small groups, private tours, and flexible city movement",
    comfort: "Roomy MPV cabin with easy access and flexible seating",
    capacityNote: "Comfortable for 4-5 guests; up to 6 depending on bags.",
    luggageNote: "Handles 5-7 bags depending on passenger count.",
    bookingNote: "Request this as an MPV. The website request is for vehicle type, not a specific plate or assigned car.",
    bestFor: ["Family travel", "Small delegations", "Golf and leisure movement"],
    details: ["Representative vehicle for MPV requests", "Easy sliding-door access for hotels, airports, and tour stops", "A practical balance of passenger space and luggage room"],
    planningNotes: ["Choose this when luggage and access matter more than luxury-sedan presentation.", "For senior VIP protocol or formal arrival optics, consider S-Class or Escalade.", "Works well for private tours, golf days, airport transfers, and small delegation itineraries."]
  },
  {
    slug: "mercedes-sprinter",
    name: "Mercedes-Benz Sprinter",
    category: "Executive van",
    requestedType: "Sprinter",
    passengers: "6-13",
    luggage: "8-12",
    image: "/Images/sprinter519.webp",
    summary:
      "A polished group transport option for corporate roadshows, delegation transport, and multi-stop schedules.",
    profile:
      "The Sprinter is built for coordinated group movement: roadshows, delegations, production teams, hosted executives, and event transfers. It gives planners a more controlled experience than splitting a group across several smaller cars.",
    bestUseCase: "Corporate roadshows, delegations, events, and multi-stop days",
    comfort: "Executive group cabin suited to longer schedules",
    capacityNote: "Best for 6-10 guests with comfort; up to 13 depending on luggage and layout.",
    luggageNote: "Good for 8-12 bags when planned with passenger count.",
    bookingNote: "Request this as a Sprinter. Dispatch confirms the exact operated van and assignment details internally.",
    bestFor: ["Corporate roadshows", "Government delegations", "Event transport"],
    details: ["Representative vehicle for Sprinter requests", "Helpful for centralized group timing and multi-stop control", "Ideal when a planner needs one group vehicle instead of several sedans"],
    planningNotes: ["Choose this for group cohesion and schedule control.", "For very luggage-heavy airport arrivals, share bag count early so dispatch can plan correctly.", "Works well for roadshows, protocol visits, event shuttles, site visits, and hosted delegations."]
  }
];

export const extendedFleet = [
  ...vehicles,
  {
    slug: "chevrolet-suburban",
    name: "Chevrolet Suburban",
    category: "Full-size SUV",
    requestedType: "SUV",
    passengers: "1-5",
    luggage: "5-6",
    image: "/Images/suburban.webp",
    summary: "A large-format SUV option for VIP airport transfer and private family travel.",
    profile: "A roomy SUV option for private travel where luggage capacity and road presence are important.",
    bestUseCase: "VIP airport luggage and private family travel",
    comfort: "Large SUV cabin with long-distance comfort",
    capacityNote: "Comfortable for 3-5 guests depending on luggage.",
    luggageNote: "Strong choice for 5-6 bags when planned in advance.",
    bookingNote: "Request this as an SUV; final operated vehicle is assigned by dispatch.",
    bestFor: ["Airport luggage", "Family travelers", "Private security-conscious movement"],
    details: ["Large luggage hold", "Strong road presence", "Comfortable long-distance travel"],
    planningNotes: ["Share passenger and luggage counts early.", "A good fallback when SUV space is the main priority.", "Used as a representative SUV-style catalog option."]
  },
  {
    slug: "kia-carnival",
    name: "Kia Carnival",
    category: "Premium MPV",
    requestedType: "MPV",
    passengers: "1-6",
    luggage: "4-6",
    image: "/Images/carnival.webp",
    summary: "A comfortable MPV for families and private tours in Seoul and Korea.",
    profile: "A flexible MPV option for families, light groups, and private tour schedules.",
    bestUseCase: "Family schedules and private tours",
    comfort: "Comfortable MPV cabin with easy access",
    capacityNote: "Comfortable for 4-6 guests depending on luggage.",
    luggageNote: "Best with 4-6 bags depending on seating layout.",
    bookingNote: "Request this as an MPV; dispatch confirms the assigned vehicle internally.",
    bestFor: ["Private tours", "Family schedules", "Flexible city movement"],
    details: ["Sliding-door access", "Comfortable cabin", "Efficient group transfer"],
    planningNotes: ["Good for flexible stops and practical city movement.", "Choose a Sprinter for larger groups.", "Used as a representative MPV-style catalog option."]
  }
];

export const servicePages = {
  "airport-transfer-seoul": {
    title: "Airport Transfer Seoul",
    eyebrow: "ICN and GMP Airport Transfer",
    description:
      "Private airport transfer in Seoul for Incheon and Gimpo arrivals, departures, hotel pickups, private residences, and round-trip travel plans.",
    points: ["Choose ICN or GMP with arrival or departure direction", "Flight-aware pickup timing for delays and early arrivals", "Meet-and-greet with name sign on request", "Round-trip airport transfers can be planned in one booking"],
    cta: "Book Seoul Airport Transfer",
    serviceArea: {
      eyebrow: "Seoul Airport Coverage",
      title: "One airport transfer page for ICN, GMP, hotels, homes, and business districts.",
      items: [
        {
          label: "Incheon International Airport",
          copy: "Best for long-haul international arrivals and departures at Terminal 1 or Terminal 2."
        },
        {
          label: "Gimpo Airport",
          copy: "Best for domestic Korea flights, selected regional flights, and fast access to central Seoul."
        },
        {
          label: "Seoul hotel pickup",
          copy: "Departure pickups can be timed around checkout, lobby access, luggage, and airport buffer time."
        },
        {
          label: "Private residence or venue",
          copy: "We can coordinate apartments, serviced residences, offices, convention centers, and event venues."
        },
        {
          label: "Business districts",
          copy: "Gangnam, Yeouido, Jongno, Myeongdong, Itaewon, Jamsil, and Seoul Station transfers."
        },
        {
          label: "Airport-to-airport connection",
          copy: "ICN to GMP or GMP to ICN transfers can be planned with luggage and connection timing in mind."
        }
      ]
    },
    airportGuide: {
      eyebrow: "Arrival and Departure Flow",
      title: "Clear airport movement before and after the flight.",
      copy: "Use this page when you know the city is Seoul but still need the right airport, direction, timing, and vehicle selected.",
      steps: [
        {
          label: "Select airport and direction",
          copy: "Tell us whether the transfer is ICN or GMP, arrival or departure, one-way or round-trip."
        },
        {
          label: "Share flight details",
          copy: "Flight number, terminal if known, pickup address, passenger count, and luggage count help us plan the correct timing."
        },
        {
          label: "Meet or depart smoothly",
          copy: "For arrivals, the chauffeur can meet after baggage claim. For departures, pickup is planned around traffic and check-in time."
        }
      ]
    },
    bookingNotes: {
      title: "Start with the airport details. We will handle the timing.",
      copy: "The booking form keeps the request focused on passenger, route, flight, and vehicle information. Dispatch assignment and driver details are handled later by the operations team.",
      items: ["Airport: ICN or GMP", "Direction: arrival or departure", "Flight number and terminal", "Passenger and luggage count", "Hotel, residence, or venue address", "Return transfer request"]
    }
  },
  "incheon-airport-transfer": {
    title: "Incheon Airport Private Transfer",
    eyebrow: "ICN Airport Service",
    description:
      "Private chauffeur service for Incheon International Airport Terminal 1 and Terminal 2 arrivals, departures, Seoul hotels, and regional Korea transfers.",
    points: ["Terminal 1 and Terminal 2 pickup planning", "Long-haul flight tracking for delays and early landings", "Arrival hall meeting after baggage claim", "Seoul, Songdo, Pangyo, and regional Korea transfers"],
    cta: "Book ICN Transfer",
    serviceArea: {
      eyebrow: "ICN Transfer Coverage",
      title: "Built around Incheon Airport's terminals, distance, and long-haul arrival rhythm.",
      items: [
        {
          label: "Terminal 1 arrivals",
          copy: "Pickup can be arranged for guests arriving through ICN Terminal 1 with baggage and customs timing considered."
        },
        {
          label: "Terminal 2 arrivals",
          copy: "Terminal 2 pickup is coordinated separately so the chauffeur is positioned at the correct arrival side."
        },
        {
          label: "Seoul hotel transfers",
          copy: "Direct private transfer to Gangnam, Myeongdong, Jongno, Hongdae, Yeouido, Jamsil, and luxury hotels."
        },
        {
          label: "Regional transfers",
          copy: "ICN can connect to Songdo, Pangyo, Suwon, Pyeongtaek, Daejeon, and other Korea destinations by request."
        },
        {
          label: "Departure pickups",
          copy: "Hotel and residence pickups are planned with traffic, airline check-in, luggage, and terminal distance in mind."
        },
        {
          label: "VIP and family arrivals",
          copy: "Sedan, SUV, MPV, Sprinter, and minibus options support executives, families, and small delegations."
        }
      ]
    },
    airportGuide: {
      eyebrow: "ICN Meeting Point",
      title: "A calmer handoff after a long international flight.",
      copy: "Incheon arrivals often involve immigration, baggage claim, customs, and a longer drive into Seoul. The transfer plan should reflect that rhythm.",
      steps: [
        {
          label: "Send flight and terminal",
          copy: "Flight number is the most important detail. Terminal 1 or Terminal 2 helps us confirm the exact airport side."
        },
        {
          label: "Proceed after baggage claim",
          copy: "For meet-and-greet arrivals, guests proceed to the public arrival hall after baggage claim and customs."
        },
        {
          label: "Build in the Seoul drive",
          copy: "The transfer into Seoul can vary by district and traffic, so departure pickups and return trips should include enough buffer."
        }
      ]
    },
    bookingNotes: {
      title: "Reserve ICN arrival, departure, or round-trip service.",
      copy: "Use the booking form for the passenger route and flight details. We keep operational fields such as driver assignment, vehicle number, and dispatch status in the dashboard workflow.",
      items: ["ICN Terminal 1 or Terminal 2", "Arrival flight or departure flight", "Name sign request", "Seoul or regional destination", "Large luggage or sports gear", "Return pickup date and time"]
    }
  },
  "gimpo-airport-transfer": {
    title: "Gimpo Airport Transfer",
    eyebrow: "GMP Airport Service",
    description:
      "Private Gimpo Airport transfer for domestic flights, selected regional international flights, Seoul hotels, business districts, and ICN airport connections.",
    points: ["Domestic and international terminal support", "Fast access to central and western Seoul", "Flight-aware pickup planning for tight domestic schedules", "GMP to ICN airport connection support"],
    cta: "Book GMP Transfer",
    serviceArea: {
      eyebrow: "GMP Transfer Coverage",
      title: "Best for domestic Korea travel, quick Seoul access, and airport connections.",
      items: [
        {
          label: "Domestic terminal",
          copy: "Ideal for Busan, Jeju, and other domestic Korea flights with a faster airport flow than ICN."
        },
        {
          label: "International terminal",
          copy: "Selected regional international flights can be handled with terminal-specific pickup planning."
        },
        {
          label: "Central Seoul",
          copy: "Convenient for Yeouido, Hongdae, City Hall, Myeongdong, Jongno, and Seoul Station transfers."
        },
        {
          label: "Gangnam and Jamsil",
          copy: "Chauffeur pickup timing accounts for river crossings and peak-hour traffic across Seoul."
        },
        {
          label: "GMP to ICN connection",
          copy: "Airport-to-airport transfers can be planned around luggage, domestic arrival time, and international check-in."
        },
        {
          label: "Business travelers",
          copy: "A practical airport option for short Seoul meetings, same-day domestic trips, and executive schedules."
        }
      ]
    },
    airportGuide: {
      eyebrow: "GMP Pickup Flow",
      title: "Shorter airport movement, tighter timing, clear terminal choice.",
      copy: "Gimpo is closer to Seoul than Incheon, but domestic schedules can be tight. The right terminal and pickup direction matter.",
      steps: [
        {
          label: "Confirm domestic or international",
          copy: "GMP has separate domestic and international terminal flows. Share the flight number so we can confirm the pickup plan."
        },
        {
          label: "Plan for quick exits",
          copy: "Domestic passengers often move through the airport quickly, so the chauffeur timing is set closer to actual arrival."
        },
        {
          label: "Connect across Seoul or to ICN",
          copy: "For hotel transfers or ICN connections, the route is planned around Seoul traffic and any onward flight deadline."
        }
      ]
    },
    bookingNotes: {
      title: "Book GMP service for Seoul arrivals, departures, or ICN connections.",
      copy: "Add the flight, terminal if known, passenger count, luggage, and destination in the booking form. The public site captures the request; dispatch details stay in operations.",
      items: ["Domestic or international terminal", "Arrival, departure, or connection", "GMP to Seoul district", "GMP to ICN connection", "Passenger and luggage count", "Round-trip or same-day return"]
    }
  },
  "seoul-chauffeur-service": {
    title: "Seoul Chauffeur Service",
    eyebrow: "Business Chauffeur Seoul",
    description:
      "Private chauffeur service across Seoul for hotel-to-office transfers, meeting days, dining appointments, and confidential city schedules.",
    points: ["Hourly standby for changing meeting times", "Point-to-point transfers between hotels, offices, venues, and residences", "Discreet waiting and curbside coordination", "Executive sedan, SUV, and premium van options"],
    cta: "Request Seoul Chauffeur",
    secondaryCta: {
      label: "View VIP Protocol Service",
      href: "/vip-protocol-transport-korea"
    },
    heroMeta: [
      { label: "Best for", value: "Seoul meetings" },
      { label: "Service style", value: "Hourly or point-to-point" },
      { label: "Tone", value: "Discreet and punctual" }
    ],
    serviceArea: {
      eyebrow: "Seoul Use Cases",
      title: "For focused movement inside the city, not a sightseeing-first itinerary.",
      items: [
        {
          label: "Hotel to meeting",
          copy: "Quiet transfers from Seoul luxury hotels to offices, embassies, private clubs, restaurants, and event venues."
        },
        {
          label: "Hourly standby",
          copy: "A chauffeur remains available while meetings run long, locations change, or the day needs flexible routing."
        },
        {
          label: "Multi-stop city day",
          copy: "Practical sequencing for Gangnam, Yeouido, Jongno, Yongsan, Seongsu, and other business areas."
        },
        {
          label: "VIP protocol support",
          copy: "Protocol-aware planning for delegations, high-profile guests, hosted executives, and schedule-sensitive venue handoffs."
        },
        {
          label: "Private evening plans",
          copy: "Discreet service for dining, hosted guests, retail appointments, and late returns to hotels or residences."
        }
      ]
    },
    airportGuide: {
      eyebrow: "Operating Rhythm",
      title: "A simple city chauffeur flow for busy Seoul days.",
      copy: "Share the first pickup, key stops, passenger count, luggage if any, and whether the chauffeur should wait between appointments.",
      steps: [
        {
          label: "Start with the anchor pickup",
          copy: "Most Seoul chauffeur requests begin at a hotel, office, residence, conference venue, or private terminal."
        },
        {
          label: "Choose hourly or point-to-point",
          copy: "Hourly works best for flexible schedules. Point-to-point is cleaner for fixed transfers between known addresses."
        },
        {
          label: "Confirm the vehicle fit",
          copy: "Sedans suit one to three executives, SUVs add room and presence, and vans support assistants or small teams."
        }
      ]
    },
    bookingNotes: {
      title: "Send the schedule, then we shape the chauffeur plan.",
      copy: "The website request captures the travel need and preferred vehicle. Final timing, routing, and any special notes can be confirmed by the coordination team.",
      items: ["Pickup address and first ready time", "Known stops or hourly standby window", "Passenger and luggage count", "Preferred vehicle type or arrival style"]
    }
  },
  "executive-chauffeur-korea": {
    title: "Executive Chauffeur Korea",
    eyebrow: "Executive Mobility Korea",
    description:
      "Premium chauffeur coordination for overseas executives, board members, VIP guests, and leadership teams visiting Seoul and Korea.",
    points: ["Discreet, professional chauffeurs for senior guests", "Schedule-sensitive planning for meetings, hotels, venues, and site visits", "Premium vehicle allocation by passenger profile and protocol", "Single request flow for executive assistants and host teams"],
    cta: "Request Executive Service",
    secondaryCta: {
      label: "Contact a Coordinator",
      href: "/contact"
    },
    heroMeta: [
      { label: "Best for", value: "VIP and C-suite visits" },
      { label: "Coverage", value: "Seoul and regional Korea" },
      { label: "Priority", value: "Privacy and timing" }
    ],
    serviceArea: {
      eyebrow: "Executive Focus",
      title: "Higher-touch transport for principals, assistants, and host teams.",
      items: [
        {
          label: "Board-level travel",
          copy: "Calm, private movement for chairpersons, directors, investors, and senior executives with limited time in Korea."
        },
        {
          label: "Assistant-led planning",
          copy: "Clear request details for executive assistants, corporate travel managers, concierges, and local host teams."
        },
        {
          label: "VIP arrival presence",
          copy: "Premium sedans, luxury SUVs, and executive vans selected to match guest profile, luggage, and arrival expectations."
        },
        {
          label: "Meeting and venue linkage",
          copy: "Transport planning around hotels, offices, conference venues, private dining, events, and regional site visits."
        }
      ]
    },
    airportGuide: {
      eyebrow: "Executive Flow",
      title: "Built around punctuality, discretion, and clean handoffs.",
      copy: "Executive requests often involve several stakeholders. The goal is to collect enough information for a smooth pending request without exposing operational dispatch details.",
      steps: [
        {
          label: "Share the principal profile",
          copy: "Passenger count, luggage, preferred vehicle class, name-sign needs, and privacy expectations help us recommend the right setup."
        },
        {
          label: "Map the critical timings",
          copy: "Flights, hotel departures, meeting start times, venue access, and buffer windows are treated as the schedule anchors."
        },
        {
          label: "Confirm the communication path",
          copy: "We keep the request flow clear for the assistant, host, or traveler contact responsible for day-of coordination."
        }
      ]
    },
    bookingNotes: {
      title: "Use booking for the request, contact for complex executive programs.",
      copy: "For a single executive transfer, the booking flow is fastest. For multi-day, multi-vehicle, or protocol-sensitive movement, contact coordination with the schedule brief.",
      items: ["Principal or group profile", "Hotel, office, airport, and venue addresses", "Critical times and buffer preferences", "Vehicle class, privacy, and name-sign notes"]
    }
  },
  "corporate-roadshow-korea": {
    title: "Corporate Roadshow Korea",
    eyebrow: "Corporate Roadshow",
    description:
      "Schedule-sensitive executive transportation for investor meetings, corporate roadshows, site visits, and multi-city business programs in Korea.",
    points: ["Multi-stop schedules with buffer planning", "Sedan, SUV, van, Sprinter, minibus, and coach combinations", "Coordinator communication for meeting-time changes", "Airport, hotel, headquarters, venue, and regional site linkage"],
    cta: "Request Roadshow Quote",
    ctaHref: "/booking",
    secondaryCta: {
      label: "Request Executive Service",
      href: "/contact"
    },
    heroMeta: [
      { label: "Movement", value: "Meeting-to-meeting, site visits, airport and hotel links" },
      { label: "Fleet", value: "Single executive vehicle or coordinated multi-vehicle group" },
      { label: "Quote Basis", value: "Date, cities, schedule, passengers, and vehicle count" }
    ],
    serviceArea: {
      eyebrow: "Roadshow Structure",
      title: "Built around meeting cadence, not a simple transfer.",
      items: [
        {
          label: "Executive meeting sequence",
          copy: "Routes are planned around pickup windows, meeting duration, venue access, and realistic Seoul or regional travel buffers."
        },
        {
          label: "Multi-vehicle planning",
          copy: "Sedans, SUVs, premium vans, Sprinters, minibuses, or coaches can be combined by executive group, staff group, luggage, and route."
        },
        {
          label: "Schedule-sensitive movement",
          copy: "Hourly standby and point-to-point segments can be scoped together when meetings, meals, investor events, or site tours may shift."
        },
        {
          label: "Coordinator communication",
          copy: "A central coordinator can align timing updates, passenger changes, and pickup instructions before and during the service day."
        }
      ]
    },
    airportGuide: {
      eyebrow: "Planning Flow",
      title: "How roadshow requests are scoped.",
      copy: "Corporate roadshows are handled as custom quote requests so the team can review the schedule, vehicle mix, and timing risk before confirmation.",
      steps: [
        {
          label: "Share the working itinerary",
          copy: "Send service dates, city or regional sequence, hotels, airports, meeting places, venues, and expected pickup times."
        },
        {
          label: "Define the group profile",
          copy: "Include passenger count, luggage needs, preferred vehicle types, and whether executives, staff, or guests should move separately."
        },
        {
          label: "Confirm the quote scope",
          copy: "The team reviews vehicle count, standby time, regional mileage, coordinator needs, and special instructions before confirming availability."
        }
      ]
    },
    bookingNotes: {
      title: "Details to include before requesting a quote.",
      copy: "For roadshows, the most useful inquiry is a draft schedule plus headcount. The website collects the request; operational assignment and final service handling are confirmed after review.",
      items: ["Service dates and fixed meeting times", "City, region, hotel, airport, venue, and site addresses", "Passenger count by group and luggage estimate", "Requested vehicle count or preferred vehicle types", "Coordinator name, phone, email, or WhatsApp", "Confidentiality, signage, access, or waiting-time notes"]
    }
  },
  "government-delegation-transport-korea": {
    title: "Government Delegation Transport Korea",
    eyebrow: "Official Delegation",
    description:
      "Discreet, protocol-aware chauffeur and group transport planning for official, institutional, and delegation-style visits to Korea.",
    points: ["Security-conscious and discreet vehicle planning", "Sedan, SUV, MPV, Sprinter, minibus, and coach options", "Schedule-sensitive movement between official venues", "Central coordinator communication"],
    cta: "Request Delegation Quote",
    ctaHref: "/booking",
    secondaryCta: {
      label: "Speak With Coordinator",
      href: "/contact"
    },
    heroMeta: [
      { label: "Movement", value: "Airport, hotel, embassy, ministry, venue, and event transfers" },
      { label: "Fleet", value: "VIP lead vehicles, staff vans, Sprinters, minibuses, or coaches" },
      { label: "Quote Basis", value: "Protocol schedule, passenger count, cities, and vehicle mix" }
    ],
    serviceArea: {
      eyebrow: "Delegation Structure",
      title: "Designed for official movement, discretion, and group logistics.",
      items: [
        {
          label: "Discretion and privacy",
          copy: "Service can be planned with understated vehicles, limited visible branding, and careful handling of passenger and itinerary details."
        },
        {
          label: "Protocol-aware timing",
          copy: "Movement is scoped around official appointments, venue access, receiving-line timing, hotel departures, and airport procedures."
        },
        {
          label: "Multi-vehicle delegation flow",
          copy: "VIP passengers, aides, staff, luggage, and support teams can be separated into the right sedan, SUV, van, Sprinter, minibus, or coach mix."
        },
        {
          label: "Single coordination point",
          copy: "A coordinator can receive schedule changes and share pickup details with the client-side contact while the service plan is reviewed."
        }
      ]
    },
    airportGuide: {
      eyebrow: "Planning Flow",
      title: "How delegation transport is scoped.",
      copy: "Delegation movement is treated as a custom quote so timing, vehicle count, access requirements, and communication needs can be reviewed before confirmation.",
      steps: [
        {
          label: "Outline the official schedule",
          copy: "Send service dates, cities, hotels, airports, ministries, embassies, meeting venues, event locations, and expected movement windows."
        },
        {
          label: "Separate passenger groups",
          copy: "Share the passenger count by VIPs, delegates, staff, security, luggage, or support teams so the vehicle plan matches the movement pattern."
        },
        {
          label: "Review special requirements",
          copy: "Note protocol timing, discreet arrivals, venue access, coordinator contacts, signage preferences, and any security-sensitive instructions."
        }
      ]
    },
    bookingNotes: {
      title: "Details to include before requesting delegation transport.",
      copy: "A clear delegation inquiry helps the team recommend the right vehicle count and timing plan. The website receives the request; driver, vendor, and final assignment details remain part of later operations.",
      items: ["Service dates, arrival or departure times, and fixed appointments", "Cities, hotels, airports, ministries, embassies, venues, and event locations", "Passenger count by VIP, delegate, staff, security, and luggage group", "Number of vehicles requested or preferred vehicle categories", "Primary coordinator contact and onsite communication method", "Protocol, discretion, access, signage, or security-sensitive notes"]
    }
  },
  "private-tours-korea": {
    title: "Private Tours Korea",
    eyebrow: "Private Chauffeured Tours",
    description:
      "Private chauffeured tours for Seoul, nearby leisure destinations, business travelers with free time, and luxury family travelers.",
    points: ["Seoul highlights", "Nami Island and regional trips", "Flexible stops", "Premium private vehicles"],
    cta: "Explore Private Tours"
  }
} as const;

export const privateTours = {
  "seoul-city-tour": {
    title: "Seoul City Private Tour",
    eyebrow: "Private Seoul Tour",
    description:
      "A private chauffeured Seoul city tour designed around hotels, dining, shopping, palaces, viewpoints, and business-traveler downtime.",
    points: ["Hotel pickup", "Flexible city routing", "Premium private vehicle", "Family and VIP friendly"]
  },
  "nami-island-private-tour": {
    title: "Nami Island Private Tour",
    eyebrow: "Private Day Trip",
    description:
      "A comfortable private day trip from Seoul to Nami Island and nearby destinations, with a chauffeur-led schedule and premium vehicle.",
    points: ["Round-trip from Seoul", "Comfortable long-distance vehicle", "Flexible departure time", "Optional nearby stops"]
  }
} as const;

export const seoLinks = [
  ["Incheon Airport Private Transfer", "/incheon-airport-transfer"],
  ["Gimpo Airport Transfer", "/gimpo-airport-transfer"],
  ["Seoul Chauffeur Service", "/seoul-chauffeur-service"],
  ["VIP Protocol Transport Korea", "/vip-protocol-transport-korea"],
  ["Executive Transportation Korea", "/executive-chauffeur-korea"],
  ["VIP Airport Transfer Korea", "/airport-transfer-seoul"],
  ["Private Tours Korea", "/private-tours-korea"]
];
