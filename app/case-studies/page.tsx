import UIDesignsClient from "@/app/ui-designs/UIDesignsClient"; // Ensure this path is correct

export const metadata = {
  title: "UI Designs | Ruthvik P Thimmoji",
  description:
    "A curated collection of UI designs for SaaS, mobile apps, and web products.",
};

export default function UIDesignsPage() {
  // This tells Next.js: "Use the metadata above, but show the UI from the Client file"
  return <UIDesignsClient />;
}
