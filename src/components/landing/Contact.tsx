import { ContactForm } from "./ContactForm";
import { Mail, MapPin, Phone } from "lucide-react";

export function Contact() {
  return (
    <section
      id="contact"
      className="bg-hero noise-overlay relative overflow-hidden py-24 md:py-32"
    >
      <div className="pointer-events-none absolute -left-32 top-1/2 h-[400px] w-[400px] -translate-y-1/2 rounded-full border-[60px] border-red-brand/[0.05]" />
      <div className="relative mx-auto max-w-7xl px-6 md:px-10">
        <div className="grid gap-16 lg:grid-cols-2">
          <div>
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-red-brand" />
              <span className="eyebrow">Let's Talk</span>
            </div>
            <h2 className="font-display text-4xl font-bold leading-[1.05] md:text-6xl">
              Ready to <span className="text-grad-red">scale?</span>
            </h2>
            <p className="mt-6 max-w-md text-base text-text-mid md:text-lg">
              Tell us about your business. We'll send back a free 15-minute
              audit and a clear path forward — no fluff, no commitment.
            </p>

            <div className="mt-10 space-y-5 border-t border-border pt-8">
              {[
                { icon: Mail, label: "hello@coresoft.solutions" },
                { icon: Phone, label: "+91 00000 00000" },
                { icon: MapPin, label: "Remote · Worldwide" },
              ].map((c) => (
                <div key={c.label} className="flex items-center gap-4">
                  <div className="bg-grad-navy flex h-10 w-10 items-center justify-center rounded-xl">
                    <c.icon className="h-4 w-4 text-light-blue" />
                  </div>
                  <span className="text-sm text-text-mid">{c.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="shadow-card-soft rounded-3xl border border-border bg-card p-8 md:p-10">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
