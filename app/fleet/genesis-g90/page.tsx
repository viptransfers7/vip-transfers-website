import { FleetDetailPage } from "@/components/FleetDetailPage";
import { vehicles } from "@/lib/site-data";

const vehicle = vehicles.find((item) => item.slug === "genesis-g90")!;
export const metadata = { title: "Genesis G90 Chauffeur Korea" };

export default function Page() {
  return <FleetDetailPage vehicle={vehicle} />;
}
