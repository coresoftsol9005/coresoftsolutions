import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/landing/Nav";
import { Footer } from "@/components/landing/Footer";
import { DiscoveryForm } from "@/components/landing/DiscoveryForm";

export const Route = createFileRoute("/discovery")({
  head: () => ({
    meta: [
      { title: "Client Discovery — CoreSoft Solutions" },
      {
        name: "description",
        content:
          "Tell us about your business in 8 quick steps. We'll WhatsApp you a free audit and a clear digital growth plan within 30 minutes.",
      },
      { property: "og:title", content: "Client Discovery — CoreSoft Solutions" },
      {
        property: "og:description",
        content:
          "Hisar-based digital agency for restaurants, clinics, salons & service businesses. Share your details — get a free audit in 30 minutes.",
      },
    ],
  }),
  component: DiscoveryPage,
});

function DiscoveryPage() {
  return (
    <div className="min-h-screen bg-background">
      <Nav />
      <main className="bg-hero noise-overlay relative overflow-hidden px-6 pb-24 pt-32 md:px-10 md:pt-40">
        <div className="pointer-events-none absolute -right-32 top-20 h-[400px] w-[400px] rounded-full border-[60px] border-red-brand/[0.05]" />
        <div className="relative mx-auto max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-3">
            <span className="h-px w-8 bg-red-brand" />
            <span className="eyebrow">Client Discovery</span>
            <span className="h-px w-8 bg-red-brand" />
          </div>
          <h1 className="font-display text-4xl font-extrabold leading-[1.05] md:text-5xl">
            Let's understand <span className="text-grad-red">your business.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base text-text-mid">
            8 quick questions. Takes 2 minutes. We'll review your details and
            reply on WhatsApp with a free audit within 30 minutes.
          </p>
        </div>
        <div className="relative mt-12">
          <DiscoveryForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
