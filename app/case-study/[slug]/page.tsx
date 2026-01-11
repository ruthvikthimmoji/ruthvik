import { caseStudies, CaseStudy } from "@/app/data/case-studies";
import { notFound } from "next/navigation";
import CaseStudyClient from "../CaseStudyClient";

interface PageProps {
  params: Promise<{ slug: string }>; // params is a Promise in App Router
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params; // unwrap the promise

  const project = caseStudies.find(
    (cs) => cs.slug.toLowerCase() === slug.toLowerCase()
  );

  if (!project) notFound();

  return <CaseStudyClient project={project} />;
}
