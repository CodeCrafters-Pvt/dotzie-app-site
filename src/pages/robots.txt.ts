import type { APIRoute } from "astro";

// Mirrors the noindex meta in Base.astro: crawlers are turned away entirely
// until PUBLIC_SITE_LIVE=true is set in the deploy environment.
const isLive = import.meta.env.PUBLIC_SITE_LIVE === "true";

export const GET: APIRoute = ({ site }) => {
  const body = isLive
    ? `User-agent: *\nAllow: /\n\nSitemap: ${new URL("sitemap-index.xml", site).href}\n`
    : `User-agent: *\nDisallow: /\n`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
