import { Section } from "./Section";
import { EyeOff, Megaphone, ShieldAlert, Zap } from "lucide-react";

const problems = [
  {
    icon: EyeOff,
    title: "Invisible Online",
    body: "Your competitors show up first. You show up nowhere. Local search is a battlefield and most businesses aren't even in the fight.",
  },
  {
    icon: Megaphone,
    title: "Ad Spend Bleeds",
    body: "Boosted posts, random campaigns, no system. Budgets vanish without a single qualified lead to show for it.",
  },
  {
    icon: ShieldAlert,
    title: "Trust Gap",
    body: "Modern customers research before they buy. Without proof, presence, and polish — they pick someone else.",
  },
  {
    icon: Zap,
    title: "Manual Everything",
    body: "Replies, follow-ups, bookings — done by hand. Hours lost daily that AI could automate before lunch.",
  },
];

export function Problems() {
  return (
    <Section
      id="problem"
      eyebrow="The Reality"
      title={
        <>
          Local growth is{" "}
          <span className="text-grad-red">harder than ever</span>
        </>
      }
      intro="Four reasons most local businesses are stuck — and exactly what we fix."
    >
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        {problems.map((p, i) => (
          <div
            key={p.title}
            className="shadow-card-soft group relative overflow-hidden rounded-2xl border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-red-brand/40"
          >
            <div className="font-mono-brand mb-6 text-xs text-text-dim">
              0{i + 1}
            </div>
            <div className="bg-grad-navy mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl">
              <p.icon className="h-5 w-5 text-light-blue" />
            </div>
            <h3 className="font-display mb-3 text-xl font-bold">{p.title}</h3>
            <p className="text-sm text-text-mid">{p.body}</p>
            <div className="bg-grad-red absolute inset-x-0 bottom-0 h-px scale-x-0 transition-transform duration-500 group-hover:scale-x-100" />
          </div>
        ))}
      </div>
    </Section>
  );
}
