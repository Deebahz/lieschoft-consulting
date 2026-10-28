import Container from "@/components/ui/Container";

export default function CTA() {
  return (
    <section className="bg-slate-950 py-24 text-white">
      <Container>
        <div className="grid gap-10 rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(139,92,246,0.24),_transparent_38%),rgba(15,23,42,0.92)] p-12 text-center shadow-[0_32px_90px_rgba(15,23,42,0.5)] sm:p-16">
          <div className="mx-auto max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-violet-200">Ready to move forward?</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
              Partner with a consulting team that delivers reliable business growth.
            </h2>
            <p className="mt-6 text-base leading-8 text-slate-300">
              We help you build a plan that combines financial discipline, operational clarity, and long-term resilience.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

