import { useState } from "react";
type Entry = { title: string; description: string; href: string; text: string };
export function GuideSearch({ entries }: { entries: Entry[] }) {
  const [query, setQuery] = useState("");
  const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const results = words.length
    ? entries.filter((e) =>
        words.every((w) =>
          (e.title + " " + e.description + " " + e.text).toLowerCase().includes(w),
        ),
      )
    : [];
  return (
    <section className="guide-search" aria-label="Search the user guide">
      <label htmlFor="guide-search-input">Find a topic</label>
      <div className="guide-search-field">
        <input
          id="guide-search-input"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Try budgets, backup or split bills"
          autoComplete="off"
          aria-controls="guide-search-results"
        />
        {query && (
          <button type="button" onClick={() => setQuery("")}>
            Clear
          </button>
        )}
      </div>
      <div id="guide-search-results">
        {words.length > 0 && (
          <>
            <p role="status">
              {results.length
                ? `${results.length} matching ${results.length === 1 ? "guide" : "guides"}`
                : "No matching guides. Try a shorter phrase or browse the topics below."}
            </p>
            <ul>
              {results.map((e) => (
                <li key={e.href}>
                  <a href={e.href}>
                    <strong>{e.title}</strong>
                    <span>{e.description}</span>
                  </a>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </section>
  );
}
