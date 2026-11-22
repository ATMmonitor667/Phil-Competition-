import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { formatDate, getWriting, pieceHref, readingMinutes, type Piece } from "@/lib/content";

export const metadata: Metadata = {
  title: "Writing",
  description: "Essays and articles by Joel Ibabao on ethics, philosophy and public life.",
  alternates: { canonical: "/writing" },
};

function Card({ piece, index }: { piece: Piece; index: number }) {
  const href = pieceHref(piece);
  const external = !piece.body;
  const label = [piece.kind, piece.publication?.name].filter(Boolean).join(" · ");

  const inner = (
    <>
      <div className="card__media">
        <Image
          src={piece.image.src}
          alt={piece.image.alt}
          fill
          sizes="(min-width: 1100px) 30vw, (min-width: 640px) 46vw, 92vw"
          preload={index < 3}
          style={piece.image.position ? { objectPosition: piece.image.position } : undefined}
        />
      </div>
      <p className="card__label">{label}</p>
      <h2 className="card__title">{piece.title}</h2>
      <p className="card__excerpt">{piece.excerpt}</p>
      <p className="card__date">
        {piece.publishedAt ? <time dateTime={piece.publishedAt}>{formatDate(piece.publishedAt)}</time> : `${readingMinutes(piece.body ?? [])} min read`}
        {external && <span className="visually-hidden"> (opens The Daily Princetonian in a new tab)</span>}
      </p>
    </>
  );

  return (
    <li className="card">
      {external ? (
        <a href={href} className="card__link" target="_blank" rel="noopener noreferrer">
          {inner}
        </a>
      ) : (
        <Link href={href} className="card__link">
          {inner}
        </Link>
      )}
    </li>
  );
}

export default function WritingPage() {
  const writing = getWriting();

  return (
    <>
      <header className="container page-head">
        <h1 className="display page-title">Writing</h1>
        <p className="lead">Essays and articles on ethics, philosophy and public life.</p>
      </header>
      <div className="container page-body">
        <ul className="card-grid">
          {writing.map((p, i) => (
            <Card key={p.slug} piece={p} index={i} />
          ))}
        </ul>
      </div>
    </>
  );
}
