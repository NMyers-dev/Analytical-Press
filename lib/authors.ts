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
