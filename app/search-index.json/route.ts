import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/posts";
import { getAuthor } from "@/lib/authors";

/**
 * Lightweight search index served as JSON.
 * The client-side <Search> component fetches this once and filters in memory.
 * Kept deliberately tiny — only the fields needed for title/description/tag match.
 */
export function GET() {
  const posts = getAllPosts();
  const index = posts.map((p) => {
    const a = getAuthor(p.frontmatter.author);
    return {
      slug: p.slug,
      title: p.frontmatter.title,
      description: p.frontmatter.description ?? "",
      tags: p.frontmatter.tags ?? [],
      author: a?.fullName ?? p.frontmatter.author,
      date: p.frontmatter.date,
      format: p.format
    };
  });
  return NextResponse.json(index, {
    headers: {
      "Cache-Control": "s-maxage=3600, stale-while-revalidate"
    }
  });
}
