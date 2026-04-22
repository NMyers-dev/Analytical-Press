import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import PostCard from "@/components/PostCard";
import { getAllTags, getPostsByTagSlug } from "@/lib/posts";

type Params = { params: Promise<{ tag: string }> };

export function generateStaticParams() {
  return getAllTags().map((t) => ({ tag: t.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { tag: slug } = await params;
  const { tag, posts } = getPostsByTagSlug(slug);
  if (posts.length === 0) return { title: "Topic not found" };
  return {
    title: `${tag}`,
    description: `Every HalfSpace piece tagged "${tag}" — ${posts.length} post${posts.length === 1 ? "" : "s"}.`
  };
}

export default async function TagPage({ params }: Params) {
  const { tag: slug } = await params;
  const { tag, posts } = getPostsByTagSlug(slug);
  if (posts.length === 0) notFound();

  return (
    <div className="mx-auto max-w-6xl px-6 pb-24 pt-12">
      <header className="reveal">
        <p className="eyebrow">
          <Link href="/tags" className="nav-link">
            All topics
          </Link>
          {" / "}
          <span>Filed under</span>
        </p>
        <h1 className="headline mt-2 text-4xl md:text-6xl">{tag}</h1>
        <p className="mt-4 text-lg italic text-[color:var(--color-ink-soft)]">
          {posts.length} piece{posts.length === 1 ? "" : "s"} under this tag.
        </p>
      </header>

      <div className="hairline my-10" />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((p, i) => (
          <PostCard key={p.slug} post={p} index={i} />
        ))}
      </div>
    </div>
  );
}
