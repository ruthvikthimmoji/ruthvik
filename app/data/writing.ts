/**
 * Writing data. Put this at app/data/writing.ts
 *
 * Posts are plain data, so there is no MDX or extra dependency.
 * To publish: add an object to the `posts` array below. Newest-first
 * order is handled automatically.
 *
 * Block types: p, h2, quote, list, image
 */

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "quote"; text: string }
  | { type: "list"; items: string[] }
  | { type: "image"; src: string; alt: string; caption?: string };

export type Post = {
  slug: string;
  title: string;
  summary: string; // 1-2 sentences, used on the list page and for SEO
  date: string; // ISO, e.g. "2026-10-06"
  tags: string[];
  body: Block[];
  image?: string; // optional share image for OpenGraph
};

export const posts: Post[] = [
  {
    slug: "dashboards-are-about-prioritization",
    title: "A dashboard is mostly about what you leave out",
    summary:
      "What a one-week fintech dashboard concept taught me about hierarchy and prioritization.",
    date: "2026-10-06",
    tags: ["Dashboards", "Hierarchy"],
    image: "/projects/juzzpay.png",
    body: [
      {
        type: "p",
        text: "I recently spent a week designing JuzzPay, a fintech dashboard concept. A week isn't long, and that turned out to be useful: with so little time, I couldn't design everything. I had to decide what mattered.",
      },
      { type: "h2", text: "More information isn't a better dashboard" },
      {
        type: "p",
        text: "The easy way to make a finance dashboard feel complete is to show everything: every balance, every transaction, every chart. It looks thorough, but it hands the hardest job, deciding what's important, to the person using it.",
      },
      {
        type: "p",
        text: "Most of the work went the other way: deciding what deserved attention first, what could sit one level down, and what didn't need to be on the screen at all.",
      },
      { type: "h2", text: "Hierarchy comes before interaction" },
      {
        type: "p",
        text: "A good dashboard should be understood before anything is clicked. Someone should be able to glance at it and know where they stand. That's the job of hierarchy: size, spacing and grouping doing the explaining, so the person doesn't have to.",
      },
      {
        type: "list",
        items: [
          "Typography to separate what's primary from what's supporting",
          "Spacing to group related information",
          "Cards to give each piece of data a clear boundary",
          "Consistent chart patterns, so data reads the same way everywhere",
        ],
      },
      {
        type: "image",
        src: "/projects/juzzpay.png",
        alt: "JuzzPay fintech dashboard concept",
        caption: "JuzzPay, dashboard concept",
      },
      { type: "h2", text: "What I'm taking into the next one" },
      {
        type: "p",
        text: "Before adding anything to a screen, I ask what the person is trying to find out in the first few seconds, and whether this element helps answer that. If it doesn't, it can wait one level down.",
      },
      {
        type: "quote",
        text: "Dashboard design is largely about prioritization rather than simply displaying more information.",
      },
    ],
  },
];

/* ---------- helpers ---------- */

export const getPosts = () =>
  [...posts].sort((a, b) => b.date.localeCompare(a.date));

export const getPost = (slug: string) =>
  posts.find((p) => p.slug === slug);

export const readingMinutes = (post: Post) => {
  const text = post.body
    .map((b) =>
      b.type === "list"
        ? b.items.join(" ")
        : b.type === "image"
        ? ""
        : b.text
    )
    .join(" ");
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
};

export const formatDate = (iso: string) =>
  new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });