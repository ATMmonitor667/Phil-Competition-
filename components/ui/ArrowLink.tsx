import Link from "next/link";
import type { ReactNode } from "react";

type Direction = "right" | "down-right" | "out" | "left";

const paths: Record<Direction, string> = {
  right: "M1 8h13M9.5 3.5 14 8l-4.5 4.5",
  left: "M15 8H2M6.5 3.5 2 8l4.5 4.5",
  "down-right": "M3 3l10 10M13 5.5V13H5.5",
  out: "M3 13 13 3M5.5 3H13v7.5",
};

export function Arrow({ direction = "right" }: { direction?: Direction }) {
  return (
    <svg
      className={`arrow arrow--${direction}`}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={paths[direction]} />
    </svg>
  );
}

type Props = {
  href: string;
  children: ReactNode;
  direction?: Direction;
  className?: string;
};

export function ArrowLink({ href, children, direction, className = "" }: Props) {
  const external = /^https?:\/\//.test(href);
  const dir = direction ?? (external ? "out" : "right");
  const cls = `arrow-link ${className}`.trim();
  const content = (
    <>
      {dir === "left" && <Arrow direction="left" />}
      <span>{children}</span>
      {dir !== "left" && <Arrow direction={dir} />}
    </>
  );

  if (external) {
    return (
      <a href={href} className={cls} rel="noopener noreferrer" target="_blank">
        {content}
        <span className="visually-hidden"> (opens in a new tab)</span>
      </a>
    );
  }
  if (href.startsWith("mailto:") || href.startsWith("#")) {
    return (
      <a href={href} className={cls}>
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {content}
    </Link>
  );
}
