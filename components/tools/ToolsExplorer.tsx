"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ToolIcon, SearchIcon, ArrowRightIcon, CheckIcon } from "@/components/Icons";
import { TOOLS, CATEGORIES, type Tool } from "@/lib/tools";

function LargeToolCard({ tool }: { tool: Tool }) {
  return (
    <Link
      href={`/${tool.slug}`}
      className="group flex h-full flex-col rounded-xl border border-[color:var(--border)] bg-[color:var(--card)] p-7 transition-colors hover:border-accent"
    >
      <div className="flex items-start justify-between">
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
      <p className="mt-2 text-sm leading-relaxed text-muted">{tool.short}</p>

      <ul className="mt-5 space-y-2">
        {tool.features.slice(0, 3).map((f) => (
          <li key={f.title} className="flex items-center gap-2 text-[13px] text-muted">
            <CheckIcon className="h-3.5 w-3.5 shrink-0 text-accent" />
            {f.title}
          </li>
        ))}
      </ul>

      <div className="mt-5 flex flex-wrap gap-1.5">
        {[...tool.inputFormats.slice(0, 4)].map((f) => (
          <span
            key={f}
            className="rounded border border-[color:var(--border)] bg-[color:var(--bg-alt)] px-2 py-0.5 text-[11px] font-medium text-muted"
          >
            {f}
          </span>
        ))}
      </div>

      <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
        Open Tool
        <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}

export function ToolsExplorer() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("All");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return TOOLS.filter((t) => {
      const matchesCat = category === "All" || t.category === category;
      const matchesQuery =
        !q ||
        t.name.toLowerCase().includes(q) ||
        t.short.toLowerCase().includes(q) ||
        t.keywords.some((k) => k.includes(q));
      return matchesCat && matchesQuery;
    });
  }, [query, category]);

  return (
    <div>
      {/* controls */}
      <div className="sticky top-16 z-20 flex flex-col gap-4 rounded-xl border border-[color:var(--border)] bg-[color:var(--card)] p-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="relative flex flex-1 items-center">
          <SearchIcon className="pointer-events-none absolute left-3.5 h-[18px] w-[18px] text-muted" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tools…"
            aria-label="Search tools"
            className="w-full rounded-lg border border-[color:var(--border)] bg-[color:var(--bg)] py-2.5 pl-10 pr-4 text-sm outline-none transition-colors focus:border-accent"
          />
        </label>
        <div className="flex flex-wrap gap-1.5">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={`rounded-md px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                category === c
                  ? "bg-accent text-[color:var(--accent-fg)]"
                  : "border border-[color:var(--border)] text-muted hover:text-[color:var(--fg)]"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* grid */}
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((tool) => (
          <LargeToolCard key={tool.slug} tool={tool} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-16 text-center text-muted">
          No tools match “{query}”. Try a different search.
        </p>
      )}
    </div>
  );
}
