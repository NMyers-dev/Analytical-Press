"use client";

import React, { useMemo, useState } from "react";

/**
 * SortableTable — drop-in wrapper around the <table> rendered by
 * react-markdown. Click a column header to sort; click again to reverse;
 * third click clears. Numeric columns (auto-detected from cell content)
 * sort numerically, everything else alphabetically.
 *
 * Preserves the original react-markdown output (including GFM `align`
 * attributes on th/td from `---:` separators) by walking the rendered
 * children tree and cloning rows in the new order — we never rebuild
 * the cells from raw text, so links/bold/etc. inside cells still work.
 */

type SortDir = "asc" | "desc";

type Props = {
  children?: React.ReactNode;
};

function extractText(node: React.ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (React.isValidElement(node)) {
    const props = node.props as { children?: React.ReactNode };
    return extractText(props.children);
  }
  return "";
}

function parseNumeric(s: string): number | null {
  // Handle common formatting: commas, spaces, %, $, real minus sign,
  // explicit plus sign, parens-for-negative.
  let cleaned = s.trim().replace(/[,\s$%]/g, "").replace(/−/g, "-");
  if (/^\(.+\)$/.test(cleaned)) cleaned = "-" + cleaned.slice(1, -1);
  cleaned = cleaned.replace(/^\+/, "");
  if (cleaned === "" || cleaned === "-") return null;
  const n = Number(cleaned);
  return Number.isFinite(n) ? n : null;
}

function childElements(node: React.ReactNode): React.ReactElement[] {
  const out: React.ReactElement[] = [];
  React.Children.forEach(node, (c) => {
    if (React.isValidElement(c)) out.push(c);
  });
  return out;
}

export default function SortableTable({ children }: Props) {
  const { headerRow, rows, numericCols } = useMemo(() => {
    let headerRow: React.ReactElement | null = null;
    let rows: React.ReactElement[] = [];

    for (const section of childElements(children)) {
      const tagName = typeof section.type === "string" ? section.type : "";
      const inner = (section.props as { children?: React.ReactNode }).children;
      if (tagName === "thead") {
        const trs = childElements(inner);
        if (trs[0]) headerRow = trs[0];
      } else if (tagName === "tbody") {
        rows = childElements(inner);
      }
    }

    const headerCells = headerRow ? childElements((headerRow.props as { children?: React.ReactNode }).children) : [];
    const colCount = headerCells.length;

    // Auto-detect numeric columns: a column is numeric if every non-empty
    // cell parses as a number.
    const numericCols: boolean[] = Array(colCount).fill(true);
    for (const row of rows) {
      const cells = childElements((row.props as { children?: React.ReactNode }).children);
      for (let i = 0; i < colCount; i++) {
        const text = extractText(cells[i]).trim();
        if (text === "") continue;
        if (parseNumeric(text) === null) numericCols[i] = false;
      }
    }

    return { headerRow, rows, numericCols };
  }, [children]);

  const [sortCol, setSortCol] = useState<number | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  const sortedRows = useMemo(() => {
    if (sortCol === null) return rows;
    const isNum = numericCols[sortCol];
    const decorated = rows.map((row) => {
      const cells = childElements((row.props as { children?: React.ReactNode }).children);
      const text = extractText(cells[sortCol]).trim();
      return { row, text, num: parseNumeric(text) };
    });
    decorated.sort((a, b) => {
      if (isNum) {
        if (a.num === null && b.num === null) return 0;
        if (a.num === null) return 1;
        if (b.num === null) return -1;
        return sortDir === "asc" ? a.num - b.num : b.num - a.num;
      }
      return sortDir === "asc"
        ? a.text.localeCompare(b.text)
        : b.text.localeCompare(a.text);
    });
    return decorated.map((d) => d.row);
  }, [rows, sortCol, sortDir, numericCols]);

  function onHeaderActivate(col: number) {
    if (sortCol !== col) {
      setSortCol(col);
      setSortDir("asc");
    } else if (sortDir === "asc") {
      setSortDir("desc");
    } else {
      // Third click clears
      setSortCol(null);
      setSortDir("asc");
    }
  }

  const headerCells = headerRow
    ? childElements((headerRow.props as { children?: React.ReactNode }).children)
    : [];

  // Tables with fewer than 3 rows don't really need sorting.
  const sortable = rows.length >= 3;

  return (
    <table>
      <thead>
        <tr>
          {headerCells.map((th, i) => {
            const props = th.props as {
              children?: React.ReactNode;
              align?: string;
              style?: React.CSSProperties;
              className?: string;
            };
            const active = sortCol === i;
            const ariaSort: "ascending" | "descending" | "none" = active
              ? sortDir === "asc"
                ? "ascending"
                : "descending"
              : "none";
            const arrow = active ? (sortDir === "asc" ? "↑" : "↓") : "";

            if (!sortable) {
              return React.cloneElement(th, { key: i });
            }

            return React.cloneElement(
              th,
              {
                key: i,
                onClick: () => onHeaderActivate(i),
                onKeyDown: (e: React.KeyboardEvent<HTMLTableCellElement>) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onHeaderActivate(i);
                  }
                },
                tabIndex: 0,
                role: "columnheader",
                "aria-sort": ariaSort,
                className: [
                  props.className || "",
                  "hs-sortable-th",
                  active ? "hs-sortable-th--active" : ""
                ]
                  .filter(Boolean)
                  .join(" ")
              } as React.HTMLAttributes<HTMLTableCellElement>,
              <>
                <span className="hs-sort-label">{props.children}</span>
                <span className="hs-sort-arrow" aria-hidden="true">
                  {arrow}
                </span>
              </>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {sortedRows.map((row, i) => React.cloneElement(row, { key: i }))}
      </tbody>
    </table>
  );
}
