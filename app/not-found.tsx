import { ArrowLink } from "@/components/ui/ArrowLink";

export default function NotFound() {
  return (
    <section className="container page-head" style={{ minHeight: "60vh" }}>
      <p className="eyebrow">404</p>
      <h1 className="display page-title" style={{ marginTop: 20 }}>
        This page could not be found.
      </h1>
      <p className="lead">It may have moved, or the address may be mistyped.</p>
      <div style={{ marginTop: 32, display: "flex", flexWrap: "wrap", gap: "8px 32px" }}>
        <ArrowLink href="/" direction="left">
          Home
        </ArrowLink>
        <ArrowLink href="/work">Work</ArrowLink>
      </div>
    </section>
  );
}
