"use client";

import { useSyncExternalStore } from "react";
import { Bookmark } from "lucide-react";

import { formatCount } from "@/lib/format";
import { isSaved, subscribe, toggleSaved } from "@/lib/saved";
import { cn } from "@/lib/utils";

/**
 * Save toggle with an optimistic local count. The icon button is the action;
 * the count beside it is plain text. Saved state persists to localStorage via
 * lib/saved.ts and syncs across every SaveButton for the same stack (and
 * across tabs). The server snapshot is always "unsaved", so SSR HTML is
 * deterministic and the real value lands on hydration without a mismatch.
 */
export function SaveButton({
  slug,
  initialCount,
}: {
  /** Stack this button saves — the persistence key. */
  slug: string;
  initialCount: number;
}) {
  const saved = useSyncExternalStore(
    subscribe,
    () => isSaved(slug),
    () => false,
  );
  const count = initialCount + (saved ? 1 : 0);

  return (
    <span className="inline-flex items-center gap-1.5">
      <button
        type="button"
        aria-pressed={saved}
        aria-label={saved ? "Remove from saved" : "Save this stack"}
        onClick={() => toggleSaved(slug)}
        className={cn(
          "inline-flex size-8 items-center justify-center rounded-md text-primary transition-colors outline-none select-none hover:bg-primary/10 focus-visible:ring-2 focus-visible:ring-ring/50",
          saved && "bg-primary/10",
        )}
      >
        <Bookmark className={cn("size-5.5", saved && "fill-current")} />
      </button>
      <span className="text-sm text-muted-foreground">
        <span className="font-medium tabular-nums">{formatCount(count)}</span>{" "}
        saves
      </span>
    </span>
  );
}
