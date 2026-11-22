import { writing } from "@/content/writing";

export type PieceImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
  caption?: string;
  /** CSS object-position for cropped views, e.g. "50% 30%". */
  position?: string;
};

/** A piece of writing: either an essay hosted here (`body`) or an external article (`publication`). */
export type Piece = {
  slug: string;
  title: string;
  kind: string;
  excerpt: string;
  image: PieceImage;
  publishedAt?: string;
  publication?: { name: string; url: string };
  body?: string[];
  draft?: boolean;
};

/**
 * Newest first. Essays without a publication date are the most recent work,
 * so they lead in their listed order, followed by dated pieces in reverse
 * chronological order.
 */
export function getWriting(): Piece[] {
  const live = writing.filter((p) => !p.draft);
  const undated = live.filter((p) => !p.publishedAt);
  const dated = live
    .filter((p) => p.publishedAt)
    .sort((a, b) => b.publishedAt!.localeCompare(a.publishedAt!));
  return [...undated, ...dated];
}

/** Essays that have their own page on this site. */
export function getEssays(): Piece[] {
  return getWriting().filter((p) => p.body);
}

export function getEssayBySlug(slug: string) {
  return getEssays().find((e) => e.slug === slug);
}

export function pieceHref(p: Piece) {
  return p.body ? `/writing/${p.slug}` : p.publication!.url;
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function readingMinutes(paragraphs: string[]) {
  const words = paragraphs.reduce((n, t) => n + t.split(/\s+/).filter(Boolean).length, 0);
  return Math.max(1, Math.round(words / 230));
}

export type NavItem = { href: string; label: string };

export function navItems(): NavItem[] {
  return [
    { href: "/about", label: "About" },
    { href: "/writing", label: "Writing" },
    { href: "/college-essay-editing", label: "College Essay Editing" },
    { href: "/ethics-bowl-tutoring", label: "Ethics Bowl Tutoring" },
    { href: "/math-tutoring", label: "Math Tutoring" },
  ];
}
