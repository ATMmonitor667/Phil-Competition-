"use client";

import { useEffect, useRef, type CSSProperties, type ElementType, type HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLElement> & {
  as?: ElementType;
  variant?: "rise" | "fade" | "label" | "mask";
  delay?: number;
};

// Content is real HTML from the start; the hidden state only applies under html.js,
// so no-JS and reduced-motion visitors always see it (blueprint §15, §17, §23).
export function Reveal({ as: Tag = "div", variant = "rise", delay = 0, className = "", children, ...rest }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      el.classList.add("is-visible");
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        // Elements already scrolled past (e.g. restored scroll position) reveal too.
        if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
          el.classList.add("is-visible");
          io.disconnect();
        }
      },
      { threshold: 0, rootMargin: "0px 0px -15% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const style = delay ? ({ "--reveal-delay": `${delay}ms` } as CSSProperties) : undefined;

  return (
    <Tag {...rest} ref={ref} className={`reveal reveal--${variant} ${className}`.trim()} style={style}>
      {children}
    </Tag>
  );
}
