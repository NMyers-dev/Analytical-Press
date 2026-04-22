"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

/**
 * Theme toggle button.
 *
 * Behavior:
 *  - Reads the current theme from the <html data-theme> attribute, which
 *    is set by the FOUC-prevention inline script in app/layout.tsx before
 *    React hydrates. That means we never flash the wrong theme.
 *  - On click, flips the attribute, persists to localStorage, and posts a
 *    message to any giscus iframe so comments re-theme in place.
 */
export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const initial =
      (document.documentElement.getAttribute("data-theme") as Theme) || "light";
    setTheme(initial);
    setMounted(true);
  }, []);

  function applyTheme(next: Theme) {
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("halfspace-theme", next);
    } catch {
      // Ignore storage errors (private mode, etc.)
    }

    // Ask giscus to re-theme without reloading the iframe
    const iframe = document.querySelector<HTMLIFrameElement>(
      "iframe.giscus-frame"
    );
    if (iframe && iframe.contentWindow) {
      iframe.contentWindow.postMessage(
        { giscus: { setConfig: { theme: next === "dark" ? "dark" : "light" } } },
        "https://giscus.app"
      );
    }
  }

  function onToggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
  }

  // Avoid a hydration mismatch: render a neutral placeholder until we've
  // read the actual theme in the effect above.
  if (!mounted) {
    return (
      <button
        type="button"
        aria-label="Toggle theme"
        className="nav-link"
        title="Toggle theme"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4" />
        </svg>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={
        theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
      }
      title={theme === "dark" ? "Light mode" : "Dark mode"}
      className="nav-link"
    >
      {theme === "dark" ? (
        // Sun
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="m17.66 17.66 1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="m4.93 19.07 1.41-1.41" />
          <path d="m17.66 6.34 1.41-1.41" />
        </svg>
      ) : (
        // Moon
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  );
}
