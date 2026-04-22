"use client";

import { useEffect, useRef } from "react";

/**
 * Giscus comments embed. Loads the external giscus client script into a
 * ref'd container so the component mounts cleanly inside Next's RSC tree.
 *
 * One giscus iframe per post page — giscus itself keys Discussions by
 * pathname (via data-mapping="pathname") so nothing to wire here on our end.
 */
export default function Giscus() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = ref.current;
    if (!host) return;
    // Guard against double-mount in React strict mode
    if (host.dataset.loaded === "1") return;
    host.dataset.loaded = "1";

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    script.setAttribute("data-repo", "NMyers-dev/Analytical-Press");
    script.setAttribute("data-repo-id", "R_kgDOSJEXEg");
    script.setAttribute("data-category", "Comments");
    script.setAttribute("data-category-id", "DIC_kwDOSJEXEs4C7chJ");
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "bottom");
    script.setAttribute("data-theme", "preferred_color_scheme");
    script.setAttribute("data-lang", "en");

    host.appendChild(script);
  }, []);

  return (
    <section className="mt-16 border-t border-[color:var(--color-rule)] pt-10">
      <p className="eyebrow mb-4">Comments</p>
      <p className="mb-6 text-sm italic text-[color:var(--color-ink-soft)]">
        Powered by GitHub Discussions. A GitHub account is required to post.
      </p>
      <div ref={ref} className="giscus" />
    </section>
  );
}
