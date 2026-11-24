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
  // DRAFTS written with Claude — read each one, change anything that isn't
  // exactly how you'd say it, then set status: "published" and today's date.

  {
    slug: "engineer-to-designer",
    title: "From engineer to designer",
    dek: "What writing code taught me about designing what gets built.",
    date: "2026-11-24",
    tags: ["Career", "Story"],
    status: "drafting",
    body: `I didn't start in design. I started in computer science, learning how software is built one system at a time. For a while I was the person turning other people's designs into HTML, CSS and React.

That's where the switch began. I kept noticing that the hard part of a screen was rarely the code. It was the decisions behind it: what the screen was for, what someone needed to see first, what happened when things went wrong.

## Code taught me to think in systems

When you build front-ends, you learn fast that nothing stands alone. A button lives in a form, the form lives in a flow, and the flow depends on data that may not arrive. I carry that into every design file now. Before I draw a screen, I want to know where it sits in the system and what it depends on.

## Constraints are a design material

Engineers deal with constraints every day: slow networks, missing data, edge cases nobody planned for. Designers sometimes treat these as someone else's problem. I treat them as part of the brief.

- What does this screen look like with no data?
- What happens when the request fails halfway?
- What does the person see while they wait?

Answering these early is cheaper than discovering them in QA.

## Handoff is a conversation, not a file

Because I've been on the receiving end of a design file, I know what makes one easy to build: named components, clear states, real content and notes where the logic isn't obvious. I design the file I would have wanted as a developer.

> Good design is mostly hierarchy. Good handoff is mostly empathy.

## What I'd tell someone making the same switch

Your technical background isn't something to hide. It's a lens. You'll ask better questions, spot problems earlier and earn trust from engineers faster. The new skill to build is the one that sits before the code: understanding people well enough to know what's worth building at all.

I still write code. I just write a lot less of it before I've talked to someone.`,
  },

  {
    slug: "hisaab-never-holds-your-money",
    title: "Why Hisaab never holds your money",
    dek: "A design decision about trust in a group expense app.",
    date: "2026-11-24",
    tags: ["Case notes", "FinTech"],
    status: "drafting",
    body: `Hisaab is a group expense app I designed: track who paid what, then settle up. Early on I made one decision that shaped everything after it. Hisaab never holds the money.

## The problem with holding money

Most split apps either stop at the maths or ask you to move money through their own wallet. The first leaves the awkward part, actually paying, to you. The second asks for a level of trust a new app hasn't earned. People are understandably careful about where their money sits.

## Settle through the app people already trust

In India, almost everyone already has a UPI app they use daily. So instead of building a wallet, Hisaab hands the payment to that app. You tap **Settle**, pick Google Pay, PhonePe, Paytm or another UPI app, and the amount and recipient are already filled in.

That one choice simplified the product:

- No wallet, no balance to explain, no withdrawal flow.
- No new place for people's money to get stuck.
- Settling feels familiar, because it's the app they use every day.

## Designing the moment after you pay

Handing off to another app creates a gap: Hisaab can't be certain the payment went through. So the design treats confirmation as a clear, separate step instead of assuming success. The person who received the money can confirm it, and the balance updates for the whole group.

> The goal was never to move money. It was to end the awkward conversation about money.

## What I took away

Sometimes the strongest design decision is what you choose not to build. Leaving the money out of Hisaab made it simpler to use, easier to trust and smaller to ship.`,
  },

  {
    slug: "designing-offline-first-buildbook",
    title: "Designing offline-first for a building site",
    dek: "Notes from Buildbook, a house-build tracker that works without signal.",
    date: "2026-11-24",
    tags: ["Case notes", "Product"],
    status: "drafting",
    body: `Buildbook started from a real problem: tracking every rupee and every workday of a house build. Agreements, payments, materials, the site diary, milestones, vendors and budget, all in one place.

The first constraint was the one that shaped the rest: a building site often has poor or no signal.

## Offline is the default, not the error state

Most apps treat offline as an edge case and show an error. On a site, offline is normal. So in Buildbook every action works without a connection: log a delivery, add a diary entry, record a payment. Changes save on the phone and sync when the signal returns.

That meant designing for states most apps never show:

- **Saved on this phone:** recorded but not yet synced.
- **Syncing:** on its way.
- **Synced:** safely stored.

Each needed to be visible without being alarming. A small, calm indicator works better than a banner shouting that you're offline.

## Your data, in a sheet you already own

Instead of locking data inside the app, Buildbook syncs to the owner's own Google Sheet. People already trust spreadsheets, can share them with family or an accountant, and keep their records even if they stop using the app.

## Two screens, two jobs

The desktop app is for planning: budgets, payment schedules, the overview. The mobile app is for the site: quick entries with one hand, big tap targets, minimal typing. Same data, two very different moments, so I designed them as two different tools instead of one squeezed layout.

> Design for where people actually are, not where your Wi-Fi is.

## What I'd do again

Start with the hardest real-world constraint and let it lead. Offline-first forced clearer states, simpler forms and more honest feedback, and those made the app better even with full signal.`,
  },

  {
    slug: "one-system-every-mode",
    title: "One system, every mode",
    dek: "What building Lattice taught me about Figma variables.",
    date: "2026-11-24",
    tags: ["Design systems", "Figma"],
    status: "drafting",
    body: `Lattice is a themeable design system I built solo in Figma. The goal was simple to say and hard to do: one set of components that works in Light, Dark, Default and Compact, without a separate variant for every combination.

## The variant explosion problem

The traditional way to support themes and density is variants: Button / Light / Default, Button / Dark / Compact, and so on. Multiply that across every component and state and the library becomes impossible to maintain. Every change has to be made many times.

## Let variables carry the differences

Figma variables with modes change the approach. Instead of drawing the dark button, you define what dark means once: background, text, border, focus colour. Spacing and size work the same way for density. Components reference the variables, and switching a mode switches everything.

The result: far fewer variants, and a change to a token updates every component that uses it.

## Structure the tokens in layers

What made it work was naming tokens in two layers:

1. **Primitives:** the raw values, like a blue at a certain lightness.
2. **Semantic tokens:** what a value is for, like a primary action background or subtle text.

Components only use semantic tokens. That way a theme can remap meanings without anyone touching a component.

## Accessibility has to hold in every mode

A colour that passes contrast in Light can fail in Dark. I checked text and interactive contrast against WCAG AA in both themes, and adjusted the semantic tokens rather than individual components.

> A design system isn't a library of parts. It's a set of decisions you only have to make once.

## What's next

I'm now applying the same thinking to motion: defining timing and easing as tokens, so animations stay consistent across components the way colour and spacing do.`,
  },
];

export const publishedPosts = () =>
  POSTS.filter((p) => p.status === "published").sort((a, b) => b.date.localeCompare(a.date));
export const draftPosts = () => POSTS.filter((p) => p.status === "drafting");
export const getPost = (slug: string) => POSTS.find((p) => p.slug === slug && p.status === "published" && p.body);
export const fmtDate = (d: string) =>
  new Date(`${d}T00:00:00`).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
export const readMins = (body = "") => Math.max(1, Math.round(body.split(/\s+/).length / 220));
