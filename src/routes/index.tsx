import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  Wifi,
  Database,
  ServerOff,
  Zap,
  Sparkles,
  LayoutGrid,
  ArrowRight,
  ArrowLeft,
  QrCode,
  TrendingDown,
  TrendingUp,
  Utensils,
  Car,
  ShoppingBag,
  Coffee,
  Film,
  Wallet,
  Target,
  PiggyBank,
  Plus,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ThemeToggle } from "@/components/theme-toggle";
import { AccentSwitcher } from "@/components/accent-switcher";
import { Twitter, Instagram, Github, Linkedin } from "lucide-react";

const APP_NAME = "Dotzie";
const APP_TAGLINE = "Offline-first, privacy-first expense tracker";
const APP_DESC =
  "Dotzie is an offline-first expense tracker. All your financial data stays encrypted on your device — no cloud, no server, no accounts.";
const CANONICAL = "/";

const faqs = [
  {
    q: "Do I need internet to use Dotzie?",
    a: "No. Dotzie is fully offline-first. Every feature — adding expenses, viewing reports, exporting backups — works without a network connection. [PLACEHOLDER]",
  },
  {
    q: "Where is my data stored?",
    a: "All entries live in an encrypted database on your device. Nothing is transmitted to a server, and there are no accounts to create. [PLACEHOLDER]",
  },
  {
    q: "Is Dotzie free?",
    a: "The core tracker is free. A one-time in-app purchase unlocks advanced reports and custom categories. There is no subscription. [PLACEHOLDER]",
  },
  {
    q: "Which platforms are supported?",
    a: "Dotzie is available on iOS and Android. It is built with React Native so the experience is consistent across both. [PLACEHOLDER]",
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
  { icon: Wifi, title: "Offline-first", desc: "Every tap, chart, and export works with airplane mode on. The network is optional, always." },
  { icon: Database, title: "Encrypted local backup", desc: "Portable backup files are sealed with AES-256-GCM and a passphrase only you know." },
  { icon: ServerOff, title: "No cloud, no server", desc: "There is no Dotzie account. Nothing to breach, nothing to subpoena, nothing to sync." },
  { icon: Zap, title: "Fast and lightweight", desc: "A native React Native build that cold-starts in under a second on modest hardware." },
  { icon: Sparkles, title: "Smart categories", desc: "On-device rules learn your habits and pre-fill categories without sending a byte off the phone." },
  { icon: LayoutGrid, title: "Clean, calm UI", desc: "A quiet interface designed to fade into your day — not compete with it for attention." },
];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }
      },
      { threshold: 0.15 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

function LandingPage() {
  useReveal();
  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground">
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

function Wordmark({ className = "" }: { className?: string }) {
  return (
    <a href="#top" className={`group inline-flex items-center gap-2.5 ${className}`}>
      <span className="relative inline-flex h-8 w-8 items-center justify-center overflow-hidden rounded-[9px] bg-gradient-brand shadow-sm ring-1 ring-white/10 transition-transform duration-300 group-hover:scale-105">
        <span className="font-display text-lg italic leading-none text-white">d</span>
      </span>
      <span className="font-display text-xl tracking-tight">
        Dotzie<span className="text-accent-500">.</span>
      </span>
    </a>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Wordmark />
        <nav aria-label="Primary" className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#features" className="transition-colors hover:text-foreground">Features</a>
          <a href="#privacy" className="transition-colors hover:text-foreground">Privacy</a>
          <a href="/guide" className="transition-colors hover:text-foreground">Guide</a>
          <a href="#faq" className="transition-colors hover:text-foreground">FAQ</a>
        </nav>
        <div className="flex items-center gap-2">
          <AccentSwitcher />
          <ThemeToggle />
          <a
            href="#download"
            className="relative inline-flex h-9 items-center overflow-hidden rounded-full bg-gradient-brand px-4 text-sm font-medium text-white shadow-glow transition-transform hover:scale-[1.03]"
          >
            <span className="relative z-10">Get the app</span>
            <span aria-hidden className="absolute inset-0 -translate-x-full animate-shimmer-text bg-[linear-gradient(110deg,transparent,rgba(255,255,255,0.35),transparent)]" />
          </a>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      {/* animated background blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 left-1/2 h-[700px] w-[900px] -translate-x-1/2 hero-glow" />
        <div className="absolute left-[10%] top-40 h-72 w-72 rounded-full bg-accent-500/40 opacity-60 blur-[80px] animate-blob" />
        <div className="absolute right-[8%] top-64 h-80 w-80 rounded-full bg-accent-400/40 opacity-60 blur-[80px] animate-blob [animation-delay:-6s]" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6 pt-20 pb-16 text-center lg:pt-28">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-accent-500 animate-pulse-ring" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-500" />
            </span>
            [PLACEHOLDER] Now in private beta
          </span>
        </div>


        <h1 className="mx-auto mt-8 max-w-4xl animate-fade-up font-display text-5xl leading-[1.02] tracking-tight [animation-delay:120ms] sm:text-6xl lg:text-[5.5rem]">
          Track every expense.

          <br />
          <span
            className="animate-shimmer-text bg-clip-text italic text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(110deg, var(--accent-400), var(--accent-600), var(--accent-300), var(--accent-600), var(--accent-400))",
            }}
          >
            Trust no server.
          </span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl animate-fade-up text-lg text-muted-foreground [animation-delay:240ms]">
          A beautifully quiet expense tracker for iOS and Android. Your money story stays sealed on your phone — encrypted, offline, and entirely yours.
        </p>

        <div id="download" className="mt-10 flex animate-fade-up flex-wrap items-center justify-center gap-3 [animation-delay:360ms]">
          <a
            href="#"
            aria-label="Download Dotzie on the App Store (placeholder link)"
            className="group inline-flex items-center gap-3 rounded-2xl bg-foreground px-5 py-3 text-background transition-all hover:-translate-y-0.5 hover:shadow-xl"
          >
            <AppleGlyph />
            <span className="text-left leading-tight">
              <span className="block text-[10px] uppercase tracking-widest opacity-70">Download on the</span>
              <span className="block text-base font-semibold">App Store</span>
            </span>
          </a>
          <a
            href="#"
            aria-label="Get Dotzie on Google Play (placeholder link)"
            className="group inline-flex items-center gap-3 rounded-2xl border border-border bg-card px-5 py-3 transition-all hover:-translate-y-0.5 hover:bg-elevated hover:shadow-xl"
          >
            <PlayGlyph />
            <span className="text-left leading-tight">
              <span className="block text-[10px] uppercase tracking-widest text-muted-foreground">Get it on</span>
              <span className="block text-base font-semibold">Google Play</span>
            </span>
          </a>
          <div
            aria-label="QR code placeholder to download Dotzie"
            title="[PLACEHOLDER] QR code"
            className="flex h-16 w-16 items-center justify-center rounded-xl border border-dashed border-border bg-card text-muted-foreground transition-colors hover:text-foreground"
          >
            <QrCode className="h-6 w-6" />
          </div>
        </div>

        <p className="mt-4 animate-fade-up text-xs text-muted-foreground [animation-delay:480ms]">
          [PLACEHOLDER] Free to download. No account. No trackers. No ads.
        </p>
      </div>

      {/* Phone carousel — slide-show style */}
      <PhoneCarousel />
    </section>
  );
}

function AnimatedDotzie() {
  const letters = "Dotzie".split("");
  return (
    <div className="group relative select-none" aria-label="Dotzie">
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-x-6 -inset-y-3 -z-10 rounded-full bg-accent-500/10 blur-2xl transition-opacity duration-500 group-hover:opacity-100 opacity-70"
      />
      <span className="flex items-baseline font-display text-6xl italic tracking-tight sm:text-7xl lg:text-[6.5rem]">
        {letters.map((ch, i) => (
          <span
            key={i}
            className="inline-block animate-letter-drop bg-clip-text text-transparent"
            style={{
              animationDelay: `${180 + i * 90}ms`,
              backgroundImage:
                "linear-gradient(180deg, var(--foreground) 0%, var(--foreground) 55%, color-mix(in oklab, var(--accent-500) 80%, var(--foreground)) 100%)",
            }}
          >
            <span
              className="inline-block animate-letter-wave"
              style={{ animationDelay: `${i * 220}ms` }}
            >
              {ch}
            </span>
          </span>
        ))}
        <span
          className="ml-1 inline-block h-3 w-3 translate-y-[-0.1em] animate-letter-drop rounded-full bg-accent-500 shadow-glow sm:h-3.5 sm:w-3.5"
          style={{ animationDelay: `${180 + letters.length * 90}ms` }}
        />
      </span>
    </div>
  );
}




function PhoneCarousel() {

  const screens: { key: string; label: string; el: React.ReactNode }[] = [
    { key: "snapshot", label: "Snapshot", el: <ScreenSnapshot /> },
    { key: "insights", label: "Insights", el: <ScreenInsights /> },
    { key: "timeline", label: "Timeline", el: <ScreenTimeline /> },
    { key: "budgets", label: "Budgets", el: <ScreenBudgets /> },
    { key: "goals", label: "Goals", el: <ScreenGoals /> },
    { key: "add", label: "Quick add", el: <ScreenAdd /> },
  ];
  const n = screens.length;
  const [active, setActive] = useState(0);

  const go = (dir: number) => setActive((a) => (a + dir + n) % n);

  return (
    <div className="relative mx-auto mt-6 max-w-6xl px-4 pb-24 sm:px-6 lg:pb-32">
      <div className="reveal relative mx-auto h-[560px] w-full max-w-5xl sm:h-[640px]">
        {/* stage */}
        <div className="relative h-full w-full [perspective:1400px]">
          {screens.map((s, i) => {
            let pos = i - active;
            if (pos > n / 2) pos -= n;
            if (pos < -n / 2) pos += n;
            const abs = Math.abs(pos);
            const visible = abs <= 2;
            const scale = pos === 0 ? 1 : abs === 1 ? 0.78 : 0.6;
            const translateX = pos * 34; // %
            const translateY = pos === 0 ? 0 : 24;
            const rotateY = pos === 0 ? 0 : pos > 0 ? -14 : 14;
            const opacity = !visible ? 0 : pos === 0 ? 1 : abs === 1 ? 0.7 : 0.35;
            const z = 50 - abs * 10;
            return (
              <button
                type="button"
                key={s.key}
                onClick={() => setActive(i)}
                aria-label={`Show ${s.label} screen`}
                aria-current={pos === 0}
                tabIndex={visible ? 0 : -1}
                className="absolute left-1/2 top-1/2 origin-center transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] focus:outline-none"
                style={{
                  transform: `translate(-50%, -50%) translateX(${translateX}%) translateY(${translateY}px) scale(${scale}) rotateY(${rotateY}deg)`,
                  opacity,
                  zIndex: z,
                  pointerEvents: visible ? "auto" : "none",
                  filter: pos === 0 ? "none" : "blur(0.5px)",
                }}
              >
                <PhoneFrame glow={pos === 0}>{s.el}</PhoneFrame>
              </button>
            );
          })}
        </div>

        {/* arrows */}
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous screen"
          className="group absolute left-2 top-1/2 z-[60] inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card/80 text-foreground shadow-lg backdrop-blur-md transition-all hover:-translate-y-1/2 hover:scale-110 hover:border-accent-500/60 hover:text-accent-500 sm:left-4 sm:h-14 sm:w-14"
        >
          <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-0.5" />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next screen"
          className="group absolute right-2 top-1/2 z-[60] inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card/80 text-foreground shadow-lg backdrop-blur-md transition-all hover:-translate-y-1/2 hover:scale-110 hover:border-accent-500/60 hover:text-accent-500 sm:right-4 sm:h-14 sm:w-14"
        >
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-0.5" />
        </button>
      </div>

      {/* label + dots */}
      <div className="mt-6 flex flex-col items-center gap-4">
        <p className="font-display text-lg italic text-muted-foreground">
          <span className="text-foreground">{screens[active].label}</span>
          <span className="mx-2 opacity-40">·</span>
          <span className="tabular-nums text-sm">{active + 1} / {n}</span>
        </p>
        <div className="flex items-center gap-2" role="tablist" aria-label="App screens">
          {screens.map((s, i) => (
            <button
              key={s.key}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={s.label}
              onClick={() => setActive(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === active ? "w-8 bg-accent-500" : "w-1.5 bg-border hover:bg-accent-400/60"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function PhoneFrame({ children, glow = false }: { children: React.ReactNode; glow?: boolean }) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 650);
    return () => clearTimeout(t);
  }, [children]);
  return (
    <div className="relative">
      {glow ? (
        <span
          aria-hidden
          className="pointer-events-none absolute -inset-8 -z-10 rounded-[3.5rem] bg-accent-500/20 blur-3xl"
        />
      ) : null}
      <div className="relative h-[440px] w-[210px] rounded-[2.2rem] border border-border bg-[#0B0B0F] p-2 shadow-2xl ring-1 ring-white/5 sm:h-[520px] sm:w-[248px] sm:rounded-[2.6rem] sm:p-2.5">
        <div className="absolute left-1/2 top-2 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-black/90 sm:h-6 sm:w-24" />
        <div className="relative h-full w-full overflow-hidden rounded-[1.75rem] bg-[#07070A] text-[#F4F3FA] sm:rounded-[2.1rem]">
          <div
            className={`h-full w-full transition-opacity duration-500 ${loading ? "opacity-0" : "opacity-100"}`}
          >
            {children}
          </div>
          {loading ? <PhoneSkeleton /> : null}
        </div>
      </div>
    </div>
  );
}

function PhoneSkeleton() {
  return (
    <div className="absolute inset-0 flex flex-col gap-3 px-5 pt-8 animate-fade-up">
      <div className="flex items-center justify-between">
        <div className="h-2.5 w-10 rounded-full animate-skeleton" />
        <div className="h-2.5 w-8 rounded-full animate-skeleton" />
      </div>
      <div className="mt-2 h-20 w-full rounded-2xl animate-skeleton" />
      <div className="h-14 w-full rounded-2xl animate-skeleton" />
      <div className="mt-1 h-2 w-24 rounded-full animate-skeleton" />
      <div className="grid grid-cols-2 gap-2">
        <div className="h-16 rounded-xl animate-skeleton" />
        <div className="h-16 rounded-xl animate-skeleton" />
      </div>
      <div className="h-10 w-full rounded-xl animate-skeleton" />
      <div className="h-10 w-full rounded-xl animate-skeleton" />
    </div>
  );
}


function StatusBar() {
  return (
    <div className="flex items-center justify-between px-5 pt-3 text-[10px] font-medium text-white/80">
      <span>1:47</span>
      <span className="flex items-center gap-1">
        <span className="inline-block h-2 w-3 rounded-sm bg-white/70" />
        <span className="inline-block h-2 w-3 rounded-sm bg-white/70" />
      </span>
    </div>
  );
}

function ScreenSnapshot() {
  return (
    <div className="flex h-full flex-col">
      <StatusBar />
      <div className="mt-3 px-5">
        <p className="text-[10px] text-white/50">Last synced: never · offline</p>
        <div className="mt-4 rounded-2xl bg-[#16121F] p-4">
          <p className="text-[11px] text-white/60">
            <span aria-hidden>👋</span> Hey Kavi,
          </p>
          <p className="mt-1 text-[15px] leading-tight">
            you spent <span className="font-semibold">$154.20</span> today
          </p>
          <div className="mt-4 flex justify-between text-[11px] text-white/70">
            <div>
              <p className="flex items-center gap-1"><TrendingDown className="h-3 w-3 text-emerald-400" /> Week <span className="text-emerald-400">-12%</span></p>
              <p className="mt-1 text-white">$412.35</p>
            </div>
            <div className="text-right">
              <p className="flex items-center gap-1 justify-end"><TrendingUp className="h-3 w-3 text-rose-400" /> Month <span className="text-rose-400">+8%</span></p>
              <p className="mt-1 text-white">$1,284.40</p>
            </div>
          </div>
        </div>

        <div className="mt-3 rounded-2xl bg-[#16121F] p-4">
          <div className="flex items-center gap-2">
            <Wallet className="h-4 w-4 text-accent-300" />
            <div>
              <p className="text-[11px] text-white/50">Everyday wallet</p>
              <p className="text-[11px] text-white/60">3401 · HNB</p>
            </div>
          </div>
          <p className="mt-2 font-display text-2xl">$2,412.35</p>
        </div>

        <p className="mt-4 text-[9px] uppercase tracking-widest text-white/40">Top spenders</p>
        <p className="mt-1 text-[12px]">
          Where your <span aria-hidden>💸</span> went this month
        </p>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {[
            { icon: Car, label: "Transport", val: "$48.20" },
            { icon: Utensils, label: "Dining", val: "$155.00" },
          ].map(({ icon: Icon, label, val }) => (
            <div key={label} className="rounded-xl bg-[#16121F] p-3">
              <Icon className="h-4 w-4 text-accent-300" />
              <p className="mt-2 text-[11px] text-white/60">{label}</p>
              <p className="text-[12px] font-medium">{val}</p>
            </div>
          ))}
        </div>
      </div>
      <TabBar active="Snapshot" />
    </div>
  );
}

function ScreenInsights() {
  return (
    <div className="flex h-full flex-col">
      <StatusBar />
      <div className="mt-3 flex items-center justify-between px-5 text-[11px]">
        <span className="text-white/40">‹</span>
        <span className="text-white/80">Aug 22 – Sep 21</span>
        <span className="text-white/40">›</span>
      </div>

      <div className="relative mx-auto mt-6 h-40 w-40">
        <svg viewBox="0 0 42 42" className="h-full w-full -rotate-90">
          <circle cx="21" cy="21" r="15.9155" fill="transparent" stroke="#16121F" strokeWidth="6" />
          <circle cx="21" cy="21" r="15.9155" fill="transparent" stroke="#8A7EFF" strokeWidth="6" strokeDasharray="52 100" />
          <circle cx="21" cy="21" r="15.9155" fill="transparent" stroke="#5D50EC" strokeWidth="6" strokeDasharray="26 100" strokeDashoffset="-52" />
          <circle cx="21" cy="21" r="15.9155" fill="transparent" stroke="#B3ABFF" strokeWidth="6" strokeDasharray="22 100" strokeDashoffset="-78" />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <p className="text-[9px] uppercase tracking-widest text-white/40">Total</p>
          <p className="font-display text-lg">$1,284</p>
        </div>
        <div className="absolute -right-2 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-accent-500 shadow-lg">
          <ShoppingBag className="h-4 w-4 text-white" />
        </div>
        <div className="absolute -left-2 bottom-4 flex h-8 w-8 items-center justify-center rounded-full bg-accent-300 shadow-lg">
          <Car className="h-4 w-4 text-accent-700" />
        </div>
      </div>

      <div className="mt-6 space-y-2 px-5">
        {[
          { icon: Utensils, label: "Dining out", pct: "40% of expenses", amt: "$514.00", w: "w-2/3", tone: "bg-accent-500" },
          { icon: Car, label: "Transport", pct: "16% of expenses", amt: "$205.40", w: "w-1/3", tone: "bg-accent-300" },
          { icon: Film, label: "Leisure", pct: "12% of expenses", amt: "$154.20", w: "w-1/4", tone: "bg-accent-400" },
        ].map((row) => (
          <div key={row.label} className="rounded-xl bg-[#16121F] p-3">
            <div className="flex items-center gap-2">
              <row.icon className="h-4 w-4 text-accent-300" />
              <div className="flex-1">
                <p className="text-[12px] font-medium">{row.label}</p>
                <p className="text-[10px] text-white/50">{row.pct}</p>
              </div>
              <p className="text-[11px]">{row.amt}</p>
            </div>
            <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-white/10">
              <div className={`h-full ${row.w} ${row.tone}`} />
            </div>
          </div>
        ))}
      </div>
      <TabBar active="Insights" />
    </div>
  );
}

function ScreenTimeline() {
  const items: Array<{ icon: any; title: string; sub: string; amt: string; time: string; pos?: boolean }> = [
    { icon: Coffee, title: "Brew 1867", sub: "Cafés", amt: "-$4.20", time: "6:50 PM" },
    { icon: ShoppingBag, title: "Bookshop", sub: "Leisure", amt: "-$19.90", time: "3:00 PM" },
    { icon: Car, title: "Uber", sub: "Transit", amt: "-$26.50", time: "10:00 AM" },
    { icon: Wallet, title: "Payday", sub: "Income", amt: "+$1,250.43", time: "7:50 AM", pos: true },
  ];
  return (
    <div className="flex h-full flex-col">
      <StatusBar />
      <div className="mt-3 flex items-center justify-between px-5 text-[11px]">
        <span className="text-white/40">‹</span>
        <span className="text-white/80">Aug 22 – Sep 21</span>
        <span className="text-white/40">›</span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-2 px-5">
        <div className="rounded-xl bg-[#16121F] p-3">
          <p className="text-[10px] text-white/50">Income</p>
          <p className="text-[13px] font-semibold text-emerald-400">$1,094.00</p>
        </div>
        <div className="rounded-xl bg-[#16121F] p-3">
          <p className="text-[10px] text-white/50">Expenses</p>
          <p className="text-[13px] font-semibold text-rose-400">$250.24</p>
        </div>
      </div>

      <p className="mx-5 mt-4 flex items-center justify-between text-[10px] text-white/50">
        <span>Today, 31 October</span>
        <span>$1,125.00</span>
      </p>

      <ul className="mt-2 flex-1 space-y-2 overflow-hidden px-5">
        {items.map((it, i) => (
          <li key={i} className="flex items-center gap-3 rounded-xl bg-[#16121F] p-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5">
              <it.icon className="h-4 w-4 text-accent-300" />
            </span>
            <div className="flex-1">
              <p className="text-[12px] font-medium">{it.title}</p>
              <p className="text-[10px] text-white/50">{it.sub}</p>
            </div>
            <div className="text-right">
              <p className={`text-[12px] ${it.pos ? "text-emerald-400" : "text-rose-400"}`}>{it.amt}</p>
              <p className="text-[9px] text-white/40">{it.time}</p>
            </div>
          </li>
        ))}
      </ul>
      <TabBar active="Timeline" />
    </div>
  );
}

function ScreenBudgets() {
  const budgets = [
    { icon: Utensils, label: "Dining", used: 320, cap: 400, tone: "bg-accent-500" },
    { icon: Car, label: "Transport", used: 145, cap: 250, tone: "bg-accent-400" },
    { icon: Film, label: "Leisure", used: 82, cap: 120, tone: "bg-accent-300" },
    { icon: ShoppingBag, label: "Shopping", used: 210, cap: 200, tone: "bg-rose-500" },
  ];
  return (
    <div className="flex h-full flex-col">
      <StatusBar />
      <div className="mt-3 px-5">
        <p className="text-[10px] uppercase tracking-widest text-white/40">September</p>
        <p className="mt-1 font-display text-2xl">Budgets</p>
      </div>
      <div className="mt-4 space-y-2 px-5">
        {budgets.map((b) => {
          const pct = Math.min(100, Math.round((b.used / b.cap) * 100));
          const over = b.used > b.cap;
          return (
            <div key={b.label} className="rounded-xl bg-[#16121F] p-3">
              <div className="flex items-center gap-2">
                <b.icon className="h-4 w-4 text-accent-300" />
                <p className="flex-1 text-[12px] font-medium">{b.label}</p>
                <p className={`text-[11px] ${over ? "text-rose-400" : "text-white/70"}`}>
                  ${b.used} / ${b.cap}
                </p>
              </div>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                <div className={`h-full ${b.tone}`} style={{ width: `${pct}%` }} />
              </div>
            </div>
          );
        })}
      </div>
      <TabBar active="Budgets" />
    </div>
  );
}

function ScreenGoals() {
  const goals = [
    { icon: PiggyBank, label: "Emergency fund", cur: 1840, tgt: 3000 },
    { icon: Target, label: "Kyoto trip", cur: 720, tgt: 1500 },
    { icon: Wallet, label: "New laptop", cur: 480, tgt: 1200 },
  ];
  return (
    <div className="flex h-full flex-col">
      <StatusBar />
      <div className="mt-3 px-5">
        <p className="text-[10px] uppercase tracking-widest text-white/40">Saving toward</p>
        <p className="mt-1 font-display text-2xl">Goals</p>
      </div>
      <div className="mt-5 space-y-3 px-5">
        {goals.map((g) => {
          const pct = Math.round((g.cur / g.tgt) * 100);
          return (
            <div key={g.label} className="rounded-2xl bg-[#16121F] p-4">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-500/20">
                  <g.icon className="h-4 w-4 text-accent-300" />
                </span>
                <div className="flex-1">
                  <p className="text-[12px] font-medium">{g.label}</p>
                  <p className="text-[10px] text-white/50">${g.cur} of ${g.tgt}</p>
                </div>
                <p className="text-[12px] font-semibold text-accent-300">{pct}%</p>
              </div>
              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${pct}%`,
                    background: "linear-gradient(90deg, var(--accent-400), var(--accent-600))",
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <TabBar active="Snapshot" />
    </div>
  );
}

function ScreenAdd() {
  const cats = [
    { icon: Utensils, label: "Dining" },
    { icon: Car, label: "Transit" },
    { icon: Coffee, label: "Coffee" },
    { icon: ShoppingBag, label: "Shop" },
    { icon: Film, label: "Leisure" },
    { icon: Wallet, label: "Bills" },
  ];
  return (
    <div className="flex h-full flex-col">
      <StatusBar />
      <div className="mt-3 flex items-center justify-between px-5">
        <span className="text-[11px] text-white/40">Cancel</span>
        <span className="text-[11px] font-medium text-accent-300">Save</span>
      </div>
      <div className="mt-6 px-5 text-center">
        <p className="text-[10px] uppercase tracking-widest text-white/40">Amount</p>
        <p className="mt-1 font-display text-5xl">
          <span className="text-white/40">$</span>24
          <span className="text-white/50">.50</span>
        </p>
      </div>
      <div className="mt-5 px-5">
        <div className="rounded-xl bg-[#16121F] p-3">
          <p className="text-[10px] text-white/40">Note</p>
          <p className="mt-1 text-[12px]">Lunch with Sam</p>
        </div>
      </div>
      <p className="mx-5 mt-5 text-[10px] uppercase tracking-widest text-white/40">Category</p>
      <div className="mx-5 mt-2 grid grid-cols-3 gap-2">
        {cats.map((c, i) => (
          <div
            key={c.label}
            className={`flex flex-col items-center gap-1 rounded-xl p-3 ${
              i === 0 ? "bg-accent-500/25 ring-1 ring-accent-400" : "bg-[#16121F]"
            }`}
          >
            <c.icon className="h-4 w-4 text-accent-300" />
            <span className="text-[10px]">{c.label}</span>
          </div>
        ))}
      </div>
      <div className="mt-auto flex items-center justify-center pb-5">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-brand shadow-lg">
          <Plus className="h-5 w-5 text-white" />
        </span>
      </div>
    </div>
  );
}


function TabBar({ active }: { active: string }) {
  const tabs = ["Snapshot", "Insights", "Timeline", "Budgets"];
  return (
    <nav className="mt-3 flex items-center justify-around border-t border-white/5 py-2.5 text-[9px] text-white/40">
      {tabs.map((t) => (
        <span key={t} className={t === active ? "text-white" : ""}>
          <span className="mx-auto mb-1 block h-3 w-3 rounded-sm bg-current opacity-60" />
          {t}
        </span>
      ))}
    </nav>
  );
}

function Features() {
  return (
    <section id="features" className="mx-auto max-w-6xl px-6 py-24 lg:py-32">
      <div className="reveal max-w-2xl">
        <p className="text-sm font-medium text-accent-500">What's inside</p>
        <h2 className="mt-3 font-display text-4xl tracking-tight sm:text-5xl">
          Every feature built for a phone that trusts itself.
        </h2>
        <p className="mt-4 text-muted-foreground">
          No dashboards to log into, no companies to trust. Dotzie runs entirely on your device — the app is the product, not the pipeline behind it.
        </p>
      </div>

      <ul className="reveal mt-14 grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
        {features.map((f, i) => (
          <li
            key={f.title}
            className="group relative overflow-hidden bg-card p-8 transition-all duration-500 hover:bg-elevated"
            style={{ transitionDelay: `${i * 30}ms` }}
          >
            <span
              aria-hidden
              className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-accent-500/0 blur-2xl transition-all duration-700 group-hover:bg-accent-500/30"
            />
            <span className="relative inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-background transition-transform duration-500 group-hover:-translate-y-1 group-hover:border-accent-500/50">
              <f.icon className="h-5 w-5 text-accent-500" aria-hidden />
            </span>
            <h3 className="relative mt-6 text-lg font-semibold">{f.title}</h3>
            <p className="relative mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

function Privacy() {
  return (
    <section id="privacy" className="relative overflow-hidden">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute left-[15%] top-1/3 h-64 w-64 rounded-full bg-accent-500/30 blur-[80px] animate-blob" />
        <div className="absolute right-[10%] top-1/2 h-72 w-72 rounded-full bg-accent-400/30 blur-[80px] animate-blob [animation-delay:-8s]" />
      </div>
      <div className="relative mx-auto max-w-4xl px-6 py-24 text-center lg:py-32">
        <p className="reveal text-sm font-medium text-accent-500">Privacy, plainly</p>
        <h2 className="reveal mt-4 font-display text-4xl leading-tight tracking-tight sm:text-5xl lg:text-6xl">
          Your data never leaves your device.{" "}
          <span
            className="animate-shimmer-text bg-clip-text italic text-transparent"
            style={{
              backgroundImage:
                "linear-gradient(110deg, var(--accent-400), var(--accent-600), var(--accent-300), var(--accent-600), var(--accent-400))",
            }}
          >
            Full stop.
          </span>
        </h2>
        <p className="reveal mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          Every transaction, note, and category you enter is written to an on-device database encrypted with <strong className="text-foreground">AES-256-GCM</strong>. There is no Dotzie server to send it to, and no analytics SDK quietly listening in the background.
        </p>

        <dl className="reveal mx-auto mt-14 grid max-w-3xl gap-6 text-left sm:grid-cols-3">
          {[
            ["AES-256-GCM", "Authenticated encryption for every record on disk."],
            ["Zero network calls", "The app makes no requests once installed."],
            ["No accounts", "Nothing to sign up for, nothing to leak."],
          ].map(([k, v], i) => (
            <div
              key={k}
              className="rounded-2xl border border-border bg-card p-5 transition-transform duration-500 hover:-translate-y-1 hover:border-accent-500/50"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
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
      <p className="reveal text-sm font-medium text-accent-500">Frequently asked</p>
      <h2 className="reveal mt-3 font-display text-4xl tracking-tight sm:text-5xl">
        Questions, answered.
      </h2>

      <Accordion type="single" collapsible className="reveal mt-10">
        {faqs.map((f, i) => (
          <AccordionItem key={i} value={`item-${i}`} className="border-border">
            <AccordionTrigger className="text-left text-base font-medium hover:no-underline">
              {f.q}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="reveal mt-14 flex items-center justify-between rounded-2xl border border-border bg-card p-6 transition-colors hover:border-accent-500/40">
        <div>
          <p className="font-semibold">Still curious?</p>
          <p className="text-sm text-muted-foreground">[PLACEHOLDER] Read the technical brief.</p>
        </div>
        <a href="#" className="group inline-flex items-center gap-2 text-sm font-medium text-accent-500 hover:text-accent-400">
          Read the brief <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
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
          <Wordmark />
          <p className="mt-3 max-w-xs text-sm text-muted-foreground">
            An offline expense tracker for people who like their money — and their data — kept close.
          </p>
        </div>
        <FooterCol title="Company" links={[["Features", "#features"], ["Guide", "/guide"], ["Privacy", "#privacy"], ["FAQ", "#faq"]]} />
        <FooterCol title="Legal" links={[["Privacy Policy", "/privacy"], ["Terms", "/terms"]]} />
        <div>
          <p className="text-sm font-semibold">Contact</p>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            <li>
              <a href="mailto:hello@dotzie.app" className="hover:text-foreground">hello@dotzie.app</a>
            </li>
          </ul>
          <p className="mt-6 text-sm font-semibold">Follow</p>
          <div className="mt-3 flex gap-2" aria-label="Social links">
            {[
              { label: "Twitter / X", handle: "@dotzieapp", href: "https://twitter.com/dotzieapp", Icon: Twitter },
              { label: "Instagram", handle: "@dotzie.app", href: "https://instagram.com/dotzie.app", Icon: Instagram },
              { label: "GitHub", handle: "dotzie", href: "https://github.com/dotzie", Icon: Github },
              { label: "LinkedIn", handle: "dotzie", href: "https://linkedin.com/company/dotzie", Icon: Linkedin },
            ].map(({ label, handle, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`${label} — ${handle}`}
                title={`${label} · ${handle}`}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:-translate-y-0.5 hover:border-accent-500/60 hover:text-foreground"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
          <p className="mt-3 text-xs text-muted-foreground">@dotzieapp · [PLACEHOLDER]</p>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-2 px-6 py-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Dotzie. [PLACEHOLDER] All rights reserved.</p>
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
            <a href={href} className="transition-colors hover:text-foreground">{label}</a>
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
      <path d="M3.6 2.2C3.2 2.5 3 3 3 3.6v16.8c0 .6.2 1.1.6 1.4l9.8-9.8L3.6 2.2z" fill="#6B5CFF" />
      <path d="M17.6 8.4L14.4 6.6 4 1c-.2-.1-.4-.1-.6-.1l10 10L17.6 8.4z" fill="#8A7EFF" />
      <path d="M21 10.7l-3.4-1.9-3.2 3.2 3.2 3.2 3.4-1.9c1-.5 1-2.1 0-2.6z" fill="#4A3FCC" />
      <path d="M3.4 22.9c.2 0 .4 0 .6-.1l10.4-5.7 3.2-1.8-3.8-3.8L3.4 22.9z" fill="#5D50EC" />
    </svg>
  );
}
