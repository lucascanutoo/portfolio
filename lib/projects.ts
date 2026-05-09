export interface Project {
  title: string;
  subtitle?: string;
  description: string;
  image?: string;
  video?: string;
  liveUrl?: string;
  githubUrl: string;
  tags: string[];
  accentColor: string;
}

export const projects: Project[] = [
  {
    title: "SaaS Dashboard",
    subtitle: "Analytics and operations workspace",
    description:
      "A responsive dashboard with authentication, charts, filtered tables, and a clean workflow for managing business data.",
    githubUrl: "https://github.com/lucascanutoo",
    tags: ["Next.js", "TypeScript", "TailwindCSS", "PostgreSQL", "Prisma"],
    accentColor: "#FF4040",
  },
  {
    title: "E-commerce Platform",
    subtitle: "Product catalog and checkout flow",
    description:
      "A modern storefront with product pages, cart state, checkout screens, and reusable components built for conversion.",
    githubUrl: "https://github.com/lucascanutoo",
    tags: ["React", "Next.js", "Stripe", "Node.js", "MongoDB"],
    accentColor: "#3B82F6",
  },
  {
    title: "Task Manager API",
    description:
      "A REST API for teams to manage tasks, projects, roles, and notifications with validation and secure access control.",
    githubUrl: "https://github.com/lucascanutoo",
    tags: ["Node.js", "Express", "JWT", "Zod", "MongoDB"],
    accentColor: "#FF8C00",
  },
  {
    title: "AI Content Tool",
    subtitle: "Prompt-based productivity app",
    description:
      "A web application that helps generate, edit, and organize content using AI-assisted workflows and saved user history.",
    githubUrl: "https://github.com/lucascanutoo",
    tags: ["Next.js", "AI SDK", "MongoDB", "API Routes", "Shadcn UI"],
    accentColor: "#8B5CF6",
  },
];
