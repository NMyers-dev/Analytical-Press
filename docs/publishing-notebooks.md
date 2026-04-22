# Publishing a Jupyter notebook to HalfSpace via GitHub

This is the no-terminal way to put a `.ipynb` file on the site. You upload the notebook file directly through GitHub's website, GitHub commits it to the repo, Netlify sees the commit and rebuilds the site, and a few minutes later the notebook is live at `https://analytical-press.netlify.app/posts/<notebook-filename>`.

You will need: a notebook file on your computer, a GitHub account with access to `NMyers-dev/Analytical-Press`, and a browser.

---

## Step 1 — Add frontmatter to the notebook

Before you upload, the notebook needs a bit of metadata at the top so HalfSpace knows the title, author, and date. This takes about thirty seconds in Jupyter or VS Code.

Open the `.ipynb` file in whatever you used to write it. Click the very first cell. Make it a **Markdown** cell (in Jupyter: cell type dropdown → Markdown; in VS Code: the toggle at the bottom-right of the cell, or `M` with the cell selected).

Paste this into that cell, editing the values to match your piece:

```
---
title: "Shot quality, from angle and distance"
date: "2026-04-22"
author: "nick-myers"
description: "What finishing actually means once you strip out the geometry."
tags: ["analysis", "xG"]
featured: false
---
```

Rules for each field:

- **title** — the headline that appears on the post and in share previews. Use quotes.
- **date** — `"YYYY-MM-DD"`, in quotes. This controls the sort order on the home page and archive.
- **author** — must be `"nick-myers"` or `"ryan-zaj"` exactly. These are the slugs from `content/authors.json`.
- **description** — one sentence. Shows up under the title on the post page and in Twitter/LinkedIn share cards. Optional but strongly recommended.
- **tags** — short list of topic tags. Optional.
- **featured** — `true` or `false`. Featured posts get the big slot on the home page. Usually leave this `false`.

Save the notebook. Close it.

## Step 2 — Go to the right folder on GitHub

Open this URL in your browser:

`https://github.com/NMyers-dev/Analytical-Press/tree/main/content/posts`

That's the folder every post lives in. You should see the existing posts listed there — `welcome-to-analytical-press.md`, `on-the-inverted-fullback.md`, etc.

If you're not already signed into GitHub, you'll be prompted to sign in.

## Step 3 — Upload the notebook

On that page, click the green **Add file** button near the top right, then choose **Upload files** from the dropdown.

You get a page with a big drop zone. Either drag the `.ipynb` file onto the drop zone from Finder / File Explorer, or click **choose your files** and pick it.

Wait for the upload to finish. The file appears in a list at the top of the page with a green check next to it.

## Step 4 — Commit the upload

Scroll down. You'll see a **Commit changes** section with two text boxes and some radio buttons.

- In the first box, write a commit message. Keep it short and descriptive, e.g. `Add notebook: shot quality from angle and distance`.
- Leave the second box empty.
- Leave **Commit directly to the `main` branch** selected (the default).

Click the green **Commit changes** button.

GitHub takes you back to the folder view and you should see your new file at the bottom of the list.

## Step 5 — Wait for Netlify to rebuild

Netlify sees the commit and starts a new build automatically. You can watch it if you want:

`https://app.netlify.com` → Sites → analytical-press → **Deploys** tab.

You'll see a new deploy at the top with a spinning icon and a status of "Building" or "Deploying". Builds usually take two to three minutes. When it flips to **Published**, the notebook is live.

If you don't want to watch, just check the URL after five minutes.

## Step 6 — Verify it's live

Go to `https://analytical-press.netlify.app/posts/<filename-without-extension>`.

So if the file is called `shot-quality-notebook.ipynb`, the URL is `https://analytical-press.netlify.app/posts/shot-quality-notebook`.

You should see the notebook rendered as a post — markdown cells as prose, code cells with syntax highlighting, and any images/plots the notebook saved as outputs displayed inline.

The front page (`/`) and the archive (`/posts`) will also now show the new post.

---

## Uploading images the notebook *doesn't* already embed

If the notebook contains `matplotlib` plots or other outputs that were saved when you ran the notebook, those are already inside the `.ipynb` file as base64 PNGs — you don't need to do anything, they render automatically.

If instead you want to reference an image from Markdown cells (e.g., a photograph, a diagram you made elsewhere), upload the image separately:

1. Go to `https://github.com/NMyers-dev/Analytical-Press/tree/main/public/images/uploads`
2. **Add file → Upload files**, drag your image, commit.
3. In a Markdown cell of your notebook, reference it as `![alt text](/images/uploads/your-image-name.jpg)`.

Then re-upload the notebook following Steps 3–4 above (GitHub will ask if you want to replace the file if the name matches; say yes).

## Editing a notebook you already published

1. Edit the `.ipynb` locally, save it.
2. Go to the existing file on GitHub, e.g. `https://github.com/NMyers-dev/Analytical-Press/blob/main/content/posts/shot-quality-notebook.ipynb`.
3. Click the pencil icon in the top right, OR use the **Add file → Upload files** flow again and upload the new version under the same filename. GitHub will replace it and commit.
4. Commit directly to `main`. Netlify rebuilds.

## Deleting a post

1. Navigate to the file on GitHub, e.g. `https://github.com/NMyers-dev/Analytical-Press/blob/main/content/posts/some-post.md`.
2. Click the trash-can icon in the top right of the file view.
3. Scroll down, write a commit message, commit to `main`.

## Common problems

**The notebook uploaded but the post doesn't appear on the site.**  
Almost always a frontmatter problem. Check:

- Is the first cell a Markdown cell (not code)?
- Are the three dashes on their own lines — `---` at the top and `---` at the bottom of the frontmatter?
- Is `author` set to exactly `"nick-myers"` or `"ryan-zaj"`? A typo here causes the post to silently drop.
- Is `date` in `"YYYY-MM-DD"` format?

**Netlify build failed.**  
Open the failed deploy on Netlify and scroll through the log. Most notebook-caused failures are malformed JSON — Jupyter wrote a bad `.ipynb` for some reason. Reopen it in Jupyter, run "Validate", re-save, re-upload.

**The post is live but looks broken.**  
Notebooks with very long outputs, interactive widgets (`ipywidgets`), or unusual HTML can render strangely. Stick to static outputs — plots, printed dataframes, markdown, simple HTML — and they'll render cleanly.

**I want to unpublish immediately, not wait for the build.**  
You can't. The fastest path is deleting the file via the trash icon (Step described above) and waiting for the rebuild. Don't try to edit Netlify directly.

---

## Cheat sheet

1. Add frontmatter to the first markdown cell of your notebook, save.
2. GitHub → `content/posts` folder → Add file → Upload files → drag → commit to main.
3. Wait ~3 minutes.
4. Visit `/posts/<filename>` to verify.
