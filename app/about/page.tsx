import Link from "next/link";
import { getAuthors } from "@/lib/authors";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Halfspace is an independent publication for writing, data, and film study on soccer."
};

export default function AboutPage() {
  const authors = getAuthors();
  return (
    <div className="mx-auto max-w-4xl px-6 pb-24 pt-12">
      <header className="reveal">
        <p className="eyebrow">About</p>
        <h1 className="headline mt-2 text-4xl md:text-6xl">
          Two friends. One sport.
          <br />
          One patient desk.
        </h1>
        <p className="mt-6 max-w-2xl text-lg italic text-[color:var(--color-ink-soft)]">
          Halfspace is an independent publication. We write about
          soccer the way it deserves to be written about: with care, with
          data where it helps, and without a single thing on the page that
          wasn&apos;t thought through.
        </p>
      </header>

      <section className="prose prose-lg mt-10 reveal reveal-delay-1">
        <p>
          There are plenty of places to read a take on yesterday&apos;s
          match. Fewer places where somebody will sit with a question for a
          week, pull the numbers, watch the film, and then decide whether
          they&apos;ve actually got something worth saying. This is our
          attempt at that.
        </p>
        <p>
          We publish essays, analytical projects, and full notebooks here.
          Posts go up whenever one of us finishes something we&apos;re
          proud of &mdash; not on a schedule.
        </p>
      </section>

      <section className="mt-14">
        <h2 className="eyebrow mb-6">The desk</h2>
        <div className="grid gap-8 md:grid-cols-2">
          {authors.map((a, i) => (
            <article
              key={a.slug}
              className={`border border-[color:var(--color-rule)] p-6 reveal reveal-delay-${Math.min(i + 2, 4)}`}
            >
              <div className="flex items-center gap-4">
                <span
                  className="inline-block h-20 w-20 flex-none overflow-hidden rounded-full border border-[color:var(--color-rule)] bg-[color:var(--color-bg-subtle)]"
                  aria-hidden="true"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={a.avatar}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                </span>
                <div>
                  <p className="eyebrow">{a.title}</p>
                  <h3 className="mt-1 text-2xl headline">{a.fullName}</h3>
                </div>
              </div>
              <p className="mt-4 italic text-[color:var(--color-ink-soft)]">
                {a.bio}
              </p>
              <Link
                href={`/authors/${a.slug}`}
                className="btn btn-ghost mt-5 inline-flex"
              >
                About {a.displayName}
              </Link>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-16 border-t border-[color:var(--color-rule)] pt-10 reveal reveal-delay-3">
        <h2 className="eyebrow mb-4">Writing for us</h2>
        <p className="italic text-[color:var(--color-ink-soft)]">
          Halfspace is a closed shop. Only the two of us publish
          here.
        </p>
      </section>
    </div>
  );
}
