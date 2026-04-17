import { Section } from "./Section";

const steps = [
  {
    n: "01",
    title: "Audit",
    body: "We map your funnel, audience, and competitors. Find the leaks before we pour fuel in.",
  },
  {
    n: "02",
    title: "Build",
    body: "Site, AI assistants, lead system, content engine — set up once, optimised forever.",
  },
  {
    n: "03",
    title: "Launch",
    body: "Paid + organic activation across the channels your customers actually use.",
  },
  {
    n: "04",
    title: "Scale",
    body: "Weekly iteration on data. Double down on what works, kill what doesn't.",
  },
];

export function Framework() {
  return (
    <Section
      id="framework"
      eyebrow="The Framework"
      title={
        <>
          From invisible to <span className="text-grad-red">in-demand</span>
        </>
      }
      intro="A four-stage system refined across 120+ engagements."
    >
      <div className="relative">
        <div className="absolute left-0 right-0 top-12 hidden h-px bg-gradient-to-r from-transparent via-light-blue/30 to-transparent lg:block" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div key={s.n} className="relative">
              <div className="bg-grad-red shadow-red-glow font-display relative z-10 flex h-24 w-24 items-center justify-center rounded-full text-2xl font-extrabold text-white">
                {s.n}
              </div>
              <h3 className="font-display mt-7 text-2xl font-bold">
                {s.title}
              </h3>
              <p className="mt-3 max-w-xs text-sm text-text-mid">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
