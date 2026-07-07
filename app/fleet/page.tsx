import { FleetCard } from "@/components/FleetCard";
import { SectionHeading } from "@/components/SectionHeading";
import { vehicles } from "@/lib/site-data";

export const metadata = {
  title: "VIP Chauffeur Fleet"
};

export default function FleetPage() {
  return (
    <main>
      <section className="section bg-ink text-white">
        <div className="container">
          <SectionHeading
            light
            eyebrow="Fleet"
            title="Representative chauffeur vehicles for Korea."
            copy="Choose the requested vehicle type that fits your passenger count, luggage, schedule, and arrival style. Dispatch confirms the exact operated vehicle before service."
          />
          <div className="mt-10 grid gap-3 text-sm text-white/76 md:grid-cols-3">
            {[
              ["Requested type", "Website bookings carry the catalog vehicle type, not a plate number or assigned car."],
              ["Capacity planning", "Passenger and luggage counts guide whether a sedan, SUV, MPV, or Sprinter is the right fit."],
              ["Reservation support", "Our team reviews route, timing, luggage, and presentation before final confirmation."]
            ].map(([title, copy]) => (
              <div key={title} className="surface-card-dark p-5">
                <div className="muted-label accent-label">{title}</div>
                <p className="mt-3 leading-6">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {vehicles.map((vehicle) => (
              <FleetCard key={vehicle.slug} vehicle={vehicle} />
            ))}
          </div>
          <div className="mt-10 border-l-2 border-champagne bg-ivory p-5 text-sm leading-6 text-neutral-700">
            Vehicle pages show representative vehicles and booking guidance. Actual driver, plate, and assigned vehicle details are managed after reservation review.
          </div>
        </div>
      </section>
    </main>
  );
}
