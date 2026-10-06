/**
 * Explorations = smaller UI experiments, concepts and shots.
 * Used by:
 *  - components/Explorations.tsx  -> homepage teaser (featured only)
 *  - app/ui-designs/page.tsx      -> full gallery with category filters
 */
export type ExplorationCategory =
  | "Mobile"
  | "Web"
  | "Dashboard"
  | "Components"
  | "Concept";

export type Exploration = {
  id: string;
  title: string;
  category: ExplorationCategory;
  year: string;
  image: string;
  description?: string;
  featured: boolean; // true = shown on the homepage
  link?: string; 
  type: string;// optional Figma / Dribbble / prototype link
};

export const explorationCategories: ExplorationCategory[] = [
  "Mobile",
  "Web",
  "Dashboard",
  "Components",
  "Concept",
];

// TODO: move the items from your OngoingWork component here.
// Example shape:
// {
//   id: "wallet-onboarding",
//   title: "Wallet onboarding",
//   category: "Mobile",
//   year: "2025",
//   image: "/explorations/wallet-onboarding.png",
//   featured: true,
// },
export const explorations: Exploration[] = [];

/* ---------- helpers ---------- */

export const getFeaturedExplorations = () =>
  explorations.filter((e) => e.featured);

export const getExplorationsByCategory = (
  category: ExplorationCategory
) => explorations.filter((e) => e.category === category);