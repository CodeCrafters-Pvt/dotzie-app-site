import { useMemo, useState } from "react";

type Store = "ios" | "android";

const STORES: Record<Store, { label: string; value: string; caption: string }> = {
  ios: {
    label: "App Store",
    value: "https://apps.apple.com/app/dotzie",
    caption: "Scan with your iPhone camera to open the App Store.",
  },
  android: {
    label: "Google Play",
    value: "https://play.google.com/store/apps/details?id=app.dotzie",
    caption: "Scan with your Android camera to open Google Play.",
  },
};

export function DownloadQR() {
  const [store, setStore] = useState<Store>("ios");
  const active = STORES[store];

  return (
    <div className="mt-8 flex animate-fade-up flex-wrap items-center gap-4 [animation-delay:480ms]">
      <div className="rounded-2xl border border-border bg-white p-2 shadow-sm">
        <Qr value={active.value} />
      </div>

      <div className="min-w-[15rem] flex-1">
        <div
          role="tablist"
          aria-label="Choose a store"
          className="relative inline-flex rounded-full border border-border bg-card p-1 text-xs font-medium"
        >
          <span
            aria-hidden
            className="absolute inset-y-1 w-[calc(50%-0.25rem)] rounded-full bg-foreground transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
            style={{
              transform: store === "ios" ? "translateX(0)" : "translateX(100%)",
            }}
          />
          {(Object.keys(STORES) as Store[]).map((key) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={store === key}
              onClick={() => setStore(key)}
              className={`relative z-10 rounded-full px-4 py-1.5 transition-colors ${
                store === key ? "text-background" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {STORES[key].label}
            </button>
          ))}
        </div>
        <p className="mt-2 max-w-[16rem] text-xs leading-relaxed text-muted-foreground">
          {active.caption}
        </p>
      </div>
    </div>
  );
}

/**
 * Placeholder QR that renders a deterministic, QR-looking grid from a seed.
 * (Real store URLs are wired in above; swap for a generated code at launch.)
 */
function Qr({ value, size = 88 }: { value: string; size?: number }) {
  const N = 21;

  const cells = useMemo(() => {
    const rnd = seededRandom(value);
    const inZone = (x: number, y: number) =>
      (x < 8 && y < 8) || (x >= N - 8 && y < 8) || (x < 8 && y >= N - 8);
    const relOn = (rx: number, ry: number) => {
      const edge = rx === 0 || ry === 0 || rx === 6 || ry === 6;
      const center = rx >= 2 && rx <= 4 && ry >= 2 && ry <= 4;
      return edge || center;
    };
    const finderOn = (x: number, y: number) => {
      if (x < 7 && y < 7) return relOn(x, y);
      if (x >= N - 7 && y < 7) return relOn(x - (N - 7), y);
      if (x < 7 && y >= N - 7) return relOn(x, y - (N - 7));
      return false;
    };

    const out: boolean[] = [];
    for (let y = 0; y < N; y++) {
      for (let x = 0; x < N; x++) {
        out.push(inZone(x, y) ? finderOn(x, y) : rnd() > 0.5);
      }
    }
    return out;
  }, [value]);

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${N} ${N}`}
      shapeRendering="crispEdges"
      role="img"
      aria-label="QR code"
    >
      {cells.map((on, i) =>
        on ? (
          <rect key={i} x={i % N} y={Math.floor(i / N)} width={1} height={1} fill="var(--qr-ink)" />
        ) : null,
      )}
    </svg>
  );
}

function seededRandom(seed: string) {
  let h = 1779033703 ^ seed.length;
  for (let i = 0; i < seed.length; i++) {
    h = Math.imul(h ^ seed.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  return () => {
    h = Math.imul(h ^ (h >>> 16), 2246822507);
    h = Math.imul(h ^ (h >>> 13), 3266489909);
    h ^= h >>> 16;
    return (h >>> 0) / 4294967296;
  };
}
