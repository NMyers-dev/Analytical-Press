import Link from "next/link";

export default function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-[color:var(--color-rule)] bg-[color:var(--color-bg-subtle)]">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 py-10 md:flex-row md:items-center">
        <div>
          <p className="eyebrow">HalfSpace</p>
          <p className="mt-2 text-sm text-[color:var(--color-ink-soft)]">
            A small publication. Independent work, no algorithms.
          </p>
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-5 text-sm">
            <li><Link href="/" className="nav-link">Latest</Link></li>
            <li><Link href="/posts" className="nav-link">Archive</Link></li>
            <li><Link href="/about" className="nav-link">About</Link></li>
            <li><Link href="/rss.xml" className="nav-link">RSS</Link></li>
          </ul>
        </nav>
        <p className="text-sm text-[color:var(--color-ink-soft)]">
          &copy; {year} HalfSpace
        </p>
      </div>
    </footer>
  );
}
