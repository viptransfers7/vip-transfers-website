"use client";

import type { GuestDetails } from "@/lib/booking/types";

export function GuestStep({ guest, setGuest, compact = false }: { guest: GuestDetails; setGuest: (patch: Partial<GuestDetails>) => void; compact?: boolean }) {
  return (
    <div>
      {compact ? <h2 className="serif-title text-2xl md:text-3xl">Guest details</h2> : <h1 className="serif-title text-3xl md:text-4xl">Guest details</h1>}
      <p className="mt-2 text-sm leading-6 text-neutral-600">We use this information for confirmation, name sign, and urgent pickup coordination.</p>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-bold">
          Booker name
          <input className="field" autoComplete="name" required value={guest.bookerName} onChange={(event) => setGuest({ bookerName: event.target.value })} />
        </label>
        <label className="grid gap-2 text-sm font-bold">
          Booker email
          <input className="field" type="email" autoComplete="email" required value={guest.bookerEmail} onChange={(event) => setGuest({ bookerEmail: event.target.value })} />
        </label>
        <label className="grid gap-2 text-sm font-bold">
          Phone / WhatsApp
          <input className="field" type="tel" autoComplete="tel" required value={guest.bookerPhone} onChange={(event) => setGuest({ bookerPhone: event.target.value })} />
        </label>
        <label className="flex items-center gap-3 border hairline bg-ivory p-4 text-sm font-bold md:col-span-2">
          <input type="checkbox" checked={guest.bookingForSomeoneElse} onChange={(event) => setGuest({ bookingForSomeoneElse: event.target.checked })} />
          I am booking for someone else
        </label>
        {guest.bookingForSomeoneElse ? (
          <div className="grid gap-4 md:col-span-2 md:grid-cols-2">
            <label className="grid gap-2 text-sm font-bold">
              Guest name
              <input className="field" autoComplete="name" required value={guest.guestName} onChange={(event) => setGuest({ guestName: event.target.value })} />
            </label>
            <label className="grid gap-2 text-sm font-bold">
              Guest phone
              <input className="field" type="tel" autoComplete="tel" required value={guest.guestPhone} onChange={(event) => setGuest({ guestPhone: event.target.value })} />
            </label>
          </div>
        ) : null}
        <label className="grid gap-2 text-sm font-bold">
          Signboard name
          <input className="field" value={guest.signboardName} onChange={(event) => setGuest({ signboardName: event.target.value })} />
        </label>
        <label className="grid gap-2 text-sm font-bold md:col-span-2">
          Special request
          <textarea className="field min-h-24" value={guest.specialRequest} onChange={(event) => setGuest({ specialRequest: event.target.value })} />
        </label>
      </div>
    </div>
  );
}
