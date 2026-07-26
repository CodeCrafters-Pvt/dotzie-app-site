import { useEffect, useState } from "react";
import {
  ACCENTS,
  ACCENT_STORAGE_KEY as STORAGE_KEY,
  DEFAULT_ACCENT,
  type AccentKey,
} from "@/data/accents";

export function AccentSwitcher() {
  const [active, setActive] = useState<AccentKey>(DEFAULT_ACCENT);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = (localStorage.getItem(STORAGE_KEY) as AccentKey) || DEFAULT_ACCENT;
      setActive(saved);
      document.documentElement.setAttribute("data-accent", saved);
    } catch {}
  }, []);

  const pick = (key: AccentKey) => {
    setActive(key);
    document.documentElement.setAttribute("data-accent", key);
    try {
      localStorage.setItem(STORAGE_KEY, key);
    } catch {}
    setOpen(false);
  };

  const current = ACCENTS.find((a) => a.key === active) ?? ACCENTS[0];

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Choose accent color"
        aria-expanded={open}
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card transition-colors hover:bg-elevated"
      >
        <span
          className="h-4 w-4 rounded-full ring-2 ring-background"
          style={{ background: current.swatch }}
        />
      </button>
      {open ? (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} aria-hidden />
          <div className="absolute right-0 z-50 mt-2 flex gap-1.5 rounded-full border border-border bg-popover p-1.5 shadow-xl animate-fade-up">
            {ACCENTS.map((a) => (
              <button
                key={a.key}
                type="button"
                onClick={() => pick(a.key)}
                aria-label={a.label}
                title={a.label}
                className={`h-7 w-7 rounded-full transition-transform hover:scale-110 ${
                  a.key === active ? "ring-2 ring-offset-2 ring-offset-popover ring-foreground" : ""
                }`}
                style={{ background: a.swatch }}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
