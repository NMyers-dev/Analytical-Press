"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type IndexEntry = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  author: string;
  date: string;
  format: "markdown" | "notebook" | "html";
};

function normalize(s: string): string {
  return s.toLowerCase().trim();
}

function matches(entry: IndexEntry, q: string): number {
  // Return a score (higher = better match), 0 means no match.
  const needle = normalize(q);
  if (!needle) return 0;
  let score = 0;
  const title = normalize(entry.title);
  const desc = normalize(entry.description);
  const tagStr = entry.tags.map(normalize).join(" ");
  const author = normalize(entry.author);

  if (title.includes(needle)) score += 10;
  if (title.startsWith(needle)) score += 5;
  if (desc.includes(needle)) score += 4;
  if (tagStr.includes(needle)) score += 6;
  if (author.includes(needle)) score += 2;

  // Token match bonus — split on spaces, each token must appear somewhere
  const tokens = needle.split(/\s+/).filter(Boolean);
  if (tokens.length > 1) {
    const haystack = `${title} ${desc} ${tagStr} ${author}`;
    const all = tokens.every((t) => haystack.includes(t));
    if (all) score += 3;
  }
  return score;
}

export default function Search({ autoFocus = false }: { autoFocus?: boolean }) {
  const [index, setIndex] = useState<IndexEntry[] | null>(null);
  const [q, setQ] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/search-index.json")
      .then((r) => {
        if (!r.ok) throw new Error(`index ${r.status}`);
        return r.json();
      })
      .then((data: IndexEntry[]) => {
        if (!cancelled) {
          setIndex(data);
          setLoading(false);
        }
      })
      .catch((e) => {
        if (!cancelled) {
          setError(e.message);
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const results = useMemo(() => {
    if (!index || !q.trim()) return [];
    return index
      .map((e) => ({ entry: e, score: matches(e, q) }))
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 20)
      .map((r) => r.entry);
  }, [index, q]);

  return (
    <div>
      <label htmlFor="search-input" className="sr-only">
        Search HalfSpace
      </label>
      <input
        id="search-input"
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        autoFocus={autoFocus}
        placeholder="Search titles, tags, authors..."
        className="w-full border border-[color:var(--color-rule)] bg-transparent px-4 py-3 text-lg italic focus:border-[color:var(--color-pitch)] focus:outline-none"
      />

      {loading && (
        <p className="mt-4 text-sm italic text-[color:var(--color-ink-soft)]">
          Loading index...
        </p>
      )}
      {error && (
        <p className="mt-4 text-sm italic text-red-700">
          Search unavailable: {error}
        </p>
      )}

      {!loading && q.trim() && (
        <div className="mt-8">
          <p className="eyebrow mb-3">
            {results.length} result{results.length === 1 ? "" : "s"}
          </p>
          {results.length === 0 ? (
            <p className="text-[color:var(--color-ink-soft)] italic">
              Nothing matched.
            </p>
          ) : (
            <ul className="divide-y divide-[color:var(--color-rule)]">
              {results.map((r) => (
                <li key={r.slug} className="py-4">
                  <Link
                    href={`/posts/${r.slug}`}
                    className="block group"
                  >
                    <p className="text-xs uppercase tracking-widest text-[color:var(--color-ink-soft)]">
                      {r.author} &middot;{" "}
                      {new Date(r.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                      })}
                      {r.format === "notebook" && " · Notebook"}
                    </p>
                    <h3 className="mt-1 text-xl headline transition-colors duration-300 group-hover:text-[color:var(--color-accent)]">
                      {r.title}
                    </h3>
                    {r.description && (
                      <p className="mt-2 italic text-[color:var(--color-ink-soft)]">
                        {r.description}
                      </p>
                    )}
                    {r.tags.length > 0 && (
                      <p className="mt-2 text-xs text-[color:var(--color-ink-soft)]">
                        {r.tags.join(" · ")}
                      </p>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
