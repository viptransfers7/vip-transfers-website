import { BookingFlow } from "@/components/booking/BookingFlow";

export const metadata = { title: "Book a Private Chauffeur" };

export default function BookingPage() {
  return (
    <main>
      <section className="hidden bg-ink px-5 py-6 text-white md:block md:px-12 md:py-14">
        <div className="container">
          <div className="eyebrow">Booking</div>
          <h1 className="serif-title mt-3 max-w-4xl text-3xl leading-[1] md:mt-4 md:text-6xl">Book a private chauffeur in Korea.</h1>
          <p className="mt-4 hidden max-w-2xl text-base leading-7 text-white/70 md:block">
            A server-quoted booking flow for airport transfers, point-to-point rides, hourly charters, private tours, and custom quote requests.
          </p>
        </div>
      </section>
      <section className="px-5 py-4 md:px-12 md:py-10">
        <div className="container">
          <BookingFlow />
        </div>
      </section>
    </main>
  );
}
