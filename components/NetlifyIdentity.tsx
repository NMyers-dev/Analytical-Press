"use client";

import { useEffect } from "react";
import Script from "next/script";

declare global {
  interface Window {
    netlifyIdentity?: {
      on: (event: string, cb: (user?: unknown) => void) => void;
      open: () => void;
    };
  }
}

export default function NetlifyIdentity() {
  useEffect(() => {
    if (typeof window === "undefined" || !window.netlifyIdentity) return;
    window.netlifyIdentity.on("init", (user) => {
      if (!user) {
        window.netlifyIdentity?.on("login", () => {
          window.location.href = "/admin/";
        });
      }
    });
  }, []);

  return (
    <Script
      src="https://identity.netlify.com/v1/netlify-identity-widget.js"
      strategy="afterInteractive"
    />
  );
}