import Link from "next/link";
import { Arrow, ArrowLink } from "@/components/ui/ArrowLink";
import { Reveal } from "@/components/motion/Reveal";
import { ScrollImage } from "@/components/motion/ScrollImage";
import type { WorkEntry } from "@/lib/content";

export type EntryVariant = "feature" | "standard" | "split";

export function EditorialEntry({
  entry,
  variant,
  headingLevel = 3,
}: {
  entry: WorkEntry;
  variant: EntryVariant;
  headingLevel?: 2 | 3;
}) {
  const H = headingLevel === 2 ? "h2" : "h3";
  const href = `/work/${entry.slug}`;
  const lines = entry.titleLines ?? [entry.title];

  const meta = (
    <div className="entry__meta">
      <p className="eyebrow">{entry.category}</p>
      {variant !== "standard" && entry.period && <p className="meta">{entry.period}</p>}
    </div>
  );

  const facts = (entry.role || entry.organization || entry.period) && (
    <div className="entry__facts meta">
      {entry.role && <span>{entry.role}</span>}
      {entry.organization && <span>{entry.organization}</span>}
      {variant === "standard" && entry.period && <span>{entry.period}</span>}
    </div>
  );

  const title = (
    <Reveal delay={80}>
      <H className="display entry__title">
        <Link href={href} className="entry__title-link">
          {lines.map((line, i) => (
            <span key={i} className={lines.length > 1 ? "entry__title-line" : undefined}>
              {line}
              {i < lines.length - 1 ? " " : <Arrow />}
            </span>
          ))}
        </Link>
      </H>
    </Reveal>
  );

  const summary = (
    <Reveal delay={180}>
      <p className="support entry__summary">{entry.summary}</p>
      <div className="entry__link">
        <ArrowLink href={href}>
          {entry.linkLabel}
          <span className="visually-hidden">: {entry.title}</span>
        </ArrowLink>
      </div>
    </Reveal>
  );

  return (
    <article className={`entry entry--${variant}`}>
      {entry.cover && (
        <div className="entry__media">
          <ScrollImage media={entry.cover} sizes="(min-width: 1440px) 1300px, 92vw" />
        </div>
      )}

      {variant === "standard" ? (
        <>
          <div className="entry__aside">
            <Reveal variant="label">
              {meta}
              {facts && <div style={{ marginTop: 12 }}>{facts}</div>}
            </Reveal>
          </div>
          <div className="entry__body">
            {title}
            {summary}
          </div>
        </>
      ) : variant === "feature" ? (
        <>
          <div className="entry__head">
            <Reveal variant="label">{meta}</Reveal>
            {title}
          </div>
          <div className="entry__aside">{facts && <Reveal variant="label">{facts}</Reveal>}</div>
          <div className="entry__body">{summary}</div>
        </>
      ) : (
        <>
          <div className="entry__head">
            <Reveal variant="label">{meta}</Reveal>
            {title}
            {facts && (
              <Reveal variant="label" delay={120}>
                <div style={{ marginTop: 20 }}>{facts}</div>
              </Reveal>
            )}
          </div>
          <div className="entry__body">{summary}</div>
        </>
      )}
    </article>
  );
}

export function variantFor(index: number): EntryVariant {
  return (["feature", "standard", "split"] as const)[index % 3];
}
