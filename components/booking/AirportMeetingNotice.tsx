export function AirportMeetingNotice({ direction = "arrival" }: { direction?: "arrival" | "departure" }) {
  if (direction === "departure") {
    return (
      <div className="border-l-2 border-champagne bg-ivory p-3 text-sm leading-6 text-neutral-700 md:p-4">
        <strong>Airport departure transfer:</strong> Your chauffeur will meet you at your pickup address at the confirmed time. Please allow enough time for traffic, check-in, and airport security.
      </div>
    );
  }

  return (
    <div className="border-l-2 border-champagne bg-ivory p-3 text-sm leading-6 text-neutral-700 md:p-4">
      <strong>Airport pick-up meeting:</strong> We track your flight. After baggage claim, please proceed to the arrival hall. Your chauffeur will meet you with your name sign.
    </div>
  );
}
