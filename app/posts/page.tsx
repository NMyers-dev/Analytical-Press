import { getAllPosts, formatDate } from "@/lib/posts";
import { getAuthor } from "@/lib/authors";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Archive",
  description: "Every piece we have published, newest first."
};

export default function ArchivePage() {
  const posts = getAllPosts();
  const grouped = posts.reduce<Record<string, typeof posts>>((acc, p) => {
    const year = new Date(p.frontmatter.date).getFullYear().toString();
    (acc[year] ||= []).push(p);
    return acc;
  }, {});
  const years = Object.keys(grouped).sort((a, b) => Number(b) - Number(a));

  return (
    <div className="mx-auto max-w-4xl px-6 pb-24 pt-12">
      <header className="reveal">
        <p className="eyebrow">Archive</p>
        <h1 className="headline mt-2 text-4xl md:text-5xl">Every piece</h1>
        <p className="mt-3 max-w-2xl italic text-[color:var(--color-ink-soft)]">
          In reverse chronological order. Notebooks and essays mingle.
        </p>
      </header>

      {posts.length === 0 && (
        <p className="mt-12 text-[color:var(--color-ink-soft)]">
          Nothing here yet. Drop a file in <code>/content/posts</code>.
        </p>
      )}

      <div className="mt-12 space-y-12">
        {years.map((y, yi) => (
          <section key={y} className={`reveal reveal-delay-${Math.min(yi + 1, 4)}`}>
            <h2 className="eyebrow mb-4">{y}</h2>
            <ul className="divide-y divide-[color:var(--color-rule)] border-t border-[color:var(--color-rule)]">
              {grouped[y].map((p) => {
                const a = getAuthor(p.frontmatter.author);
                return (
                  <li key={p.slug}>
                    <Link
                      href={`/posts/${p.slug}`}
                      className="group grid grid-cols-[7rem,1fr] items-baseline gap-6 py-5 transition-colors duration-300 hover:bg-[color:var(--color-bg-subtle)]"
                    >
                      <time
                        dateTime={p.frontmatter.date}
                        className="text-sm uppercase tracking-widest text-[color:var(--color-ink-soft)]"
                      >
                        {formatDate(p.frontmatter.date)}
                      </time>
                      <div>
                        <h3 className="text-xl transition-colors duration-300 group-hover:text-[color:var(--color-pitch)]">
                          {p.frontmatter.title}
                        </h3>
                        <p className="mt-1 text-sm italic text-[color:var(--color-ink-soft)]">
                          {a ? `By ${a.displayName}` : ""}
                          {p.format === "notebook" ? " — Notebook" : ""}
                        </p>
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
