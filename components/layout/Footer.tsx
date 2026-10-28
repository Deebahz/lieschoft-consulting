import Link from "next/link";
import Container from "../ui/Container";
import Logo from "../ui/Logo";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950 text-slate-300">

      <Container className="py-20">

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          <div>
            <Logo />
            <p className="mt-6 text-sm leading-7 text-slate-400">
              Helping businesses make smarter financial and strategic decisions
              through expert consulting.
            </p>
          </div>

          <div>
            <h3 className="mb-5 font-semibold text-white">Company</h3>

            <div className="space-y-3 text-slate-300">
              <Link href="/about" className="block transition hover:text-violet-200">About</Link>
              <Link href="/services" className="block transition hover:text-violet-200">Services</Link>
              <Link href="/careers" className="block transition hover:text-violet-200">Careers</Link>
              <Link href="/contact" className="block transition hover:text-violet-200">Contact</Link>
            </div>
          </div>

          <div>
            <h3 className="mb-5 font-semibold text-white">Services</h3>

            <div className="space-y-3 text-slate-300">
              <p>Software Development</p>
              <p>Cloud Deployment</p>
              <p>Investment Consulting</p>
              <p>Investment Analysis</p>
            </div>
          </div>

          <div>
            <h3 className="mb-5 font-semibold text-white">Contact</h3>

            <div className="space-y-3 text-slate-300">
              <p>Nairobi, Kenya</p>
              <p>ceo@lieschoftconsulting.com</p>
              <p>+25447039507</p>
            </div>
          </div>

        </div>

        <div className="mt-16 border-t border-white/10 pt-8 text-sm text-slate-500">
          © 2026 Lieschoft Consulting. All Rights Reserved.
        </div>

      </Container>
    </footer>
  );
}
