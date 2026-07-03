import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";

const posts = [
  {
    title: "Align finance and operations for faster growth",
    excerpt: "How to build transparency, accountability, and execution discipline across your organization.",
  },
  {
    title: "Preparing your business for strategic investment",
    excerpt: "Key priorities for readiness, reporting, and investor confidence.",
  },
  {
    title: "Modernizing legacy reporting with data-driven insights",
    excerpt: "A practical approach to moving from manual reports to real-time analytics."
  },
];

export default function InsightsPage() {
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
            {posts.map((post) => (
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
