import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import { LogOut, Mail, Building2, Loader2, ArrowLeft, ShieldAlert } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin — Contact Submissions | CoreSoft Solutions" },
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

function AdminPage() {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userEmail, setUserEmail] = useState<string>("");
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(false);

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
        const { data, error } = await supabase
          .from("contact_submissions")
          .select("*")
          .order("created_at", { ascending: false });
        if (error) toast.error("Failed to load submissions");
        setSubmissions((data as Submission[]) ?? []);
        setLoading(false);
      }
    })();

    return () => {
      active = false;
      sub.subscription.unsubscribe();
    };
  }, [navigate]);

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
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-text-dim transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> Site
            </Link>
            <span className="h-4 w-px bg-border" />
            <h1 className="font-display text-base font-bold tracking-tight">Submissions</h1>
            <span className="rounded-full border border-border px-2.5 py-0.5 text-[10px] uppercase tracking-[0.15em] text-text-dim">
              {submissions.length}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-xs text-text-dim sm:inline">{userEmail}</span>
            <button
              onClick={handleSignOut}
              className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs font-semibold uppercase tracking-[0.15em] text-foreground transition-colors hover:bg-muted"
            >
              <LogOut className="h-3.5 w-3.5" /> Sign out
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-10">
        {loading ? (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="h-6 w-6 animate-spin text-text-dim" />
          </div>
        ) : submissions.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-border p-16 text-center">
            <Mail className="mx-auto h-8 w-8 text-text-dim" />
            <p className="mt-4 text-sm text-text-dim">No submissions yet.</p>
          </div>
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
                      <a
                        href={`mailto:${s.email}`}
                        className="inline-flex items-center gap-1.5 hover:text-foreground"
                      >
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
