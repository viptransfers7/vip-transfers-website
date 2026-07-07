import { ServicePage } from "@/components/ServicePage";
import { servicePages } from "@/lib/site-data";

export const metadata = { title: servicePages["private-tours-korea"].title };
export default function Page() {
  return <ServicePage {...servicePages["private-tours-korea"]} />;
}
