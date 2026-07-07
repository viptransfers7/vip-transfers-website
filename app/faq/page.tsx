export const metadata = { title: "FAQ" };

const faqs = [
  [
    "Can I book before every detail is final?",
    "Yes. Send the fixed details first, such as date, approximate time, pickup area, destination, passenger count, and preferred vehicle type. The team can help refine the schedule before confirmation."
  ],
  [
    "When do I receive a confirmed price?",
    "Airport transfers and simple point-to-point trips may be priced quickly. Hourly service, roadshows, regional travel, and multi-vehicle programs are reviewed first so the quote matches the actual itinerary."
  ],
  [
    "Do I pay immediately?",
    "Some bookings can proceed to payment after the trip details are clear. Custom quote requests are not charged until availability, vehicle type, and pricing are confirmed."
  ],
  [
    "Do you track flights for airport pickups?",
    "Yes. Airport pickup planning can use flight information for Incheon Airport and Gimpo Airport arrivals or departures. Please include the flight number when you request the booking."
  ],
  [
    "Where does the chauffeur meet guests at the airport?",
    "For arrival pickups, guests proceed to the arrival hall after baggage claim. A name sign can be arranged when requested and confirmed in advance."
  ],
  [
    "Will I know the chauffeur and vehicle in advance?",
    "The public tracking link shows customer-facing details. Chauffeur contact and vehicle details appear only after dispatch confirms the assignment for the trip."
  ],
  [
    "Can I request a specific vehicle model?",
    "You may request a preferred model or vehicle type. Confirmation is based on availability, luggage fit, passenger count, route, and service requirements."
  ],
  [
    "What should I share for luggage and group size?",
    "Please include passenger count, checked bags, carry-ons, golf bags, ski bags, child seats, and any mobility needs. This helps prevent an undersized vehicle recommendation."
  ],
  [
    "Can you support roadshows and delegations?",
    "Yes. VIP Transfers Korea supports multi-stop executive schedules, delegation movement, event transport, and premium vehicle coordination across Seoul and regional Korea."
  ],
  [
    "What if the schedule changes?",
    "Send changes as early as possible through the support contact on your confirmation or tracking page. The team will confirm whether the updated timing, route, and vehicle plan are still available."
  ]
];

export default function FAQPage() {
  return (
    <main>
      <section className="section bg-ink text-white">
        <div className="container">
          <div className="eyebrow">FAQ</div>
          <h1 className="serif-title mt-4 max-w-4xl text-[2rem] leading-[1.04] sm:text-4xl md:mt-5 md:text-6xl">Answers before you book.</h1>
          <p className="mt-5 max-w-3xl text-sm leading-6 text-white/70 md:mt-6 md:text-base md:leading-7">
            Practical details for airport pickups, custom quotes, payment timing, vehicle fit, and tracking links.
          </p>
        </div>
      </section>
      <section className="section">
        <div className="container grid gap-4 md:grid-cols-2">
          {faqs.map(([question, answer]) => (
            <div key={question} className="surface-card p-4 md:p-6">
              <h2 className="text-base font-black md:text-lg">{question}</h2>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-neutral-600">{answer}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
