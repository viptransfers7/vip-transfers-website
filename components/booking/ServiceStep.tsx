"use client";

import type { ServiceType } from "@/lib/pricing/types";

const services: Array<{ type: ServiceType; title: string; shortTitle: string; copy: string }> = [
  { type: "airport_transfer", title: "Airport Transfer", shortTitle: "Airport", copy: "ICN or GMP arrivals and departures with flight-aware pickup." },
  { type: "point_to_point", title: "Point to Point", shortTitle: "Point-to-point", copy: "Private transfer between Seoul, hotels, venues, and nearby regions." },
  { type: "hourly_charter", title: "Hourly Charter", shortTitle: "Hourly", copy: "5h, 10h, or 12h chauffeur standby for flexible schedules." },
  { type: "private_tour", title: "Private Tour", shortTitle: "Tour", copy: "Seoul, Nami Island, ski resort, and custom chauffeured tours." },
  { type: "custom_quote", title: "Custom Quote", shortTitle: "Custom", copy: "Complex routing, events, delegations, or multi-vehicle requests." }
];

export function ServiceStep({ serviceType, setServiceType }: { serviceType: ServiceType; setServiceType: (type: ServiceType) => void }) {
  const selectedService = services.find((service) => service.type === serviceType) || services[0];

  return (
    <section className="border hairline bg-[#fbfaf6] p-4 md:p-5">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
        <div>
          <div className="text-xs font-black uppercase tracking-[0.16em] text-[#9a7b41]">Service</div>
          <h1 className="serif-title mt-1 text-2xl md:text-4xl">Book your chauffeur</h1>
        </div>
        <p className="hidden max-w-sm text-sm leading-6 text-neutral-600 sm:block">{selectedService.copy}</p>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2 lg:grid-cols-5">
        {services.map((service) => (
          <button
            key={service.type}
            type="button"
            onClick={() => setServiceType(service.type)}
            className={`min-h-11 border px-3 py-2.5 text-left text-sm font-black transition ${
              serviceType === service.type ? "border-black bg-black text-white" : "hairline bg-white text-neutral-700 hover:border-champagne hover:text-black"
            }`}
          >
            <span className="sm:hidden">{service.shortTitle}</span>
            <span className="hidden sm:inline">{service.title}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
