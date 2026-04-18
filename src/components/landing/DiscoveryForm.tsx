import { useState } from "react";
import { z } from "zod";
import { toast } from "sonner";
import { ArrowRight, ArrowLeft, Check, Loader2, Layers } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

type FormData = {
  fname: string;
  lname: string;
  cc: string;
  acode: string;
  phone: string;
  whatsapp: string;
  email: string;
  city: string;
  bname: string;
  ig: string;
  fb: string;
  web: string;
  category: string;
  services: string[];
  about: string;
  challenge: string;
  budget: string;
  extra: string;
  source: string;
};

const initial: FormData = {
  fname: "",
  lname: "",
  cc: "+91",
  acode: "",
  phone: "",
  whatsapp: "",
  email: "",
  city: "",
  bname: "",
  ig: "",
  fb: "",
  web: "",
  category: "",
  services: [],
  about: "",
  challenge: "",
  budget: "",
  extra: "",
  source: "",
};

const categories = [
  { id: "restaurant", icon: "🍽️", label: "Restaurant / Café / Dhaba", sub: "Food, delivery, menu, orders" },
  { id: "salon", icon: "💅", label: "Salon / Spa / Beauty Parlour", sub: "Bookings, gallery, offers" },
  { id: "clinic", icon: "🏥", label: "Doctor / Clinic / Dentist", sub: "Appointments, trust, reviews" },
  { id: "service", icon: "🔧", label: "Service Business", sub: "Plumber, electrician, contractor etc." },
  { id: "retail", icon: "🛍️", label: "Retail / Shop / Boutique", sub: "Product listings, local discovery" },
  { id: "other", icon: "🏢", label: "Other Business", sub: "We cover all local businesses" },
];

const services = [
  { id: "website", label: "Website Design & Development", sub: "Professional site, mobile-friendly, fast" },
  { id: "seo", label: "Google SEO & Local Visibility", sub: "Rank higher on Google Maps & Search" },
  { id: "social", label: "Social Media Management", sub: "Instagram, Facebook — regular content" },
  { id: "gmb", label: "Google My Business Setup", sub: "Profile, reviews, photos, posts" },
  { id: "whatsapp", label: "WhatsApp Marketing & CRM", sub: "Automated campaigns, lead capture" },
  { id: "content", label: "Content & Graphic Design", sub: "Posts, banners, reels, videos" },
  { id: "ads", label: "Paid Ads (Google / Meta)", sub: "Run targeted local ads" },
  { id: "audit", label: "Digital Business Audit", sub: "Full review of your online presence" },
];

const budgets = [
  { id: "₹5k–₹10k/month", label: "₹5,000 – ₹10,000 / month", sub: "Starter — essentials only" },
  { id: "₹10k–₹20k/month", label: "₹10,000 – ₹20,000 / month", sub: "Growth — website + SEO + social" },
  { id: "₹20k–₹50k/month", label: "₹20,000 – ₹50,000 / month", sub: "Professional — full digital presence" },
  { id: "₹50k+/month", label: "₹50,000+ / month", sub: "Premium — aggressive growth & ads" },
  { id: "Not sure yet", label: "Not sure yet", sub: "Tell us your goal, we'll suggest a plan" },
];

const TOTAL = 8;

const inputCls =
  "w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm text-foreground placeholder:text-text-dim outline-none transition-colors focus:border-red-brand focus:ring-2 focus:ring-red-brand/30";
const labelCls =
  "mb-2 block text-[11px] uppercase tracking-[0.18em] text-text-dim font-semibold";

