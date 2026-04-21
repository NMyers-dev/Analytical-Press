#!/usr/bin/env node
/**
 * Scaffold a new post file.
 *
 * Usage:
 *   npm run new-post -- "My piece title" --author author-one
 *   npm run new-post -- "My piece title" --author author-two --notebook path/to/file.ipynb
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const postsDir = path.resolve(__dirname, "..", "content", "posts");

function slugify(s) {
  return s
    .toLowerCase()
    .trim()
    .replace(/['"]+/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

function parseArgs(argv) {
  const args = { title: "", author: "author-one", notebook: null };
  const rest = argv.slice(2);
  const positional = [];
  for (let i = 0; i < rest.length; i++) {
    const a = rest[i];
    if (a === "--author") { args.author = rest[++i]; continue; }
    if (a === "--notebook") { args.notebook = rest[++i]; continue; }
    positional.push(a);
  }
  args.title = positional.join(" ").trim();
  return args;
}

function main() {
  const { title, author, notebook } = parseArgs(process.argv);
  if (!title) {
    console.error("Usage: npm run new-post -- \"Your title\" [--author author-one|author-two] [--notebook path/to.ipynb]");
    process.exit(1);
  }
  const slug = slugify(title);
  if (!slug) {
    console.error("Could not derive a slug from that title.");
    process.exit(1);
  }

  fs.mkdirSync(postsDir, { recursive: true });

  if (notebook) {
    const src = path.resolve(process.cwd(), notebook);
    if (!fs.existsSync(src)) {
      console.error("Notebook file not found:", src);
      process.exit(1);
    }
    const out = path.join(postsDir, `${slug}.ipynb`);
    const raw = fs.readFileSync(src, "utf8");
    let nb;
    try { nb = JSON.parse(raw); }
    catch { console.error("That file is not valid JSON."); process.exit(1); }
    nb.metadata = nb.metadata || {};
    nb.metadata.frontmatter = {
      title,
      date: new Date().toISOString().slice(0, 10),
      author,
      description: "",
      tags: []
    };
    fs.writeFileSync(out, JSON.stringify(nb, null, 2));
    console.log("Created", out);
    return;
  }

  const out = path.join(postsDir, `${slug}.md`);
  if (fs.existsSync(out)) {
    console.error("A post with that slug already exists:", out);
    process.exit(1);
  }
  const fm = `---
title: "${title.replace(/"/g, '\\"')}"
date: "${new Date().toISOString().slice(0, 10)}"
author: "${author}"
description: ""
tags: []
---

Write your piece here.
`;
  fs.writeFileSync(out, fm);
  console.log("Created", out);
}

main();
