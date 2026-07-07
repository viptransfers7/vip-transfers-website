import { ServicePage } from "@/components/ServicePage";
import { servicePages } from "@/lib/site-data";

export const metadata = { title: servicePages["corporate-roadshow-korea"].title };
export default function Page() {
  return <ServicePage {...servicePages["corporate-roadshow-korea"]} />;
}
