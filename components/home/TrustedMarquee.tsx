import { TRUST_BADGES } from "@/lib/content";
import { CheckIcon } from "@/components/Icons";

export function TrustedMarquee() {
  return (
    <section aria-label="Highlights" className="border-b border-[color:var(--border)] py-6">
      <div className="container-px">
        <ul className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
          {TRUST_BADGES.map((b) => (
            <li
              key={b}
              className="inline-flex items-center gap-2 whitespace-nowrap text-sm font-medium text-muted"
            >
              <CheckIcon className="h-4 w-4 text-accent" />
              {b}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
