import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ReadingProgress } from "@/components/editorial/ReadingProgress";
import { RichText } from "@/components/editorial/RichText";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { formatDate, getEssayBySlug, getEssays, readingMinutes } from "@/lib/content";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getEssays().map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const essay = getEssayBySlug((await params).slug);
  if (!essay) return {};
  return {
    title: essay.title,
    description: essay.excerpt,
    alternates: { canonical: `/writing/${essay.slug}` },
    openGraph: {
      type: "article",
      title: `${essay.title} — Joel Ibabao`,
      publishedTime: essay.publishedAt,
      images: [{ url: essay.image.src, width: essay.image.width, height: essay.image.height }],
    },
  };
}

// Layout follows Aeon's article page: a full-width image band, a small
// right-aligned caption, then a slim meta column beside the text column.
export default async function EssayPage({ params }: Params) {
  const essay = getEssayBySlug((await params).slug);
  if (!essay?.body) notFound();

  return (
    <>
      <ReadingProgress />
      <article className="essay">
        <figure className="essay__hero">
          <div className="essay__band">
            <Image
              src={essay.image.src}
              alt={essay.image.alt}
              width={essay.image.width}
              height={essay.image.height}
              sizes="100vw"
              preload
            />
          </div>
          {essay.image.caption && (
            <figcaption className="container essay__caption">
              <RichText text={essay.image.caption} />
            </figcaption>
          )}
        </figure>

        <div className="container essay__grid">
          <aside className="essay__aside meta">
            <p className="eyebrow">{essay.kind}</p>
            <p>By Joel Ibabao</p>
            <p>{readingMinutes(essay.body)} min read</p>
            <ArrowLink href="/writing" direction="left" className="essay__back">
              All writing
            </ArrowLink>
          </aside>

          <div className="essay__main">
            <h1 className="essay__title">{essay.title}</h1>
            <div className="essay__body">
              {essay.body.map((p, i) => (
                <p key={i}>
                  <RichText text={p} />
                </p>
              ))}
            </div>
            {essay.publishedAt && (
              <p className="meta essay__date">
                <time dateTime={essay.publishedAt}>{formatDate(essay.publishedAt)}</time>
              </p>
            )}
            <div className="essay__foot">
              <ArrowLink href="/writing" direction="left">
                Back to writing
              </ArrowLink>
              <ArrowLink href="/about">About Joel</ArrowLink>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
