import type { Feature, FeatureTier } from "@/types";

/**
 * Single source of truth for the home slides, "Also included" cards and
 * both pricing columns.
 *
 * NOTE: `tier` is placeholder until the Free/Pro split is finalised before
 * launch.
 */
export const features: Feature[] = [
  {
    id: "track",
    name: "Track expenses",
    tier: "free",
    guideSlug: "transactions",
    slide: {
      eyebrow: "Track",
      headline: "Track expenses, even offline.",
      blurb: "Record expenses and check your spending without an internet connection.",
    },
    perk: "Add as many expenses as you like",
  },
  {
    id: "split",
    name: "Split & IOU",
    tier: "free",
    guideSlug: "settling-up",
    slide: {
      eyebrow: "Split & IOU",
      headline: "Split bills and settle up with friends.",
      blurb:
        "See who owes what after a shared expense. Mark payments as settled when they are paid.",
    },
  },
  {
    id: "plan",
    name: "Scheduled & recurring",
    tier: "free",
    guideSlug: "scheduled-transactions",
    slide: {
      eyebrow: "Plan ahead",
      headline: "Set up regular payments.",
      blurb:
        "Schedule your salary, rent and subscriptions so you do not need to enter them each month.",
    },
  },
  {
    id: "events",
    name: "Event budgets",
    tier: "free",
    guideSlug: "events",
    slide: {
      eyebrow: "Event budgets",
      headline: "Keep a budget for each event.",
      blurb: "Plan costs for a trip or event and track spending against your budget.",
    },
  },
  {
    id: "sms",
    name: "Auto-capture",
    tier: "pro",
    guideSlug: null,
    slide: {
      eyebrow: "Auto-capture",
      headline: "Add expenses from bank texts.",
      blurb:
        "Dotzie reads supported bank messages on your phone and prepares an expense for you to review.",
    },
  },
  {
    id: "offline",
    name: "Works offline",
    tier: "free",
    guideSlug: null,
    perk: "Works fully offline, anywhere",
  },
  {
    id: "backup",
    name: "Backup & restore",
    tier: "free",
    guideSlug: "backup-restore",
    perk: "Save a backup and restore it anytime",
  },
  {
    id: "privacy",
    name: "On-device privacy",
    tier: "free",
    guideSlug: "privacy",
    perk: "Your data stays private on your phone",
  },
  {
    id: "no-cloud",
    name: "No cloud, no account",
    tier: "free",
    guideSlug: "privacy",
    card: {
      title: "No cloud, no account",
      desc: "Use Dotzie without creating an account. Your records are stored on your phone.",
    },
  },
  {
    id: "calm-ui",
    name: "Calm interface",
    tier: "free",
    guideSlug: null,
    card: {
      title: "Clean, calm interface",
      desc: "Find your balance, recent expenses and budgets in one place.",
    },
    perk: "Clean, calm interface",
  },
  {
    id: "reports",
    name: "Reports & trends",
    tier: "pro",
    guideSlug: "insights",
    card: {
      title: "Reports & trends",
      desc: "Compare your spending by month and category.",
    },
    perk: "Clear reports and spending trends",
  },
  {
    id: "smart-categories",
    name: "Smart categories",
    tier: "pro",
    guideSlug: null,
    card: {
      title: "Smart categories",
      desc: "Dotzie sorts each new expense into the right category for you, automatically.",
    },
    perk: "Expenses sorted into categories for you",
  },
  {
    id: "budgets",
    name: "Spending plans",
    tier: "pro",
    guideSlug: "spending-plans",
    perk: "Multiple budgets and recurring items",
  },
];

const byId = new Map(features.map((f) => [f.id, f]));

/** Throws on a typo'd id so a missing feature fails the build, not the page. */
export function feature(id: string): Feature {
  const f = byId.get(id);
  if (!f) throw new Error(`Unknown feature id: ${id}`);
  return f;
}

/** "How to use it" target for a feature, or null when no guide page exists. */
export const featureGuideHref = (f: Feature) => (f.guideSlug ? `/guide/${f.guideSlug}` : null);

export const cardsFor = (tier?: FeatureTier) =>
  features.filter((f) => f.card && (!tier || f.tier === tier));

export const perksFor = (tier: FeatureTier) => features.filter((f) => f.perk && f.tier === tier);
