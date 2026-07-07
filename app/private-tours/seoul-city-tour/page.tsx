import { ServicePage } from "@/components/ServicePage";
import { privateTours } from "@/lib/site-data";

export const metadata = { title: privateTours["seoul-city-tour"].title };
export default function Page() {
  return <ServicePage {...privateTours["seoul-city-tour"]} cta="Request Private Tour" />;
}
