import { getAllPosts } from "@/lib/posts";
import { getAuthor } from "@/lib/authors";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://analytical-press.netlify.app";

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const posts = getAllPosts().slice(0, 50);
  const items = posts
    .map((p) => {
      const author = getAuthor(p.frontmatter.author);
      return `
      <item>
        <title>${escapeXml(p.frontmatter.title)}</title>
        <link>${SITE_URL}/posts/${p.slug}</link>
        <guid>${SITE_URL}/posts/${p.slug}</guid>
        <pubDate>${new Date(p.frontmatter.date).toUTCString()}</pubDate>
        ${author ? `<author>${escapeXml(author.fullName)}</author>` : ""}
        ${p.frontmatter.description ? `<description>${escapeXml(p.frontmatter.description)}</description>` : ""}
      </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>Halfspace</title>
    <link>${SITE_URL}</link>
    <description>Writing and data on the world's game.</description>
    <language>en-us</language>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate"
    }
  });
}
