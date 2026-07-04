import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import CaseStudies from "@/components/sections/CaseStudies";
import Insights from "@/components/sections/Insights";
import CTA from "@/components/sections/CTA";
import Newsletter from "@/components/sections/Newsletter";

export const metadata = {
  title: "Lieschoft Consulting | Strategic Advisory for Growth-Driven Organizations",
  description:
    "Lieschoft Consulting improves business performance with strategic advisory, financial planning, operational transformation, and digital enablement.",
  openGraph: {
    title: "Lieschoft Consulting | Strategic Advisory for Growth-Driven Organizations",
    description:
      "Lieschoft Consulting improves business performance with strategic advisory, financial planning, operational transformation, and digital enablement.",
    url: "https://lieschoft-consult.com",
    images: ["/images/logo-icon.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lieschoft Consulting | Strategic Advisory for Growth-Driven Organizations",
    description:
      "Lieschoft Consulting improves business performance with strategic advisory, financial planning, operational transformation, and digital enablement.",
    images: ["/images/logo-icon.png"],
  },
};

export default function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Services />
      <Process />
      <CaseStudies />
      <Insights />
      <CTA />
      <Newsletter />
    </main>
  );
}
