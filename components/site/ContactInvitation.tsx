import { ArrowLink } from "@/components/ui/ArrowLink";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/content/site";

export function ContactInvitation() {
  const { label, lines, text } = site.invitation;
  return (
    <section className="invitation on-dark" aria-labelledby="invitation-title">
      <div className="container">
        <Reveal variant="label">
          <p className="eyebrow">{label}</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 id="invitation-title" className="display invitation__title">
            {lines.map((l) => (
              <span key={l} className="invitation__line">
                {l}{" "}
              </span>
            ))}
          </h2>
        </Reveal>
        <Reveal delay={180}>
          <p className="support invitation__text">{text}</p>
          <div className="invitation__cta">
            <ArrowLink href="/contact">Get in touch</ArrowLink>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
