import type { Accent } from "@/types";

export type AccentKey = "purple" | "warm" | "red" | "jungle" | "blue" | "teal" | "mono";

/** localStorage key; also read by the no-flash script in Base.astro. */
export const ACCENT_STORAGE_KEY = "dotzie-accent";

export const DEFAULT_ACCENT: AccentKey = "purple";

/**
 * The accent palettes offered by the switcher.
 *
 * Each `swatch` must match the `--accent-500` of the matching
 * `[data-accent="…"]` block in styles.css — that block is the real palette,
 * this is only the preview dot. Change one, change the other.
 */
export const ACCENTS: (Accent & { key: AccentKey })[] = [
  { key: "purple", label: "Purple", swatch: "#6B5CFF" },
  { key: "warm", label: "Warm red", swatch: "#C8402F" },
  { key: "red", label: "Red", swatch: "#EF4444" },
  { key: "jungle", label: "Jungle", swatch: "#22C55E" },
  { key: "blue", label: "Blue", swatch: "#3B82F6" },
  { key: "teal", label: "Teal", swatch: "#14B8A6" },
  { key: "mono", label: "Black & white", swatch: "linear-gradient(135deg, #111 50%, #f5f5f5 50%)" },
];
