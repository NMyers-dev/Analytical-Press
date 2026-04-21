import type { ParsedNotebook, NotebookCell } from "@/lib/notebook";
import MarkdownRenderer from "./MarkdownRenderer";

type Props = {
  notebook: ParsedNotebook;
};

function CodeCell({ cell, language }: { cell: Extract<NotebookCell, { kind: "code" }>; language: string }) {
  return (
    <div className="my-8 overflow-hidden border border-[color:var(--color-rule)] rounded-sm bg-[color:var(--color-bg)]">
      <div className="flex items-center justify-between border-b border-[color:var(--color-rule)] bg-[color:var(--color-bg-subtle)] px-4 py-2 text-xs uppercase tracking-widest text-[color:var(--color-ink-soft)]">
        <span>In [{cell.executionCount ?? " "}]</span>
        <span>{language}</span>
      </div>
      <pre className="overflow-x-auto px-4 py-3">
        <code className={`language-${language}`}>{cell.source}</code>
      </pre>
      {cell.outputs.length > 0 && (
        <div className="border-t border-[color:var(--color-rule)] bg-[color:var(--color-bg-subtle)] px-4 py-3">
          {cell.outputs.map((o, i) => {
            if (o.kind === "image") {
              const src =
                o.mime === "image/svg+xml"
                  ? `data:image/svg+xml;utf8,${encodeURIComponent(o.data)}`
                  : `data:${o.mime};base64,${o.data}`;
              return (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={i}
                  src={src}
                  alt="Notebook output"
                  className="my-2 max-w-full"
                />
              );
            }
            if (o.kind === "html") {
              return (
                <div
                  key={i}
                  className="prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: o.html }}
                />
              );
            }
            if (o.kind === "error") {
              return (
                <pre
                  key={i}
                  className="overflow-x-auto bg-red-50 px-3 py-2 text-sm text-red-900"
                >
                  {o.text}
                </pre>
              );
            }
            return (
              <pre
                key={i}
                className="overflow-x-auto whitespace-pre-wrap text-sm"
              >
                {o.text}
              </pre>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function NotebookViewer({ notebook }: Props) {
  return (
    <div>
      {notebook.cells.map((cell, i) => {
        if (cell.kind === "markdown") {
          if (!cell.source.trim()) return null;
          return (
            <div key={i} className="prose prose-lg max-w-none">
              <MarkdownRenderer>{cell.source}</MarkdownRenderer>
            </div>
          );
        }
        if (cell.kind === "code") {
          return <CodeCell key={i} cell={cell} language={notebook.language} />;
        }
        return (
          <pre
            key={i}
            className="my-6 overflow-x-auto border border-[color:var(--color-rule)] p-4 text-sm"
          >
            {cell.source}
          </pre>
        );
      })}
    </div>
  );
}
