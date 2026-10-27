import { get, put } from "@vercel/blob";
import { connection } from "next/server";
import { getSiteData, saveSiteData, type InsightData } from "@/lib/siteData";

const insightsPath = "site/insights.json";

export function isInsightsStorageConfigured() {
  return Boolean(
    process.env.BLOB_READ_WRITE_TOKEN ||
      (process.env.VERCEL_OIDC_TOKEN && process.env.BLOB_STORE_ID)
  );
}

function isInsightData(value: unknown): value is InsightData[] {
  return (
    Array.isArray(value) &&
    value.every(
      (item) =>
        typeof item === "object" &&
        item !== null &&
        typeof item.title === "string" &&
        typeof item.excerpt === "string"
    )
  );
}

export async function getInsights(): Promise<InsightData[]> {
  await connection();

  if (!isInsightsStorageConfigured()) {
    return getSiteData().insights;
  }

  const blob = await get(insightsPath, { access: "private", useCache: false });
  if (!blob || blob.statusCode !== 200 || !blob.stream) {
    return getSiteData().insights;
  }

  const storedInsights: unknown = await new Response(blob.stream).json();
  if (!isInsightData(storedInsights)) {
    throw new Error("Stored insights data is invalid.");
  }

  return storedInsights;
}

export async function saveInsights(insights: InsightData[]) {
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
    throw new Error("Connect a Vercel Blob store to persist insights in production.");
  }

  const siteData = getSiteData();
  siteData.insights = insights;
  saveSiteData(siteData);
}