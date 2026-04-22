import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import type { Post, PostFormat, PostFrontmatter } from "@/types/post";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

function readPostsDir(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => /\.(md|mdx|ipynb|html)$/i.test(f));
}

function formatFromExt(filename: string): PostFormat {
  if (filename.endsWith(".ipynb")) return "notebook";
  if (filename.endsWith(".html")) return "html";
  return "markdown";
}

function slugFromFilename(filename: string): string {
  return filename.replace(/\.(md|mdx|ipynb|html)$/i, "");
}

function estimateReadingMinutes(text: string): number {
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 225));
}

function parseNotebookFrontmatter(raw: string): {
  fm: PostFrontmatter;
  content: string;
} {
  // ipynb: look for a "frontmatter" field at the top of notebook metadata,
  // or a first markdown cell starting with ---...---
  try {
    const nb = JSON.parse(raw);
    const metaFm = nb?.metadata?.frontmatter;
    if (metaFm && typeof metaFm === "object") {
      return { fm: metaFm as PostFrontmatter, content: raw };
    }
    const firstMd = nb?.cells?.find(
      (c: { cell_type: string }) => c.cell_type === "markdown"
    );
    if (firstMd) {
      const source = Array.isArray(firstMd.source)
        ? firstMd.source.join("")
        : firstMd.source;
      const m = /^---\s*\n([\s\S]*?)\n---/.exec(source);
      if (m) {
        const parsed = matter(`---\n${m[1]}\n---\n`);
        return { fm: parsed.data as PostFrontmatter, content: raw };
      }
    }
  } catch {
    // fall through
  }
  return {
    fm: {
      title: "Untitled notebook",
      date: new Date().toISOString(),
      author: "author-one"
    },
    content: raw
  };
}

export function getAllPosts(): Post[] {
  const files = readPostsDir();
  const posts: Post[] = files.map((filename) => {
    const full = path.join(POSTS_DIR, filename);
    const raw = fs.readFileSync(full, "utf8");
    const format = formatFromExt(filename);
    const slug = slugFromFilename(filename);

    if (format === "notebook") {
      const { fm, content } = parseNotebookFrontmatter(raw);
      return {
        slug,
        format,
        content,
        frontmatter: {
          ...fm,
          readingMinutes:
            fm.readingMinutes ?? estimateReadingMinutes(raw.slice(0, 12000))
        }
      };
    }

    const parsed = matter(raw);
    const fm = parsed.data as PostFrontmatter;
    return {
      slug,
      format,
      content: parsed.content,
      frontmatter: {
        ...fm,
        readingMinutes:
          fm.readingMinutes ?? estimateReadingMinutes(parsed.content)
      }
    };
  });

  return posts.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime()
  );
}

export function getPostBySlug(slug: string): Post | null {
  const posts = getAllPosts();
  return posts.find((p) => p.slug === slug) ?? null;
}

export function getPostsByAuthor(authorSlug: string): Post[] {
  return getAllPosts().filter((p) => p.frontmatter.author === authorSlug);
}

export function getLatestPost(): Post | null {
  const posts = getAllPosts();
  return posts[0] ?? null;
}

export function getRecentPosts(limit = 6, excludeSlug?: string): Post[] {
  return getAllPosts()
    .filter((p) => p.slug !== excludeSlug)
    .slice(0, limit);
}

/**
 * Posts that share at least one tag with the current post, ranked by overlap
 * then by recency. Falls back to most-recent posts if the current piece has
 * no tags or no tag-overlapping siblings exist.
 */
export function getRelatedPosts(currentSlug: string, limit = 3): Post[] {
  const all = getAllPosts();
  const current = all.find((p) => p.slug === currentSlug);
  if (!current) return [];

  const currentTags = new Set(
    (current.frontmatter.tags ?? []).map((t) => tagSlug(t)).filter(Boolean)
  );

  if (currentTags.size === 0) {
    return all.filter((p) => p.slug !== currentSlug).slice(0, limit);
  }

  const scored = all
    .filter((p) => p.slug !== currentSlug)
    .map((p) => {
      const pTags = (p.frontmatter.tags ?? []).map((t) => tagSlug(t));
      const overlap = pTags.filter((t) => currentTags.has(t)).length;
      return { post: p, overlap };
    });

  const withOverlap = scored
    .filter((s) => s.overlap > 0)
    .sort(
      (a, b) =>
        b.overlap - a.overlap ||
        new Date(b.post.frontmatter.date).getTime() -
          new Date(a.post.frontmatter.date).getTime()
    )
    .slice(0, limit)
    .map((s) => s.post);

  if (withOverlap.length >= limit) return withOverlap;

  // Pad with most-recent posts not already included
  const picked = new Set([currentSlug, ...withOverlap.map((p) => p.slug)]);
  const padding = all
    .filter((p) => !picked.has(p.slug))
    .slice(0, limit - withOverlap.length);
  return [...withOverlap, ...padding];
}

/* ---------- Tags ---------- */

export function tagSlug(tag: string): string {
  return tag
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getAllTags(): { tag: string; slug: string; count: number }[] {
  const posts = getAllPosts();
  const map = new Map<string, { tag: string; count: number }>();
  for (const p of posts) {
    for (const t of p.frontmatter.tags ?? []) {
      const s = tagSlug(t);
      if (!s) continue;
      const entry = map.get(s);
      if (entry) entry.count += 1;
      else map.set(s, { tag: t, count: 1 });
    }
  }
  return Array.from(map.entries())
    .map(([slug, v]) => ({ slug, tag: v.tag, count: v.count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

export function getPostsByTagSlug(slug: string): { tag: string; posts: Post[] } {
  const posts = getAllPosts();
  const filtered = posts.filter((p) =>
    (p.frontmatter.tags ?? []).some((t) => tagSlug(t) === slug)
  );
  const first = filtered[0];
  const originalTag =
    (first?.frontmatter.tags ?? []).find((t) => tagSlug(t) === slug) ?? slug;
  return { tag: originalTag, posts: filtered };
}

export function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  } catch {
    return iso;
  }
}
