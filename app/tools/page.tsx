import type { Metadata } from "next";
import { ToolsExplorer } from "@/components/tools/ToolsExplorer";
import { CtaBanner } from "@/components/CtaBanner";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata, breadcrumbSchema, softwareApplicationSchema } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "All GIF & Video Editing Tools | GIF Studio",
  description:
    "Browse every GIF and video tool: convert, compress, resize and crop online. Free, private, browser-based tools with no watermark and no signup required.",
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
          softwareApplicationSchema(),
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
        <ToolsExplorer />
      </section>

      <CtaBanner />
    </>
  );
}
