export const metadata = { title: "Contact VIP Transfers Korea" };

const checklist = ["Service date and pickup time", "Pickup, dropoff, and stopovers", "Passenger and luggage count", "Flight number or hotel name", "Preferred vehicle type"];

export default function ContactPage() {
  return (
    <main>
      <section className="section bg-ink text-white">
        <div className="container grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <div className="eyebrow">Contact</div>
            <h1 className="serif-title mt-4 text-[2rem] leading-[1.04] sm:text-4xl md:mt-5 md:text-6xl">Send the trip details that matter.</h1>
            <p className="mt-5 max-w-2xl text-sm leading-6 text-white/70 md:mt-6 md:text-base md:leading-7">
              For airport transfers, executive roadshows, delegation transport, private tours, and hourly chauffeur service in Korea. The team will reply with availability, recommended vehicle type, and next steps.
            </p>
            <div className="mt-6 border-l-2 border-champagne pl-4 md:mt-8 md:pl-5">
              <div className="text-xs font-black uppercase tracking-[0.14em] text-champagne md:text-sm">Helpful to include</div>
              <ul className="mt-4 grid gap-2 text-sm leading-6 text-white/68">
                {checklist.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <form className="surface-card-dark grid gap-3 p-4 md:gap-4 md:p-5" action="mailto:reservations@viptransferskorea.com" method="post" encType="text/plain">
            <input className="field dark-field" name="name" placeholder="Name" autoComplete="name" required />
            <input className="field dark-field" name="email" placeholder="Email" type="email" autoComplete="email" required />
            <input className="field dark-field" name="phone" placeholder="Phone / WhatsApp" autoComplete="tel" />
            <select className="field dark-field" name="service" defaultValue="Airport transfer">
              <option>Airport transfer</option>
              <option>Executive chauffeur</option>
              <option>Corporate roadshow</option>
              <option>Delegation transport</option>
              <option>Private tour</option>
              <option>Custom request</option>
            </select>
            <input className="field dark-field" name="date" placeholder="Service date / time" />
            <input className="field dark-field" name="route" placeholder="Pickup and dropoff" required />
            <textarea className="field dark-field min-h-28 md:min-h-36" name="request" placeholder="Passengers, luggage, vehicle preference, flight number, name sign, child seat, or other instructions" required />
            <button className="btn btn-gold" type="submit">
              Send Request
            </button>
            <p className="text-xs leading-5 text-white/48">For immediate coordination, WhatsApp support is available after submitting the request.</p>
          </form>
        </div>
      </section>
    </main>
  );
}
