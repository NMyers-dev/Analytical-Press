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
