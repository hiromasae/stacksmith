/** Google's favicon service — cheap, no-config icons keyed off a domain. */
export function faviconUrl(domain: string, size = 64): string {
  return `https://www.google.com/s2/favicons?sz=${size}&domain=${domain}`;
}

/** 9400 -> "9.4k", 950 -> "950". */
export function formatCount(n: number): string {
  if (n >= 1000) {
    return `${(n / 1000).toFixed(1).replace(/\.0$/, "")}k`;
  }
  return String(n);
}

/**
 * "18 hours ago". Computed against the current clock, so the rendered value can
 * differ between the server prerender and the client — callers should render it
 * inside an element with `suppressHydrationWarning`.
 */
export function formatRelativeTime(iso: string): string {
  const then = new Date(iso).getTime();
  const diffMs = Math.max(0, Date.now() - then);

  const units: [limit: number, ms: number, label: string][] = [
    [60, 1000, "second"],
    [60, 60_000, "minute"],
    [24, 3_600_000, "hour"],
    [7, 86_400_000, "day"],
    [4.35, 604_800_000, "week"],
    [12, 2_629_800_000, "month"],
    [Number.POSITIVE_INFINITY, 31_557_600_000, "year"],
  ];

  for (const [limit, ms, label] of units) {
    const value = Math.floor(diffMs / ms);
    if (value < limit) {
      const v = Math.max(1, value);
      return `${v} ${label}${v === 1 ? "" : "s"} ago`;
    }
  }
  return "just now";
}
