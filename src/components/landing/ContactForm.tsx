import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { ArrowRight, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  company: z.string().trim().max(100).optional().or(z.literal("")),
  message: z.string().trim().min(10, "Tell us a bit more (10+ chars)").max(2000),
});

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    const fd = new FormData(e.currentTarget);
    const raw = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      company: String(fd.get("company") ?? ""),
      message: String(fd.get("message") ?? ""),
    };
    const parsed = schema.safeParse(raw);
    if (!parsed.success) {
      const eMap: Record<string, string> = {};
      parsed.error.issues.forEach((i) => {
        eMap[String(i.path[0])] = i.message;
      });
      setErrors(eMap);
      return;
    }

    setLoading(true);
    const { error } = await supabase.from("contact_submissions").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      company: parsed.data.company || null,
      message: parsed.data.message,
    });
    setLoading(false);

    if (error) {
      toast.error("Something went wrong. Please try again.");
      return;
    }
    toast.success("Got it — we'll be in touch within 24 hours.");
    (e.target as HTMLFormElement).reset();
  }

  const inputCls =
    "w-full rounded-xl border border-border bg-background/60 px-4 py-3.5 text-sm text-foreground placeholder:text-text-dim transition-colors focus:border-red-brand focus:outline-none focus:ring-2 focus:ring-red-brand/30";

  return (
    <form onSubmit={handleSubmit} className="grid gap-5">
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-xs uppercase tracking-[0.15em] text-text-dim">
            Name
          </label>
          <input name="name" type="text" className={inputCls} placeholder="Jane Doe" />
          {errors.name && (
            <p className="mt-1.5 text-xs text-red-brand">{errors.name}</p>
          )}
        </div>
        <div>
          <label className="mb-2 block text-xs uppercase tracking-[0.15em] text-text-dim">
            Email
          </label>
          <input
            name="email"
            type="email"
            className={inputCls}
            placeholder="you@company.com"
          />
          {errors.email && (
            <p className="mt-1.5 text-xs text-red-brand">{errors.email}</p>
          )}
        </div>
      </div>
      <div>
        <label className="mb-2 block text-xs uppercase tracking-[0.15em] text-text-dim">
          Company <span className="text-text-dim/60">(optional)</span>
        </label>
        <input
          name="company"
          type="text"
          className={inputCls}
          placeholder="CoreSoft Solutions"
        />
      </div>
      <div>
        <label className="mb-2 block text-xs uppercase tracking-[0.15em] text-text-dim">
          What do you need help with?
        </label>
        <textarea
          name="message"
          rows={5}
          className={inputCls}
          placeholder="Tell us about your business, goals, and timeline…"
        />
        {errors.message && (
          <p className="mt-1.5 text-xs text-red-brand">{errors.message}</p>
        )}
      </div>
      <button
        type="submit"
        disabled={loading}
        className="bg-grad-red shadow-red-glow group mt-2 inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-semibold uppercase tracking-[0.15em] text-white transition-transform hover:scale-[1.02] disabled:opacity-60"
      >
        {loading ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Sending…
          </>
        ) : (
          <>
            Send Message
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </>
        )}
      </button>
    </form>
  );
}
