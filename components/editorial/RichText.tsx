import Link from "next/link";
import type { ReactNode } from "react";

const TOKEN = /(_[^_]+_|\[[^\]]+\]\([^)\s]+\))/g;

/** Renders `_italic_` and `[label](/href)` inside otherwise plain text. */
export function RichText({ text }: { text: string }) {
  const parts: ReactNode[] = text.split(TOKEN).map((part, i) => {
    if (part.length > 2 && part.startsWith("_") && part.endsWith("_")) {
      return <em key={i}>{part.slice(1, -1)}</em>;
    }
    const link = part.match(/^\[([^\]]+)\]\(([^)\s]+)\)$/);
    if (link) {
      const [, label, href] = link;
      return href.startsWith("/") ? (
        <Link key={i} href={href}>
          {label}
        </Link>
      ) : (
        <a key={i} href={href} target="_blank" rel="noopener noreferrer">
          {label}
        </a>
      );
    }
    return part;
  });
  return <>{parts}</>;
}
