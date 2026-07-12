import Link from "next/link";
import { Fragment } from "react";
import { MessageSquare } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { InlineToolName } from "@/components/tool-chip";
import { SaveButton } from "@/components/save-button";
import { formatCount, formatRelativeTime } from "@/lib/format";
import type { Stack } from "@/lib/types";

/** "Emily Chen" -> "EC", "Dr. James Wilson" -> "JW". */
function initials(name: string): string {
  return name
    .replace(/^(Dr|Mr|Ms|Mrs)\.?\s+/i, "")
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function FeedCard({ stack }: { stack: Stack }) {
  const { author } = stack;

  return (
    <article className="rounded-md border bg-card px-4 py-3.5 text-card-foreground transition-colors hover:border-foreground/20">
      {/* Creator: avatar + name · role · company · time on one line */}
      <div className="flex items-center gap-2">
        <Avatar size="sm">
          <AvatarFallback className="text-[0.625rem] font-medium">
            {initials(author.name)}
          </AvatarFallback>
        </Avatar>
        <p className="min-w-0 truncate text-xs text-muted-foreground">
          <span className="text-sm font-medium text-foreground">
            {author.name}
          </span>{" "}
          · {author.role} at {author.company} ·{" "}
          <span suppressHydrationWarning>
            {formatRelativeTime(stack.createdAt)}
          </span>
        </p>
      </div>

      {/* Title */}
      <h2 className="mt-2 text-[0.9375rem] leading-snug font-semibold">
        <Link
          href={`/stack/${stack.slug}`}
          className="transition-colors hover:text-primary"
        >
          {stack.title}
        </Link>
      </h2>

      {/* Workflow: inline tool names in order, one-liner on hover */}
      <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
        {stack.tools.map((tool, i) => (
          <Fragment key={tool.name}>
            {i > 0 && <span className="mx-1 select-none">·</span>}
            <InlineToolName tool={tool} />
          </Fragment>
        ))}
      </p>

      {/* Counts: save + comments together, both blue */}
      <div className="mt-2 flex items-center gap-3">
        <SaveButton initialCount={stack.bookmarkCount} />
        <Link
          href={`/stack/${stack.slug}`}
          className="inline-flex items-center gap-1 rounded-md px-1 py-0.5 text-sm font-medium text-primary transition-colors hover:bg-primary/5"
        >
          <MessageSquare className="size-4" />
          <span className="tabular-nums">{formatCount(stack.commentCount)}</span>
        </Link>
      </div>
    </article>
  );
}
