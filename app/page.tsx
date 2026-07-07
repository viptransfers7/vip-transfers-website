import Image from "next/image";
import Link from "next/link";
import { FleetCard } from "@/components/FleetCard";
import { SectionHeading } from "@/components/SectionHeading";
import { seoLinks, vehicles } from "@/lib/site-data";

const trust = [
  ["Airport-ready", "Flight-aware pickups at ICN and GMP with clear arrival guidance."],
  ["Korea specialist", "Seoul hotels, business districts, venues, residences, and regional trips."],
  ["VIP discretion", "Quiet chauffeurs, polished vehicles, and privacy-first coordination."],
  ["Group capable", "Sedans, SUVs, MPVs, and executive vans for private and delegation travel."]
];

const services = [
  ["Airport Transfers", "Private arrival and departure service for Incheon, Gimpo, Seoul hotels, residences, and venues."],
  ["Hourly Chauffeur", "A private chauffeur on standby for meetings, shopping, dining, and multi-stop days in Seoul."],
  ["Corporate Roadshows", "Schedule-sensitive transport for investor meetings, site visits, events, and hosted executives."],
  ["Delegation Transport", "Premium sedans, SUVs, vans, and Sprinters coordinated for discreet group movement."],
  ["Private Tours", "Chauffeured Seoul, Nami Island, and custom Korea itineraries for family and VIP guests."]
];

