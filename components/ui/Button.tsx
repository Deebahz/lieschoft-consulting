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
      className="rounded-xl bg-emerald-600 px-6 py-3 font-medium text-white transition-all duration-300 hover:bg-emerald-700"
    >
      {children}
    </Link>
  );
}