export function DiscoveryForm() {
  const [step, setStep] = useState(0); // 0 = welcome, 1..8 = steps, 9 = done
  const [data, setData] = useState<FormData>(initial);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function update<K extends keyof FormData>(k: K, v: FormData[K]) {
    setData((d) => ({ ...d, [k]: v }));
  }

  function toggleService(id: string) {
    setData((d) => ({
      ...d,
      services: d.services.includes(id)
        ? d.services.filter((s) => s !== id)
        : [...d.services, id],
    }));
  }

  function next() {
    setError("");
    setStep((s) => s + 1);
  }
  function prev() {
    setError("");
    setStep((s) => s - 1);
  }

  function validateAndNext() {
    if (step === 1) {
      if (!data.fname.trim() || !data.lname.trim()) {
        setError("Please enter your first and last name.");
        return;
      }
    }
    if (step === 2) {
      const ok = z.string().email().safeParse(data.email.trim()).success;
      if (!data.phone.trim() || !ok) {
        setError("Enter a valid WhatsApp number and email.");
        return;
      }
    }
    if (step === 3) {
      if (!data.bname.trim()) {
        setError("Please enter your business name.");
        return;
      }
    }
    if (step === 4 && !data.category) {
      setError("Please select your business type.");
      return;
    }
    if (step === 5 && data.services.length === 0) {
      setError("Please select at least one service.");
      return;
    }
    if (step === 6 && !data.about.trim()) {
      setError("Please describe your business briefly.");
      return;
    }
    if (step === 7 && !data.budget) {
      setError("Please select a budget range.");
      return;
    }
    next();
  }

  async function submit() {
    setError("");
    setSubmitting(true);
    const fullPhone = `${data.cc} ${data.acode} ${data.phone}`.replace(/\s+/g, " ").trim();
    const ownerName = `${data.fname} ${data.lname}`.trim();
    const catLabel = categories.find((c) => c.id === data.category)?.label ?? data.category;

    const notesParts = [
      data.about && `About: ${data.about}`,
      data.challenge && `Challenge: ${data.challenge}`,
      data.ig && `Instagram: ${data.ig}`,
      data.fb && `Facebook: ${data.fb}`,
      data.web && `Website: ${data.web}`,
      data.extra && `Notes: ${data.extra}`,
    ].filter(Boolean);

    const { error: insertError } = await supabase.from("lead_submissions").insert({
      business_name: data.bname.trim(),
      owner_name: ownerName || "—",
      category: catLabel,
      city: data.city.trim() || "—",
      phone: fullPhone,
      whatsapp: fullPhone,
      email: data.email.trim(),
      services: data.services,
      main_goal: data.challenge.trim() || null,
      budget: data.budget,
      heard_from: data.source || null,
      notes: notesParts.join("\n\n") || null,
    });

    setSubmitting(false);
    if (insertError) {
      toast.error("Couldn't submit. Please try again.");
      return;
    }
    toast.success("Got it! We'll WhatsApp you within 30 minutes.");
    setStep(9);
  }

  const progress = step === 0 ? 5 : step === 9 ? 100 : (step / TOTAL) * 100;

  return (
    <div className="mx-auto w-full max-w-2xl">
      {/* Progress */}
      <div className="mb-6 h-[3px] w-full overflow-hidden rounded-full bg-light-blue/15">
        <div
          className="h-full bg-grad-red transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="shadow-card-soft overflow-hidden rounded-3xl border border-border bg-card">
        <div className="h-1 bg-grad-red" />
        <div className="p-7 md:p-10">
          {step === 0 && (
            <div className="text-center">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border-2 border-red-brand bg-red-brand/10">
                <Layers className="h-6 w-6 text-red-brand" />
              </div>
              <div className="eyebrow mb-3 inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-red-brand" /> Client Discovery Form
              </div>
              <h2 className="font-display text-2xl font-extrabold leading-tight md:text-3xl">
                Apka Business,
                <br />
                <span className="text-grad-red">Hamaari Digital Expertise.</span>
              </h2>
              <p className="mx-auto mt-4 max-w-md text-sm text-text-mid">
                Tell us about your business in a few quick steps. We'll review your
                details and reply on WhatsApp within 30 minutes.
              </p>
              <div className="mx-auto mt-7 flex max-w-md items-center justify-around gap-3 border-y border-border py-5">
                {[
                  { v: "7 Din", l: "Delivery" },
                  { v: "30 Min", l: "Response" },
                  { v: "100%", l: "Transparent" },
                ].map((s) => (
                  <div key={s.l} className="text-center">
                    <div className="font-display text-lg font-extrabold text-red-brand">
                      {s.v}
                    </div>
                    <div className="mt-1 text-[10px] uppercase tracking-[0.15em] text-text-dim">
                      {s.l}
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={next}
                className="bg-grad-red shadow-red-glow group mt-7 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.15em] text-white transition-transform hover:scale-[1.03]"
              >
                Let's Get Started
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          )}

          {step >= 1 && step <= 8 && (
            <>
              <div className="eyebrow mb-4 inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-red-brand" /> Step {step} of {TOTAL}
              </div>

              {step === 1 && (
                <>
                  <h3 className="font-display text-xl font-extrabold leading-tight md:text-2xl">
                    Aapka naam kya hai?<span className="text-red-brand">*</span>
                  </h3>
                  <p className="mt-2 text-sm text-text-mid">Let's start with the basics — your full name.</p>
                  <div className="mt-6 grid gap-3 md:grid-cols-2">
                    <div>
                      <label className={labelCls}>First Name</label>
                      <input
                        className={inputCls}
                        placeholder="e.g. Rohit"
                        value={data.fname}
                        onChange={(e) => update("fname", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className={labelCls}>Last Name</label>
                      <input
                        className={inputCls}
                        placeholder="e.g. Kumar"
                        value={data.lname}
                        onChange={(e) => update("lname", e.target.value)}
                      />
                    </div>
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <h3 className="font-display text-xl font-extrabold leading-tight md:text-2xl">
                    Hum aapse kaise connect karein?<span className="text-red-brand">*</span>
                  </h3>
                  <p className="mt-2 text-sm text-text-mid">
                    Your WhatsApp number and email — we'll reach you within 30 minutes.
                  </p>
                  <div className="mt-6 grid gap-4">
                    <div>
                      <label className={labelCls}>WhatsApp / Phone</label>
                      <div className="grid grid-cols-[80px_80px_1fr] gap-2">
                        <input
                          className={inputCls}
                          value={data.cc}
                          onChange={(e) => update("cc", e.target.value)}
                        />
                        <input
                          className={inputCls}
                          placeholder="Area"
                          value={data.acode}
                          onChange={(e) => update("acode", e.target.value)}
                        />
                        <input
                          className={inputCls}
                          placeholder="81681 94XXX"
                          value={data.phone}
                          onChange={(e) => update("phone", e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <label className={labelCls}>Email Address</label>
                      <input
                        type="email"
                        className={inputCls}
                        placeholder="you@yourbusiness.com"
                        value={data.email}
                        onChange={(e) => update("email", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className={labelCls}>City / Location</label>
                      <input
                        className={inputCls}
                        placeholder="e.g. Hisar, Haryana"
                        value={data.city}
                        onChange={(e) => update("city", e.target.value)}
                      />
                    </div>
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <h3 className="font-display text-xl font-extrabold leading-tight md:text-2xl">
                    Aapke business ka naam kya hai?<span className="text-red-brand">*</span>
                  </h3>
                  <p className="mt-2 text-sm text-text-mid">
                    Tell us your brand name and social handles — so we can do a quick online audit before we speak.
                  </p>
                  <div className="mt-6 grid gap-4">
                    <div>
                      <label className={labelCls}>Business / Brand Name</label>
                      <input
                        className={inputCls}
                        placeholder="e.g. Sharma Restaurant, Riya Beauty Salon"
                        value={data.bname}
                        onChange={(e) => update("bname", e.target.value)}
                      />
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div>
                        <label className={labelCls}>Instagram Handle</label>
                        <input
                          className={inputCls}
                          placeholder="@yourbrand"
                          value={data.ig}
                          onChange={(e) => update("ig", e.target.value)}
                        />
                      </div>
                      <div>
                        <label className={labelCls}>Facebook Page</label>
                        <input
                          className={inputCls}
                          placeholder="facebook.com/yourbrand"
                          value={data.fb}
                          onChange={(e) => update("fb", e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <label className={labelCls}>Website (if any)</label>
                      <input
                        className={inputCls}
                        placeholder="https://yourbusiness.com"
                        value={data.web}
                        onChange={(e) => update("web", e.target.value)}
                      />
                    </div>
                  </div>
                </>
              )}

              {step === 4 && (
                <>
                  <h3 className="font-display text-xl font-extrabold leading-tight md:text-2xl">
                    Aapka business kis type ka hai?<span className="text-red-brand">*</span>
                  </h3>
                  <p className="mt-2 text-sm text-text-mid">
                    We specialise in specific verticals — select the one that fits best.
                  </p>
                  <div className="mt-6 grid gap-2.5">
                    {categories.map((c) => {
                      const sel = data.category === c.id;
                      return (
                        <button
                          key={c.id}
                          type="button"
                          onClick={() => update("category", c.id)}
                          className={`flex items-center gap-4 rounded-xl border px-4 py-3.5 text-left transition-all ${
                            sel
                              ? "border-red-brand bg-red-brand/10"
                              : "border-border bg-background/40 hover:border-light-blue/40"
                          }`}
                        >
                          <span className="text-xl">{c.icon}</span>
                          <div className="flex-1">
                            <div className="text-sm font-semibold text-foreground">{c.label}</div>
                            <div className="text-xs text-text-dim">{c.sub}</div>
                          </div>
                          <div
                            className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                              sel ? "border-red-brand bg-red-brand" : "border-border"
                            }`}
                          >
                            {sel && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </>
              )}

              {step === 5 && (
                <>
                  <h3 className="font-display text-xl font-extrabold leading-tight md:text-2xl">
                    Kaunsi services chahiye aapko?<span className="text-red-brand">*</span>
                  </h3>
                  <p className="mt-2 text-sm text-text-mid">
                    Select all that apply — we'll build a custom package for you.
                  </p>
                  <div className="mt-6 grid gap-2.5">
                    {services.map((s) => {
                      const sel = data.services.includes(s.id);
                      return (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => toggleService(s.id)}
                          className={`flex items-center gap-4 rounded-xl border px-4 py-3.5 text-left transition-all ${
                            sel
                              ? "border-red-brand bg-red-brand/10"
                              : "border-border bg-background/40 hover:border-light-blue/40"
                          }`}
                        >
                          <div className="flex-1">
                            <div className="text-sm font-semibold text-foreground">{s.label}</div>
                            <div className="text-xs text-text-dim">{s.sub}</div>
                          </div>
                          <div
                            className={`flex h-5 w-5 items-center justify-center rounded-md border-2 ${
                              sel ? "border-red-brand bg-red-brand" : "border-border"
                            }`}
                          >
                            {sel && <Check className="h-3 w-3 text-white" strokeWidth={3} />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </>
              )}

              {step === 6 && (
                <>
                  <h3 className="font-display text-xl font-extrabold leading-tight md:text-2xl">
                    Aapke business ke baare mein batayein<span className="text-red-brand">*</span>
                  </h3>
                  <p className="mt-2 text-sm text-text-mid">
                    Kya karte hain, kaun hai aapka customer, aur kya khaas hai aapke brand mein — 2-3 sentences mein likhein.
                  </p>
                  <div className="mt-6 grid gap-4">
                    <div>
                      <label className={labelCls}>About Your Business</label>
                      <textarea
                        rows={4}
                        className={inputCls}
                        placeholder="e.g. Hum ek family restaurant hain jo authentic Haryanvi food serve karte hain..."
                        value={data.about}
                        onChange={(e) => update("about", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className={labelCls}>Biggest Challenge Right Now</label>
                      <input
                        className={inputCls}
                        placeholder="e.g. No online presence, low footfall, no reviews on Google..."
                        value={data.challenge}
                        onChange={(e) => update("challenge", e.target.value)}
                      />
                    </div>
                  </div>
                </>
              )}

              {step === 7 && (
                <>
                  <h3 className="font-display text-xl font-extrabold leading-tight md:text-2xl">
                    Aapka monthly budget kitna hai?<span className="text-red-brand">*</span>
                  </h3>
                  <p className="mt-2 text-sm text-text-mid">
                    No judgment — this helps us suggest the right plan. All options get quality results.
                  </p>
                  <div className="mt-6 grid gap-2.5">
                    {budgets.map((b) => {
                      const sel = data.budget === b.id;
                      return (
                        <button
                          key={b.id}
                          type="button"
                          onClick={() => update("budget", b.id)}
                          className={`flex items-center gap-4 rounded-xl border px-4 py-3.5 text-left transition-all ${
                            sel
                              ? "border-red-brand bg-red-brand/10"
                              : "border-border bg-background/40 hover:border-light-blue/40"
                          }`}
                        >
                          <div className="flex-1">
                            <div className="text-sm font-semibold text-foreground">{b.label}</div>
                            <div className="text-xs text-text-dim">{b.sub}</div>
                          </div>
                          <div
                            className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                              sel ? "border-red-brand bg-red-brand" : "border-border"
                            }`}
                          >
                            {sel && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </>
              )}

              {step === 8 && (
                <>
                  <h3 className="font-display text-xl font-extrabold leading-tight md:text-2xl">
                    Kuch aur batana chahte hain?
                  </h3>
                  <p className="mt-2 text-sm text-text-mid">
                    Optional — any deadlines, special requirements, or questions.
                  </p>
                  <div className="mt-6 grid gap-4">
                    <div>
                      <label className={labelCls}>Additional Notes</label>
                      <textarea
                        rows={4}
                        className={inputCls}
                        placeholder="e.g. Hamare restaurant ka inauguration 15 May ko hai..."
                        value={data.extra}
                        onChange={(e) => update("extra", e.target.value)}
                      />
                    </div>
                    <div>
                      <label className={labelCls}>How Did You Hear About Us?</label>
                      <select
                        className={inputCls}
                        value={data.source}
                        onChange={(e) => update("source", e.target.value)}
                      >
                        <option value="">— Select —</option>
                        <option value="whatsapp">WhatsApp Message</option>
                        <option value="friend">Friend / Family Referral</option>
                        <option value="google">Google Search</option>
                        <option value="instagram">Instagram / Facebook</option>
                        <option value="justdial">JustDial / IndiaMART</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                </>
              )}

              {error && (
                <p className="mt-4 text-xs font-medium text-red-brand">{error}</p>
              )}

              <div className="mt-8 flex items-center justify-between border-t border-border pt-6">
                <button
                  type="button"
                  onClick={prev}
                  className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-text-mid transition-colors hover:border-light-blue/40 hover:text-foreground"
                >
                  <ArrowLeft className="h-3.5 w-3.5" /> Back
                </button>
                <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-text-dim">
                  {String(step).padStart(2, "0")} / {String(TOTAL).padStart(2, "0")}
                </span>
                {step < 8 ? (
                  <button
                    type="button"
                    onClick={validateAndNext}
                    className="bg-grad-red shadow-red-glow group inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-white transition-transform hover:scale-[1.03]"
                  >
                    Next <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={submit}
                    disabled={submitting}
                    className="bg-grad-red shadow-red-glow inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-white transition-transform hover:scale-[1.03] disabled:opacity-60"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-3.5 w-3.5 animate-spin" /> Sending…
                      </>
                    ) : (
                      <>
                        Submit <Check className="h-3.5 w-3.5" />
                      </>
                    )}
                  </button>
                )}
              </div>
            </>
          )}

          {step === 9 && (
            <div className="text-center">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full border-2 border-red-brand bg-red-brand/10">
                <Check className="h-6 w-6 text-red-brand" strokeWidth={3} />
              </div>
              <h3 className="font-display text-2xl font-extrabold leading-tight md:text-3xl">
                Thanks, {data.fname || "friend"}!
                <br />
                <span className="text-grad-red">We'll be in touch shortly.</span>
              </h3>
              <p className="mx-auto mt-4 max-w-md text-sm text-text-mid">
                Your discovery details are with us. Expect a WhatsApp message from
                CoreSoft within 30 minutes with a quick audit and next steps.
              </p>
              <a
                href="https://wa.me/918168194134?text=Hi%20CoreSoft%2C%20I%20just%20submitted%20the%20discovery%20form."
                target="_blank"
                rel="noreferrer"
                className="bg-grad-red shadow-red-glow mt-7 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.15em] text-white transition-transform hover:scale-[1.03]"
              >
                Message us on WhatsApp
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
