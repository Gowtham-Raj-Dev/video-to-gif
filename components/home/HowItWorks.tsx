import { SectionHeading } from "@/components/SectionHeading";
import { StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { HOW_IT_WORKS } from "@/lib/content";
import { UploadIcon, GridIcon, SlidersIcon, DownloadIcon } from "@/components/Icons";

const ICONS = {
  upload: UploadIcon,
  grid: GridIcon,
  sliders: SlidersIcon,
  download: DownloadIcon,
} as const;

export function HowItWorks() {
  return (
    <section id="how-it-works" className="container-px scroll-mt-24 py-[50px]">
      <SectionHeading
        eyebrow="How It Works"
        title="From file to finished in four steps"
        description="No manuals, no learning curve. Upload, pick a tool, tweak, and download."
      />

      <div className="mt-16">
        <StaggerGroup className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {HOW_IT_WORKS.map((s) => {
            const Icon = ICONS[s.icon as keyof typeof ICONS];
            return (
              <StaggerItem key={s.step}>
                <div className="h-full rounded-xl border border-[color:var(--border)] bg-[color:var(--card)] p-6">
                  <span className="icon-tile h-12 w-12">
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="mt-4 block text-xs font-semibold uppercase tracking-[0.14em] text-accent">
                    Step {s.step}
                  </span>
                  <h3 className="mt-1 text-lg font-semibold">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {s.description}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
