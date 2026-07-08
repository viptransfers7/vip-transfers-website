import { BookingFlow } from "@/components/booking/BookingFlow";

export const metadata = { title: "Book a Private Chauffeur" };

export default function BookingPage() {
  return (
    <main className="bg-[#ebe7de]">
      <section className="px-0 py-0 sm:px-4 sm:py-5 md:px-8 md:py-8">
        <div className="mx-auto max-w-[1240px]">
          <BookingFlow />
        </div>
      </section>
    </main>
  );
}
