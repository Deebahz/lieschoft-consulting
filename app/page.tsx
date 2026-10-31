import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import Insights from "@/components/sections/Insights";
import CTA from "@/components/sections/CTA";
import Newsletter from "@/components/sections/Newsletter";

export const metadata = {
  title: "Lucent Consulting | Strategic Advisory for Growth-Driven Organizations",
  description:
    "Lucent Consulting improves business performance with strategic advisory, financial planning, operational transformation, and digital enablement.",
  openGraph: {
    title: "Lucent Consulting | Strategic Advisory for Growth-Driven Organizations",
    description:
      "Lucent Consulting improves business performance with strategic advisory, financial planning, operational transformation, and digital enablement.",
    url: "https://Lucent-consult.com",
    images: ["/images/logo-icon.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Lucent Consulting | Strategic Advisory for Growth-Driven Organizations",
    description:
      "Lucent Consulting improves business performance with strategic advisory, financial planning, operational transformation, and digital enablement.",
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
      <Insights />
      <CTA />
      <Newsletter />
    </main>
  );
}
