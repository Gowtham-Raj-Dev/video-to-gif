import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { TOOLS, getTool, getRelatedTools } from "@/lib/tools";
import { ToolWorkspace } from "@/components/tools/ToolWorkspace";
import { ToolCard } from "@/components/ToolCard";
import { FaqAccordion } from "@/components/Faq";
import { CtaBanner } from "@/components/CtaBanner";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/JsonLd";
import { ToolIcon, ArrowRightIcon, CheckIcon, SparkleIcon } from "@/components/Icons";
import {
  buildMetadata,
  softwareApplicationSchema,
  faqSchema,
  breadcrumbSchema,
} from "@/lib/seo";

export function generateStaticParams() {
  return TOOLS.map((t) => ({ slug: t.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const tool = getTool(params.slug);
  if (!tool) return {};
  return buildMetadata({
    title: tool.seoTitle,
    description: tool.metaDescription,
    path: `/${tool.slug}`,
    keywords: tool.keywords,
  });
}

export default function ToolPage({ params }: { params: { slug: string } }) {
  const tool = getTool(params.slug);
  if (!tool) notFound();

  const related = getRelatedTools(tool);
  const crumbs = [
    { name: "Home", path: "/" },
    { name: "Tools", path: "/tools" },
    { name: tool.name, path: `/${tool.slug}` },
  ];

  return (
    <>
      <JsonLd
        data={[
          softwareApplicationSchema(tool),
          faqSchema(tool.faqs),
          breadcrumbSchema(crumbs),
        ]}
      />

      {/* Hero */}
      <section className="border-b border-[color:var(--border)] surface-alt pt-[114px] pb-[50px]">
        <div className="container-px">
          <Breadcrumbs items={crumbs} />
          <div className="mt-8 grid items-center gap-8 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <div className="flex items-center gap-3">
                <span className="icon-tile h-14 w-14">
                  <ToolIcon name={tool.icon} className="h-7 w-7" />
                </span>
                <div className="flex gap-1.5">
                  {tool.popular && (
                    <span className="chip border-accent/40 text-accent">Popular</span>
                  )}
                  <span className="chip">{tool.category}</span>
                </div>
              </div>
              <h1 className="mt-6 font-display text-4xl font-bold tracking-tight text-balance sm:text-5xl">
                {tool.name}
              </h1>
              <p className="mt-4 text-lg font-medium text-[color:var(--fg)]">
                {tool.tagline}
              </p>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
                {tool.long}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <label
                  htmlFor="workspace-file-input"
                  className="btn-primary cursor-pointer text-center"
                >
                  Upload File <ArrowRightIcon className="h-4 w-4" />
                </label>
                <Link href="/tools" className="btn-ghost">
                  All Tools
                </Link>
              </div>
              <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted">
                {["No watermark", "No signup", "100% private"].map((t) => (
                  <li key={t} className="inline-flex items-center gap-1.5">
                    <CheckIcon className="h-4 w-4 text-accent" /> {t}
                  </li>
                ))}
              </ul>
            </div>

            <Reveal y={30}>
              <ToolWorkspace tool={tool} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container-px py-[50px]">
        <SectionHeading
          eyebrow="Features"
          title={`Everything in the ${tool.name} tool`}
          description="Purpose-built controls that make the job fast, precise and effortless."
        />
        <StaggerGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {tool.features.map((f) => (
            <StaggerItem key={f.title}>
              <div className="h-full rounded-xl border border-[color:var(--border)] bg-[color:var(--card)] p-6 transition-colors hover:border-accent">
                <span className="icon-tile h-11 w-11">
                  <SparkleIcon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-base font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {f.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      {/* Benefits + Formats */}
      <section className="container-px py-[50px]">
        <div className="grid gap-5 lg:grid-cols-2">
          <Reveal>
            <div className="h-full rounded-xl border border-[color:var(--border)] bg-[color:var(--card)] p-8">
              <h3 className="font-display text-xl font-bold">Why you'll love it</h3>
              <ul className="mt-6 space-y-4">
                {tool.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3 text-sm">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent/10 text-accent">
                      <CheckIcon className="h-3.5 w-3.5" />
                    </span>
                    <span className="leading-relaxed">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="h-full rounded-xl border border-[color:var(--border)] bg-[color:var(--card)] p-8">
              <h3 className="font-display text-xl font-bold">Supported formats</h3>
              <div className="mt-6 space-y-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted">
                    Input
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {tool.inputFormats.map((f) => (
                      <span key={f} className="chip text-[color:var(--fg)]">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted">
                    Output
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {tool.outputFormats.map((f) => (
                      <span
                        key={f}
                        className="chip border-accent/30 text-accent"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="container-px py-[50px]">
        <SectionHeading
          eyebrow="FAQ"
          title={`${tool.name} questions`}
          description="Quick answers about using this tool."
        />
        <FaqAccordion items={tool.faqs} />
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="container-px py-[50px]">
          <SectionHeading
            eyebrow="Keep Going"
            title="Related tools"
            description="Pair this with another tool to finish the job."
          />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((t, i) => (
              <ToolCard key={t.slug} tool={t} index={i} />
            ))}
          </div>
        </section>
      )}

      <CtaBanner
        title={`Start using ${tool.name} now`}
        subtitle="Free, private and watermark-free. No signup required — just upload and go."
      />
    </>
  );
}
