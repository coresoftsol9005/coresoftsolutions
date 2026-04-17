import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { Nav } from "@/components/landing/Nav";
import { Hero } from "@/components/landing/Hero";
import { Problems } from "@/components/landing/Problems";
import { Framework } from "@/components/landing/Framework";
import { Pillars } from "@/components/landing/Pillars";
import { Industries } from "@/components/landing/Industries";
import { Contact } from "@/components/landing/Contact";
import { Footer } from "@/components/landing/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title:
          "CoreSoft Solutions — AI & Digital Growth for Local Businesses",
      },
      {
        name: "description",
        content:
          "AI automation, lead engines, and digital presence built for clinics, cafés, real-estate, and D2C brands ready to scale.",
      },
      {
        property: "og:title",
        content: "CoreSoft Solutions — AI & Digital Growth Studio",
      },
      {
        property: "og:description",
        content:
          "We help local businesses scale through AI, lead generation, and a brand that demands attention.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <Hero />
        <Problems />
        <Framework />
        <Pillars />
        <Industries />
        <Contact />
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
