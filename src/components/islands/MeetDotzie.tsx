import { useEffect, useRef, useState } from "react";
import { DotzieMascot, type Gesture } from "./DotzieMascot";

type Position = { x: number; y: number };
const WIDTH = 160,
  HEIGHT = 184;
function clampPosition(p: Position): Position {
  return {
    x: Math.max(8, Math.min(innerWidth - WIDTH - 8, p.x)),
    y: Math.max(72, Math.min(innerHeight - HEIGHT - 44, p.y)),
  };
}
export function MeetDotzie() {
  const [open, setOpen] = useState(false);
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [cue, setCue] = useState<{ gesture: Gesture; id: number }>();
  const launcher = useRef<HTMLButtonElement>(null);
  const mascot = useRef<HTMLButtonElement>(null);
  const drag = useRef<{ x: number; y: number; origin: Position; moved: boolean } | null>(null);
  const reactionCount = useRef(0);
  const reactToMove = () => {
    setCue({ gesture: reactionCount.current++ % 2 === 0 ? "cheer" : "dance", id: Date.now() });
  };
  const close = () => {
    setOpen(false);
    requestAnimationFrame(() => launcher.current?.focus({ preventScroll: true }));
  };
  useEffect(() => {
    if (!open) return;
    mascot.current?.focus({ preventScroll: true });
    const resize = () => setPosition((p) => clampPosition(p));
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, [open]);
  return (
    <>
      {!open && (
        <button
          ref={launcher}
          type="button"
          className="meet-dotzie"
          onClick={() => {
            setPosition(
              clampPosition({ x: innerWidth - WIDTH - 20, y: innerHeight - HEIGHT - 52 }),
            );
            setOpen(true);
          }}
        >
          Meet Dotzie <span aria-hidden="true">✦</span>
        </button>
      )}
      {open && (
        <div
          className="floating-dotzie"
          role="group"
          aria-label="Dotzie companion"
          style={{ left: position.x, top: position.y }}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              e.stopPropagation();
              close();
            }
          }}
        >
          <button
            type="button"
            className="floating-dotzie-close"
            aria-label="Close Dotzie"
            onClick={close}
          >
            ×
          </button>
          <button
            ref={mascot}
            type="button"
            className="floating-dotzie-drag"
            aria-label="Drag Dotzie to move"
            aria-describedby="dotzie-move-help"
            onPointerDown={(e) => {
              if (e.button !== 0) return;
              e.currentTarget.setPointerCapture(e.pointerId);
              drag.current = { x: e.clientX, y: e.clientY, origin: position, moved: false };
            }}
            onPointerMove={(e) => {
              const d = drag.current;
              if (!d) return;
              const dx = e.clientX - d.x,
                dy = e.clientY - d.y;
              if (Math.hypot(dx, dy) > 5) d.moved = true;
              if (d.moved) setPosition(clampPosition({ x: d.origin.x + dx, y: d.origin.y + dy }));
            }}
            onPointerUp={(e) => {
              if (drag.current?.moved) reactToMove();
              drag.current = null;
              if (e.currentTarget.hasPointerCapture(e.pointerId))
                e.currentTarget.releasePointerCapture(e.pointerId);
            }}
            onPointerCancel={() => {
              drag.current = null;
            }}
            onKeyDown={(e) => {
              const delta: Record<string, Position> = {
                ArrowLeft: { x: -20, y: 0 },
                ArrowRight: { x: 20, y: 0 },
                ArrowUp: { x: 0, y: -20 },
                ArrowDown: { x: 0, y: 20 },
              };
              const d = delta[e.key];
              if (d) {
                e.preventDefault();
                e.stopPropagation();
                setPosition((p) => clampPosition({ x: p.x + d.x, y: p.y + d.y }));
              }
            }}
            onKeyUp={(e) => {
              if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key))
                reactToMove();
            }}
          >
            <DotzieMascot automatic={false} cue={cue} />
          </button>
          <span id="dotzie-move-help" className="sr-only">
            Use arrow keys to move Dotzie. Press Escape to close.
          </span>
        </div>
      )}
    </>
  );
}
