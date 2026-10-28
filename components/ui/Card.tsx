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
      className={`overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/5 p-8 shadow-[0_20px_45px_rgba(15,23,42,0.45)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-violet-300/30 hover:bg-white/8 hover:shadow-[0_28px_60px_rgba(139,92,246,0.18)] ${className}`}
    >
      {children}
    </div>
  );
}
