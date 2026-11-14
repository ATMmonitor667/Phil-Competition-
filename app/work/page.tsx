import type { Metadata } from "next";
import { EditorialEntry, variantFor } from "@/components/editorial/EditorialEntry";
import { getWork } from "@/lib/content";

export const metadata: Metadata = {
  title: "Work",
  description: "A selection of initiatives, publications and projects exploring ethics and public life.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  const work = getWork();
  return (
    <>
      <header className="container page-head">
        <h1 className="display page-title">Work</h1>
        <p className="lead">A selection of initiatives, publications and projects exploring ethics and public life.</p>
      </header>
      <div className="container page-body">
        <div className="entries">
          {work.map((entry, i) => (
            <EditorialEntry key={entry.slug} entry={entry} variant={variantFor(i)} headingLevel={2} />
          ))}
        </div>
      </div>
    </>
  );
}
