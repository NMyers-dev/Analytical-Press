import Link from "next/link";
import { getLatestPost, getRecentPosts } from "@/lib/posts";
import { getAuthors } from "@/lib/authors";
import PostCard from "@/components/PostCard";

export default function HomePage() {
  const latest = getLatestPost();
  const recent = getRecentPosts(6, latest?.slug);
  const authors = getAuthors();

  return (
    <div className="mx-auto max-w-6xl px-6 pb-20">
      <section className="pt-10 md:pt-14">
        {latest ? (
          <PostCard post={latest} variant="featured" />
        ) : (
          <div className="border-y border-[color:var(--color-rule)] py-16 text-center">
            <p className="eyebrow">No Posts Yet</p>
            <h2 className="headline mt-2 text-3xl">
              Your first piece will appear here.
            </h2>
            <p className="mt-3 text-[color:var(--color-ink-soft)]">
              Drop a markdown file into <code>/content/posts</code> and it
              will be published on the next build.
            </p>
          </div>
        )}
      </section>

      {recent.length > 0 && (
        <section className="mt-16">
          <div className="mb-6 flex items-baseline justify-between">
            <h2 className="eyebrow">More from the desk</h2>
            <Link href="/posts" className="nav-link text-sm">
              See the archive
            </Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recent.map((p, i) => (
              <PostCard post={p} key={p.slug} index={i} />
            ))}
          </div>
        </section>
      )}

      {authors.length > 0 && (
        <section className="mt-20">
          <div className="mb-6 flex items-baseline justify-between">
            <h2 className="eyebrow">Bylines</h2>
            <Link href="/about" className="nav-link text-sm">
              About the publication
            </Link>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            {authors.map((a) => (
              <Link
                key={a.slug}
                href={`/authors/${a.slug}`}
                className="group flex items-center gap-5 border border-[color:var(--color-rule)] p-5 transition-all duration-500 hover:-translate-y-1 hover:border-[color:var(--color-pitch)]"
              >
                <span
                  className="inline-block h-20 w-20 flex-none overflow-hidden rounded-full border border-[color:var(--color-rule)] bg-[color:var(--color-bg-subtle)]"
                  aria-hidden="true"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={a.avatar}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </span>
                <span className="flex-1">
                  <span className="eyebrow block">{a.title}</span>
                  <span className="mt-1 block text-xl headline">
                    {a.fullName}
                  </span>
                  <span className="mt-2 block text-sm italic text-[color:var(--color-ink-soft)]">
                    {a.bio}
                  </span>
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
