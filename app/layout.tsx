import type { Metadata } from "next";
import "./globals.css";
import "katex/dist/katex.min.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import NetlifyIdentity from "@/components/NetlifyIdentity";

export const metadata: Metadata = {
  title: {
    default: "Analytical Press",
    template: "%s - Analytical Press"
  },
  description:
    "Analytical Press. Long-form writing, data work, and film study on the world's game.",
  openGraph: {
    title: "Analytical Press",
    description:
      "Long-form writing, data work, and film study on the world's game.",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "Analytical Press",
    description:
      "Long-form writing, data work, and film study on the world's game."
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