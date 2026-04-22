import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";
import { getAuthors } from "@/lib/authors";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://analytical-press.netlify.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/posts`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/authors`, changeFrequency: "monthly", priority: 0.6 }
  ];
  const authorRoutes: MetadataRoute.Sitemap = getAuthors().map((a) => ({
    url: `${SITE_URL}/authors/${a.slug}`,
    changeFrequency: "weekly",
    priority: 0.6
  }));
  const postRoutes: MetadataRoute.Sitemap = getAllPosts().map((p) => ({
    url: `${SITE_URL}/posts/${p.slug}`,
    lastModified: new Date(p.frontmatter.date),
    changeFrequency: "monthly",
    priority: 0.7
  }));
  return [...staticRoutes, ...authorRoutes, ...postRoutes];
}
