import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <p className="eyebrow">404</p>
      <h1 className="headline mt-3 text-5xl">Not this page.</h1>
      <p className="mt-4 italic text-[color:var(--color-ink-soft)]">
        The piece you are looking for is not here. Try the archive or the
        home page.
      </p>
      <div className="mt-8 flex justify-center gap-3">
        <Link href="/" className="btn">Go home</Link>
        <Link href="/posts" className="btn btn-ghost">Open archive</Link>
      </div>
    </div>
  );
}
