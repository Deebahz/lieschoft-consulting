import Link from "next/link";

interface ButtonProps {
  href: string;
  children: React.ReactNode;
}

export default function Button({
  href,
  children,
}: ButtonProps) {
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-violet-500 to-violet-300 px-6 py-3 font-medium text-slate-950 shadow-[0_12px_28px_rgba(139,92,246,0.35)] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_18px_35px_rgba(139,92,246,0.45)]"
    >
      {children}
    </Link>
  );
}
