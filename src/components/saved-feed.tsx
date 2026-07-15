"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";

import { FeedCard } from "@/components/feed-card";
import { getSavedSlugs, getServerSavedSlugs, subscribe } from "@/lib/saved";
import type { Stack } from "@/lib/types";

/**
 * Client-side filter over the full stack list: saved slugs live in
 * localStorage, so the server renders the empty state and the real list
 * lands on hydration (useSyncExternalStore with an empty server snapshot).
 * Most recently saved appears first.
 */
export function SavedFeed({ stacks }: { stacks: Stack[] }) {
  const savedSlugs = useSyncExternalStore(
    subscribe,
    getSavedSlugs,
    getServerSavedSlugs,
  );

  const bySlug = new Map(stacks.map((s) => [s.slug, s]));
  const saved = [...savedSlugs]
    .reverse()
    .map((slug) => bySlug.get(slug))
    .filter((s): s is Stack => s !== undefined);

  if (saved.length === 0) {
    return (
      <div className="mt-5 rounded-md border bg-card px-4 py-10 text-center text-card-foreground">
        <p className="text-sm font-medium">Nothing saved yet</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Save a stack and it will show up here.{" "}
          <Link
            href="/"
            className="font-medium text-primary hover:underline"
          >
            Explore stacks
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="mt-5 flex flex-col gap-3">
      {saved.map((stack) => (
        <FeedCard key={stack.slug} stack={stack} />
      ))}
    </div>
  );
}
