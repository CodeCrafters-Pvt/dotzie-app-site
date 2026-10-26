import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { MobileAppPreview } from "./MobileAppPreview";

const screens = [
  { key: "dashboard", label: "Dashboard", caption: "Your month at a glance." },
  { key: "activity", label: "Activity", caption: "Every expense, easy to find." },
  { key: "plan", label: "Spending plan", caption: "Make room for what matters." },
  { key: "events", label: "Events", caption: "Shared moments. Clear expenses." },
  { key: "insights", label: "Insights", caption: "Understand the story behind your spending." },
] as const;

export function PhoneCarousel() {
  const [active, setActive] = useState(0);
  const touch = useRef<{ x: number; y: number } | null>(null);
  const go = (direction: number) =>
    setActive((value) => (value + direction + screens.length) % screens.length);
  return (
    <div
      className="app-carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label="Explore Dotzie app screens"
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
          event.preventDefault();
          event.stopPropagation();
          go(event.key === "ArrowLeft" ? -1 : 1);
        }
      }}
    >
      <div
        className="app-phone-stage"
        onTouchStart={(event) => {
          const p = event.touches[0];
          touch.current = { x: p.clientX, y: p.clientY };
        }}
        onTouchEnd={(event) => {
          if (!touch.current) return;
          const p = event.changedTouches[0];
          const dx = p.clientX - touch.current.x,
            dy = p.clientY - touch.current.y;
          touch.current = null;
          if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.4) go(dx < 0 ? 1 : -1);
        }}
        onTouchCancel={() => {
          touch.current = null;
        }}
      >
        {screens.map((screen, i) => {
          let offset = i - active;
          if (offset > 2) offset -= screens.length;
          if (offset < -2) offset += screens.length;
          return (
            <div
              key={screen.key}
              className="app-phone-slide"
              data-position={offset}
              aria-hidden={i !== active}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${screens.length}: ${screen.label}`}
            >
              <div className="app-device">
                <div className="app-device-camera" aria-hidden="true" />
                <MobileAppPreview screen={screen.key} />
              </div>
            </div>
          );
        })}
        <button
          type="button"
          className="app-carousel-arrow previous"
          aria-label="Previous screen"
          onClick={() => go(-1)}
        >
          <ArrowLeft size={18} />
        </button>
        <button
          type="button"
          className="app-carousel-arrow next"
          aria-label="Next screen"
          onClick={() => go(1)}
        >
          <ArrowRight size={18} />
        </button>
      </div>
      <div className="app-carousel-caption" aria-live="polite" aria-atomic="true">
        <strong>{screens[active].label}</strong>
        <p>{screens[active].caption}</p>
      </div>
      <div className="app-carousel-pagination" role="group" aria-label="Choose an app screen">
        {screens.map((screen, i) => (
          <button
            type="button"
            key={screen.key}
            aria-label={`Show ${screen.label}`}
            aria-pressed={i === active}
            onClick={() => setActive(i)}
          >
            <span className="app-pagination-dot" />
            <span className="app-pagination-label">
              {screen.key === "plan" ? "Plan" : screen.label}
            </span>
          </button>
        ))}
        <span className="app-carousel-count">
          {active + 1} / {screens.length}
        </span>
      </div>
      <p className="app-preview-note">App previews · illustrative data</p>
    </div>
  );
}
