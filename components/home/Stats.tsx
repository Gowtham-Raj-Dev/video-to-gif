import { STATS, type Stat } from "@/lib/content";

function formatStat(stat: Stat) {
  const value = stat.decimals
    ? stat.value.toFixed(stat.decimals)
    : Math.round(stat.value).toString();
  return `${value}${stat.suffix}`;
}

export function Stats() {
  return (
    <section className="container-px py-[50px]">
      <div className="rounded-xl border border-[color:var(--border)] bg-[color:var(--card)] p-10 shadow-card sm:p-14">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="text-center">
              <span className="font-display text-4xl font-bold tracking-tight text-accent sm:text-5xl">
                {formatStat(stat)}
              </span>
              <p className="mt-2 text-sm font-medium text-muted">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
