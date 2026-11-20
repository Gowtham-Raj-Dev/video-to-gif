import type { Metadata } from "next";
import Link from "next/link";
import { ToolsExplorer } from "@/components/tools/ToolsExplorer";
import { CtaBanner } from "@/components/CtaBanner";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { TOOLS } from "@/lib/tools";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata, breadcrumbSchema, toolListSchema } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Free GIF & Video Tools — Convert & Compress",
  description:
    "All 8 free GIF and video tools in one place: MP4 to GIF, GIF to MP4, GIF compressor, video compressor, resize and crop. Runs in your browser, no upload.",
  path: "/tools",
  keywords: [
    "gif tools",
    "video tools",
    "online video editor",
    "gif converter",
    "video converter",
    "free online converter",
  ],
});

export default function ToolsPage() {
  return (
    <>
      <JsonLd
        data={[
          toolListSchema(TOOLS),
          breadcrumbSchema([
            { name: "Home", path: "/" },
            { name: "Tools", path: "/tools" },
          ]),
        ]}
      />

      <section className="container-px pt-[114px] pb-[50px]">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "Tools", path: "/tools" },
          ]}
        />
        <div className="mt-6 max-w-3xl">
          <span className="section-eyebrow">Everything in one place</span>
          <h1 className="mt-4 font-display text-4xl font-extrabold tracking-tight text-balance sm:text-6xl">
            <span className="heading-gradient">All GIF &amp; Video</span> Editing
            Tools
          </h1>
          <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
            Everything you need to convert, compress, resize, crop, and optimize
            GIFs and videos online — free, private, and right in your browser.
          </p>
        </div>
      </section>

      <section className="container-px pb-[50px]">
        <h2 className="sr-only">Explore All GIF and Video Tools</h2>
        <ToolsExplorer />
      </section>

      {/* Plain list of every tool and what it is for: crawlable links with descriptive text */}
      <section className="container-px pb-[50px]">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">Which tool do I need?</h2>
          <p className="mt-3 text-base leading-relaxed text-muted">
            Every tool runs ffmpeg inside your browser, so files are processed on your own device. Here is what each one
            is for:
          </p>
          <ul className="mt-6 space-y-4">
            {TOOLS.map((t) => (
              <li key={t.slug} className="text-sm leading-relaxed sm:text-base">
                <Link href={`/${t.slug}/`} className="font-semibold text-[color:var(--fg)] transition hover:text-accent">
                  {t.h1}
                </Link>
                <span className="text-muted"> — {t.short}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBanner />
    </>
  );
}
