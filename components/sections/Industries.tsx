import { Briefcase, Building2, Database, BarChart3 } from "lucide-react";
import Card from "@/components/ui/Card";
import SectionHeading from "@/components/ui/SectionHeading";
import { getSiteData } from "@/lib/siteData";

const iconMap: Record<string, typeof Briefcase> = {
  "Real Estate": Building2,
  "Professional Services": Briefcase,
  Technology: Database,
  "Financial Services": BarChart3,
};

export default function Industries() {
  const { industries } = getSiteData();

  return (
    <section className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <SectionHeading
          eyebrow="Industries"
          title="Industry expertise across high-growth business sectors"
          description="We apply a consistent consulting framework while adapting to the needs of each market and operating model."
        />

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {industries.map((item) => {
            const Icon = iconMap[item.title] || Briefcase;
            return (
              <Card key={item.title}>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-stone-100 text-stone-700">
                  <Icon size={24} />
                </div>

                <h3 className="mt-8 text-xl font-semibold text-slate-900">{item.title}</h3>
                <p className="mt-4 text-sm leading-6 text-slate-600">{item.description}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}

