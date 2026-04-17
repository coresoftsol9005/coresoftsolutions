import { Section } from "./Section";
import { Bot, Magnet, Rocket } from "lucide-react";

const pillars = [
  {
    icon: Bot,
    code: "P/01",
    name: "AI Automation",
    tagline: "Your team — multiplied.",
    body: "Custom GPT assistants, WhatsApp bots, booking flows, and inbox automation that handle the busy-work 24/7 so you can focus on the business.",
    bullets: [
      "AI receptionists & lead qualifiers",
      "WhatsApp & Instagram autoresponders",
      "Workflow automation across tools",
    ],
  },
  {
    icon: Magnet,
    code: "P/02",
    name: "Lead Engine",
    tagline: "Predictable pipeline.",
    body: "Performance-driven Meta + Google Ads, landing pages, CRM wiring, and follow-up sequences that turn clicks into booked appointments.",
    bullets: [
      "Conversion-optimised landing pages",
      "Paid acquisition (Meta, Google, YouTube)",
      "CRM & nurture automations",
    ],
  },
  {
    icon: Rocket,
    code: "P/03",
    name: "Digital Presence",
    tagline: "The brand they trust.",
    body: "Websites, SEO, social content, and reputation systems that make you the obvious choice in your city — not just an option.",
    bullets: [
      "Premium websites & funnels",
      "Local SEO & Google Business",
      "Content & reputation engine",
    ],
  },
];

export function Pillars() {
  return (
    <Section
      id="pillars"
      eyebrow="Our Approach"
      title={
        <>
          The CoreSoft <span className="text-grad-red">Pillars</span>
        </>
      }
      intro="Three integrated systems. One outcome — measurable, compounding growth."
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {pillars.map((p) => (
          <div
            key={p.name}
            className="shadow-card-soft group relative overflow-hidden rounded-3xl border border-border bg-card p-8 transition-all duration-500 hover:-translate-y-2 hover:border-red-brand/40 md:p-10"
          >
            <div className="bg-grad-red absolute right-0 top-0 h-24 w-24 -translate-y-12 translate-x-12 rounded-full opacity-20 blur-2xl transition-opacity duration-500 group-hover:opacity-40" />

            <div className="font-mono-brand mb-8 flex items-center justify-between text-xs text-text-dim">
              <span>{p.code}</span>
              <span>CORESOFT/PILLAR</span>
            </div>

            <div className="bg-grad-navy mb-8 inline-flex h-14 w-14 items-center justify-center rounded-2xl">
              <p.icon className="h-6 w-6 text-light-blue" />
            </div>

            <h3 className="font-display text-3xl font-bold leading-tight">
              {p.name}
            </h3>
            <p className="mt-2 text-sm text-light-blue">{p.tagline}</p>

            <p className="mt-5 text-sm text-text-mid">{p.body}</p>

            <ul className="mt-7 space-y-3 border-t border-border pt-6">
              {p.bullets.map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-3 text-sm text-text-mid"
                >
                  <span className="bg-grad-red mt-2 h-1 w-4 flex-shrink-0 rounded-full" />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
