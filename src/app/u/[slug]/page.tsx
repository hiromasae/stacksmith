import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { FeedCard } from "@/components/feed-card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { getAllAuthorSlugs, getAuthorBySlug, getStacksByAuthor } from "@/lib/authors";
import { initials } from "@/lib/format";

export async function generateStaticParams() {
  const slugs = await getAllAuthorSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const author = await getAuthorBySlug(slug);
  if (!author) return {};
  return {
    title: `${author.name} · stacksmith`,
    description: `${author.role} at ${author.company} — stacks published on stacksmith.`,
  };
}

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const author = await getAuthorBySlug(slug);
  if (!author) notFound();

  const stacks = await getStacksByAuthor(slug);

  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 pt-4 pb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to all stacks
        </Link>

        <header className="flex items-center gap-4">
          <Avatar size="lg">
            <AvatarFallback className="font-medium">
              {initials(author.name)}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <h1 className="truncate text-2xl font-bold tracking-tight">
              {author.name}
            </h1>
            <p className="truncate text-sm text-muted-foreground">
              {author.role} at {author.company} ·{" "}
              {stacks.length} published {stacks.length === 1 ? "stack" : "stacks"}
            </p>
          </div>
        </header>

        <Separator />

        <section className="flex flex-col gap-3">
          {stacks.map((stack) => (
            <FeedCard key={stack.slug} stack={stack} />
          ))}
        </section>
      </main>
    </>
  );
}
