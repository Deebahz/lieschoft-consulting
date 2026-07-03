import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600 text-lg font-bold text-white">
        L
      </div>

      <div>
        <h1 className="text-lg font-bold tracking-tight text-slate-900">
          Lieschoft
        </h1>

        <p className="text-xs uppercase tracking-[0.25em] text-slate-500">
          Consulting
        </p>
      </div>
    </Link>
  );
}