import { NextRequest, NextResponse } from "next/server";
import { saveSiteData } from "@/lib/siteData";

export async function POST(request: NextRequest) {
  let body: { siteJson?: unknown };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }

  if (typeof body.siteJson !== "string") {
    return NextResponse.json({ error: "Missing siteJson value." }, { status: 400 });
  }

  let parsed;
  try {
    parsed = JSON.parse(body.siteJson);
  } catch (error) {
    return NextResponse.json({ error: "siteJson must be valid JSON." }, { status: 400 });
  }

  if (typeof parsed !== "object" || parsed === null) {
    return NextResponse.json({ error: "siteJson must be a JSON object." }, { status: 400 });
  }

  try {
    saveSiteData(parsed);
  } catch (error) {
    return NextResponse.json({ error: "Failed to write site content." }, { status: 500 });
  }

  return NextResponse.json({ message: "Site content saved successfully." });
}
