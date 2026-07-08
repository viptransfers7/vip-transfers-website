import { BookingFlow } from "@/components/booking/BookingFlow";

export const metadata = { title: "Book a Private Chauffeur" };

export default function BookingPage() {
  return (
    <main className="bg-[#ebe7de]">
      <section className="px-0 py-0 sm:px-4 sm:py-5 md:px-6 md:py-8 2xl:px-10">
        <div className="mx-auto max-w-[1520px]">
          <BookingFlow />
        </div>
      </section>
    </main>
  );
}
