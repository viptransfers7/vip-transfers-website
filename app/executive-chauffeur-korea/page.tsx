import { ServicePage } from "@/components/ServicePage";
import { servicePages } from "@/lib/site-data";

export const metadata = { title: servicePages["executive-chauffeur-korea"].title };
export default function Page() {
  return <ServicePage {...servicePages["executive-chauffeur-korea"]} />;
}
