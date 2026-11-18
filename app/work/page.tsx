import type { Metadata } from "next";
import WorkLibrary from "./WorkLibrary";

export const metadata: Metadata = {
  title: "All work — Ruthvik Thimmoji",
  description: "Every product design project by Ruthvik Thimmoji: client work, professional work and personal concepts.",
};

export default function WorkPage() {
  return <WorkLibrary />;
}
