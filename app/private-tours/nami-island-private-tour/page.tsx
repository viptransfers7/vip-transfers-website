import { ServicePage } from "@/components/ServicePage";
import { privateTours } from "@/lib/site-data";

export const metadata = { title: privateTours["nami-island-private-tour"].title };
export default function Page() {
  return <ServicePage {...privateTours["nami-island-private-tour"]} cta="Request Private Tour" />;
}
