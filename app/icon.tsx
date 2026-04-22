import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/**
 * Browser-tab favicon for HalfSpace. Renders an "HS" monogram in the
 * site's pitch-green palette. Next auto-serves this as /icon and wires it
 * into the <head> on every route.
 */
export default function Icon() {
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
          color: "#0B3D2E",
          fontFamily: "serif",
          fontSize: 40,
          fontWeight: 700,
          fontStyle: "italic",
          letterSpacing: -2,
          border: "3px solid #0B3D2E"
        }}
      >
        HS
      </div>
    ),
    { ...size }
  );
}
