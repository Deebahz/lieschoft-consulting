import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ContactForm from "@/components/contact/ContactForm";

export default function ContactPage() {
  return (
    <main>
      <section className="py-24">
        <Container>
          <SectionHeading
            eyebrow="Contact"
            title="Get in touch with our team"
            description="Whether you need advisory support or want to discuss a project, we’re ready to help you move forward."
          />

          <div className="mt-12 grid gap-10 lg:grid-cols-2">
            <div className="space-y-6 rounded-3xl bg-slate-50 p-10 shadow-sm">
              <p className="text-slate-600 leading-7">
                Reach out to schedule a consultation or ask about our services. We provide responsive guidance and a tailored approach for every business.
              </p>
              <div className="space-y-4 text-slate-700">
                <p>info@lieschoft.com</p>
                <p>+254 XXX XXX XXX</p>
                <p>Nairobi, Kenya</p>
              </div>
            </div>

            <div className="space-y-6 rounded-3xl bg-slate-50 p-10 shadow-sm">
              <h2 className="text-2xl font-semibold text-slate-900">Request a call</h2>
              <p className="text-slate-600 leading-7">Tell us a bit about your business and we’ll follow up with next steps.</p>
              <ContactForm />
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
