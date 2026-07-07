import { NextResponse } from "next/server";
import type { BookingPayload } from "@/lib/booking/types";
import { normalizeBookingPayload, validateBookingPayload } from "@/lib/booking/validation";
import { createPayPalOrderPlaceholder } from "@/lib/payment/paypal";

export async function POST(request: Request) {
  let input: BookingPayload;

  try {
    input = (await request.json()) as BookingPayload;
  } catch {
    return validationError(["Request body must be valid JSON."]);
  }

  const payload = normalizeBookingPayload({ ...input, paymentProvider: "PayPal" });
  const errors = validateBookingPayload(payload, {
    allowCustomQuote: false,
    requirePositiveQuote: true,
    requireReservationNo: true,
    requireTrackingToken: true
  });

  if (errors.length) return validationError(errors);

  const order = await createPayPalOrderPlaceholder(payload);
  return NextResponse.json({ ok: true, order });
}

function validationError(errors: string[]) {
  return NextResponse.json({ ok: false, errors }, { status: 400 });
}
