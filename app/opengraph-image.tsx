import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Analytical Press";
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
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 28,
              letterSpacing: 8,
              textTransform: "uppercase",
              color: "#6B6151"
            }}
          >
            Est. 2026
          </div>
          <div
            style={{
              fontSize: 140,
              lineHeight: 1,
              marginTop: 24,
              fontWeight: 700
            }}
          >
            Analytical
          </div>
          <div
            style={{
              fontSize: 140,
              lineHeight: 1,
              fontWeight: 700,
              fontStyle: "italic"
            }}
          >
            Press
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
            analytical-press
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
