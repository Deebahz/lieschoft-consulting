import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import { getInsights } from "@/lib/insightsData";

export default async function InsightsPage() {
  const insights = await getInsights();

  return (
    <main>
      <section className="py-24">
        <Container>
          <SectionHeading
            eyebrow="Insights"
            title="Practical guidance for leaders and teams"
            description="Explore commentary and frameworks for improving financial, operational, and strategic performance."
          />

          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {insights.map((post) => (
              <Card key={post.title}>
                <h3 className="text-xl font-semibold text-slate-900">{post.title}</h3>
                <p className="mt-4 text-sm leading-6 text-slate-600">{post.excerpt}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
