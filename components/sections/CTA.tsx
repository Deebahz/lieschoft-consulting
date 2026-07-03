import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";

export default function CTA() {
  return (
    <section className="bg-slate-950 py-24 text-white">
      <Container>
        <div className="grid gap-10 rounded-[2rem] bg-slate-900/95 p-12 text-center shadow-xl sm:p-16">
          <div className="mx-auto max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-emerald-400">Ready to move forward?</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
              Partner with a consulting team that delivers reliable business growth.
            </h2>
            <p className="mt-6 text-base leading-8 text-slate-300">
              Book a consultation and let us help you build a plan that combines financial discipline, operational clarity, and long-term resilience.
            </p>
          </div>

          <div className="flex justify-center">
            <Button href="/contact">Book Consultation</Button>
          </div>
        </div>
      </Container>
    </section>
    );
}
