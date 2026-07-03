import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import CaseStudies from "@/components/sections/CaseStudies";
import Insights from "@/components/sections/Insights";
import CTA from "@/components/sections/CTA";
import Newsletter from "@/components/sections/Newsletter";

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
