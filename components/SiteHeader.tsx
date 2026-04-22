import Link from "next/link";

export default function SiteHeader() {
  return (
    <header className="border-b border-[color:var(--color-rule)] bg-chalk">
      <div className="mx-auto flex max-w-6xl items-end justify-between gap-8 px-6 py-6">
        <Link href="/" className="group inline-block">
          <p className="eyebrow">Est. 2026</p>
          <h1 className="text-3xl md:text-4xl headline transition-[letter-spacing] duration-500 group-hover:tracking-tight">
            HalfSpace
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
            <li>
              <Link href="/tags" className="nav-link">Topics</Link>
            </li>
            <li>
              <Link href="/glossary" className="nav-link">Glossary</Link>
            </li>
            <li>
              <Link href="/about" className="nav-link">About HalfSpace</Link>
            </li>
            <li>
              <Link
                href="/search"
                aria-label="Search"
                className="nav-link"
                title="Search"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="11" cy="11" r="7" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </Link>
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
