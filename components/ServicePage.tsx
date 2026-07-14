import Image from "next/image";
import Link from "next/link";
import { seoLinks } from "@/lib/site-data";

type ServiceItem = {
  label: string;
  copy: string;
};

type TourCard = {
  title: string;
  description: string;
  href: string;
  meta: readonly string[];
};

type ServicePageProps = {
  eyebrow: string;
  title: string;
  description: string;
  points: readonly string[];
  cta: string;
  ctaHref?: string;
  secondaryCta?: {
    label: string;
    href: string;
  };
  heroMeta?: readonly {
    label: string;
    value: string;
  }[];
  heroImage?: {
    src: string;
    alt: string;
    caption: string;
  };
  tourCards?: readonly TourCard[];
  itinerary?: readonly string[];
  pickupAreas?: readonly string[];
  duration?: string;
  included?: readonly string[];
  excluded?: readonly string[];
  vehicleComfort?: readonly string[];
  serviceArea?: {
    eyebrow: string;
    title: string;
    items: readonly ServiceItem[];
  };
  airportGuide?: {
    eyebrow: string;
    title: string;
    copy: string;
    steps: readonly ServiceItem[];
  };
  bookingNotes?: {
    title: string;
    copy: string;
    items: readonly string[];
  };
  serviceHub?: "seoul";
};

const defaultServiceArea = {
  eyebrow: "Korea Specialist",
  title: "Built for Seoul, airports, hotels, venues, and business districts.",
  items: ["Seoul", "Incheon Airport", "Gimpo Airport", "Luxury hotels", "Convention centers", "Business districts", "Events", "Regional Korea"].map((item) => ({
    label: item,
    copy: ""
  }))
};

const serviceTypes = [
  {
    index: "01",
    label: "Airport Transfer",
    href: "/airport-transfer-seoul",
    description: "ICN and GMP arrivals, departures, hotel transfers, and airport-to-airport connections.",
    meta: "ICN / GMP"
  },
  {
    index: "02",
    label: "Hourly / As Directed",
    href: "/seoul-chauffeur-service",
    description: "5h, 10h, or 12h chauffeur standby for meetings, shopping, dining, and flexible schedules.",
    meta: "Standby"
  },
  {
    index: "03",
    label: "VIP Protocol Coordination",
    href: "/vip-protocol-transport-korea",
    description: "Delegations, high-profile guests, business events, venue handoffs, and multi-vehicle planning.",
    meta: "Protocol"
  },
  {
    index: "04",
    label: "Private Tour",
    href: "/private-tours-korea",
    description: "Private chauffeured tour days for Seoul, Nami Island, shopping, dining, and leisure routes.",
    meta: "Tours"
  },
  {
    index: "05",
    label: "City Transfer",
    href: "/seoul-chauffeur-service",
    description: "Point-to-point transfers between hotels, offices, residences, restaurants, and event venues.",
    meta: "Seoul"
  }
];

const seoulServiceRows = [
  {
    index: "01",
    label: "Airport Transfer",
    href: "/airport-transfer-seoul",
    description: "ICN and GMP arrivals, departures, hotel transfers, and airport-to-airport connections with flight-aware timing.",
    meta: "ICN / GMP",
    image: "/Images/staria.webp",
    alt: "Private airport transfer vehicle in Korea"
  },
  {
    index: "02",
    label: "Hourly / As Directed",
    href: "/booking",
    description: "5h, 10h, or 12h chauffeur standby for meeting days, shopping, dining, and schedule changes inside Seoul.",
    meta: "Standby",
    image: "/Images/business.webp",
    alt: "Executive chauffeur greeting a business traveler in Seoul"
  },
  {
    index: "03",
    label: "City Transfer",
    href: "/booking",
    description: "Point-to-point movement between hotels, offices, residences, restaurants, private clubs, and event venues.",
    meta: "Seoul",
    image: "/Images/g90.webp",
    alt: "Executive sedan chauffeur service in Seoul"
  },
  {
    index: "04",
    label: "Private Tour",
    href: "/private-tours-korea",
    description: "Chauffeured leisure days for Seoul, Nami Island, shopping, dining, and accompanying guest schedules.",
    meta: "Tours",
    image: "/Images/shopping.webp",
    alt: "Private chauffeured shopping and leisure service in Korea"
  }
];

