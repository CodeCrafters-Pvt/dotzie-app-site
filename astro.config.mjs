// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// TODO: set this to the real production URL once the domain is purchased.
// Used for canonical URLs, sitemap, and RSS.
const SITE = "https://dotzie.app";

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
