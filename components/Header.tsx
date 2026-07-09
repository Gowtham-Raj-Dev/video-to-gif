"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "@/components/Logo";
import { ThemeToggle } from "@/components/ThemeToggle";
import { MenuIcon, CloseIcon, ChevronIcon, ToolIcon, GridIcon } from "@/components/Icons";
import { NAV_LINKS, SITE } from "@/lib/site";
import { TOOLS } from "@/lib/tools";

export function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[color:var(--border)] bg-[color:var(--card)]">
      <div className="container-px">
        <div className="flex h-16 items-center justify-between gap-3">
          <Logo />

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {NAV_LINKS.map((l) =>
              l.label === "Tools" ? (
                <div key={l.href} className="group relative">
                  <Link
                    href={l.href}
                    className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-muted transition-colors hover:text-[color:var(--fg)]"
                  >
                    Tools <ChevronIcon className="h-3 w-3 transition-transform group-hover:rotate-180" />
                  </Link>
                  <div className="absolute left-1/2 top-full hidden w-[840px] -translate-x-[30%] pt-3 group-hover:block">
                    <div className="flex flex-col rounded-xl border border-[color:var(--border)] bg-[color:var(--card)] p-4 shadow-card">
                      <div className="grid grid-cols-3 gap-3">
                        {TOOLS.map((t) => (
                          <Link
                            key={t.slug}
                            href={`/${t.slug}`}
                            className="flex items-start gap-3 rounded-lg border border-transparent p-3 transition-colors hover:border-[color:var(--border)] hover:bg-[color:var(--bg-alt)]"
                          >
                            <div className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-md bg-gradient-to-br ${t.gradient} text-white`}>
                              <ToolIcon name={t.icon} className="h-4 w-4" />
                            </div>
                            <div>
                              <span className="block text-sm font-semibold text-[color:var(--fg)]">{t.name}</span>
                              <span className="mt-0.5 block text-xs text-muted line-clamp-2">{t.short}</span>
                            </div>
                          </Link>
                        ))}
                        <a
                          href="https://videotoframe.codelove.in/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-start gap-3 rounded-lg border border-accent/20 bg-accent/5 p-3 transition-colors hover:border-accent/40 hover:bg-accent/10"
                        >
                          <div className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-md bg-gradient-to-br from-purple-400 to-indigo-500 text-white shadow-sm shadow-accent/20">
                            <GridIcon className="h-4 w-4" />
                          </div>
                          <div>
                            <span className="block text-sm font-semibold text-accent">Video to Frame <span className="ml-1 text-[10px]">✨ New</span></span>
                            <span className="mt-0.5 block text-xs text-muted line-clamp-2">Extract high-quality frames from video</span>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={l.href}
                  href={l.href}
                  className="rounded-md px-3 py-2 text-sm font-medium text-muted transition-colors hover:text-[color:var(--fg)]"
                >
                  {l.label}
                </Link>
              )
            )}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <ThemeToggle />
            <Link href="/tools" className="btn-primary hidden sm:inline-flex">
              Start Editing
            </Link>
            <button
              type="button"
              aria-label="Toggle menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="grid h-9 w-9 place-items-center rounded-md border border-[color:var(--border)] text-[color:var(--fg)] lg:hidden"
            >
              {open ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="border-t border-[color:var(--border)] bg-[color:var(--bg)] lg:hidden">
          <nav className="container-px flex flex-col py-3" aria-label="Mobile">
            {NAV_LINKS.map((l) =>
              l.label === "Tools" ? (
                <details key={l.href} className="group">
                  <summary className="flex cursor-pointer list-none items-center justify-between rounded-md px-3 py-3 text-sm font-medium text-muted transition-colors hover:bg-[color:var(--bg-alt)] hover:text-[color:var(--fg)] [&::-webkit-details-marker]:hidden">
                    Tools <ChevronIcon className="h-4 w-4 transition-transform group-open:rotate-180" />
                  </summary>
                  <div className="ml-4 flex flex-col border-l border-[color:var(--border)] py-2 pl-2">
                    {TOOLS.map((t) => (
                      <Link
                        key={t.slug}
                        href={`/${t.slug}`}
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm text-muted transition-colors hover:text-[color:var(--fg)]"
                      >
                        <ToolIcon name={t.icon} className="h-3.5 w-3.5" />
                        {t.name}
                      </Link>
                    ))}
                    <a
                      href="https://videotoframe.codelove.in/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm text-muted transition-colors hover:text-[color:var(--fg)]"
                    >
                      <GridIcon className="h-3.5 w-3.5" />
                      Video to Frame <span className="text-[9px] text-accent">✨ New</span>
                    </a>
                  </div>
                </details>
              ) : (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-3 text-sm font-medium text-muted transition-colors hover:bg-[color:var(--bg-alt)] hover:text-[color:var(--fg)]"
                >
                  {l.label}
                </Link>
              )
            )}
            <Link
              href="/tools"
              onClick={() => setOpen(false)}
              className="btn-primary mt-2 w-full"
            >
              Start Editing
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
