export const ACCENT_STORAGE_KEY = "dotzie-accent";
export const DEFAULT_ACCENT = "indigo";
export const ACCENTS = [
  { key: "indigo", label: "Classic indigo", swatch: "#4F46E5" },
  { key: "monochrome", label: "Black & white", swatch: "#171717" },
  { key: "sapphire", label: "Soft blue", swatch: "#3D6BA8" },
  { key: "plum", label: "Cozy plum", swatch: "#7D5A9E" },
  { key: "slate", label: "Quiet slate", swatch: "#5A6978" },
] as const;
export type AccentKey = (typeof ACCENTS)[number]["key"];
