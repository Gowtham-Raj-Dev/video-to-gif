import { SectionHeading } from "@/components/SectionHeading";
import { StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { WHY_CHOOSE, type WhyItem } from "@/lib/content";
import {
  BoltIcon,
  ShieldIcon,
  InfinityIcon,
  TagIcon,
  CpuIcon,
  PhoneIcon,
  CloudOffIcon,
  KeyOffIcon,
  SparkleIcon,
  HeartIcon,
} from "@/components/Icons";

const ICONS: Record<WhyItem["icon"], (p: { className?: string }) => JSX.Element> = {
  bolt: BoltIcon,
  shield: ShieldIcon,
  infinity: InfinityIcon,
  tag: TagIcon,
  cpu: CpuIcon,
  phone: PhoneIcon,
  cloudoff: CloudOffIcon,
  keyoff: KeyOffIcon,
  sparkle: SparkleIcon,
  heart: HeartIcon,
};

export function WhyChoose() {
  return (
    <section className="border-y border-[color:var(--border)] surface-alt py-[50px]">
      <div className="container-px">
        <SectionHeading
          eyebrow="Why GIF Studio"
          title="Professional tools, zero compromises"
          description="Built to be fast, private and reliable — and completely free to use."
        />

        <StaggerGroup className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {WHY_CHOOSE.map((item) => {
            const Icon = ICONS[item.icon];
            return (
              <StaggerItem key={item.title}>
                <div className="h-full rounded-xl border border-[color:var(--border)] bg-[color:var(--card)] p-5 transition-colors hover:border-accent">
                  <span className="icon-tile h-11 w-11">
                    <Icon className="h-5 w-5" />
                  </span>
                  <h3 className="mt-4 text-sm font-semibold">{item.title}</h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-muted">
                    {item.description}
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
