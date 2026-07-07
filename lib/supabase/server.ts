import type { BookingPayload } from "@/lib/booking/types";
import { toDashboardReservationRow } from "@/lib/booking/reservationMapper";

export async function savePendingReservationPlaceholder(payload: BookingPayload) {
  return {
    mode: "placeholder" as const,
    dashboardReservation: toDashboardReservationRow(payload),
    message: "Supabase server insert will be connected in the next phase."
  };
}

export async function updateReservationConfirmedPlaceholder(payload: BookingPayload) {
  return {
    mode: "placeholder" as const,
    dashboardReservation: toDashboardReservationRow(payload),
    message: "Supabase server update will be connected in the next phase."
  };
}
