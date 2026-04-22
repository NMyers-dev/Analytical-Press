import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getAuthor, getAuthors } from "@/lib/authors";
import { getPostsByAuthor, formatDate } from "@/lib/posts";

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return getAuthors().map((a) => ({ slug: a.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const a = getAuthor(params.slug);
  if (!a) return { title: "Author" };
  return {
    title: `About ${a.fullName}`,
    description: a.bio
  };
}

export default function AuthorPage({ params }: Params) {
  const author = getAuthor(params.slug);
  if (!author) notFound();

  const posts = getPostsByAuthor(author.slug);

  return (
    <div className="mx-auto max-w-4xl px-6 pb-24 pt-12">
      <header className="reveal">
        <p className="eyebrow">About</p>
        <h1 className="headline mt-2 text-4xl md:text-6xl">
          {author.fullName}
        </h1>
        <p className="mt-3 italic text-[color:var(--color-ink-soft)]">
          {author.title}
          {author.location ? ` · ${author.location}` : ""}
        </p>
      </header>

      <section className="mt-10 grid gap-10 border-b border-[color:var(--color-rule)] pb-10 md:grid-cols-[auto,1fr] md:items-start">
        <span
          className="inline-block h-48 w-48 overflow-hidden rounded-full border border-[color:var(--color-rule)] bg-[color:var(--color-bg-subtle)]"
          aria-hidden="true"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={author.avatar}
            alt=""
            className="h-full w-full object-cover"
          />
        </span>
        <div className="reveal reveal-delay-1">
          <p className="text-lg italic text-[color:var(--color-ink-soft)]">
            {author.bio}
          </p>
          {author.links && (
            <ul className="mt-5 flex flex-wrap gap-3">
              {author.links.twitter && (
                <li>
                  <a
                    className="btn btn-ghost"
                    href={author.links.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Twitter
                  </a>
                </li>
              )}
              {author.links.linkedin && (
                <li>
                  <a
                    className="btn btn-ghost"
                    href={author.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </a>
                </li>
              )}
              {author.links.github && (
                <li>
                  <a
                    className="btn btn-ghost"
                    href={author.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub
                  </a>
                </li>
              )}
              {author.links.bluesky && (
                <li>
                  <a
                    className="btn btn-ghost"
                    href={author.links.bluesky}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Bluesky
                  </a>
                </li>
              )}
              {author.links.website && (
                <li>
                  <a
                    className="btn btn-ghost"
                    href={author.links.website}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Website
                  </a>
                </li>
              )}
              {author.links.email && (
                <li>
                  <a
                    className="btn btn-ghost"
                    href={`mailto:${author.links.email}`}
                  >
                    Email
                  </a>
                </li>
              )}
            </ul>
          )}
        </div>
      </section>

      {author.longBio && author.longBio.trim().length > 0 && (
        <section className="prose prose-lg mt-10 max-w-3xl reveal reveal-delay-2">
          <h2 className="eyebrow">The longer version</h2>
          {author.longBio.split(/\n\n+/).map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </section>
      )}

      <section className="mt-14 reveal reveal-delay-3">
        <h2 className="eyebrow mb-4">
          Pieces by {author.displayName}
        </h2>
        {posts.length === 0 ? (
          <p className="italic text-[color:var(--color-ink-soft)]">
            Nothing published yet. Stay tuned.
          </p>
        ) : (
          <ul className="divide-y divide-[color:var(--color-rule)] border-y border-[color:var(--color-rule)]">
            {posts.map((p) => (
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
                    {p.frontmatter.description && (
                      <p className="mt-1 text-sm italic text-[color:var(--color-ink-soft)] line-clamp-2">
                        {p.frontmatter.description}
                      </p>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
