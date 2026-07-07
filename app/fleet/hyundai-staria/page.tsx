import { FleetDetailPage } from "@/components/FleetDetailPage";
import { vehicles } from "@/lib/site-data";

const vehicle = vehicles.find((item) => item.slug === "hyundai-staria")!;
export const metadata = { title: "Hyundai Staria Chauffeur Korea" };

export default function Page() {
  return <FleetDetailPage vehicle={vehicle} />;
}
