"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";

/**
 * Full-screen branded loader shown on:
 *  - the initial page load / hard refresh (waits for `window.load`), and
 *  - every client-side route change (Home -> Tools, tool -> tool, etc.).
 *
 * On a real reload the root layout remounts, so the initial-load effect runs.
 * On in-app navigation the layout stays mounted, so we watch `pathname` and
 * flash the loader for a short, consistent duration each time it changes.
 */
export function PageLoader() {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  // Initial load / hard refresh.
  useEffect(() => {
    const MIN_VISIBLE = 700; // keep it on screen long enough to feel intentional
    const start = performance.now();

    const finish = () => {
      const elapsed = performance.now() - start;
      const remaining = Math.max(0, MIN_VISIBLE - elapsed);
      window.setTimeout(() => setLoading(false), remaining);
    };

    if (document.readyState === "complete") {
      finish();
    } else {
      window.addEventListener("load", finish, { once: true });
      // Safety net in case the load event was already missed.
      const fallback = window.setTimeout(finish, 2500);
      return () => {
        window.removeEventListener("load", finish);
        window.clearTimeout(fallback);
      };
    }
  }, []);

  // Client-side route changes.
  useEffect(() => {
    // Skip the first run — the initial-load effect above already covers it.
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    setLoading(true);
    const timer = window.setTimeout(() => setLoading(false), 650);
    return () => window.clearTimeout(timer);
  }, [pathname]);

  // Lock scroll while the loader is visible.
  useEffect(() => {
    document.body.style.overflow = loading ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [loading]);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="page-loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: "easeInOut" }}
          className="fixed inset-0 z-[200] grid place-items-center bg-[color:var(--bg)]"
          aria-hidden="true"
        >
          <div className="flex flex-col items-center gap-6">
            {/* Logo mark with pulsing ring */}
            <div className="relative grid h-16 w-16 place-items-center">
              <motion.span
                className="absolute inset-0 rounded-2xl border-2 border-accent/25"
                animate={{ scale: [1, 1.25, 1], opacity: [0.6, 0, 0.6] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.span
                className="grid h-14 w-14 place-items-center rounded-2xl bg-accent text-[color:var(--accent-fg)]"
                animate={{ scale: [1, 0.94, 1] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-7 w-7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="6" width="13" height="12" rx="2.5" />
                  <path d="m16 9 5-2.5v11L16 15" />
                </svg>
              </motion.span>
            </div>

            {/* Wordmark */}
            <span className="font-display text-lg font-bold tracking-tight text-[color:var(--fg)]">
              GIF<span className="text-accent">Studio</span>
            </span>

            {/* Progress track */}
            <div className="h-1 w-40 overflow-hidden rounded-full bg-[color:var(--border)]">
              <motion.div
                className="h-full w-1/3 rounded-full bg-accent"
                animate={{ x: ["-140%", "440%"] }}
                transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
