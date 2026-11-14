import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { getWork, getWriting } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "/",
    "/work",
    "/about",
    "/contact",
    ...getWork().map((w) => `/work/${w.slug}`),
    ...(getWriting().length ? ["/writing", ...getWriting().map((e) => `/writing/${e.slug}`)] : []),
  ];
  return paths.map((p) => ({ url: new URL(p, site.url).toString() }));
}
