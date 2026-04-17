import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-12 md:px-10">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-text-dim">
              AI &amp; digital growth systems for ambitious local businesses.
            </p>
          </div>
          <div className="font-mono-brand grid grid-cols-2 gap-x-12 gap-y-2 text-xs text-text-dim md:grid-cols-3">
            <a href="#problem" className="hover:text-foreground">
              Problem
            </a>
            <a href="#framework" className="hover:text-foreground">
              Framework
            </a>
            <a href="#pillars" className="hover:text-foreground">
              Pillars
            </a>
            <a href="#industries" className="hover:text-foreground">
              Industries
            </a>
            <a href="#contact" className="hover:text-foreground">
              Contact
            </a>
          </div>
        </div>
        <div className="font-mono-brand mt-12 flex flex-col gap-2 border-t border-border pt-6 text-xs text-text-dim md:flex-row md:items-center md:justify-between">
          <span>© {new Date().getFullYear()} CoreSoft Solutions. All rights reserved.</span>
          <span>Built to help you rise.</span>
        </div>
      </div>
    </footer>
  );
}
