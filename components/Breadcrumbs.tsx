import Link from "next/link";
import { ChevronIcon } from "@/components/Icons";

export function Breadcrumbs({
  items,
}: {
  items: { name: string; path: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol className="flex flex-wrap items-center gap-1.5 text-muted">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-1.5">
              {last ? (
                <span className="text-[color:var(--fg)]" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link href={item.path} className="transition hover:text-accent">
                  {item.name}
                </Link>
              )}
              {!last && <ChevronIcon className="h-4 w-4 -rotate-90 opacity-60" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
