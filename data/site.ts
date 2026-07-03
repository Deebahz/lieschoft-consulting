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

export const defaultSiteData: SiteData = {
  hero: {
    badge: "Trusted Financial & Strategy Advisors",
    title: "Empowering businesses with smarter financial strategy and planning.",
    highlight: "smart financial strategy",
    description:
      "Lieschoft Consulting partners with organizations to deliver advisory, audit, tax, investment, and technology consulting solutions that drive sustainable performance.",
    primaryCta: {
      label: "Book Consultation",
      href: "/contact",
    },
    secondaryLink: {
      label: "Explore Services",
      href: "/services",
    },
  },
  trustedBy: {
    heading: "Trusted by ambitious teams",
    subtitle:
      "Our clients rely on Lieschoft Consulting for high-touch advisory services and practical execution support.",
    partners: ["Veridian", "Kestrel", "Aurelia", "Monolith", "Nova"],
  },
  about: {
    eyebrow: "About",
    title: "We help leaders transform complexity into confident decisions",
    description:
      "Lieschoft Consulting combines deep financial insight, strategic planning, and modern technology to help companies scale with clarity and control.",
    features: [
      {
        title: "Strategy",
        description:
          "Market, financial, and growth strategies that align with leadership and investors.",
      },
      {
        title: "Operations",
        description:
          "Process design, performance metrics, and transformation plans for stronger execution.",
      },
      {
        title: "Finance",
        description:
          "Advisory on capital structure, reporting, compliance, and cashflow optimization.",
      },
      {
        title: "Digital",
        description:
          "Technology enablement and analytics solutions that make insights actionable.",
      },
    ],
    reasons: [
      "Senior consultants with operator experience",
      "Data-driven recommendations backed by financial rigor",
      "Practical plans designed for scalable execution",
      "Transparent reporting and measurable milestones",
    ],
  },
  services: [
    {
      title: "Financial Advisory",
      description:
        "Cashflow planning, investment readiness, and sustainable growth strategies.",
    },
    {
      title: "Audit & Assurance",
      description:
        "Governance, compliance, and assurance services for dependable reporting.",
    },
    {
      title: "Tax Consulting",
      description:
        "Tax structure optimization, planning, and compliance for complex businesses.",
    },
    {
      title: "Technology Strategy",
      description:
        "Analytics, systems, and digital transformation guidance for modern teams.",
    },
  ],
  industries: [
    {
      title: "Real Estate",
      description:
        "Performance-driven strategies for asset growth and capital efficiency.",
    },
    {
      title: "Professional Services",
      description:
        "Operational excellence for advisory, legal, and accounting firms.",
    },
    {
      title: "Technology",
      description:
        "Data-enabled decisions for SaaS, fintech, and enterprise platforms.",
    },
    {
      title: "Financial Services",
      description:
        "Risk-aware transformation for banks, insurers, and investors.",
    },
  ],
  process: [
    {
      title: "Discover",
      description:
        "We map your business priorities and identify the highest-impact opportunities.",
    },
    {
      title: "Align",
      description:
        "Cross-functional teams unite around a shared roadmap and measurable goals.",
    },
    {
      title: "Execute",
      description:
        "Our consultants deliver improved processes, systems, and financial controls.",
    },
    {
      title: "Measure",
      description:
        "We track progress, refine the strategy, and hand over sustainable operating discipline.",
    },
  ],
  caseStudies: [
    {
      title: "Financial operations transformation",
      summary:
        "Improved forecasting accuracy and shortened reporting cycles for a regional bank.",
    },
    {
      title: "Scaling a technology advisory practice",
      summary:
        "Built repeatable delivery models and a growth roadmap for a fast-growing consultancy.",
    },
    {
      title: "Modernizing performance reporting",
      summary:
        "Created actionable dashboards and standard operating metrics for leadership.",
    },
  ],
  testimonials: [
    {
      quote:
        "Lieschoft helped us simplify our financial reporting and build a growth plan that the executive team trusted.",
      name: "Elizabeth N.",
      title: "CEO, Nova Capital",
    },
    {
      quote:
        "Their approach is both strategic and practical — they delivered a roadmap we could implement immediately.",
      name: "David K.",
      title: "CFO, Veridian Group",
    },
    {
      quote:
        "The team gave us clarity around our operations, and the results were visible in the first quarter.",
      name: "Amina S.",
      title: "Operations Director, Kestrel Partners",
    },
  ],
  insights: [
    {
      title: "Align finance and operations for faster growth",
      excerpt:
        "Best practices for creating transparent metrics, streamlined planning, and stronger execution.",
    },
    {
      title: "Preparing your business for strategic investment",
      excerpt:
        "A framework for building credibility with investors through controls and reporting.",
    },
    {
      title: "Modernizing legacy reporting with data-driven insights",
      excerpt:
        "A practical guide to moving from manual spreadsheets to actionable dashboards.",
    },
  ],
  cta: {
    eyebrow: "Ready to move forward?",
    title: "Partner with a consulting team that delivers reliable business growth.",
    description:
      "Book a consultation and let us help you build a plan that combines financial discipline, operational clarity, and long-term resilience.",
    buttonLabel: "Book Consultation",
    buttonHref: "/contact",
  },
  newsletter: {
    eyebrow: "Newsletter",
    title: "Stay informed with concise insights for business leaders",
    description:
      "Receive monthly updates on consulting trends, financial strategy, and operational excellence.",
    emailPlaceholder: "Enter your email",
    subscribeLabel: "Subscribe",
  },
  contact: {
    email: "info@lieschoft.com",
    phone: "+254 700 000 000",
    location: "Nairobi, Kenya",
  },
  footer: {
    description:
      "Helping businesses make smarter financial and strategic decisions through expert consulting.",
    companyLinks: [
      { label: "About", href: "/about" },
      { label: "Services", href: "/services" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
    servicesLinks: [
      { label: "Financial Advisory", href: "/services" },
      { label: "Audit & Assurance", href: "/services" },
      { label: "Tax Consulting", href: "/services" },
      { label: "Technology Strategy", href: "/services" },
    ],
  },
  pages: {
    about: {
      title: "About Lieschoft Consulting",
      description:
        "Learn how our advisory team helps clients improve performance, reporting, and strategic execution.",
    },
    careers: {
      title: "Careers at Lieschoft Consulting",
      description:
        "Explore open roles at a growing firm built for collaboration, development, and client impact.",
    },
    caseStudies: {
      title: "Case Studies",
      description:
        "Read examples of client engagements where we helped improve reporting, profitability, and growth.",
    },
    contact: {
      title: "Contact Lieschoft Consulting",
      description:
        "Start a conversation about advisory services, financial strategy, or business transformation.",
    },
    industries: {
      title: "Industries We Serve",
      description:
        "Discover the sectors where we provide consulting, reporting, and technology advisory services.",
    },
    insights: {
      title: "Insights",
      description:
        "Thought leadership and practical guidance for finance and operations leaders.",
    },
    services: {
      title: "Our Services",
      description:
        "The advisory capabilities we provide to help clients improve financial and operational performance.",
    },
  },
};
