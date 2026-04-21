import fs from "node:fs";
import path from "node:path";
import type { Author } from "@/types/post";

const AUTHORS_FILE = path.join(process.cwd(), "content", "authors.json");

export function getAuthors(): Author[] {
  if (!fs.existsSync(AUTHORS_FILE)) return [];
  const raw = fs.readFileSync(AUTHORS_FILE, "utf8");
  const parsed = JSON.parse(raw) as Author[];
  return parsed;
}

export function getAuthor(slug: string): Author | null {
  return getAuthors().find((a) => a.slug === slug) ?? null;
}
