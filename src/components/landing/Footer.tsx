import { Logo } from "./Logo";
import { Mail, MessageCircle } from "lucide-react";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-background overflow-hidden">
      <div className="glow-orb glow-orb-red left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 -translate-y-1/2 opacity-10" />
      <div className="relative mx-auto max-w-7xl px-6 py-14 md:px-10">
        <div className="flex flex-col items-start justify-between gap-10 md:flex-row md:items-start">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-sm text-text-dim">
              AI &amp; digital growth systems for ambitious local businesses.
              Based in Hisar, Haryana.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href="https://www.instagram.com/coresoft.digital"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-text-dim transition-all hover:scale-110 hover:border-red-brand hover:text-foreground"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a
                href="https://wa.me/918168194134"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-text-dim transition-all hover:scale-110 hover:border-[#25D366] hover:text-[#25D366]"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
              <a
                href="mailto:rkentra9005@gmail.com"
                aria-label="Email"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-text-dim transition-all hover:scale-110 hover:border-red-brand hover:text-foreground"
              >
                <Mail className="h-4 w-4" />
              </a>
            </div>
          </div>
          <div className="font-mono-brand grid grid-cols-2 gap-x-12 gap-y-2 text-xs text-text-dim md:grid-cols-3">
            <a href="/#problem" className="hover:text-foreground">Problem</a>
            <a href="/#framework" className="hover:text-foreground">Framework</a>
            <a href="/#pillars" className="hover:text-foreground">Pillars</a>
            <a href="/#industries" className="hover:text-foreground">Industries</a>
            <a href="/about" className="hover:text-foreground">About</a>
            <a href="/discovery" className="hover:text-foreground">Discovery</a>
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
