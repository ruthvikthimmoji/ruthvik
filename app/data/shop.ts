/* =========================================================
   SHOP — digital products. Coming soon with a waitlist.
   Visitors join via /api/waitlist → you get an email.

   When a product launches: set status "live", add price + href
   (Gumroad, Lemon Squeezy, Figma Community…).
========================================================= */

export type Product = {
  id: string;
  name: string;
  pitch: string; // one line
  kind: string; // "Figma UI kit", "Notion template"…
  status: "idea" | "building" | "live";
  price?: string; // "Free" / "₹999"
  href?: string; // free: Figma Community or file link · paid: Gumroad / Lemon Squeezy
  color: "y" | "p" | "g" | "b" | "v";
};

/* FREE items: status "live" + price "Free" + href → shown under "Free".
   PAID items: status "live" + a price + Gumroad link → "Buy" button.
   Anything not live shows under "Coming soon" with the waitlist. */
export const PRODUCTS: Product[] = [
  // ---- Free ----
  {
    id: "case-study-checklist",
    name: "Case Study Checklist",
    pitch: "10 checks to run before you publish a case study. Figma file + printable page.",
    kind: "Free · Figma",
    status: "live",
    price: "Free",
    href: "https://www.figma.com/community/file/1706980099325669334",
    color: "y",
  },
  {
    id: "portfolio-thumbnails",
    name: "Portfolio Thumbnail Template",
    pitch: "3 project-card layouts, Light + Dark, 1600×1000 — ready for your portfolio, Behance or Dribbble.",
    kind: "Free · Figma",
    status: "live",
    price: "Free",
    href: "https://www.figma.com/community/file/1706981662940101595",
    color: "b",
  },

  // ---- Paid · coming soon ----
  { id: "case-study-kit", name: "Case Study Kit", pitch: "The full Figma template: 10-section case study, 11 components, Light + Dark.", kind: "Figma kit", status: "building", color: "p" },
  { id: "design-system-starter", name: "Design System Starter", pitch: "Tokens, variables and core components to start a system right.", kind: "Figma file", status: "idea", color: "v" },
  { id: "dashboard-ui-kit", name: "Dashboard UI Kit", pitch: "Tables, filters and charts for B2B and fintech products.", kind: "Figma UI kit", status: "idea", color: "g" },
];

export const STATUS_LABEL: Record<Product["status"], string> = { idea: "Sketching", building: "Building now", live: "Available" };
export const isFree = (p: Product) => p.status === "live" && (p.price ?? "").toLowerCase() === "free";
export const hasLive = () => PRODUCTS.some((p) => p.status === "live");
