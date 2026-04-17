import { useEffect, useState } from "react";
import { Logo } from "./Logo";

const links = [
  { href: "#problem", label: "Problem" },
  { href: "#framework", label: "Framework" },
  { href: "#pillars", label: "Pillars" },
  { href: "#industries", label: "Industries" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-border bg-background/85 backdrop-blur-xl"
          : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 md:px-10">
        <Logo />
        <div className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-xs font-medium uppercase tracking-[0.15em] text-text-dim transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
        </div>
        <a
          href="#contact"
          className="bg-grad-red shadow-red-glow rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-white transition-transform hover:scale-105"
        >
          Book a Call
        </a>
      </div>
    </nav>
  );
}
