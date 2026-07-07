import { NextResponse } from "next/server";
import { createReservationNumber, createTrackingToken } from "@/lib/booking/createTrackingToken";
import type { BookingPayload } from "@/lib/booking/types";
import { normalizeBookingPayload, validateBookingPayload } from "@/lib/booking/validation";
import { savePendingReservationPlaceholder } from "@/lib/supabase/server";

export async function POST(request: Request) {
  let input: BookingPayload;

  try {
    input = (await request.json()) as BookingPayload;
  } catch {
    return validationError(["Request body must be valid JSON."]);
  }

  const reservationNo = input.reservationNo || createReservationNumber();
  const trackingToken = input.customerTrackingToken || createTrackingToken();
  const payload = normalizeBookingPayload({
    ...input,
    reservationNo,
    customerTrackingToken: trackingToken,
    customerTrackingEnabled: true,
    requiresCustomQuote: false,
    status: "Pending Payment",
    paymentStatus: "Unbilled",
    billingStatus: "Unbilled",
    assignmentStatus: "Unassigned",
    paymentProvider: "PayPal"
  });
  const errors = validateBookingPayload(payload, { allowCustomQuote: false, requirePositiveQuote: true });

  if (errors.length) return validationError(errors);

  const persistence = await savePendingReservationPlaceholder(payload);

  return NextResponse.json({
    ok: true,
    reservationNo,
    trackingToken,
    status: payload.status,
    paymentStatus: payload.paymentStatus,
    payload,
    persistence
  });
}

function validationError(errors: string[]) {
  return NextResponse.json({ ok: false, errors }, { status: 400 });
}
