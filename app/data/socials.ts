// app/data/socials.ts
import { 
  Linkedin, 
  Instagram, 
  Mail, 
  Github, 
  Book, 
  Palette, // Used for Behance
  Cpu,
  Youtube,     // Used for Tech
} from "lucide-react";

export const SOCIAL_LINKS = [
  { 
    name: "LinkedIn", 
    href: "https://www.linkedin.com/in/ruthvik-p-thimmoji-200b1a216/", 
    icon: Linkedin, 
    color: "hover:text-[#0077b5]" 
  },
  { 
    name: "Youtube", 
    href: "https://www.youtube.com/channel/UCV5blT2_sXoZGYyErwqvBoA", 
    icon: Youtube, // Standard Lucide replacement for design work
    color: "hover:text-[#053eff]" 
  },
  { 
    name: "Instagram", 
    href: "https://www.instagram.com/ruthvikdesigns_/", 
    icon: Instagram, 
    color: "hover:text-[#e4405f]" 
  },
  { 
    name: "Email", 
    href: "mailto:thimmojiruthvik@gmail.com", 
    icon: Mail, 
    color: "hover:text-[#ff4f21]" 
  },
  { 
    name: "Medium", 
    href: "https://medium.com/@thimmojiruthvik", 
    icon: Book, 
    color: "hover:text-[#00ab6c]" 
  },
  { 
    name: "Behance", 
    href: "https://www.behance.net/ruthvikthimmoji", 
    icon: Palette, // Standard Lucide replacement for design work
    color: "hover:text-[#053eff]" 
  },
  
  // { 
  //   name: "Tech", 
  //   href: "https://ruthvikthimmoji.vercel.app/", 
  //   icon: Cpu, 
  //   color: "hover:text-[#ff4f21]" 
  // },
  //  { 
  //   name: "Github", 
  //   href: "https://github.com/ruthvikthimmoji	", 
  //   icon: Github, 
  //   color: "hover:text-[#ff4f21]" 
  // },
];