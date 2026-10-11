import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { JsonLd } from "@/components/JsonLd";
import { buildMetadata, breadcrumbSchema } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { TOOLS } from "@/lib/tools";

export const metadata: Metadata = buildMetadata({
  title: "About",
  description:
    "GIF Studio is a free set of GIF and video tools that run in your browser, so your files stay on your device. Learn who builds it and why.",
  path: "/about",
});

const sections = [
  {
    heading: "What GIF Studio does",
    body: [
      `GIF Studio offers ${TOOLS.length} free tools for everyday GIF and video jobs: turn a video into a GIF, turn a GIF into a video, and resize, crop or compress either one. There is no watermark and no account to create.`,
      "Conversion runs inside your browser using WebAssembly. Your videos and GIFs are processed on your own device rather than uploaded to a server, so large files never wait on an upload and your media stays with you.",
    ],
  },
  {
    heading: "Who builds it",
    body: [
      `GIF Studio is built and maintained by ${SITE.creator} at ${SITE.brand}, a small group of free web tools. It is a side project made to be fast, simple and honest about what it does.`,
      "The site may show advertising to help cover running costs and keep the tools free. We do not charge for exports or lock features behind a paywall.",
    ],
  },
  {
    heading: "Our approach",
    body: [
      "Each tool does one job and shows its options up front. Where a result depends on your settings, such as GIF size versus quality, we say so rather than promise magic. If something breaks or you have an idea, we want to hear about it.",
    ],
  },
];

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <section className="container-px pt-[114px] pb-[50px]">
        <Breadcrumbs
          items={[
            { name: "Home", path: "/" },
            { name: "About", path: "/about" },
          ]}
        />
        <div className="mx-auto mt-8 max-w-3xl">
          <h1 className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
            <span className="heading-gradient">About GIF Studio</span>
          </h1>
          <p className="mt-6 text-base leading-relaxed text-muted">
            Free GIF and video tools that run in your browser, with no signup and no
            watermark.
          </p>

          <div className="mt-10 space-y-10">
            {sections.map((s) => (
              <div key={s.heading}>
                <h2 className="font-display text-xl font-bold">{s.heading}</h2>
                {s.body.map((p, i) => (
                  <p key={i} className="mt-3 text-sm leading-relaxed text-muted">
                    {p}
                  </p>
                ))}
              </div>
            ))}
            <div>
              <h2 className="font-display text-xl font-bold">Get in touch</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Questions, bug reports or feature ideas are welcome on our{" "}
                <Link href="/contact" className="text-accent hover:underline">
                  Contact page
                </Link>{" "}
                or at {SITE.email}. You can also browse{" "}
                <Link href="/tools" className="text-accent hover:underline">
                  all tools
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
