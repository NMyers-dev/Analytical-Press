import fs from "node:fs";
import path from "node:path";
import type { Author } from "@/types/post";

const AUTHORS_FILE = path.join(process.cwd(), "content", "authors.json");

/**
 * Reads content/authors.json and returns the author list.
 *
 * The file is shaped as `{ "authors": [...] }` to match Decap CMS's
 * expectations for a files-collection entry. For backwards compatibility we
 * also accept a bare array at the root.
 */
export function getAuthors(): Author[] {
  if (!fs.existsSync(AUTHORS_FILE)) return [];
  const raw = fs.readFileSync(AUTHORS_FILE, "utf8");
  const parsed = JSON.parse(raw);
  if (Array.isArray(parsed)) return parsed as Author[];
  if (parsed && Array.isArray(parsed.authors)) return parsed.authors as Author[];
  return [];
}

export function getAuthor(slug: string): Author | null {
  return getAuthors().find((a) => a.slug === slug) ?? null;
}

/**
 * Given a social platform key and a URL, returns a short @handle for display.
 *
 * Each platform formats its URLs differently, so we do a light bit of parsing
 * per platform rather than one big regex. Returns `null` when we can't extract
 * a sensible handle (bad URL, website, etc.) — callers should fall back to
 * just showing the platform label.
 */
export function handleFromUrl(
  platform:
    | "twitter"
    | "linkedin"
    | "github"
    | "bluesky"
    | "substack",
  url: string
): string | null {
  if (!url) return null;
  let u: URL;
  try {
    u = new URL(url);
  } catch {
    return null;
  }
  // Trim a leading slash and any trailing slash so path.split works cleanly.
  const path = u.pathname.replace(/^\/+|\/+$/g, "");
  const firstSegment = path.split("/")[0] ?? "";

  switch (platform) {
    case "twitter":
      // x.com/handle or twitter.com/handle
      return firstSegment ? `@${firstSegment}` : null;
    case "github":
      // github.com/handle
      return firstSegment ? `@${firstSegment}` : null;
    case "linkedin": {
      // linkedin.com/in/handle  — the vanity id lives one level deep
      const parts = path.split("/");
      const idx = parts.indexOf("in");
      const handle = idx >= 0 ? parts[idx + 1] : parts[0];
      return handle ? `@${handle}` : null;
    }
    case "bluesky": {
      // bsky.app/profile/name.bsky.social
      const parts = path.split("/");
      const idx = parts.indexOf("profile");
      const handle = idx >= 0 ? parts[idx + 1] : parts[0];
      return handle ? `@${handle}` : null;
    }
    case "substack": {
      // https://name.substack.com  — handle lives in the subdomain
      const host = u.hostname.replace(/^www\./, "");
      const sub = host.endsWith(".substack.com")
        ? host.slice(0, -".substack.com".length)
        : null;
      // Custom domains: fall back to the bare hostname.
      return sub ? `@${sub}` : host ? `@${host}` : null;
    }
    default:
      return null;
  }
}
