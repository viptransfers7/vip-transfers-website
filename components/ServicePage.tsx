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
};

const defaultServiceArea = {
  eyebrow: "Korea Specialist",
  title: "Built for Seoul, airports, hotels, venues, and business districts.",
  items: ["Seoul", "Incheon Airport", "Gimpo Airport", "Luxury hotels", "Convention centers", "Business districts", "Events", "Regional Korea"].map((item) => ({
    label: item,
    copy: ""
  }))
};

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
  bookingNotes
}: ServicePageProps) {
  const hasTourDetails = Boolean(itinerary || pickupAreas || duration || included || excluded || vehicleComfort);

  return (
    <main>
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
    </main>
  );
}
