import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — Dotzee" },
      { name: "description", content: "The terms that apply when you use the Dotzee mobile app." },
      { property: "og:title", content: "Terms of Service — Dotzee" },
      { property: "og:url", content: "/terms" },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-24">
      <Link to="/" className="text-sm text-accent-500 hover:text-accent-400">← Back home</Link>
      <h1 className="mt-6 font-display text-5xl tracking-tight">Terms of Service</h1>
      <p className="mt-4 text-sm text-muted-foreground">[PLACEHOLDER] Last updated: —</p>
      <div className="mt-10 space-y-4 text-muted-foreground">
        <p>[PLACEHOLDER] These are placeholder terms. Replace this content with your real Terms of Service before the app is publicly released.</p>
      </div>
    </div>
  );
}
