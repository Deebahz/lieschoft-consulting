import { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export default function Card({
  children,
  className = "",
}: CardProps) {
  return (
    <div
      className={`overflow-hidden rounded-3xl border border-slate-200/70 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl ${className}`}
    >
      {children}
    </div>
  );
}
