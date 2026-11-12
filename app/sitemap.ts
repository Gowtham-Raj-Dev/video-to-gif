import type { MetadataRoute } from "next";
import { TOOLS } from "@/lib/tools";
import { absoluteUrl } from "@/lib/site";

// Required for `output: "export"`: render /sitemap.xml once at build time.
export const dynamic = "force-static";

/**
 * Emitted as /sitemap.xml by the static export. Tool URLs come from the same
 * TOOLS list that feeds generateStaticParams in app/[slug]/page.tsx, so the
 * sitemap cannot drift from the pages that are actually built. lastmod is the
 * build time, so every deploy tells crawlers the pages are fresh.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const entries: Array<{ path: string; changeFrequency: "daily" | "weekly" | "monthly"; priority: number }> = [
    { path: "/", changeFrequency: "daily", priority: 1.0 },
    { path: "/tools", changeFrequency: "weekly", priority: 0.9 },
    ...TOOLS.map((t) => ({ path: `/${t.slug}`, changeFrequency: "weekly" as const, priority: 0.9 })),
    { path: "/about", changeFrequency: "monthly", priority: 0.6 },
    { path: "/contact", changeFrequency: "monthly", priority: 0.5 },
    { path: "/privacy", changeFrequency: "monthly", priority: 0.3 },
    { path: "/terms", changeFrequency: "monthly", priority: 0.3 },
  ];
  return entries.map(({ path, changeFrequency, priority }) => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency,
    priority,
  }));
}
