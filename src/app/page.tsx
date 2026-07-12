import { SiteHeader } from "@/components/site-header";
import { Feed } from "@/components/feed";
import { getStacks, sortStacks } from "@/lib/data";

export default async function HomePage() {
  const stacks = sortStacks(await getStacks(), "newest");

  return (
    <>
      <SiteHeader />
      <main className="mx-auto w-full max-w-3xl px-4 pt-1 pb-8">
        <Feed stacks={stacks} />
      </main>
    </>
  );
}
