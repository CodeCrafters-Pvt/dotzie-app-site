import { useEffect, useRef } from "react";
import type { AnimationItem } from "lottie-web";
export type Gesture = "wave" | "cheer" | "dance";
type Props = { active?: boolean; automatic?: boolean; cue?: { gesture: Gesture; id: number } };
// Same named paints and animation segments as the mobile app.
export function DotzieMascot({ active = true, automatic = true, cue }: Props) {
  const container = useRef<HTMLDivElement>(null);
  const action = useRef<(gesture: Gesture) => void>(() => {});
  const syncActivity = useRef<() => void>(() => {});
  const activity = useRef(active);
  activity.current = active;
  useEffect(() => {
    let disposed = false,
      visible = true,
      loaded = false;
    let player: AnimationItem | undefined;
    let timer: ReturnType<typeof setTimeout> | undefined;
    let animation: unknown;
    let lottie: typeof import("lottie-web").default;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const canMove = () =>
      !disposed && loaded && visible && activity.current && !document.hidden && !motion.matches;
    const idle = () => {
      if (!player || !loaded) return;
      if (canMove()) {
        player.loop = true;
        player.playSegments([0, 120], true);
      } else {
        player.resetSegments(true);
        player.goToAndStop(0, true);
      }
    };
    const schedule = () => {
      clearTimeout(timer);
      if (automatic && canMove())
        timer = setTimeout(
          () => {
            perform("wave");
          },
          18000 + Math.random() * 6000,
        );
    };
    const perform = (gesture: Gesture) => {
      if (!canMove() || !player) return;
      clearTimeout(timer);
      player.loop = false;
      const frames: Record<Gesture, [number, number]> = {
        wave: [120, 195],
        cheer: [420, 510],
        dance: [600, 780],
      };
      player.playSegments(frames[gesture], true);
    };
    action.current = perform;
    const sync = () => {
      clearTimeout(timer);
      idle();
      schedule();
    };
    syncActivity.current = sync;
    const paint = () => {
      if (!animation || !container.current || disposed) return;
      const colour =
        getComputedStyle(document.documentElement).getPropertyValue("--mascot-colour").trim() ||
        "#4F46E5";
      const rgb = [1, 3, 5].map((i) => parseInt(colour.slice(i, i + 2), 16));
      const mix = (target: number, amount: number) =>
        rgb.map((v) => Math.round(v + (target - v) * amount) / 255);
      const tones = [
        mix(0, 0),
        mix(0, 0.62),
        mix(0, 0.48),
        mix(255, 0.28),
        mix(255, 0.12),
        mix(0, 0.18),
        mix(255, 0.16),
      ];
      const copy = JSON.parse(JSON.stringify(animation));
      const walk = (value: any) => {
        if (!value || typeof value !== "object") return;
        if (value.nm?.startsWith("DotzieTone") && value.c)
          value.c.k = [...tones[Number(value.nm.slice(10))], 1];
        Object.values(value).forEach(walk);
      };
      walk(copy);
      clearTimeout(timer);
      loaded = false;
      player?.destroy();
      player = lottie.loadAnimation({
        container: container.current,
        renderer: "svg",
        loop: false,
        autoplay: false,
        animationData: copy,
      });
      player.addEventListener("DOMLoaded", () => {
        loaded = true;
        sync();
      });
      player.addEventListener("complete", () => {
        idle();
        schedule();
      });
    };
    const controller = new AbortController();
    Promise.all([
      import("lottie-web"),
      fetch("/animations/dotzie.json", { signal: controller.signal }).then((r) => {
        if (!r.ok) throw Error("Mascot unavailable");
        return r.json();
      }),
    ])
      .then(([module, data]) => {
        lottie = module.default;
        animation = data;
        paint();
      })
      .catch(() => {
        if (!disposed && container.current) container.current.textContent = "Dotzie";
      });
    const observer = new MutationObserver(paint);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-accent"],
    });
    const intersection = new IntersectionObserver((entries) => {
      visible = entries[0].isIntersecting;
      sync();
    });
    if (container.current) intersection.observe(container.current);
    document.addEventListener("visibilitychange", sync);
    motion.addEventListener("change", sync);
    return () => {
      disposed = true;
      clearTimeout(timer);
      controller.abort();
      observer.disconnect();
      intersection.disconnect();
      player?.destroy();
      document.removeEventListener("visibilitychange", sync);
      motion.removeEventListener("change", sync);
    };
  }, [automatic]);
  useEffect(() => {
    syncActivity.current();
  }, [active]);
  useEffect(() => {
    if (cue) action.current(cue.gesture);
  }, [cue]);
  return (
    <div
      ref={container}
      className="dotzie-player"
      role="img"
      aria-label="Dotzie, your hooded bird companion"
    />
  );
}
