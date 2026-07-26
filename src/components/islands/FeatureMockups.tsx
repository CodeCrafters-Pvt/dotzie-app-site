import { useEffect, useState } from "react";

/** Loop through `count` steps, advancing every `ms`. */
function useStep(count: number, ms: number) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setStep((p) => (p + 1) % count), ms);
    return () => clearInterval(t);
  }, [count, ms]);
  return step;
}

const CARD =
  "relative overflow-hidden rounded-3xl border border-border bg-card p-5 shadow-sm sm:p-6";

function Cursor({ leftPct, top, pressed }: { leftPct: number; top: number; pressed?: boolean }) {
  return (
    <div
      className="pointer-events-none absolute z-30 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
      style={{ left: `${leftPct}%`, top }}
      aria-hidden
    >
      <div
        className="transition-transform duration-200"
        style={{ transform: `scale(${pressed ? 0.82 : 1})` }}
      >
        <svg width="22" height="22" viewBox="0 0 24 24">
          <path
            d="M5 3l14 6.5-5.8 2.2L11 18 5 3z"
            fill="#fff"
            stroke="#111"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      {pressed ? (
        <span className="absolute -left-1 -top-1 h-6 w-6 rounded-full bg-accent-500/40 animate-ping" />
      ) : null}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 1. Track — type an amount, tap Add, a new expense drops in.        */
/* ------------------------------------------------------------------ */
export function TrackMockup() {
  const step = useStep(4, 1500);
  const typed = step >= 1;
  const atAdd = step === 1 || step === 2;
  const pressed = step === 2;
  const rowIn = step === 3;
  const cursor = atAdd ? { l: 50, t: 156 } : rowIn ? { l: 64, t: 212 } : { l: 52, t: 258 };

  return (
    <div className={CARD}>
      <Cursor leftPct={cursor.l} top={cursor.t} pressed={pressed} />

      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold">Add expense</p>
        <span className="inline-flex items-center gap-1 rounded-full bg-accent-500/10 px-2.5 py-1 text-[11px] font-medium text-accent-500">
          <span aria-hidden>✈</span> Airplane mode
        </span>
      </div>

      <div className="mt-4 rounded-2xl bg-background p-4 text-center">
        <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Amount</p>
        <p className="mt-1 font-display text-3xl">
          {typed ? (
            <>
              <span className="text-muted-foreground">$</span>24
              <span className="text-muted-foreground">.50</span>
            </>
          ) : (
            <span className="text-muted-foreground/50">$0.00</span>
          )}
          <span
            className={`ml-0.5 inline-block h-6 w-[2px] translate-y-1 rounded-full bg-accent-500 align-middle ${
              step === 0 ? "animate-pulse" : "opacity-0"
            }`}
          />
        </p>
      </div>

      <div
        className={`mt-3 flex h-11 items-center justify-center rounded-2xl text-sm font-semibold text-white transition-transform ${
          pressed ? "scale-[0.97]" : ""
        }`}
        style={{ background: "var(--accent-500)" }}
      >
        Add expense
      </div>

      <div className="mt-4 min-h-[56px]">
        <div
          className={`flex items-center gap-3 rounded-2xl bg-background p-3 transition-all duration-500 ${
            rowIn ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
          }`}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted text-sm">
            🍔
          </span>
          <span className="flex-1 text-sm font-medium">Lunch</span>
          <span className="text-sm text-muted-foreground">−$24.50</span>
          <span className="text-accent-500" aria-hidden>
            ✓
          </span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 2. Split — tap "Settle up", balances clear to settled.            */
/* ------------------------------------------------------------------ */
export function SplitMockup() {
  const step = useStep(4, 1600);
  const atBtn = step === 1 || step === 2;
  const pressed = step === 2;
  const settled = step === 3;
  const cursor = atBtn ? { l: 50, t: 232 } : { l: 52, t: 268 };

  const Person = ({ name }: { name: string }) => (
    <div className="flex items-center gap-3 rounded-2xl bg-background p-3">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-base">
        🧑
      </span>
      <span className="flex-1 text-sm font-medium">{name} owes you</span>
      {settled ? (
        <span className="text-sm font-semibold text-emerald-600 dark:text-emerald-400">
          Settled ✓
        </span>
      ) : (
        <span className="text-sm text-muted-foreground">$20.00</span>
      )}
    </div>
  );

  return (
    <div className={CARD}>
      <Cursor leftPct={cursor.l} top={cursor.t} pressed={pressed} />

      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold">Dinner at Nara</p>
        <span className="text-[11px] text-muted-foreground">3 friends · IOU</span>
      </div>

      <div className="mt-4 space-y-2">
        <Person name="Sam" />
        <Person name="Ana" />
      </div>

      <div
        className={`mt-4 flex items-center justify-between rounded-2xl px-4 py-3 transition-colors ${
          settled ? "bg-emerald-500/10" : "bg-accent-500/10"
        }`}
      >
        <span className="text-xs font-medium text-muted-foreground">
          {settled ? "All settled" : "You're owed"}
        </span>
        <span
          className={`text-sm font-semibold ${
            settled ? "text-emerald-600 dark:text-emerald-400" : "text-accent-600"
          }`}
        >
          {settled ? "$0.00" : "$40.00"}
        </span>
      </div>

      <div
        className={`mt-3 flex h-11 items-center justify-center rounded-2xl text-sm font-semibold transition-all ${
          pressed ? "scale-[0.97]" : ""
        } ${settled ? "bg-muted text-muted-foreground" : "text-white"}`}
        style={settled ? undefined : { background: "var(--accent-500)" }}
      >
        {settled ? "Settled up ✓" : "Settle up"}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 3. Plan — flip on auto-repeat, recurring items + total light up.  */
/* ------------------------------------------------------------------ */
export function PlanMockup() {
  const step = useStep(4, 1500);
  const atToggle = step === 1 || step === 2;
  const pressed = step === 2;
  const on = step === 3;
  const cursor = atToggle ? { l: 84, t: 34 } : { l: 52, t: 262 };

  const Row = ({ emoji, name, day, amt, pos }: any) => (
    <div className="flex items-center gap-3 rounded-2xl bg-background p-3">
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-base">
        {emoji}
      </span>
      <span className="flex-1">
        <span className="block text-sm font-medium">{name}</span>
        <span
          className={`block text-[11px] transition-colors ${
            on ? "text-accent-500" : "text-muted-foreground"
          }`}
        >
          {on ? `Repeats · ${day}` : "One-off"}
        </span>
      </span>
      <span
        className={`text-sm font-semibold ${
          pos ? "text-emerald-600 dark:text-emerald-400" : "text-muted-foreground"
        }`}
      >
        {amt}
      </span>
    </div>
  );

  return (
    <div className={CARD}>
      <Cursor leftPct={cursor.l} top={cursor.t} pressed={pressed} />

      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold">Auto-repeat</p>
        <span
          className={`flex h-6 w-10 items-center rounded-full p-0.5 transition-colors ${
            on ? "bg-accent-500" : "bg-muted"
          }`}
        >
          <span
            className={`h-5 w-5 rounded-full bg-white shadow transition-transform ${
              on ? "translate-x-4" : "translate-x-0"
            }`}
          />
        </span>
      </div>

      <div className="mt-4 space-y-2">
        <Row emoji="💰" name="Salary" day="1st" amt="+$3,200" pos />
        <Row emoji="🏠" name="Rent" day="5th" amt="−$1,100" />
      </div>

      <div className="mt-4 rounded-2xl bg-background p-3">
        <div className="flex items-center justify-between text-xs">
          <span className="font-medium">Scheduled next month</span>
          <span
            className={`font-semibold transition-colors ${
              on ? "text-accent-600" : "text-muted-foreground"
            }`}
          >
            {on ? "$2,100" : "—"}
          </span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 4. Events — tap + to raise a category, event total climbs.        */
/* ------------------------------------------------------------------ */
export function EventMockup() {
  const step = useStep(6, 1100);
  const inc = (step >= 2 ? 1 : 0) + (step >= 4 ? 1 : 0);
  const food = 200 + inc * 20;
  const total = 1000 + food;
  const atPlus = step >= 1 && step <= 4;
  const pressed = step === 2 || step === 4;
  const cursor = atPlus ? { l: 86, t: 150 } : { l: 52, t: 262 };

  return (
    <div className={CARD}>
      <Cursor leftPct={cursor.l} top={cursor.t} pressed={pressed} />

      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold">Bali trip</p>
        <span className="text-[11px] text-muted-foreground">Event budget</span>
      </div>

      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-3 rounded-2xl bg-background p-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-base">
            ✈️
          </span>
          <span className="flex-1 text-sm font-medium">Flights</span>
          <span className="text-sm text-muted-foreground">$600</span>
        </div>

        <div className="flex items-center gap-3 rounded-2xl bg-background p-3 ring-1 ring-accent-500/30">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-base">
            🍜
          </span>
          <span className="flex-1 text-sm font-medium">Food</span>
          <span className="flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-muted text-muted-foreground">
              −
            </span>
            <span className="w-12 text-center text-sm font-semibold tabular-nums">${food}</span>
            <span
              className={`flex h-6 w-6 items-center justify-center rounded-md text-white transition-transform ${
                pressed ? "scale-90" : ""
              }`}
              style={{ background: "var(--accent-500)" }}
            >
              +
            </span>
          </span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between rounded-2xl bg-accent-500/10 px-4 py-3">
        <span className="text-xs font-medium text-muted-foreground">Trip total</span>
        <span className="text-sm font-semibold tabular-nums text-accent-600">
          ${total.toLocaleString()}
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 5. SMS — a bank text is read and drafted into an expense.         */
/* ------------------------------------------------------------------ */
export function SmsMockup() {
  const step = useStep(3, 1700);
  const reading = step === 0;
  const parsed = step >= 1;
  const added = step === 2;

  return (
    <div className={CARD}>
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold">New message</p>
        <span className="text-[11px] text-muted-foreground">HNB Bank</span>
      </div>

      <div className="mt-4 max-w-[88%] rounded-2xl rounded-tl-sm bg-background p-3 text-[12px] leading-relaxed">
        LKR <span className="font-semibold">2,400.00</span> debited at KEELLS CITY on 12 Jun. Avail
        bal LKR 45,120.
      </div>

      <div className="mt-3 flex items-center gap-2 text-[11px]">
        <span
          className={`inline-flex h-4 w-4 items-center justify-center rounded-full text-[9px] ${
            reading
              ? "animate-pulse bg-accent-500/20 text-accent-500"
              : "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400"
          }`}
        >
          {reading ? "•••" : "✓"}
        </span>
        <span className="text-muted-foreground">
          {reading ? "Reading your bank text…" : "Drafted an expense for you"}
        </span>
      </div>

      <div
        className={`mt-3 flex items-center gap-3 rounded-2xl bg-background p-3 transition-all duration-500 ${
          parsed ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
        }`}
      >
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-base">
          🛒
        </span>
        <span className="flex-1">
          <span className="block text-sm font-medium">Keells City</span>
          <span className="block text-[11px] text-muted-foreground">Groceries</span>
        </span>
        <span className="text-sm text-muted-foreground">−Rs 2,400</span>
      </div>

      <div
        className={`mt-2 text-center text-[11px] font-medium text-emerald-600 transition-opacity dark:text-emerald-400 ${
          added ? "opacity-100" : "opacity-0"
        }`}
      >
        ✓ Added to expenses
      </div>
    </div>
  );
}
