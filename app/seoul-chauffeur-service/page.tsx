import { ServicePage } from "@/components/ServicePage";
import { servicePages } from "@/lib/site-data";

export const metadata = { title: servicePages["seoul-chauffeur-service"].title };
export default function Page() {
  return <ServicePage {...servicePages["seoul-chauffeur-service"]} />;
}
