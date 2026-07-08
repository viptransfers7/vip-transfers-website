"use client";

import type { GuestDetails } from "@/lib/booking/types";

export function GuestStep({ guest, setGuest, compact = false }: { guest: GuestDetails; setGuest: (patch: Partial<GuestDetails>) => void; compact?: boolean }) {
  return (
    <div>
      {compact ? <h2 className="text-xl font-black leading-tight md:text-2xl">Guest details</h2> : <h1 className="text-xl font-black leading-tight md:text-2xl">Guest details</h1>}
      <p className="mt-2 text-sm leading-6 text-neutral-600">We use this information for confirmation, name sign, and urgent pickup coordination.</p>
      <div className="mt-4 grid gap-2.5 md:grid-cols-2 md:gap-3">
        <label className="grid gap-1.5 text-[13px] font-bold md:gap-2 md:text-sm">
          Booker name
          <input className="field" autoComplete="name" required value={guest.bookerName} onChange={(event) => setGuest({ bookerName: event.target.value })} />
        </label>
        <label className="grid gap-1.5 text-[13px] font-bold md:gap-2 md:text-sm">
          Booker email
          <input className="field" type="email" autoComplete="email" required value={guest.bookerEmail} onChange={(event) => setGuest({ bookerEmail: event.target.value })} />
        </label>
        <label className="grid gap-1.5 text-[13px] font-bold md:gap-2 md:text-sm">
          Phone / WhatsApp
          <input className="field" type="tel" autoComplete="tel" required value={guest.bookerPhone} onChange={(event) => setGuest({ bookerPhone: event.target.value })} />
        </label>
        <label className="flex items-center gap-2.5 rounded-xl bg-[#fbfaf7] p-3 text-[13px] font-bold md:col-span-2 md:gap-3 md:p-4 md:text-sm">
          <input type="checkbox" checked={guest.bookingForSomeoneElse} onChange={(event) => setGuest({ bookingForSomeoneElse: event.target.checked })} />
          I am booking for someone else
        </label>
        {guest.bookingForSomeoneElse ? (
          <div className="grid gap-4 md:col-span-2 md:grid-cols-2">
            <label className="grid gap-1.5 text-[13px] font-bold md:gap-2 md:text-sm">
              Guest name
              <input className="field" autoComplete="name" required value={guest.guestName} onChange={(event) => setGuest({ guestName: event.target.value })} />
            </label>
            <label className="grid gap-1.5 text-[13px] font-bold md:gap-2 md:text-sm">
              Guest phone
              <input className="field" type="tel" autoComplete="tel" required value={guest.guestPhone} onChange={(event) => setGuest({ guestPhone: event.target.value })} />
            </label>
          </div>
        ) : null}
        <label className="grid gap-1.5 text-[13px] font-bold md:gap-2 md:text-sm">
          Signboard name
          <input className="field" value={guest.signboardName} onChange={(event) => setGuest({ signboardName: event.target.value })} />
        </label>
        <label className="grid gap-1.5 text-[13px] font-bold md:col-span-2 md:gap-2 md:text-sm">
          Special request
          <textarea className="field min-h-24" value={guest.specialRequest} onChange={(event) => setGuest({ specialRequest: event.target.value })} />
        </label>
      </div>
    </div>
  );
}
