import { ImageResponse } from "next/og";
import { getAuthor, getAuthors } from "@/lib/authors";

export const runtime = "nodejs";
export const alt = "Halfspace author";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return getAuthors().map((a) => ({ slug: a.slug }));
}

/**
 * Per-author Open Graph image. Renders the author's name, title, and bio
 * so sharing an author page produces a proper branded preview.
 */
export default async function Image({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const author = getAuthor(slug);
  const fullName = author?.fullName || "Author";
  const title = author?.title || "";
  const bio = author?.bio || "";

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
          <span>About</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "center", paddingTop: 28, paddingBottom: 28 }}>
          <div
            style={{
              fontSize: 30,
              letterSpacing: 6,
              textTransform: "uppercase",
              color: "#6B6151",
              display: "flex"
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: fullName.length > 24 ? 96 : 120,
              lineHeight: 1.05,
              fontWeight: 700,
              marginTop: 16,
              display: "flex"
            }}
          >
            {fullName}
          </div>
          {bio ? (
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
              {bio.length > 180 ? bio.slice(0, 177) + "..." : bio}
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
            paddingTop: 22,
            fontStyle: "italic"
          }}
        >
          <span>Writing and data on the world&apos;s game.</span>
          <span style={{ letterSpacing: 3, fontStyle: "normal", textTransform: "uppercase" }}>
            halfspace
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
