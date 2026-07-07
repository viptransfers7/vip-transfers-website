import { FleetDetailPage } from "@/components/FleetDetailPage";
import { vehicles } from "@/lib/site-data";

const vehicle = vehicles.find((item) => item.slug === "mercedes-s-class")!;
export const metadata = { title: "Mercedes-Benz S-Class Chauffeur Korea" };

export default function Page() {
  return <FleetDetailPage vehicle={vehicle} />;
}
