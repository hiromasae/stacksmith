import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { SubmitForm } from "@/components/submit-form";

export const metadata: Metadata = {
  title: "Create Your Stack · stacksmith",
  description:
    "Share the tools you actually use — your workflow, step by step.",
};

export default function SubmitPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 pt-4 pb-8">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to all stacks
        </Link>

        <header className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">
            Create Your Stack
          </h1>
          <p className="text-muted-foreground">
            Share the tools you actually use — your workflow, step by step.
          </p>
        </header>

        <SubmitForm />
      </main>
    </>
  );
}
