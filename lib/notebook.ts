/**
 * Lightweight Jupyter notebook (.ipynb) parser.
 * We keep this on the server so we can pre-render cells and ship only
 * what's needed to the client.
 */

export type NotebookOutput =
  | { kind: "stream"; text: string }
  | { kind: "image"; mime: string; data: string }
  | { kind: "html"; html: string }
  | { kind: "text"; text: string }
  | { kind: "error"; text: string };

export type NotebookCell =
  | { kind: "markdown"; source: string }
  | {
      kind: "code";
      source: string;
      executionCount: number | null;
      outputs: NotebookOutput[];
    }
  | { kind: "raw"; source: string };

export type ParsedNotebook = {
  cells: NotebookCell[];
  language: string;
};

function srcToString(source: string | string[] | undefined): string {
  if (!source) return "";
  return Array.isArray(source) ? source.join("") : source;
}

function outputsFromCell(raw: { outputs?: unknown[] }): NotebookOutput[] {
  const outputs = raw.outputs;
  if (!Array.isArray(outputs)) return [];
  const result: NotebookOutput[] = [];

  for (const o of outputs as Array<Record<string, unknown>>) {
    const t = o.output_type as string | undefined;
    if (t === "stream") {
      result.push({
        kind: "stream",
        text: srcToString(o.text as string | string[] | undefined)
      });
      continue;
    }
    if (t === "error") {
      const tb = o.traceback as string[] | undefined;
      const text = Array.isArray(tb)
        ? tb.join("\n").replace(/\u001b\[[0-9;]*m/g, "")
        : `${o.ename ?? "Error"}: ${o.evalue ?? ""}`;
      result.push({ kind: "error", text });
      continue;
    }
    if (t === "display_data" || t === "execute_result") {
      const data = (o.data as Record<string, unknown>) ?? {};
      const pngs = [
        "image/png",
        "image/jpeg",
        "image/gif",
        "image/svg+xml"
      ];
      let handled = false;
      for (const mime of pngs) {
        if (data[mime]) {
          const d = data[mime];
          const str = Array.isArray(d) ? (d as string[]).join("") : (d as string);
          result.push({
            kind: "image",
            mime,
            data: mime === "image/svg+xml" ? str : str.replace(/\s+/g, "")
          });
          handled = true;
          break;
        }
      }
      if (handled) continue;
      if (data["text/html"]) {
        result.push({
          kind: "html",
          html: srcToString(data["text/html"] as string | string[])
        });
        continue;
      }
      if (data["text/plain"]) {
        result.push({
          kind: "text",
          text: srcToString(data["text/plain"] as string | string[])
        });
      }
    }
  }
  return result;
}

export function parseNotebook(raw: string): ParsedNotebook {
  let nb: Record<string, unknown>;
  try {
    nb = JSON.parse(raw);
  } catch {
    return { cells: [], language: "python" };
  }
  const language =
    ((nb.metadata as Record<string, unknown>)?.language_info as
      | Record<string, unknown>
      | undefined)?.name as string | undefined;
  const cellsRaw = (nb.cells as Array<Record<string, unknown>>) ?? [];
  const cells: NotebookCell[] = cellsRaw.map((c) => {
    const kind = c.cell_type as string;
    const source = srcToString(c.source as string | string[]);
    if (kind === "markdown") {
      // strip a frontmatter block if this was the carrier cell
      const cleaned = source.replace(/^---\s*\n[\s\S]*?\n---\s*\n?/, "");
      return { kind: "markdown", source: cleaned };
    }
    if (kind === "code") {
      return {
        kind: "code",
        source,
        executionCount: (c.execution_count as number | null) ?? null,
        outputs: outputsFromCell(c as { outputs?: unknown[] })
      };
    }
    return { kind: "raw", source };
  });
  return { cells, language: language ?? "python" };
}
