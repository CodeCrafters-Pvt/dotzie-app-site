import { createFileRoute } from "@tanstack/react-router";
import {
  Wifi,
  Database,
  ServerOff,
  Zap,
  Sparkles,
  LayoutGrid,
  ArrowRight,
  QrCode,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ThemeToggle } from "@/components/theme-toggle";

const APP_NAME = "Dotzee";
const APP_TAGLINE = "Offline-first, privacy-first expense tracker";
const APP_DESC =
  "Dotzee is an offline-first expense tracker. All your financial data stays encrypted on your device — no cloud, no server, no accounts.";
const CANONICAL = "/";

const faqs = [
  {
    q: "Do I need internet to use Dotzee?",
    a: "No. Dotzee is fully offline-first. Every feature — adding expenses, viewing reports, exporting backups — works without a network connection. [PLACEHOLDER]",
  },
  {
    q: "Where is my data stored?",
    a: "All entries live in an encrypted database on your device. Nothing is transmitted to a server, and there are no accounts to create. [PLACEHOLDER]",
  },
  {
    q: "Is Dotzee free?",
    a: "The core tracker is free. A one-time in-app purchase unlocks advanced reports and custom categories. There is no subscription. [PLACEHOLDER]",
  },
  {
    q: "Which platforms are supported?",
    a: "Dotzee is available on iOS and Android. It is built with React Native so the experience is consistent across both. [PLACEHOLDER]",
  },
  {
    q: "Is my data backed up?",
    a: "You can export an encrypted backup file at any time and restore it on a new device using your passphrase. Backups never leave your device unless you share the file yourself. [PLACEHOLDER]",
  },
];

const softwareAppJsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: APP_NAME,
  description: APP_DESC,
  applicationCategory: "FinanceApplication",
  operatingSystem: "iOS, Android",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${APP_NAME} — ${APP_TAGLINE}` },
      { name: "description", content: APP_DESC },
      { property: "og:title", content: `${APP_NAME} — ${APP_TAGLINE}` },
      { property: "og:description", content: APP_DESC },
      { property: "og:url", content: CANONICAL },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: `${APP_NAME} — ${APP_TAGLINE}` },
      { name: "twitter:description", content: APP_DESC },
    ],
    links: [{ rel: "canonical", href: CANONICAL }],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(softwareAppJsonLd) },
      { type: "application/ld+json", children: JSON.stringify(faqJsonLd) },
    ],
  }),
  component: LandingPage,
});

const features = [
  {
    icon: Wifi,
    title: "Offline-first",
    desc: "Every tap, chart, and export works with airplane mode on. The network is optional, always.",
  },
  {
    icon: Database,
    title: "Encrypted local backup",
    desc: "Portable backup files are sealed with AES-256-GCM and a passphrase only you know.",
  },
  {
    icon: ServerOff,
    title: "No cloud, no server",
    desc: "There is no Dotzee account. Nothing to breach, nothing to subpoena, nothing to sync.",
  },
  {
    icon: Zap,
    title: "Fast and lightweight",
    desc: "A native React Native build that cold-starts in under a second on modest hardware.",
  },
  {
    icon: Sparkles,
    title: "Smart categories",
    desc: "On-device rules learn your habits and pre-fill categories without sending a byte off the phone.",
  },
  {
    icon: LayoutGrid,
    title: "Clean, calm UI",
    desc: "A quiet interface designed to fade into your day — not compete with it for attention.",
  },
];

function LandingPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <Features />
        <Privacy />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <a href="#top" className="text-lg font-semibold tracking-tight">
          Dotzee<span className="text-accent-500">.</span>
        </a>
        <nav aria-label="Primary" className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#features" className="transition-colors hover:text-foreground">Features</a>
          <a href="#privacy" className="transition-colors hover:text-foreground">Privacy</a>
          <a href="#faq" className="transition-colors hover:text-foreground">FAQ</a>
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href="#download"
            className="inline-flex h-9 items-center rounded-full bg-gradient-brand px-4 text-sm font-medium text-white shadow-glow transition-transform hover:scale-[1.02]"
          >
            Get the app
          </a>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div aria-hidden className="absolute inset-x-0 top-0 h-[600px] hero-glow" />
      <div className="relative mx-auto grid max-w-6xl gap-14 px-6 pt-20 pb-24 lg:grid-cols-[1.15fr_1fr] lg:pt-28 lg:pb-32">
        <div className="flex flex-col justify-center">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-500" />
            [PLACEHOLDER] Now in private beta
          </span>
          <h1 className="mt-6 font-display text-5xl leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            Track every expense.
            <br />
            <span className="text-gradient-brand italic">Trust no server.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-muted-foreground">
            Dotzee is a beautifully quiet expense tracker for iOS and Android. Your money story stays sealed on your phone — encrypted, offline, and entirely yours.
          </p>

          <div id="download" className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#"
              aria-label="Download Dotzee on the App Store (placeholder link)"
              className="inline-flex items-center gap-3 rounded-2xl bg-foreground px-5 py-3 text-background transition-opacity hover:opacity-90"
            >
              <AppleGlyph />
              <span className="text-left leading-tight">
                <span className="block text-[10px] uppercase tracking-widest opacity-70">Download on the</span>
                <span className="block text-base font-semibold">App Store</span>
              </span>
            </a>
            <a
              href="#"
              aria-label="Get Dotzee on Google Play (placeholder link)"
              className="inline-flex items-center gap-3 rounded-2xl border border-border bg-card px-5 py-3 transition-colors hover:bg-elevated"
            >
              <PlayGlyph />
              <span className="text-left leading-tight">
                <span className="block text-[10px] uppercase tracking-widest text-muted-foreground">Get it on</span>
                <span className="block text-base font-semibold">Google Play</span>
              </span>
            </a>
            <div
              aria-label="QR code placeholder to download Dotzee"
              className="flex h-16 w-16 items-center justify-center rounded-xl border border-dashed border-border bg-card text-muted-foreground"
              title="[PLACEHOLDER] QR code"
            >
              <QrCode className="h-6 w-6" />
            </div>
          </div>

          <p className="mt-6 text-xs text-muted-foreground">
            [PLACEHOLDER] Free to download. No account. No trackers. No ads.
          </p>
        </div>

        <div className="relative flex items-center justify-center">
          <PhoneMockup />
        </div>
      </div>
    </section>
  );
}

function PhoneMockup() {
  return (
    <div className="relative">
      <div aria-hidden className="absolute -inset-10 -z-10 rounded-[3rem] bg-gradient-brand opacity-30 blur-3xl" />
      <div
        role="img"
        aria-label="[PLACEHOLDER] Screenshot of the Dotzee app showing this month's expenses"
        className="relative h-[560px] w-[280px] rounded-[2.5rem] border border-border bg-card p-3 shadow-2xl"
      >
        <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-gradient-to-b from-elevated to-card">
          <div className="mx-auto mt-2 h-1.5 w-20 rounded-full bg-foreground/20" />
          <div className="p-5">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">This month</p>
            <p className="mt-1 font-display text-4xl">$1,284.<span className="text-muted-foreground">40</span></p>
            <div className="mt-5 h-24 rounded-xl bg-gradient-brand opacity-90" />
            <ul className="mt-5 space-y-3 text-sm">
              {[
                ["Coffee", "$4.20", "Cafés"],
                ["Groceries", "$62.10", "Food"],
                ["Metro pass", "$28.00", "Transit"],
                ["Bookshop", "$19.90", "Leisure"],
              ].map(([label, amt, cat]) => (
                <li key={label} className="flex items-center justify-between rounded-lg bg-background/60 px-3 py-2">
                  <div>
                    <p className="font-medium">{label}</p>
                    <p className="text-[11px] text-muted-foreground">{cat}</p>
                  </div>
                  <span className="tabular-nums">{amt}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-6 py-24 lg:py-32">
      <div className="max-w-2xl">
        <p className="text-sm font-medium text-accent-500">What's inside</p>
        <h2 className="mt-3 font-display text-4xl tracking-tight sm:text-5xl">
          Every feature built for a phone that trusts itself.
        </h2>
        <p className="mt-4 text-muted-foreground">
          No dashboards to log into, no companies to trust. Dotzee runs entirely on your device — the app is the product, not the pipeline behind it.
        </p>
      </div>

      <ul className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f) => (
          <li key={f.title} className="group bg-card p-8 transition-colors hover:bg-elevated">
            <f.icon className="h-6 w-6 text-accent-500" aria-hidden />
            <h3 className="mt-6 text-lg font-semibold">{f.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Privacy() {
  return (
    <section id="privacy" className="relative overflow-hidden border-y border-border bg-card">
      <div aria-hidden className="absolute inset-0 opacity-40 hero-glow" />
      <div className="relative mx-auto max-w-4xl px-6 py-24 text-center lg:py-32">
        <p className="text-sm font-medium text-accent-500">Privacy, plainly</p>
        <h2 className="mt-4 font-display text-4xl leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          Your data never leaves your device. <span className="text-gradient-brand italic">Full stop.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          Every transaction, note, and category you enter is written to an on-device database encrypted with <strong className="text-foreground">AES-256-GCM</strong>. There is no Dotzee server to send it to, and no analytics SDK quietly listening in the background.
        </p>

        <dl className="mx-auto mt-14 grid max-w-3xl gap-6 text-left sm:grid-cols-3">
          {[
            ["AES-256-GCM", "Authenticated encryption for every record on disk."],
            ["Zero network calls", "The app makes no requests once installed."],
            ["No accounts", "Nothing to sign up for, nothing to leak."],
          ].map(([k, v]) => (
            <div key={k} className="rounded-xl border border-border bg-background p-5">
              <dt className="font-display text-xl">{k}</dt>
              <dd className="mt-2 text-sm text-muted-foreground">{v}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-10 text-xs text-muted-foreground">
          [PLACEHOLDER] Independent security review scheduled Q3 2026.
        </p>
      </div>
    </section>
  );
}

function FAQ() {
  return (
    <section id="faq" className="mx-auto max-w-3xl px-6 py-24 lg:py-32">
      <p className="text-sm font-medium text-accent-500">Frequently asked</p>
      <h2 className="mt-3 font-display text-4xl tracking-tight sm:text-5xl">
        Questions, answered.
      </h2>

      <Accordion type="single" collapsible className="mt-10">
        {faqs.map((f, i) => (
          <AccordionItem key={i} value={`item-${i}`} className="border-border">
            <AccordionTrigger className="text-left text-base font-medium hover:no-underline">
              {f.q}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="mt-14 flex items-center justify-between rounded-2xl border border-border bg-card p-6">
        <div>
          <p className="font-semibold">Still curious?</p>
          <p className="text-sm text-muted-foreground">[PLACEHOLDER] Read the technical brief.</p>
        </div>
        <a href="#" className="inline-flex items-center gap-2 text-sm font-medium text-accent-500 hover:text-accent-400">
          Read the brief <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-lg font-semibold tracking-tight">
            Dotzee<span className="text-accent-500">.</span>
          </p>
          <p className="mt-2 max-w-xs text-sm text-muted-foreground">
            An offline expense tracker for people who like their money — and their data — kept close.
          </p>
        </div>
        <FooterCol title="Company" links={[["Features", "#features"], ["Privacy", "#privacy"], ["FAQ", "#faq"]]} />
        <FooterCol title="Legal" links={[["Privacy Policy", "/privacy"], ["Terms", "/terms"]]} />
        <div>
          <p className="text-sm font-semibold">Contact</p>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li><a href="mailto:hello@dotzee.app" className="hover:text-foreground">hello@dotzee.app</a> <span className="text-xs">[PLACEHOLDER]</span></li>
          </ul>
          <div className="mt-4 flex gap-2" aria-label="Social links">
            {["X", "GH", "IG"].map((s) => (
              <a
                key={s}
                href="#"
                aria-label={`${s} (placeholder)`}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border text-xs text-muted-foreground hover:text-foreground"
              >
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-2 px-6 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Dotzee. [PLACEHOLDER] All rights reserved.</p>
          <p>Made offline, on purpose.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <p className="text-sm font-semibold">{title}</p>
      <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
        {links.map(([label, href]) => (
          <li key={label}>
            <a href={href} className="hover:text-foreground">{label}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function AppleGlyph() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-6 w-6 fill-current">
      <path d="M16.365 1.43c0 1.14-.47 2.24-1.24 3.03-.82.85-2.13 1.5-3.22 1.42-.13-1.09.42-2.24 1.16-3 .82-.85 2.22-1.5 3.3-1.45zM20.5 17.02c-.55 1.27-.81 1.84-1.52 2.96-.99 1.55-2.38 3.48-4.1 3.5-1.54.01-1.94-1-4.03-1-2.09.01-2.53 1.02-4.08 1.01-1.72-.02-3.04-1.76-4.03-3.3C.06 16.4-.02 11.1 2.24 8.3c1.47-1.82 3.55-2.88 5.51-2.88 2.02 0 3.28 1.11 4.95 1.11 1.62 0 2.61-1.11 4.94-1.11 1.76 0 3.62.96 4.95 2.62-4.35 2.38-3.64 8.58-2.09 9.98z" />
    </svg>
  );
}

function PlayGlyph() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="h-6 w-6">
      <path d="M3.6 2.2C3.2 2.5 3 3 3 3.6v16.8c0 .6.2 1.1.6 1.4l9.8-9.8L3.6 2.2z" fill="#6B5CFF"/>
      <path d="M17.6 8.4L14.4 6.6 4 1c-.2-.1-.4-.1-.6-.1l10 10L17.6 8.4z" fill="#8A7EFF"/>
      <path d="M21 10.7l-3.4-1.9-3.2 3.2 3.2 3.2 3.4-1.9c1-.5 1-2.1 0-2.6z" fill="#4A3FCC"/>
      <path d="M3.4 22.9c.2 0 .4 0 .6-.1l10.4-5.7 3.2-1.8-3.8-3.8L3.4 22.9z" fill="#5D50EC"/>
    </svg>
  );
}
