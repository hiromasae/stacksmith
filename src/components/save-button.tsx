"use client";

import { useState } from "react";
import { Bookmark } from "lucide-react";

import { formatCount } from "@/lib/format";
import { cn } from "@/lib/utils";

/**
 * Save toggle with an optimistic local count. Functional blue, count-forward —
 * sits inline with the comment count. Persistence lands in phase 2 (auth + DB).
 */
export function SaveButton({ initialCount }: { initialCount: number }) {
  const [saved, setSaved] = useState(false);
  const count = initialCount + (saved ? 1 : 0);

  return (
    <button
      type="button"
      aria-pressed={saved}
      onClick={() => setSaved((s) => !s)}
      className={cn(
        "inline-flex items-center gap-1 rounded-md px-1 py-0.5 text-sm font-semibold text-primary transition-colors outline-none select-none hover:bg-primary/5 focus-visible:ring-2 focus-visible:ring-ring/50",
        saved && "bg-primary/5",
      )}
    >
      <Bookmark className={cn("size-4", saved && "fill-current")} />
      <span className="tabular-nums">{formatCount(count)}</span>
      <span className="sr-only">{saved ? "Saved" : "Save this stack"}</span>
    </button>
  );
}
