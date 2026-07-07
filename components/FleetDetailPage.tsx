import Image from "next/image";
import Link from "next/link";
import type { FleetVehicle } from "@/lib/site-data";

export function FleetDetailPage({ vehicle }: { vehicle: FleetVehicle }) {
  return (
    <main>
      <section className="section bg-ink text-white">
        <div className="container grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <div className="eyebrow">{vehicle.requestedType}</div>
            <h1 className="serif-title mt-5 text-4xl leading-[1] sm:text-5xl md:text-7xl">{vehicle.name}</h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/70">{vehicle.profile}</p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href="/booking" className="btn btn-gold">
                Request this vehicle type
              </Link>
              <Link href="/fleet" className="btn btn-light">
                View all fleet
              </Link>
            </div>
          </div>
          <div className="surface-card-dark relative aspect-[16/10] overflow-hidden">
            <Image src={vehicle.image} alt={vehicle.name} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid gap-5 md:grid-cols-3">
          {[
            ["Passengers", `${vehicle.passengers} pax`],
            ["Luggage", vehicle.luggage],
            ["Requested type", vehicle.requestedType]
          ].map(([label, value]) => (
            <div key={label} className="surface-card border-l-2 border-l-champagne p-5">
              <div className="muted-label">{label}</div>
              <div className="serif-title mt-2 text-3xl">{value}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="section bg-ivory">
        <div className="container grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <div className="eyebrow">{vehicle.category}</div>
            <h2 className="serif-title mt-4 text-3xl leading-[1.05] sm:text-4xl">Representative vehicle for polished Korea movement.</h2>
            <p className="mt-5 max-w-xl leading-7 text-neutral-600">{vehicle.summary}</p>
            <div className="mt-7 border-l-2 border-champagne bg-white p-5 text-sm leading-6 text-neutral-700">
              {vehicle.bookingNote}
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="surface-card p-5">
              <div className="muted-label accent-label">Best use</div>
              <h3 className="serif-title mt-3 text-2xl">{vehicle.bestUseCase}</h3>
              <p className="mt-4 text-sm leading-6 text-neutral-600">{vehicle.comfort}</p>
            </div>
            <div className="surface-card p-5">
              <div className="muted-label accent-label">Planning fit</div>
              <p className="mt-3 text-sm font-bold leading-6 text-neutral-700">{vehicle.capacityNote}</p>
              <p className="mt-3 text-sm leading-6 text-neutral-600">{vehicle.luggageNote}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid gap-10 md:grid-cols-3">
          <div>
            <div className="eyebrow">Best for</div>
            <div className="mt-6 grid gap-3">
              {vehicle.bestFor.map((item) => (
                <div key={item} className="border-t hairline pt-4 text-lg">
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="eyebrow">Details</div>
            <div className="mt-6 grid gap-3">
              {vehicle.details.map((item) => (
                <div key={item} className="border-t hairline pt-4 text-lg">
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="eyebrow">Planning notes</div>
            <div className="mt-6 grid gap-3">
              {vehicle.planningNotes.map((item) => (
                <div key={item} className="border-t hairline pt-4 text-lg">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
