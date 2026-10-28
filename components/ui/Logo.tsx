import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3">
      <div className="relative h-11 w-11 overflow-hidden rounded-xl border border-violet-200/20 bg-violet-500/10 shadow-[0_8px_25px_rgba(139,92,246,0.18)]">
        <img src="/images/logo-icon.png" alt="Lieschoft logo" className="h-full w-full object-cover" />
      </div>

      <div>
        <h1 className="text-lg font-bold tracking-tight text-white">
          Lieschoft
        </h1>

        <p className="text-xs uppercase tracking-[0.25em] text-slate-300">
          Consulting
        </p>
      </div>
    </Link>
  );
}
