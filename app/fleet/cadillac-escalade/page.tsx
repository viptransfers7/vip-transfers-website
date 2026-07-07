import { FleetDetailPage } from "@/components/FleetDetailPage";
import { vehicles } from "@/lib/site-data";

const vehicle = vehicles.find((item) => item.slug === "cadillac-escalade")!;
export const metadata = { title: "Cadillac Escalade Chauffeur Korea" };

export default function Page() {
  return <FleetDetailPage vehicle={vehicle} />;
}
