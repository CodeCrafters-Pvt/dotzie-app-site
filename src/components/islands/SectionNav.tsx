import { useCallback, useEffect, useRef, useState } from "react";

/** Labels for the page's sections, keyed by their id in the DOM. */
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

export function SectionNav() {
  const [ids, setIds] = useState<string[]>([]);
  const [index, setIndex] = useState(0);
  const sections = useRef<HTMLElement[]>([]);

  const go = useCallback((i: number) => {
    const els = sections.current;
    els[Math.max(0, Math.min(els.length - 1, i))]?.scrollIntoView({ block: "start" });
  }, []);

  useEffect(() => {
    const main = document.querySelector("main");
    if (!main) return;

    const els = Array.from(main.children).filter(
      (el): el is HTMLElement => el instanceof HTMLElement && el.matches("section[id], footer[id]"),
    );
    sections.current = els;
    setIds(els.map((el) => el.id));

    // Whichever section covers the middle band of the viewport is the current
    // one — a plain threshold would flip early on tall sections.
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setIndex(els.indexOf(e.target as HTMLElement));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  if (ids.length < 2) return null;

  const label = (id: string, i: number) => LABELS[id] ?? `Section ${i + 1}`;

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

  // Position only — moving between sections is the scrollbar's job, or the
  // keyboard's. The dots stay clickable as a jump-to.
  return (
    <>
      {/* Desktop: rail on the right edge. */}
      <nav
        aria-label="Sections"
        className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 lg:flex lg:flex-col lg:items-center"
      >
        {dots}
      </nav>

      {/* Mobile: bar along the bottom, where a thumb can reach it. */}
      <nav
        aria-label="Sections"
        className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-center border-t border-border/60 bg-background/80 px-4 py-2 backdrop-blur-xl lg:hidden"
      >
        <div className="min-w-0 overflow-x-auto">{dots}</div>
      </nav>
    </>
  );
}
