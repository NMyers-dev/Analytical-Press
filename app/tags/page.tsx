import Link from "next/link";
import { getAllTags } from "@/lib/posts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Topics",
  description: "Every tag used across HalfSpace, ordered by how often it shows up."
};

export default function TagsIndex() {
  const tags = getAllTags();

  return (
    <div className="mx-auto max-w-5xl px-6 pb-24 pt-12">
      <header className="reveal">
        <p className="eyebrow">Browse</p>
        <h1 className="headline mt-2 text-4xl md:text-6xl">Topics</h1>
        <p className="mt-4 max-w-2xl text-lg italic text-[color:var(--color-ink-soft)]">
          Every tag used across the publication. Click one to see every piece
          filed under it.
        </p>
      </header>

      <div className="hairline my-8" />

      {tags.length === 0 ? (
        <p className="text-[color:var(--color-ink-soft)]">
          No tagged posts yet.
        </p>
      ) : (
        <ul className="flex flex-wrap gap-3 reveal reveal-delay-1">
          {tags.map(({ slug, tag, count }) => (
            <li key={slug}>
              <Link
                href={`/tags/${slug}`}
                className="inline-flex items-baseline gap-2 border border-[color:var(--color-rule)] px-3 py-1.5 uppercase tracking-widest text-xs transition-colors duration-300 hover:border-[color:var(--color-pitch)] hover:text-[color:var(--color-pitch)]"
              >
                <span>{tag}</span>
                <span className="text-[color:var(--color-ink-soft)]">
                  {count}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
