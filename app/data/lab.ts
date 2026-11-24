/* =========================================================
   THE LAB — UI shots, Figma motion studies and 3D work.
   Everything on the canvas Lab frame and the /lab page
   comes from this file.

   HOW TO ADD A PIECE
   1. Put the file in /public/lab/  (e.g. /public/lab/ui-checkout.png)
      - UI:      .png / .jpg / .webp  (1600px wide is plenty)
      - Motion:  export from Figma as .mp4 or .webm (muted, < 4 MB).
                 GIFs work too but are much heavier.
      - 3D:      a render (.png/.jpg) or a turntable .mp4
   2. Add an entry below with src: "/lab/your-file.ext".
      Entries with src: "" show as "coming soon" slots.
   3. Newest first — order here is the order on the site.
========================================================= */

export type LabKind = "ui" | "motion" | "3d";

export type LabItem = {
  id: string; // unique, url-safe
  kind: LabKind;
  title: string;
  note?: string; // one line: what you were exploring
  src: string; // "/lab/file.png" | "/lab/file.mp4" | "" (slot)
  poster?: string; // still frame for videos (optional)
  tool: string; // "Figma", "Figma · Smart Animate", "Blender"…
  date: string; // "Nov 2026"
  href?: string; // optional link out (Dribbble, Behance, Figma prototype)
  ratio?: "wide" | "square" | "tall"; // tile shape, default "wide"
};

export const LAB_KINDS: Record<LabKind, { label: string; blurb: string; status: string }> = {
  ui: { label: "UI explorations", blurb: "Screens, shots and small interface ideas outside client work.", status: "ongoing" },
  motion: { label: "Motion", blurb: "Figma Smart Animate and prototype studies. Learning in public.", status: "learning" },
  "3d": { label: "3D", blurb: "Modelling and rendering. The first steps, documented.", status: "just started" },
};

