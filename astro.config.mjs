// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// Used for canonical URLs, sitemap, and RSS.
// On Vercel previews this resolves to the deployment's own URL, so a private
// preview doesn't emit canonicals pointing at a domain that doesn't exist yet.
// Set PUBLIC_SITE_URL in Vercel's env vars once the real domain is live.
const SITE =
  process.env.PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://dotzie.app");

// https://astro.build/config
export default defineConfig({
  site: SITE,
  integrations: [react(), mdx(), sitemap()],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      // Ensure a single copy of React across islands and static SSR.
      dedupe: ["react", "react-dom"],
    },
  },
});
