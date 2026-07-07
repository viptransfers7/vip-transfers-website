export function createTrackingToken() {
  const random = crypto.getRandomValues(new Uint8Array(16));
  return Array.from(random)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

export function createReservationNumber() {
  const now = new Date();
  const date = now.toISOString().slice(2, 10).replace(/-/g, "");
  const suffix = Math.floor(1000 + Math.random() * 9000);
  return `VTK-${date}-${suffix}`;
}
