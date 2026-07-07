import { TrackingStatusCard } from "@/components/TrackingStatusCard";

export const metadata = { title: "Booking Tracking" };

export default function TrackingPage({ params }: { params: { token: string } }) {
  const isDemo = params.token === "demo";
  const rows = isDemo
    ? [
        { label: "Customer status", value: "Confirmed and assigned" },
        { label: "Chauffeur", value: "Assigned chauffeur", sensitive: true },
        { label: "Chauffeur phone", value: "Shared on live tracking links after assignment", sensitive: true },
        { label: "Vehicle type", value: "Luxury sedan" },
        { label: "Vehicle detail", value: "Shared after final dispatch confirmation", sensitive: true },
        { label: "Pickup time", value: "July 18, 2026 / 09:30" },
        { label: "Pickup location", value: "Incheon International Airport Terminal 2" },
        { label: "Destination", value: "Four Seasons Hotel Seoul" }
      ]
    : [
        { label: "Customer status", value: "Received and being prepared" },
        { label: "Payment", value: "Shown on your booking receipt when applicable" },
        { label: "Chauffeur", value: "Available after assignment" },
        { label: "Chauffeur phone", value: "Available after assignment" },
        { label: "Vehicle type", value: "Shown in your booking confirmation" },
        { label: "Pickup time", value: "See your confirmation email or support thread" },
        { label: "Pickup location", value: "See your confirmation email or support thread" },
        { label: "Destination", value: "See your confirmation email or support thread" }
      ];

  return (
    <main>
      <TrackingStatusCard tokenLabel={params.token} phase={isDemo ? "assigned" : "pre-assignment"} rows={rows} demo={isDemo} />
    </main>
  );
}
