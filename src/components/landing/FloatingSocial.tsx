import { Instagram } from "lucide-react";
import { useEffect, useState } from "react";

/**
 * Floating social action buttons (bottom-right).
 * Always visible, smooth hover & subtle pulse on WhatsApp.
 */
export function FloatingSocial() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div
      className={`fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3 transition-all duration-700 md:bottom-8 md:right-8 ${
        mounted ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
      }`}
    >
      <a
        href="https://www.instagram.com/coresoft.digital"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Follow CoreSoft on Instagram"
        className="group relative flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card/90 text-foreground shadow-card-soft backdrop-blur-md transition-all hover:scale-110 hover:border-red-brand/60 md:h-14 md:w-14"
      >
        <span className="absolute inset-0 -z-10 rounded-full bg-gradient-to-br from-pink-500 via-red-brand to-yellow-500 opacity-0 blur-md transition-opacity group-hover:opacity-70" />
        <Instagram className="h-5 w-5 md:h-6 md:w-6" strokeWidth={2} />
        <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-md bg-card px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-foreground opacity-0 shadow-card-soft transition-opacity group-hover:opacity-100">
          Instagram
        </span>
      </a>

      <a
        href="https://wa.me/918168194134?text=Hi%20CoreSoft%2C%20I%27d%20like%20to%20chat%20about%20a%20project."
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with CoreSoft on WhatsApp"
        className="group relative flex h-14 w-14 items-center justify-center rounded-full text-white shadow-[0_10px_40px_-5px_rgba(37,211,102,0.5)] transition-all hover:scale-110 md:h-16 md:w-16"
        style={{ background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)" }}
      >
        <span className="pulse-ring absolute inset-0 rounded-full" />
        {/* WhatsApp logo */}
        <svg viewBox="0 0 24 24" className="relative h-7 w-7 md:h-8 md:w-8" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.464 3.488" />
        </svg>
        <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-md bg-card px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.15em] text-foreground opacity-0 shadow-card-soft transition-opacity group-hover:opacity-100">
          WhatsApp Us
        </span>
      </a>
    </div>
  );
}
