import { NextResponse } from "next/server";
import { capturePayPalOrderPlaceholder } from "@/lib/payment/paypal";

export async function POST(request: Request) {
  let input: { orderId?: string };

  try {
    input = (await request.json()) as { orderId?: string };
  } catch {
    return validationError(["Request body must be valid JSON."]);
  }

  const orderId = input.orderId?.trim();
  if (!orderId) return validationError(["PayPal order ID is required."]);

  const capture = await capturePayPalOrderPlaceholder(orderId);
  return NextResponse.json({ ok: true, capture });
}

function validationError(errors: string[]) {
  return NextResponse.json({ ok: false, errors }, { status: 400 });
}
