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
    tag: "Mobile and Web App",
    image: "/projects/sportsea1.png",
  },
  {
  slug: "juzzpay",
  title: "JuzzPay",
  description:
    "Dashboard-first personal finance platform enabling real-time visibility, smart transaction tracking, and actionable insights through a clean, user-friendly UI.",
  tag: "FinTech Dashboard",
  image: "/projects/juzzpay.png",
},
{
  slug: "health-insurance-app",
  title: "Health Insurance App",
  description:
    "A mobile-first insurance experience that simplifies hospital discovery, claims tracking, and policy renewals with a clear, stress-free interface designed for critical moments.",
  tag: "InsurTech App",
  image: "/projects/insurance.png",
},


];
