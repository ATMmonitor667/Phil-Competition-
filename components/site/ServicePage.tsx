import type { Metadata } from "next";
import { RichText } from "@/components/editorial/RichText";
import { Reveal } from "@/components/motion/Reveal";
import { Arrow } from "@/components/ui/ArrowLink";
import { getService, mailto, site } from "@/content/site";

export function serviceMetadata(slug: string): Metadata {
  const s = getService(slug);
  return {
    title: s.title,
    description: s.description,
    alternates: { canonical: `/${s.slug}` },
  };
}

export function ServicePage({ slug }: { slug: string }) {
  const s = getService(slug);
  const href = mailto(s.emailSubject, s.emailBody);

  return (
    <section className="container page-head service" aria-labelledby="service-title">
      <p className="eyebrow">{s.eyebrow}</p>
      <h1 id="service-title" className="display page-title service__title">
        {s.title}
      </h1>

      <div className="service__grid">
        <div className="reading-copy service__body">
          {s.body.map((p) => (
            <p key={p}>
              <RichText text={p} />
            </p>
          ))}
        </div>

        <Reveal delay={100} className="service__inquiry">
          <p className="service__invitation">{s.invitation}</p>
          <a className="button" href={href}>
            {s.cta}
            <Arrow />
          </a>
          <p className="meta service__fallback">
            Or email <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
