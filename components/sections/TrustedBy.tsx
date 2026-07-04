import Container from "@/components/ui/Container";
import { getSiteData } from "@/lib/siteData";

export default function TrustedBy() {
  const { trustedBy } = getSiteData();

  return (
    <section className="border-t border-slate-200/70 bg-white py-16">
      <Container>
        <div className="flex flex-col items-center gap-8 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-stone-700">{trustedBy.heading}</p>
          <p className="max-w-2xl text-xl font-semibold text-slate-900 sm:text-2xl">{trustedBy.subtitle}</p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {trustedBy.partners.map((name) => (
            <div
              key={name}
              className="rounded-3xl border border-slate-200/80 bg-slate-50 px-6 py-8 text-center text-sm font-semibold text-slate-600 shadow-sm"
            >
              {name}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

