import { getStacks, sortStacks } from "./data";
import type { Author, Stack } from "./types";

/**
 * "Dr. James Wilson" -> "james-wilson". Honorifics are stripped the same way
 * `initials()` in lib/format.ts does, so avatar and URL agree on identity.
 */
export function authorSlug(name: string): string {
  return name
    .replace(/^(Dr|Mr|Ms|Mrs)\.?\s+/i, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Authors only exist inline on stacks (name/role/company), so these accessors
 * derive the author set from the stack list, deduped by name.
 */
export async function getAuthorBySlug(
  slug: string,
): Promise<Author | undefined> {
  const stacks = await getStacks();
  return stacks.find((s) => authorSlug(s.author.name) === slug)?.author;
}

/** All stacks published by the author, newest first. */
export async function getStacksByAuthor(slug: string): Promise<Stack[]> {
  const stacks = await getStacks();
  return sortStacks(
    stacks.filter((s) => authorSlug(s.author.name) === slug),
    "newest",
  );
}

export async function getAllAuthorSlugs(): Promise<string[]> {
  const stacks = await getStacks();
  return [...new Set(stacks.map((s) => authorSlug(s.author.name)))];
}
