"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { CircleCheck, Plus, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { PricingDots } from "@/components/pricing-dots";
import { cn } from "@/lib/utils";
import {
  CATEGORY_LABELS,
  PRICING_LABELS,
  ROLE_LABELS,
  ROLE_ORDER,
  type Category,
  type PricingTier,
  type Role,
  type Tool,
} from "@/lib/types";

const CATEGORIES = Object.keys(CATEGORY_LABELS) as Category[];
const PRICING_TIERS: PricingTier[] = ["low", "medium", "high"];

const STORAGE_KEY = "stacksmith:submissions";

/**
 * A user-submitted stack, as persisted to localStorage. Shaped like `Stack`
 * minus the server-owned fields (slug, author, counts) — those arrive in
 * phase 2 (auth + DB).
 */
interface StackSubmission {
  id: string;
  submittedAt: string;
  title: string;
  description: string;
  category: Category;
  roles: Role[];
  pricingTier: PricingTier;
  tools: Tool[];
}

/** Append a submission to the local queue, tolerating a corrupted store. */
function appendSubmission(submission: StackSubmission) {
  let existing: StackSubmission[] = [];
  try {
    const parsed: unknown = JSON.parse(
      window.localStorage.getItem(STORAGE_KEY) ?? "[]",
    );
    if (Array.isArray(parsed)) existing = parsed as StackSubmission[];
  } catch {
    // Corrupted JSON — start a fresh array rather than throwing away the form.
  }
  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify([...existing, submission]),
  );
}

/** One editable tool row. The id is a stable React key, never persisted. */
interface ToolDraft extends Tool {
  id: number;
}

interface FormErrors {
  title?: string;
  category?: string;
  tools?: string;
  storage?: string;
}

const EMPTY_TOOL: Omit<ToolDraft, "id"> = { name: "", domain: "", blurb: "" };

/**
 * "Create Your Stack" form. Local-first for now: submissions are queued in
 * localStorage under "stacksmith:submissions". Persistence lands in phase 2
 * (auth + DB).
 */
