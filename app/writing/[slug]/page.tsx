import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ReadingProgress } from "@/components/editorial/ReadingProgress";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { formatDate, getEssayBySlug, getWriting, readingMinutes } from "@/lib/content";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getWriting().map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const essay = getEssayBySlug((await params).slug);
  if (!essay) return {};
  return {
    title: essay.title,
    description: essay.deck ?? essay.excerpt,
    alternates: { canonical: `/writing/${essay.slug}` },
    openGraph: { type: "article", title: `${essay.title} — Joel Ibabao`, publishedTime: essay.publishedAt },
  };
}

export default async function EssayPage({ params }: Params) {
  const essay = getEssayBySlug((await params).slug);
  if (!essay) notFound();

  const byline = [
    "Joel Ibabao",
    essay.publishedAt && formatDate(essay.publishedAt),
    essay.body && `${readingMinutes(essay.body)} min read`,
  ].filter(Boolean);

  return (
    <>
      {essay.body && <ReadingProgress />}
      <article className="container page-head">
        <div className="article">
          <ArrowLink href="/writing" direction="left">
            Back to writing
          </ArrowLink>
          <p className="eyebrow" style={{ marginTop: 40 }}>
            {[essay.kind, essay.publication?.name].filter(Boolean).join(" / ")}
          </p>
          <h1 className="display article__title">{essay.title}</h1>
          {essay.deck && <p className="lead article__deck">{essay.deck}</p>}
          <p className="meta article__byline">{byline.join(" · ")}</p>

          <div className="reading-copy article__body">
            {essay.body ? (
              essay.body.map((b, i) =>
                b.type === "h2" ? (
                  <h2 key={i}>{b.text}</h2>
                ) : b.type === "quote" ? (
                  <blockquote key={i}>
                    <p>{b.text}</p>
                    {b.cite && <cite>{b.cite}</cite>}
                  </blockquote>
                ) : (
                  <p key={i}>{b.text}</p>
                ),
              )
            ) : (
              <p>{essay.excerpt}</p>
            )}
          </div>

          <div className="article__foot">
            {essay.publication && (
              <ArrowLink href={essay.publication.url}>Read at {essay.publication.name}</ArrowLink>
            )}
            <ArrowLink href="/writing" direction="left">
              Back to writing
            </ArrowLink>
            <ArrowLink href="/contact">Get in touch</ArrowLink>
          </div>
        </div>
      </article>
    </>
  );
}
