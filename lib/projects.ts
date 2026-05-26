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
    title: "Studio Manager",
    description:
      "Studio and business management system focused on scheduling, services, clients and daily workflow organization.",
    image: "/projects/studio-manager/studio-manager-dashboard-desktop.png",
    githubUrl: "https://github.com/lucascanutoo/studio-manager",
    tags: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Node.js", "PostgreSQL"],
    accentColor: "#dd7ed0",
  },
  {
    title: "Landing Page",
    description:
      "A responsive landing page built with HTML, CSS and JavaScript, focused on clean layout and UI fundamentals.",
    image: "/projects/landing-page/landing-page-desktop.png",
    githubUrl: "https://github.com/lucascanutoo/landing-page",
    tags: ["HTML", "CSS", "JavaScript"],
    accentColor: "#3B82F6",
  },
];
