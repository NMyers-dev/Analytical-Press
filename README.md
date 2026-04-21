# Analytical Press

A small, serious, soccer-themed publication. Built on Next.js (App Router) with flat-file content — Markdown and Jupyter notebooks just drop into `content/posts/` and appear on the site.

The site is public. Only two people (you and your friend) can publish, because publishing means either pushing to the git repo or logging into `/admin`.

## Quick start

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Project layout

```
app/                  # Next.js routes (App Router)
  page.tsx            # Home — the most recent post + grid of others
  about/              # Joint About Us page
  authors/            # Author index and /authors/[slug] pages
  posts/              # Archive and /posts/[slug] pages
  rss.xml/route.ts    # RSS feed
  sitemap.ts          # Sitemap
  robots.ts           # robots.txt
components/           # Presentational components
  SiteHeader.tsx
  SiteFooter.tsx
  PostCard.tsx
  ShareButtons.tsx
  MarkdownRenderer.tsx
  NotebookViewer.tsx
content/
  authors.json        # The two of you: names, bios, avatars, links
  posts/              # Drop .md / .mdx / .ipynb / .html files here
lib/
  posts.ts            # Reads + parses all posts
  authors.ts          # Reads the authors list
  notebook.ts         # Parses Jupyter .ipynb into a clean structure
public/
  admin/              # Decap CMS admin UI (in-browser editor)
  images/             # Profile pictures, uploads
scripts/
  new-post.mjs        # npm run new-post -- "Title" [--author author-two]
```

## Publishing a new post

There are three ways to publish. Pick whichever suits the moment.

### 1. Drop a Markdown file

Create `content/posts/my-title.md`:

```markdown
---
title: "My piece title"
date: "2026-05-01"
author: "author-one"          # or "author-two"
description: "A one-sentence dek."
tags: ["tactics", "essay"]
cover: "/images/uploads/my-cover.jpg"   # optional
featured: false                         # optional
---

Body of the piece here. Markdown, with footnotes, tables, math (via KaTeX)
and fenced code blocks all supported.
```

Commit, push, deploy. Done.

### 2. Drop a Jupyter notebook

Drop `my-notebook.ipynb` into `content/posts/`. Put the frontmatter either in the notebook's metadata as a `frontmatter` object, or as a fenced YAML block at the top of the first markdown cell (wrapped in `---`).

The notebook viewer renders markdown cells as prose, code cells with syntax highlighting, and executes nothing at display time — it shows the saved outputs (text, tables, PNGs, SVGs, HTML).

To scaffold a notebook post from an existing `.ipynb` file:

```bash
npm run new-post -- "My notebook title" --author author-two --notebook ./path/to/file.ipynb
```

### 3. In-browser editor

Go to `/admin`. This loads Decap CMS, which gives you a Substack-style writing UI and commits directly to the git repo. Only the two of you can publish — access is gated by Netlify Identity (or GitHub OAuth; see below).

You will need to configure the backend before this works — see Deploying.

## Updating author info (About Us, profile pictures, bylines)

Everything about you and your friend lives in `content/authors.json`. Edit the fields there. Replace `/public/images/authors/author-one.svg` and `author-two.svg` with real photos when you have them (JPG/PNG are fine; just point the `avatar` path at the new file).

Each author has an individual page at `/authors/<slug>` that lists every piece they have written.

## Sharing

Every post renders a row of share buttons: Twitter/X, LinkedIn, Facebook, Bluesky, Reddit, email, and a copy-link button. These open share intents in a new tab — no tracking pixels, no third-party scripts.

## Styling

Times New Roman throughout (both display and body). The palette is pitch green, cream, and a warm gold accent. Buttons and links animate on hover. Animation respects `prefers-reduced-motion`.

To change colors: edit the CSS variables at the top of `app/globals.css` and the matching entries in `tailwind.config.ts`.

## Deploying

The site is a standard Next.js app and will deploy anywhere that supports Next.js (Vercel, Netlify, self-hosted Node). Recommended: **Vercel** (free for this scale).

### On Vercel

1. Push the repo to GitHub.
2. Import the repo at <https://vercel.com/new>.
3. Set environment variable `NEXT_PUBLIC_SITE_URL` to your domain, e.g. `https://analyticalpress.com`.
4. Deploy.

### On Netlify

Deploying on Netlify unlocks the in-browser editor via Netlify Identity — recommended if you want the Substack-style flow.

1. Push to GitHub.
2. Create a site on Netlify from the repo.
3. Enable Netlify Identity (Site settings → Identity). Set registration to **Invite only** and invite both yourselves.
4. Enable Git Gateway (Identity → Services → Git Gateway).
5. Visit `/admin` on your deployed site, log in, and publish.

### Using GitHub OAuth instead

If you deploy elsewhere, edit `public/admin/config.yml` and replace the `backend:` block with:

```yaml
backend:
  name: github
  repo: YOUR-GH-USER/YOUR-REPO
  branch: main
```

and follow Decap's GitHub OAuth setup: <https://decapcms.org/docs/github-backend/>.

## Formats supported in the body

- Markdown (`.md`, `.mdx`) with GitHub-flavored extensions
- Fenced code blocks with syntax highlighting (via highlight.js)
- Math (`$inline$` and `$$block$$`, rendered with KaTeX)
- Jupyter notebooks (`.ipynb`)
- Raw HTML (`.html`) if you want pixel-precise control of a single piece

Add an image by dropping it in `public/images/uploads/` and referencing `/images/uploads/filename.jpg` in your markdown.

## Accessibility

- Skip-to-content link at the top of every page
- All interactive elements focusable; focus ring uses the pitch accent
- Animations opt-out via `prefers-reduced-motion`
- All images have `alt` attributes or are marked decorative

## License

Whatever you want. This is your publication.
