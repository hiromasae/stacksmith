import Link from "next/link";
import { Fragment } from "react";
import { MessageSquare } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { InlineToolName } from "@/components/tool-chip";
import { SaveButton } from "@/components/save-button";
import { authorSlug } from "@/lib/authors";
import { formatCount, formatRelativeTime, initials } from "@/lib/format";
import type { Stack } from "@/lib/types";

export function FeedCard({ stack }: { stack: Stack }) {
  const { author } = stack;

  return (
    <article className="rounded-md border bg-card p-4 text-card-foreground transition-colors hover:border-foreground/20">
      {/* Creator: avatar + name · role · company · time on one line */}
      <div className="flex items-center gap-2">
        <Avatar size="sm">
          <AvatarFallback className="text-[0.625rem] font-medium">
            {initials(author.name)}
          </AvatarFallback>
        </Avatar>
        <p className="min-w-0 truncate text-xs text-muted-foreground">
          {/* relative z-10 keeps this byline link clickable above any sibling
              link stretched over the card (the after:absolute idiom). */}
          <Link
            href={`/u/${authorSlug(author.name)}`}
            className="relative z-10 text-sm font-medium text-foreground transition-colors hover:text-primary"
          >
            {author.name}
          </Link>{" "}
          · {author.role} at {author.company} ·{" "}
          <span suppressHydrationWarning>
            {formatRelativeTime(stack.createdAt)}
          </span>
        </p>
      </div>

      {/* Title */}
      <h2 className="mt-2 text-base leading-snug font-bold">
        <Link
          href={`/stack/${stack.slug}`}
          className="transition-colors hover:text-primary"
        >
          {stack.title}
        </Link>
      </h2>

      {/* Workflow: tool names set into an inset, shaded block so they read as
          their own zone instead of competing with the title and counts. */}
      <div className="mt-3 rounded-md border bg-foreground/12 px-3 py-2 dark:border-black/50 dark:bg-black/40">
        {/* text-foreground/65 (not text-muted-foreground) keeps AA contrast
            on this darker inset — muted-foreground is tuned for white/near-
            white surfaces. */}
        <p className="text-xs leading-relaxed text-foreground/65">
          {stack.tools.map((tool, i) => (
            <Fragment key={tool.name}>
              {i > 0 && (
                <span className="mx-1.5 select-none text-foreground/25">·</span>
              )}
              <InlineToolName tool={tool} />
            </Fragment>
          ))}
        </p>
      </div>

      {/* Counts: save + comments together, both blue */}
      <div className="mt-2 flex items-center gap-3">
        <SaveButton slug={stack.slug} initialCount={stack.bookmarkCount} />
        <Link
          href={`/stack/${stack.slug}`}
          className="inline-flex items-center gap-1 rounded-md px-1 py-0.5 text-sm font-medium text-primary transition-colors hover:bg-primary/5"
        >
          <MessageSquare className="size-4" />
          <span className="tabular-nums">{formatCount(stack.commentCount)}</span>
          <span>comments</span>
        </Link>
      </div>
    </article>
  );
}
