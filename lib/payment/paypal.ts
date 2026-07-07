import type { BookingPayload } from "@/lib/booking/types";

export async function createPayPalOrderPlaceholder(payload: BookingPayload) {
  return {
    provider: "PayPal" as const,
    orderId: `PAYPAL-DEMO-${payload.reservationNo || Date.now()}`,
    status: "CREATED",
    amount: payload.quoteAmountUsd,
    currency: "USD"
  };
}

export async function capturePayPalOrderPlaceholder(orderId: string) {
  return {
    provider: "PayPal" as const,
    orderId,
    captureId: `CAPTURE-DEMO-${Date.now()}`,
    status: "COMPLETED"
  };
}
