import { FleetDetailPage } from "@/components/FleetDetailPage";
import { vehicles } from "@/lib/site-data";

const vehicle = vehicles.find((item) => item.slug === "mercedes-sprinter")!;
export const metadata = { title: "Mercedes Sprinter Chauffeur Korea" };

export default function Page() {
  return <FleetDetailPage vehicle={vehicle} />;
}
