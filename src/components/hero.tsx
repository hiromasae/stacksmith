import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="rounded-md border bg-card px-6 py-16 text-center sm:py-20">
      <div className="mx-auto flex max-w-2xl flex-col items-center gap-4">
        <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
          Learn AI Workflows That Work
        </h1>
        <p className="max-w-xl text-base text-muted-foreground sm:text-lg">
          See how professionals combine AI tools into real workflows. Browse
          proven stacks and adopt what works.
        </p>
        <Button size="lg" className="mt-4">
          <Plus className="size-4" />
          Create Your Stack
        </Button>
      </div>
    </section>
  );
}
