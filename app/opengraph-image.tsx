import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "HalfSpace";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Site-wide Open Graph image. Used as the share preview for the home page
 * and any route that doesn't define its own opengraph-image.
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
          justifyContent: "space-between",
          padding: "80px",
          background: "#F6F3EA",
          color: "#1B3A2F",
          fontFamily: "serif"
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            fontSize: 28,
            letterSpacing: 8,
            textTransform: "uppercase",
            color: "#6B6151"
          }}
        >
          <span
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 72,
              height: 72,
              border: "3px solid #1B3A2F",
              color: "#1B3A2F",
              fontSize: 36,
              fontWeight: 700,
              letterSpacing: 0,
              fontStyle: "italic"
            }}
          >
            HS
          </span>
          <span>Est. 2026</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 220,
              lineHeight: 1,
              fontWeight: 700,
              letterSpacing: -4,
              display: "flex"
            }}
          >
            HalfSpace
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            fontSize: 32,
            color: "#6B6151"
          }}
        >
          <span style={{ fontStyle: "italic" }}>
            Writing and data on the world&apos;s game.
          </span>
          <span style={{ letterSpacing: 4, textTransform: "uppercase" }}>
            halfSpace
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
