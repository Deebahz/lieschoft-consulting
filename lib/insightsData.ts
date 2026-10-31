import { get, put } from "@vercel/blob";
import { connection } from "next/server";
import { getMongoDb, isMongoConfigured, type MongoDataDocument } from "@/lib/mongo";
import { getSiteData, saveSiteData, type InsightData } from "@/lib/siteData";

const insightsPath = "site/insights.json";

export function isInsightsStorageConfigured() {
  return Boolean(
    process.env.BLOB_READ_WRITE_TOKEN ||
      (process.env.VERCEL_OIDC_TOKEN && process.env.BLOB_STORE_ID)
  );
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeInsights(value: unknown): InsightData[] | null {
  if (!Array.isArray(value)) {
    return null;
  }

  const insights: InsightData[] = [];
  const usedSlugs = new Set<string>();

  for (const [index, item] of value.entries()) {
    if (
      typeof item !== "object" ||
      item === null ||
      typeof item.title !== "string" ||
      typeof item.excerpt !== "string"
    ) {
      return null;
    }

    const title = item.title.trim();
    const excerpt = item.excerpt.trim();
    const requestedSlug = typeof item.slug === "string" ? item.slug.trim() : "";
    const baseSlug = /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(requestedSlug)
      ? requestedSlug
      : slugify(title) || `insight-${index + 1}`;
    let slug = baseSlug;
    let suffix = 2;
    while (usedSlugs.has(slug)) {
      slug = `${baseSlug}-${suffix}`;
      suffix += 1;
    }

    usedSlugs.add(slug);
    insights.push({
      title,
      slug,
      excerpt,
      content: typeof item.content === "string" && item.content.trim() ? item.content : excerpt,
    });
  }

  return insights;
}

export async function getInsights(): Promise<InsightData[]> {
  await connection();

  if (isMongoConfigured()) {
    try {
      const db = await getMongoDb();
      if (db) {
        const document = await db.collection<MongoDataDocument>("site_insights").findOne({ _id: "insights" });
        if (document && Array.isArray(document.data)) {
          const insights = normalizeInsights(document.data);
          if (insights) {
            return insights;
          }
        }
      }
    } catch (error) {
      console.error("MongoDB insights read failed; using the configured fallback.", error);
    }
  }

  if (!isInsightsStorageConfigured()) {
    return normalizeInsights((await getSiteData()).insights) ?? [];
  }

  const blob = await get(insightsPath, { access: "private", useCache: false });
  if (!blob || blob.statusCode !== 200 || !blob.stream) {
    return normalizeInsights((await getSiteData()).insights) ?? [];
  }

  const insights = normalizeInsights(await new Response(blob.stream).json());
  if (!insights) {
    throw new Error("Stored insights data is invalid.");
  }

  return insights;
}

export async function saveInsights(insights: InsightData[]) {
  if (isMongoConfigured()) {
    const db = await getMongoDb();
    if (db) {
      await db.collection<MongoDataDocument>("site_insights").updateOne(
        { _id: "insights" },
        { $set: { data: insights, updatedAt: new Date() } },
        { upsert: true }
      );
      return;
    }
  }

  if (isInsightsStorageConfigured()) {
    await put(insightsPath, JSON.stringify(insights), {
      access: "private",
      addRandomSuffix: false,
      allowOverwrite: true,
      cacheControlMaxAge: 60,
      contentType: "application/json",
    });
    return;
  }

  if (process.env.VERCEL) {
    throw new Error("Connect a MongoDB URI or Vercel Blob store to persist insights in production.");
  }

  const siteData = await getSiteData();
  siteData.insights = insights;
  await saveSiteData(siteData);
}