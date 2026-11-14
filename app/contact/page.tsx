import type { Metadata } from "next";
import { Reveal } from "@/components/motion/Reveal";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Joel Ibabao about writing, ethics, events, or educational opportunities.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <section className="container page-head" aria-labelledby="contact-title">
      <h1 id="contact-title" className="display page-title">
        Get in touch
      </h1>
      <p className="lead">{site.contact.intro}</p>
      <Reveal delay={120} className="page-body">
        <p className="eyebrow" style={{ marginBottom: 16 }}>
          Email
        </p>
        <a className="contact-email" href={`mailto:${site.email}`}>
          {site.email}
        </a>
        <p className="contact-note">{site.contact.privacy}</p>
      </Reveal>
    </section>
  );
}
