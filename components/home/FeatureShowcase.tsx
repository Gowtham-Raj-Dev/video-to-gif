import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ToolIcon, CheckIcon } from "@/components/Icons";
import { SHOWCASE } from "@/lib/content";

export function FeatureShowcase() {
  return (
    <section id="features" className="container-px scroll-mt-24 py-[50px]">
      <SectionHeading
        eyebrow="Feature Showcase"
        title="Made for the way you create"
        description="Whether you're shipping product, growing an audience, or posting daily — the toolkit adapts to you."
      />

      <div className="mt-16 space-y-16 sm:space-y-24">
        {SHOWCASE.map((item, i) => {
          const reversed = i % 2 === 1;
          return (
            <div
              key={item.title}
              className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16"
            >
              {/* Visual */}
              <Reveal className={reversed ? "lg:order-2" : ""}>
                <div className="overflow-hidden rounded-xl border border-[color:var(--border)] bg-[color:var(--card)] p-8 shadow-card">
                  <div className="flex items-center justify-between">
                    <span className="icon-tile h-16 w-16">
                      <ToolIcon name={item.icon} className="h-8 w-8" />
                    </span>
                    <span className="chip">{item.eyebrow}</span>
                  </div>
                  <div className="mt-8 space-y-3">
                    {[90, 70, 82].map((w, k) => (
                      <div key={k} className="h-2 w-full overflow-hidden rounded-full bg-[color:var(--border)]">
                        <div
                          className="h-full rounded-full bg-accent"
                          style={{ width: `${w}%` }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 grid grid-cols-3 gap-3">
                    {["Fast", "Private", "Free"].map((t) => (
                      <div
                        key={t}
                        className="rounded-lg border border-[color:var(--border)] bg-[color:var(--bg-alt)] p-3 text-center text-xs font-medium text-muted"
                      >
                        {t}
                      </div>
                    ))}
                  </div>
                </div>
              </Reveal>

              {/* Content */}
              <Reveal className={reversed ? "lg:order-1" : ""}>
                <span className="section-eyebrow">{item.eyebrow}</span>
                <h3 className="mt-4 font-display text-2xl font-bold tracking-tight sm:text-3xl">
                  {item.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-muted">
                  {item.description}
                </p>
                <ul className="mt-6 space-y-3">
                  {item.points.map((p) => (
                    <li key={p} className="flex items-center gap-3 text-sm">
                      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent/10 text-accent">
                        <CheckIcon className="h-3.5 w-3.5" />
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          );
        })}
      </div>
    </section>
  );
}
