import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { Toaster, toast } from "sonner";
import {
  LogOut,
  Mail,
  Building2,
  Loader2,
  ArrowLeft,
  ShieldAlert,
  Users,
  Phone,
  MapPin,
  Wallet,
  Briefcase,
  Inbox,
  Bell,
  BellOff,
  ExternalLink,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — CoreSoft Solutions" },
      { name: "description", content: "Internal admin dashboard for CoreSoft Solutions." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminPage,
});

type Submission = {
  id: string;
  name: string;
  email: string;
  company: string | null;
  message: string;
  created_at: string;
};

type Lead = {
  id: string;
  business_name: string;
  owner_name: string;
  category: string;
  city: string;
  phone: string;
  whatsapp: string | null;
  email: string;
  services: string[];
  main_goal: string | null;
  budget: string | null;
  heard_from: string | null;
  notes: string | null;
  created_at: string;
};

type Tab = "leads" | "contacts";

function AdminPage() {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userEmail, setUserEmail] = useState<string>("");
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<Tab>("leads");
  const [newCount, setNewCount] = useState(0); // unseen leads since last view
  const [soundOn, setSoundOn] = useState(true);
  const tabRef = useRef<Tab>("leads");
  const soundRef = useRef(true);

  useEffect(() => {
    tabRef.current = tab;
    if (tab === "leads") setNewCount(0);
  }, [tab]);
  useEffect(() => {
    soundRef.current = soundOn;
  }, [soundOn]);

  useEffect(() => {
    let active = true;

    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!session) navigate({ to: "/auth" });
    });

    (async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      const session = sessionData.session;
      if (!session) {
        navigate({ to: "/auth" });
        return;
      }
      if (!active) return;
      setUserEmail(session.user.email ?? "");

      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id);

      const admin = !!roles?.some((r) => r.role === "admin");
      setIsAdmin(admin);
      setChecking(false);

      if (admin) {
        setLoading(true);
        const [contactsRes, leadsRes] = await Promise.all([
          supabase.from("contact_submissions").select("*").order("created_at", { ascending: false }),
          supabase.from("lead_submissions").select("*").order("created_at", { ascending: false }),
        ]);
        if (contactsRes.error) toast.error("Failed to load contacts");
        if (leadsRes.error) toast.error("Failed to load leads");
        setSubmissions((contactsRes.data as Submission[]) ?? []);
        setLeads((leadsRes.data as Lead[]) ?? []);
        setLoading(false);
      }
    })();

    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, [navigate]);

  // Realtime subscription to new leads
  useEffect(() => {
    if (!isAdmin) return;
    const channel = supabase
      .channel("lead-submissions-admin")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "lead_submissions" },
        (payload) => {
          const newLead = payload.new as Lead;
          setLeads((prev) => [newLead, ...prev]);
          if (tabRef.current !== "leads") {
            setNewCount((c) => c + 1);
          }
          toast.success(`New lead: ${newLead.business_name}`, {
            description: `${newLead.owner_name} · ${newLead.city}`,
            action: {
              label: "View",
              onClick: () => setTab("leads"),
            },
          });
          if (soundRef.current) playChime();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [isAdmin]);

  async function handleSignOut() {
    await supabase.auth.signOut();
    navigate({ to: "/auth" });
  }

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
        <Loader2 className="h-6 w-6 animate-spin text-text-dim" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <div className="mx-auto flex min-h-screen max-w-md flex-col items-center justify-center px-6 text-center">
          <div className="rounded-full border border-red-brand/30 bg-red-brand/10 p-4">
            <ShieldAlert className="h-7 w-7 text-red-brand" />
          </div>
          <h1 className="mt-6 font-display text-2xl font-bold">Access Denied</h1>
          <p className="mt-2 text-sm text-text-dim">
            Signed in as <span className="text-foreground">{userEmail}</span>, but this account
            isn't an admin yet. Ask an existing admin to grant you the <code>admin</code> role.
          </p>
          <div className="mt-6 flex gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-foreground transition-colors hover:bg-muted"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Home
            </Link>
            <button
              onClick={handleSignOut}
              className="inline-flex items-center gap-2 rounded-full bg-muted px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.15em] text-foreground transition-colors hover:bg-muted/70"
            >
              <LogOut className="h-3.5 w-3.5" /> Sign out
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-10 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-text-dim transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Site
            </Link>
            <span className="h-4 w-px bg-border" />
            <h1 className="font-display text-base font-bold tracking-tight">Dashboard</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setSoundOn((s) => !s);
                toast(soundOn ? "Notification sound off" : "Notification sound on");
              }}
              aria-label="Toggle notification sound"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-border text-text-dim transition-colors hover:text-foreground"
            >
              {soundOn ? <Bell className="h-4 w-4" /> : <BellOff className="h-4 w-4" />}
            </button>
            <span className="hidden text-xs text-text-dim sm:inline">{userEmail}</span>
            <button
              onClick={handleSignOut}
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-foreground transition-colors hover:bg-muted"
            >
              <LogOut className="h-3.5 w-3.5" /> Sign out
            </button>
          </div>
        </div>
        {/* Tabs */}
        <div className="mx-auto flex max-w-7xl items-center gap-1 border-t border-border px-6">
          <TabButton
            active={tab === "leads"}
            onClick={() => setTab("leads")}
            label="Leads"
            count={leads.length}
            icon={<Users className="h-3.5 w-3.5" />}
            badge={newCount}
          />
          <TabButton
            active={tab === "contacts"}
            onClick={() => setTab("contacts")}
            label="Contacts"
            count={submissions.length}
            icon={<Inbox className="h-3.5 w-3.5" />}
          />
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        {/* Stats */}
        {tab === "leads" && (
          <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              label="Total leads"
              value={leads.length}
              hint="all time"
              accent="red"
            />
            <StatCard
              label="This week"
              value={leads.filter((l) => withinDays(l.created_at, 7)).length}
              hint="last 7 days"
            />
            <StatCard
              label="Today"
              value={leads.filter((l) => withinDays(l.created_at, 1)).length}
              hint="last 24h"
            />
            <StatCard
              label="High budget"
              value={leads.filter((l) => l.budget?.includes("₹50k") || l.budget?.includes("₹20k")).length}
              hint="₹20k+ / mo"
              accent="navy"
            />
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="h-6 w-6 animate-spin text-text-dim" />
          </div>
        ) : tab === "leads" ? (
          leads.length === 0 ? (
            <EmptyState icon={<Users className="h-8 w-8 text-text-dim" />} text="No leads yet — share your discovery form to start collecting." />
          ) : (
            <div className="grid gap-4">
              {leads.map((l) => (
                <LeadCard key={l.id} lead={l} />
              ))}
            </div>
          )
        ) : submissions.length === 0 ? (
          <EmptyState icon={<Inbox className="h-8 w-8 text-text-dim" />} text="No contact submissions yet." />
        ) : (
          <div className="grid gap-4">
            {submissions.map((s) => (
              <article
                key={s.id}
                className="rounded-2xl border border-border bg-background/40 p-6 transition-colors hover:border-red-brand/40"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="font-display text-lg font-bold">{s.name}</h2>
                    <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-text-dim">
                      <a href={`mailto:${s.email}`} className="inline-flex items-center gap-1.5 hover:text-foreground">
                        <Mail className="h-3 w-3" /> {s.email}
                      </a>
                      {s.company && (
                        <span className="inline-flex items-center gap-1.5">
                          <Building2 className="h-3 w-3" /> {s.company}
                        </span>
                      )}
                    </div>
                  </div>
                  <time className="font-mono text-[11px] uppercase tracking-wider text-text-dim">
                    {new Date(s.created_at).toLocaleString()}
                  </time>
                </div>
                <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-foreground/90">
                  {s.message}
                </p>
              </article>
            ))}
          </div>
        )}
      </main>

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

