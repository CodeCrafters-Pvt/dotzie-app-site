import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

const SECTIONS = [
  { id: "top", label: "Home" },
  { id: "screens", label: "Screens" },
  { id: "track", label: "Everyday" },
  { id: "plan", label: "Planning" },
  { id: "included", label: "Extras" },
  { id: "pricing", label: "Pricing" },
  { id: "privacy", label: "Privacy" },
  { id: "faq", label: "FAQ" },
  { id: "site-footer", label: "Contact" },
];

export function SectionNav() {
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);
  activeRef.current = active;

  const scrollToIndex = (i: number) => {
    const clamped = Math.max(0, Math.min(SECTIONS.length - 1, i));
    document
      .getElementById(SECTIONS[clamped].id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Chevron wraps around; keyboard/dots clamp.
  const goToWrapped = (i: number) => {
    const wrapped = (i + SECTIONS.length) % SECTIONS.length;
    scrollToIndex(wrapped);
  };

  // Track the active slide.
  useEffect(() => {
    const els = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = SECTIONS.findIndex((s) => s.id === e.target.id);
            if (idx >= 0) setActive(idx);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Deck keyboard control: one whole slide per key, never resting between
  // (desktop only — mobile keeps native scrolling).
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    let cooling = false;
    const cool = () => {
      cooling = true;
      window.setTimeout(() => {
        cooling = false;
      }, 550);
    };

    const onKey = (e: KeyboardEvent) => {
      if (!mq.matches) return;
      const el = e.target as HTMLElement | null;
      const tag = el?.tagName;
      // Don't hijack typing or activating controls.
      if (
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        tag === "SELECT" ||
        tag === "BUTTON" ||
        tag === "A" ||
        tag === "SUMMARY" ||
        el?.isContentEditable
      ) {
        return;
      }

      switch (e.key) {
        case "ArrowDown":
        case "PageDown":
        case " ":
          e.preventDefault();
          if (!cooling) {
            cool();
            scrollToIndex(activeRef.current + 1);
          }
          break;
        case "ArrowUp":
        case "PageUp":
          e.preventDefault();
          if (!cooling) {
            cool();
            scrollToIndex(activeRef.current - 1);
          }
          break;
        case "Home":
          e.preventDefault();
          scrollToIndex(0);
          break;
        case "End":
          e.preventDefault();
          scrollToIndex(SECTIONS.length - 1);
          break;
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isLast = active === SECTIONS.length - 1;

  return (
    <nav
      aria-label="Page sections"
      className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 lg:flex lg:flex-col lg:items-center lg:gap-4"
    >
      <ul className="flex flex-col items-center gap-3">
        {SECTIONS.map((s, i) => (
          <li key={s.id}>
            <button
              type="button"
              onClick={() => scrollToIndex(i)}
              aria-label={`Go to ${s.label}`}
              aria-current={i === active ? "true" : undefined}
              className="group relative flex items-center justify-center py-1"
            >
              <span
                className={`block rounded-full transition-all duration-300 ${
                  i === active
                    ? "h-6 w-1.5 bg-accent-500"
                    : "h-1.5 w-1.5 bg-border group-hover:bg-accent-400"
                }`}
              />
              <span className="pointer-events-none absolute right-6 whitespace-nowrap rounded-md border border-border bg-card px-2 py-1 text-xs text-foreground opacity-0 shadow-sm transition-opacity duration-200 group-hover:opacity-100">
                {s.label}
              </span>
            </button>
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={() => goToWrapped(isLast ? 0 : active + 1)}
        aria-label={isLast ? "Back to top" : "Next section"}
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-muted-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:border-accent-500/60 hover:text-accent-500"
      >
        <ChevronDown
          className={`h-4 w-4 transition-transform duration-300 ${isLast ? "rotate-180" : ""}`}
        />
      </button>
    </nav>
  );
}
