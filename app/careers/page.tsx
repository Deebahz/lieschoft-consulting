import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { getSiteData } from "@/lib/siteData";

export default function CareersPage() {
  const { openPositions, contact } = getSiteData();

  return (
    <main>
      <section className="py-24">
        <Container>
          <SectionHeading
            eyebrow="Careers"
            title="Join a team that values insight, collaboration, and growth"
            description="We hire professionals who bring strategic thinking, operational experience, and a commitment to client success."
          />

          <div className="mt-12 space-y-8">
            {openPositions.map((position) => {
              const mailto = `mailto:${encodeURIComponent(contact.email)}?subject=${encodeURIComponent(
                `Application for ${position.title}`
              )}`;

              return (
                <div key={position.title} className="rounded-3xl border border-slate-200 bg-white p-10 shadow-sm">
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <h2 className="text-2xl font-semibold text-slate-900">{position.title}</h2>
                      <p className="mt-4 text-slate-600 leading-7">
                        Apply by email and tell us how your experience matches the role.
                      </p>
                    </div>
                    <a
                      href={mailto}
                      className="inline-flex items-center justify-center rounded-full bg-stone-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-stone-800"
                    >
                      Apply via email
                    </a>
                  </div>

                  <div className="mt-8 grid gap-8 md:grid-cols-2">
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">Responsibilities</h3>
                      <ul className="mt-4 space-y-3 text-slate-600">
                        {position.responsibilities.map((item) => (
                          <li key={item}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">Requirements</h3>
                      <ul className="mt-4 space-y-3 text-slate-600">
                        {position.requirements.map((item) => (
                          <li key={item}>• {item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>
    </main>
  );
}

