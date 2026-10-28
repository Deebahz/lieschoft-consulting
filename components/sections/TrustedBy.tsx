import Container from "@/components/ui/Container";
import { getSiteData } from "@/lib/siteData";

export default function TrustedBy() {
  const { trustedBy } = getSiteData();

  return (
    <section className="border-t border-white/10 bg-slate-950/40 py-16 backdrop-blur-sm">
      <Container>
        <div className="flex flex-col items-center gap-8 text-center">
          <p className="text-sm font-medium uppercase tracking-[0.3em] text-violet-200">{trustedBy.heading}</p>
          <p className="max-w-2xl text-xl font-semibold text-white sm:text-2xl">{trustedBy.subtitle}</p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {trustedBy.partners.map((name) => (
            <div
              key={name}
              className="rounded-3xl border border-white/10 bg-white/5 px-6 py-8 text-center text-sm font-semibold text-slate-200 shadow-[0_18px_40px_rgba(15,23,42,0.35)] backdrop-blur-md"
            >
              {name}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

