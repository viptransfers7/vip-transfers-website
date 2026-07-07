import type { BookingPayload } from "./types";

const usdToKrw = 1350;

export function toDashboardReservationRow(payload: BookingPayload) {
  const customerName = payload.guest.bookingForSomeoneElse && payload.guest.guestName ? payload.guest.guestName : payload.guest.bookerName;
  const customerPhone = payload.guest.bookingForSomeoneElse && payload.guest.guestPhone ? payload.guest.guestPhone : payload.guest.bookerPhone;
  const requestedVehicleType = payload.requestedVehicleTypeName || payload.vehicleName;
  const paymentMethod = payload.paymentProvider === "PayPal" ? "PayPal" : "";

  return {
    date: payload.pickupDate,
    time: payload.pickupTime,
    serviceType: displayServiceType(payload.serviceType),
    company: "Website",
    reservationNo: payload.reservationNo || "",
    companyConfirmationNo: payload.companyConfirmationNo || "",
    customerName,
    customerPhone,
    pickup: payload.pickupLocation,
    destination: payload.dropoffLocation,
    passengers: payload.passengers,
    luggage: payload.luggage,
    vehicle: requestedVehicleType,
    priceKRW: payload.quoteAmountKrw || Math.round(payload.quoteAmountUsd * usdToKrw),
    priceUSD: payload.quoteAmountUsd,
    paymentMethod,
    paymentStatus: payload.paymentStatus,
    billingStatus: payload.billingStatus || (payload.paymentStatus === "Paid" ? "Paid" : "Unbilled"),
    status: "Pending",
    note: buildDashboardNote(payload),
    assignmentType: "Internal",
    assignmentStatus: payload.assignmentStatus,
    driverFee: 0
  };
}

function displayServiceType(serviceType: BookingPayload["serviceType"]) {
  const labels: Record<BookingPayload["serviceType"], string> = {
    airport_transfer: "Airport Transfer",
    point_to_point: "Point to Point",
    hourly_charter: "Hourly Charter",
    private_tour: "Private Tour",
    custom_quote: "Custom Quote"
  };
  return labels[serviceType];
}

function buildDashboardNote(payload: BookingPayload) {
  return [
    `[Source] ${payload.source}`,
    `[Website Status] ${payload.status}`,
    payload.customerTrackingToken ? `[Customer Tracking Token] ${payload.customerTrackingToken}` : "",
    payload.flightNumber ? `[Flight] ${payload.flightNumber}` : "",
    payload.airportDirection ? `[Airport Direction] ${payload.airportDirection}` : "",
    payload.stopover ? `[Stopover] ${payload.stopover}` : "",
    payload.isRoundTrip
      ? `[Return] ${payload.returnDate || "-"} ${payload.returnTime || ""} / ${payload.returnPickupLocation || payload.dropoffLocation} -> ${
          payload.returnDropoffLocation || payload.pickupLocation
        }${payload.returnFlight ? ` / ${payload.returnFlight}` : ""}`
      : "",
    payload.hourlyDuration ? `[Hourly] ${payload.hourlyDuration}h` : "",
    payload.tourProductName ? `[Tour] ${payload.tourProductName}` : "",
    payload.requestedVehicleTypeCode ? `[Requested Vehicle Type] ${payload.requestedVehicleTypeCode} / ${payload.requestedVehicleTypeName || payload.vehicleName}` : "",
    payload.selectedVehicleOptionName ? `[Selected Vehicle Option] ${payload.selectedVehicleOptionName}` : "",
    payload.guest.signboardName ? `[Signboard] ${payload.guest.signboardName}` : "",
    payload.guest.bookerEmail ? `[Booker Email] ${payload.guest.bookerEmail}` : "",
    payload.guest.specialRequest ? `[Special Request] ${payload.guest.specialRequest}` : "",
    payload.requiresCustomQuote ? "[Quote] Custom quote requested. Reservation is not confirmed until payment is completed." : "",
    payload.airportMeetingInstruction ? `[Airport Meeting] ${payload.airportMeetingInstruction}` : ""
  ]
    .filter(Boolean)
    .join("\n");
}
