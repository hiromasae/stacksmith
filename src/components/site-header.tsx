import Link from "next/link";
import { Layers, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-3xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Layers className="size-5 text-primary" />
          <span>stacksmith</span>
        </Link>
        <Button size="sm">
          <Plus className="size-4" />
          Create Your Stack
        </Button>
      </div>
    </header>
  );
}
