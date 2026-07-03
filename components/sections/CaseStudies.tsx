import Link from "next/link";
import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { getSiteData } from "@/lib/siteData";

export default function CaseStudies() {
  const { caseStudies } = getSiteData();

  return (
    <section className="bg-slate-50 py-24">
      <Container>
        <SectionHeading
          eyebrow="Case Studies"
          title="Proven engagements that delivered performance improvements"
          description="Each engagement is focused on practical execution, measurable outcomes, and long-term value."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {caseStudies.map((item) => (
            <Link key={item.slug} href={`/case-studies/${item.slug}`} className="group">
              <Card className="h-full">
                <h3 className="text-xl font-semibold text-slate-900 group-hover:text-emerald-600">{item.title}</h3>
                <p className="mt-4 text-sm leading-6 text-slate-600">{item.summary}</p>
              </Card>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
