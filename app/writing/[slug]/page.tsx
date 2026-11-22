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

export default async function EssayPage({ params }: Params) {
  const essay = getEssayBySlug((await params).slug);
  if (!essay?.body) notFound();

  const byline = [
    "Joel Ibabao",
    essay.publishedAt && formatDate(essay.publishedAt),
    `${readingMinutes(essay.body)} min read`,
  ].filter(Boolean);

  return (
    <>
      <ReadingProgress />
      <article className="container page-head essay">
        <header className="essay__head">
          <p className="eyebrow">{essay.kind}</p>
          <h1 className="display essay__title">{essay.title}</h1>
          <p className="essay__standfirst">{essay.excerpt}</p>
          <p className="meta essay__byline">{byline.join(" · ")}</p>
        </header>

        <figure className="essay__figure">
          <div className="essay__image">
            <Image
              src={essay.image.src}
              alt={essay.image.alt}
              width={essay.image.width}
              height={essay.image.height}
              sizes="(min-width: 1100px) 1000px, 92vw"
              preload
            />
          </div>
          {essay.image.caption && <figcaption className="caption">{essay.image.caption}</figcaption>}
        </figure>

        <div className="reading-copy essay__body">
          {essay.body.map((p, i) => (
            <p key={i}>
              <RichText text={p} />
            </p>
          ))}
        </div>

        <div className="essay__foot">
          <ArrowLink href="/writing" direction="left">
            Back to writing
          </ArrowLink>
          <ArrowLink href="/about">About Joel</ArrowLink>
        </div>
      </article>
    </>
  );
}
