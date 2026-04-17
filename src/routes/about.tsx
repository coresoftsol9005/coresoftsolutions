import { createFileRoute, Link } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { MapPin, Sparkles, Target, Users } from "lucide-react";
import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About CoreSoft Solutions — Digital Agency in Hisar, Haryana" },
      {
        name: "description",
        content:
          "CoreSoft Solutions is a Hisar-based digital agency helping local businesses — restaurants, clinics, salons, and service providers — grow through websites, SEO, AI automation, and social media.",
      },
      {
        property: "og:title",
        content: "About CoreSoft Solutions — Local Growth, Smarter Systems",
      },
      {
        property: "og:description",
        content:
          "Based in Hisar, Haryana. We help 50+ local businesses save 10+ hours a week and 3× their online leads through connected digital systems.",
      },
      { property: "og:image", content: "/og-image.png" },
      { name: "twitter:image", content: "/og-image.png" },
    ],
  }),
  component: AboutPage,
});

const stats = [
  { value: "50+", label: "Local businesses served" },
  { value: "10h+", label: "Saved per week, per client" },
  { value: "3×", label: "More online leads" },
  { value: "7 days", label: "Website delivery" },
];

const values = [
  {
    icon: MapPin,
    title: "Rooted in Hisar",
    body: "We're based in Hisar, Haryana — and we work shoulder-to-shoulder with local restaurants, clinics, salons, and service providers who power their communities.",
  },
  {
    icon: Sparkles,
    title: "One connected system",
    body: "We don't sell disconnected tools. Website, SEO, AI workflows, and social — all wired together like nodes in a signal network, so growth compounds.",
  },
  {
    icon: Target,
    title: "Real numbers, not vanity",
    body: "We measure what matters: bookings, calls, walk-ins, hours saved. Every engagement starts with a free audit and ends with results you can count.",
  },
  {
    icon: Users,
    title: "Built for local",
    body: "Big-agency thinking, local-business pricing. Fast delivery, direct WhatsApp access, and a partnership that treats your business like our own.",
  },
];

function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        {/* Hero */}
        <section className="bg-hero noise-overlay relative overflow-hidden pb-20 pt-36 md:pb-28 md:pt-44">
          <div className="grid-bg pointer-events-none absolute inset-0 opacity-40" />
          <div className="relative mx-auto max-w-5xl px-6 md:px-10">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-red-brand" />
              <span className="eyebrow">About CoreSoft</span>
            </div>
            <h1 className="font-display text-5xl font-bold leading-[1.05] md:text-7xl">
              A digital agency built to help{" "}
              <span className="text-grad-red">local businesses rise.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg text-text-mid md:text-xl">
              CoreSoft Solutions is a digital agency based in{" "}
              <span className="text-foreground">Hisar, Haryana</span>. We help
              local businesses — restaurants, clinics, salons, and service
              providers — grow online through websites, SEO, AI automation, and
              social media.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="border-y border-border bg-background py-16">
          <div className="mx-auto max-w-7xl px-6 md:px-10">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label}>
                  <div className="font-display text-grad-red text-4xl font-bold md:text-5xl">
                    {s.value}
                  </div>
                  <div className="font-mono-brand mt-2 text-xs uppercase tracking-[0.15em] text-text-dim">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-24 md:py-32">
          <div className="mx-auto grid max-w-7xl gap-16 px-6 md:px-10 lg:grid-cols-[1fr_1.3fr]">
            <div>
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-8 bg-red-brand" />
                <span className="eyebrow">Our Story</span>
              </div>
              <h2 className="font-display text-4xl font-bold leading-[1.05] md:text-5xl">
                Smarter systems for the businesses that{" "}
                <span className="text-grad-red">power our city.</span>
              </h2>
            </div>
            <div className="space-y-6 text-base text-text-mid md:text-lg">
              <p>
                We started CoreSoft because we kept seeing the same story play
                out across Hisar: brilliant local businesses doing everything
                manually, losing 15 hours a week to repetitive tasks, and
                staying invisible to the customers searching for them online.
              </p>
              <p>
                Meanwhile, their competitors — the ones investing in proper
                websites, SEO, and AI automation — were quietly capturing all
                the new demand.
              </p>
              <p>
                So we built CoreSoft as a single connected system: a fast,
                mobile-first website, local SEO that ranks, AI agents that
                handle WhatsApp and bookings 24/7, and social content that
                keeps you top of mind. Three nodes. One network. Built for
                local businesses ready to grow.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="border-t border-border bg-card/30 py-24 md:py-32">
          <div className="mx-auto max-w-7xl px-6 md:px-10">
            <div className="mb-14 max-w-2xl">
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-8 bg-red-brand" />
                <span className="eyebrow">What we stand for</span>
              </div>
              <h2 className="font-display text-4xl font-bold leading-[1.05] md:text-5xl">
                How we work with{" "}
                <span className="text-grad-red">local businesses.</span>
              </h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {values.map((v) => (
                <div
                  key={v.title}
                  className="shadow-card-soft rounded-3xl border border-border bg-card p-8 md:p-10"
                >
                  <div className="bg-grad-navy mb-5 flex h-12 w-12 items-center justify-center rounded-xl">
                    <v.icon className="h-5 w-5 text-light-blue" />
                  </div>
                  <h3 className="font-display text-2xl font-bold">{v.title}</h3>
                  <p className="mt-3 text-base text-text-mid">{v.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-hero noise-overlay relative overflow-hidden py-24 md:py-28">
          <div className="relative mx-auto max-w-4xl px-6 text-center md:px-10">
            <h2 className="font-display text-4xl font-bold leading-[1.05] md:text-6xl">
              Let's grow your business{" "}
              <span className="text-grad-red">together.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base text-text-mid md:text-lg">
              Book a free 30-minute Growth Audit. We'll review your current
              digital presence and show you exactly where you're leaving money
              on the table — and how to fix it.
            </p>
            <Link
              to="/"
              hash="contact"
              className="bg-grad-red shadow-red-glow mt-10 inline-flex rounded-full px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.15em] text-white transition-transform hover:scale-105"
            >
              Book a Free Audit
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <Toaster
        theme="dark"
        position="bottom-right"
        toastOptions={{
          style: {
            background: "oklch(0.22 0.05 260)",
            border: "1px solid oklch(0.85 0.08 240 / 0.15)",
            color: "white",
          },
        }}
      />
    </div>
  );
}
