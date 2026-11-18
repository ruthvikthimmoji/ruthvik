import type { Metadata } from "next";
import LabLibrary from "./LabLibrary";

export const metadata: Metadata = {
  title: "The lab — Ruthvik Thimmoji",
  description: "UI explorations, Figma motion studies and 3D work by Ruthvik Thimmoji. Learning in public.",
};

export default function LabPage() {
  return <LabLibrary />;
}
