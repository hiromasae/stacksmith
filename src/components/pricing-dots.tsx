import { cn } from "@/lib/utils";
import { PRICING_LABELS, type PricingTier } from "@/lib/types";

const FILLED: Record<PricingTier, number> = { low: 1, medium: 2, high: 3 };

export function PricingDots({ tier }: { tier: PricingTier }) {
  const filled = FILLED[tier];
  return (
    <span
      className="inline-flex items-center gap-1"
      title={PRICING_LABELS[tier]}
      aria-label={PRICING_LABELS[tier]}
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className={cn(
            "size-1.5 rounded-full",
            i < filled ? "bg-primary" : "bg-muted-foreground/25",
          )}
        />
      ))}
    </span>
  );
}