export function SubmitForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<Category | null>(null);
  const [roles, setRoles] = useState<Role[]>([]);
  const [pricingTier, setPricingTier] = useState<PricingTier>("low");
  const [tools, setTools] = useState<ToolDraft[]>([{ id: 0, ...EMPTY_TOOL }]);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const nextToolId = useRef(1);

  function addTool() {
    setTools((prev) => [...prev, { id: nextToolId.current++, ...EMPTY_TOOL }]);
  }

  function removeTool(id: number) {
    setTools((prev) => prev.filter((tool) => tool.id !== id));
  }

  function updateTool(id: number, patch: Partial<Tool>) {
    setTools((prev) =>
      prev.map((tool) => (tool.id === id ? { ...tool, ...patch } : tool)),
    );
    setErrors((prev) => ({ ...prev, tools: undefined }));
  }

  function toggleRole(role: Role) {
    setRoles((prev) =>
      prev.includes(role) ? prev.filter((r) => r !== role) : [...prev, role],
    );
  }

  function resetForm() {
    setTitle("");
    setDescription("");
    setCategory(null);
    setRoles([]);
    setPricingTier("low");
    setTools([{ id: nextToolId.current++, ...EMPTY_TOOL }]);
    setErrors({});
    setSubmitted(false);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Rows the user actually filled in — name is the minimum for a tool.
    const filledTools = tools
      .map(({ name, domain, blurb }) => ({
        name: name.trim(),
        domain: domain.trim(),
        blurb: blurb.trim(),
      }))
      .filter((tool) => tool.name !== "");

    const nextErrors: FormErrors = {};
    if (title.trim() === "") nextErrors.title = "Give your stack a title.";
    if (category === null) nextErrors.category = "Pick a category.";
    if (filledTools.length === 0)
      nextErrors.tools = "Add at least one tool — a name is enough to start.";

    if (nextErrors.title || nextErrors.category || nextErrors.tools) {
      setErrors(nextErrors);
      return;
    }

    try {
      appendSubmission({
        id: crypto.randomUUID(),
        submittedAt: new Date().toISOString(),
        title: title.trim(),
        description: description.trim(),
        category: category as Category,
        roles,
        pricingTier,
        tools: filledTools,
      });
    } catch {
      setErrors({
        storage:
          "Couldn't save to this browser's storage. Check that localStorage is available and try again.",
      });
      return;
    }

    setErrors({});
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex flex-col gap-4 rounded-lg border bg-card p-6 text-card-foreground">
        <div className="flex items-center gap-2.5">
          <CircleCheck className="size-5 shrink-0" />
          <h2 className="text-lg font-semibold">Stack saved — locally</h2>
        </div>
        <p className="text-sm text-muted-foreground">
          Your stack is stored in this browser (under{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">
            stacksmith:submissions
          </code>
          ), so it won&apos;t show up in the feed or on other devices yet.
          Publishing for real lands in phase 2 (auth + DB) — your draft will be
          waiting here when it does.
        </p>
        <div className="flex flex-wrap gap-2">
          <Button onClick={resetForm}>
            <Plus className="size-4" />
            Create another stack
          </Button>
          <Button variant="outline" render={<Link href="/" />}>
            Back to the feed
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-8">
      {/* Basics */}
      <section className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="stack-title">Title</Label>
          <Input
            id="stack-title"
            name="title"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setErrors((prev) => ({ ...prev, title: undefined }));
            }}
            placeholder="My end-to-end product design workflow"
            aria-invalid={errors.title ? true : undefined}
            aria-describedby={errors.title ? "stack-title-error" : undefined}
          />
          {errors.title && (
            <p id="stack-title-error" className="text-sm text-destructive">
              {errors.title}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="stack-description">
            Description
            <span className="font-normal text-muted-foreground">optional</span>
          </Label>
          <Textarea
            id="stack-description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What does this stack get done, and for whom?"
            rows={3}
          />
        </div>
      </section>

      <Separator />

      {/* Classification */}
      <section className="flex flex-col gap-5">
        <fieldset className="flex flex-col gap-1.5">
          <Label render={<legend />}>Category</Label>
          <div
            className="grid grid-cols-2 gap-2 sm:grid-cols-3"
            role="radiogroup"
            aria-label="Category"
          >
            {CATEGORIES.map((value) => (
              <button
                key={value}
                type="button"
                role="radio"
                aria-checked={category === value}
                onClick={() => {
                  setCategory(value);
                  setErrors((prev) => ({ ...prev, category: undefined }));
                }}
                className={cn(
                  "h-8 rounded-lg border px-2.5 text-sm font-medium transition-colors outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
                  category === value
                    ? "border-primary bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {CATEGORY_LABELS[value]}
              </button>
            ))}
          </div>
          {errors.category && (
            <p className="text-sm text-destructive">{errors.category}</p>
          )}
        </fieldset>

        <fieldset className="flex flex-col gap-1.5">
          <Label render={<legend />}>
            Who is it for?
            <span className="font-normal text-muted-foreground">optional</span>
          </Label>
          <div className="flex flex-wrap gap-1.5">
            {ROLE_ORDER.map((role) => (
              <button
                key={role}
                type="button"
                aria-pressed={roles.includes(role)}
                onClick={() => toggleRole(role)}
                className={cn(
                  "h-7 rounded-4xl border px-2.5 text-xs font-medium transition-colors outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
                  roles.includes(role)
                    ? "border-primary bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                {ROLE_LABELS[role]}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="flex flex-col gap-1.5">
          <Label render={<legend />}>Pricing</Label>
          <div
            className="grid grid-cols-3 gap-2"
            role="radiogroup"
            aria-label="Pricing"
          >
            {PRICING_TIERS.map((tier) => (
              <button
                key={tier}
                type="button"
                role="radio"
                aria-checked={pricingTier === tier}
                onClick={() => setPricingTier(tier)}
                className={cn(
                  "inline-flex h-8 items-center justify-center gap-2 rounded-lg border px-2.5 text-sm font-medium transition-colors outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
                  pricingTier === tier
                    ? "border-primary bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
              >
                <PricingDots tier={tier} />
                {PRICING_LABELS[tier]}
              </button>
            ))}
          </div>
        </fieldset>
      </section>

      <Separator />

      {/* Tools */}
      <section className="flex flex-col gap-4">
        <div>
          <h2 className="text-base font-semibold">The Workflow</h2>
          <p className="text-sm text-muted-foreground">
            List your tools in the order you use them.
          </p>
        </div>

        <ol className="flex flex-col gap-3">
          {tools.map((tool, index) => (
            <li key={tool.id} className="flex gap-3 rounded-lg border p-3">
              <span className="mt-0.5 flex size-7 shrink-0 items-center justify-center rounded-full bg-muted text-sm font-medium text-muted-foreground">
                {index + 1}
              </span>
              <div className="grid flex-1 gap-2 sm:grid-cols-2">
                <Input
                  value={tool.name}
                  onChange={(e) => updateTool(tool.id, { name: e.target.value })}
                  placeholder="Tool name"
                  aria-label={`Tool ${index + 1} name`}
                  aria-invalid={
                    errors.tools && tool.name.trim() === "" ? true : undefined
                  }
                />
                <Input
                  value={tool.domain}
                  onChange={(e) =>
                    updateTool(tool.id, { domain: e.target.value })
                  }
                  placeholder="Domain, e.g. figma.com"
                  aria-label={`Tool ${index + 1} domain`}
                />
                <Input
                  className="sm:col-span-2"
                  value={tool.blurb}
                  onChange={(e) =>
                    updateTool(tool.id, { blurb: e.target.value })
                  }
                  placeholder="What it does in this workflow, in one line"
                  aria-label={`Tool ${index + 1} blurb`}
                />
              </div>
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => removeTool(tool.id)}
                disabled={tools.length === 1}
                aria-label={`Remove tool ${index + 1}`}
              >
                <X className="size-4" />
              </Button>
            </li>
          ))}
        </ol>

        {errors.tools && (
          <p className="text-sm text-destructive">{errors.tools}</p>
        )}

        <div>
          <Button variant="outline" size="sm" onClick={addTool}>
            <Plus className="size-3.5" />
            Add a tool
          </Button>
        </div>
      </section>

      <Separator />

      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-3">
          <Button type="submit">Save stack</Button>
          <p className="text-sm text-muted-foreground">
            Saved to this browser for now — publishing lands in phase 2 (auth +
            DB).
          </p>
        </div>
        {errors.storage && (
          <p className="text-sm text-destructive">{errors.storage}</p>
        )}
      </div>
    </form>
  );
}
