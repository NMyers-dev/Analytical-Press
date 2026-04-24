import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getAuthor, getAuthors, handleFromUrl } from "@/lib/authors";
import SocialIcon from "@/components/SocialIcon";
import { getPostsByAuthor, formatDate } from "@/lib/posts";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAuthors().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const a = getAuthor(slug);
  if (!a) return { title: "Author" };
  const canonical = `/authors/${a.slug}`;
  return {
    title: `About ${a.fullName}`,
    description: a.bio,
    alternates: { canonical },
    openGraph: {
      title: `About ${a.fullName}`,
      description: a.bio,
      type: "profile",
      url: canonical,
      siteName: "HalfSpace"
    },
    twitter: {
      card: "summary_large_image",
      title: `About ${a.fullName}`,
      description: a.bio
    }
  };
}

export default async function AuthorPage({ params }: Params) {
  const { slug } = await params;
  const author = getAuthor(slug);
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
                    className="btn btn-ghost inline-flex items-center gap-2"
                    href={author.links.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Twitter / X${
                      handleFromUrl("twitter", author.links.twitter)
                        ? ` ${handleFromUrl("twitter", author.links.twitter)}`
                        : ""
                    }`}
                  >
                    <SocialIcon platform="twitter" />
                    {handleFromUrl("twitter", author.links.twitter) && (
                      <span className="text-[color:var(--color-ink-soft)]">
                        {handleFromUrl("twitter", author.links.twitter)}
                      </span>
                    )}
                  </a>
                </li>
              )}
              {author.links.linkedin && (
                <li>
                  <a
                    className="btn btn-ghost inline-flex items-center gap-2"
                    href={author.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`LinkedIn${
                      handleFromUrl("linkedin", author.links.linkedin)
                        ? ` ${handleFromUrl("linkedin", author.links.linkedin)}`
                        : ""
                    }`}
                  >
                    <SocialIcon platform="linkedin" />
                    {handleFromUrl("linkedin", author.links.linkedin) && (
                      <span className="text-[color:var(--color-ink-soft)]">
                        {handleFromUrl("linkedin", author.links.linkedin)}
                      </span>
                    )}
                  </a>
                </li>
              )}
              {author.links.github && (
                <li>
                  <a
                    className="btn btn-ghost inline-flex items-center gap-2"
                    href={author.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`GitHub${
                      handleFromUrl("github", author.links.github)
                        ? ` ${handleFromUrl("github", author.links.github)}`
                        : ""
                    }`}
                  >
                    <SocialIcon platform="github" />
                    {handleFromUrl("github", author.links.github) && (
                      <span className="text-[color:var(--color-ink-soft)]">
                        {handleFromUrl("github", author.links.github)}
                      </span>
                    )}
                  </a>
                </li>
              )}
              {author.links.bluesky && (
                <li>
                  <a
                    className="btn btn-ghost inline-flex items-center gap-2"
                    href={author.links.bluesky}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Bluesky${
                      handleFromUrl("bluesky", author.links.bluesky)
                        ? ` ${handleFromUrl("bluesky", author.links.bluesky)}`
                        : ""
                    }`}
                  >
                    <SocialIcon platform="bluesky" />
                    {handleFromUrl("bluesky", author.links.bluesky) && (
                      <span className="text-[color:var(--color-ink-soft)]">
                        {handleFromUrl("bluesky", author.links.bluesky)}
                      </span>
                    )}
                  </a>
                </li>
              )}
              {author.links.substack && (
                <li>
                  <a
                    className="btn btn-ghost inline-flex items-center gap-2"
                    href={author.links.substack}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Substack${
                      handleFromUrl("substack", author.links.substack)
                        ? ` ${handleFromUrl("substack", author.links.substack)}`
                        : ""
                    }`}
                  >
                    <SocialIcon platform="substack" />
                    {handleFromUrl("substack", author.links.substack) && (
                      <span className="text-[color:var(--color-ink-soft)]">
                        {handleFromUrl("substack", author.links.substack)}
                      </span>
                    )}
                  </a>
                </li>
              )}
              {author.links.website && (
                <li>
                  <a
                    className="btn btn-ghost inline-flex items-center gap-2"
                    href={author.links.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Website"
                  >
                    <SocialIcon platform="website" />
                  </a>
                </li>
              )}
              {author.links.email && (
                <li>
                  <a
                    className="btn btn-ghost inline-flex items-center gap-2"
                    href={`mailto:${author.links.email}`}
                    aria-label={`Email ${author.links.email}`}
                  >
                    <SocialIcon platform="email" />
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
          Pieces by {author.fullName}
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
