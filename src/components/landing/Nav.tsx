import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";

type NavLink = { label: string } & (
  | { to: "/"; hash?: string; href?: never }
  | { to: "/about"; hash?: never; href?: never }
  | { to: "/discovery"; hash?: never; href?: never }
);

const links: NavLink[] = [
  { to: "/", hash: "problem", label: "Problem" },
  { to: "/", hash: "framework", label: "Framework" },
  { to: "/", hash: "pillars", label: "Pillars" },
  { to: "/", hash: "industries", label: "Industries" },
  { to: "/about", label: "About" },
  { to: "/discovery", label: "Discovery" },
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
        <Link to="/">
          <Logo />
        </Link>
        <div className="hidden items-center gap-9 md:flex">
          {links.map((l) => (
            <Link
              key={`${l.to}${l.hash ?? ""}-${l.label}`}
              to={l.to}
              hash={l.hash}
              className="text-xs font-medium uppercase tracking-[0.15em] text-text-dim transition-colors hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </div>
        <Link
          to="/discovery"
          className="bg-grad-red shadow-red-glow rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-white transition-transform hover:scale-105"
        >
          Get Free Audit
        </Link>
      </div>
    </nav>
  );
}
