export type FeatureTier = "free" | "pro";

export interface Feature {
  id: string;
  /** Short internal name. */
  name: string;
  tier: FeatureTier;
  /** Guide page id under /guide, when one exists yet. */
  guideSlug: string | null;
  /** Copy for features that get their own home section. */
  slide?: { eyebrow: string; headline: string; blurb: string };
  /** Copy for the "Also included" strip on the home page. */
  card?: { title: string; desc: string };
  /** One line in the Free / Pro lists in the pricing section. */
  perk?: string;
}

/**
 * Single source of truth for what the marketing site says Dotzie does.
 * The home slides, the "Also included" cards and both pricing columns all
 * render from this list, so a feature is edited in one place.
 *
 * NOTE: `tier` is placeholder until the Free/Pro split is finalised before
 * launch. Changing a tier here moves the feature between the pricing columns
 * and re-tags its card automatically — no markup to touch.
 */
export const features: Feature[] = [
  {
    id: "track",
    name: "Track expenses",
    tier: "free",
    guideSlug: "transactions",
    slide: {
      eyebrow: "Track",
      headline: "Track every expense — even offline.",
      blurb:
        "Add and review spending anywhere — Dotzie never waits on a connection, so it's ready the moment you are.",
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
        "Keep a running IOU of who owes what, so settling up is a tap away — no awkward math, no chasing.",
    },
  },
  {
    id: "plan",
    name: "Scheduled & recurring",
    tier: "free",
    guideSlug: "scheduled-transactions",
    slide: {
      eyebrow: "Plan ahead",
      headline: "Recurring, scheduled, planned ahead.",
      blurb:
        "Set salary, rent, and subscriptions once and let them repeat — so your month is organised before it starts.",
    },
  },
  {
    id: "events",
    name: "Event budgets",
    tier: "free",
    guideSlug: "events",
    slide: {
      eyebrow: "Event budgets",
      headline: "Budget a trip or party, down to the detail.",
      blurb:
        "Give any occasion its own budget, add categories as you plan, and watch the total update live.",
    },
  },
  {
    id: "sms",
    name: "Auto-capture",
    tier: "pro",
    guideSlug: null,
    slide: {
      eyebrow: "Auto-capture",
      headline: "Turn bank texts into expenses, automatically.",
      blurb:
        "When your bank texts you a payment, Dotzie reads it right on your phone and drafts the expense — approve with a tap. Nothing typed, nothing missed.",
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
      desc: "Nothing to sign up for and nothing syncing away — nothing to leak or hand over.",
    },
  },
  {
    id: "calm-ui",
    name: "Calm interface",
    tier: "free",
    guideSlug: null,
    card: {
      title: "Clean, calm interface",
      desc: "An uncluttered design that makes checking in on your spending feel light.",
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
      desc: "Clear monthly breakdowns that show where your money really went.",
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
