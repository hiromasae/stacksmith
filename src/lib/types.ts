export type Category =
  | "design"
  | "development"
  | "content-creation"
  | "marketing"
  | "research"
  | "entrepreneurship";

export type Role =
  | "designers"
  | "developers"
  | "marketers"
  | "founders"
  | "researchers"
  | "creators";

export type PricingTier = "low" | "medium" | "high";

export interface Tool {
  name: string;
  /** Bare domain, e.g. "figma.com" — used for the favicon and outbound link. */
  domain: string;
  /** One-liner shown on hover — what this tool does in the workflow. */
  blurb: string;
}

export interface Author {
  name: string;
  /** Job title, e.g. "Design Systems Lead". */
  role: string;
  /** Where they work, e.g. "Northwind". */
  company: string;
}

export interface Stack {
  slug: string;
  title: string;
  description: string;
  author: Author;
  /** ISO 8601 timestamp of when the stack was published. */
  createdAt: string;
  bookmarkCount: number;
  commentCount: number;
  category: Category;
  /** Which audience tabs this stack shows up under. */
  roles: Role[];
  pricingTier: PricingTier;
  /** Ordered list of tools — the workflow, step by step. */
  tools: Tool[];
}

export type SortKey = "trending" | "saved" | "newest";

export const ROLE_LABELS: Record<Role, string> = {
  designers: "Designers",
  developers: "Developers",
  marketers: "Marketers",
  founders: "Founders",
  researchers: "Researchers",
  creators: "Creators",
};

export const ROLE_ORDER: Role[] = [
  "designers",
  "developers",
  "marketers",
  "founders",
  "researchers",
  "creators",
];

export const CATEGORY_LABELS: Record<Category, string> = {
  design: "Design",
  development: "Development",
  "content-creation": "Content Creation",
  marketing: "Marketing",
  research: "Research",
  entrepreneurship: "Entrepreneurship",
};

export const PRICING_LABELS: Record<PricingTier, string> = {
  low: "Budget-friendly",
  medium: "Mid-range",
  high: "Premium",
};

export const SORT_LABELS: Record<SortKey, string> = {
  trending: "Trending",
  saved: "Most Saved",
  newest: "Newest",
};
