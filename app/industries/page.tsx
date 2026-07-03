import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";

const industries = [
  {
    title: "Real Estate",
    summary: "Advisory for asset growth, portfolio optimization, and capital planning.",
  },
  {
    title: "Technology",
    summary: "Strategy and analytics support for software, fintech, and digital services.",
  },
  {
    title: "Professional Services",
    summary: "Operational improvement and growth planning for advisory firms.",
  },
  {
    title: "Financial Services",
    summary: "Risk, reporting, and business transformation guidance for financial institutions.",
  },
];

export default function IndustriesPage() {
  return (
    <main>
      <section className="bg-slate-50 py-24">
        <Container>
          <SectionHeading
            eyebrow="Industries"
            title="Industry expertise across business, finance, and technology"
            description="We bring sector-specific insight while applying a consistent methodology across every client engagement."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {industries.map((industry) => (
              <Card key={industry.title}>
                <h3 className="text-xl font-semibold text-slate-900">{industry.title}</h3>
                <p className="mt-4 text-sm leading-6 text-slate-600">{industry.summary}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
