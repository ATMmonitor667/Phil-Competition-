import Link from "next/link";
import { Hero } from "@/components/site/Hero";
import { ContactInvitation } from "@/components/site/ContactInvitation";
import { EditorialEntry, variantFor } from "@/components/editorial/EditorialEntry";
import { Portrait } from "@/components/editorial/Portrait";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { site } from "@/content/site";
import { formatDate, getWork, getWriting } from "@/lib/content";

export default function HomePage() {
  const work = getWork().slice(0, 3);
  const writing = getWriting().slice(0, 4);
  const { hero, statement, selectedWork, aboutTeaser } = site;

  const personLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: site.url,
    affiliation: { "@type": "CollegeOrUniversity", name: "Princeton University" },
    knowsAbout: ["Applied ethics", "Moral philosophy", "Political science", "Economics"],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }} />

      {/* 00 Arrival */}
      <Hero eyebrow={hero.eyebrow} lines={hero.lines} intro={hero.intro} cta={hero.cta} target="selected-work" />

      {/* 01 Statement of inquiry */}
      <section className="container chapter" aria-label="Statement">
        <p className="display statement__text">
          {statement.lines.map((line, i) => (
            <Reveal key={line} as="span" delay={i * 120} className="statement__line">
              {line}{" "}
            </Reveal>
          ))}
        </p>
        <Reveal delay={260}>
          <p className="support statement__support">{statement.support}</p>
        </Reveal>
      </section>

      {/* 02 Selected work */}
      <section id="selected-work" tabIndex={-1} className="container chapter" aria-labelledby="selected-work-title">
        <div className="work-head">
          <Reveal variant="label">
            <p className="eyebrow">{selectedWork.label}</p>
          </Reveal>
          <Reveal delay={80}>
            <h2 id="selected-work-title" className="display section-title">
              {selectedWork.heading}
            </h2>
          </Reveal>
        </div>
        <div className="entries">
          {work.map((entry, i) => (
            <EditorialEntry key={entry.slug} entry={entry} variant={variantFor(i)} />
          ))}
        </div>
        <Reveal className="next-work__contact" variant="fade">
          <ArrowLink href="/work">All work</ArrowLink>
        </Reveal>
      </section>

      {/* 03 Quotation chapter intentionally omitted until Joel approves a real quotation (§07). */}

      {/* 04 About preview */}
      <section className="container chapter" aria-labelledby="about-teaser-title">
        <div className="split">
          <Portrait />
          <Reveal delay={100} className="about-teaser__text">
            <p className="eyebrow">About</p>
            <h2 id="about-teaser-title" className="display section-title">
              {aboutTeaser.heading}
            </h2>
            {aboutTeaser.paragraphs.map((p) => (
              <p key={p} className="support">
                {p}
              </p>
            ))}
            <ArrowLink href="/about">More about Joel</ArrowLink>
          </Reveal>
        </div>
      </section>

      {/* 05 Recent writing — only when real essays exist */}
      {writing.length > 0 && (
        <section className="container chapter" aria-labelledby="writing-title">
          <div className="work-head">
            <p className="eyebrow">02 / Recent writing</p>
            <h2 id="writing-title" className="display section-title">
              Recent writing.
            </h2>
          </div>
          <ul className="writing-list">
            {writing.map((e) => (
              <li key={e.slug}>
                <p className="meta">
                  {[e.kind, e.publication?.name, e.publishedAt && formatDate(e.publishedAt)].filter(Boolean).join(" · ")}
                </p>
                <h3 className="display entry__title">
                  <Link href={`/writing/${e.slug}`} className="entry__title-link">
                    {e.title}
                  </Link>
                </h3>
                <p className="support">{e.excerpt}</p>
              </li>
            ))}
          </ul>
          <div className="next-work__contact">
            <ArrowLink href="/writing">All writing</ArrowLink>
          </div>
        </section>
      )}

      {/* 06 Final invitation (sole dark section); footer continues it */}
      <ContactInvitation />
    </>
  );
}
