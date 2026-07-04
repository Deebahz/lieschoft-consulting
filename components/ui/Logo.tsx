import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3">
      <div className="relative h-11 w-11 overflow-hidden rounded-xl bg-stone-100">
        <img src="/images/logo-icon.png" alt="Lieschoft logo" className="h-full w-full object-cover" />
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
