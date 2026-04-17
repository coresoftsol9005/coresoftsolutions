import { Section } from "./Section";

const industries = [
  { name: "D2C Brands", code: "I/01" },
  { name: "Clinics & Healthcare", code: "I/02" },
  { name: "Real Estate", code: "I/03" },
  { name: "Cafés & Hospitality", code: "I/04" },
  { name: "Coaches & Creators", code: "I/05" },
  { name: "Local Services", code: "I/06" },
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
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-3">
        {industries.map((i) => (
          <div
            key={i.name}
            className="group relative bg-card p-8 transition-colors duration-300 hover:bg-navy/30 md:p-10"
          >
            <div className="font-mono-brand mb-4 text-xs text-text-dim">
              {i.code}
            </div>
            <div className="font-display text-2xl font-bold leading-tight md:text-3xl">
              {i.name}
            </div>
            <div className="bg-grad-red mt-6 h-px w-10 transition-all duration-500 group-hover:w-20" />
          </div>
        ))}
      </div>
    </Section>
  );
}
