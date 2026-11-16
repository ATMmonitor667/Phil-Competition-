import { Hero } from "@/components/site/Hero";
import { site } from "@/content/site";

export default function HomePage() {
  const { hero } = site;

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

      <Hero eyebrow={hero.eyebrow} lines={hero.lines} intro={hero.intro} cta={hero.cta} />
    </>
  );
}
