import type { WorkType } from "./projects";

// ---------- TYPES ----------

// A numbered "comment pin" placed on a screenshot. x/y are percentages (0-100)
// from the top-left of the image.
export type Pin = {
  x: number;
  y: number;
  title: string;
  note: string;
};

export type CaseStudyImage = {
  src: string;
  alt: string;
  caption?: string; // explain the DECISION, not just what's on screen
  pins?: Pin[];
};

export type CompareImage = {
  src: string;
  alt: string;
};

// Draggable before/after slider. Export both at the SAME size.
export type CompareImages = {
  before: CompareImage;
  after: CompareImage;
  caption?: string;
};

// Shown in the Dev Mode inspector. Only document real values.
export type DesignTokens = {
  colors?: { name: string; hex: string }[];
  type?: { role: string; font: string; spec: string }[];
  spacing?: string[];
};

// A finding from research and the design decision it caused
export type Insight = {
  finding: string;
  decision: string;
};

export type CaseStudySection = {
  id: string;
  label: string; // e.g. "03 / Research"
  title: string; // make this a statement, not a topic
  description?: string;
  items?: string[];
  insights?: Insight[];
  insightLabels?: { from: string; to: string }; // defaults to Finding / Decision
  images?: CaseStudyImage[];
  compare?: CompareImages;
  callout?: string;
};

export type Metric = {
  value: string; // "12 users", "-30%", "4 flows"
  label: string;
};

export type CaseStudy = {
  slug: string;
  published: boolean; // false = hidden from routes, search and next-links
  type: WorkType; // same union as projects.ts: client | professional | personal
  isPrivate?: boolean; // NDA work: show process, hide screens

  // Hero
  title: string;
  tagline: string;
  headline: string; // outcome-led one-liner
  image: string;

  // Meta
  year: string;
  duration: string;
  role: string;
  team?: string;
  platform: string;
  tools: string[];

  tldr: {
    problem: string;
    solution: string;
    result: string;
  };

  context: string;
  problem: string;
  goals: string[];
  responsibilities: string[];
  sections: CaseStudySection[];

  metrics?: Metric[];
  outcome: string;
  reflection: string[];

  tokens?: DesignTokens;
  figmaEmbed?: string;
  nextSlug?: string; // optional override for the "next project" link
};

// ---------- DATA ----------

