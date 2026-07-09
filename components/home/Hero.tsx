import Link from "next/link";
import { ArrowRightIcon, CheckIcon } from "@/components/Icons";
import { HeroUploadPanel } from "@/components/home/HeroUploadPanel";

export function Hero() {
  return (
    <section className="relative border-b border-[color:var(--border)] surface-alt pt-[114px] pb-[50px]">
      <div className="container-px">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
          {/* LEFT: copy */}
          <div className="text-center lg:text-left">
            <div>
              <span className="section-eyebrow">
                Free · No signup · No watermark
              </span>
            </div>

            <h1 className="mt-5 font-display text-4xl font-bold leading-[1.1] tracking-tight text-balance sm:text-5xl">
              Convert &amp; edit GIFs and videos online
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg lg:mx-0">
              Convert, resize, crop, compress and optimize — all in your browser,
              in seconds. No installs, no uploads, no waiting.
            </p>

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row lg:justify-start">
              <Link href="/tools" className="btn-primary px-6 py-3 text-base">
                Start Editing <ArrowRightIcon className="h-4 w-4" />
              </Link>
              <Link href="/tools" className="btn-ghost px-6 py-3 text-base">
                Explore Tools
              </Link>
            </div>

            <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted lg:justify-start">
              {["No watermark", "100% private", "Works in browser"].map((t) => (
                <li key={t} className="inline-flex items-center gap-1.5">
                  <CheckIcon className="h-4 w-4 text-accent" /> {t}
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT: product panel */}
          <HeroUploadPanel />
        </div>
      </div>
    </section>
  );
}
