import Container from "../ui/Container";
import LiveMarketBoard from "@/components/sections/LiveMarketBoard";
import { getSiteData } from "@/lib/siteData";

export default async function Hero() {
  const siteData = await getSiteData();
  const hero = siteData.hero;
  const [beforeHighlight, afterHighlight] = hero.title.split(hero.highlight);

  return (
    <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(139,92,246,0.22),_transparent_26%),radial-gradient(circle_at_bottom_right,_rgba(245,183,109,0.12),_transparent_24%),linear-gradient(135deg,_#050816_0%,_#0b1120_35%,_#111827_100%)] py-24 lg:py-36">
      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <span className="rounded-full border border-violet-200/20 bg-white/5 px-4 py-2 text-sm font-medium text-violet-100">
              {hero.badge}
            </span>

            <h1 className="mt-8 text-5xl font-bold leading-[1.04] tracking-[-0.05em] text-slate-100 drop-shadow-[0_12px_24px_rgba(15,23,42,0.9)] lg:text-7xl">
              {beforeHighlight}
              <span className="text-violet-300">{hero.highlight}</span>
              {afterHighlight}
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-slate-300">
              {hero.description}
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href={hero.secondaryLink.href}
                className="rounded-xl border border-violet-300/25 bg-white/5 px-6 py-3 font-medium text-slate-100 transition hover:border-violet-200 hover:text-violet-100"
              >
                {hero.secondaryLink.label}
              </a>
            </div>
          </div>

          <LiveMarketBoard />
        </div>
      </Container>
    </section>
  );
}

