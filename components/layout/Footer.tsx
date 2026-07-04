import Link from "next/link";
import Container from "../ui/Container";
import Logo from "../ui/Logo";

export default function Footer() {
  return (
    <footer className="bg-slate-950 text-slate-300">

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

            <div className="space-y-3">
              <Link href="/about">About</Link><br />
              <Link href="/services">Services</Link><br />
              <Link href="/careers">Careers</Link><br />
              <Link href="/contact">Contact</Link>
            </div>
          </div>

          <div>
            <h3 className="mb-5 font-semibold text-white">Services</h3>

            <div className="space-y-3">
              <p>Financial Advisory</p>
              <p>Audit & Assurance</p>
              <p>Tax Consulting</p>
              <p>Investment Analysis</p>
            </div>
          </div>

          <div>
            <h3 className="mb-5 font-semibold text-white">Contact</h3>

            <p>Nairobi, Kenya</p>
            <p>ceo@lieschoftconsulting.com</p>
            <p>+254796039507</p>

          </div>

        </div>

        <div className="mt-16 border-t border-slate-800 pt-8 text-sm text-slate-500">
          © 2026 Lieschoft Consulting. All Rights Reserved.
        </div>

      </Container>
    </footer>
  );
}