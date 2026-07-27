import { ReactNode } from "react";

export interface ActiveProject {
  id: string; // Changed from 'String' (the object) to 'string' (the primitive)
  name: string;
  type: string;
  status: 
   | "Tokens" 
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
//   {
//     id: "sport-sea", // String ID
//     name: "SportSea",
//     type: "Marketplace",
//     status: "Final UI Polish",
//     progress: 85,
//     figmaEmbed: "https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fdesign%2FGXwiFAdGEFkC5gY5NYWBJa%2FPortfolio%3Fnode-id%3D4-6213",
//     description: "Currently refining the booking flow and vendor dashboard for a seamless sports experience."
//   },

{
    id: "design-system", // Changed from 3 to a string
    name: "Personal Design System",
    type: "Design System",
    status: "Tokens",
    progress: 20,
   figmaEmbed: "https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fdesign%2F63Gi1TxL2U3uxHe7dRz0Vr%2FPersonal-Design-System-Archive-1%3Fnode-id%3D0-1%26t%3DbcAYfHOz3iQVfu8J-1",
    description: "Designing a Design System "
  },

{
  id: "ram-navami-concept", 
  name: "Ram Navami Concept",
  type: "Event Experience",
  status: "Final Polish", // You mentioned it's not completed yet
  progress: 85,
  figmaEmbed: "https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fdesign%2FGXwiFAdGEFkC5gY5NYWBJa%2FPortfolio%3Fnode-id%3D46-6841%26t%3DKJw03P2gxOMZ2Ext-1",
  description: "Exploring a modern digital tribute for Ram Navami, blending traditional Vedic aesthetics with high-end editorial UI patterns."
},
  {
  // Change this ID to be simple and lowercase
  id: "personal-card", 
  name: "Personal Card",
  type: "Brand Identity",
  status: "Final Polish",
  progress: 95,
  figmaEmbed: "https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fdesign%2FGXwiFAdGEFkC5gY5NYWBJa%2FPortfolio%3Fnode-id%3D43-6653%26t%3DKJw03P2gxOMZ2Ext-1",
  description: "Crafting a high-end physical brand extension for Designuru Studio."
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