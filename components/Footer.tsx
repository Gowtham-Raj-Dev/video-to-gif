import Link from "next/link";
import { Logo } from "@/components/Logo";
import { GithubIcon, GridIcon } from "@/components/Icons";
import { HeartButton } from "@/components/HeartButton";
import { GUIDES, NETWORK, SITE, VIDEO_TO_IMAGES_URL } from "@/lib/site";
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
      { label: "About", href: "/about" },
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
              href={VIDEO_TO_IMAGES_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex items-start gap-3 rounded-lg border border-accent/20 bg-accent/5 p-3 transition-colors hover:border-accent/40 hover:bg-accent/10"
            >
              <div className="mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-md bg-gradient-to-br from-purple-400 to-indigo-500 text-white shadow-sm shadow-accent/20">
                <GridIcon className="h-4 w-4" />
              </div>
              <div>
                <span className="block text-sm font-semibold text-accent">
                  Video to Images <span className="ml-1 text-[10px]">✨ New</span>
                </span>
                <span className="mt-0.5 block text-xs text-muted">
                  Extract frames from video, plus image tools
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

        <div className="mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
          <h3 className="font-semibold text-[color:var(--fg)]">CodeLove network</h3>
          {NETWORK.map((n) => (
            <a
              key={n.href}
              href={n.href}
              target="_blank"
              rel="noopener"
              className="text-muted transition hover:text-accent"
            >
              {n.label}
            </a>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
          <h3 className="font-semibold text-[color:var(--fg)]">Guides</h3>
          {GUIDES.map((g) => (
            <a
              key={g.href}
              href={g.href}
              target="_blank"
              rel="noopener"
              className="text-muted transition hover:text-accent"
            >
              {g.label}
            </a>
          ))}
        </div>

        {/* The parent brand and what it does, in one line — same text on every CodeLove site. */}
        <div className="mt-8 flex flex-col gap-3 border-t border-[color:var(--border)] pt-6 sm:flex-row sm:items-center sm:gap-6">
          <a
            href={SITE.brandUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="CodeLove — codelove.in"
            className="block w-fit shrink-0"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/codelove/codelove-footer-on-light.png"
              alt="CodeLove"
              width={704}
              height={144}
              loading="lazy"
              className="h-12 w-auto [.dark_&]:hidden"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/codelove/codelove-footer-on-dark.png"
              alt="CodeLove"
              width={704}
              height={144}
              loading="lazy"
              className="hidden h-12 w-auto [.dark_&]:block"
            />
          </a>
          <p className="text-sm leading-relaxed text-muted">
            CodeLove makes free web tools, apps and games for creators, students and developers — simple to use, no
            hidden fees.
          </p>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-[color:var(--border)] pt-6 text-sm text-muted sm:flex-row">
          <p>© {new Date().getFullYear()} GIF Studio. All rights reserved.</p>
          <p className="inline-flex items-center gap-1.5 flex-wrap justify-center">
            Built with <HeartButton /> by{" "}
            <a
              href="https://gowtham.codelove.in"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[color:var(--fg)] transition hover:text-accent"
            >
              Gowtham
            </a>
            <span className="hidden opacity-50 sm:inline">•</span>
            <a
              href="https://codelove.in"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[color:var(--fg)] transition hover:text-accent"
            >
              CodeLove
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
