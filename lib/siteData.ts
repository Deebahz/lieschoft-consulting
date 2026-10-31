import fs from "fs";
import path from "path";
import { connection } from "next/server";
import { defaultSiteData } from "@/data/site";
import { getMongoDb, isMongoConfigured, type MongoDataDocument } from "@/lib/mongo";

export interface HeroData {
  badge: string;
  title: string;
  highlight: string;
  description: string;
  primaryCta: {
    label: string;
    href: string;
  };
  secondaryLink: {
    label: string;
    href: string;
  };
}

export interface TrustedByData {
  heading: string;
  subtitle: string;
  partners: string[];
}

export interface AboutData {
  eyebrow: string;
  title: string;
  description: string;
  features: { title: string; description: string }[];
  reasons: string[];
}

export interface ServiceData {
  title: string;
  description: string;
}

export interface IndustryData {
  title: string;
  description: string;
}

export interface ProcessStep {
  title: string;
  description: string;
}

export interface OpenPosition {
  title: string;
  responsibilities: string[];
  requirements: string[];
}

export interface TestimonialData {
  quote: string;
  name: string;
  title: string;
}

export interface InsightData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
}

export interface CTAData {
  eyebrow: string;
  title: string;
  description: string;
  buttonLabel: string;
  buttonHref: string;
}

export interface NewsletterData {
  eyebrow: string;
  title: string;
  description: string;
  emailPlaceholder: string;
  subscribeLabel: string;
}

export interface ContactData {
  email: string;
  phone: string;
  location: string;
}

export interface FooterData {
  description: string;
  companyLinks: { label: string; href: string }[];
  servicesLinks: { label: string; href: string }[];
}

export interface PageInfoData {
  title: string;
  description: string;
}

export interface SiteData {
  hero: HeroData;
  trustedBy: TrustedByData;
  about: AboutData;
  services: ServiceData[];
  openPositions: OpenPosition[];
  industries: IndustryData[];
  process: ProcessStep[];
  testimonials: TestimonialData[];
  insights: InsightData[];
  cta: CTAData;
  newsletter: NewsletterData;
  contact: ContactData;
  footer: FooterData;
  pages: {
    about: PageInfoData;
    careers: PageInfoData;
    contact: PageInfoData;
    industries: PageInfoData;
    insights: PageInfoData;
    services: PageInfoData;
  };
}

const siteFilePath = path.join(process.cwd(), "data", "site.json");

export async function getSiteData(): Promise<SiteData> {
  await connection();

  if (isMongoConfigured()) {
    const db = await getMongoDb();
    if (db) {
      const document = await db.collection<MongoDataDocument>("site_config").findOne({ _id: "site" });
      if (document && document.data && typeof document.data === "object") {
        return document.data as SiteData;
      }
    }
  }

  try {
    if (!fs.existsSync(siteFilePath)) {
      return defaultSiteData;
    }

    const rawData = fs.readFileSync(siteFilePath, "utf8");
    const normalizedData = rawData.charCodeAt(0) === 0xfeff ? rawData.slice(1) : rawData;
    return JSON.parse(normalizedData) as SiteData;
  } catch {
    return defaultSiteData;
  }
}

export async function saveSiteData(data: SiteData) {
  if (isMongoConfigured()) {
    const db = await getMongoDb();
    if (db) {
      await db.collection<MongoDataDocument>("site_config").updateOne(
        { _id: "site" },
        { $set: { data, updatedAt: new Date() } },
        { upsert: true }
      );
      return;
    }
  }

  fs.writeFileSync(siteFilePath, JSON.stringify(data, null, 2));
}
