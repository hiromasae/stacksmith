"use client";

import { useState } from "react";

import { FeedCard } from "@/components/feed-card";
import { cn } from "@/lib/utils";
import type { Category, Stack } from "@/lib/types";

type Filter = "all" | Category;

const FILTERS: { key: Filter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "design", label: "Design" },
  { key: "development", label: "Development" },
  { key: "content-creation", label: "Content" },
  { key: "marketing", label: "Marketing" },
  { key: "research", label: "Research" },
  { key: "entrepreneurship", label: "Entrepreneurship" },
];

export function Feed({ stacks }: { stacks: Stack[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const visible =
    filter === "all" ? stacks : stacks.filter((s) => s.category === filter);

  return (
    <>
      {/* Horizontal filter tabs, scrollable on narrow screens */}
      <div
        role="tablist"
        aria-label="Filter stacks by category"
        className="-mx-4 flex overflow-x-auto border-b px-4 [scrollbar-width:none]"
      >
        {FILTERS.map((f) => (
          <button
            key={f.key}
            type="button"
            role="tab"
            aria-selected={filter === f.key}
            onClick={() => setFilter(f.key)}
            className={cn(
              "-mb-px shrink-0 border-b-2 border-transparent px-2.5 py-2 text-sm font-medium whitespace-nowrap text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50",
              filter === f.key && "border-primary text-primary",
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="mt-4 flex flex-col gap-2.5">
        {visible.map((stack) => (
          <FeedCard key={stack.slug} stack={stack} />
        ))}
      </div>
    </>
  );
}
