export type PostFormat = "markdown" | "notebook" | "html";

export type PostFrontmatter = {
  title: string;
  date: string; // ISO date
  author: string; // author slug
  tags?: string[];
  description?: string;
  cover?: string;
  featured?: boolean;
  readingMinutes?: number;
};

export type Post = {
  slug: string;
  format: PostFormat;
  content: string; // raw markdown, raw html, or raw ipynb JSON
  frontmatter: PostFrontmatter;
};

export type Author = {
  slug: string;
  displayName: string;
  fullName: string;
  title: string;
  bio: string;
  longBio?: string;
  avatar: string;
  location?: string;
  links?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    email?: string;
    website?: string;
    bluesky?: string;
    substack?: string;
  };
};
