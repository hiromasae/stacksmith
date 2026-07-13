import { faviconUrl } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { Tool } from "@/lib/types";

export function ToolChip({
  tool,
  className,
}: {
  tool: Tool;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border bg-background py-1 pr-2.5 pl-1.5 text-xs font-medium text-foreground",
        className,
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- favicon service, not a local asset */}
      <img
        src={faviconUrl(tool.domain)}
        alt=""
        width={16}
        height={16}
        className="size-4 shrink-0 rounded-sm"
        loading="lazy"
      />
      {tool.name}
    </span>
  );
}

/**
 * A bare tool name for the feed's inline workflow list, with the tool's
 * one-liner surfaced on hover or keyboard focus. Pure CSS — no JS needed.
 */
export function InlineToolName({
  tool,
  className,
}: {
  tool: Tool;
  className?: string;
}) {
  return (
    <span
      tabIndex={0}
      aria-label={`${tool.name}: ${tool.blurb}`}
      className={cn(
        "group/tool relative inline-flex cursor-default items-baseline gap-1 rounded-sm outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/40",
        className,
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- favicon service, not a local asset */}
      <img
        src={faviconUrl(tool.domain)}
        alt=""
        width={16}
        height={16}
        className="size-4 shrink-0 self-center rounded-sm"
        loading="lazy"
      />
      {tool.name}
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-1 w-max max-w-56 -translate-x-1/2 rounded-md border border-border bg-popover px-2 py-1 text-xs font-normal text-popover-foreground opacity-0 transition-opacity duration-100 group-hover/tool:opacity-100 group-focus-visible/tool:opacity-100"
      >
        {tool.blurb}
      </span>
    </span>
  );
}

export function ToolOverflowChip({
  count,
  className,
}: {
  count: number;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground",
        className,
      )}
    >
      +{count}
    </span>
  );
}
