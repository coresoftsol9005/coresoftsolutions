import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import heroImg from "@/assets/hero-network.jpg";

export function Hero() {
  return (
    <section className="bg-hero noise-overlay relative overflow-hidden pb-32 pt-32 md:pb-44 md:pt-44">
      {/* Decorative orbs & rings */}
      <div className="glow-orb glow-orb-red right-[-100px] top-[-100px] h-[500px] w-[500px]" />
      <div className="glow-orb glow-orb-navy bottom-[-150px] left-[-100px] h-[420px] w-[420px]" />
      <div className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full border-[80px] border-red-brand/[0.06]" />
      <div className="pointer-events-none absolute -bottom-32 left-32 h-[300px] w-[300px] rounded-full border-[40px] border-navy/15" />
      <div className="grid-bg pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 md:px-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
        {/* Left — copy */}
        <div className="reveal-up text-center lg:text-left">
          <div className="mb-7 inline-flex items-center gap-3">
            <span className="h-px w-10 bg-red-brand" />
            <span className="eyebrow">AI &amp; Digital Growth Studio</span>
          </div>

          <h1 className="font-display text-5xl font-extrabold leading-[1.02] tracking-tight md:text-6xl lg:text-7xl">
            WE HELP <br className="hidden md:block" />
            LOCAL BUSINESSES
            <br />
            <span className="text-grad-red glow-text">SCALE.</span>
          </h1>

          <p className="mx-auto mt-7 max-w-xl text-base text-text-mid md:text-lg lg:mx-0">
            AI automation, lead engines, and digital presence — engineered for
            clinics, cafés, real-estate, and D2C brands ready to dominate their
            market.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
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

          <div className="mx-auto mt-16 grid max-w-md grid-cols-3 gap-6 border-t border-border pt-8 lg:mx-0">
            {[
              { v: "120+", l: "Projects shipped" },
              { v: "4.2×", l: "Avg. ROI delivered" },
              { v: "30d", l: "Time to first lead" },
            ].map((s) => (
              <div key={s.l} className="text-left">
                <div className="font-display text-2xl font-bold text-foreground md:text-3xl">
                  {s.v}
                </div>
                <div className="mt-1 text-[10px] uppercase tracking-[0.15em] text-text-dim">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — hero illustration */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="floaty relative">
            {/* Glow halo behind */}
            <div className="absolute inset-0 -z-10 scale-110 rounded-[2.5rem] bg-gradient-to-br from-red-brand/40 via-navy/30 to-light-blue/20 blur-3xl" />
            <div className="shadow-card-soft relative overflow-hidden rounded-[2.5rem] border border-border bg-card">
              <img
                src={heroImg}
                alt="Network diagram of a business connecting to customers via AI-powered channels"
                width={1024}
                height={1024}
                className="h-full w-full object-cover"
                fetchPriority="high"
              />
              {/* Orbiting badges */}
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-4 top-4 rounded-full border border-border bg-background/70 px-3 py-1.5 backdrop-blur-md">
                  <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.15em] text-light-blue">
                    <span className="h-1.5 w-1.5 animate-[pulse-dot_1.5s_infinite] rounded-full bg-green-400" />
                    Live · 24/7
                  </div>
                </div>
                <div className="absolute bottom-4 right-4 rounded-2xl border border-border bg-background/80 px-4 py-3 backdrop-blur-md">
                  <div className="text-[10px] font-mono uppercase tracking-[0.15em] text-text-dim">
                    Leads / week
                  </div>
                  <div className="font-display text-xl font-bold text-foreground">
                    +148<span className="text-red-brand">↑</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
