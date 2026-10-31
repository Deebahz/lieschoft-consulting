import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import { defaultSiteData } from "@/data/site";

export default function ServicesPage() {
  const { services } = defaultSiteData;

  return (
    <main>
      <section className="bg-slate-50 py-24">
        <Container>
          <SectionHeading
            eyebrow="Services"
            title="Consulting services designed to solve your most important challenges"
            description="We partner with clients to improve performance across finance, operations, and technology."
          />

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {services.map((service) => (
              <Card key={service.title}>
                <h3 className="text-xl font-semibold text-slate-900">{service.title}</h3>
                <p className="mt-4 text-sm leading-6 text-slate-600">{service.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>
    </main>
  );
}
