import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { getEssays, navItems } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", ...navItems().map((n) => n.href), "/contact", ...getEssays().map((e) => `/writing/${e.slug}`)];
  return paths.map((p) => ({ url: new URL(p, site.url).toString() }));
}
