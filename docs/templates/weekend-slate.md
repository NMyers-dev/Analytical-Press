# "This weekend's slate" template

A short recurring post format for Fridays — three or four matches we're watching, one paragraph each on why. Quick to write, gives readers a rhythm, and builds up a little archive of your read on the weekend.

## How to use it

1. Copy the block below.
2. Paste into a new file at `content/posts/slate-YYYY-MM-DD.md` using the Friday of that weekend as the date (e.g., `slate-2026-04-24.md`).
3. Fill in the title, the dek, the three or four matches, and the kicker.
4. Leave the `tags: ["slate", "weekend"]` line alone — that's what makes every slate post show up together at `/tags/slate`.
5. Commit, push, done.

## The template — copy from here

```markdown
---
title: "Weekend slate: <one-line teaser>"
date: "2026-04-24"
author: "nick-myers"
description: "Three matches we're watching this weekend and the question each one is asking."
tags: ["slate", "weekend"]
featured: false
---

A short setup paragraph. One or two sentences on the week that's just passed, the mood going into the weekend, or a thread that ties the three matches together. Don't overwrite it — this is the chat-message tone.

## 1. <Home> vs. <Away> — <League>, <Day/time local>

Who's playing, what the stakes are, and the one specific thing you're watching for. A sentence on recent form, a sentence on the tactical question. Link to any HalfSpace piece that's relevant — e.g., "we wrote about [the inverted fullback](/posts/on-the-inverted-fullback) last month, and this is the weekend it either proves the thesis or buries it."

## 2. <Home> vs. <Away> — <League>, <Day/time local>

Same treatment. If there's a data angle — a player's form, an xG chart, a pressing stat — drop it in. One sentence is enough.

## 3. <Home> vs. <Away> — <League>, <Day/time local>

The wildcard match. The one nobody else is writing about that we think is interesting.

## Also on our radar

One or two short bullets for matches we'll have on in the background — no paragraph needed, just the fixture and why.

- **<Home> vs. <Away>** — one short line.
- **<Home> vs. <Away>** — one short line.

---

*We'll be back on Monday with the recap on whichever of these turned into a piece.*
```

## Tips

- **Keep the tone casual.** This isn't a preview article; it's the group chat. Short sentences, first person plural, a joke if it's right there.
- **The dek (description) is the money line on share previews.** Put the most interesting sentence there, not in the body. Think Twitter.
- **Link back to essays where you can.** Every slate post is a chance to point at your own older writing; it keeps the archive alive.
- **Alternate who writes it.** If Ryan writes this week, change `author: "nick-myers"` to `author: "ryan-zaj"`. Makes each slate feel like a real voice rather than a committee.
- **Archive view at `/tags/slate`.** Once you have a few, readers can browse just the slates. The site handles that routing automatically because of the `tags` field.

## Optional enhancement

Down the road, you could add a `/slates` route that lists just these posts with a calendar-style layout (grouped by month). Say the word if you want that built.
