import Link from "next/link";
import { ToolIcon, ArrowRightIcon } from "@/components/Icons";
import type { Tool } from "@/lib/tools";

export function ToolCard({ tool }: { tool: Tool; index?: number }) {
  return (
    <Link
      href={`/${tool.slug}`}
      className="group flex h-full flex-col rounded-xl border border-[color:var(--border)] bg-[color:var(--card)] p-6 transition-colors hover:border-accent"
    >
      <div className="flex items-center justify-between">
        <span className="icon-tile h-12 w-12">
          <ToolIcon name={tool.icon} className="h-6 w-6" />
        </span>
        <div className="flex gap-1.5">
          {tool.popular && (
            <span className="chip border-accent/40 text-accent">Popular</span>
          )}
          {tool.isNew && <span className="chip">New</span>}
        </div>
      </div>

      <h3 className="mt-5 font-display text-lg font-semibold tracking-tight">
        {tool.name}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
        {tool.short}
      </p>

      <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
        Open Tool
        <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}
