import Link from "next/link";
import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { getInsights } from "@/lib/insightsData";

export default async function Insights() {
  const insights = await getInsights();

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
              <Link key={item.slug} href={`/insights/${item.slug}`} className="group">
                <Card className="h-full">
                  <h3 className="text-xl font-semibold text-slate-900 group-hover:text-stone-700">{item.title}</h3>
                  <p className="mt-4 text-sm leading-6 text-slate-600">{item.excerpt}</p>
                </Card>
              </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
