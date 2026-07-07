import { NextResponse } from "next/server";
import type { BookingPayload } from "@/lib/booking/types";
import { normalizeBookingPayload, validateBookingPayload } from "@/lib/booking/validation";
import { sendConfirmationEmailPlaceholder } from "@/lib/email/sendConfirmationEmail";
import { updateReservationConfirmedPlaceholder } from "@/lib/supabase/server";

export async function POST(request: Request) {
  let input: BookingPayload;

  try {
    input = (await request.json()) as BookingPayload;
  } catch {
    return validationError(["Request body must be valid JSON."]);
  }

  const payload = normalizeBookingPayload({
    ...input,
    status: "Confirmed",
    paymentStatus: "Paid",
    billingStatus: "Paid",
    assignmentStatus: "Unassigned",
    customerTrackingEnabled: true,
    paymentProvider: "PayPal",
    paymentId: input.paymentId || input.paypalOrderId
  });
  const errors = validateBookingPayload(payload, {
    allowCustomQuote: false,
    requirePayPalOrderId: true,
    requirePositiveQuote: true,
    requireReservationNo: true,
    requireTrackingToken: true
  });

  if (errors.length) return validationError(errors);

  const persistence = await updateReservationConfirmedPlaceholder(payload);
  const email = await sendConfirmationEmailPlaceholder(payload);

  return NextResponse.json({
    ok: true,
    reservationNo: payload.reservationNo,
    trackingToken: payload.customerTrackingToken,
    status: payload.status,
    paymentStatus: payload.paymentStatus,
    payload,
    persistence,
    email
  });
}

function validationError(errors: string[]) {
  return NextResponse.json({ ok: false, errors }, { status: 400 });
}
