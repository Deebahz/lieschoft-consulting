import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Newsletter() {
  return (
    <section className="bg-slate-950 py-24 text-white">
      <Container>
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(167,139,250,0.18),_transparent_28%),rgba(15,23,42,0.92)] p-12 shadow-[0_28px_80px_rgba(15,23,42,0.45)] sm:p-16">
          <SectionHeading
            eyebrow="Newsletter"
            title="Stay informed with concise insights for business leaders"
            description="Receive monthly updates on consulting trends, financial strategy, and operational excellence."
          />

          <form className="mt-10 grid gap-4 sm:grid-cols-[1fr_auto]">
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              placeholder="Enter your email"
              className="min-w-0 rounded-3xl border border-white/10 bg-slate-950/80 px-5 py-4 text-base text-white placeholder:text-slate-400 focus:border-violet-300 focus:outline-none focus:ring-2 focus:ring-violet-400/30"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-3xl bg-gradient-to-r from-violet-500 to-violet-300 px-7 py-4 text-base font-semibold text-slate-950 transition hover:brightness-110"
            >
              Subscribe
            </button>
          </form>
        </div>
      </Container>
    </section>
  );
}

