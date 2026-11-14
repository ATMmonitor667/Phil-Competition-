import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate, getWriting } from "@/lib/content";

export const metadata: Metadata = {
  title: "Writing",
  description: "Essays and articles by Joel Ibabao on ethics, philosophy and public life.",
  alternates: { canonical: "/writing" },
};

export default function WritingPage() {
  const writing = getWriting();
  if (writing.length === 0) notFound();

  return (
    <>
      <header className="container page-head">
        <h1 className="display page-title">Writing</h1>
        <p className="lead">Essays and articles on ethics, philosophy and public life.</p>
      </header>
      <div className="container page-body">
        <ul className="writing-list">
          {writing.map((e) => (
            <li key={e.slug}>
              <p className="meta">
                {[e.kind, e.publication?.name, e.publishedAt && formatDate(e.publishedAt)].filter(Boolean).join(" · ")}
              </p>
              <h2 className="display entry__title">
                <Link href={`/writing/${e.slug}`} className="entry__title-link">
                  {e.title}
                </Link>
              </h2>
              <p className="support">{e.excerpt}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
