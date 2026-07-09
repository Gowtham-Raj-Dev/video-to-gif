import type { ReactNode } from "react";

/** Static passthrough — no cursor-follow effect (corporate look). */
export function Magnetic({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  return <div className={className}>{children}</div>;
}