export const LAB: LabItem[] = [
  // ---- UI ---- files live in /public/ui/ (add more below; first 3 show on the canvas)
  { id: "ui-amzonproductpage", kind: "ui", title: "Amazon product page", note: "Redesign concept · not affiliated", src: "/ui/amzonproductpage.png", tool: "Figma", date: "2025–26" },
  { id: "ui-bankappredesign", kind: "ui", title: "Banking app redesign", note: "Redesign concept", src: "/ui/bankappredesign.png", tool: "Figma", date: "2025–26" },
  { id: "ui-blinkitcheckout", kind: "ui", title: "Blinkit checkout", note: "Redesign concept · not affiliated", src: "/ui/blinkitcheckout.png", tool: "Figma", date: "2025–26" },
  { id: "ui-bookingcom", kind: "ui", title: "Booking.com", note: "Redesign concept · not affiliated", src: "/ui/bookingcom.png", tool: "Figma", date: "2025–26" },
  { id: "ui-district", kind: "ui", title: "District", note: "Redesign concept · not affiliated", src: "/ui/district.png", tool: "Figma", date: "2025–26" },
  { id: "ui-furlrncoui", kind: "ui", title: "Furlenco", note: "Redesign concept · not affiliated", src: "/ui/furlrncoui.png", tool: "Figma", date: "2025–26" },
  { id: "ui-financeapp", kind: "ui", title: "Finance app", src: "/ui/financeapp.png", tool: "Figma", date: "2025–26" },
  { id: "ui-insuapp", kind: "ui", title: "Insurance app", src: "/ui/insuapp.png", tool: "Figma", date: "2025–26" },
  { id: "ui-learning-app", kind: "ui", title: "Learning app", src: "/ui/learning%20app.png", tool: "Figma", date: "2025–26" },
  { id: "ui-dailytaskapp", kind: "ui", title: "Daily task app", src: "/ui/dailytaskapp.png", tool: "Figma", date: "2025–26" },
  { id: "ui-maintainenceapp", kind: "ui", title: "Maintenance app", src: "/ui/maintainenceapp.png", tool: "Figma", date: "2025–26" },
  { id: "ui-cartpage", kind: "ui", title: "Cart page", src: "/ui/cartpage.png", tool: "Figma", date: "2025–26" },
  { id: "ui-login", kind: "ui", title: "Login screen", src: "/ui/login.png", tool: "Figma", date: "2025–26" },
  { id: "ui-jpay", kind: "ui", title: "JuzzPay — early exploration", src: "/ui/jpay.png", tool: "Figma", date: "2025–26" },
  { id: "ui-juz", kind: "ui", title: "JuzzPay — dashboard study", src: "/ui/juz.png", tool: "Figma", date: "2025–26" },
  { id: "ui-comp1", kind: "ui", title: "Composition study", src: "/ui/COMP1.png", tool: "Figma", date: "2025–26" },
  { id: "ui-musicplayer", kind: "ui", title: "Music player", src: "/ui/musicplayer%20.png", tool: "Figma", date: "2025–26" },
  { id: "ui-notesapp", kind: "ui", title: "Notes app", src: "/ui/notesapp.png", tool: "Figma", date: "2025–26" },
  { id: "ui-onboardingui", kind: "ui", title: "Onboarding UI", src: "/ui/onboardingui.png", tool: "Figma", date: "2025–26" },
  { id: "ui-onboardingui2", kind: "ui", title: "Onboarding UI — v2", src: "/ui/onboardingui2.png", tool: "Figma", date: "2025–26" },
  { id: "ui-personalfinance", kind: "ui", title: "Personal finance app", src: "/ui/personalfinance.png", tool: "Figma", date: "2025–26" },
  { id: "ui-photojournal", kind: "ui", title: "Photo journal", src: "/ui/photojournal.png", tool: "Figma", date: "2025–26" },
  { id: "ui-riderapp", kind: "ui", title: "Rider app", src: "/ui/riderapp.png", tool: "Figma", date: "2025–26" },
  { id: "ui-socialmediaprofile", kind: "ui", title: "Social media profile", src: "/ui/socialmediaprofile.png", tool: "Figma", date: "2025–26" },
  { id: "ui-successfailure", kind: "ui", title: "Success & failure states", src: "/ui/successfailure.png", tool: "Figma", date: "2025–26" },
  { id: "ui-trip1", kind: "ui", title: "Trip planner", src: "/ui/trip1.png", tool: "Figma", date: "2025–26" },
  { id: "ui-upicircle", kind: "ui", title: "UPI Circle", src: "/ui/upicircle.png", tool: "Figma", date: "2025–26" },
  { id: "ui-01", kind: "ui", title: "UI study 01", src: "/ui/01.png", tool: "Figma", date: "2025–26" },
  { id: "ui-02", kind: "ui", title: "UI study 02", src: "/ui/02.png", tool: "Figma", date: "2025–26" },
  { id: "ui-03", kind: "ui", title: "UI study 03", src: "/ui/03.png", tool: "Figma", date: "2025–26" },
  { id: "ui-04", kind: "ui", title: "UI study 04", src: "/ui/04.png", tool: "Figma", date: "2025–26" },

  // ---- Motion ---- READY FOR YOUR WORK
  // 1. Export from Figma as .mp4 (muted, < 4 MB) → /public/lab/motion-name.mp4
  // 2. Set src below (and optional poster: a still .png), or duplicate a line.
  // Entries with src: "" show as "coming soon" slots.
  { id: "motion-01", kind: "motion", title: "Button micro-interactions", note: "Smart Animate · hover, press, success", src: "", tool: "Figma · Smart Animate", date: "2026" },
  { id: "motion-02", kind: "motion", title: "Card stack transition", src: "", tool: "Figma · Prototype", date: "2026" },
  { id: "motion-03", kind: "motion", title: "Onboarding flow", src: "", tool: "Figma · Prototype", date: "2026" },

  // ---- 3D ---- READY FOR YOUR WORK
  // A render (.png/.jpg) or a turntable .mp4 → /public/lab/3d-name.png, then set src.
  { id: "3d-01", kind: "3d", title: "First render", note: "Lighting and materials basics", src: "", tool: "Blender", date: "2026", ratio: "square" },
  { id: "3d-02", kind: "3d", title: "Product shot", src: "", tool: "Blender", date: "2026", ratio: "square" },
  { id: "3d-03", kind: "3d", title: "Turntable study", src: "", tool: "Blender", date: "2026" },
];

export const isVideo = (src: string) => /\.(mp4|webm|mov)$/i.test(src);
export const labByKind = (kind: LabKind) => LAB.filter((i) => i.kind === kind);
export const labFilled = (kind?: LabKind) => LAB.filter((i) => i.src && (!kind || i.kind === kind));
