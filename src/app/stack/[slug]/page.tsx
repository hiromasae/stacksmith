import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Bookmark, ExternalLink } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { PricingDots } from "@/components/pricing-dots";
import { getAllStackSlugs, getStackBySlug } from "@/lib/data";
import { faviconUrl, formatCount, formatRelativeTime } from "@/lib/format";
import {
  CATEGORY_LABELS,
  PRICING_LABELS,
  ROLE_LABELS,
} from "@/lib/types";

export async function generateStaticParams() {
  const slugs = await getAllStackSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const stack = await getStackBySlug(slug);
  if (!stack) return {};
  return {
    title: `${stack.title} · stacksmith`,
    description: stack.description,
  };
}

export default async function StackPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const stack = await getStackBySlug(slug);
  if (!stack) notFound();

  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-4xl flex-col gap-8 px-6 py-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to all stacks
        </Link>

        <header className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">{CATEGORY_LABELS[stack.category]}</Badge>
            <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
              <PricingDots tier={stack.pricingTier} />
              {PRICING_LABELS[stack.pricingTier]}
            </span>
          </div>

          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {stack.title}
          </h1>
          <p className="text-lg text-muted-foreground">{stack.description}</p>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
            <span>by {stack.author.name}</span>
            <span aria-hidden>·</span>
            <span suppressHydrationWarning>
              {formatRelativeTime(stack.createdAt)}
            </span>
            <span aria-hidden>·</span>
            <span className="inline-flex items-center gap-1.5">
              <Bookmark className="size-4" />
              {formatCount(stack.bookmarkCount)} saved
            </span>
          </div>

          <div className="flex flex-wrap gap-2">
            {stack.roles.map((role) => (
              <Badge key={role} variant="outline">
                {ROLE_LABELS[role]}
              </Badge>
            ))}
          </div>

          <div className="flex gap-2">
            <Button>
              <Bookmark className="size-4" />
              Save this stack
            </Button>
          </div>
        </header>

        <Separator />

        <section className="flex flex-col gap-4">
          <div>
            <h2 className="text-xl font-semibold">The Workflow</h2>
            <p className="text-sm text-muted-foreground">
              {stack.tools.length} tools, used in this order.
            </p>
          </div>

          <ol className="flex flex-col gap-3">
            {stack.tools.map((tool, index) => (
              <li
                key={tool.name}
                className="flex items-center gap-4 rounded-lg border p-4"
              >
                <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-medium text-muted-foreground">
                  {index + 1}
                </span>
                {/* eslint-disable-next-line @next/next/no-img-element -- favicon service, not a local asset */}
                <img
                  src={faviconUrl(tool.domain)}
                  alt=""
                  width={24}
                  height={24}
                  className="size-6 shrink-0 rounded"
                />
                <span className="flex-1 font-medium">{tool.name}</span>
                <a
                  href={`https://${tool.domain}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {tool.domain}
                  <ExternalLink className="size-3.5" />
                </a>
              </li>
            ))}
          </ol>
        </section>
      </main>
    </>
  );
}
