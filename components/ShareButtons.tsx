"use client";

import { useState } from "react";

type Props = {
  title: string;
  url: string;
};

function buildUrls(title: string, url: string) {
  const t = encodeURIComponent(title);
  const u = encodeURIComponent(url);
  return {
    twitter: `https://twitter.com/intent/tweet?text=${t}&url=${u}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${u}`,
    bluesky: `https://bsky.app/intent/compose?text=${t}%20${u}`,
    reddit: `https://www.reddit.com/submit?url=${u}&title=${t}`,
    email: `mailto:?subject=${t}&body=${u}`
  };
}

export default function ShareButtons({ title, url }: Props) {
  const [copied, setCopied] = useState(false);
  const urls = buildUrls(title, url);

  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // no-op
    }
  }

  return (
    <aside
      aria-label="Share this article"
      className="mt-12 border-t border-b border-[color:var(--color-rule)] py-5"
    >
      <div className="flex flex-wrap items-center gap-3">
        <span className="eyebrow mr-3">Share</span>
        <a className="btn btn-ghost" href={urls.twitter} target="_blank" rel="noopener noreferrer">
          Twitter / X
        </a>
        <a className="btn btn-ghost" href={urls.linkedin} target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
        <a className="btn btn-ghost" href={urls.facebook} target="_blank" rel="noopener noreferrer">
          Facebook
        </a>
        <a className="btn btn-ghost" href={urls.bluesky} target="_blank" rel="noopener noreferrer">
          Bluesky
        </a>
        <a className="btn btn-ghost" href={urls.reddit} target="_blank" rel="noopener noreferrer">
          Reddit
        </a>
        <a className="btn btn-ghost" href={urls.email}>
          Email
        </a>
        <button type="button" onClick={copy} className="btn btn-ghost">
          {copied ? "Link copied" : "Copy link"}
        </button>
      </div>
    </aside>
  );
}
