import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

export default function AboutPage() {
  return (
    <main>
      <section className="bg-slate-50 py-24">
        <Container>
          <SectionHeading
            eyebrow="About"
            title="We help businesses make smarter financial and strategic decisions"
            description="Lieschoft Consulting provides a blend of strategy, finance, operations, and digital advisory to help organizations grow with confidence."
          />

          <div className="mt-12 grid gap-10 lg:grid-cols-2">
            <div className="space-y-6 rounded-3xl bg-white p-10 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-900">Our mission</h2>
              <p className="text-slate-600 leading-7">
                We partner with executive teams to turn complex challenges into clear, actionable growth plans. Our focus is on measurable outcomes, reliable execution, and enduring value.
              </p>
            </div>

            <div className="space-y-6 rounded-3xl bg-white p-10 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-900">What we do</h2>
              <ul className="space-y-4 text-slate-600 leading-7">
                <li>• Financial advisory and performance optimization</li>
                <li>• Audit, compliance, and risk management</li>
                <li>• Tax planning and structuring</li>
                <li>• Technology strategy and analytics enablement</li>
              </ul>
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
