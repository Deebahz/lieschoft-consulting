import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import { getSiteData } from "@/lib/siteData";

export default function CaseStudiesPage() {
  const { caseStudies } = getSiteData();

  return (
    <main>
      <section className="bg-slate-50 py-24">
        <Container>
          <SectionHeading
            eyebrow="Case Studies"
            title="Examples of how we deliver measurable impact"
            description="These engagements illustrate our ability to help clients improve reporting, execution, and financial performance."
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {caseStudies.map((study) => (
              <Link key={study.slug} href={`/case-studies/${study.slug}`} className="group">
                <Card className="h-full">
                  <h3 className="text-xl font-semibold text-slate-900 group-hover:text-stone-700">
                    {study.title}
                  </h3>
                  <p className="mt-4 text-sm leading-6 text-slate-600">{study.summary}</p>
                </Card>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}

