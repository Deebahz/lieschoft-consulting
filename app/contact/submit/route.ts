import { NextRequest, NextResponse } from "next/server";
import { saveContactLead } from "@/lib/leadData";

export async function POST(request: NextRequest) {
  let body: { name?: unknown; email?: unknown; message?: unknown };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!name || !email) {
    return NextResponse.json({ error: "Name and email are required." }, { status: 400 });
  }

  try {
    saveContactLead({ name, email, message });
  } catch (error) {
    return NextResponse.json({ error: "Unable to save contact request." }, { status: 500 });
  }

  return NextResponse.json({ message: "Thanks! Your request has been received." });
}
