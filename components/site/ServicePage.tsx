import type { Metadata } from "next";
import { RichText } from "@/components/editorial/RichText";
import { Reveal } from "@/components/motion/Reveal";
import { InquiryForm } from "@/components/site/InquiryForm";
import { getService, site } from "@/content/site";

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
          <InquiryForm service={s.slug} serviceTitle={s.title} uploadHint={s.uploadHint} email={site.email} />
          <p className="meta service__fallback">
            Or email <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
