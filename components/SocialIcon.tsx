import type { SVGProps } from "react";

/**
 * Monochrome social icons.
 *
 * Brand marks (twitter/X, github, linkedin, bluesky, substack) are filled
 * silhouettes — that's how the real logos read. Generic affordances (email,
 * website) use stroked line-art that matches ThemeToggle's sun/moon.
 *
 * All icons use `currentColor`, so they inherit the text color of whatever
 * container they sit in and re-theme automatically with the page.
 */

export type SocialPlatform =
  | "twitter"
  | "github"
  | "linkedin"
  | "bluesky"
  | "substack"
  | "email"
  | "website";

type Props = {
  platform: SocialPlatform;
  size?: number;
} & Omit<SVGProps<SVGSVGElement>, "children">;

export default function SocialIcon({
  platform,
  size = 18,
  ...rest
}: Props) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    "aria-hidden": true as const,
    ...rest
  };

  switch (platform) {
    case "twitter":
      // X (Twitter's current mark)
      return (
        <svg {...common} fill="currentColor">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );

    case "github":
      return (
        <svg {...common} fill="currentColor">
          <path d="M12 0C5.374 0 0 5.374 0 12c0 5.302 3.438 9.8 8.207 11.387.6.111.82-.261.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.807 1.305 3.492.998.108-.776.418-1.305.762-1.604-2.665-.305-5.466-1.333-5.466-5.93 0-1.31.468-2.38 1.236-3.22-.124-.303-.536-1.524.117-3.176 0 0 1.008-.322 3.3 1.23A11.5 11.5 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.654 1.653.242 2.874.12 3.176.77.84 1.234 1.911 1.234 3.22 0 4.61-2.805 5.625-5.477 5.922.43.372.823 1.102.823 2.222 0 1.605-.014 2.898-.014 3.293 0 .319.216.694.825.577C20.565 21.795 24 17.295 24 12c0-6.626-5.373-12-12-12z" />
        </svg>
      );

    case "linkedin":
      return (
        <svg {...common} fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.063 2.063 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.978 0 1.778-.773 1.778-1.729V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      );

    case "bluesky":
      return (
        <svg {...common} fill="currentColor">
          <path d="M5.203 3.769C7.962 5.826 10.93 9.998 12 12.237c1.07-2.24 4.037-6.411 6.797-8.468 1.992-1.484 5.203-2.633 5.203 1.053 0 .737-.422 6.185-.67 7.07-.861 3.075-3.997 3.858-6.789 3.382 4.88.831 6.122 3.584 3.441 6.337-5.09 5.227-7.316-1.312-7.886-2.988-.105-.307-.154-.451-.154-.328 0-.123-.05.02-.154.328-.57 1.676-2.795 8.215-7.886 2.988-2.681-2.753-1.439-5.506 3.44-6.337-2.79.476-5.927-.307-6.788-3.382C.417 11.008 0 5.559 0 4.822c0-3.686 3.211-2.537 5.203-1.053z" />
        </svg>
      );

    case "substack":
      return (
        <svg {...common} fill="currentColor">
          <path d="M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z" />
        </svg>
      );

    case "email":
      // Envelope — lucide-style stroked
      return (
        <svg
          {...common}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      );

    case "website":
      // Globe — lucide-style stroked
      return (
        <svg
          {...common}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="10" />
          <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
          <path d="M2 12h20" />
        </svg>
      );
  }
}
