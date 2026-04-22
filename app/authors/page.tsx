import Link from "next/link";
import { getAuthors } from "@/lib/authors";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Authors",
  description: "The people behind Halfspace."
};

export default function AuthorsIndex() {
  const authors = getAuthors();
  return (
    <div className="mx-auto max-w-5xl px-6 pb-24 pt-12">
      <header className="reveal">
        <p className="eyebrow">The Staff</p>
        <h1 className="headline mt-2 text-4xl md:text-5xl">Authors</h1>
      </header>
      <div className="mt-10 grid gap-8 md:grid-cols-2">
        {authors.map((a, i) => (
          <Link
            key={a.slug}
            href={`/authors/${a.slug}`}
            className={`group flex items-center gap-5 border border-[color:var(--color-rule)] p-5 transition-all duration-500 hover:-translate-y-1 hover:border-[color:var(--color-pitch)] reveal reveal-delay-${Math.min(i + 1, 4)}`}
          >
            <span
              className="inline-block h-24 w-24 flex-none overflow-hidden rounded-full border border-[color:var(--color-rule)] bg-[color:var(--color-bg-subtle)]"
              aria-hidden="true"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={a.avatar}
                alt=""
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </span>
            <span className="flex-1">
              <span className="eyebrow block">{a.title}</span>
              <span className="mt-1 block text-2xl headline">
                {a.fullName}
              </span>
              <span className="mt-2 block text-sm italic text-[color:var(--color-ink-soft)]">
                {a.bio}
              </span>
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
