export type ProjectCard = {
  slug: string; // this will be used to match case studies
  title: string;
  description: string;
  tag: string;
  image: string;
};

export const projects: ProjectCard[] = [
  {
    slug: "sportsea",
    title: "SportSea",
    description: "Sports experience booking platform",
    tag: "Mobile App",
    image: "/projects/11.png",
  },
  {
    slug: "another-project",
    title: "Another Project",
    description: "Just a demo project",
    tag: "Web App",
    image: "/projects/client11.png",
  },
];
