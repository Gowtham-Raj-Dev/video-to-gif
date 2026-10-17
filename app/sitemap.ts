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
  const legal = ["/privacy", "/terms"];
  return [
    ...STATIC_ROUTES.map((path) => ({
      url: absoluteUrl(path),
      lastModified,
      changeFrequency: legal.includes(path) ? ("yearly" as const) : ("weekly" as const),
      priority: path === "/" ? 1 : legal.includes(path) ? 0.3 : 0.7,
    })),
    ...TOOLS.map((t) => ({
      url: absoluteUrl(`/${t.slug}`),
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.9,
    })),
  ];
}
