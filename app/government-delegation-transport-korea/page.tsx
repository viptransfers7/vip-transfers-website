import { ServicePage } from "@/components/ServicePage";
import { servicePages } from "@/lib/site-data";

export const metadata = { title: servicePages["government-delegation-transport-korea"].title };
export default function Page() {
  return <ServicePage {...servicePages["government-delegation-transport-korea"]} />;
}
