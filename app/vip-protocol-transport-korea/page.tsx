import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "VIP Protocol Transport Korea",
  description:
    "VIP protocol transport and chauffeur coordination in Korea for delegations, high-profile guests, executive meetings, events, and multi-vehicle schedules."
};

const featuredVideo = {
  title: "Your Trusted Affiliate Partner in Korea: VIP TRANSFERS KOREA",
  videoId: "s9aNU1Y5vCg",
  description:
    "A short introduction to VIP Transfers Korea as a ground transportation partner for agencies, corporations, private clients, and hosted guests visiting Korea."
};

const protocolCapabilities = [
  {
    title: "Delegation Movement",
    copy: "Coordinated chauffeur service for visiting delegations, hosted groups, government-style schedules, and multi-vehicle movements."
  },
  {
    title: "High-Profile Guests",
    copy: "Discreet vehicle planning for guests who need privacy, calm arrivals, controlled timing, and careful hotel or venue handoffs."
  },
  {
    title: "Business Meetings",
    copy: "Point-to-point or hourly chauffeur support for executives moving between hotels, offices, private clubs, restaurants, and venues."
  },
  {
    title: "Event Transport",
    copy: "Guest transfer planning for conferences, brand events, dinners, receptions, site visits, and production schedules."
  }
];

const protocolGallery = [
  {
    src: "/Images/business.webp",
    alt: "Executive chauffeur greeting a business traveler in Seoul",
    title: "Executive Meeting Arrival",
    caption: "Hotel, office, and venue handoffs for senior business travelers."
  },
  {
    src: "/Images/sprinter519.webp",
    alt: "Mercedes-Benz Sprinter prepared for group chauffeur movement",
    title: "Delegation Vehicle Planning",
    caption: "Sprinter-based movement for visiting teams, roadshows, and hosted groups."
  },
  {
    src: "/Images/escalade.webp",
    alt: "Cadillac Escalade premium SUV chauffeur service",
    title: "High-Profile Guest Movement",
    caption: "Premium SUV presentation for privacy-conscious guests and luggage-heavy arrivals."
  },
  {
    src: "/Images/sclass.webp",
    alt: "Mercedes S-Class VIP chauffeur service in Korea",
    title: "VIP Sedan Assignment",
    caption: "Luxury sedan service for refined arrival tone and private schedules."
  },
  {
    src: "/Images/staria.webp",
    alt: "Hyundai Staria MPV chauffeur service",
    title: "Assistant and Family Support",
    caption: "MPV support for assistants, family members, compact teams, and flexible stops."
  },
  {
    src: "/Images/suburban.webp",
    alt: "Chevrolet Suburban executive SUV chauffeur service",
    title: "Event and Venue Handoff",
    caption: "Controlled pickup and drop-off planning for events, dinners, and hosted programs."
  }
];

const operatingDetails = [
  "Airport, hotel, venue, office, and private residence coordination",
  "Executive sedan, luxury sedan, SUV, MPV, and Sprinter options",
  "Single vehicle, small convoy, or multi-vehicle schedule planning",
  "Privacy-conscious presentation with client names and sensitive details omitted",
  "Schedule review before confirmation for protocol-sensitive or complex movements",
  "Dashboard operations handle dispatch, assignment, driver, and vehicle details after booking"
];

const fleetRoles = [
  ["Genesis G90", "Discreet executive sedan for senior guests and city meetings"],
  ["Mercedes S-Class", "Luxury sedan for VIP arrivals, private schedules, and refined presentation"],
  ["Cadillac Escalade / Suburban", "Premium SUV profile for high-profile guests, luggage, and security-conscious movement"],
  ["Hyundai Staria / Kia Carnival", "Practical MPV movement for assistants, families, small teams, and flexible stops"],
  ["Mercedes-Benz Sprinter", "Delegation, roadshow, event, and team movement in one controlled vehicle"]
];

