"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

import Container from "../ui/Container";
import Logo from "../ui/Logo";
import { navigation } from "@/lib/navigation";

export default function Navbar() {
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/90 backdrop-blur-md">
      <Container>

        <div className="flex h-20 items-center justify-between">

          <Logo />

          <nav className="hidden items-center gap-8 lg:flex">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`transition ${
                  pathname === item.href
                    ? "font-semibold text-stone-700"
                    : "text-slate-700 hover:text-stone-700"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <button
            className="lg:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>

        </div>

      </Container>

      {isOpen && (
        <div className="border-t bg-white lg:hidden">
          <Container>

            <div className="flex flex-col py-6">

              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="py-3 text-slate-700"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}

            </div>

          </Container>
        </div>
      )}
    </header>
  );
}
