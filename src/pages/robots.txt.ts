import type { APIRoute } from "astro";

// Mirrors the noindex meta in Base.astro: crawlers are turned away entirely
// until PUBLIC_SITE_LIVE=true is set in the deploy environment.
const isLive = import.meta.env.PUBLIC_SITE_LIVE === "true";

// Named explicitly because several of these ignore the `User-agent: *` rule.
// Advisory only — the real pre-launch protection is Vercel Authentication.
const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-Web",
  "anthropic-ai",
  "Google-Extended",
  "PerplexityBot",
  "Perplexity-User",
  "CCBot",
  "Bytespider",
  "Amazonbot",
  "Applebot-Extended",
  "meta-externalagent",
  "cohere-ai",
  "Diffbot",
  "omgili",
  "Timpibot",
];

export const GET: APIRoute = ({ site }) => {
  const blockAll = [
    "User-agent: *",
    "Disallow: /",
    "",
    ...AI_CRAWLERS.flatMap((ua) => [`User-agent: ${ua}`, "Disallow: /", ""]),
  ].join("\n");

  const body = isLive
    ? `User-agent: *\nAllow: /\n\nSitemap: ${new URL("sitemap-index.xml", site).href}\n`
    : blockAll;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
