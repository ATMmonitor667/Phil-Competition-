import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ScrollImage } from "@/components/motion/ScrollImage";
import { Reveal } from "@/components/motion/Reveal";
import { Arrow, ArrowLink } from "@/components/ui/ArrowLink";
import { getNextWork, getWork, getWorkBySlug } from "@/lib/content";

type Params = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return getWork().map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const entry = getWorkBySlug((await params).slug);
  if (!entry) return {};
  return {
    title: entry.title,
    description: entry.framing,
    alternates: { canonical: `/work/${entry.slug}` },
    openGraph: { title: `${entry.title} — Joel Ibabao`, description: entry.framing },
  };
}

function CaseSection({ heading, children }: { heading: string; children: React.ReactNode }) {
  return (
    <Reveal as="section" className="case-section">
      <h2 className="case-section__heading">{heading}</h2>
      <div className="case-section__body reading-copy">{children}</div>
    </Reveal>
  );
}

export default async function WorkCaseStudy({ params }: Params) {
  const entry = getWorkBySlug((await params).slug);
  if (!entry) notFound();
  const next = getNextWork(entry.slug);

  const facts = [
    entry.role && { label: "Role", value: entry.role },
    entry.organization && { label: "Organization", value: entry.organization },
    entry.period && { label: "Period", value: entry.period },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <article>
      <header className="container page-head">
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <ol>
            <li>
              <Link href="/work">Work</Link>
            </li>
            <li aria-current="page">{entry.title}</li>
          </ol>
        </nav>
        <p className="eyebrow">{entry.category}</p>
        <h1 className="display page-title" style={{ marginTop: 20, maxWidth: "14ch" }}>
          {entry.title}
        </h1>
        <p className="lead">{entry.framing}</p>

        {(facts.length > 0 || entry.externalUrl) && (
          <dl className="facts">
            {facts.map((f) => (
              <div key={f.label}>
                <dt className="eyebrow">{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
            {entry.externalUrl && (
              <div>
                <dt className="eyebrow">Link</dt>
                <dd>
                  <ArrowLink href={entry.externalUrl.href}>{entry.externalUrl.label}</ArrowLink>
                </dd>
              </div>
            )}
          </dl>
        )}
      </header>

      <div className="container">
        {entry.cover && (
          <div style={{ marginTop: "clamp(48px, 6vw, 96px)" }}>
            <ScrollImage media={entry.cover} sizes="(min-width: 1440px) 1300px, 92vw" priority />
          </div>
        )}

        <CaseSection heading="Context">
          {entry.context.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </CaseSection>

        <CaseSection heading="Joel’s contribution">
          {entry.contribution.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </CaseSection>

        {entry.activities && entry.activities.length > 0 && (
          <CaseSection heading="Activities and outcomes">
            <ul className="activity-list">
              {entry.activities.map((a) => (
                <li key={a.text}>
                  {a.date && <span className="meta">{a.date} — </span>}
                  {a.text}
                </li>
              ))}
            </ul>
          </CaseSection>
        )}

        {entry.reflection && entry.reflection.length > 0 && (
          <CaseSection heading="Reflection">
            {entry.reflection.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </CaseSection>
        )}

        {next && (
          <Reveal as="nav" className="next-work" aria-label="Next work">
            <p className="eyebrow">Next</p>
            <p className="display entry__title">
              <Link href={`/work/${next.slug}`} className="entry__title-link">
                {next.title}
                <Arrow />
              </Link>
            </p>
            <div className="next-work__contact" style={{ display: "flex", flexWrap: "wrap", gap: "8px 32px" }}>
              <ArrowLink href="/work" direction="left">
                All work
              </ArrowLink>
              <ArrowLink href="/contact">Get in touch</ArrowLink>
            </div>
          </Reveal>
        )}
      </div>
    </article>
  );
}