export default function HomePage() {
  return (
    <main>
      <section className="relative grid min-h-[calc(100svh-104px)] overflow-hidden bg-ink text-white lg:grid-cols-[1.02fr_0.98fr]">
        <Image src="/Images/business.webp" alt="" fill priority className="object-cover opacity-25 lg:hidden" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/88 via-black/78 to-black/94 lg:hidden" />
        <div className="relative z-10 flex flex-col justify-center px-5 py-12 md:px-14 md:py-20 lg:px-20">
          <div className="eyebrow">VIP Transfers Korea</div>
          <h1 className="serif-title mt-5 max-w-4xl text-4xl leading-[1] sm:text-5xl md:text-7xl xl:text-8xl">Private chauffeur service for VIP travel in Korea.</h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-white/74 md:text-lg md:leading-8">
            Premium airport transfers, executive roadshows, hourly chauffeurs, and private tours for overseas guests moving through Seoul and Korea.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link href="/booking" className="btn btn-gold w-full sm:w-auto">
              Book Chauffeur Service
            </Link>
            <Link href="/contact" className="btn btn-light w-full sm:w-auto">
              Request VIP Support
            </Link>
          </div>
          <div className="surface-card-dark mt-8 grid max-w-3xl gap-2 p-2 backdrop-blur md:mt-10 md:grid-cols-[1fr_1fr_1fr_auto]">
            {[
              ["Typical request", "ICN arrival to Seoul"],
              ["Vehicle class", "Sedan, SUV, van"],
              ["Best for", "VIP and executive guests"]
            ].map(([label, value]) => (
              <div key={label} className="border dark-hairline bg-black/16 p-3">
                <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/42">{label}</div>
                <div className="mt-1 text-sm font-bold">{value}</div>
              </div>
            ))}
            <Link href="/booking" className="btn btn-gold min-h-full whitespace-nowrap">
              Start Quote
            </Link>
          </div>
        </div>
        <div className="relative hidden min-h-[420px] border-l dark-hairline lg:block lg:min-h-full">
          <Image src="/Images/business.webp" alt="VIP Transfers Korea premium chauffeur fleet" fill priority className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 border dark-hairline bg-black/40 p-5 backdrop-blur-md">
            <div className="text-xs font-bold uppercase tracking-[0.18em] text-champagne">Premium Korea ground transport</div>
            <p className="mt-2 max-w-xl text-sm leading-6 text-white/76">
              Seoul, Incheon Airport, Gimpo Airport, hotels, private residences, event venues, and regional Korea itineraries.
            </p>
          </div>
        </div>
      </section>

      <section className="section border-b hairline">
        <div className="container grid gap-3 md:grid-cols-4">
          {trust.map(([title, copy]) => (
            <div key={title} className="surface-card border-l-2 border-l-champagne px-5 py-6">
              <div className="text-sm font-black uppercase tracking-[0.12em]">{title}</div>
              <p className="mt-3 text-sm leading-6 text-neutral-600">{copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHeading
            eyebrow="Services"
            title="Built around the way VIP guests actually move in Korea."
            copy="Use the booking flow for standard transfers, or contact the team for roadshows, delegations, multi-day schedules, and custom private itineraries."
          />
          <div className="mt-12 grid gap-4 md:grid-cols-5">
            {services.map(([title, copy]) => (
              <div key={title} className="surface-card p-5">
                <h3 className="serif-title text-2xl">{title}</h3>
                <p className="mt-4 text-sm leading-6 text-neutral-600">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-ink text-white">
        <div className="container grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <SectionHeading
            light
            eyebrow="Korea Specialist"
            title="Local knowledge for VIP schedules in Korea."
            copy="We plan around airport terminals, Seoul traffic windows, hotel entrances, venue access, business districts, and multi-stop executive days."
          />
          <div className="grid gap-3 sm:grid-cols-2">
            {["Seoul", "Incheon Airport", "Gimpo Airport", "Hotels", "Business districts", "Event venues", "Convention centers", "Private residences"].map((item) => (
              <div key={item} className="surface-card-dark p-5 text-white/82">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading eyebrow="Fleet" title="Premium vehicles for discreet movement." copy="Executive sedans, luxury SUVs, premium MPVs, and Sprinter-class vans selected by passenger count, luggage, presentation, and schedule type." />
            <Link href="/fleet" className="btn btn-white">
              View Fleet
            </Link>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {vehicles.map((vehicle) => (
              <FleetCard key={vehicle.slug} vehicle={vehicle} />
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-ivory">
        <div className="container grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <SectionHeading eyebrow="Airport Pickup Guide" title="Clear arrival flow for international guests." />
          <div className="grid gap-4">
            {["We track your flight.", "After baggage claim, please proceed to the arrival hall.", "Your chauffeur will meet you with your name sign."].map((item, index) => (
              <div key={item} className="flex gap-5 border-t hairline pt-5">
                <span className="serif-title text-4xl text-bronze">0{index + 1}</span>
                <p className="pt-2 text-lg text-neutral-700">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid gap-8 md:grid-cols-[0.8fr_1.2fr]">
          <SectionHeading
            eyebrow="Trust Signals"
            title="What guests value most."
            copy="Clear airport pickup, quiet vehicles, discreet chauffeurs, and careful coordination for schedule-sensitive travel in Korea."
          />
          <div className="grid gap-4 md:grid-cols-2">
            {[
              ["Executive arrivals", "Name-sign pickup, flight-aware timing, and calm handoff after long-haul flights."],
              ["Business days", "Hourly standby and multi-stop routing for Seoul meetings and site visits."],
              ["Delegation movement", "Vehicle-class planning for groups that need a polished, unified arrival."],
              ["Private travel", "Comfortable transfers and chauffeured tours for families, guests, and VIP travelers."]
            ].map(([title, copy]) => (
              <div key={title} className="surface-card p-5">
                <div className="muted-label accent-label">{title}</div>
                <p className="mt-4 text-sm leading-6 text-neutral-600">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-ink text-white">
        <div className="container grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <div className="eyebrow">Ready to move</div>
            <h2 className="serif-title mt-4 max-w-3xl text-4xl leading-[1.02] md:text-6xl">Start with a booking or send the schedule.</h2>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href="/booking" className="btn btn-gold">
                Book Chauffeur Service
              </Link>
              <Link href="/contact" className="btn btn-light">
                Contact VIP Transfers Korea
              </Link>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 lg:justify-end">
            {seoLinks.map(([label, href]) => (
              <Link key={href} href={href} className="btn btn-light">
                {label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
