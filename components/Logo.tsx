import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="GIF Studio home"
      className={`group inline-flex items-center gap-2.5 ${className}`}
    >
      <span className="grid h-9 w-9 place-items-center rounded-lg bg-accent text-[color:var(--accent-fg)]">
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="6" width="13" height="12" rx="2.5" />
          <path d="m16 9 5-2.5v11L16 15" />
        </svg>
      </span>
      <span className="font-display text-lg font-bold tracking-tight text-[color:var(--fg)]">
        GIF<span className="text-accent">Studio</span>
      </span>
    </Link>
  );
}
