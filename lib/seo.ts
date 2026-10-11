import type { Metadata } from "next";
import { SITE, absoluteUrl } from "./site";
import type { Tool } from "./tools";

interface PageSeo {
  /** Page title WITHOUT the brand — the root layout template appends " | GIF Studio". */
  title: string;
  description: string;
  path: string; // e.g. "/tools" or "/video-to-gif"
  keywords?: string[];
}

/** Default social share image: a static 1200x630 file at public/og.png. */
export const OG_IMAGE = {
  url: "/og.png",
  width: 1200,
  height: 630,
  alt: "GIF Studio — free online GIF and video tools that run in your browser",
  type: "image/png",
} as const;

/** Build a full Metadata object with OG, Twitter and canonical for any page. */
export function buildMetadata({
  title,
  description,
  path,
  keywords,
}: PageSeo): Metadata {
  const url = absoluteUrl(path);
  // Some titles already carry the brand; the root template adds it back once.
  const suffix = ` | ${SITE.name}`;
  const bare = title.endsWith(suffix) ? title.slice(0, -suffix.length) : title;
  const socialTitle = `${bare} | ${SITE.name}`;
  return {
    title: bare,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title: socialTitle,
      description,
      siteName: SITE.name,
      locale: "en_US",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      creator: SITE.twitter,
      images: [OG_IMAGE.url],
    },
  };
}

/* ---------- JSON-LD structured data ---------- */

const ORGANIZATION_ID = `${SITE.brandUrl}/#organization`;
const WEBSITE_ID = `${absoluteUrl("/")}#website`;

/** The publisher behind the site: CodeLove. */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: "CodeLove",
    url: SITE.brandUrl,
    email: SITE.email,
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: SITE.name,
    url: absoluteUrl("/"),
    description: SITE.description,
    inLanguage: "en",
    publisher: { "@id": ORGANIZATION_ID },
  };
}

export function softwareApplicationSchema(tool?: Tool) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: tool ? `${tool.name} — ${SITE.name}` : SITE.name,
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Web Browser",
    browserRequirements: "Requires JavaScript and WebAssembly",
    description: tool ? tool.metaDescription : SITE.description,
    url: absoluteUrl(tool ? `/${tool.slug}` : "/"),
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    isPartOf: { "@id": WEBSITE_ID },
    publisher: { "@id": ORGANIZATION_ID },
  };
}

export function faqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

/** HowTo — only for pages that visibly list the same steps. */
export function howToSchema(
  name: string,
  steps: readonly { title: string; description: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.title,
      text: s.description,
    })),
  };
}

/** ItemList of tool pages, for the /tools index. */
export function toolListSchema(tools: Tool[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${SITE.name} tools`,
    numberOfItems: tools.length,
    itemListElement: tools.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      url: absoluteUrl(`/${t.slug}`),
    })),
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
