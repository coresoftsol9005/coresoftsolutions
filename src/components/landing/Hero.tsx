import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function Hero() {
  return (
    <section className="bg-hero noise-overlay relative overflow-hidden pb-32 pt-40 md:pb-48 md:pt-56">
      {/* Decorative rings */}
      <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full border-[80px] border-red-brand/[0.06]" />
      <div className="pointer-events-none absolute -bottom-32 left-32 h-[300px] w-[300px] rounded-full border-[40px] border-navy/15" />
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />

      <div className="relative mx-auto max-w-6xl px-6 text-center md:px-10">
        <div className="mb-8 inline-flex items-center gap-3">
          <span className="h-px w-10 bg-red-brand" />
          <span className="eyebrow">AI &amp; Digital Growth Studio</span>
          <span className="h-px w-10 bg-red-brand" />
        </div>

        <h1 className="font-display text-5xl font-extrabold leading-[1.02] tracking-tight md:text-7xl lg:text-8xl">
          WE HELP <br className="md:hidden" />
          LOCAL BUSINESSES
          <br />
          <span className="text-grad-red">SCALE.</span>
        </h1>

        <p className="mx-auto mt-8 max-w-2xl text-base text-text-mid md:text-lg">
          AI automation, lead engines, and digital presence — engineered for
          clinics, cafés, real-estate, and D2C brands ready to dominate their
          market.
        </p>

        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            to="/discovery"
            className="bg-grad-red shadow-red-glow group inline-flex items-center gap-2 rounded-full px-7 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-white transition-transform hover:scale-[1.03]"
          >
            Start Discovery
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <a
            href="#pillars"
            className="rounded-full border border-light-blue/30 px-7 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-light-blue transition-colors hover:border-light-blue hover:bg-light-blue/5"
          >
            Explore Services
          </a>
        </div>

        <div className="mx-auto mt-24 grid max-w-3xl grid-cols-3 gap-8 border-t border-border pt-10">
          {[
            { v: "120+", l: "Projects shipped" },
            { v: "4.2×", l: "Avg. ROI delivered" },
            { v: "30d", l: "Time to first lead" },
          ].map((s) => (
            <div key={s.l} className="text-left">
              <div className="font-display text-3xl font-bold text-foreground md:text-4xl">
                {s.v}
              </div>
              <div className="mt-1 text-xs uppercase tracking-[0.15em] text-text-dim">
                {s.l}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
