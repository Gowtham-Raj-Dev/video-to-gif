import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";
import { ToolCard } from "@/components/ToolCard";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRightIcon } from "@/components/Icons";
import { TOOLS } from "@/lib/tools";

const TASKS = [
  { label: "Convert MP4 to GIF", href: "/video-to-gif/" },
  { label: "Convert GIF to MP4", href: "/gif-to-video/" },
  { label: "Compress a GIF online, free", href: "/gif-compressor/" },
  { label: "Compress a video for WhatsApp", href: "/video-compressor/" },
  { label: "Resize a GIF", href: "/gif-resize/" },
  { label: "Crop a GIF to a square", href: "/gif-crop/" },
  { label: "Crop a video to 9:16 for Reels and Shorts", href: "/video-crop/" },
  { label: "Change a video to 720p or 480p", href: "/video-resize/" },
];

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

      {/* What people search for, each linked straight to the tool that does it */}
      <div className="mx-auto mt-12 max-w-3xl rounded-xl border border-[color:var(--border)] bg-[color:var(--card)] p-6 sm:p-8">
        <h3 className="font-display text-xl font-bold">Popular tasks</h3>
        <ul className="mt-4 grid gap-x-6 gap-y-2.5 text-sm sm:grid-cols-2">
          {TASKS.map((t) => (
            <li key={t.href + t.label}>
              <Link href={t.href} className="text-muted transition hover:text-accent">
                {t.label} <span aria-hidden>→</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <Reveal className="mt-12 text-center">
        <Link href="/tools/" className="btn-ghost">
          View all tools <ArrowRightIcon className="h-4 w-4" />
        </Link>
      </Reveal>
    </section>
  );
}
