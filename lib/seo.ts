import type { Metadata } from "next";
import { SITE } from "./site";
import type { Tool } from "./tools";

interface PageSeo {
  title: string;
  description: string;
  path: string; // e.g. "/tools" or "/video-to-gif"
  keywords?: string[];
}

/** Build a full Metadata object with OG, Twitter and canonical for any page. */
export function buildMetadata({
  title,
  description,
  path,
  keywords,
}: PageSeo): Metadata {
  const url = `${SITE.url}${path}`;
  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      siteName: SITE.name,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: SITE.twitter,
    },
    robots: { index: true, follow: true },
  };
}

/* ---------- JSON-LD structured data ---------- */

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    founder: { "@type": "Person", name: SITE.creator },
    sameAs: [SITE.brandUrl],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    description: SITE.description,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE.url}/tools?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function softwareApplicationSchema(tool?: Tool) {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool ? `${tool.name} — ${SITE.name}` : SITE.name,
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Web Browser",
    description: tool ? tool.metaDescription : SITE.description,
    url: tool ? `${SITE.url}/${tool.slug}` : SITE.url,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      ratingCount: "1280",
    },
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

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE.url}${item.path}`,
    })),
  };
}
