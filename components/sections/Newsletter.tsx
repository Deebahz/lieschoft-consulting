import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

export default function Newsletter() {
  return (
    <section className="bg-slate-950 py-24 text-white">
      <Container>
        <div className="mx-auto max-w-4xl rounded-[2rem] bg-slate-900/95 p-12 shadow-xl sm:p-16">
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
              className="min-w-0 rounded-3xl border border-slate-700 bg-slate-950/90 px-5 py-4 text-base text-white placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
            />
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-3xl bg-emerald-600 px-7 py-4 text-base font-semibold text-white transition hover:bg-emerald-500"
            >
              Subscribe
            </button>
          </form>
        </div>
      </Container>
    </section>
    );
}
