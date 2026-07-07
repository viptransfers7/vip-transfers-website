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

  const payload = normalizeBookingPayload({
    ...input,
    reservationNo: input.reservationNo || createReservationNumber(),
    customerTrackingToken: input.customerTrackingToken || createTrackingToken(),
    customerTrackingEnabled: true,
    requiresCustomQuote: true,
    status: "Quote Requested",
    paymentStatus: "Unbilled",
    billingStatus: "Unbilled",
    assignmentStatus: "Unassigned",
    paymentProvider: "Manual"
  });
  const errors = validateBookingPayload(payload, {
    allowCustomQuote: true,
    allowDraftTime: true,
    enforceVehicleCapacity: false,
    requirePositiveQuote: false
  });

  if (errors.length) return validationError(errors);

  const persistence = await savePendingReservationPlaceholder(payload);

  return NextResponse.json({
    ok: true,
    reservationNo: payload.reservationNo,
    trackingToken: payload.customerTrackingToken,
    status: payload.status,
    paymentStatus: payload.paymentStatus,
    payload,
    persistence
  });
}

function validationError(errors: string[]) {
  return NextResponse.json({ ok: false, errors }, { status: 400 });
}
