import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "HalfSpace";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const COLORS = {
  bg: "#0B2A22",
  bgEdge: "#07201A",
  ink: "#F4EFE6",
  inkSoft: "#BDB6A8",
  accent: "#D4A373"
};

/**
 * Site-wide Open Graph image. Used as the share preview for the home page
 * and any route that doesn't define its own opengraph-image.
 *
 * Matches the per-post OG design — same palette, same accent stripe —
 * so the publication reads as a coherent brand across any share.
 */
export default async function Image() {
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
        {/* Accent stripe down left edge */}
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

        {/* Top eyebrow */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "56px 80px 0 80px",
            fontSize: 24,
            letterSpacing: 10,
            textTransform: "uppercase",
            color: COLORS.inkSoft
          }}
        >
          <span style={{ color: COLORS.ink, letterSpacing: 14 }}>HALFSPACE</span>
          <span>EST. 2026</span>
        </div>

        {/* Wordmark — giant, the whole point of the card */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            padding: "0 80px",
            justifyContent: "center"
          }}
        >
          <div
            style={{
              fontSize: 220,
              lineHeight: 0.95,
              letterSpacing: -6,
              display: "flex",
              color: COLORS.ink
            }}
          >
            HalfSpace
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 38,
              fontStyle: "italic",
              color: COLORS.inkSoft,
              display: "flex"
            }}
          >
            Writing and data on the world&apos;s game.
          </div>
        </div>

        {/* Bottom byline */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 80px 56px 80px",
            fontSize: 24,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: COLORS.inkSoft
          }}
        >
          <span>Long-form · Data · Film study</span>
          <span style={{ color: COLORS.accent }}>halfspace.xyz</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
