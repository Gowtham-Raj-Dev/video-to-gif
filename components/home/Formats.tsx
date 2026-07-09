import { SectionHeading } from "@/components/SectionHeading";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { FORMATS } from "@/lib/content";

function FormatGroup({
  label,
  items,
}: {
  label: string;
  items: string[];
}) {
  return (
    <div className="rounded-xl border border-[color:var(--border)] bg-[color:var(--card)] p-7">
      <div className="flex items-center gap-3">
        <span className="h-2.5 w-2.5 rounded-full bg-accent" />
        <h3 className="font-display text-lg font-bold">{label}</h3>
      </div>
      <StaggerGroup className="mt-5 flex flex-wrap gap-2.5">
        {items.map((f) => (
          <StaggerItem key={f}>
            <span className="chip text-[color:var(--fg)]">{f}</span>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </div>
  );
}

export function Formats() {
  return (
    <section className="container-px py-[50px]">
      <SectionHeading
        eyebrow="Supported Formats"
        title="Bring almost anything, export what you need"
        description="Wide format support across video and GIF, with high-quality output every time."
      />
      <Reveal className="mt-14">
        <div className="grid gap-5 md:grid-cols-2">
          <FormatGroup label="Video" items={FORMATS.video} />
          <FormatGroup label="GIF" items={FORMATS.gif} />
        </div>
      </Reveal>
    </section>
  );
}
