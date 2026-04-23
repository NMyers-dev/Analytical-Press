# Tables in posts

Markdown tables now render in the HalfSpace editorial style — serif type, hairline rules, quiet zebra-striping, tabular numerals, and a horizontal scroll on narrow screens. You don't have to do anything special; just write a standard GFM table and it picks up the styles automatically.

## Basic table

```markdown
| Player        | Club           | Minutes | Goals | xG   |
| ------------- | -------------- | ------: | ----: | ---: |
| Bukayo Saka   | Arsenal        |   2,845 |    14 | 12.3 |
| Mohamed Salah | Liverpool      |   3,102 |    19 | 17.8 |
| Erling Haaland| Manchester City|   2,670 |    27 | 23.1 |
```

## Alignment

Use the colons in the separator row to set column alignment:

- `| ---- |`  → left (default)
- `| :--- |`  → left (explicit)
- `| ---: |`  → right — use this for **all numeric columns**
- `| :--: |`  → center

Right-aligning numbers is the single biggest quality-of-life improvement for readers trying to compare them down a column. The site also switches numeric columns to tabular lining figures so digits line up vertically.

## Captions

React-markdown doesn't ship a caption syntax in GFM, but you can get the same effect by placing an italicized paragraph directly below the table:

```markdown
| xG   | xA  | xT   |
| ---: | --: | ---: |
| 0.42 | 0.08| 0.31 |

*Per 90 minutes, Premier League 2025-26 season. Source: FBref.*
```

## When a table gets wide

Tables scroll horizontally inside their wrapper on narrow screens, so you don't have to worry about breaking the reading measure. That said, if you find yourself with more than ~6 columns, consider breaking it into two smaller tables or moving some columns to prose.

## Sorting

Tables with 3+ rows are **automatically sortable** — readers can click any column header to sort ascending, click again for descending, and click a third time to clear back to the original order. You don't write anything special in the markdown; the site handles it.

Numeric columns are auto-detected (ones where every non-empty cell parses as a number) and sort numerically. Everything else sorts alphabetically. A small arrow (↑ or ↓) appears on the active column so readers can see what's sorted and which direction.

This is especially useful for any table that invites comparison — league leaders, xG vs goals, underperformers — because the reader can re-order by whatever dimension they care about without you having to pick one for them.

## Tips

- **Keep headers short.** The header row is rendered as small-caps eyebrow style — one- or two-word labels read best ("Minutes", not "Total minutes played").
- **Don't over-table.** If two rows of data could be a sentence, write the sentence. Tables earn their keep when you have ≥4 rows or ≥3 columns worth comparing.
- **Round aggressively.** Two decimals max for xG-type stats, zero for counts. Nobody needs `0.4273829`.
- **Link from cells.** Standard markdown links work inside cells — `[Saka](/posts/on-bukayo-saka)` renders fine.
