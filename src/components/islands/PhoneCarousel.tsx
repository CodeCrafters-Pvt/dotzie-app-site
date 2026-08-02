import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowLeft,
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

export function PhoneCarousel() {
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
    <div className="relative mx-auto mt-2 max-w-6xl px-4 pb-6 sm:px-6 lg:pb-8">
      <div className="reveal relative mx-auto h-[440px] w-full max-w-5xl sm:h-[500px]">
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

      <div className="mt-3 flex flex-col items-center gap-3">
        <p className="font-display text-lg italic text-muted-foreground">
          <span className="text-foreground">{screens[active].label}</span>
          <span className="mx-2 opacity-40">·</span>
          <span className="tabular-nums text-sm">
            {active + 1} / {n}
          </span>
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
      <div className="relative h-[400px] w-[192px] rounded-[2.2rem] border border-border bg-device-frame p-2 shadow-2xl ring-1 ring-white/5 sm:h-[460px] sm:w-[220px] sm:rounded-[2.6rem] sm:p-2.5">
        <div className="absolute left-1/2 top-2 z-10 h-5 w-20 -translate-x-1/2 rounded-full bg-black/90 sm:h-6 sm:w-24" />
        <div className="relative h-full w-full overflow-hidden rounded-[1.75rem] bg-device-screen text-device-foreground sm:rounded-[2.1rem]">
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
        <div className="mt-4 rounded-2xl bg-device-surface p-4">
          <p className="text-[11px] text-white/60">
            <span aria-hidden>👋</span> Hey Kavi,
          </p>
          <p className="mt-1 text-[15px] leading-tight">
            you spent <span className="font-semibold">$154.20</span> today
          </p>
          <div className="mt-4 flex justify-between text-[11px] text-white/70">
            <div>
              <p className="flex items-center gap-1">
                <TrendingDown className="h-3 w-3 text-emerald-400" /> Week{" "}
                <span className="text-emerald-400">-12%</span>
              </p>
              <p className="mt-1 text-white">$412.35</p>
            </div>
            <div className="text-right">
              <p className="flex items-center gap-1 justify-end">
                <TrendingUp className="h-3 w-3 text-rose-400" /> Month{" "}
                <span className="text-rose-400">+8%</span>
              </p>
              <p className="mt-1 text-white">$1,284.40</p>
            </div>
          </div>
        </div>

        <div className="mt-3 rounded-2xl bg-device-surface p-4">
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
            <div key={label} className="rounded-xl bg-device-surface p-3">
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
          <circle
            cx="21"
            cy="21"
            r="15.9155"
            fill="transparent"
            stroke="var(--device-surface)"
            strokeWidth="6"
          />
          <circle
            cx="21"
            cy="21"
            r="15.9155"
            fill="transparent"
            stroke="var(--accent-400)"
            strokeWidth="6"
            strokeDasharray="52 100"
          />
          <circle
            cx="21"
            cy="21"
            r="15.9155"
            fill="transparent"
            stroke="var(--accent-600)"
            strokeWidth="6"
            strokeDasharray="26 100"
            strokeDashoffset="-52"
          />
          <circle
            cx="21"
            cy="21"
            r="15.9155"
            fill="transparent"
            stroke="var(--accent-300)"
            strokeWidth="6"
            strokeDasharray="22 100"
            strokeDashoffset="-78"
          />
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
          {
            icon: Utensils,
            label: "Dining out",
            pct: "40% of expenses",
            amt: "$514.00",
            w: "w-2/3",
            tone: "bg-accent-500",
          },
          {
            icon: Car,
            label: "Transport",
            pct: "16% of expenses",
            amt: "$205.40",
            w: "w-1/3",
            tone: "bg-accent-300",
          },
          {
            icon: Film,
            label: "Leisure",
            pct: "12% of expenses",
            amt: "$154.20",
            w: "w-1/4",
            tone: "bg-accent-400",
          },
        ].map((row) => (
          <div key={row.label} className="rounded-xl bg-device-surface p-3">
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
  const items: Array<{
    icon: any;
    title: string;
    sub: string;
    amt: string;
    time: string;
    pos?: boolean;
  }> = [
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
        <div className="rounded-xl bg-device-surface p-3">
          <p className="text-[10px] text-white/50">Income</p>
          <p className="text-[13px] font-semibold text-emerald-400">$1,094.00</p>
        </div>
        <div className="rounded-xl bg-device-surface p-3">
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
          <li key={i} className="flex items-center gap-3 rounded-xl bg-device-surface p-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5">
              <it.icon className="h-4 w-4 text-accent-300" />
            </span>
            <div className="flex-1">
              <p className="text-[12px] font-medium">{it.title}</p>
              <p className="text-[10px] text-white/50">{it.sub}</p>
            </div>
            <div className="text-right">
              <p className={`text-[12px] ${it.pos ? "text-emerald-400" : "text-rose-400"}`}>
                {it.amt}
              </p>
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
            <div key={b.label} className="rounded-xl bg-device-surface p-3">
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
            <div key={g.label} className="rounded-2xl bg-device-surface p-4">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-500/20">
                  <g.icon className="h-4 w-4 text-accent-300" />
                </span>
                <div className="flex-1">
                  <p className="text-[12px] font-medium">{g.label}</p>
                  <p className="text-[10px] text-white/50">
                    ${g.cur} of ${g.tgt}
                  </p>
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
        <div className="rounded-xl bg-device-surface p-3">
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
              i === 0 ? "bg-accent-500/25 ring-1 ring-accent-400" : "bg-device-surface"
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
