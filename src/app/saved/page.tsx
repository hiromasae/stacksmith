import type { Metadata } from "next";

import { SiteHeader } from "@/components/site-header";
import { SavedFeed } from "@/components/saved-feed";
import { getStacks } from "@/lib/data";

export const metadata: Metadata = {
  title: "Saved stacks — stacksmith",
  description: "Stacks you have saved for later.",
};

export default async function SavedPage() {
  const stacks = await getStacks();

  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-3xl px-4 pt-4 pb-8">
        <h1 className="border-b pb-2 text-sm font-semibold">Saved</h1>
        <SavedFeed stacks={stacks} />
      </main>
    </>
  );
}
