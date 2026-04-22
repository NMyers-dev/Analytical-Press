import { ImageResponse } from "next/og";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { getAuthor } from "@/lib/authors";

export const runtime = "nodejs";
export const alt = "Halfspace post";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

/**
 * Per-post Open Graph image. Renders the post title, dek, author byline,
 * and publication date so social shares always have a rich, branded preview
 * even if the post has no cover image.
 */
export default async function Image({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#F6F3EA",
            color: "#1B3A2F",
            fontFamily: "serif",
            fontSize: 72
          }}
        >
          Halfspace
        </div>
      ),
      { ...size }
    );
  }

  const author = getAuthor(post.frontmatter.author);
  const date = post.frontmatter.date
    ? new Date(post.frontmatter.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      })
    : "";
  const title = post.frontmatter.title || "Untitled";
  const description = post.frontmatter.description || "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#F6F3EA",
          color: "#1B3A2F",
          fontFamily: "serif"
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "2px solid #1B3A2F",
            paddingBottom: 20,
            fontSize: 26,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#6B6151"
          }}
        >
          <span>Halfspace</span>
          <span>{post.format === "notebook" ? "Notebook" : "Essay"}</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "center", paddingTop: 28, paddingBottom: 28 }}>
          <div
            style={{
              fontSize: title.length > 60 ? 64 : title.length > 36 ? 78 : 96,
              lineHeight: 1.05,
              fontWeight: 700,
              display: "flex"
            }}
          >
            {title}
          </div>
          {description ? (
            <div
              style={{
                marginTop: 28,
                fontSize: 32,
                fontStyle: "italic",
                color: "#3D463F",
                lineHeight: 1.3,
                display: "flex"
              }}
            >
              {description.length > 140
                ? description.slice(0, 137) + "..."
                : description}
            </div>
          ) : null}
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 28,
            color: "#6B6151",
            borderTop: "1px solid #B9B1A0",
            paddingTop: 22
          }}
        >
          <span>{author ? `By ${author.fullName}` : "Halfspace"}</span>
          <span style={{ letterSpacing: 3, textTransform: "uppercase" }}>
            {date}
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
