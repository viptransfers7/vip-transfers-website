import Image from "next/image";
import Link from "next/link";

type CardVehicle = {
  slug: string;
  name: string;
  category: string;
  requestedType: string;
  passengers: string;
  luggage: string;
  image: string;
  summary: string;
  bestUseCase: string;
  capacityNote: string;
  luggageNote: string;
};

export function FleetCard({ vehicle }: { vehicle: CardVehicle }) {
  return (
    <article className="surface-card overflow-hidden transition duration-200 hover:-translate-y-0.5 hover:shadow-soft">
      <Link href={`/fleet/${vehicle.slug}`} className="block focus-ring">
        <div className="relative aspect-[16/10] bg-neutral-100">
          <Image src={vehicle.image} alt={vehicle.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 33vw" />
        </div>
        <div className="p-4 md:p-5">
          <div className="muted-label accent-label">{vehicle.requestedType}</div>
          <h3 className="serif-title mt-2 text-xl md:text-2xl">{vehicle.name}</h3>
          <p className="mt-2 text-sm leading-6 text-neutral-600 md:mt-3">{vehicle.summary}</p>
          <div className="mt-4 grid grid-cols-2 gap-2 md:mt-5">
            <div className="border hairline bg-ivory p-2.5 md:p-3">
              <div className="text-[0.68rem] font-bold uppercase tracking-[0.12em] text-neutral-500">Capacity</div>
              <div className="mt-1 text-base font-black md:text-lg">{vehicle.passengers} pax</div>
            </div>
            <div className="border hairline bg-ivory p-2.5 md:p-3">
              <div className="text-[0.68rem] font-bold uppercase tracking-[0.12em] text-neutral-500">Luggage</div>
              <div className="mt-1 text-base font-black md:text-lg">{vehicle.luggage}</div>
            </div>
          </div>
          <div className="mt-4 border-t hairline pt-3 md:mt-5 md:pt-4">
            <div className="text-xs font-bold uppercase tracking-[0.12em] text-neutral-500">Best for</div>
            <p className="mt-2 text-sm font-bold leading-6">{vehicle.bestUseCase}</p>
          </div>
          <div className="mt-4 grid gap-1 text-xs leading-5 text-neutral-500">
            <p>{vehicle.capacityNote}</p>
            <p>{vehicle.luggageNote}</p>
          </div>
        </div>
      </Link>
    </article>
  );
}
