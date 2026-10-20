/**
 * UI gallery data (app/ui-designs).
 * Files live in /public/ui/. Order here = display order.
 *
 * `category` can be one value or several (e.g. ["web", "mobile"]); the item
 * then shows under each of those filters.
 */

export type UIDesignCategory =
  | "mobile"
  | "web"
  | "dashboard"
  | "components"
  | "concept"
  | "branding";

export type UIDesign = {
  id: string; // must be unique
  title: string;
  subtitle?: string;
  image: string;
  category: UIDesignCategory | UIDesignCategory[];
  link?: string; // optional external link (Figma / Dribbble) shown in the lightbox
};

export const categoriesOf = (design: UIDesign): UIDesignCategory[] =>
  Array.isArray(design.category) ? design.category : [design.category];

export const uiDesigns: UIDesign[] = [
  {
    id: "33",
    title: "Tripmate Travelling App",
    subtitle: "Your travelling partner",
    image: "/ui/trip1.png",
    category: "mobile",
  },
  {
    id: "1",
    title: "Insurance Application UI",
    subtitle: "Mobile Interface",
    image: "/ui/insuapp.png",
    category: "mobile",
  },
  {
    id: "27",
    title: "JuzzPay",
    subtitle: "Dashboard-first personal finance platform",
    image: "/ui/juz.png",
    category: "web",
  },
  {
    id: "28",
    title: "SportSea",
    subtitle: "Sports experience booking",
    image: "/ui/sea1.png",
    category: ["web", "mobile"],
  },
  {
    id: "2",
    title: "Daily Tasks App UI",
    subtitle: "Mobile Interface",
    image: "/ui/dailytaskapp.png",
    category: "mobile",
  },
  {
    id: "3",
    title: "Language Learning App UI",
    subtitle: "Mobile Interface",
    image: "/ui/learning app.png",
    category: "mobile",
  },
  {
    id: "4",
    title: "Music Player Interface UI",
    subtitle: "Mobile Interface",
    image: "/ui/musicplayer .png",
    category: "mobile",
  },
  {
    id: "5",
    title: "Login Page Mobile App UI",
    subtitle: "Mobile Interface",
    image: "/ui/login.png",
    category: "mobile",
  },
  {
    id: "6",
    title: "Amazon Product Page Redesign UI",
    subtitle: "Mobile Interface",
    image: "/ui/amzonproductpage.png",
    category: "mobile",
  },
  {
    id: "29",
    title: "Login Screen Web UI",
    subtitle: "Onboarding made simple",
    image: "/ui/01.png",
    category: "web",
  },
  {
    id: "7",
    title: "Bank Application Redesign UI",
    subtitle: "Mobile Interface",
    image: "/ui/bankappredesign.png",
    category: "mobile",
  },
  {
    id: "8",
    title: "Blinkit Checkout Page Redesign UI",
    subtitle: "Mobile Interface",
    image: "/ui/blinkitcheckout.png",
    category: "mobile",
  },
  {
    id: "9",
    title: "Booking.com Page Redesign UI",
    subtitle: "Mobile Interface",
    image: "/ui/bookingcom.png",
    category: "mobile",
  },
  {
    id: "10",
    title: "Items Cart Page UI",
    subtitle: "Mobile Interface",
    image: "/ui/cartpage.png",
    category: "mobile",
  },
  {
    id: "30",
    title: "Apple Watch Product Page Design UI",
    subtitle: "Product page animations",
    image: "/ui/02.png",
    category: "web",
  },
  {
    id: "11",
    title: "District Restaurant Page Redesign UI",
    subtitle: "Mobile Interface",
    image: "/ui/district.png",
    category: "mobile",
  },
  {
    id: "12",
    title: "Finance Application UI",
    subtitle: "Mobile Interface",
    image: "/ui/financeapp.png",
    category: "mobile",
  },
  {
    id: "13",
    title: "Furlenco Page Redesign UI", // check spelling against the real brand
    subtitle: "Mobile Interface",
    image: "/ui/furlrncoui.png",
    category: "mobile",
  },
  {
    id: "14",
    title: "JPay Finance App UI",
    subtitle: "Mobile Interface",
    image: "/ui/jpay.png",
    category: "mobile", // was missing in the old data
  },
  {
    id: "15",
    title: "Maintenance App UI",
    subtitle: "Mobile Interface",
    image: "/ui/maintainenceapp.png",
    category: "mobile",
  },
  {
    id: "16",
    title: "Notes App UI",
    subtitle: "Mobile Interface",
    image: "/ui/notesapp.png",
    category: "mobile",
  },
  {
    id: "31",
    title: "Landing Page Design UI",
    subtitle: "Visually appealing landing page",
    image: "/ui/03.png",
    category: "web",
  },
  {
    id: "17",
    title: "Onboarding UI",
    subtitle: "Mobile Interface",
    image: "/ui/onboardingui.png",
    category: "mobile",
  },
  {
    id: "18",
    title: "Onboarding UI 2",
    subtitle: "Mobile Interface",
    image: "/ui/onboardingui2.png",
    category: "mobile",
  },
  {
    id: "19",
    title: "Personal Finance UI",
    subtitle: "Mobile Interface",
    image: "/ui/personalfinance.png",
    category: "mobile",
  },
  {
    id: "20",
    title: "Photo Journal Selling Application UI",
    subtitle: "Mobile Interface",
    image: "/ui/photojournal.png",
    category: "mobile",
  },
  {
    id: "32",
    title: "Landing Page Design UI",
    subtitle: "Simple landing page",
    image: "/ui/04.png",
    category: "web",
  },
  {
    id: "21",
    title: "Ride Booking Application UI",
    subtitle: "Mobile Interface",
    image: "/ui/riderapp.png",
    category: "mobile",
  },
  {
    id: "22",
    title: "Social Media Profile Page UI",
    subtitle: "Mobile Interface",
    image: "/ui/socialmediaprofile.png",
    category: "mobile",
  },
  {
    id: "23",
    title: "Success & Failure UI",
    subtitle: "Mobile Interface",
    image: "/ui/successfailure.png",
    category: "mobile",
  },
  {
    id: "24",
    title: "UPI Circle Redesign UI",
    subtitle: "Mobile Interface",
    image: "/ui/upicircle.png",
    category: "mobile",
  },
  {
    id: "25",
    title: "More Uploading",
    image: "/ui/more.png",
    category: "web",
  },
  {
    id: "26",
    title: "Finance Widgets",
    image: "/ui/COMP1.png",
    category: "components",
  },
  {
    id: "34", // was a duplicate "33"
    title: "More Uploading",
    image: "/ui/more.png",
    category: "components",
  },
];