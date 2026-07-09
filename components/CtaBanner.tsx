import Link from "next/link";
import { ArrowRightIcon } from "@/components/Icons";

export function CtaBanner({
  title = "Ready to edit your GIFs & videos?",
  subtitle = "Jump straight into any tool — no signup, no watermark, no waiting. Just open and create.",
  cta = "Start Editing Now",
  href = "/tools",
}: {
  title?: string;
  subtitle?: string;
  cta?: string;
  href?: string;
}) {
  return (
    <section className="container-px py-[50px]">
      <div className="rounded-xl border border-[color:var(--border)] bg-[color:var(--card)] p-10 text-center shadow-card sm:p-16">
        <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold tracking-tight text-balance sm:text-4xl">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-base text-muted sm:text-lg">
          {subtitle}
        </p>
        <div className="mt-8 flex justify-center">
          <Link href={href} className="btn-primary px-6 py-3 text-base">
            {cta} <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
