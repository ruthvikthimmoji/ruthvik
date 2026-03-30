import { ReactNode } from "react";

export interface ActiveProject {
  id: string; // Changed from 'String' (the object) to 'string' (the primitive)
  name: string;
  type: string;
  status: 
    | "Wireframing" 
    | "UI Design" 
    | "User Testing" 
    | "Final Polish" 
    | "Development" 
    | "Final UI Polish";
  progress: number;
  figmaEmbed?: string; // Added this since you are using it in SportSea
  description: ReactNode; 
  link?: string;
}

export const activeProjects: ActiveProject[] = [
  {
    id: "sport-sea", // String ID
    name: "SportSea",
    type: "Marketplace",
    status: "Final UI Polish",
    progress: 85,
    figmaEmbed: "https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fdesign%2FGXwiFAdGEFkC5gY5NYWBJa%2FPortfolio%3Fnode-id%3D4-6213",
    description: "Currently refining the booking flow and vendor dashboard for a seamless sports experience."
  },
  {
    id: "fintech-wallet", // Changed from 2 to a string to match the interface
    name: "Fintech Wallet",
    type: "Crypto SaaS",
    status: "User Testing",
    progress: 65,
    figmaEmbed: "https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fdesign%2FGXwiFAdGEFkC5gY5NYWBJa%2FPortfolio%3Fnode-id%3D4-6213",
    description: "Building a secure and intuitive interface for digital asset management."
  },
  {
    id: "f1-editorial", // Changed from 3 to a string
    name: "F1 Editorial",
    type: "Landing Page",
    status: "Wireframing",
    progress: 30,
    figmaEmbed: "https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fdesign%2FGXwiFAdGEFkC5gY5NYWBJa%2FPortfolio%3Fnode-id%3D35-6507%26t%3DKJw03P2gxOMZ2Ext-1",
    description: "Designing a high-octane editorial experience for Formula 1 fans."
  },
];