import type { Metadata } from "next";
import { Portrait } from "@/components/editorial/Portrait";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Joel Ibabao is a Princeton undergraduate studying political science and economics, with interests in applied ethics and moral philosophy.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const { about } = site;
  return (
    <>
      <header className="container page-head">
        <h1 className="display page-title">About</h1>
        <div className="split about-intro">
          <Portrait priority />
          <Reveal delay={100}>
            <p className="lead">{about.intro}</p>
          </Reveal>
        </div>
      </header>

      <div className="container">
        {about.sections.map((s) => (
          <Reveal as="section" key={s.heading} className="case-section">
            <h2 className="case-section__heading">{s.heading}</h2>
            <div className="case-section__body reading-copy">
              {s.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Reveal>
        ))}

        <section className="case-section" aria-labelledby="experiences-title">
          <h2 id="experiences-title" className="case-section__heading">
            Selected experiences
          </h2>
          <dl className="experiences case-section__body">
            {about.experiences.map((x) => (
              <div key={x.name} className="experiences__row">
                <dt>{x.name}</dt>
                <dd>{x.role}</dd>
              </div>
            ))}
          </dl>
        </section>

        <Reveal as="section" className="case-section" aria-labelledby="about-contact-title">
          <h2 id="about-contact-title" className="case-section__heading">
            Get in touch
          </h2>
          <div className="case-section__body">
            <p className="support" style={{ maxWidth: "36rem" }}>
              {site.contact.intro}
            </p>
            <div style={{ marginTop: 16 }}>
              <ArrowLink href="/contact">Contact Joel</ArrowLink>
            </div>
          </div>
        </Reveal>
      </div>
    </>
  );
}
