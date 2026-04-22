import type { Metadata } from "next";
import "./globals.css";
import "katex/dist/katex.min.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import NetlifyIdentity from "@/components/NetlifyIdentity";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://analytical-press.netlify.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Halfspace",
    template: "%s - Halfspace"
  },
  description:
    "Halfspace. Long-form writing, data work, and film study on the world's game.",
  openGraph: {
    title: "Halfspace",
    description:
      "Long-form writing, data work, and film study on the world's game.",
    type: "website",
    siteName: "Halfspace",
    url: SITE_URL
  },
  twitter: {
    card: "summary_large_image",
    title: "Halfspace",
    description:
      "Long-form writing, data work, and film study on the world's game.",
    creator: "@NMyersAnalytics"
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NetlifyIdentity />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-chalk focus:px-3 focus:py-2"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="min-h-[70vh]">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}