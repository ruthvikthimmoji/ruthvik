/* =========================================================
   WRITING — your blog. Canvas "Writing" frame + /writing.

   Two kinds of post:
   • Written here  → status "published" + body (simple markdown, below)
   • Written elsewhere (Medium, LinkedIn, Substack) → status
     "published" + href. The card links out; no body needed.
   • status "drafting" → shows on the canvas as a sticky
     "in my drafts" note. No page is generated.

   BODY FORMAT (one blank line between blocks):
     ## Heading
     A normal paragraph. **bold** and *italic* and [links](https://…)
     - bullet
     - bullet
     > A pull quote
     ![Alt text](/writing/image.png)
========================================================= */

export type Post = {
  slug: string;
  title: string;
  dek: string; // one-line summary
  date: string; // "2026-11-18"
  tags: string[];
  status: "published" | "drafting";
  href?: string; // external post
  body?: string; // post written here
};

export const POSTS: Post[] = [
  // ---- drafts: replace with your real ideas, flip to "published" when ready ----
  {
    slug: "engineer-to-designer",
    title: "From engineer to designer",
    dek: "What writing code taught me about designing what gets built.",
    date: "2026-12-01",
    tags: ["Career", "Story"],
    status: "drafting",
  },
  {
    slug: "designing-a-cms-for-educators",
    title: "Designing a CMS teachers actually use",
    dek: "Lessons from rebuilding the Studycrux content tools.",
    date: "2026-12-15",
    tags: ["Case notes", "EdTech"],
    status: "drafting",
  },
  {
    slug: "learning-motion-in-figma",
    title: "Learning motion in Figma, week by week",
    dek: "A public log of Smart Animate experiments.",
    date: "2027-01-05",
    tags: ["Motion", "Learning"],
    status: "drafting",
  },
];

export const publishedPosts = () =>
  POSTS.filter((p) => p.status === "published").sort((a, b) => b.date.localeCompare(a.date));
export const draftPosts = () => POSTS.filter((p) => p.status === "drafting");
export const getPost = (slug: string) => POSTS.find((p) => p.slug === slug && p.status === "published" && p.body);
export const fmtDate = (d: string) =>
  new Date(`${d}T00:00:00`).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
export const readMins = (body = "") => Math.max(1, Math.round(body.split(/\s+/).length / 220));
