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
  // ---- UI ---- (replace these slots with your shots)
  { id: "ui-01", kind: "ui", title: "Fintech dashboard shot", note: "Dense data, calm hierarchy", src: "", tool: "Figma", date: "2026" },
  { id: "ui-02", kind: "ui", title: "Onboarding flow", note: "Three screens, one decision each", src: "", tool: "Figma", date: "2026" },
  { id: "ui-03", kind: "ui", title: "Mobile checkout", src: "", tool: "Figma", date: "2026" },

  // ---- Motion ----
  { id: "motion-01", kind: "motion", title: "Button micro-interactions", note: "Smart Animate · hover, press, success", src: "", tool: "Figma · Smart Animate", date: "2026" },
  { id: "motion-02", kind: "motion", title: "Card stack transition", src: "", tool: "Figma · Prototype", date: "2026" },

  // ---- 3D ----
  { id: "3d-01", kind: "3d", title: "First render", note: "Lighting and materials basics", src: "", tool: "Blender", date: "2026", ratio: "square" },
];

export const isVideo = (src: string) => /\.(mp4|webm|mov)$/i.test(src);
export const labByKind = (kind: LabKind) => LAB.filter((i) => i.kind === kind);
export const labFilled = (kind?: LabKind) => LAB.filter((i) => i.src && (!kind || i.kind === kind));
