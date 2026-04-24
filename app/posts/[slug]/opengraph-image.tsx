import { ImageResponse } from "next/og";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { getAuthor } from "@/lib/authors";

export const runtime = "nodejs";
export const alt = "HalfSpace post";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://analytical-press.netlify.app";

/* Palette — kept in sync with globals.css but hardcoded here because
   next/og doesn't read our stylesheet. */
const COLORS = {
  bg: "#0B2A22", // pitch, deep
  bgEdge: "#07201A",
  ink: "#F4EFE6", // chalk
  inkSoft: "#BDB6A8",
  accent: "#D4A373" // warm accent
};

/**
 * Per-post Open Graph image, 1200x630 (the Twitter/X and Facebook sweet spot).
 *
 * Design goals:
 *  - High contrast so it pops in a Twitter feed (dark pitch-green bg, cream ink).
 *  - Editorial hierarchy: small eyebrow → giant title → italic dek → byline.
 *  - A warm accent stripe down the left edge signals "this is a piece", not a tweet.
 *  - Title type scale flexes with character count so long titles stay on 3 lines.
 *  - If the post has a cover image, it's used as a dimmed right-column inset —
 *    otherwise the layout fills the full width with typography.
 */
export default async function Image({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  // Graceful fallback — should only fire during weird edge-case builds.
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
            background: COLORS.bg,
            color: COLORS.ink,
            fontFamily: "serif",
            fontSize: 96,
            letterSpacing: 4
          }}
        >
          HalfSpace
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
  const firstTag = post.frontmatter.tags?.[0];
  const kicker = post.format === "notebook" ? "NOTEBOOK" : "ESSAY";
  const eyebrowRight = firstTag
    ? `${kicker} · ${firstTag.toUpperCase()}`
    : kicker;

  // Title sizing: the longer the title, the smaller the type.
  const titleSize =
    title.length > 70 ? 64 : title.length > 50 ? 78 : title.length > 30 ? 96 : 108;

  // Cover image handling — if present, use as a dimmed background image so
  // the composition feels like a magazine cover rather than a plain card.
  const coverUrl = post.frontmatter.cover
    ? `${SITE_URL}${post.frontmatter.cover}`
    : null;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          fontFamily: "serif",
          color: COLORS.ink,
          background: `linear-gradient(135deg, ${COLORS.bg} 0%, ${COLORS.bgEdge} 100%)`,
          position: "relative"
        }}
      >
        {/* Dimmed cover image (if any) fills behind the content */}
        {coverUrl ? (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex"
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
            <img
              src={coverUrl}
              width={1200}
              height={630}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: 0.22,
                filter: "saturate(1.1)"
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: `linear-gradient(120deg, ${COLORS.bg} 45%, rgba(11,42,34,0.55) 100%)`
              }}
            />
          </div>
        ) : null}

        {/* Accent stripe down the left edge */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            width: 10,
            background: COLORS.accent,
            display: "flex"
          }}
        />

        {/* Eyebrow row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "56px 80px 0 80px",
            fontSize: 24,
            letterSpacing: 10,
            textTransform: "uppercase",
            color: COLORS.inkSoft,
            zIndex: 1
          }}
        >
          <span style={{ color: COLORS.ink, letterSpacing: 14 }}>
            HALFSPACE
          </span>
          <span>{eyebrowRight}</span>
        </div>

        {/* Title + dek */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            padding: "40px 80px 0 80px",
            justifyContent: "center",
            zIndex: 1
          }}
        >
          <div
            style={{
              fontSize: titleSize,
              lineHeight: 1.02,
              letterSpacing: -1,
              display: "flex"
            }}
          >
            {title}
          </div>
          {description ? (
            <div
              style={{
                marginTop: 32,
                fontSize: 34,
                lineHeight: 1.3,
                fontStyle: "italic",
                color: COLORS.inkSoft,
                display: "flex",
                maxWidth: 1000
              }}
            >
              {description.length > 150
                ? description.slice(0, 147) + "…"
                : description}
            </div>
          ) : null}
        </div>

        {/* Byline row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 80px 56px 80px",
            fontSize: 26,
            color: COLORS.inkSoft,
            zIndex: 1
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            {/* Author initial badge — works without needing avatar fetch */}
            {author ? (
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: 26,
                  background: COLORS.accent,
                  color: COLORS.bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 26,
                  fontStyle: "normal"
                }}
              >
                {author.fullName
                  .split(" ")
                  .map((p) => p[0])
                  .slice(0, 2)
                  .join("")}
              </div>
            ) : null}
            <span style={{ color: COLORS.ink, fontSize: 28 }}>
              {author ? `By ${author.fullName}` : "HalfSpace"}
            </span>
          </div>
          <span style={{ letterSpacing: 4, textTransform: "uppercase" }}>
            {date}
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
