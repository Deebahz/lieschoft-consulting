import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isInsightsStorageConfigured, saveInsights } from "@/lib/insightsData";
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

  if (body.section === "insights" && process.env.VERCEL && !isInsightsStorageConfigured()) {
    return NextResponse.json(
      { error: "Connect a Vercel Blob store to this project before saving insights." },
      { status: 503 }
    );
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
  } else if (body.section === "insights") {
    if (!Array.isArray(body.value)) {
      return NextResponse.json({ error: "insights must be an array." }, { status: 400 });
    }

    if (body.value.length > 100) {
      return NextResponse.json({ error: "You can save up to 100 insights." }, { status: 400 });
    }

    const insights = [];
    for (const item of body.value) {
      if (
        typeof item !== "object" ||
        item === null ||
        typeof (item as { title?: unknown }).title !== "string" ||
        typeof (item as { excerpt?: unknown }).excerpt !== "string"
      ) {
        return NextResponse.json({ error: "Each insight must include a title and excerpt." }, { status: 400 });
      }

      const title = (item as { title: string }).title.trim();
      const excerpt = (item as { excerpt: string }).excerpt.trim();
      if (!title || !excerpt || title.length > 160 || excerpt.length > 1000) {
        return NextResponse.json({ error: "Insight titles must be 1-160 characters and excerpts 1-1000 characters." }, { status: 400 });
      }

      insights.push({ title, excerpt });
    }

    siteData.insights = insights;
  } else {
    return NextResponse.json({ error: "Unsupported section." }, { status: 400 });
  }

  try {
    if (body.section === "insights") {
      await saveInsights(siteData.insights);
    } else {
      saveSiteData(siteData);
    }
  } catch (error) {
    console.error("Unable to persist admin content:", error);
    return NextResponse.json({ error: "Unable to save site data." }, { status: 500 });
  }

  if (body.section === "insights") {
    revalidatePath("/");
    revalidatePath("/insights");
  }

  return NextResponse.json({ message: "Section updated successfully." });
}
