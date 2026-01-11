import { projects } from "@/app/data/projects";
import { notFound } from "next/navigation";
import CaseStudyClient from "../CaseStudyClient";

/* ---------------------------------------------
   CASE STUDY TYPE
--------------------------------------------- */
export type CaseStudy = {
  slug: string;
  title: string;
  tagline: string;
  role: string;
  duration: string;
  tools: string[];
  problem: string;
  solution: string;
  outcome: string;
  figmaEmbed: string;
};

/* ---------------------------------------------
   TYPE GUARD
--------------------------------------------- */
function isCaseStudy(project: any): project is CaseStudy {
  return (
    typeof project.slug === "string" &&
    typeof project.title === "string" &&
    typeof project.tagline === "string" &&
    typeof project.role === "string" &&
    typeof project.duration === "string" &&
    Array.isArray(project.tools) &&
    typeof project.problem === "string" &&
    typeof project.solution === "string" &&
    typeof project.outcome === "string" &&
    typeof project.figmaEmbed === "string"
  );
}

/* ---------------------------------------------
   FILTER + ASSERT (IMPORTANT)
--------------------------------------------- */
const caseStudies = projects.filter(isCaseStudy) as unknown as CaseStudy[];

/* ---------------------------------------------
   SEO METADATA
--------------------------------------------- */
export function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const project = caseStudies.find((p) => p.slug === params.slug);

  if (!project) return {};

  return {
    title: `${project.title} – UI/UX Case Study`,
    description: project.tagline,
    openGraph: {
      title: project.title,
      description: project.tagline,
    },
  };
}

/* ---------------------------------------------
   PAGE
--------------------------------------------- */
export default function Page({
  params,
}: {
  params: { slug: string };
}) {
  const project = caseStudies.find((p) => p.slug === params.slug);

  if (!project) notFound();

  return <CaseStudyClient project={project} />;
}
