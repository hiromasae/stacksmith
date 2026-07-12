import type { SortKey, Stack } from "./types";

/**
 * In-memory seed data. Every read below goes through an async accessor so that
 * swapping this array for a real database (Postgres, phase 2) is a drop-in
 * change — the callers already `await`.
 */
const STACKS: Stack[] = [
  {
    slug: "ai-design-system-builder",
    title: "AI Design System Builder",
    description:
      "Go from prompt to a production-ready design system. Draft components in Figma AI, animate and ship in Framer, and turn sketches into UI with Uizard and v0.",
    author: {
      name: "Emily Chen",
      role: "Design Systems Lead",
      company: "Northwind",
    },
    createdAt: "2026-07-02T17:00:00Z",
    bookmarkCount: 9400,
    commentCount: 182,
    category: "design",
    roles: ["designers", "developers"],
    pricingTier: "high",
    tools: [
      { name: "Figma AI", domain: "figma.com", blurb: "Draft and iterate on UI components" },
      { name: "Framer AI", domain: "framer.com", blurb: "Animate and publish interactive prototypes" },
      { name: "Uizard", domain: "uizard.io", blurb: "Turn hand sketches into editable UI" },
      { name: "Galileo AI", domain: "usegalileo.ai", blurb: "Generate full-screen designs from prompts" },
      { name: "v0", domain: "v0.dev", blurb: "Convert designs into React components" },
    ],
  },
  {
    slug: "ai-powered-code-assistant",
    title: "AI-Powered Code Assistant",
    description:
      "A pair-programming stack that writes, completes, and reviews code with you. Copilot and Cursor drive the editor while Tabnine keeps completions private and fast.",
    author: { name: "David Park", role: "Staff Engineer", company: "Hexforge" },
    createdAt: "2026-07-02T11:00:00Z",
    bookmarkCount: 15700,
    commentCount: 240,
    category: "development",
    roles: ["developers"],
    pricingTier: "medium",
    tools: [
      { name: "GitHub Copilot", domain: "github.com", blurb: "Autocomplete code inline as you type" },
      { name: "Cursor", domain: "cursor.com", blurb: "AI-native editor for whole-file edits" },
      { name: "Tabnine", domain: "tabnine.com", blurb: "Private, on-device code completions" },
    ],
  },
  {
    slug: "ai-content-generation-stack",
    title: "AI Content Generation Stack",
    description:
      "Research, write, illustrate, and publish end to end. Draft with ChatGPT and Claude, generate visuals in Midjourney and Canva, polish with Grammarly, ship from Notion.",
    author: {
      name: "Sarah Mitchell",
      role: "Content Strategist",
      company: "Brightloom",
    },
    createdAt: "2026-07-03T09:00:00Z",
    bookmarkCount: 12300,
    commentCount: 310,
    category: "content-creation",
    roles: ["creators", "marketers"],
    pricingTier: "high",
    tools: [
      { name: "ChatGPT", domain: "openai.com", blurb: "Brainstorm and draft long-form copy" },
      { name: "Claude", domain: "anthropic.com", blurb: "Refine tone and reason over docs" },
      { name: "Midjourney", domain: "midjourney.com", blurb: "Generate original hero imagery" },
      { name: "Grammarly", domain: "grammarly.com", blurb: "Catch grammar and tighten prose" },
      { name: "Canva", domain: "canva.com", blurb: "Lay out graphics and social posts" },
      { name: "Notion", domain: "notion.so", blurb: "Organize drafts and publish the piece" },
    ],
  },
  {
    slug: "ai-marketing-intelligence",
    title: "AI Marketing Intelligence",
    description:
      "Plan campaigns, generate creative, and track what works. HubSpot and Semrush handle intelligence while Jasper, Copy.ai, Canva, and AdCreative produce the assets.",
    author: {
      name: "Marcus Thompson",
      role: "Growth Marketer",
      company: "Tidewater",
    },
    createdAt: "2026-06-30T14:00:00Z",
    bookmarkCount: 11200,
    commentCount: 156,
    category: "marketing",
    roles: ["marketers", "founders"],
    pricingTier: "high",
    tools: [
      { name: "HubSpot AI", domain: "hubspot.com", blurb: "Plan campaigns and score leads" },
      { name: "Jasper AI", domain: "jasper.ai", blurb: "Generate on-brand marketing copy" },
      { name: "Canva AI", domain: "canva.com", blurb: "Produce campaign creative fast" },
      { name: "AdCreative.ai", domain: "adcreative.ai", blurb: "Generate high-converting ad variants" },
      { name: "Copy.ai", domain: "copy.ai", blurb: "Draft headlines and CTAs at scale" },
      { name: "Semrush", domain: "semrush.com", blurb: "Research keywords and track SEO" },
    ],
  },
  {
    slug: "ai-video-production-suite",
    title: "AI Video Production Suite",
    description:
      "Script-to-screen without a camera. Generate footage in Runway, create avatars with Synthesia, edit by transcript in Descript, and repurpose long form with Pictory.",
    author: {
      name: "Sophia Rodriguez",
      role: "Video Producer",
      company: "Reelworks",
    },
    createdAt: "2026-07-02T23:00:00Z",
    bookmarkCount: 14600,
    commentCount: 204,
    category: "content-creation",
    roles: ["creators"],
    pricingTier: "high",
    tools: [
      { name: "Runway ML", domain: "runwayml.com", blurb: "Generate and edit AI video footage" },
      { name: "Synthesia", domain: "synthesia.io", blurb: "Create talking-avatar presenter videos" },
      { name: "Descript", domain: "descript.com", blurb: "Edit video by editing the transcript" },
      { name: "Pictory", domain: "pictory.ai", blurb: "Repurpose long form into short clips" },
    ],
  },
  {
    slug: "ai-data-science-pipeline",
    title: "AI Data Science Pipeline",
    description:
      "Explore, model, and automate. Jupyter is the workbench for analysis while DataRobot handles automated modeling and deployment for teams that ship predictions.",
    author: {
      name: "Dr. James Wilson",
      role: "Data Scientist",
      company: "Vantage Labs",
    },
    createdAt: "2026-06-28T10:00:00Z",
    bookmarkCount: 8900,
    commentCount: 88,
    category: "research",
    roles: ["researchers", "developers"],
    pricingTier: "high",
    tools: [
      { name: "Jupyter", domain: "jupyter.org", blurb: "Explore data and prototype models" },
      { name: "DataRobot", domain: "datarobot.com", blurb: "Automate model training and deployment" },
    ],
  },
  {
    slug: "ai-customer-support-system",
    title: "AI Customer Support System",
    description:
      "Deflect, resolve, and escalate automatically. Intercom and Zendesk anchor the help desk while Ada, Drift, and Tidio cover chat, sales, and self-serve resolution.",
    author: { name: "Rachel Kim", role: "Support Lead", company: "Cohort" },
    createdAt: "2026-07-01T08:00:00Z",
    bookmarkCount: 10500,
    commentCount: 132,
    category: "entrepreneurship",
    roles: ["founders", "marketers"],
    pricingTier: "high",
    tools: [
      { name: "Intercom AI", domain: "intercom.com", blurb: "Automate chat and route tickets" },
      { name: "Zendesk AI", domain: "zendesk.com", blurb: "Anchor the help desk and macros" },
      { name: "Ada", domain: "ada.cx", blurb: "Resolve common questions with a bot" },
      { name: "Drift", domain: "drift.com", blurb: "Qualify leads in live chat" },
      { name: "Tidio", domain: "tidio.com", blurb: "Self-serve support for small teams" },
    ],
  },
  {
    slug: "ai-audio-production-stack",
    title: "AI Audio Production Stack",
    description:
      "Voice, music, and cleanup in one pass. Murf and ElevenLabs handle narration, AIVA and Soundraw score the track, and Descript stitches it together.",
    author: { name: "Alex Martinez", role: "Audio Engineer", company: "Waveform" },
    createdAt: "2026-06-29T16:00:00Z",
    bookmarkCount: 7800,
    commentCount: 74,
    category: "content-creation",
    roles: ["creators"],
    pricingTier: "medium",
    tools: [
      { name: "Murf AI", domain: "murf.ai", blurb: "Generate natural voiceover narration" },
      { name: "ElevenLabs", domain: "elevenlabs.io", blurb: "Clone and synthesize realistic voices" },
      { name: "AIVA", domain: "aiva.ai", blurb: "Compose original background scores" },
      { name: "Descript", domain: "descript.com", blurb: "Stitch and clean up the final mix" },
      { name: "Soundraw", domain: "soundraw.io", blurb: "Generate royalty-free music tracks" },
    ],
  },
  {
    slug: "ai-sales-acceleration-platform",
    title: "AI Sales Acceleration Platform",
    description:
      "Prospect, personalize, and close faster. Apollo sources leads, Lavender and Outreach draft sequences, and Gong and Chorus turn calls into coaching — all synced to Salesforce.",
    author: {
      name: "Jennifer Lee",
      role: "Sales Ops Manager",
      company: "Pipeline",
    },
    createdAt: "2026-06-26T12:00:00Z",
    bookmarkCount: 13100,
    commentCount: 168,
    category: "marketing",
    roles: ["marketers", "founders"],
    pricingTier: "high",
    tools: [
      { name: "Gong", domain: "gong.io", blurb: "Analyze sales calls for coaching" },
      { name: "Apollo.io", domain: "apollo.io", blurb: "Source and enrich prospect lists" },
      { name: "Outreach", domain: "outreach.io", blurb: "Automate multi-step email sequences" },
      { name: "Salesforce", domain: "salesforce.com", blurb: "Sync pipeline and forecast deals" },
      { name: "Lavender", domain: "lavender.ai", blurb: "Coach reps on email drafts live" },
      { name: "Chorus", domain: "chorus.ai", blurb: "Capture and summarize call notes" },
    ],
  },
  {
    slug: "ai-devops-automation",
    title: "AI DevOps Automation",
    description:
      "Ship safely on autopilot. GitHub Actions and Harness drive CI/CD, Kubernetes orchestrates, and AWS runs it — with AI surfacing failures before your users do.",
    author: { name: "Kevin Zhang", role: "DevOps Engineer", company: "Cloudpeak" },
    createdAt: "2026-06-27T09:00:00Z",
    bookmarkCount: 6700,
    commentCount: 59,
    category: "development",
    roles: ["developers"],
    pricingTier: "medium",
    tools: [
      { name: "GitHub Actions", domain: "github.com", blurb: "Run CI/CD pipelines on every push" },
      { name: "Kubernetes", domain: "kubernetes.io", blurb: "Orchestrate and scale containers" },
      { name: "AWS", domain: "aws.amazon.com", blurb: "Host and run production infrastructure" },
      { name: "Harness", domain: "harness.io", blurb: "Automate safe, gated deployments" },
    ],
  },
  {
    slug: "ai-research-assistant-stack",
    title: "AI Research Assistant Stack",
    description:
      "Find, vet, and synthesize the literature. Consensus and Elicit surface papers, Scite checks how they're cited, ResearchRabbit maps the field, and Notion AI writes it up.",
    author: {
      name: "Dr. Amanda Foster",
      role: "Research Scientist",
      company: "Meridian University",
    },
    createdAt: "2026-06-25T11:00:00Z",
    bookmarkCount: 5300,
    commentCount: 47,
    category: "research",
    roles: ["researchers"],
    pricingTier: "low",
    tools: [
      { name: "Consensus", domain: "consensus.app", blurb: "Find evidence-backed answers from papers" },
      { name: "Elicit", domain: "elicit.com", blurb: "Surface and summarize relevant studies" },
      { name: "Notion AI", domain: "notion.so", blurb: "Write up and organize findings" },
      { name: "Scite", domain: "scite.ai", blurb: "Check how papers are cited" },
      { name: "ResearchRabbit", domain: "researchrabbit.ai", blurb: "Map connected literature visually" },
    ],
  },
  {
    slug: "ai-social-media-manager",
    title: "AI Social Media Manager",
    description:
      "Plan a month of posts in an afternoon. Lately and Predis generate on-brand content, then Buffer and Hootsuite schedule and measure it across every channel.",
    author: {
      name: "Taylor Brooks",
      role: "Social Media Manager",
      company: "Canopy",
    },
    createdAt: "2026-06-30T18:00:00Z",
    bookmarkCount: 9800,
    commentCount: 121,
    category: "marketing",
    roles: ["marketers", "creators"],
    pricingTier: "medium",
    tools: [
      { name: "Buffer", domain: "buffer.com", blurb: "Schedule posts across channels" },
      { name: "Hootsuite", domain: "hootsuite.com", blurb: "Manage and measure social output" },
      { name: "Lately", domain: "lately.ai", blurb: "Turn long form into social snippets" },
      { name: "Predis.ai", domain: "predis.ai", blurb: "Generate on-brand post creative" },
    ],
  },
  {
    slug: "ai-product-management-suite",
    title: "AI Product Management Suite",
    description:
      "From signal to shipped. Productboard and Aha! prioritize the roadmap, Linear runs execution, and Notion and Fibery keep specs and docs in sync with the team.",
    author: {
      name: "Morgan Phillips",
      role: "Product Manager",
      company: "Groundwork",
    },
    createdAt: "2026-06-19T13:00:00Z",
    bookmarkCount: 11900,
    commentCount: 143,
    category: "entrepreneurship",
    roles: ["founders", "developers"],
    pricingTier: "high",
    tools: [
      { name: "Productboard", domain: "productboard.com", blurb: "Prioritize features from user signal" },
      { name: "Aha!", domain: "aha.io", blurb: "Plan roadmap and strategy" },
      { name: "Linear", domain: "linear.app", blurb: "Run execution and track issues" },
      { name: "Notion AI", domain: "notion.so", blurb: "Draft specs and product docs" },
      { name: "Fibery", domain: "fibery.io", blurb: "Connect docs, data, and workflows" },
    ],
  },
  {
    slug: "ai-legal-document-assistant",
    title: "AI Legal Document Assistant",
    description:
      "Draft and review contracts in a fraction of the time. Harvey handles research and drafting while LawGeex and Kira automate review and clause extraction at scale.",
    author: {
      name: "Christopher Evans",
      role: "Legal Ops Counsel",
      company: "Brightbar",
    },
    createdAt: "2026-06-26T15:00:00Z",
    bookmarkCount: 4600,
    commentCount: 38,
    category: "entrepreneurship",
    roles: ["founders"],
    pricingTier: "high",
    tools: [
      { name: "Harvey AI", domain: "harvey.ai", blurb: "Research law and draft contracts" },
      { name: "LawGeex", domain: "lawgeex.com", blurb: "Automate contract review and redlines" },
      { name: "Kira Systems", domain: "kirasystems.com", blurb: "Extract clauses across documents" },
    ],
  },
  {
    slug: "ai-image-generation-studio",
    title: "AI Image Generation Studio",
    description:
      "A full pipeline for original visuals. Midjourney, DALL·E, Stable Diffusion, and Leonardo generate; Photoshop's AI refines and composites the final frame.",
    author: { name: "Nicole Anderson", role: "Art Director", company: "Studio Nine" },
    createdAt: "2026-06-28T20:00:00Z",
    bookmarkCount: 16200,
    commentCount: 265,
    category: "design",
    roles: ["designers", "creators"],
    pricingTier: "medium",
    tools: [
      { name: "Midjourney", domain: "midjourney.com", blurb: "Generate original concept imagery" },
      { name: "DALL-E 3", domain: "openai.com", blurb: "Create images from detailed prompts" },
      { name: "Photoshop AI", domain: "adobe.com", blurb: "Refine and composite final frames" },
      { name: "Stable Diffusion", domain: "stability.ai", blurb: "Run custom, controllable generation" },
      { name: "Leonardo AI", domain: "leonardo.ai", blurb: "Produce consistent asset variations" },
    ],
  },
];

/** A recency-weighted popularity score. Recent + saved ranks highest. */
function trendingScore(stack: Stack): number {
  const ageDays = (Date.now() - new Date(stack.createdAt).getTime()) / 86_400_000;
  return stack.bookmarkCount / (1 + Math.max(0, ageDays));
}

export function sortStacks(stacks: Stack[], sort: SortKey): Stack[] {
  const copy = [...stacks];
  switch (sort) {
    case "saved":
      return copy.sort((a, b) => b.bookmarkCount - a.bookmarkCount);
    case "newest":
      return copy.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    case "trending":
    default:
      return copy.sort((a, b) => trendingScore(b) - trendingScore(a));
  }
}

// --- Data-access layer (async so a DB can slot in unchanged) ---

export async function getStacks(): Promise<Stack[]> {
  return STACKS;
}

export async function getStackBySlug(slug: string): Promise<Stack | undefined> {
  return STACKS.find((s) => s.slug === slug);
}

export async function getAllStackSlugs(): Promise<string[]> {
  return STACKS.map((s) => s.slug);
}
