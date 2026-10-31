import { BarChart3, Briefcase, Calculator, Cloud } from "lucide-react";
import Card from "@/components/ui/Card";
import SectionHeading from "@/components/ui/SectionHeading";
import Container from "@/components/ui/Container";
import { defaultSiteData } from "@/data/site";

const iconMap: Record<string, typeof Briefcase> = {
  "Software Development": Briefcase,
  "Cloud Deployment": Cloud,
  "Investment Consulting": Calculator,
  "Investment Analysis": BarChart3,
};

export default function Services() {
  const { services } = defaultSiteData;
  return (
    <section className="bg-slate-50 py-24">
      <Container>
        <SectionHeading
          eyebrow="Services"
          title="The consulting capabilities that drive measurable business outcomes"
          description="We organize our services around commercial insight, operating discipline, and technology enablement."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {services.map((service) => {
            const Icon = iconMap[service.title] || Briefcase;
            return (
              <Card key={service.title}>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-stone-100 text-stone-700">
                  <Icon size={20} />
                </div>
                <h3 className="mt-8 text-xl font-semibold text-slate-900">{service.title}</h3>
                <p className="mt-4 text-sm leading-6 text-slate-600">{service.description}</p>
              </Card>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

