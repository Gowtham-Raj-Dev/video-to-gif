import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";
import { ToolCard } from "@/components/ToolCard";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRightIcon } from "@/components/Icons";
import { TOOLS } from "@/lib/tools";

export function ToolsSection() {
  return (
    <section id="tools" className="container-px scroll-mt-24 py-[50px]">
      <SectionHeading
        eyebrow="The Toolkit"
        title="A tool for every GIF & video task"
        description="Eight powerful, browser-based tools to convert, resize, crop and compress — each one fast, private and free."
      />

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {TOOLS.map((tool, i) => (
          <ToolCard key={tool.slug} tool={tool} index={i} />
        ))}
      </div>

      <Reveal className="mt-12 text-center">
        <Link href="/tools" className="btn-ghost">
          View all tools <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </Reveal>
    </section>
  );
}
