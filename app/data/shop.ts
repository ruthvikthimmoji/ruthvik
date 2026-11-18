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
  price?: string; // "₹999" / "Free"
  href?: string;
  color: "y" | "p" | "g" | "b" | "v";
};

export const PRODUCTS: Product[] = [
  { id: "case-study-kit", name: "Case Study Kit", pitch: "The Figma template I use to structure and present case studies.", kind: "Figma template", status: "building", color: "y" },
  { id: "dashboard-ui-kit", name: "Dashboard UI Kit", pitch: "Tables, filters and charts for B2B and fintech products.", kind: "Figma UI kit", status: "idea", color: "b" },
  { id: "design-system-starter", name: "Design System Starter", pitch: "Tokens, variables and core components to start a system right.", kind: "Figma file", status: "idea", color: "v" },
];

export const STATUS_LABEL: Record<Product["status"], string> = { idea: "Sketching", building: "Building now", live: "Available" };
export const hasLive = () => PRODUCTS.some((p) => p.status === "live");
