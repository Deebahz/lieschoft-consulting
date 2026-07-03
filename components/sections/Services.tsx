import { Briefcase, ShieldCheck, Calculator, BarChart3 } from "lucide-react";
import Card from "@/components/ui/Card";
import SectionHeading from "@/components/ui/SectionHeading";
import Container from "@/components/ui/Container";
import { getSiteData } from "@/lib/siteData";

const iconMap: Record<string, typeof Briefcase> = {
  "Financial Advisory": Briefcase,
  "Audit & Assurance": ShieldCheck,
  "Tax Consulting": Calculator,
  "Technology Strategy": BarChart3,
};

export default function Services() {
  const { services } = getSiteData();

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
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
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
