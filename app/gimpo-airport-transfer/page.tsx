import { ServicePage } from "@/components/ServicePage";
import { servicePages } from "@/lib/site-data";

export const metadata = { title: servicePages["gimpo-airport-transfer"].title };
export default function Page() {
  return <ServicePage {...servicePages["gimpo-airport-transfer"]} />;
}
