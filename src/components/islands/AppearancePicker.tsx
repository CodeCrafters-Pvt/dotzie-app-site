import { useEffect, useId, useRef, useState } from "react";
import { ACCENTS, ACCENT_STORAGE_KEY, DEFAULT_ACCENT } from "@/data/accents";

export function AppearancePicker() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("system");
  const [accent, setAccent] = useState<string>(DEFAULT_ACCENT);
  const root = useRef<HTMLDivElement>(null),
    trigger = useRef<HTMLButtonElement>(null);
  const id = useId();
  useEffect(() => {
    const sync = () => {
      setAccent(document.documentElement.dataset.accent || DEFAULT_ACCENT);
      try {
        const value = localStorage.getItem("dotzee-theme");
        setMode(value === "light" || value === "dark" ? value : "system");
      } catch {}
    };
    sync();
    window.addEventListener("storage", sync);
    return () => window.removeEventListener("storage", sync);
  }, []);
  useEffect(() => {
    if (!open) return;
    const outside = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        trigger.current?.focus();
      }
    };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", outside);
      document.removeEventListener("keydown", escape);
    };
  }, [open]);
  const save = (key: string, value: string) => {
    try {
      localStorage.setItem(key, value);
    } catch {}
  };
  return (
    <div
      className="appearance-picker"
      ref={root}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false);
      }}
    >
      <button
        ref={trigger}
        className="appearance-trigger"
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen(!open)}
      >
        <span className="appearance-dot" />
        Appearance <span aria-hidden="true">⌄</span>
      </button>
      {open && (
        <div className="appearance-panel" id={id}>
          <p>Appearance</p>
          <div className="mode-segments" role="group" aria-label="Colour mode">
            {["light", "dark", "system"].map((value) => (
              <button
                type="button"
                key={value}
                aria-pressed={mode === value}
                onClick={() => {
                  setMode(value);
                  save("dotzee-theme", value);
                  document.documentElement.classList.toggle(
                    "dark",
                    value === "dark" ||
                      (value === "system" && matchMedia("(prefers-color-scheme: dark)").matches),
                  );
                  window.dispatchEvent(new Event("dotzie-theme"));
                }}
              >
                {value[0].toUpperCase() + value.slice(1)}
              </button>
            ))}
          </div>
          <p className="palette-label">Your colour</p>
          <div className="theme-swatches" role="group" aria-label="Theme colour">
            {ACCENTS.map((a) => (
              <button
                type="button"
                key={a.key}
                aria-label={a.label}
                title={a.label}
                aria-pressed={accent === a.key}
                onClick={() => {
                  setAccent(a.key);
                  document.documentElement.dataset.accent = a.key;
                  save(ACCENT_STORAGE_KEY, a.key);
                  window.dispatchEvent(new Event("dotzie-appearance"));
                }}
              >
                <span
                  style={{
                    background:
                      a.key === "monochrome"
                        ? "linear-gradient(135deg,#171717 50%,#f2f2f2 50%)"
                        : a.swatch,
                  }}
                />
              </button>
            ))}
          </div>
          <div className="palette-caption" aria-live="polite">
            {ACCENTS.find((a) => a.key === accent)?.label} · page &amp; Dotzie
          </div>
        </div>
      )}
    </div>
  );
}
