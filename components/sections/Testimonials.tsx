import Card from "@/components/ui/Card";
import SectionHeading from "@/components/ui/SectionHeading";
import Container from "@/components/ui/Container";

const testimonials = [
  {
    quote: "Lieschoft helped us simplify our financial reporting and build a growth plan that the executive team trusted.",
    name: "Elizabeth N.",
    title: "CEO, Nova Capital",
  },
  {
    quote: "Their approach is both strategic and practical — they delivered a roadmap we could implement immediately.",
    name: "David K.",
    title: "CFO, Veridian Group",
  },
  {
    quote: "The team gave us clarity around our operations, and the results were visible in the first quarter.",
    name: "Amina S.",
    title: "Operations Director, Kestrel Partners",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24">
      <Container>
        <SectionHeading
          eyebrow="Testimonials"
          title="Client feedback from teams that trust our work"
          description="We deliver advisory services that executives value for quality, speed, and measurable business impact."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name}>
              <p className="text-lg leading-8 text-slate-700">“{testimonial.quote}”</p>
              <div className="mt-8 border-t border-slate-200 pt-6 text-sm text-slate-600">
                <p className="font-semibold text-slate-900">{testimonial.name}</p>
                <p>{testimonial.title}</p>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
    );
}
