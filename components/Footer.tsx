import Link from "next/link";
import { Logo } from "@/components/Logo";
import { GithubIcon, GridIcon } from "@/components/Icons";
import { HeartButton } from "@/components/HeartButton";
import { SITE } from "@/lib/site";
import { TOOLS } from "@/lib/tools";

const columns = [
  {
    title: "Tools",
    links: TOOLS.slice(0, 5).map((t) => ({ label: t.name, href: `/${t.slug}` })),
  },
  {
    title: "Resources",
    links: [

      { label: "All Tools", href: "/tools" },
      { label: "Features", href: "/#features" },
      { label: "How It Works", href: "/#how-it-works" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "FAQ", href: "/#faq" },
      { label: "Contact", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-[color:var(--border)] surface-alt">
      <div className="container-px pb-8 pt-[50px]">
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="max-w-sm">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {SITE.tagline} Convert, compress, resize and crop GIFs and videos
              online — free, private and watermark-free.
            </p>
            <a
              href="https://videotoframe.codelove.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex items-start gap-3 rounded-lg border border-accent/20 bg-accent/5 p-3 transition-colors hover:border-accent/40 hover:bg-accent/10"
            >
              <div className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-md bg-gradient-to-br from-purple-400 to-indigo-500 text-white shadow-sm shadow-accent/20">
                <GridIcon className="h-4 w-4" />
              </div>
              <div>
                <span className="block text-sm font-semibold text-accent">
                  Video to Frame <span className="ml-1 text-[10px]">✨ New</span>
                </span>
                <span className="mt-0.5 block text-xs text-muted">
                  Extract high-quality frames from video
                </span>
              </div>
            </a>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-semibold text-[color:var(--fg)]">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {col.links.map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="text-sm text-muted transition hover:text-accent"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-[color:var(--border)] pt-6 text-sm text-muted sm:flex-row">
          <p>© {new Date().getFullYear()} GIF Studio. All rights reserved.</p>
          <p className="inline-flex items-center gap-1.5">
            Developed with{" "}
            <HeartButton /> by{" "}
            <a
              href={SITE.brandUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[color:var(--fg)] transition hover:text-accent"
            >
              {SITE.brand}
            </a>
            <span className="text-muted">· Created by {SITE.creator}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
