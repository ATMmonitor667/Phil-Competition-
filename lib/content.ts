import { work } from "@/content/work";
import { writing } from "@/content/writing";

export type Media = {
  src: string;
  width: number;
  height: number;
  alt: string;
  credit?: string;
};

export type WorkEntry = {
  slug: string;
  title: string;
  titleLines?: string[];
  type: "publication" | "initiative" | "education";
  category: string;
  role?: string;
  organization?: string;
  period?: string;
  summary: string;
  framing: string;
  linkLabel: string;
  cover?: Media;
  externalUrl?: { label: string; href: string };
  context: string[];
  contribution: string[];
  activities?: { date?: string; text: string }[];
  reflection?: string[];
  sortOrder: number;
  draft?: boolean;
};

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string; cite?: string };

export type Essay = {
  slug: string;
  title: string;
  deck?: string;
  kind: string;
  publication?: { name: string; url: string };
  publishedAt?: string;
  excerpt: string;
  body?: Block[];
  pdf?: string;
  draft?: boolean;
};

export function getWork(): WorkEntry[] {
  return work.filter((w) => !w.draft).sort((a, b) => a.sortOrder - b.sortOrder);
}

export function getWorkBySlug(slug: string) {
  return getWork().find((w) => w.slug === slug);
}

export function getNextWork(slug: string) {
  const all = getWork();
  const i = all.findIndex((w) => w.slug === slug);
  return all.length > 1 ? all[(i + 1) % all.length] : undefined;
}

export function getWriting(): Essay[] {
  return writing
    .filter((e) => !e.draft)
    .sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""));
}

export function getEssayBySlug(slug: string) {
  return getWriting().find((e) => e.slug === slug);
}

export function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}

export function readingMinutes(blocks: Block[]) {
  const words = blocks.reduce((n, b) => n + b.text.split(/\s+/).filter(Boolean).length, 0);
  return Math.max(1, Math.round(words / 230));
}

export function navItems() {
  return [
    { href: "/work", label: "Work" },
    ...(getWriting().length ? [{ href: "/writing", label: "Writing" }] : []),
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
  ];
}
