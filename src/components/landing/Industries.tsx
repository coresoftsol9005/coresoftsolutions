import { Section } from "./Section";
import { Utensils, Stethoscope, Home, Coffee, Sparkles, Wrench } from "lucide-react";

const industries = [
  { name: "D2C Brands", code: "I/01", icon: Sparkles },
  { name: "Clinics & Healthcare", code: "I/02", icon: Stethoscope },
  { name: "Real Estate", code: "I/03", icon: Home },
  { name: "Cafés & Hospitality", code: "I/04", icon: Coffee },
  { name: "Restaurants", code: "I/05", icon: Utensils },
  { name: "Local Services", code: "I/06", icon: Wrench },
];

export function Industries() {
  return (
    <Section
      id="industries"
      eyebrow="Industries"
      title={
        <>
          Built for businesses{" "}
          <span className="text-grad-red">that serve people</span>
        </>
      }
      intro="If your customers are local, our system is sharper than anything generic."
    >
      <div className="relative">
        <div className="glow-orb glow-orb-navy left-[10%] top-[20%] h-[300px] w-[300px] opacity-25" />
        <div className="glow-orb glow-orb-red right-[5%] bottom-[10%] h-[260px] w-[260px] opacity-20" />

        <div className="relative grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3">
          {industries.map((i) => (
            <div
              key={i.name}
              className="group relative overflow-hidden bg-card p-8 transition-all duration-500 hover:bg-navy/30 md:p-10"
            >
              {/* Hover gradient sweep */}
              <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-red-brand/10 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

              <div className="font-mono-brand mb-4 flex items-center justify-between text-xs text-text-dim">
                <span>{i.code}</span>
                <i.icon className="h-4 w-4 text-light-blue/50 transition-all duration-500 group-hover:text-red-brand group-hover:scale-110" />
              </div>
              <div className="font-display text-2xl font-bold leading-tight md:text-3xl">
                {i.name}
              </div>
              <div className="bg-grad-red mt-6 h-px w-10 transition-all duration-500 group-hover:w-24" />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
