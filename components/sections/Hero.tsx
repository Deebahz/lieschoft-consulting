import Container from "../ui/Container";
import { getSiteData } from "@/lib/siteData";

export default function Hero() {
  const siteData = getSiteData();
  const hero = siteData.hero;
  const [beforeHighlight, afterHighlight] = hero.title.split(hero.highlight);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-stone-50 py-24 lg:py-36">
      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <span className="rounded-full bg-stone-100 px-4 py-2 text-sm font-medium text-stone-700">
              {hero.badge}
            </span>

            <h1 className="mt-8 text-5xl font-bold leading-tight text-slate-900 lg:text-7xl">
              {beforeHighlight}
              <span className="text-stone-700">{hero.highlight}</span>
              {afterHighlight}
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-slate-600">
              {hero.description}
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href={hero.secondaryLink.href}
                className="rounded-xl border border-slate-300 px-6 py-3 font-medium text-slate-800 transition hover:border-stone-700 hover:text-stone-700"
              >
                {hero.secondaryLink.label}
              </a>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl">
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-slate-900">Business Performance Snapshot</h3>

              <div className="grid grid-cols-2 gap-6">
                <div className="rounded-2xl bg-slate-50 p-6">
                  <p className="text-3xl font-bold text-stone-700">250+</p>
                  <p className="mt-2 text-sm text-slate-500">Projects Delivered</p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-6">
                  <p className="text-3xl font-bold text-stone-700">95%</p>
                  <p className="mt-2 text-sm text-slate-500">Client Satisfaction</p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-6">
                  <p className="text-3xl font-bold text-stone-700">12+</p>
                  <p className="mt-2 text-sm text-slate-500">Industries Served</p>
                </div>

                <div className="rounded-2xl bg-slate-50 p-6">
                  <p className="text-3xl font-bold text-stone-700">24/7</p>
                  <p className="mt-2 text-sm text-slate-500">Strategic Support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