const seoulFleetPreview = [
  {
    label: "Executive Sedan",
    vehicle: "Genesis G90 / Mercedes S-Class",
    image: "/Images/sclass.webp",
    alt: "Luxury executive sedan chauffeur service",
    bestFor: "Senior guests, city meetings, private arrivals"
  },
  {
    label: "Premium SUV",
    vehicle: "Cadillac Escalade / Chevrolet Suburban",
    image: "/Images/escalade.webp",
    alt: "Premium SUV chauffeur service in Korea",
    bestFor: "High-profile guests, luggage, privacy-conscious movement"
  },
  {
    label: "Business Van",
    vehicle: "Staria, Carnival, Sprinter",
    image: "/Images/sprinter519.webp",
    alt: "Mercedes-Benz Sprinter delegation chauffeur service",
    bestFor: "Delegations, family groups, assistants, event teams"
  }
];

export function ServicePage({
  eyebrow,
  title,
  description,
  points,
  cta,
  ctaHref = "/booking",
  secondaryCta = {
    label: "Request Executive Service",
    href: "/contact"
  },
  heroMeta,
  heroImage,
  tourCards,
  itinerary,
  pickupAreas,
  duration,
  included,
  excluded,
  vehicleComfort,
  serviceArea = defaultServiceArea,
  airportGuide,
  bookingNotes,
  serviceHub
}: ServicePageProps) {
  const hasTourDetails = Boolean(itinerary || pickupAreas || duration || included || excluded || vehicleComfort);
  const isSeoulHub = serviceHub === "seoul";

  return (
    <main>
      {isSeoulHub ? (
        <>
          <SeoulHubHero title={title} description={description} cta={cta} ctaHref={ctaHref} secondaryCta={secondaryCta} heroMeta={heroMeta} />
          <SeoulServiceHub />
        </>
      ) : (
        <>
          <DefaultHero eyebrow={eyebrow} title={title} description={description} points={points} cta={cta} ctaHref={ctaHref} secondaryCta={secondaryCta} heroMeta={heroMeta} heroImage={heroImage} />
          <ServiceTypesGrid />
        </>
      )}
      {tourCards ? (
        <section id="tour-options" className="section border-b hairline">
          <div className="container">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <div className="eyebrow">Private Tour Options</div>
                <h2 className="serif-title mt-3 max-w-3xl text-[1.75rem] leading-[1.06] md:mt-4 md:text-5xl">Choose the pace, vehicle, and route that fit the day.</h2>
              </div>
              <Link href="/contact" className="btn btn-white">
                Request Custom Tour
              </Link>
            </div>
            <div className="mt-10 grid gap-4 md:grid-cols-2">
              {tourCards.map((tour) => (
                <Link key={tour.href} href={tour.href} className="surface-card group grid gap-5 p-5 transition hover:-translate-y-0.5 hover:shadow-quiet">
                  <div>
                    <h3 className="serif-title text-2xl md:text-3xl">{tour.title}</h3>
                    <p className="mt-4 text-sm leading-6 text-neutral-600">{tour.description}</p>
                  </div>
                  <div className="grid gap-2 sm:grid-cols-3">
                    {tour.meta.map((item) => (
                      <span key={item} className="border-t hairline pt-3 text-xs font-bold uppercase tracking-[0.12em] text-neutral-500">
                        {item}
                      </span>
                    ))}
                  </div>
                  <span className="text-sm font-black text-bronze">View Tour</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}
      {hasTourDetails ? (
        <section className="section">
          <div className="container grid gap-10 lg:grid-cols-[0.82fr_1.18fr]">
            <div>
              <div className="eyebrow">Tour Planning</div>
              <h2 className="serif-title mt-3 text-[1.75rem] leading-[1.06] md:mt-4 md:text-5xl">A private tour planned around comfort, timing, and clean handoffs.</h2>
              <p className="mt-4 text-sm leading-6 text-neutral-600 md:mt-5 md:text-base md:leading-7">
                Your chauffeur keeps the day calm between stops, with hotel pickup, luggage-aware vehicle planning, and flexible routing for weather, traffic, and guest preference.
              </p>
            </div>
            <div className="grid gap-5">
              {itinerary ? (
                <div className="surface-card p-5">
                  <div className="muted-label accent-label">Itinerary Highlights</div>
                  <div className="mt-5 grid gap-4">
                    {itinerary.map((item, index) => (
                      <div key={item} className="flex gap-4 border-t hairline pt-4">
                        <span className="serif-title min-w-9 text-2xl text-bronze md:min-w-10 md:text-3xl">{String(index + 1).padStart(2, "0")}</span>
                        <p className="pt-1 text-sm leading-6 text-neutral-700">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
              <div className="grid gap-4 md:grid-cols-3">
                {duration ? (
                  <div className="surface-card p-5">
                    <div className="muted-label accent-label">Duration</div>
                    <p className="mt-4 text-sm leading-6 text-neutral-700">{duration}</p>
                  </div>
                ) : null}
                {pickupAreas ? (
                  <div className="surface-card p-5 md:col-span-2">
                    <div className="muted-label accent-label">Pickup Area</div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {pickupAreas.map((area) => (
                        <span key={area} className="border hairline bg-paper px-2.5 py-1.5 text-sm font-semibold text-neutral-700 md:px-3 md:py-2">
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
              {vehicleComfort ? (
                <div className="surface-card p-5">
                  <div className="muted-label accent-label">Vehicle Comfort</div>
                  <div className="mt-5 grid gap-3 md:grid-cols-2">
                    {vehicleComfort.map((item) => (
                      <div key={item} className="border-t hairline pt-3 text-sm leading-6 text-neutral-700">
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
              {included || excluded ? (
                <div className="grid gap-4 md:grid-cols-2">
                  {included ? (
                    <div className="surface-card p-5">
                      <div className="muted-label accent-label">Included</div>
                      <ul className="mt-4 grid gap-3 text-sm leading-6 text-neutral-700">
                        {included.map((item) => (
                          <li key={item} className="border-t hairline pt-3">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                  {excluded ? (
                    <div className="surface-card p-5">
                      <div className="muted-label accent-label">Not Included</div>
                      <ul className="mt-4 grid gap-3 text-sm leading-6 text-neutral-700">
                        {excluded.map((item) => (
                          <li key={item} className="border-t hairline pt-3">
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
              ) : null}
            </div>
          </div>
        </section>
      ) : null}
      <section className="section">
        <div className="container grid gap-10 md:grid-cols-[0.9fr_1.1fr]">
          <div>
            <div className="eyebrow">{serviceArea.eyebrow}</div>
            <h2 className="serif-title mt-3 text-[1.75rem] leading-[1.08] md:mt-4 md:text-4xl">{serviceArea.title}</h2>
          </div>
          <div className="grid gap-4 text-neutral-600 md:grid-cols-2">
            {serviceArea.items.map((item) => (
              <div key={item.label} className="border-t hairline pt-4 text-neutral-700">
                <div className="font-bold text-ink">{item.label}</div>
                {item.copy ? <p className="mt-2 text-sm leading-6 text-neutral-600">{item.copy}</p> : null}
              </div>
            ))}
          </div>
        </div>
      </section>
      {airportGuide ? (
        <section className="section bg-ivory">
          <div className="container grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <div className="eyebrow">{airportGuide.eyebrow}</div>
              <h2 className="serif-title mt-3 text-[1.75rem] leading-[1.08] md:mt-4 md:text-4xl">{airportGuide.title}</h2>
              <p className="mt-4 max-w-xl text-sm leading-6 text-neutral-600 md:mt-5 md:text-base md:leading-7">{airportGuide.copy}</p>
            </div>
            <div className="grid gap-4">
              {airportGuide.steps.map((step, index) => (
                <div key={step.label} className="grid gap-4 border-t hairline pt-5 sm:grid-cols-[72px_1fr]">
                  <span className="serif-title text-3xl text-bronze md:text-4xl">0{index + 1}</span>
                  <div>
                    <h3 className="text-base font-black md:text-lg">{step.label}</h3>
                    <p className="mt-2 text-sm leading-6 text-neutral-600 md:text-base md:leading-7">{step.copy}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}
      {isSeoulHub ? <SeoulFleetPreview /> : null}
      {bookingNotes ? (
        <section className="section">
          <div className="container grid gap-8 border-y hairline py-8 md:grid-cols-[0.9fr_1.1fr] md:items-center md:py-10">
            <div>
              <div className="eyebrow">Booking</div>
              <h2 className="serif-title mt-3 text-[1.75rem] leading-[1.08] md:mt-4 md:text-4xl">{bookingNotes.title}</h2>
              <p className="mt-4 text-sm leading-6 text-neutral-600 md:mt-5 md:text-base md:leading-7">{bookingNotes.copy}</p>
              <div className="mt-6 flex flex-wrap gap-2.5 md:mt-7 md:gap-3">
                <Link href={ctaHref} className="btn btn-dark">
                  {cta}
                </Link>
                <Link href={secondaryCta.href} className="btn btn-white">
                  {secondaryCta.label}
                </Link>
              </div>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {bookingNotes.items.map((item) => (
                <div key={item} className="surface-card p-4 text-sm font-bold leading-6 text-neutral-700 md:p-5">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>
      ) : null}
      {isSeoulHub ? <SeoulFooterCta /> : <RelatedServices />}
    </main>
  );
}

function DefaultHero({
  eyebrow,
  title,
  description,
  points,
  cta,
  ctaHref,
  secondaryCta,
  heroMeta,
  heroImage
}: Pick<ServicePageProps, "eyebrow" | "title" | "description" | "points" | "cta" | "ctaHref" | "secondaryCta" | "heroMeta" | "heroImage"> & {
  ctaHref: string;
  secondaryCta: NonNullable<ServicePageProps["secondaryCta"]>;
}) {
  return (
    <section className="section bg-ink text-white">
      <div className="container grid gap-10 lg:grid-cols-[1.02fr_0.98fr] lg:items-end">
        <div>
          <div className="eyebrow">{eyebrow}</div>
          <h1 className="serif-title mt-4 text-[2rem] leading-[1.04] sm:text-4xl md:mt-5 md:text-6xl">{title}</h1>
          <p className="mt-5 max-w-2xl text-sm leading-6 text-white/70 md:mt-7 md:text-base md:leading-7">{description}</p>
          <div className="mt-7 flex flex-wrap gap-2.5 sm:gap-3 md:mt-9">
            <Link href={ctaHref} className="btn btn-gold">
              {cta}
            </Link>
            <Link href={secondaryCta.href} className="btn btn-light">
              {secondaryCta.label}
            </Link>
          </div>
          {heroMeta ? (
            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {heroMeta.map((item) => (
                <div key={item.label} className="surface-card-dark p-3 md:p-4">
                  <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/42">{item.label}</div>
                  <div className="mt-2 text-sm font-bold text-white/88">{item.value}</div>
                </div>
              ))}
            </div>
          ) : null}
        </div>
        <div className="grid gap-4">
          {heroImage ? (
            <div className="relative min-h-[220px] overflow-hidden border dark-hairline bg-white/[0.04] md:min-h-[360px]">
              <Image src={heroImage.src} alt={heroImage.alt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 48vw" priority />
              <div className="absolute inset-0 bg-gradient-to-t from-black/78 via-black/14 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="max-w-md text-sm font-semibold leading-6 text-white/82">{heroImage.caption}</p>
              </div>
            </div>
          ) : null}
          <div className="surface-card-dark p-4 md:p-6">
            <div className="muted-label accent-label">Service Notes</div>
            <div className="mt-6 grid gap-4">
              {points.map((point) => (
                <div key={point} className="border-t dark-hairline pt-4 text-white/78">
                  {point}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SeoulHubHero({
  title,
  description,
  cta,
  ctaHref,
  secondaryCta,
  heroMeta
}: Pick<ServicePageProps, "title" | "description" | "cta" | "ctaHref" | "secondaryCta" | "heroMeta"> & {
  ctaHref: string;
  secondaryCta: NonNullable<ServicePageProps["secondaryCta"]>;
}) {
  return (
    <section className="overflow-hidden border-b hairline bg-ivory px-5 py-14 md:px-12 md:py-16 lg:px-16 lg:py-20">
      <div className="mx-auto grid w-full max-w-[1260px] gap-10 lg:grid-cols-[1.04fr_0.96fr] lg:items-end xl:gap-14">
        <div className="min-w-0">
          <div className="eyebrow">Business Chauffeur · Seoul</div>
          <h1 className="serif-title mt-5 max-w-[760px] text-[2.75rem] leading-[0.98] sm:text-6xl lg:text-[5.3rem] xl:text-[6rem]">
            <span className="block">Seoul</span>
            <span className="block italic text-bronze">Chauffeur</span>
            <span className="block">Service.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-neutral-600 md:text-lg md:leading-8">{description}</p>
          <div className="mt-8 grid gap-2 sm:flex sm:flex-wrap sm:gap-3">
            <Link href={ctaHref} className="btn btn-dark w-full sm:w-auto">
              {cta}
            </Link>
            <Link href={secondaryCta.href} className="btn btn-white w-full sm:w-auto">
              {secondaryCta.label}
            </Link>
          </div>
        </div>
        <div className="relative min-h-[300px] min-w-0 overflow-hidden border hairline bg-fog md:min-h-[430px]">
          <Image src="/Images/business.webp" alt="Executive chauffeur service for business travelers in Seoul" fill priority className="object-cover" sizes="(max-width: 1024px) 100vw, 48vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/64 via-black/8 to-transparent" />
          <div className="absolute bottom-3 left-3 right-3 border dark-hairline bg-black/58 p-3 text-white backdrop-blur-md md:bottom-5 md:left-5 md:right-5 md:p-4">
            <div className="text-[10px] font-black uppercase tracking-[0.16em] text-champagne">Coordination Desk</div>
            <div className="mt-2 text-xs font-bold leading-5 text-white/88 md:text-sm md:leading-6">Schedule review, vehicle fit, and handoff planning before confirmation.</div>
          </div>
        </div>
      </div>
      {heroMeta ? (
        <div className="mx-auto mt-10 grid w-full max-w-[1260px] border-y hairline md:grid-cols-4">
          {[...heroMeta, { label: "Coverage", value: "ICN, GMP, Seoul, Gyeonggi" }].map((item) => (
            <div key={item.label} className="border-b hairline px-0 py-4 last:border-b-0 md:border-b-0 md:border-r md:px-5 md:last:border-r-0">
              <div className="text-[10px] font-black uppercase tracking-[0.16em] text-neutral-500">{item.label}</div>
              <div className="mt-2 text-sm font-black leading-6 text-ink">{item.value}</div>
            </div>
          ))}
        </div>
      ) : null}
    </section>
  );
}

function ServiceTypesGrid() {
  return (
    <section className="border-b hairline bg-paper px-5 py-9 md:px-12 md:py-12">
      <div className="mx-auto w-full max-w-[1260px]">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="eyebrow">Service Types</div>
            <h2 className="serif-title mt-3 text-[1.75rem] leading-[1.06] md:text-4xl">Choose the service style before selecting a vehicle.</h2>
          </div>
          <Link href="/booking" className="btn btn-dark md:shrink-0">
            Start Booking
          </Link>
        </div>
        <div className="mt-7 grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          {serviceTypes.map((service) => (
            <Link key={`${service.index}-${service.label}`} href={service.href} className="surface-card group flex min-h-[210px] flex-col justify-between p-5 transition hover:-translate-y-0.5 hover:shadow-[0_18px_44px_rgba(9,10,11,0.12)]">
              <div>
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-xs font-black text-bronze">{service.index}</span>
                  <span className="border hairline bg-paper px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-neutral-500">{service.meta}</span>
                </div>
                <h3 className="mt-5 text-lg font-black leading-6 text-ink">{service.label}</h3>
                <p className="mt-3 text-sm leading-6 text-neutral-600">{service.description}</p>
              </div>
              <span className="mt-5 text-sm font-black text-bronze transition group-hover:text-ink">View Service</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function SeoulServiceHub() {
  return (
    <>
      <section className="overflow-hidden bg-ink px-5 py-12 text-white md:px-12 md:py-16 lg:px-16">
        <div className="mx-auto grid w-full max-w-[1260px] gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
          <div className="min-w-0">
            <div className="eyebrow">Premium Tier</div>
            <h2 className="serif-title mt-4 text-[1.8rem] leading-[1.04] sm:text-[2rem] md:text-5xl">
              VIP Protocol Coordination for delegations and high-profile guests.
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-6 text-white/68 md:text-base md:leading-7">
              A higher-touch coordination path for hosted executives, delegation movement, private events, venue handoffs, and multi-vehicle schedules where timing and discretion matter more than a simple ride.
            </p>
            <div className="mt-7 grid gap-2 sm:flex sm:flex-wrap sm:gap-3">
              <Link href="/vip-protocol-transport-korea" className="btn btn-gold w-full sm:w-auto">
                View VIP Protocol
              </Link>
              <Link href="/contact" className="btn btn-light w-full sm:w-auto">
                Speak to a Coordinator
              </Link>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-[0.9fr_1.1fr]">
            <div className="relative min-h-[260px] overflow-hidden border dark-hairline bg-white/[0.04] md:min-h-[360px]">
              <Image src="/Images/sprinter519.webp" alt="Mercedes-Benz Sprinter for delegation chauffeur service" fill className="object-cover" sizes="(max-width: 1024px) 100vw, 34vw" />
            </div>
            <div className="grid content-center gap-3">
              {["Dedicated schedule review before confirmation", "Airport, hotel, office, venue, and event handoffs", "Sedan, SUV, MPV, and Sprinter coordination", "Privacy-conscious handling of guest and itinerary details"].map((item, index) => (
                <div key={item} className="border-t dark-hairline pt-4">
                  <div className="font-mono text-xs font-black text-champagne">0{index + 1}</div>
                  <div className="mt-2 text-sm font-bold leading-6 text-white/82">{item}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="border-b hairline bg-paper px-5 py-12 md:px-12 md:py-16 lg:px-16">
        <div className="mx-auto w-full max-w-[1260px]">
          <div className="grid gap-5 md:grid-cols-[0.76fr_1.24fr] md:items-end">
            <div>
              <div className="eyebrow">Service Index</div>
              <h2 className="serif-title mt-3 text-[1.8rem] leading-[1.06] md:text-5xl">Four ways to hand off a Seoul day.</h2>
            </div>
            <p className="text-sm leading-6 text-neutral-600 md:text-base md:leading-7">
              Select the operating style first. Vehicle choice comes next, based on guest profile, luggage, schedule, and arrival tone.
            </p>
          </div>
          <div className="mt-9 border-t hairline">
            {seoulServiceRows.map((service) => (
              <Link key={service.label} href={service.href} className="group grid gap-4 border-b hairline py-6 transition hover:bg-ivory md:grid-cols-[70px_0.86fr_1.24fr_300px_64px] md:items-center md:px-4">
                <div className="font-mono text-xs font-black text-bronze">{service.index}</div>
                <div>
                  <h3 className="text-lg font-black leading-6 text-ink md:text-xl">{service.label}</h3>
                  <div className="mt-2 inline-flex border hairline bg-paper px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-neutral-500">{service.meta}</div>
                </div>
                <p className="text-sm leading-6 text-neutral-600">{service.description}</p>
                <div className="relative aspect-[16/10] overflow-hidden bg-fog">
                  <Image src={service.image} alt={service.alt} fill className="object-cover transition duration-300 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 300px" />
                </div>
                <span className="text-sm font-black text-bronze transition group-hover:text-ink">View</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function SeoulFleetPreview() {
  return (
    <section className="section bg-paper">
      <div className="container">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <div className="eyebrow">Fleet Match</div>
            <h2 className="serif-title mt-3 max-w-3xl text-[1.75rem] leading-[1.06] md:text-5xl">Match the vehicle to the guest, luggage, and schedule.</h2>
          </div>
          <Link href="/fleet" className="btn btn-white">
            View Fleet
          </Link>
        </div>
        <div className="mt-9 grid gap-4 md:grid-cols-3">
          {seoulFleetPreview.map((item) => (
            <article key={item.label} className="surface-card overflow-hidden">
              <div className="relative aspect-[16/10] bg-fog">
                <Image src={item.image} alt={item.alt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 380px" />
              </div>
              <div className="p-5">
                <div className="muted-label accent-label">{item.label}</div>
                <h3 className="mt-3 text-lg font-black leading-6 text-ink">{item.vehicle}</h3>
                <p className="mt-3 text-sm leading-6 text-neutral-600">{item.bestFor}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function SeoulFooterCta() {
  return (
    <section className="bg-ink px-5 py-12 text-white md:px-12 md:py-16">
      <div className="mx-auto flex max-w-[1180px] flex-col justify-between gap-7 md:flex-row md:items-end">
        <div>
          <div className="eyebrow">Request</div>
          <h2 className="serif-title mt-3 max-w-2xl text-[1.85rem] leading-[1.06] md:text-5xl">
            Coordinate a Seoul day with the right chauffeur plan.
          </h2>
        </div>
        <div className="grid gap-2 sm:flex sm:flex-wrap md:justify-end">
          <Link href="/booking" className="btn btn-gold w-full sm:w-auto">
            Start Booking
          </Link>
          <Link href="/contact" className="btn btn-light w-full sm:w-auto">
            Contact
          </Link>
        </div>
      </div>
    </section>
  );
}

function RelatedServices() {
  return (
    <section className="section bg-ivory">
      <div className="container">
        <div className="eyebrow">Related Services</div>
        <div className="mt-6 flex flex-wrap gap-3">
          {seoLinks.map(([label, href]) => (
            <Link key={href} href={href} className="btn btn-white">
              {label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
