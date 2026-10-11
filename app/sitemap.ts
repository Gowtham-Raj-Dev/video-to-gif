import type { MetadataRoute } from "next";
import { TOOLS } from "@/lib/tools";
import { absoluteUrl } from "@/lib/site";

/** Indexable routes that are not generated from lib/tools.ts. */
const STATIC_ROUTES = ["/", "/tools", "/about", "/contact", "/privacy", "/terms"];

/**
 * Emitted as /sitemap.xml by the static export. Tool URLs come from the same
 * TOOLS list that feeds generateStaticParams in app/[slug]/page.tsx, so the
 * sitemap cannot drift from the pages that are actually built.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [...STATIC_ROUTES, ...TOOLS.map((t) => `/${t.slug}`)].map((path) => ({
    url: absoluteUrl(path),
    lastModified,
  }));
}
