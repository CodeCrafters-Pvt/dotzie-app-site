import { createFileRoute, Link } from "@tanstack/react-router";
import {
  PlusCircle,
  Tags,
  PieChart,
  Download,
  ShieldCheck,
  Smartphone,
  ArrowRight,
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import dotzieLogo from "@/assets/dotzie-icon.png";

const TITLE = "User Guide — Dotzie";
const DESC =
  "Get started with Dotzie: install, add expenses, understand insights, and back up your encrypted data — all offline.";

export const Route = createFileRoute("/guide")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
    links: [{ rel: "canonical", href: "/guide" }],
  }),
  component: GuidePage,
});

const steps = [
  {
    icon: Smartphone,
    title: "1. Install Dotzie",
    desc: "Download from the App Store or Google Play. No account, no email — the app opens straight to your dashboard.",
  },
  {
    icon: PlusCircle,
    title: "2. Add your first expense",
    desc: "Tap the + button, enter the amount, pick a category, and save. Everything is written locally with AES-256-GCM.",
  },
  {
    icon: Tags,
    title: "3. Tag & categorize",
    desc: "Use tags for context (trip, gift, subscription). Categories are fully customizable and colour-coded.",
  },
  {
    icon: PieChart,
    title: "4. Explore Insights",
    desc: "The Insights tab shows a donut of your top categories and a weekly/monthly comparison — all rendered on-device.",
  },
  {
    icon: Download,
    title: "5. Back up safely",
    desc: "Settings → Backup exports a passphrase-encrypted file. Save it to iCloud, Drive, or a USB stick — Dotzie never sees it.",
  },
  {
    icon: ShieldCheck,
    title: "6. Restore on a new phone",
    desc: "On a new device, choose Restore, pick the backup file, enter your passphrase. That's it — no server, no login.",
  },
];

const faqs = [
  {
    q: "Do I need to create an account?",
    a: "No. Dotzie doesn't have accounts. Your device is the identity.",
  },
  {
    q: "What if I lose my phone?",
    a: "Restore from your latest encrypted backup on any new device. Without a backup and passphrase, data cannot be recovered — by design.",
  },
  {
    q: "Can I sync between devices?",
    a: "Not through Dotzie's servers (there aren't any). You can move an encrypted backup file manually between devices whenever you like.",
  },
];

function GuidePage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-4xl items-center justify-between px-6">
          <Link to="/" className="group inline-flex items-center gap-2.5">
            <span className="relative inline-flex h-8 w-8 items-center justify-center overflow-hidden rounded-[9px] shadow-sm transition-transform duration-300 group-hover:scale-105">
              <img src={dotzieLogo} alt="Dotzie logo" className="h-full w-full object-cover" />
            </span>
            <span className="font-display text-xl tracking-tight">
              Dotzie<span className="text-accent-500">.</span>
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              to="/"
              className="inline-flex h-9 items-center rounded-full border border-border bg-card px-4 text-sm font-medium transition-colors hover:border-accent-500/50"
            >
              Back home
            </Link>
          </div>
        </div>
      </header>

      <main className="relative overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute -top-24 left-1/2 h-[500px] w-[800px] -translate-x-1/2 hero-glow opacity-70" />
        </div>

        <section className="mx-auto max-w-3xl px-6 pt-20 pb-10 text-center">
          <p className="text-sm font-medium text-accent-500">User guide</p>
          <h1 className="mt-3 font-display text-5xl leading-tight tracking-tight sm:text-6xl">
            How Dotzie works,{" "}
            <span
              className="italic text-transparent bg-clip-text"
              style={{
                backgroundImage:
                  "linear-gradient(110deg, var(--accent-400), var(--accent-600), var(--accent-300))",
              }}
            >
              step by step.
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
            [PLACEHOLDER] A short tour of the app — from installation to your first encrypted backup. Nothing here leaves your phone.
          </p>
        </section>

        <section className="mx-auto max-w-3xl px-6 pb-24">
          <ol className="relative space-y-6 border-l border-border pl-6">
            {steps.map((s) => (
              <li key={s.title} className="relative">
                <span className="absolute -left-[35px] top-1 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card">
                  <s.icon className="h-4 w-4 text-accent-500" aria-hidden />
                </span>
                <div className="rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-500/50 hover:bg-elevated">
                  <h2 className="font-display text-2xl tracking-tight">{s.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="mx-auto max-w-3xl px-6 pb-24">
          <h2 className="font-display text-3xl tracking-tight">Common questions</h2>
          <dl className="mt-6 space-y-4">
            {faqs.map((f) => (
              <div key={f.q} className="rounded-2xl border border-border bg-card p-6">
                <dt className="font-semibold">{f.q}</dt>
                <dd className="mt-2 text-sm text-muted-foreground">{f.a}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-14 flex items-center justify-between rounded-2xl border border-border bg-card p-6 transition-colors hover:border-accent-500/40">
            <div>
              <p className="font-semibold">Ready to try Dotzie?</p>
              <p className="text-sm text-muted-foreground">[PLACEHOLDER] Free to download. No account required.</p>
            </div>
            <Link
              to="/"
              className="group inline-flex items-center gap-2 text-sm font-medium text-accent-500 hover:text-accent-400"
            >
              Get the app <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
