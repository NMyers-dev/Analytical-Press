import Link from "next/link";
import { getAuthors } from "@/lib/authors";

export default function SiteHeader() {
  const authors = getAuthors();

  return (
    <header className="border-b border-[color:var(--color-rule)] bg-chalk">
      <div className="mx-auto flex max-w-6xl items-end justify-between gap-8 px-6 py-6">
        <Link href="/" className="group inline-block">
          <p className="eyebrow">Est. 2026</p>
          <h1 className="text-3xl md:text-4xl headline transition-[letter-spacing] duration-500 group-hover:tracking-tight">
            Analytical Press
          </h1>
          <p className="mt-1 text-sm italic text-[color:var(--color-ink-soft)]">
            Writing and data on the world&apos;s game.
          </p>
        </Link>
        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-6 text-base">
            <li>
              <Link href="/" className="nav-link">Latest</Link>
            </li>
            <li>
              <Link href="/posts" className="nav-link">Archive</Link>
            </li>
            {authors.map((a) => (
              <li key={a.slug}>
                <Link href={`/authors/${a.slug}`} className="nav-link">
                  {a.displayName}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/about" className="nav-link">About</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="mx-auto max-w-6xl px-6">
        <div className="hairline" />
      </div>
    </header>
  );
}
