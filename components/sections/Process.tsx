import { CheckCircle, Compass, Timer, Users } from "lucide-react";
import Card from "@/components/ui/Card";
import SectionHeading from "@/components/ui/SectionHeading";
import { getSiteData } from "@/lib/siteData";

const iconMap: Record<string, typeof Users> = {
  Discover: Compass,
  Align: Users,
  Execute: CheckCircle,
  Measure: Timer,
};

export default function Process() {
  const { process } = getSiteData();

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <SectionHeading
          eyebrow="Consulting Process"
          title="A proven path from strategy to measurable growth"
          description="Our methodology keeps teams aligned, decisions grounded in data, and outcomes clearly defined."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {process.map((step) => {
            const Icon = iconMap[step.title] || Users;
            return (
              <Card key={step.title}>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white">
                  <Icon size={20} />
                </div>
                <h3 className="mt-8 text-xl font-semibold text-slate-900">{step.title}</h3>
                <p className="mt-4 text-sm leading-6 text-slate-600">{step.description}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
