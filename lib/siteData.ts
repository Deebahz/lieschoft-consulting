import fs from "fs";
import path from "path";

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

export interface CaseStudyData {
  title: string;
  summary: string;
  slug: string;
  content: string;
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
  excerpt: string;
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
  caseStudies: CaseStudyData[];
  testimonials: TestimonialData[];
  insights: InsightData[];
  cta: CTAData;
  newsletter: NewsletterData;
  contact: ContactData;
  footer: FooterData;
  pages: {
    about: PageInfoData;
    careers: PageInfoData;
    caseStudies: PageInfoData;
    contact: PageInfoData;
    industries: PageInfoData;
    insights: PageInfoData;
    services: PageInfoData;
  };
}

const siteFilePath = path.join(process.cwd(), "data", "site.json");

export function getSiteData(): SiteData {
  const rawData = fs.readFileSync(siteFilePath, "utf8");
  const normalizedData = rawData.charCodeAt(0) === 0xfeff ? rawData.slice(1) : rawData;
  return JSON.parse(normalizedData) as SiteData;
}

export function saveSiteData(data: SiteData) {
  fs.writeFileSync(siteFilePath, JSON.stringify(data, null, 2));
}
