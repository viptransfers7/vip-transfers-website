"use client";

import { useMemo, useState } from "react";
import { extendedFleet } from "@/lib/site-data";

const steps = ["Service", "Trip Details", "Vehicle", "Guest Details", "Review & Request"];
const serviceTypes = ["Airport Transfer", "Hourly Chauffeur", "Executive Roadshow", "Delegation Transport", "Private Tour"];
const reservationsEmail = "reservations@viptransferskorea.com";

function minDateTimeValue() {
  const date = new Date(Date.now() + 3 * 60 * 60 * 1000);
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
  return date.toISOString().slice(0, 16);
}

export function BookingForm() {
  const [step, setStep] = useState(0);
  const [service, setService] = useState(serviceTypes[0]);
  const [dateTime, setDateTime] = useState("");
  const [pickup, setPickup] = useState("Incheon International Airport Terminal 2");
  const [dropoff, setDropoff] = useState("Four Seasons Hotel Seoul");
  const [flight, setFlight] = useState("");
  const [stopover, setStopover] = useState("");
  const [passengers, setPassengers] = useState("2");
  const [luggage, setLuggage] = useState("2");
  const [roundTrip, setRoundTrip] = useState(false);
  const [vehicle, setVehicle] = useState(extendedFleet[0].name);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");

  const minValue = useMemo(() => minDateTimeValue(), []);
  const isAirport = /airport|icn|gmp|incheon|gimpo|공항|인천|김포/i.test(`${pickup} ${dropoff} ${service}`);
  const tooSoon = dateTime ? new Date(dateTime).getTime() < new Date(minValue).getTime() : false;
  const selectedVehicle = extendedFleet.find((item) => item.name === vehicle) || extendedFleet[0];
  const requestSummary = [
    `Service: ${service}`,
    `Date / Time: ${dateTime || "Not selected"}`,
    `Pickup: ${pickup}`,
    `Dropoff: ${dropoff}`,
    `Flight: ${flight || "Not provided"}`,
    `Stopover: ${stopover || "None"}`,
    `Passengers / Luggage: ${passengers} pax / ${luggage} luggage`,
    `Round trip: ${roundTrip ? "Yes" : "No"}`,
    `Vehicle: ${selectedVehicle.name}`,
    `Customer: ${name || "Not provided"}`,
    `Email: ${email || "Not provided"}`,
    `Phone: ${phone || "Not provided"}`,
    `Note: ${note || "None"}`
  ].join("\n");
  const requestHref = `mailto:${reservationsEmail}?subject=${encodeURIComponent(`VIP Transfers Korea request - ${service}`)}&body=${encodeURIComponent(requestSummary)}`;

  return (
    <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr]">
      <aside className="border hairline bg-white p-5">
        <div className="eyebrow">Booking Steps</div>
        <div className="mt-6 grid gap-3">
          {steps.map((label, index) => (
            <button
              key={label}
              type="button"
              onClick={() => setStep(index)}
              className={`flex min-h-12 items-center justify-between border px-4 text-left text-sm font-bold transition ${
                step === index ? "border-champagne bg-ivory text-black" : "hairline bg-white text-neutral-500"
              }`}
            >
              <span>{label}</span>
              <span>0{index + 1}</span>
            </button>
          ))}
        </div>
        <div className="mt-6 border-l-2 border-champagne bg-ivory p-4 text-sm leading-6 text-neutral-700">
          Reservations inside 3 hours need direct confirmation. For urgent executive travel, include the pickup time and contact number in your request.
        </div>
      </aside>

      <section className="border hairline bg-white p-5 md:p-8">
        <div className="mb-8 h-1 bg-neutral-100">
          <div className="h-full bg-champagne transition-all" style={{ width: `${((step + 1) / steps.length) * 100}%` }} />
        </div>

        {step === 0 ? (
          <div>
            <h1 className="serif-title text-4xl">Select service</h1>
            <div className="mt-7 grid gap-3 md:grid-cols-2">
              {serviceTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => setService(type)}
                  className={`min-h-24 border p-5 text-left ${service === type ? "border-champagne bg-ivory" : "hairline bg-white"}`}
                >
                  <div className="text-lg font-black">{type}</div>
                  <p className="mt-2 text-sm leading-5 text-neutral-600">Private chauffeur planning for Korea.</p>
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {step === 1 ? (
          <div>
            <h1 className="serif-title text-4xl">Trip details</h1>
            <div className="mt-7 grid gap-5 md:grid-cols-2">
              <label className="grid gap-2 text-sm font-bold">
                Date and time
                <input className={`field ${tooSoon ? "border-red-500" : ""}`} type="datetime-local" min={minValue} value={dateTime} onChange={(event) => setDateTime(event.target.value)} />
                {tooSoon ? <span className="text-xs text-red-700">Please select a pickup time at least 3 hours from now.</span> : null}
              </label>
              <label className="grid gap-2 text-sm font-bold">
                Flight number
                <input className="field" placeholder="KE082, OZ202..." value={flight} onChange={(event) => setFlight(event.target.value)} />
              </label>
              <label className="grid gap-2 text-sm font-bold md:col-span-2">
                Pickup
                <input className="field" value={pickup} onChange={(event) => setPickup(event.target.value)} />
              </label>
              <label className="grid gap-2 text-sm font-bold md:col-span-2">
                Dropoff
                <input className="field" value={dropoff} onChange={(event) => setDropoff(event.target.value)} />
              </label>
              <label className="grid gap-2 text-sm font-bold md:col-span-2">
                Stopover
                <input className="field" placeholder="Optional stopover" value={stopover} onChange={(event) => setStopover(event.target.value)} />
              </label>
              <label className="grid gap-2 text-sm font-bold">
                Passengers
                <input className="field" type="number" min="1" value={passengers} onChange={(event) => setPassengers(event.target.value)} />
              </label>
              <label className="grid gap-2 text-sm font-bold">
                Luggage
                <input className="field" type="number" min="0" value={luggage} onChange={(event) => setLuggage(event.target.value)} />
              </label>
              <label className="flex items-center gap-3 border hairline bg-ivory p-4 text-sm font-bold md:col-span-2">
                <input type="checkbox" checked={roundTrip} onChange={(event) => setRoundTrip(event.target.checked)} />
                Round-trip airport booking
                <span className="ml-auto text-[#9a7b41]">Reviewed as one itinerary</span>
              </label>
            </div>
            {isAirport ? (
              <div className="mt-6 border-l-2 border-champagne bg-ivory p-4 text-sm leading-6 text-neutral-700">
                Airport pick-up meeting: We track your flight. After baggage claim, please proceed to the arrival hall. Your chauffeur will meet you with your name sign.
              </div>
            ) : null}
          </div>
        ) : null}

        {step === 2 ? (
          <div>
            <h1 className="serif-title text-4xl">Choose vehicle</h1>
            <div className="mt-7 grid gap-4 md:grid-cols-2">
              {extendedFleet.map((item) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => setVehicle(item.name)}
                  className={`border p-5 text-left ${vehicle === item.name ? "border-champagne bg-ivory" : "hairline bg-white"}`}
                >
                  <div className="text-xs font-bold uppercase tracking-[0.14em] text-[#9a7b41]">{item.category}</div>
                  <div className="mt-2 text-lg font-black">{item.name}</div>
                  <div className="mt-3 text-sm text-neutral-600">
                    Max {item.passengers} pax / {item.luggage} luggage
                  </div>
                  <div className="mt-4 text-sm font-bold text-neutral-500">Availability and pricing confirmed after schedule review</div>
                </button>
              ))}
            </div>
          </div>
        ) : null}

        {step === 3 ? (
          <div>
            <h1 className="serif-title text-4xl">Guest details</h1>
            <div className="mt-7 grid gap-5">
              <label className="grid gap-2 text-sm font-bold">
                Customer name
                <input className="field" value={name} onChange={(event) => setName(event.target.value)} />
              </label>
              <label className="grid gap-2 text-sm font-bold">
                Email
                <input className="field" type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
              </label>
              <label className="grid gap-2 text-sm font-bold">
                Phone / WhatsApp
                <input className="field" value={phone} onChange={(event) => setPhone(event.target.value)} />
              </label>
              <label className="grid gap-2 text-sm font-bold">
                Note
                <textarea className="field min-h-32" value={note} onChange={(event) => setNote(event.target.value)} />
              </label>
            </div>
          </div>
        ) : null}

        {step === 4 ? (
          <div>
            <h1 className="serif-title text-4xl">Review and request</h1>
            <div className="mt-7 grid gap-3 text-sm">
              {[
                ["Service", service],
                ["Date / Time", dateTime || "Not selected"],
                ["Pickup", pickup],
                ["Dropoff", dropoff],
                ["Flight", flight || "Not provided"],
                ["Stopover", stopover || "None"],
                ["Passengers / Luggage", `${passengers} pax / ${luggage} luggage`],
                ["Vehicle", selectedVehicle.name],
                ["Customer", name || "Not provided"],
                ["Email", email || "Not provided"],
                ["Phone", phone || "Not provided"],
                ["Note", note || "None"]
              ].map(([label, value]) => (
                <div key={label} className="grid gap-2 border-b hairline py-3 md:grid-cols-[180px_1fr]">
                  <div className="font-bold text-neutral-500">{label}</div>
                  <div>{value}</div>
                </div>
              ))}
            </div>
            <div className="mt-7 border-l-2 border-champagne bg-ivory p-5">
              <div className="text-sm font-black uppercase tracking-[0.14em] text-[#9a7b41]">Request summary</div>
              <p className="mt-3 text-sm leading-6 text-neutral-700">
                Review the details above, then email the request to VIP Transfers Korea. The team will confirm availability, vehicle assignment, pricing, and payment instructions.
              </p>
              <a href={requestHref} className="btn btn-dark mt-5">
                Email Request
              </a>
            </div>
          </div>
        ) : null}

        <div className="mt-10 flex justify-between gap-3">
          <button type="button" className="btn" onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}>
            Back
          </button>
          <button type="button" className="btn btn-dark" onClick={() => setStep(Math.min(steps.length - 1, step + 1))} disabled={step === steps.length - 1}>
            Next
          </button>
        </div>
      </section>
    </div>
  );
}
