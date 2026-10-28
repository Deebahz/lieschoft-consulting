import Container from "../ui/Container";
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

          <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-8 shadow-[0_30px_70px_rgba(15,23,42,0.6)] backdrop-blur-xl">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-white">Business Performance Snapshot</h3>

              <div className="grid grid-cols-2 gap-6">
                <div className="rounded-2xl border border-white/10 bg-slate-900/55 p-6">
                  <p className="text-3xl font-bold text-violet-200">250+</p>
                  <p className="mt-2 text-sm text-slate-300">Projects Delivered</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-900/55 p-6">
                  <p className="text-3xl font-bold text-violet-200">95%</p>
                  <p className="mt-2 text-sm text-slate-300">Client Satisfaction</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-900/55 p-6">
                  <p className="text-3xl font-bold text-violet-200">12+</p>
                  <p className="mt-2 text-sm text-slate-300">Industries Served</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-900/55 p-6">
                  <p className="text-3xl font-bold text-violet-200">24/7</p>
                  <p className="mt-2 text-sm text-slate-300">Strategic Support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

