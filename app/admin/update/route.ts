import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { isMongoConfigured } from "@/lib/mongo";
import { isInsightsStorageConfigured, saveInsights } from "@/lib/insightsData";
import { getSiteData, saveSiteData, type InsightData } from "@/lib/siteData";

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

  if (
    body.section === "insights" &&
    process.env.VERCEL &&
    !isMongoConfigured() &&
    !isInsightsStorageConfigured()
  ) {
    return NextResponse.json(
      { error: "Connect a MongoDB URI or Vercel Blob store to this project before saving insights." },
      { status: 503 }
    );
  }

  const siteData = await getSiteData();

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
  } else if (body.section === "insights") {
    if (!Array.isArray(body.value)) {
      return NextResponse.json({ error: "insights must be an array." }, { status: 400 });
    }

    if (body.value.length > 100) {
      return NextResponse.json({ error: "You can save up to 100 insights." }, { status: 400 });
    }

    const insights: InsightData[] = [];
    const slugs = new Set<string>();
    for (const item of body.value) {
      if (
        typeof item !== "object" ||
        item === null ||
        typeof (item as { title?: unknown }).title !== "string" ||
        typeof (item as { slug?: unknown }).slug !== "string" ||
        typeof (item as { excerpt?: unknown }).excerpt !== "string" ||
        typeof (item as { content?: unknown }).content !== "string"
      ) {
        return NextResponse.json({ error: "Each article must include a title, slug, excerpt, and content." }, { status: 400 });
      }

      const title = (item as { title: string }).title.trim();
      const slug = (item as { slug: string }).slug.trim();
      const excerpt = (item as { excerpt: string }).excerpt.trim();
      const content = (item as { content: string }).content.trim();
      if (
        !title || title.length > 160 ||
        !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || slug.length > 120 || slugs.has(slug) ||
        !excerpt || excerpt.length > 1000 ||
        !content || content.length > 20000
      ) {
        return NextResponse.json({ error: "Articles need a unique URL slug, a title up to 160 characters, an excerpt up to 1000 characters, and content up to 20000 characters." }, { status: 400 });
      }

      slugs.add(slug);
      insights.push({ title, slug, excerpt, content });
    }

    siteData.insights = insights;
  } else {
    return NextResponse.json({ error: "Unsupported section." }, { status: 400 });
  }

  try {
    if (body.section === "insights") {
      await saveInsights(siteData.insights);
    } else {
      await saveSiteData(siteData);
    }
  } catch (error) {
    console.error("Unable to persist admin content:", error);
    return NextResponse.json({ error: "Unable to save site data." }, { status: 500 });
  }

  if (body.section === "insights") {
    revalidatePath("/");
    revalidatePath("/insights");
    revalidatePath("/insights/[slug]", "page");
  }

  return NextResponse.json({ message: "Section updated successfully." });
}
