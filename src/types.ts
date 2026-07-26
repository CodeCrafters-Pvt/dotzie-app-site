/**
 * Shared domain types.
 *
 * Types that describe the site's content live here so a shape is defined once
 * and imported wherever it's used. Component `Props` interfaces stay in their
 * own component file — they're local to that component, not domain data.
 */

/** A question and answer, used by the FAQ section and its JSON-LD. */
export interface Faq {
  q: string;
  a: string;
}

/** Which plan a feature belongs to. Placeholder until the split is finalised. */
export type FeatureTier = "free" | "pro";

/** Something Dotzie does, as described anywhere on the marketing site. */
export interface Feature {
  id: string;
  /** Short internal name. */
  name: string;
  tier: FeatureTier;
  /** Guide page id under /guide, when one exists yet. */
  guideSlug: string | null;
  /** Copy for features that get their own home section. */
  slide?: FeatureSlide;
  /** Copy for the "Also included" strip on the home page. */
  card?: FeatureCard;
  /** One line in the Free / Pro lists in the pricing section. */
  perk?: string;
}

export interface FeatureSlide {
  eyebrow: string;
  headline: string;
  blurb: string;
}

export interface FeatureCard {
  title: string;
  desc: string;
}

/** Sidebar groupings for the user guide, in reading order. */
export const GUIDE_SECTIONS = [
  "Start here",
  "Everyday money",
  "Planning ahead",
  "Keeping track",
  "Your data & settings",
] as const;

export type GuideSection = (typeof GUIDE_SECTIONS)[number];

/** An accent palette the user can switch to. Mirrors [data-accent] in styles.css. */
export interface Accent {
  key: string;
  label: string;
  /** Preview swatch — a CSS colour or gradient. */
  swatch: string;
}
