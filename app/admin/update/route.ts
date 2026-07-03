import { NextRequest, NextResponse } from "next/server";
import { getSiteData, saveSiteData } from "@/lib/siteData";

export async function POST(request: NextRequest) {
  let body: { section?: unknown; value?: unknown };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON." }, { status: 400 });
  }

  if (typeof body.section !== "string") {
    return NextResponse.json({ error: "Missing section name." }, { status: 400 });
  }

  const siteData = getSiteData();

  if (body.section === "openPositions") {
    if (!Array.isArray(body.value)) {
      return NextResponse.json({ error: "openPositions must be an array." }, { status: 400 });
    }

    const positions = body.value;
    for (const item of positions) {
      if (
        typeof item !== "object" ||
        item === null ||
        typeof (item as any).title !== "string" ||
        !Array.isArray((item as any).responsibilities) ||
        !Array.isArray((item as any).requirements)
      ) {
        return NextResponse.json({ error: "Each open position must include title, responsibilities, and requirements." }, { status: 400 });
      }

      if (
        (item as any).responsibilities.some((value: unknown) => typeof value !== "string") ||
        (item as any).requirements.some((value: unknown) => typeof value !== "string")
      ) {
        return NextResponse.json({ error: "Responsibilities and requirements must be string arrays." }, { status: 400 });
      }
    }

    siteData.openPositions = positions as Array<{
      title: string;
      responsibilities: string[];
      requirements: string[];
    }>;
  } else if (body.section === "caseStudies") {
    if (!Array.isArray(body.value)) {
      return NextResponse.json({ error: "caseStudies must be an array." }, { status: 400 });
    }

    const caseStudies = body.value;
    for (const item of caseStudies) {
      if (
        typeof item !== "object" ||
        item === null ||
        typeof (item as any).title !== "string" ||
        typeof (item as any).summary !== "string" ||
        typeof (item as any).slug !== "string" ||
        typeof (item as any).content !== "string"
      ) {
        return NextResponse.json({ error: "Each case study must include title, summary, slug, and content." }, { status: 400 });
      }
    }

    siteData.caseStudies = caseStudies as Array<{
      title: string;
      summary: string;
      slug: string;
      content: string;
    }>;
  } else {
    return NextResponse.json({ error: "Unsupported section." }, { status: 400 });
  }

  try {
    saveSiteData(siteData);
  } catch {
    return NextResponse.json({ error: "Unable to save site data." }, { status: 500 });
  }

  return NextResponse.json({ message: "Section updated successfully." });
}
