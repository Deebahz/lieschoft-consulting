import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { getSiteData } from "@/lib/siteData";

export default function Insights() {
  const { insights } = getSiteData();

  return (
    <section className="py-24">
      <Container>
        <SectionHeading
          eyebrow="Insights"
          title="Thought leadership for decision-makers"
          description="Explore concise guidance on business transformation, finance, and operational excellence."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {insights.map((item) => (
            <Card key={item.title}>
              <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
              <p className="mt-4 text-sm leading-6 text-slate-600">{item.excerpt}</p>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
