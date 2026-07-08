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
    <section>
      <div>
        <div>
          <div className="text-[11px] font-black uppercase tracking-[0.14em] text-[#9a7b41] md:text-xs md:tracking-[0.16em]">Book a chauffeur</div>
          <h1 className="serif-title mt-2 max-w-3xl text-[2rem] leading-[0.98] tracking-normal text-ink md:text-5xl">Where to, and when?</h1>
          <p className="mt-2 max-w-[310px] text-sm leading-5 text-neutral-500 sm:hidden">Chauffeured rides across Korea · 3-hour lead time</p>
        </div>
        <p className="mt-3 hidden max-w-xl text-sm leading-6 text-neutral-600 sm:block">{selectedService.copy}</p>
      </div>
      <div className="mt-5 flex flex-wrap gap-2">
        {services.map((service) => (
          <button
            key={service.type}
            type="button"
            onClick={() => setServiceType(service.type)}
            className={`min-h-10 rounded-full border px-3.5 py-2 text-left text-[13px] font-black transition md:min-h-11 md:px-5 md:text-sm ${
              serviceType === service.type ? "border-ink bg-ink text-white" : "hairline bg-white text-neutral-700 hover:border-neutral-300 hover:text-black"
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