function TabButton({
  active,
  onClick,
  label,
  count,
  icon,
  badge,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count: number;
  icon: React.ReactNode;
  badge?: number;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative inline-flex items-center gap-2 px-4 py-3 text-xs font-semibold uppercase tracking-[0.15em] transition-colors ${
        active
          ? "text-foreground"
          : "text-text-dim hover:text-foreground"
      }`}
    >
      {icon}
      {label}
      <span className="rounded-full border border-border px-2 py-0.5 text-[10px] font-mono">
        {count}
      </span>
      {badge && badge > 0 ? (
        <span className="ml-1 inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-red-brand px-1.5 text-[10px] font-bold text-white animate-[pulse-dot_1.5s_infinite]">
          {badge}
        </span>
      ) : null}
      {active && <span className="absolute inset-x-3 bottom-0 h-0.5 rounded-t bg-grad-red" />}
    </button>
  );
}

function StatCard({
  label,
  value,
  hint,
  accent,
}: {
  label: string;
  value: number;
  hint: string;
  accent?: "red" | "navy";
}) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-border bg-card p-5">
      {accent === "red" && (
        <div className="absolute right-0 top-0 h-20 w-20 -translate-y-8 translate-x-8 rounded-full bg-red-brand/30 blur-2xl" />
      )}
      {accent === "navy" && (
        <div className="absolute right-0 top-0 h-20 w-20 -translate-y-8 translate-x-8 rounded-full bg-navy/40 blur-2xl" />
      )}
      <div className="relative">
        <div className="text-[10px] uppercase tracking-[0.18em] text-text-dim">{label}</div>
        <div className="mt-2 font-display text-3xl font-extrabold">{value}</div>
        <div className="mt-1 text-[11px] text-text-dim">{hint}</div>
      </div>
    </div>
  );
}

function EmptyState({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-border p-16 text-center">
      <div className="mx-auto inline-flex">{icon}</div>
      <p className="mt-4 text-sm text-text-dim">{text}</p>
    </div>
  );
}

function LeadCard({ lead }: { lead: Lead }) {
  const phoneClean = lead.whatsapp?.replace(/\D/g, "") || lead.phone.replace(/\D/g, "");
  const wa = `https://wa.me/${phoneClean}?text=Hi%20${encodeURIComponent(lead.owner_name)}%2C%20thanks%20for%20reaching%20out%20to%20CoreSoft.`;
  const isFresh = withinDays(lead.created_at, 1);

  return (
    <article className="group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-colors hover:border-red-brand/40">
      {isFresh && (
        <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-red-brand/15 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-red-brand">
          <span className="h-1.5 w-1.5 rounded-full bg-red-brand animate-[pulse-dot_1.5s_infinite]" />
          New
        </span>
      )}
      <div className="flex flex-wrap items-start justify-between gap-3 pr-20">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-display text-lg font-bold">{lead.business_name}</h2>
            <span className="rounded-md bg-navy/30 px-2 py-0.5 text-[10px] font-medium text-light-blue">
              {lead.category}
            </span>
          </div>
          <div className="mt-1 text-xs text-text-dim">
            {lead.owner_name} · <MapPin className="inline h-3 w-3" /> {lead.city}
          </div>
        </div>
        <time className="font-mono text-[11px] uppercase tracking-wider text-text-dim">
          {new Date(lead.created_at).toLocaleString()}
        </time>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <InfoChip icon={<Mail className="h-3.5 w-3.5" />} label="Email">
          <a href={`mailto:${lead.email}`} className="hover:text-foreground">{lead.email}</a>
        </InfoChip>
        <InfoChip icon={<Phone className="h-3.5 w-3.5" />} label="Phone">
          <a href={`tel:${lead.phone}`} className="hover:text-foreground">{lead.phone}</a>
        </InfoChip>
        <InfoChip icon={<Wallet className="h-3.5 w-3.5" />} label="Budget">
          {lead.budget ?? "—"}
        </InfoChip>
        <InfoChip icon={<Briefcase className="h-3.5 w-3.5" />} label="Source">
          {lead.heard_from ?? "—"}
        </InfoChip>
      </div>

      {lead.services.length > 0 && (
        <div className="mt-4">
          <div className="text-[10px] uppercase tracking-[0.15em] text-text-dim">Services</div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {lead.services.map((s) => (
              <span key={s} className="rounded-md border border-border bg-background/40 px-2 py-1 text-[11px]">
                {s}
              </span>
            ))}
          </div>
        </div>
      )}

      {lead.notes && (
        <details className="mt-4 group/details">
          <summary className="cursor-pointer text-xs uppercase tracking-[0.15em] text-text-dim transition-colors hover:text-foreground">
            Show notes
          </summary>
          <pre className="mt-3 whitespace-pre-wrap rounded-xl border border-border bg-background/40 p-4 text-xs leading-relaxed text-foreground/90">
            {lead.notes}
          </pre>
        </details>
      )}

      <div className="mt-5 flex flex-wrap gap-2 border-t border-border pt-4">
        <a
          href={wa}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-white transition-transform hover:scale-105"
          style={{ background: "linear-gradient(135deg, #25D366 0%, #128C7E 100%)" }}
        >
          WhatsApp
          <ExternalLink className="h-3 w-3" />
        </a>
        <a
          href={`mailto:${lead.email}`}
          className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-foreground transition-colors hover:bg-muted"
        >
          <Mail className="h-3 w-3" /> Email
        </a>
        <a
          href={`tel:${lead.phone}`}
          className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-foreground transition-colors hover:bg-muted"
        >
          <Phone className="h-3 w-3" /> Call
        </a>
      </div>
    </article>
  );
}

function InfoChip({
  icon,
  label,
  children,
}: {
  icon: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-border bg-background/40 px-3 py-2.5">
      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.15em] text-text-dim">
        {icon}
        {label}
      </div>
      <div className="mt-1 truncate text-xs text-foreground/90">{children}</div>
    </div>
  );
}

function withinDays(iso: string, days: number) {
  return Date.now() - new Date(iso).getTime() < days * 86400000;
}

// Pleasant ascending two-tone chime via Web Audio API
function playChime() {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const now = ctx.currentTime;
    const tones = [
      { f: 880, t: 0 },
      { f: 1320, t: 0.12 },
    ];
    tones.forEach(({ f, t }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = f;
      gain.gain.setValueAtTime(0, now + t);
      gain.gain.linearRampToValueAtTime(0.18, now + t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + t + 0.35);
      osc.connect(gain).connect(ctx.destination);
      osc.start(now + t);
      osc.stop(now + t + 0.4);
    });
    setTimeout(() => ctx.close(), 800);
  } catch {
    // Audio not allowed yet — silently ignore
  }
}
