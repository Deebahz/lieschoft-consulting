import { NextResponse } from "next/server";
import { getStockQuotes } from "@/lib/marketData";

export const dynamic = "force-dynamic";

export async function GET() {
  const quotes = await getStockQuotes();

  if (quotes.length === 0) {
    return NextResponse.json(
      { error: "Market data is temporarily unavailable." },
      { status: 503, headers: { "Cache-Control": "no-store" } }
    );
  }

  return NextResponse.json(
    { quotes },
    { headers: { "Cache-Control": "no-store" } }
  );
}