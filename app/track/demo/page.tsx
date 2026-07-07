import { TrackingStatusCard } from "@/components/TrackingStatusCard";

export const metadata = { title: "Booking Tracking Demo" };

const rows = [
  { label: "Customer status", value: "Confirmed and assigned" },
  { label: "Chauffeur", value: "Assigned chauffeur", sensitive: true },
  { label: "Chauffeur phone", value: "Shared on live tracking links after assignment", sensitive: true },
  { label: "Vehicle type", value: "Luxury sedan" },
  { label: "Vehicle detail", value: "Shared after final dispatch confirmation", sensitive: true },
  { label: "Pickup time", value: "July 18, 2026 / 09:30" },
  { label: "Pickup location", value: "Incheon International Airport Terminal 2" },
  { label: "Destination", value: "Four Seasons Hotel Seoul" }
];

export default function TrackingDemoPage() {
  return (
    <main>
      <TrackingStatusCard tokenLabel="Sample assigned tracking link" phase="assigned" rows={rows} demo />
    </main>
  );
}
