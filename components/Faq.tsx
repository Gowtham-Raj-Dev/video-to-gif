"use client";

import { useState } from "react";
import { ChevronIcon } from "@/components/Icons";
import type { Faq as FaqType } from "@/lib/content";

export function FaqAccordion({ items }: { items: FaqType[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="mx-auto mt-14 max-w-3xl space-y-3">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={item.question}
            className={`overflow-hidden rounded-lg border bg-[color:var(--card)] transition-colors ${
              isOpen ? "border-accent" : "border-[color:var(--border)]"
            }`}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="text-sm font-semibold sm:text-base">
                {item.question}
              </span>
              <ChevronIcon
                className={`h-5 w-5 shrink-0 text-accent transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isOpen && (
              <p className="px-5 pb-5 text-sm leading-relaxed text-muted">
                {item.answer}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
