import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Dotzee" },
      { name: "description", content: "How Dotzee handles your data — the short version: it doesn't." },
      { property: "og:title", content: "Privacy Policy — Dotzee" },
      { property: "og:url", content: "/privacy" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <Link to="/" className="text-sm text-accent-500 hover:text-accent-400">← Back home</Link>
      <h1 className="mt-6 font-display text-5xl tracking-tight">Privacy Policy</h1>
      <p className="mt-4 text-sm text-muted-foreground">[PLACEHOLDER] Last updated: —</p>
      <div className="prose prose-neutral dark:prose-invert mt-10 space-y-4 text-muted-foreground">
        <p>[PLACEHOLDER] Dotzee is an offline-first application. We do not collect, transmit, or store your data on any server. All content you enter is written to an encrypted database on your device using AES-256-GCM.</p>
        <p>[PLACEHOLDER] Replace this page with real legal copy before public launch.</p>
      </div>
    </div>
  );
}
