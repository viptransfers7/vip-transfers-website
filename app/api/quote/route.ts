import { NextResponse } from "next/server";
import { calculateQuote } from "@/lib/pricing/calculateQuote";
import type { QuoteInput } from "@/lib/pricing/types";

export async function POST(request: Request) {
  try {
    const input = (await request.json()) as QuoteInput;
    return NextResponse.json(calculateQuote(input));
  } catch (error) {
    return NextResponse.json(
      {
        available: false,
        requiresCustomQuote: false,
        quoteType: "unavailable",
        reason: error instanceof Error ? error.message : "Quote could not be calculated."
      },
      { status: 400 }
    );
  }
}
