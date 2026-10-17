import type { MetadataRoute } from "next";
import { TOOLS } from "@/lib/tools";
import { absoluteUrl } from "@/lib/site";

// Required for `output: "export"`: render /sitemap.xml once at build time.
export const dynamic = "force-static";

/** Indexable routes that are not generated from lib/tools.ts. */
const STATIC_ROUTES = ["/", "/tools", "/about", "/contact", "/privacy", "/terms"];

/**
 * Emitted as /sitemap.xml by the static export. Tool URLs come from the same
 * TOOLS list that feeds generateStaticParams in app/[slug]/page.tsx, so the
 * sitemap cannot drift from the pages that are actually built. lastmod is the
 * build time, so every deploy tells crawlers the pages are fresh.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const paths = [...STATIC_ROUTES, ...TOOLS.map((t) => `/${t.slug}`)];
  return paths.map((path) => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency: "daily" as const,
    priority: 1.0,
  }));
}
