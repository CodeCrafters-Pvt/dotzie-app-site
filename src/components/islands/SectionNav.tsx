import { useEffect, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

/** Labels for the deck's slides, keyed by the section id in the DOM. */
const LABELS: Record<string, string> = {
  top: "Home",
  screens: "Screens",
  track: "Everyday",
  plan: "Planning",
  included: "Extras",
  pricing: "Pricing",
  privacy: "Privacy",
  faq: "FAQ",
  "site-footer": "Contact",
};

type DeckState = { index: number; ids: string[] };

export function SectionNav() {
  const [{ index, ids }, setState] = useState<DeckState>({ index: 0, ids: [] });

  // Deck.astro owns the index; this only reads it and calls back in, and may
  // hydrate either side of the engine booting.
  useEffect(() => {
    const sync = () => {
      const deck = window.dotzieDeck;
      if (deck) setState({ index: deck.index, ids: deck.ids });
    };
    sync();
    window.addEventListener("deck:ready", sync);
    window.addEventListener("deck:change", sync);
    return () => {
      window.removeEventListener("deck:ready", sync);
      window.removeEventListener("deck:change", sync);
    };
  }, []);

  if (ids.length < 2) return null;

  const go = (i: number, wrap = false) => window.dotzieDeck?.go(i, { wrap });
  const label = (id: string, i: number) => LABELS[id] ?? `Slide ${i + 1}`;
  const isFirst = index === 0;
  const isLast = index === ids.length - 1;

  const dots = (
    <ul className="flex items-center gap-2 lg:flex-col lg:gap-3">
      {ids.map((id, i) => (
        <li key={id}>
          <button
            type="button"
            onClick={() => go(i)}
            aria-label={`Go to ${label(id, i)}`}
            aria-current={i === index ? "true" : undefined}
            className="group relative flex items-center justify-center p-0.5 lg:p-1"
          >
            <span
              className={`block rounded-full transition-all duration-300 ${
                i === index
                  ? "h-1.5 w-6 bg-accent-500 lg:h-6 lg:w-1.5"
                  : "h-1.5 w-1.5 bg-border group-hover:bg-accent-400"
              }`}
            />
            <span className="pointer-events-none absolute bottom-7 whitespace-nowrap rounded-md border border-border bg-card px-2 py-1 text-xs text-foreground opacity-0 shadow-sm transition-opacity duration-200 group-hover:opacity-100 max-lg:hidden lg:bottom-auto lg:right-6">
              {label(id, i)}
            </span>
          </button>
        </li>
      ))}
    </ul>
  );

  const stepButton = (dir: -1 | 1, disabled: boolean) => (
    <button
      type="button"
      onClick={() => go(index + dir, isLast && dir === 1)}
      disabled={disabled}
      aria-label={dir === 1 ? (isLast ? "Back to start" : "Next slide") : "Previous slide"}
      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-card text-muted-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-accent-500/60 hover:text-accent-500 disabled:pointer-events-none disabled:opacity-30"
    >
      {dir === 1 ? (
        <ChevronDown className={`h-4 w-4 transition-transform ${isLast ? "rotate-180" : ""}`} />
      ) : (
        <ChevronUp className="h-4 w-4" />
      )}
    </button>
  );

  return (
    <>
      {/* Desktop: rail on the right edge. */}
      <nav
        aria-label="Slides"
        className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 lg:flex lg:flex-col lg:items-center lg:gap-4"
      >
        {dots}
        <div className="flex flex-col gap-2">
          {stepButton(-1, isFirst)}
          {stepButton(1, false)}
        </div>
      </nav>

      {/* Mobile: bar along the bottom, where a thumb can reach it. */}
      <nav
        aria-label="Slides"
        className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-3 border-t border-border/60 bg-background/80 px-4 py-2 backdrop-blur-xl lg:hidden"
      >
        {stepButton(-1, isFirst)}
        <div className="min-w-0 overflow-x-auto">{dots}</div>
        {stepButton(1, false)}
      </nav>
    </>
  );
}