export const caseStudies: CaseStudy[] = [
  // =====================================================
  // 1. STUDYCRUX: internship (process-only, NDA safe — logo only, no screens)
  // =====================================================
  {
    slug: "studycrux-cms",
    published: false, // flip to true once the TODOs are filled in
    type: "professional",
    isPrivate: true,

    title: "Studycrux CMS",
    tagline: "Clearer workflows for a complex SaaS content platform.",
    headline: "TODO: outcome-led line, e.g. 'Reworked the CMS so editors publish in fewer steps.'",
    image: "/projects/studycrux-cms.png",

    year: "2026 — Present",
    duration: "Ongoing",
    role: "UI/UX Design Intern",
    team: "TODO: e.g. 'Embedded with 3 developers and a product lead'",
    platform: "Web",
    tools: ["Figma"],

    tldr: {
      problem: "TODO: the core workflow problem editors/admins faced.",
      solution: "TODO: what you redesigned (flows, dashboards, components).",
      result: "TODO: qualitative or quantitative result you can share.",
    },

    context:
      "TODO: What Studycrux is, who uses the CMS, and what the business needed. Keep it high level.",
    problem:
      "TODO: 2 to 3 sentences on what was slow, confusing or inconsistent before you joined.",
    goals: [
      "TODO: goal 1 (e.g. reduce steps to publish content)",
      "TODO: goal 2 (e.g. consistent UI across modules)",
      "TODO: goal 3",
    ],
    responsibilities: [
      "CMS workflows",
      "CRM screens",
      "Design system",
      "UI redesign of existing screens",
      "Developer handoff",
    ],

    sections: [
      {
        id: "before",
        label: "02 / Starting point",
        title: "TODO: what the old experience looked like",
        description:
          "Describe the problems in words. No screenshots needed if work is private.",
        items: ["TODO: pain point 1", "TODO: pain point 2", "TODO: pain point 3"],
      },
      {
        id: "decisions",
        label: "03 / Key decisions",
        title: "How I approached the redesign",
        insights: [
          {
            finding: "TODO: what you learned (from users, team or data)",
            decision: "TODO: the design decision it led to",
          },
          {
            finding: "TODO",
            decision: "TODO",
          },
        ],
      },
      {
        id: "scope",
        label: "04 / What I worked on",
        title: "Four areas across one product.",
        items: [
          "CMS — TODO: what was broken and what you changed",
          "CRM — TODO: what was broken and what you changed",
          "Design system — TODO: which components/patterns you built",
          "Redesign of existing screens — TODO: which screens and why",
        ],
      },
      {
        id: "system",
        label: "05 / Design system",
        title: "Building reusable patterns",
        description:
          "TODO: which components/patterns you built and how they speed up the team.",
        callout: "Selected visuals available on request.",
      },
    ],

    metrics: [
      // Only include real numbers. Delete this array if you have none.
      // { value: "TODO", label: "TODO" },
    ],
    outcome: "TODO: what changed for users and the team.",
    reflection: [
      "TODO: one thing you learned working inside a real product team.",
      "TODO: one thing you'd do differently.",
    ],

    nextSlug: "sportsea",
  },

  // =====================================================
  // 2. SPORTSEA: client project
  // Source: SportSea UX case study document. It is explicit that no
  // interviews, analytics, results or team credits were supplied, so this
  // entry documents design decisions and proposes validation; it does not
  // claim research findings or measured impact.
  // =====================================================
  {
    slug: "sportsea",
    published: true,
    type: "client",

    title: "SportSea",
    tagline: "From finding a court to managing the game.",
    headline:
      "One connected design for players, venues and platform admins — from the first search to the settlement report.",
    image: "/projects/sportsea1.png",

    year: "2025",
    duration: "6 weeks",
    role: "UI/UX Designer",
    team: "TODO: e.g. Solo designer, working with the founder and developers",
    platform: "Mobile + Web",
    tools: ["Figma"],

    tldr: {
      problem:
        "Choosing a venue, securing a slot and keeping a venue’s records aligned are connected decisions. A good discovery screen alone can’t carry the whole service.",
      solution:
        "One connected design across three roles — player, venue admin and platform admin — on mobile and web, keeping role and arena context visible and making state explicit.",
      result:
        "A documented, end-to-end design from discovery to settlement, plus a validation plan for the critical journeys. Impact hasn’t been measured yet.",
    },

    context:
      "SportSea is a sports venue booking platform that connects players with nearby venues. The design goes beyond finding a court: it supports recurring play through memberships, day-to-day venue operations, and the platform’s financial administration.",
    problem:
      "A convincing discovery experience alone can’t resolve the whole service. Players need confidence in what they have reserved, while venue staff and platform admins need records that stay in sync across bookings, memberships and money.",
    goals: [
      "Design for an informed choice",
      "Keep context visible across stages",
      "Make operational state explicit",
    ],
    responsibilities: [
      "Experience architecture",
      "User flows",
      "Mobile + web UI",
      "Role-based dashboards",
      "Booking & payment flows",
      "Settlement & reporting UI",
      "UI pattern consistency",
    ],

    sections: [
      {
        id: "how-to-read",
        label: "02 / How to read this",
        title: "A design-documentation case study.",
        description:
          "The rationale here reflects design decisions, not interview findings or analytics. Role models are derived from the designs rather than interview-based personas, and the amounts, percentages and counts inside the UI are demonstration data — not evidence of impact.",
      },

      {
        id: "roles",
        label: "03 / Roles",
        title: "Three roles. One connected system.",
        description:
          "Each role has a different job but shares the same arena, court, reservation, membership and transaction records. Navigation labels like “Bookings” are shared, so role and arena context have to stay visible.",
        items: [
          "Player — find a place, secure a game. Discover → arena details → booking or membership → checkout & records.",
          "Venue / PG admin — make the arena playable. Registration → pending / live → availability & bulk booking → members, accounts & transactions.",
          "Platform admin — keep the network legible. Multi-arena overview → individual / whole lists → pending / completed settlements → reports.",
        ],
        callout:
          "Venue publishes availability ↔ Player reserves inventory ↔ Platform tracks settlement.",
      },

      {
        id: "journeys",
        label: "04 / Journeys",
        title: "Four paths through the same service.",
        description:
          "Sequences synthesised from the screen families. They describe the experience; they are not prototype interactions.",
        items: [
          "Player books a court — Discover arena → Review details → Date, time & court → Review & pay → Confirmation / records",
          "Player starts a recurring membership — Choose sport & plan → Set period & slot → Add team / players → Review & pay → Membership & renewal",
          "Venue sets up to operate — Register arena → Provide arena details → Pending review → Live arena → Availability & operations",
          "Admin settles an arena — Choose arena / overall → Filter status & dates → Inspect settlement → Review amount & charges → Settle / report",
        ],
      },

      {
        id: "discovery",
        label: "05 / Discovery",
        title: "Choose the arena, not just the nearest pin.",
        description:
          "Discovery establishes the candidate. Arena details supply the reasons to commit, so photography, sport and practical information are part of the same decision.",
        insightLabels: { from: "Need", to: "Design response" },
        insights: [
          {
            finding:
              "Players judge a venue by the place itself before they open any detail.",
            decision:
              "Arena photography, locality, sport labels, rating and distance sit on the card, and the venue name carries through the whole journey.",
          },
          {
            finding:
              "Badminton, football and cricket share a venue but lead to different inventory.",
            decision:
              "Sport selection is treated as a decision layer, not a decorative category.",
          },
          {
            finding:
              "Players need practical answers before they commit: when, what, where.",
            decision:
              "Opening hours, facilities, arena policy and directions sit alongside sport selection in the detail view.",
          },
          {
            finding:
              "Choosing a venue and checking feasibility are different moments.",
            decision:
              "The detail view offers both Availability and Book Now, so a player can check feasibility before entering a purchase flow. A useful next test: do players understand the difference?",
          },
        ],
        callout: "Decision before transaction.",
        images: [
          {
            src: "/projects/sportsea/discovery.png",
            alt: "SportSea player home and arena details screens",
            caption:
              "Player home (search, venue photography, sport labels, rating, distance, direct booking action) and arena details (facilities, policy and directions beside sport selection).",
          },
        ],
      },

      {
        id: "booking",
        label: "06 / Booking",
        title: "A booking is a sequence of commitments.",
        description:
          "The flow separates Selection, Payment and Confirm. Date, time and court establish the reservation; a review ticket and expiry timer introduce payment; result states close the loop.",
        insightLabels: { from: "Need", to: "Design response" },
        insights: [
          {
            finding:
              "A player should be able to explain venue, sport, date, time, court and amount before paying.",
            decision:
              "The arena header, stage indicator and bottom summary keep the decision context in view at every step, and an expiry timer adds urgency.",
          },
          {
            finding:
              "Available, selected and unavailable courts must read differently at a glance.",
            decision:
              "Court variants are visibly distinct in the selection step.",
          },
          {
            finding: "A failed payment must not leave the player guessing.",
            decision:
              "Failure states show a negative result and keep the record details. The full retry, slot-retention and refund path is the next design question.",
          },
        ],
        images: [
          {
            src: "/projects/sportsea/booking-flow.png",
            alt: "SportSea booking flow: selection, review and result screens",
            caption:
              "Select the inventory → review before payment → acknowledge the result.",
          },
        ],
      },

      {
        id: "membership",
        label: "07 / Membership",
        title: "Design for the next game. And the one after.",
        description:
          "Membership changes the unit of booking, from a single session to an ongoing commitment. Plan duration, recurring time, court allocation and team participation have to stay understandable together.",
        insightLabels: { from: "Need", to: "Design response" },
        insights: [
          {
            finding: "A plan only makes sense when its terms are concrete.",
            decision:
              "Quarterly and monthly plan cards sit beside sport selection and list their benefits: team creation, adding members, allocated time and court selection.",
          },
          {
            finding:
              "A recurring plan has two different time ideas: the plan period and the daily playing time.",
            decision:
              "The selection family adds a start / end period, a time range and available courts. A key test: can players tell the period from the daily slot?",
          },
          {
            finding: "Players come back to an existing commitment.",
            decision:
              "Membership records show venue, sport, court, dates and time, with active and expired states, a renewal reminder and expanded details.",
          },
        ],
        callout:
          "A recurring promise needs consistent language: plan names, duration and dates must agree across cards, selection, payment and records.",
        images: [
          {
            src: "/projects/sportsea/membership.png",
            alt: "SportSea membership plan choice, team entry and membership records",
            caption:
              "Plan choice → team participation → persistent membership records.",
          },
        ],
      },

      {
        id: "venue-admin",
        label: "08 / Venue admin",
        title: "Behind every playable slot: a working venue.",
        description:
          "A player wants to book a game; venue staff need to run the day. Mobile supports fast triage (compact booking cards and quick-action tiles), while desktop supports broader comparison (wider rows, expanded availability, bulk work).",
        insightLabels: { from: "Need", to: "Design response" },
        insights: [
          {
            finding:
              "Venue information entered once becomes the listing players see.",
            decision:
              "Arena registration, pending and live states separate submitting venue information from operating a published arena.",
          },
          {
            finding: "Staff need today’s work in reach, not a consumer checkout.",
            decision:
              "Upcoming normal and membership bookings come before quick actions: check availability, create a booking, bulk booking and enrol a member.",
          },
          {
            finding: "Money needs context to be readable.",
            decision:
              "The mobile dashboard separates collections from recent transactions, with booking and membership categories explaining where the money came from.",
          },
          {
            finding: "Offline bookings still occupy a court.",
            decision:
              "The desktop design supports blocking the arena for offline bookings, connecting front-desk operations to the availability players see online.",
          },
        ],
        images: [
          {
            src: "/projects/sportsea/venue-dashboard.png",
            alt: "SportSea venue admin dashboard on mobile and desktop",
            caption:
              "Venue dashboard: reservations and quick actions on mobile, availability, offline blocking and bulk booking on desktop.",
          },
        ],
      },

      {
        id: "platform-admin",
        label: "09 / Platform admin",
        title: "From a single arena to platform-wide clarity.",
        description:
          "Platform administration changes the scale of the task. Arena oversight, booking and membership lists and settlement reports need a clear scope before an operator can read a status or take a financial action.",
        insightLabels: { from: "Need", to: "Design response" },
        insights: [
          {
            finding:
              "The same record pattern can suggest the wrong scope if the arena isn’t visible.",
            decision:
              "Individual-arena and whole-network contexts are separate, with the selected arena kept on screen.",
          },
          {
            finding: "Operators scan status first, then act.",
            decision:
              "Pending and completed states lead each settlement row, followed by date and amount; a pending record exposes the settlement action.",
          },
          {
            finding: "A headline total isn’t enough to trust a payout.",
            decision:
              "The report pairs context with gross amount, charges and amount to settle, with booking and membership tabs to inspect the composition.",
          },
        ],
        callout: "A payment record is not a settlement state.",
        images: [
          {
            src: "/projects/sportsea/platform-settlements.png",
            alt: "SportSea platform admin arena list and settlement report",
            caption:
              "Arena management, settlement list with status filters and the settlement report.",
          },
        ],
      },

      {
        id: "visual-system",
        label: "10 / Visual system",
        title: "A familiar rhythm across very different jobs.",
        description:
          "Confident brand blue, light surfaces, rounded cards and clearly grouped actions. Repeated booking, membership and transaction patterns keep continuity as responsibility changes. This is an inventory of the existing patterns, not a claim that a new component library was created.",
        items: [
          "Record hierarchy — identity, schedule, court and booking type grouped into scannable cards.",
          "State & feedback — status chips plus text give record state a consistent home; colour is never the only cue.",
          "Selection & input — selected and unavailable variants encode inventory state, with rounded inputs and a visible selected treatment.",
        ],
        images: [
          {
            src: "/projects/sportsea/visual-system.png",
            alt: "SportSea visual system: record cards, status chips and selection states",
            caption: "Switch on Dev Mode (D) to inspect colours and type.",
          },
        ],
      },

      {
        id: "iteration",
        label: "11 / Next iteration",
        title: "Iteration is visible. A chronology is not.",
        description:
          "The file holds multiple versions, mobile and web translations and final deliverable sections. They show breadth, not a dated process or an A/B result. These are the four things I would tighten before handoff.",
        items: [
          "Translate the task, not the pixels. Mobile stacks records and prioritises quick actions; desktop exposes parallel context, filters and report tables.",
          "Normalise content across versions: Mysuru / Mysore, plan spelling, duplicated labels, and booking vs membership ticket content.",
          "Run an accessibility pass: contrast on light and disabled states, touch target size, keyboard and focus order on web, input labels, non-colour state cues.",
          "Resolve state transitions explicitly: pending to live arena, payment failure and retry, membership expiry and renewal, pending to completed settlement.",
        ],
      },

      {
        id: "validation",
        label: "12 / Validation plan",
        title: "What to test next.",
        description:
          "Proposed validation, not completed research: task-based sessions with players, recurring players, venue operators and platform admins, using realistic scenarios and one consistent test data set across mobile and web.",
        items: [
          "Find a suitable arena — a player locates a badminton venue in Mysuru and explains whether it suits a game. Measure: task completion, time on task.",
          "Reserve the intended slot — select an available court, date and time and verify the summary before paying. Measure: completion, slot-selection errors.",
          "Interpret payment recovery — explain a failed payment and what to do next. Measure: comprehension of payment state vs reservation state.",
          "Set up recurring play — choose a plan, set period and playing time, add team members, then find the record. Measure: completion, time, errors.",
          "Maintain operational availability — a venue admin reviews today’s bookings, blocks an offline reservation and inspects collections.",
          "Read and resolve a settlement — a platform admin chooses an arena, filters pending items, inspects the report and explains the net amount.",
        ],
        callout:
          "Establish a baseline first. No improvement claims before one exists.",
      },
    ],

    outcome:
      "Designs spanning three role families across mobile and web, from discovery to settlement. Measured impact isn’t available yet; the validation plan defines how the critical journeys would be tested.",
    reflection: [
      "One system, different definitions of clarity: for a player it means knowing what is booked, for a venue what is available, for the platform what remains to be settled.",
      "Move from breadth to confidence: consolidate versions and content, document state transitions and recovery rules, finish the accessibility checks and validate the critical journeys.",
      "Be honest about evidence: this documents design rationale rather than research findings, so the next step is testing, not more screens.",
    ],

    // Real values read from the project's visual system
    tokens: {
      colors: [
        { name: "Brand action", hex: "#1A4FD6" },
        { name: "Supporting blue", hex: "#3160D8" },
        { name: "Light surface", hex: "#F4F4F4" },
        { name: "Text", hex: "#3F3F3F" },
      ],
      type: [
        { role: "Primary", font: "Roboto", spec: "Names, times, totals" },
        { role: "Secondary", font: "Open Sans", spec: "Controls, labels, headings" },
      ],
    },

    figmaEmbed:
      "https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fdesign%2FGXwiFAdGEFkC5gY5NYWBJa%2FPortfolio%3Fnode-id%3D1-2%26t%3DKJw03P2gxOMZ2Ext-1",
    nextSlug: "juzzpay",
  },

  // =====================================================
  // 3. JUZZPAY: concept (be honest: no fake metrics)
  // =====================================================
  {
    slug: "juzzpay",
    published: true,
    type: "personal",

    title: "JuzzPay",
    tagline: "A fintech dashboard designed around clearer financial information.",
    headline: "A self-initiated dashboard concept built to make financial data scannable at a glance.",
    image: "/projects/juzzpay.png",

    year: "2025",
    duration: "1 week",
    role: "UI Designer",
    team: "Solo concept project",
    platform: "Web",
    tools: ["Figma"],

    tldr: {
      problem: "Most finance dashboards show everything at once, so nothing stands out.",
      solution: "A prioritised layout: key balances first, then trends, then transaction detail.",
      result: "A cohesive dashboard UI and a reusable set of card and chart patterns.",
    },

    context:
      "A one-week self-initiated concept to practise information hierarchy and data visualisation in a dense, numbers-heavy product.",
    problem:
      "Financial dashboards often fail by showing too much with equal weight. Users can't tell what matters before they start digging.",
    goals: [
      "Surface the 2 to 3 numbers users care about most within seconds",
      "Make transactions easy to scan and filter",
      "Build a consistent visual language for cards and charts",
    ],
    responsibilities: [
      "Dashboard UI",
      "Information hierarchy",
      "Data visualization",
      "Visual design",
      "Component exploration",
    ],

    sections: [
      {
        id: "challenge",
        label: "02 / Design challenge",
        title: "Prioritising what users see first",
        description:
          "TODO: describe how you decided what goes at the top vs lower down.",
        items: [
          "TODO: Level 1: e.g. balance & key totals",
          "TODO: Level 2: e.g. trends over time",
          "TODO: Level 3: e.g. transaction list & details",
        ],
      },
      {
        id: "visual-system",
        label: "03 / Visual system",
        title: "One consistent interface language",
        description:
          "Typography, spacing, cards and chart styles were defined together so the dashboard reads as one system.",
        images: [
          {
            src: "/projects/juzzpay-system.png", // TODO: add components/type/colour board
            alt: "JuzzPay visual system",
            caption: "TODO: highlight 1 or 2 deliberate choices (e.g. colour for positive/negative values).",
          },
        ],
      },
      {
        id: "final-design",
        label: "04 / Final UI",
        title: "The dashboard experience",
        images: [
          {
            src: "/projects/juzzpay.png",
            alt: "JuzzPay dashboard final UI",
            caption: "TODO: walk through the hierarchy top to bottom.",
          },
        ],
      },
    ],

    outcome:
      "A structured fintech dashboard concept with clear hierarchy and a consistent visual language. As a concept project, it wasn't launched or measured with real users.",
    reflection: [
      "Dashboard design is mostly prioritisation, not showing more information.",
      "Strong visual hierarchy lets users understand data before they interact with it.",
      "TODO: what you'd test with real users if this went further.",
    ],

    figmaEmbed:
      "https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fdesign%2FGXwiFAdGEFkC5gY5NYWBJa%2FPortfolio%3Fnode-id%3D4-6213%26t%3DKJw03P2gxOMZ2Ext-1",
    // EXAMPLE tokens for Dev Mode (replace with the real values):
    // tokens: { colors: [{ name: "Primary", hex: "#000000" }], type: [{ role: "Heading", font: "Inter", spec: "32 / 40 · 600" }], spacing: ["4", "8", "16", "24"] },
    nextSlug: "studycrux-cms",
  },
  // =====================================================
  // LATTICE DESIGN SYSTEM: Design System & Component Library
  // =====================================================
  {
    slug: "lattice-design-system",
    published: true,
    type: "personal", // or "client" / "professional"

    title: "Lattice Design System",
    tagline: "A scalable, token-driven component architecture built for speed and consistency.",
    headline: "Unified foundational tokens, accessible variants, and atomic patterns engineered for seamless design-to-code alignment.",
    image: "/projects/lattice.png", // Ensure this image exists in your public/projects folder

    year: "2025",
    duration: "4 weeks",
    role: "Design Systems Designer",
    team: "Independent systems architecture",
    platform: "Web & Mobile (Figma)",
    tools: ["Figma", "Design Tokens", "Auto Layout", "WCAG 2.1"],

    tldr: {
      problem:
        "Component fragmentation, inconsistent spacing, and undocumented interactive states slow product teams down and create continuous drift between Figma and production code.",
      solution:
        "Engineered Lattice: an atomic token hierarchy (color, typography, elevation, spacing) paired with comprehensive component variants, strict state machines, and accessibility benchmarks.",
      result:
        "A cohesive, multi-state UI system featuring 40+ atomic and molecular components with zero-guesswork developer documentation.",
    },

    context:
      "Lattice was created to solve design debt at its root. Rather than treating design as isolated static artboards, Lattice establishes a systematic foundation of design primitives that scale from micro-interactions to complex data-heavy enterprise layouts.",
    problem:
      "When products scale rapidly, UI elements drift: inconsistent corner radii, arbitrary hex values, mismatched button heights, and missing error/empty states. Engineers waste time guessing edge cases, and designers repeatedly rebuild the same primitives.",
    goals: [
      "Establish a mathematical 4px/8px spacing and typographic scale",
      "Standardize WCAG 2.1 AA compliant color ramps with semantic aliases",
      "Build production-ready Figma component sets with full variant properties",
      "Document deterministic states: default, hover, focus, pressed, disabled, and loading",
    ],
    responsibilities: [
      "Design token architecture",
      "Component variant engineering",
      "Color theory & contrast auditing",
      "Responsive typography scale",
      "Auto layout & constraint testing",
      "Documentation & developer handoff specs",
    ],

    sections: [
      {
        id: "foundations",
        label: "02 / Foundations",
        title: "Primitives before components.",
        description:
          "A resilient system starts with mathematical primitives. Tokens decouple style decisions from specific UI elements, allowing global updates without breaking downstream screens.",
        items: [
          "Color Architecture — 10-step tonal ramps for neutral, primary brand, accent, and semantic intents (success, warning, error, info).",
          "Typography Scale — Modular type hierarchy with defined line-heights and optical tracking calibrated for legibility across viewports.",
          "Spatial Grid — Strict 4px base increment for padding, margins, and component heights (28px compact to 48px touch-friendly).",
          "Elevation & Depth — 4-tier elevation tokens combining subtle border hairlines with ambient and direct drop-shadows.",
        ],
        callout: "Global primitives ➔ Semantic aliases ➔ Component-level tokens.",
      },
      {
        id: "atomic-components",
        label: "03 / Components",
        title: "Predictable behavior across every state.",
        description:
          "Components are engineered with Figma component properties (variants, booleans, text swaps, and instance swaps) so designers cannot accidentally assemble invalid combinations.",
        insightLabels: { from: "Edge Case", to: "System Response" },
        insights: [
          {
            finding:
              "Buttons often break when text labels wrap or when icons are dynamically toggled.",
            decision:
              "Built buttons with fluid Auto Layout, fixed min-widths, and slot-based icon properties that auto-align to the text baseline.",
          },
          {
            finding:
              "Input fields frequently omit focus-visible and validation messaging states.",
            decision:
              "Constructed inputs with unified container shells that support helper text, error tooltips, leading/trailing icons, and a high-contrast focus ring.",
          },
          {
            finding:
              "Interactive elements often rely only on color to communicate state changes.",
            decision:
              "Paired color shifts with secondary cues: micro-copy, icon changes, and explicit border weight adjustments for full accessibility.",
          },
        ],
        images: [
          {
            src: "/projects/lattice/components.png",
            alt: "Lattice atomic components preview",
            caption: "Button sets, form controls, chips, and badge variants with boolean toggles.",
          },
        ],
      },
      {
        id: "layouts-and-molecules",
        label: "04 / Patterns",
        title: "From atoms to coherent workflows.",
        description:
          "Molecules and organisms assemble primitives into repeatable UX patterns: search and filter bars, data table rows with sorting states, modal dialogue sheets, and navigation rails.",
        items: [
          "Data Displays — Table cells and scannable cards that maintain layout integrity with variable text lengths.",
          "Form Patterns — Logical tab orders, inline error handling, and disabled submit states until validation conditions pass.",
          "Feedback Containers — Toast notifications, inline banners, and alert dialogs with standardized severity colors.",
        ],
        callout: "Consistency at scale requires clear composition rules, not just isolated buttons.",
      },
      {
        id: "accessibility",
        label: "05 / Accessibility",
        title: "Compliance built into the defaults.",
        description:
          "Accessibility is not an afterthought or an audit checklist at the end. Contrast ratios and touch targets are baked directly into the default token values.",
        items: [
          "All body text and interactive foreground tokens hit a minimum 4.5:1 contrast against light and dark surfaces.",
          "Interactive mobile touch targets maintain a minimum 44x44px boundary even when visual badges appear compact.",
          "Keyboard focus rings utilize a 2px offset with high-contrast accent borders for clear navigation without a mouse.",
        ],
      },
      {
        id: "handoff",
        label: "06 / Developer Handoff",
        title: "Closing the gap between Figma and code.",
        description:
          "Every component references tokens using naming conventions that mirror standard CSS variables and Tailwind class mappings (`--color-surface-sunken`, `spacing-4`, `radius-md`).",
        items: [
          "Explicit property naming matches React component props (`variant='primary' | 'secondary'`, `size='sm' | 'md' | 'lg'`).",
          "Documented bounding boxes, minimum heights, and auto-layout flex behavior.",
          "Live Dev Mode inspection enabled with embedded documentation notes on each component canvas.",
        ],
      },
    ],

    outcome:
      "A complete, battle-tested design system architecture with hundreds of variants spanning core actions, inputs, navigation, and data presentation. Ready for production deployment in React and Next.js applications.",
    reflection: [
      "A design system is never finished; it is a living infrastructure that evolves with product needs.",
      "Strict token naming up front prevents massive refactoring downstream when introducing dark mode or multi-brand themes.",
      "Figma component properties should simplify choices for designers, eliminating variant bloat while preserving creative flexibility.",
    ],

    // Real Design System Tokens for Dev Mode Inspector
    tokens: {
      colors: [
        { name: "Primary 500", hex: "#1A4FD6" },
        { name: "Primary 600 (Hover)", hex: "#143EAA" },
        { name: "Neutral 900 (Text)", hex: "#111111" },
        { name: "Neutral 500 (Muted)", hex: "#6F6D68" },
        { name: "Surface Paper", hex: "#F7F6F2" },
        { name: "Surface Sunken", hex: "#EAE8E2" },
        { name: "Border Hairline", hex: "rgba(17,17,17,0.14)" },
        { name: "Semantic Danger", hex: "#C0392B" },
      ],
      type: [
        { role: "Display", font: "Bricolage Grotesque", spec: "48 / 52 · SemiBold" },
        { role: "Heading", font: "Inter", spec: "24 / 32 · SemiBold" },
        { role: "Body", font: "Inter", spec: "16 / 24 · Regular" },
        { role: "Mono / Label", font: "Geist Mono", spec: "11 / 16 · Medium" },
      ],
      spacing: ["4px", "8px", "12px", "16px", "24px", "32px", "48px", "64px"],
    },

    // Embed URL correctly encoded with your Figma file link
    figmaEmbed: "https://embed.figma.com/design/Igsj1oEmxfqpbJniYHVpey/Lattice?node-id=0-1&embed-host=share",
    nextSlug: "sportsea",
  },

  // =====================================================
  // PARITY B2B: self-initiated concept (FX-protected cross-border invoicing)
  // Source: Parity B2B Figma file (pages 01–07). No user testing was run:
  // the iterations below are design self-review, and all numbers are targets.
  // =====================================================
  {
    slug: "parity-b2b",
    published: true,
    type: "personal",

    title: "Parity B2B",
    tagline: "Shielding cross-border invoicing from FX volatility and compliance limbo.",
    headline:
      "A self-initiated product concept that lets an agency founder lock what lands in the bank before the client even pays.",
    image: "/projects/parity-b2b.png",

    year: "2026",
    duration: "6 weeks",
    role: "Product Designer (end to end)",
    team: "Solo, self-initiated concept",
    platform: "Desktop web, 1440 × 900",
    tools: ["Figma", "FigJam", "Notion"],

    tldr: {
      problem:
        "Agencies bill abroad in USD on Net-30, but pay salaries in INR. In the month between invoice and payment, currency drift can quietly take 4–7% of margin, and large transfers get frozen by compliance checks with no clear next step.",
      solution:
        "An invoicing product where the founder picks a protection outcome in plain language, the client pays through their own domestic bank rail, and a compliance hold becomes one guided upload instead of days of email.",
      result:
        "A complete concept: a hedging model, a 5-state invoice lifecycle, 6 high-fidelity screens, a documented design system, and 3 iterations from reviewing my own first version. Not built, launched or user-tested yet.",
    },

    context:
      "Parity is a concept I designed to explore a real problem for Indian service businesses: revenue arrives in dollars, costs leave in rupees, and the gap between the two is a month of risk nobody is managing.",
    problem:
      "Three things break at once. The exchange rate can drop while the invoice is open, wiping out a payroll-sized amount. International wires lose $25–50 per intermediary bank with no tracking. And transfers over reporting thresholds are frozen with generic error codes while support asks for paperwork by email.",
    goals: [
      "Show the rupee payout before the invoice is sent, not after it settles",
      "Make FX protection understandable without any forex vocabulary",
      "Let international clients pay on their domestic rail without signing up",
      "Turn a compliance hold into one clear action, resolved within 24 hours",
    ],
    responsibilities: [
      "Problem framing & persona",
      "Jobs to be done & journey mapping",
      "Information architecture",
      "Invoice state machine",
      "Hedging & compliance UX",
      "Hi-fi UI & design system",
    ],

    metrics: [
      { value: "5", label: "invoice states, plus one exception path" },
      { value: "6", label: "hi-fi screens following one invoice end to end" },
      { value: "3", label: "design iterations from v1 to v2" },
      { value: "<24h", label: "target time to clear a compliance hold (vs ~96h)" },
    ],

    sections: [
      {
        id: "problem",
        label: "02 / The problem",
        title: "A month of risk between invoice and payout.",
        description:
          "A $20,000 invoice on Net-30. If the rate slips from ₹83.50 to ₹81.20 before the client pays, the agency receives ₹46,000 less — often more than its monthly software and cloud budget.",
        items: [
          "Margin erosion — 4–7% of net margin exposed to currency drift on every open invoice.",
          "The SWIFT black box — $25–50 deducted per intermediary bank, 3–5 days in transit, no visibility.",
          "Regulatory limbo — transfers over $10,000 flagged with a code, funds held for days (~96h on average) while paperwork moves over email.",
        ],
        callout:
          "Persona quote — “I need certainty. I can't tell my team their salaries are late because the currency moved.”",
      },
      {
        id: "research",
        label: "03 / Who it's for",
        title: "Rohan needs certainty, not a trading terminal.",
        description:
          "I worked from a proto-persona, built from desk research on how agencies get paid: a co-founder of an 18-person engineering agency in Bengaluru: 90% of revenue in USD, 100% of costs in INR. Three jobs shaped everything after this.",
        insightLabels: { from: "Today", to: "With Parity" },
        insights: [
          {
            finding: "Invoice is a static PDF with SWIFT details; currency risk is accepted by default.",
            decision: "The invoice is created with protection options that show the guaranteed rupee payout up front.",
          },
          {
            finding: "The client sends an international wire, pays a $35 fee and waits 3–5 business days.",
            decision: "The client pays on a domestic rail (ACH / SEPA) with no account and no intermediary fees.",
          },
          {
            finding: "The rate drops 3.8% and the loss shows up silently on payout day.",
            decision: "The locked rate is honoured automatically and the shortfall avoided is shown on settlement.",
          },
          {
            finding: "Funds freeze without warning; four days of support emails follow.",
            decision: "A banner explains what is held and why, with a direct upload and automatic document matching.",
          },
        ],
      },
      {
        id: "hedging",
        label: "04 / Product logic",
        title: "Smart defaults, three outcome-named presets.",
        description:
          "Full automation felt risky (what if the market is rising?), and manual forex was too complex. So Parity recommends one option and lets the owner switch in a click — each card leads with the rupee amount, not the instrument.",
        items: [
          "Guaranteed Shield — 100% locked at today's rate for a 0.45% fee. Recommended above $10,000.",
          "Smart Floor Collar — free; floats with the market and locks automatically if the rate hits your floor.",
          "Pure Market Float — free, no protection; settles at whatever the rate is when the money clears.",
        ],
        images: [
          {
            src: "/case-studies/parity/create-invoice.png",
            alt: "Parity new invoice drawer with three payout protection options",
            caption:
              "Invoice creation lives in an 800px drawer over the dashboard. Guaranteed Shield is preselected and the exact payout is shown before sending.",
            pins: [
              { x: 90, y: 6, title: "Live rate countdown", note: "Draft rates refresh every 60 seconds; the ring shows when the quote expires." },
              { x: 55, y: 50, title: "Outcome first", note: "Each option leads with what you'll receive in rupees, then the rate and fee." },
              { x: 54, y: 84, title: "One number to trust", note: "The footer repeats the guaranteed payout, rate and fee for the selected option." },
              { x: 60, y: 96, title: "No friction for the payer", note: "The client pays via US ACH and never needs a Parity account." },
            ],
          },
        ],
      },
      {
        id: "states",
        label: "05 / System",
        title: "Money has a state. Every screen says which one.",
        description:
          "I modelled the invoice as a deterministic state machine so the UI can always answer three questions: what is protected, what is moving, and what needs me?",
        items: [
          "1 · Draft — editable; the estimated rate refreshes every 60 seconds.",
          "2 · Sent · Hedge active — payment link live; rate locked for the 30-day term.",
          "3 · Funds in transit — client started a domestic payment; clearance countdown shown.",
          "4 · Action required — the one exception path: flagged transfer, funds in escrow, upload requested.",
          "5 · Settled & disbursed — converted at the guaranteed rate and deposited.",
        ],
        images: [
          {
            src: "/case-studies/parity/dashboard.png",
            alt: "Parity dashboard with metric cards and recent invoices table",
            caption: "The default dashboard: four metrics, then every open invoice with its state as a labelled pill.",
            pins: [
              { x: 46, y: 22, title: "Protection made visible", note: "The rupee amount saved versus the spot rate, so the value of hedging is concrete." },
              { x: 69, y: 43, title: "Unprotected is explicit", note: "A draft with no protection says so, instead of showing a blank cell." },
              { x: 87, y: 56, title: "State, not just status", note: "Pills map 1:1 to the five invoice states, always with text, never colour alone." },
            ],
          },
        ],
      },
      {
        id: "pivots",
        label: "06 / Iteration",
        title: "Three iterations that changed the structure, not just the polish.",
        description:
          "I reviewed my first low-fidelity version against Rohan's three jobs and walked each flow as him. Three problems stood out, and each one changed the architecture.",
        insightLabels: { from: "What broke", to: "What changed" },
        insights: [
          {
            finding:
              "v1 used “30-Day FX Forward Swap” and “Downside Slippage Boundary”. Rohan runs an agency, not a trading desk — this language assumes forex training he doesn't have.",
            decision:
              "Renamed to Guaranteed Shield, Protection Fee and Minimum Safety Floor, and put the rupee payout on every option, so each choice reads as an outcome.",
          },
          {
            finding: "A full-page invoice form cut the user off from recent invoices and client records — exactly what you check while deciding how to bill.",
            decision: "Moved creation into an 800px drawer with a light scrim. The dashboard stays in view and form state is kept.",
          },
          {
            finding: "Compliance flags lived in the notification bell, next to routine updates. The most expensive event in the product had the quietest UI.",
            decision:
              "Reserved the loudest component in the system for this: a sticky escrow banner with one direct upload action. Nothing else in the product uses it.",
          },
        ],
        compare: {
          before: { src: "/case-studies/parity/dashboard.png", alt: "Dashboard with nothing on hold" },
          after: { src: "/case-studies/parity/compliance-hold.png", alt: "Dashboard with a sticky escrow banner and flagged invoice row" },
          caption: "Drag to compare: the same dashboard when an invoice is held. The banner and the highlighted row are the only red on screen.",
        },
      },
      {
        id: "exception",
        label: "07 / The exception path",
        title: "Compliance as a two-minute task, not a four-day email thread.",
        description:
          "When a transfer is flagged, the user sees what's held, why, and the one document needed. The upload is matched against the invoice automatically, with progress and a plain-language timeline of what happens next.",
        images: [
          {
            src: "/case-studies/parity/compliance-verify.png",
            alt: "Parity compliance resolution screen with document upload and automatic matching",
            caption: "Upload → automatic match → release. No agent in the loop for the common case.",
            pins: [
              { x: 25, y: 13, title: "Progress you can see", note: "The banner switches from ‘held’ to ‘verifying’, so the user knows the system is working." },
              { x: 58, y: 47, title: "Field-by-field matching", note: "Client, amount, service and signatures are checked separately — a mismatch points to exactly one field." },
              { x: 85, y: 40, title: "What happens next", note: "A short timeline sets the expectation: verification in under a minute, funds within 24 hours." },
            ],
          },
        ],
      },
      {
        id: "payer-settlement",
        label: "08 / Both sides of the payment",
        title: "Cheaper for the client, provable for the founder.",
        description:
          "The client pays from a light checkout on their own bank rail; the wire cost is shown next to it for contrast. When the invoice settles, the founder sees the rate they were protected from and the amount that protection saved.",
        images: [
          {
            src: "/case-studies/parity/payer-checkout.png",
            alt: "Parity payer checkout comparing international wire fees with US ACH",
            caption: "Payer checkout: no account, $0 fee on ACH versus $35 and 3–5 days for a wire.",
          },
          {
            src: "/case-studies/parity/settled.png",
            alt: "Parity settled invoice with deposit, market rate and shortfall avoided",
            caption: "Settlement closes the loop: ‘shortfall avoided’ turns an invisible benefit into a number.",
            pins: [
              { x: 81, y: 23, title: "The value, made explicit", note: "₹16,575 that would have been lost at the market rate on settlement day." },
              { x: 50, y: 44, title: "Full lifecycle", note: "Every state the invoice passed through, with dates — useful for accountants and audits." },
            ],
          },
        ],
      },
      {
        id: "design-system",
        label: "09 / Design system",
        title: "A system that makes financial state legible.",
        description:
          "58 variables (primitives, semantic colour, spacing, radius), 7 text styles on Inter with tabular figures so amounts line up, and 11 components — 8 documented with usage, anatomy, accessibility notes and do / don't pairs.",
        items: [
          "Status colours are reserved for state: blue = sent, amber = in transit, red = action required, green = settled.",
          "Every status pill pairs colour with a word; core text and status pairs checked for AA contrast.",
          "Numbers always use tabular figures and right alignment in tables.",
        ],
      },
      {
        id: "proven",
        label: "10 / What's proven",
        title: "What's designed, and what still needs proving.",
        items: [
          "Designed — the full lifecycle from draft to settlement, the compliance exception path, the payer checkout and a documented design system.",
          "Targets, not results — ≥45% protection opt-in on invoices over $10,000; holds cleared in under 24 hours; 100% payout certainty on protected invoices.",
          "Next — test with 5 agency founders: can they explain the three protection options, and do they notice and act on a compliance hold? Then micro-interactions and handoff specs.",
        ],
        callout: "This is a concept. Nothing here has been built, launched or tested with users, and no target above is a measured result.",
      },
    ],

    outcome:
      "A complete, testable concept for FX-protected cross-border invoicing: research, a state model, 6 high-fidelity screens and a documented design system, refined through three design iterations. The next step is testing it with real agency founders.",
    reflection: [
      "Language is part of the interface. Renaming three terms did more for comprehension than any layout change.",
      "Context beats focus. Hiding the dashboard to ‘focus’ on a form took away the information people needed to decide.",
      "Urgency should be rare and unmistakable. Reserving the loudest component for compliance holds is what made it work.",
    ],

    tokens: {
      colors: [
        { name: "Primary action", hex: "#2563EB" },
        { name: "Settled", hex: "#16A34A" },
        { name: "In transit", hex: "#D97706" },
        { name: "Action required", hex: "#DC2626" },
        { name: "Canvas", hex: "#F8FAFC" },
        { name: "Surface", hex: "#FFFFFF" },
        { name: "Border", hex: "#E2E8F0" },
      ],
      type: [
        { role: "Metric", font: "Inter (tabular)", spec: "32 / 40 · Bold" },
        { role: "Page title", font: "Inter", spec: "24 / 32 · SemiBold" },
        { role: "Body", font: "Inter", spec: "14 / 20 · Regular" },
        { role: "Badge", font: "Inter", spec: "12 / 16 · Medium" },
      ],
      spacing: ["4px", "8px", "12px", "16px", "20px", "24px", "32px", "40px"],
    },

    figmaEmbed:
      "https://embed.figma.com/design/wQGYsRElKQO3oLSJKaPowY/Parity-B2B-%E2%80%94-Cross-Border-Invoicing---FX-Hedging-Portal?node-id=0-1&embed-host=share",
    nextSlug: "buildbook",
  },

  // =====================================================
  // BUILDBOOK: self-initiated concept, inspired by a friend who builds houses
  // Design rationale only — no research sessions or usage data are claimed.
  // =====================================================
  {
    slug: "buildbook",
    published: true,
    type: "personal",

    title: "Buildbook",
    tagline: "Every rupee and every workday of a house build, in one place.",
    headline:
      "A house-build tracker that tells an owner the one thing notebooks and WhatsApp can't: how much has been paid ahead of the work actually done.",
    image: "/projects/buildbook.png",

    year: "2026",
    duration: "TODO: e.g. 3 weeks",
    role: "Product Designer (end to end)",
    team: "Solo, self-initiated concept",
    platform: "Web app + mobile PWA",
    tools: ["Figma"],

    tldr: {
      problem:
        "Building a house means 10+ contractors, cash and UPI payments, advances, deliveries and daily site decisions — usually tracked across notebooks, WhatsApp and a loose spreadsheet. Overpaying ahead of work is easy to miss.",
      solution:
        "A web dashboard for reviewing money and a one-handed mobile app for logging on site. It works offline and syncs to the owner's own Google Sheet, so the data never leaves their hands.",
      result:
        "10 web screens, 7 mobile screens, 11 components and 44 tokens. A design concept — not built or tested with users yet.",
    },

    context:
      "The idea came from watching a friend who builds houses. Payments were split across UPI, NEFT, cheques and cash; advances went out before work was inspected; receipts lived in folders; and daily site notes lived in someone's head.",
    problem:
      "The money is spread across too many people and payment types, and the riskiest number — how much has been paid ahead of inspected work — isn't written down anywhere. On site there is often no signal, and nobody wants to fill a long form with dusty hands.",
    goals: [
      "Make ‘paid ahead of work’ visible before the next payment goes out",
      "Log a payment, delivery or diary entry on site in under a minute, offline",
      "Keep every receipt traceable, down to the physical folder and page",
      "Let the owner keep their data in their own Google Sheet",
    ],
    responsibilities: [
      "Product concept & IA",
      "Money model & calculations",
      "Web dashboard UI",
      "Mobile PWA flows",
      "Offline & sync states",
      "Design system",
    ],

    metrics: [
      { value: "17", label: "screens across web and mobile" },
      { value: "8", label: "modules, from agreements to budget" },
      { value: "11", label: "components on 44 tokens" },
    ],

    sections: [
      {
        id: "two-places",
        label: "02 / Two jobs, two devices",
        title: "Review at a desk. Log on site.",
        description:
          "An owner does two very different things: sit down to decide what to pay next, and quickly record what just happened on site. So the web app is built for reading and comparing, and the mobile app for fast entry with one hand.",
        insightLabels: { from: "Moment", to: "Design response" },
        insights: [
          {
            finding: "Sunday evening, deciding which contractor to pay this week.",
            decision: "The web dashboard leads with budget consumed, money paid ahead of work and what's due in the next 14 days.",
          },
          {
            finding: "Standing on site, a contractor asks for a payment.",
            decision: "Mobile quick entry is pre-filled from the payment schedule — confirm the amount, pick the mode, snap the receipt.",
          },
          {
            finding: "No signal on the slab.",
            decision: "Every entry saves on the phone first and syncs to Google Sheets later, with clear toast states for saved, syncing and failed.",
          },
        ],
      },
      {
        id: "dashboard",
        label: "03 / Dashboard",
        title: "Where the money and the site stand, today.",
        images: [
          {
            src: "/case-studies/buildbook/dashboard.png",
            alt: "Buildbook web dashboard with budget, build stages, paid-ahead gauge and due payments",
            caption:
              "The dashboard answers the owner's three questions in order: how much is spent, who has been paid ahead, and what's due next.",
            pins: [
              { x: 45, y: 8, title: "Spent vs committed", note: "One bar splits the budget into spent, committed-but-unpaid and the real headroom that's left." },
              { x: 85, y: 12, title: "Paid ahead of work", note: "The riskiest number gets its own card, broken down by contractor." },
              { x: 45, y: 30, title: "Build stages", note: "Money is always read against progress — the current stage is highlighted." },
              { x: 92, y: 52, title: "Act from the list", note: "Due milestones can be marked paid right here, which opens a pre-filled entry." },
            ],
          },
        ],
      },
      {
        id: "paid-ahead",
        label: "04 / The key calculation",
        title: "Paid ahead of work: the number nobody was tracking.",
        description:
          "Each agreement compares what's been paid with the value of work an engineer has inspected. If the difference is positive, the contractor has been paid ahead — and the next release should wait.",
        callout: "Paid ahead = max(0, total paid − value of inspected work)",
        images: [
          {
            src: "/case-studies/buildbook/agreements.png",
            alt: "Buildbook agreements list with a contractor detail panel showing paid-ahead calculation",
            caption: "Agreements list with a detail panel. Written, verbal and phone agreements are all tracked — that's how deals really happen.",
            pins: [
              { x: 22, y: 11, title: "Real-world agreement types", note: "Verbal and phone agreements are first-class, not forced into a contract template." },
              { x: 84, y: 37, title: "Inspected progress", note: "Work done is set by the site engineer's last inspection, not the contractor's claim." },
              { x: 84, y: 61, title: "The calculation, shown", note: "The formula is visible, with a clear recommendation: hold the next release until 50% is inspected." },
            ],
          },
        ],
      },
      {
        id: "ledger",
        label: "05 / Payments",
        title: "Every rupee traceable, down to the folder and page.",
        description:
          "Cash and cheque payments are common on a build, so a digital record alone isn't enough. Each payment carries a physical filing location, and missing receipts are surfaced as money that isn't audited yet.",
        images: [
          {
            src: "/case-studies/buildbook/payments.png",
            alt: "Buildbook payments ledger with missing receipt banner and filing locations",
            caption: "The ledger groups payments by type and flags unaudited money at the top.",
            pins: [
              { x: 40, y: 12, title: "Unaudited money", note: "Missing receipts are shown as a rupee amount, which makes them harder to ignore than a count." },
              { x: 90, y: 39, title: "Physical filing locator", note: "‘Folder B / Page 31’ connects the app to the real receipt folder." },
            ],
          },
          {
            src: "/case-studies/buildbook/add-payment.png",
            alt: "Buildbook add payment modal pre-filled from a milestone with a paid-ahead warning",
            caption: "Adding a payment from a milestone fills in the vendor, agreement and amount — and warns before money goes out ahead of work.",
            pins: [
              { x: 59, y: 15, title: "Pre-filled from the schedule", note: "Linked to the milestone, so the owner only confirms." },
              { x: 63, y: 25, title: "Amount in words", note: "‘One lakh rupees’ under the field catches an extra zero before it costs anything." },
              { x: 59, y: 74, title: "Warning before, not after", note: "The paid-ahead check runs while the payment is being entered." },
              { x: 47, y: 81, title: "Where it will sync", note: "The footer says exactly which Sheet row this entry becomes." },
            ],
          },
        ],
      },
      {
        id: "mobile",
        label: "06 / Mobile",
        title: "Built for one hand on a dusty site.",
        description:
          "Large targets, chips instead of dropdowns, a centre + button for quick entry, and voice dictation in Telugu, Hindi or English for the site diary. Swipe a milestone to mark it paid.",
        images: [
          {
            src: "/case-studies/buildbook/mobile.png",
            alt: "Five Buildbook mobile screens: home, quick entry, ledger with sync toast, site diary and schedule",
            caption: "Home → quick entry → ledger with sync toast → site diary → schedule.",
          },
        ],
      },
      {
        id: "budget",
        label: "07 / Budget",
        title: "Catch the overrun while there's still time to move money.",
        description:
          "Each category shows planned, actual and variance with a meter. The forecast uses agreed contracts and the current monthly burn, and the cards below turn variances into suggested actions.",
        images: [
          {
            src: "/case-studies/buildbook/budget.png",
            alt: "Buildbook budget vs actual with forecast at completion and category table",
            caption: "Budget vs actual, with a forecast at completion and three plain-language alerts.",
            pins: [
              { x: 74, y: 18, title: "Forecast, explained", note: "The projection says why it's above plan — excavation overrun and steel prices." },
              { x: 50, y: 93, title: "Suggestions, not just alerts", note: "‘Consider moving ₹1,00,000 from Flooring’ gives the owner a next step." },
            ],
          },
        ],
      },
      {
        id: "system",
        label: "08 / Design system",
        title: "Graphite, Concrete, Cobalt and Signal.",
        description:
          "A palette taken from the site itself: graphite for structure, concrete for surfaces, cobalt for actions, and a signal yellow used sparingly for progress and the current stage. Bricolage Grotesque for headings and figures, Geist for body text, Geist Mono for IDs and amounts in tables.",
        items: [
          "44 tokens — colour ramps, semantic aliases, a 4px spacing scale and radius steps.",
          "11 components, including stat cards, agreement rows, payment-type chips and sync toasts.",
          "Status is never colour alone: overdue, due soon and filed always carry a label.",
        ],
      },
      {
        id: "next",
        label: "09 / What's next",
        title: "What I'd test before building it.",
        description: "This is a design concept. The next step is putting it in front of people who are building right now.",
        items: [
          "Sit with 3–5 owners and contractors — can they find who's been paid ahead in under 30 seconds?",
          "Test quick entry on site, outdoors, with no signal.",
          "Check that the Google Sheet stays readable for an accountant who never opens the app.",
          "Decide how the contractor's view should work, so both sides see the same numbers.",
        ],
      },
    ],

    outcome:
      "A complete concept for tracking a house build across web and mobile, built around one overlooked number — money paid ahead of work. Not yet built or tested with users.",
    reflection: [
      "The most useful feature is often a single calculation that nobody was doing by hand.",
      "Design for the real world: verbal agreements, cash payments and paper receipt folders aren't edge cases on a build.",
      "Splitting ‘review’ and ‘log’ across devices made both experiences simpler than one responsive app would have.",
    ],

    tokens: {
      colors: [
        { name: "Graphite 900", hex: "#16181D" },
        { name: "Concrete 50", hex: "#F5F4F0" },
        { name: "Cobalt 500", hex: "#3D52FF" },
        { name: "Signal 400", hex: "#F6DB2C" },
        { name: "Green 500", hex: "#22A06B" },
        { name: "Amber 500", hex: "#E8A21A" },
        { name: "Red 500", hex: "#E5432F" },
      ],
      type: [
        { role: "Display", font: "Bricolage Grotesque", spec: "40 · SemiBold" },
        { role: "Figure", font: "Bricolage Grotesque", spec: "26 · SemiBold" },
        { role: "Body", font: "Geist", spec: "14 · Regular" },
        { role: "Mono / IDs", font: "Geist Mono", spec: "13 · Medium" },
      ],
      spacing: ["4px", "8px", "12px", "16px", "20px", "24px", "32px", "48px"],
    },

    figmaEmbed:
      "https://embed.figma.com/design/WGxhPVbt92muIihcuj6IkP/Buildbook?node-id=0-1&embed-host=share",
    nextSlug: "lattice-design-system",
  },
];

// ---------- HELPERS ----------

/** Removes unfinished "TODO ..." text so placeholders never reach the live site. */
export function clean(s?: string): string | undefined {
  if (!s) return undefined;
  const i = s.search(/TODO/i);
  const out = (i === -1 ? s : s.slice(0, i)).trim();
  return out || undefined;
}

export const getPublishedCaseStudies = () =>
  caseStudies.filter((c) => c.published);

export const getCaseStudy = (slug: string) =>
  caseStudies.find((c) => c.slug === slug);

export const hasCaseStudy = (slug: string) =>
  caseStudies.some((c) => c.slug === slug && c.published);

/** Next published case study: the nextSlug override if valid, else cycle in order. */
export function getNextCaseStudy(slug: string): CaseStudy | undefined {
  const list = getPublishedCaseStudies();
  const current = list.findIndex((c) => c.slug === slug);
  if (current === -1 || list.length < 2) return undefined;

  const override = caseStudies.find((c) => c.slug === list[current].nextSlug);
  if (override?.published && override.slug !== slug) return override;

  return list[(current + 1) % list.length];
}