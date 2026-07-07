import type { BookingPayload } from "@/lib/booking/types";

export async function sendConfirmationEmailPlaceholder(payload: BookingPayload) {
  return {
    mode: "placeholder" as const,
    to: payload.guest.bookerEmail,
    subject: `VIP Transfers Korea booking ${payload.reservationNo}`,
    message: "Email delivery will be connected in the next phase."
  };
}
