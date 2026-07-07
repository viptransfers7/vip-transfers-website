import { ServicePage } from "@/components/ServicePage";
import { servicePages } from "@/lib/site-data";

export const metadata = { title: servicePages["airport-transfer-seoul"].title };
export default function Page() {
  return <ServicePage {...servicePages["airport-transfer-seoul"]} />;
}
