import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { getAllPosts, getPostBySlug, formatDate, getRecentPosts } from "@/lib/posts";
import { getAuthor } from "@/lib/authors";
import { parseNotebook } from "@/lib/notebook";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import NotebookViewer from "@/components/NotebookViewer";
import ShareButtons from "@/components/ShareButtons";
import PostCard from "@/components/PostCard";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Not found" };
  const a = getAuthor(post.frontmatter.author);
  const canonical = `/posts/${post.slug}`;
  return {
    title: post.frontmatter.title,
    description: post.frontmatter.description,
    authors: a ? [{ name: a.fullName }] : undefined,
    alternates: { canonical },
    openGraph: {
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      type: "article",
      url: canonical,
      siteName: "Halfspace",
      publishedTime: post.frontmatter.date,
      authors: a ? [a.fullName] : undefined
    },
    twitter: {
      card: "summary_large_image",
      title: post.frontmatter.title,
      description: post.frontmatter.description,
      creator: "@NMyersAnalytics"
    }
  };
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://analytical-press.netlify.app";

export default async function PostPage({ params }: Params) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const author = getAuthor(post.frontmatter.author);
  const canonical = `${SITE_URL}/posts/${post.slug}`;
  const related = getRecentPosts(3, post.slug);

  return (
    <article className="mx-auto max-w-3xl px-6 pb-24 pt-10">
      <header className="reveal">
        <p className="eyebrow">
          {post.format === "notebook" ? "Notebook" : "Essay"}
          {post.frontmatter.tags?.length ? (
            <>
              <span aria-hidden="true"> &middot; </span>
              {post.frontmatter.tags.join(" / ")}
            </>
          ) : null}
        </p>
        <h1 className="headline mt-3 text-4xl md:text-6xl">
          {post.frontmatter.title}
        </h1>
        {post.frontmatter.description && (
          <p className="mt-5 max-w-2xl text-xl italic text-[color:var(--color-ink-soft)]">
            {post.frontmatter.description}
          </p>
        )}
        <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-[color:var(--color-ink-soft)]">
          {author && (
            <Link href={`/authors/${author.slug}`} className="nav-link">
              By {author.fullName}
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
        </div>
      </header>

      {post.frontmatter.cover && (
        <figure className="mt-10 border border-[color:var(--color-rule)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.frontmatter.cover}
            alt=""
            className="w-full object-cover"
          />
        </figure>
      )}

      <div className="hairline my-10" />

      <div className="prose prose-lg max-w-none reveal reveal-delay-1">
        {post.format === "notebook" ? (
          <NotebookViewer notebook={parseNotebook(post.content)} />
        ) : post.format === "html" ? (
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        ) : (
          <MarkdownRenderer>{post.content}</MarkdownRenderer>
        )}
      </div>

      <ShareButtons title={post.frontmatter.title} url={canonical} />

      {author && (
        <section className="mt-12 flex items-start gap-5 border-t border-b border-[color:var(--color-rule)] py-6">
          <span
            className="inline-block h-16 w-16 flex-none overflow-hidden rounded-full border border-[color:var(--color-rule)] bg-[color:var(--color-bg-subtle)]"
            aria-hidden="true"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={author.avatar}
              alt=""
              className="h-full w-full object-cover"
            />
          </span>
          <div>
            <p className="eyebrow">{author.title}</p>
            <Link
              href={`/authors/${author.slug}`}
              className="mt-1 inline-block text-xl headline nav-link"
            >
              {author.fullName}
            </Link>
            <p className="mt-2 italic text-[color:var(--color-ink-soft)]">
              {author.bio}
            </p>
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="eyebrow mb-4">Keep reading</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {related.map((r, i) => (
              <PostCard post={r} key={r.slug} index={i} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
