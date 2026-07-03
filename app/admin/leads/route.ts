import { NextResponse } from "next/server";
import { getContactLeads } from "@/lib/leadData";

export async function GET() {
  try {
    const leads = getContactLeads();
    return NextResponse.json({ leads });
  } catch {
    return NextResponse.json({ error: "Unable to read leads." }, { status: 500 });
  }
}
