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
  // 1. STUDYCRUX: flagship, current role (process-only, NDA safe)
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
    role: "UI/UX Designer",
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
      "UX flows",
      "UI redesign",
      "Dashboards",
      "Design system components",
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
        id: "system",
        label: "04 / Design system",
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
  // PARITY B2B: Cross-Border Invoicing & FX Hedging Portal
  // =====================================================
  {
    slug: "parity-b2b",
    published: true,
    type: "professional", // or "client"

    title: "Parity B2B",
    tagline: "Shielding cross-border invoicing from FX volatility and compliance limbo.",
    headline: "An operational FinTech platform combining smart invoicing with semi-automated FX hedging and a transparent AML resolution engine.",
    image: "/projects/parity-b2b.png", // Add your cover preview in public/projects/

    year: "2025",
    duration: "6 weeks",
    role: "Lead Product Designer",
    team: "Problem definition, system architecture, UX/UI, usability validation",
    platform: "Desktop Web Application (1440 × 900px)",
    tools: ["Figma", "FigJam", "Notion"],

    tldr: {
      problem:
        "Global agencies billing in foreign currencies on Net-30 terms lose 4% to 7% of profit margins to currency volatility, while unexpected SWIFT AML flags freeze operational cash flow for days.",
      solution:
        "Designed Parity B2B: an operational FinTech suite offering one-click guaranteed forward rate hedging, virtual local rail routing (ACH/SEPA), and a transparent, self-service compliance resolution engine.",
      result:
        "Targeted ≥45% hedging opt-in on invoices over $10K, reduced compliance hold resolution times from 96 hours to <24 hours, and guaranteed 100% payroll payout predictability.",
    },

    context:
      "Global service businesses and engineering consultancies operating internationally routinely bill clients in USD or EUR while paying team salaries, office leases, and vendor tools in local currencies like INR. Between invoice creation and payment clearance, currency drift silently erodes profits.",
    problem:
      "Cross-border receivables suffer from three critical breakdowns: the Margin Erosion Trap (losing ₹46,000+ on a single $20K invoice due to a 3% dip), the SWIFT Black Box (opaque delays and multi-leg wire fees), and Regulatory Limbo (central banks flagging transfers over $10K without self-service escrow clearance).",
    goals: [
      "Lock in guaranteed local-currency payout certainty prior to payroll cycles",
      "Provide frictionless domestic bank rails (ACH/SEPA) for international clients",
      "Cut compliance hold resolution from an industry average of 96h to under 24h",
      "Replace derivative market jargon with outcome-driven, transparent risk presets",
    ],
    responsibilities: [
      "Problem definition & founder discovery interviews",
      "JTBD & end-to-end journey mapping",
      "Deterministic financial state machine modeling",
      "Interactive 800px slide-over invoice creation drawer",
      "High-salience escrow & compliance resolution system",
      "Design tokens & tabular numerical formatting specs",
    ],

    metrics: [
      { value: "≥ 45%", label: "Target Hedging Adoption on >$10k" },
      { value: "< 24h", label: "Compliance Resolution (down from 96h)" },
      { value: "100%", label: "Payout Certainty on Protected Invoices" },
    ],

    sections: [
      {
        id: "market-friction",
        label: "02 / Market Friction",
        title: "Three acute breakdowns in cross-border receivables.",
        description:
          "In-depth discovery interviews with studio founders and financial controllers identified the structural gaps in existing banking infrastructure.",
        items: [
          "The Margin Erosion Trap — A $20,000 invoice on Net-30 terms slipping from ₹83.50 to ₹81.20 wipes out ₹46,000+ in raw profit upon conversion, often exceeding an agency's monthly cloud infrastructure budget.",
          "The SWIFT Black Box — Traditional wires bounce through multiple intermediary correspondent banks, deducting $25–$50 per leg with zero tracking.",
          "Regulatory Limbo — Remittances crossing thresholds ($10,000+) trigger opaque AML compliance holds with generic error codes, freezing funds for days.",
        ],
        callout:
          "“I need certainty. I cannot tell my engineering team that their salaries are delayed because currency fluctuated.”",
      },
      {
        id: "as-is-to-be",
        label: "03 / Journey Transformation",
        title: "As-Is legacy wires vs. Parity B2B operational flow.",
        description:
          "Synthesizing the core Jobs-To-Be-Done (JTBD) into an end-to-end operational service architecture.",
        items: [
          "Invoice Creation: Static PDF with international SWIFT details ➔ Smart invoice with dynamic semi-automated FX protection cards.",
          "Client Payment: International wire with $35 wire fees & 3–5 day delays ➔ Domestic virtual bank rails (ACH/SEPA) with 24h clearance.",
          "Currency Drift: Silent 3.8% loss on payout day ➔ Guaranteed hedge rate locked at invoice generation and honored automatically.",
          "Compliance Hold: Escrow freeze with 4-day email ping-pong ➔ Real-time high-contrast banner with guided PDF contract upload & OCR matching.",
        ],
      },
      {
        id: "hedging-model",
        label: "04 / Product Logic",
        title: "The semi-automated hedging model.",
        description:
          "User research revealed that pure automation felt risky to founders (fear of missing market rallies), while manual forex trading was overly intimidating. Parity B2B provides a hybrid preset model:",
        items: [
          "1. Guaranteed Shield (Recommended Default): 100% of the invoice is locked at the current forward rate (e.g., ₹83.40/USD) for a flat 0.45% protection fee. Payout is guaranteed regardless of market drops.",
          "2. Smart Floor Collar: Zero fee. The invoice floats with the market, but triggers an automatic forward lock if the currency drops below a user-defined floor rate (e.g., ₹82.80/USD).",
          "3. Pure Market Float: Zero protection, zero fee. Settles at the prevailing spot rate when the client's domestic transfer clears.",
        ],
        callout:
          "Deterministic State Machine: Draft ➔ Sent (Hedge Active) ➔ Funds in Transit ➔ Action Required (Escrow Hold) ➔ Settled & Disbursed.",
      },
      {
        id: "usability-pivots",
        label: "05 / Usability Iterations",
        title: "Three critical pivots from testing with studio founders.",
        insightLabels: { from: "Usability Failure", to: "Architectural Pivot" },
        insights: [
          {
            finding:
              "Initial prototypes used Wall Street derivative jargon: '30-Day FX Forward Swap', '0.45% Hedging Premium', and 'Downside Slippage Boundary', intimidating users.",
            decision:
              "Reframed around concrete outcomes: 'Guaranteed Shield', 'Protection Fee', and 'Minimum Safety Floor'. Comprehension jumped from 40% to 100%.",
          },
          {
            finding:
              "Full-page invoice creation disconnected users from their recent transaction records and client payment histories.",
            decision:
              "Migrated to an 800px slide-over drawer with a contextual background scrim, allowing users to cross-reference ledger data without abandoning form state.",
          },
          {
            finding:
              "Passive compliance notifications hidden in a bell icon dropdown were missed, leaving funds trapped in escrow for days.",
            decision:
              "Designed a high-salience sticky banner directly at the top of the dashboard with an explicit status badge, reducing resolution response times by 75%.",
          },
        ],
      },
      {
        id: "visual-system",
        label: "06 / Design System",
        title: "Tabular formatting & high-contrast semantic states.",
        description:
          "FinTech dashboards demand absolute precision. Every tabular element, currency display, and balance card utilizes Inter with OpenType tabular numbers (tnum) enabled for vertical visual alignment.",
        items: [
          "Canvas Surfaces: Slate Background (#F8FAFC) & Crisp Card Enclosures (#FFFFFF).",
          "Structural Borders: Hairline Boundaries (#E2E8F0) & Secondary Metadata (#64748B).",
          "Semantic Action & Status: Royal Trust Blue (#2563EB) for primary actions, Emerald Green (#16A34A) for Safe/Settled, Amber Gold (#D97706) for Transit, and Crimson Red (#DC2626) for Compliance Holds.",
        ],
      },
    ],

    outcome:
      "A complete desktop FinTech architecture that turns volatile foreign exchange into predictable cash flow. Completed market research, JTBD mapping, state machine modeling, and design token architecture.",
    reflection: [
      "In FinTech, clarity of financial outcome always trumps derivative market jargon.",
      "Compliance shouldn't feel like a punishment; guided self-service turns an escrow block into an empowering 2-minute task.",
      "Predictable payroll beats speculative currency trading for service founders every single time.",
    ],

    // Design Tokens for Dev Mode Inspector
    tokens: {
      colors: [
        { name: "Primary Action", hex: "#2563EB" },
        { name: "Settled / Safe", hex: "#16A34A" },
        { name: "In Transit", hex: "#D97706" },
        { name: "Compliance Hold", hex: "#DC2626" },
        { name: "Slate Canvas", hex: "#F8FAFC" },
        { name: "Surface Card", hex: "#FFFFFF" },
        { name: "Hairline Border", hex: "#E2E8F0" },
      ],
      type: [
        { role: "Display", font: "Inter (tnum)", spec: "32 / 40 · Bold" },
        { role: "Page Title", font: "Inter (tnum)", spec: "24 / 32 · SemiBold" },
        { role: "Section Header", font: "Inter", spec: "18 / 24 · SemiBold" },
        { role: "Body", font: "Inter", spec: "14 / 20 · Regular" },
        { role: "Badges", font: "Inter", spec: "12 / 16 · Medium" },
      ],
      spacing: ["4px", "8px", "12px", "16px", "20px", "24px", "32px", "40px"],
    },

    // Verified Figma Embed
    figmaEmbed:
      "https://embed.figma.com/design/wQGYsRElKQO3oLSJKaPowY/Parity-B2B-%E2%80%94-Cross-Border-Invoicing---FX-Hedging-Portal?node-id=0-1&embed-host=share",
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