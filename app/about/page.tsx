import type { Metadata } from "next";
import { RichText } from "@/components/editorial/RichText";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "About",
  description: site.description,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <section className="container page-head" aria-labelledby="about-title">
      <h1 id="about-title" className="display page-title">
        About
      </h1>
      <div className="reading-copy about">
        {site.about.map((paragraph) => (
          <p key={paragraph}>
            <RichText text={paragraph} />
          </p>
        ))}
        <p className="meta about__contact">
          Contact: <a href={`mailto:${site.email}`}>{site.email}</a>
        </p>
      </div>
    </section>
  );
}
