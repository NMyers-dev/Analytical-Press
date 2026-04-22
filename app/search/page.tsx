import type { Metadata } from "next";
import Search from "@/components/Search";

export const metadata: Metadata = {
  title: "Search",
  description: "Search every HalfSpace post by title, tag, or author."
};

export default function SearchPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 pb-24 pt-12">
      <header className="reveal">
        <p className="eyebrow">Find</p>
        <h1 className="headline mt-2 text-4xl md:text-6xl">Search</h1>
        <p className="mt-4 text-lg italic text-[color:var(--color-ink-soft)]">
          Type anywhere in the box. Matches against titles, descriptions,
          tags, and author names.
        </p>
      </header>

      <div className="hairline my-8" />

      <div className="reveal reveal-delay-1">
        <Search autoFocus />
      </div>
    </div>
  );
}
