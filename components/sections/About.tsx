import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { getSiteData } from "@/lib/siteData";

export default function About() {
  const { about } = getSiteData();

  return (
    <section className="py-24">
      <Container>
        <div className="grid gap-16 lg:grid-cols-[1.2fr_0.8fr] items-center">
          <div className="space-y-8">
            <SectionHeading eyebrow={about.eyebrow} title={about.title} description={about.description} />

            <p className="max-w-2xl text-lg leading-8 text-slate-600">
              Our team delivers multidisciplinary advisory support through every stage of growth, from operational improvement to investment readiness and digital transformation.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              {about.features.map((feature) => (
                <div key={feature.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
                  <p className="text-sm font-semibold uppercase tracking-[0.24em] text-stone-700">{feature.title}</p>
                  <p className="mt-4 text-slate-700">{feature.description}</p>
                </div>
              ))}
            </div>

            <Button href="/contact">Start the conversation</Button>
          </div>

          <div className="rounded-[2rem] bg-stone-50 p-10 shadow-sm">
            <div className="rounded-3xl border border-stone-200 bg-white p-8 shadow-sm">
              <p className="text-sm uppercase tracking-[0.3em] text-stone-700">Why clients choose us</p>
              <ul className="mt-8 space-y-6 text-slate-700">
                {about.reasons.map((reason) => (
                  <li key={reason}>• {reason}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

