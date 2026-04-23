import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeHighlight from "rehype-highlight";
import rehypeKatex from "rehype-katex";
import SortableTable from "@/components/SortableTable";

type Props = {
  children: string;
};

export default function MarkdownRenderer({ children }: Props) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeKatex, rehypeHighlight]}
      components={{
        a: ({ href, children }) => (
          <a
            href={href}
            target={href?.startsWith("http") ? "_blank" : undefined}
            rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
          >
            {children}
          </a>
        ),
        img: ({ src, alt }) => (
          // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
          <img
            src={typeof src === "string" ? src : ""}
            alt={alt ?? ""}
            loading="lazy"
            className="rounded-sm"
          />
        ),
        // Wrap tables so they can scroll horizontally on narrow screens
        // without blowing up the article's reading measure. SortableTable
        // (client) takes over rendering so headers become clickable.
        table: ({ children }) => (
          <div className="hs-table-wrap">
            <SortableTable>{children}</SortableTable>
          </div>
        )
      }}
    >
      {children}
    </ReactMarkdown>
  );
}
