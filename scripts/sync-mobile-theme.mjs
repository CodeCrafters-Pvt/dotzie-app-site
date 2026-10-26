// Run when the mobile app's theme tokens change: node scripts/sync-mobile-theme.mjs
import fs from "node:fs";
import ts from "typescript";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
const mobile = fileURLToPath(new URL("../../Expense-Tracker-Client", import.meta.url));
const source = execFileSync(
  process.env.GIT_BIN || "git",
  [
    "-c",
    `safe.directory=${mobile.replaceAll("\\", "/")}`,
    "-C",
    mobile,
    "show",
    "task/simplify:src/constants/theme.ts",
  ],
  { encoding: "utf8" },
);
const paletteSource = source
  .slice(0, source.indexOf("export const ACCENT_PALETTE_OPTIONS"))
  .replace(/^import .*;\r?\n/gm, "")
  .replace(/export /g, "");
const js = ts.transpileModule(paletteSource, {
  compilerOptions: { target: ts.ScriptTarget.ES2022 },
}).outputText;
const build = new Function(js + "\nreturn buildPalette;")();
const ids = ["monochrome", "indigo", "sapphire", "plum", "slate"];
let css = "/* Generated from the mobile app by scripts/sync-mobile-theme.mjs. */\n";
for (const id of ids)
  for (const mode of ["light", "dark"]) {
    const p = build(mode, id);
    const appBackground = p.background,
      appCard = p.card;
    // Approved marketing surface tints; brand accents remain exact mobile tokens.
    const tints = {
      indigo: ["#F2F1FA", "#171626", "#FFFFFF", "#222035"],
      monochrome: ["#EEEEEE", "#101010", "#FFFFFF", "#191919"],
      sapphire: ["#F0F4F9", "#141E2C", "#FFFFFF", "#1D2A3C"],
      plum: ["#F7F2F8", "#241A2C", "#FFFFFF", "#302338"],
      slate: ["#F1F4F6", "#1A2027", "#FFFFFF", "#252E38"],
    }[id];
    p.background = tints[mode === "light" ? 0 : 1];
    p.surface = p.card = tints[mode === "light" ? 2 : 3];
    const vars = {
      "app-background": appBackground,
      "app-card": appCard,
      "mascot-colour": p.primary,
      background: p.background,
      foreground: p.text,
      card: p.card,
      "card-foreground": p.text,
      elevated: p.cardHover,
      popover: p.surface,
      "popover-foreground": p.text,
      primary: p.primary,
      "primary-foreground": p.onPrimary,
      secondary: p.surface,
      "secondary-foreground": p.text,
      muted: p.surface,
      "muted-foreground": p.textSecondary,
      accent: p.primaryLight,
      "accent-foreground": p.primary,
      border: p.border,
      input: p.border,
      ring: p.borderFocus,
      "accent-300": build("dark", id).primary,
      "accent-400": build("dark", id).primary,
      "accent-500": p.primary,
      "accent-600": p.primaryDark,
      "accent-700": p.primaryDark,
      "gradient-brand": `linear-gradient(135deg, ${p.primaryGradient.join(", ")})`,
    };
    css += `:root[data-accent="${id}"]${mode === "dark" ? ".dark" : ":not(.dark)"} {\n`;
    css +=
      Object.entries(vars)
        .map(([k, v]) => `  --${k}: ${v};`)
        .join("\n") + "\n}\n";
  }
fs.writeFileSync(new URL("../src/mobile-palettes.css", import.meta.url), css);
