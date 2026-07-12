"use client";

import { useMemo, useState } from "react";
import { ChevronDown, Search, SlidersHorizontal } from "lucide-react";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { StackCard } from "@/components/stack-card";
import { sortStacks } from "@/lib/data";
import { cn } from "@/lib/utils";
import {
  ROLE_LABELS,
  ROLE_ORDER,
  SORT_LABELS,
  type Role,
  type SortKey,
  type Stack,
} from "@/lib/types";

type RoleFilter = Role | "all";

export function Gallery({ stacks }: { stacks: Stack[] }) {
  const [role, setRole] = useState<RoleFilter>("all");
  const [sort, setSort] = useState<SortKey>("trending");
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = stacks.filter((stack) => {
      if (role !== "all" && !stack.roles.includes(role)) return false;
      if (!q) return true;
      return (
        stack.title.toLowerCase().includes(q) ||
        stack.description.toLowerCase().includes(q) ||
        stack.tools.some((tool) => tool.name.toLowerCase().includes(q))
      );
    });
    return sortStacks(filtered, sort);
  }, [stacks, role, sort, query]);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <Tabs value={role} onValueChange={(value) => setRole(value as RoleFilter)}>
          <TabsList variant="line" className="flex-wrap">
            <TabsTrigger value="all">All Stacks</TabsTrigger>
            {ROLE_ORDER.map((r) => (
              <TabsTrigger key={r} value={r}>
                {ROLE_LABELS[r]}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search stacks or tools"
              aria-label="Search stacks or tools"
              className="w-full pl-8 sm:w-60"
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger
              className={cn(buttonVariants({ variant: "outline" }), "shrink-0")}
            >
              <SlidersHorizontal className="size-4" />
              {SORT_LABELS[sort]}
              <ChevronDown className="size-4 opacity-60" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuRadioGroup
                value={sort}
                onValueChange={(value) => setSort(value as SortKey)}
              >
                {(Object.keys(SORT_LABELS) as SortKey[]).map((key) => (
                  <DropdownMenuRadioItem key={key} value={key}>
                    {SORT_LABELS[key]}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <p className="text-sm text-muted-foreground">
        {results.length} {results.length === 1 ? "stack" : "stacks"}
      </p>

      {results.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((stack) => (
            <StackCard key={stack.slug} stack={stack} />
          ))}
        </div>
      ) : (
        <div className="rounded-lg border border-dashed py-16 text-center text-muted-foreground">
          No stacks match your filters yet.
        </div>
      )}
    </div>
  );
}
