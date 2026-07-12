import Link from "next/link";
import { Bookmark } from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ToolChip, ToolOverflowChip } from "@/components/tool-chip";
import { PricingDots } from "@/components/pricing-dots";
import { formatCount, formatRelativeTime } from "@/lib/format";
import { CATEGORY_LABELS, type Stack } from "@/lib/types";

const MAX_VISIBLE_TOOLS = 5;

export function StackCard({ stack }: { stack: Stack }) {
  const visible = stack.tools.slice(0, MAX_VISIBLE_TOOLS);
  const overflow = stack.tools.length - visible.length;

  return (
    <Card className="group relative flex h-full flex-col transition-colors hover:ring-foreground/25">
      <CardHeader>
        <div className="flex items-center justify-between gap-2">
          <Badge variant="secondary">{CATEGORY_LABELS[stack.category]}</Badge>
          <PricingDots tier={stack.pricingTier} />
        </div>
        <CardTitle className="text-lg leading-snug">
          <Link
            href={`/stack/${stack.slug}`}
            className="after:absolute after:inset-0 group-hover:text-primary"
          >
            {stack.title}
          </Link>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          by {stack.author.name} ·{" "}
          <span suppressHydrationWarning>
            {formatRelativeTime(stack.createdAt)}
          </span>
        </p>
      </CardHeader>

      <CardContent className="mt-auto">
        <div className="flex flex-wrap gap-1.5">
          {visible.map((tool) => (
            <ToolChip key={tool.name} tool={tool} />
          ))}
          {overflow > 0 && <ToolOverflowChip count={overflow} />}
        </div>
      </CardContent>

      <CardFooter className="text-sm text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <Bookmark className="size-4" />
          {formatCount(stack.bookmarkCount)} saved
        </span>
      </CardFooter>
    </Card>
  );
}