export default function Page() {
  return (
    <main>
      <section className="bg-ink px-5 py-14 text-white md:px-12 md:py-16 lg:px-16 lg:py-20 xl:py-24">
        <div className="mx-auto grid w-full max-w-[1260px] gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(520px,1.05fr)] lg:items-center xl:gap-14">
          <div className="max-w-[590px]">
            <div className="eyebrow">Highest-Touch Coordination Tier</div>
            <h1 className="serif-title mt-4 text-[2.35rem] leading-[1.02] sm:text-5xl md:mt-5 lg:text-[3.6rem] xl:text-[4rem]">
              VIP protocol chauffeur coordination for delegations, high-profile guests, and business events in Korea.
            </h1>
            <p className="mt-5 max-w-xl text-sm leading-6 text-white/70 md:mt-6 md:text-base md:leading-7">
              A higher-touch planning path for executive meetings, hosted VIP guests, private events, corporate visits, and multi-vehicle movements where timing, privacy, and handoff control matter.
            </p>
            <div className="mt-7 flex flex-wrap gap-2.5 sm:gap-3">
              <Link href="/contact" className="btn btn-gold">
                Request VIP Protocol Plan
              </Link>
              <Link href="/booking" className="btn btn-light">
                Start Booking
              </Link>
            </div>
            <div className="mt-8 grid gap-3 sm:grid-cols-3 lg:max-w-[560px]">
              {[
                ["Best for", "Delegations and VIP guests"],
                ["Service style", "Protocol-aware coordination"],
                ["Coverage", "Seoul, airports, and Korea"]
              ].map(([label, value]) => (
                <div key={label} className="surface-card-dark p-3 md:p-4">
                  <div className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/42">{label}</div>
                  <div className="mt-2 text-sm font-bold text-white/88">{value}</div>
                </div>
              ))}
            </div>
          </div>
          <FeaturedVideo />
        </div>
      </section>

      <section className="section border-b hairline">
        <div className="container grid gap-10 lg:grid-cols-[0.86fr_1.14fr] lg:items-start">
          <div className="max-w-[470px]">
            <div className="eyebrow">Selected Experience</div>
            <h2 className="serif-title mt-3 text-[1.75rem] leading-[1.08] md:mt-4 md:text-[3.25rem]">
              Protocol-level coordination for clients who need more than a ride.
            </h2>
            <p className="mt-4 text-sm leading-6 text-neutral-600 md:mt-5 md:text-base md:leading-7">
              This service is built around timing, staging, privacy, guest handoff, luggage, vehicle selection, and operational control. Public examples avoid names, faces, logos, and sensitive event details when discretion is required.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {protocolCapabilities.map((item) => (
              <div key={item.title} className="surface-card p-5">
                <h3 className="text-base font-black text-ink md:text-lg">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-neutral-600">{item.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid gap-6 md:grid-cols-[0.86fr_1.14fr] md:items-end">
            <div>
              <div className="eyebrow">Protocol Portfolio</div>
              <h2 className="serif-title mt-3 text-[1.75rem] leading-[1.08] md:mt-4 md:text-5xl">
                A visual record of business, event, and VIP chauffeur work.
              </h2>
            </div>
            <p className="text-sm leading-6 text-neutral-600 md:text-base md:leading-7">
              The gallery is organized around the operating situations clients usually ask about: airport arrivals, executive meetings, delegation schedules, event transfers, and high-profile guest movement.
            </p>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {protocolGallery.map((item, index) => (
              <article key={item.title} className={index === 0 ? "surface-card overflow-hidden md:col-span-2 md:row-span-2" : "surface-card overflow-hidden"}>
                <div className={index === 0 ? "relative aspect-[16/10] md:aspect-[16/11]" : "relative aspect-[16/11]"}>
                  <Image src={item.src} alt={item.alt} fill className="object-cover" sizes={index === 0 ? "(max-width: 768px) 100vw, 760px" : "(max-width: 768px) 100vw, 380px"} />
                </div>
                <div className="p-4 md:p-5">
                  <div className="text-[10px] font-black uppercase tracking-[0.16em] text-gold">0{index + 1}</div>
                  <h3 className="mt-2 text-base font-black text-ink md:text-lg">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-neutral-600">{item.caption}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-ivory">
        <div className="container grid gap-10 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="eyebrow">Vehicle Planning</div>
            <h2 className="serif-title mt-3 text-[1.75rem] leading-[1.08] md:mt-4 md:text-5xl">
              Match the vehicle profile to the guest, schedule, and arrival style.
            </h2>
            <div className="mt-7 grid gap-3">
              {fleetRoles.map(([vehicle, role]) => (
                <div key={vehicle} className="grid gap-2 border-t hairline pt-4 sm:grid-cols-[180px_1fr]">
                  <div className="font-black text-ink">{vehicle}</div>
                  <div className="text-sm leading-6 text-neutral-600">{role}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="surface-card p-5 md:p-6">
            <div className="muted-label accent-label">Operating Notes</div>
            <div className="mt-5 grid gap-4">
              {operatingDetails.map((item) => (
                <div key={item} className="border-t hairline pt-4 text-sm leading-6 text-neutral-700">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid gap-8 border-y hairline py-8 md:grid-cols-[0.9fr_1.1fr] md:items-center md:py-10">
          <div>
            <div className="eyebrow">Request</div>
            <h2 className="serif-title mt-3 text-[1.75rem] leading-[1.08] md:mt-4 md:text-4xl">
              Send the schedule, guest profile, and vehicle needs.
            </h2>
            <p className="mt-4 text-sm leading-6 text-neutral-600 md:mt-5 md:text-base md:leading-7">
              For protocol-level work, the public site captures the request. Final dispatch, driver assignment, actual vehicle details, and operational notes stay within the coordination workflow.
            </p>
            <div className="mt-6 flex flex-wrap gap-2.5 md:mt-7 md:gap-3">
              <Link href="/contact" className="btn btn-dark">
                Discuss Protocol Service
              </Link>
              <Link href="/seoul-chauffeur-service" className="btn btn-white">
                Seoul Chauffeur Service
              </Link>
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {["Guest profile and privacy needs", "Pickup, stops, venues, and timing", "Passenger and luggage count", "Vehicle preference and convoy needs", "Airport, hotel, and event handoff notes", "Payment and confirmation workflow"].map((item) => (
              <div key={item} className="surface-card p-4 text-sm font-bold leading-6 text-neutral-700 md:p-5">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function FeaturedVideo() {
  return (
    <div className="grid gap-4 lg:justify-self-end">
      <div className="max-w-[650px] overflow-hidden border dark-hairline bg-white/[0.04] shadow-[0_24px_80px_rgba(0,0,0,0.34)]">
        <div className="relative aspect-video">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${featuredVideo.videoId}`}
            title={featuredVideo.title}
            className="absolute inset-0 h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>
        <div className="p-4 md:p-5">
          <div className="muted-label accent-label">Partner Video</div>
          <h2 className="mt-3 text-base font-black leading-6 text-white md:text-lg">{featuredVideo.title}</h2>
          <p className="mt-2 text-sm leading-6 text-white/68">{featuredVideo.description}</p>
        </div>
      </div>
    </div>
  );
}
