/**
 * Site-wide constants. Used by the layout's default metadata and by the
 * home page's JSON-LD, which previously each kept their own copy.
 */
export const SITE_NAME = "Dotzie";

export const SITE_TAGLINE = "Offline-first, privacy-first expense tracker";

export const SITE_DESC =
  "Dotzie is an offline-first expense tracker. All your financial data stays encrypted on your device — no cloud, no server, no accounts.";

/** The address on the footer and in the app-store listings. */
export const CONTACT_EMAIL = "dotzie.team@gmail.com";

/**
 * The confirmed handles. The footer also lists Facebook, Reddit, WhatsApp and
 * LinkedIn against placeholder URLs — move each one here as its account goes
 * live, so the real addresses stay in a single place.
 */
export const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/dotzie.team/",
  tiktok: "https://www.tiktok.com/@dotzie.app",
  x: "https://x.com/dotzie_app",
} as const;
