import Link from "next/link";
import { formatDate } from "@/lib/posts";
import { getAuthor } from "@/lib/authors";
import type { Post } from "@/types/post";

type Props = {
  post: Post;
  variant?: "default" | "featured" | "compact";
  index?: number;
};

export default function PostCard({ post, variant = "default", index = 0 }: Props) {
  const author = getAuthor(post.frontmatter.author);
  const delayClass =
    index < 4 ? `reveal reveal-delay-${index + 1}` : "reveal";

  if (variant === "featured") {
    return (
      <article
        className={`group border-y border-[color:var(--color-rule)] py-10 md:py-14 ${delayClass}`}
      >
        <div className="grid gap-10 md:grid-cols-[1.4fr,1fr] md:items-start">
          <div>
            <p className="eyebrow mb-3">Most Recent</p>
            <h2 className="headline text-4xl md:text-6xl">
              <Link
                href={`/posts/${post.slug}`}
                className="transition-colors duration-500 hover:text-[color:var(--color-accent)]"
              >
                {post.frontmatter.title}
              </Link>
            </h2>
            {post.frontmatter.description && (
              <p className="mt-5 max-w-2xl text-lg italic text-[color:var(--color-ink-soft)]">
                {post.frontmatter.description}
              </p>
            )}
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-[color:var(--color-ink-soft)]">
              {author && (
                <Link
                  href={`/authors/${author.slug}`}
                  className="nav-link"
                >
                  By {author.displayName}
                </Link>
              )}
              <span aria-hidden="true">&middot;</span>
              <time dateTime={post.frontmatter.date}>
                {formatDate(post.frontmatter.date)}
              </time>
              {post.frontmatter.readingMinutes && (
                <>
                  <span aria-hidden="true">&middot;</span>
                  <span>{post.frontmatter.readingMinutes} min read</span>
                </>
              )}
              {post.format === "notebook" && (
                <>
                  <span aria-hidden="true">&middot;</span>
                  <span className="uppercase tracking-widest text-xs">
                    Notebook
                  </span>
                </>
              )}
            </div>
            <div className="mt-8">
              <Link href={`/posts/${post.slug}`} className="btn">
                Read the piece
              </Link>
            </div>
          </div>
          <aside className="hidden md:block">
            <div className="border-l border-[color:var(--color-rule)] pl-6">
              <p className="eyebrow">Filed under</p>
              <ul className="mt-2 flex flex-wrap gap-2">
                {(post.frontmatter.tags ?? []).map((t) => (
                  <li
                    key={t}
                    className="border border-[color:var(--color-rule)] px-2 py-1 text-xs uppercase tracking-widest"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </article>
    );
  }

  if (variant === "compact") {
    return (
      <Link
        href={`/posts/${post.slug}`}
        className={`group flex flex-col gap-1 py-3 ${delayClass}`}
      >
        <p className="text-xs uppercase tracking-widest text-[color:var(--color-ink-soft)]">
          {formatDate(post.frontmatter.date)}
        </p>
        <h3 className="text-lg transition-colors duration-300 group-hover:text-[color:var(--color-pitch)]">
          {post.frontmatter.title}
        </h3>
      </Link>
    );
  }

  return (
    <article className={`post-card flex flex-col ${delayClass}`}>
      <p className="eyebrow">
        {author?.displayName ?? "Unsigned"} &middot;{" "}
        {formatDate(post.frontmatter.date)}
      </p>
      <h3 className="mt-3 text-2xl headline">
        <Link
          href={`/posts/${post.slug}`}
          className="transition-colors duration-300 hover:text-[color:var(--color-accent)]"
        >
          {post.frontmatter.title}
        </Link>
      </h3>
      {post.frontmatter.description && (
        <p className="mt-3 text-[0.97rem] italic text-[color:var(--color-ink-soft)] line-clamp-3">
          {post.frontmatter.description}
        </p>
      )}
      <div className="mt-5 flex items-center justify-between text-xs uppercase tracking-widest text-[color:var(--color-ink-soft)]">
        <span>{post.format === "notebook" ? "Notebook" : "Essay"}</span>
        {post.frontmatter.readingMinutes && (
          <span>{post.frontmatter.readingMinutes} min</span>
        )}
      </div>
    </article>
  );
}
