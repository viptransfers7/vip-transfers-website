import { ServicePage } from "@/components/ServicePage";
import { servicePages } from "@/lib/site-data";

export const metadata = { title: servicePages["incheon-airport-transfer"].title };
export default function Page() {
  return <ServicePage {...servicePages["incheon-airport-transfer"]} />;
}
