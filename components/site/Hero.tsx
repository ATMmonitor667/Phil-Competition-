"use client";

import { useEffect, useState, type CSSProperties, type MouseEvent } from "react";
import { Arrow } from "@/components/ui/ArrowLink";

let played = false;

type Props = { eyebrow: string; lines: string[]; intro: string; cta: string; target: string };

// The headline is server-rendered real text; CSS keyframes only enhance it.
// After the first visit in a session the entrance is not replayed (blueprint §15).
export function Hero({ eyebrow, lines, intro, cta, target }: Props) {
  const [animate] = useState(() => !played);
  useEffect(() => {
    played = true;
  }, []);

  const onExplore = (e: MouseEvent<HTMLAnchorElement>) => {
    const el = document.getElementById(target);
    if (!el) return;
    e.preventDefault();
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
    el.focus({ preventScroll: true });
  };

  return (
    <section className={`container hero${animate ? " hero--animate" : ""}`} aria-labelledby="hero-title">
      <p className="eyebrow hero__eyebrow">{eyebrow}</p>
      <h1 id="hero-title" className="display hero__title">
        {lines.map((line, i) => (
          <span key={line} className="hero__line">
            <span className="hero__line-inner" style={{ "--i": i } as CSSProperties}>
              {line}
              {i < lines.length - 1 && " "}
            </span>
          </span>
        ))}
      </h1>
      <p className="support hero__intro">{intro}</p>
      <div className="hero__cta">
        <a href={`#${target}`} className="arrow-link" onClick={onExplore}>
          <span>{cta}</span>
          <Arrow direction="down-right" />
        </a>
      </div>
      <p className="eyebrow hero__cue" aria-hidden="true">
        Scroll to explore
      </p>
    </section>
  );
}
