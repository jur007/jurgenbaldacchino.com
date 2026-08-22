export interface IProject {
  id: string
  title: string
  category: "react" | "canvas" | "tooling"
  categoryLabel: string
  role: string
  timeline: string
  clientOrOrg?: string
  summary: string
  whatIDid: string
  solutions: string
  technologies: string[]
  metrics?: string
  thumbnailUrl: string
  previewColor?: string
  liveUrl?: string
  githubUrl?: string
}

export const showcaseProjects: IProject[] = [
  {
    id: "project-alpha",
    title: "High-Concurrency Web Platform",
    category: "react",
    categoryLabel: "React Architecture",
    role: "Lead Frontend Engineer",
    timeline: "2024 - 2025",
    clientOrOrg: "Enterprise Client",
    summary:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    whatIDid:
      "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Architected core single-page components with strict TypeScript contracts and real-time state synchronization.",
    solutions:
      "Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Implemented granular memoization layers and isolated event streams to maintain 60 FPS rendering under intense data throughput.",
    technologies: ["React", "TypeScript", "TailwindCSS", "WebSockets", "Vite"],
    metrics: "Sub-second real-time sync",
    thumbnailUrl: "/assets/showcase/project-alpha.svg",
    previewColor: "#FF2A4D",
    liveUrl: "https://example.com/demo-alpha",
    githubUrl: "https://github.com/jur007",
  },
  {
    id: "project-beta",
    title: "Interactive 2D Canvas Engine",
    category: "canvas",
    categoryLabel: "Creative / Canvas",
    role: "Creative Developer",
    timeline: "2025",
    clientOrOrg: "Interactive Labs",
    summary:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris.",
    whatIDid:
      "Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Built a performant lifecycle bridge synchronizing React state with WebGL canvas physics.",
    solutions:
      "Curabitur sodales ligula in libero. Sed dignissim lacinia nunc. Curabitur tortor. Pellentesque nibh. Aenean quam. In scelerisque sem at dolor. Applied proactive context destruction on component unmount and lazy asset streaming to keep the bundle footprint minimal.",
    technologies: ["Phaser 3", "WebGL", "HTML5 Canvas", "TypeScript"],
    metrics: "60 FPS on mobile hardware",
    thumbnailUrl: "/assets/showcase/project-beta.svg",
    previewColor: "#00F0FF",
    liveUrl: "https://example.com/demo-beta",
    githubUrl: "https://github.com/jur007",
  },
  {
    id: "project-gamma",
    title: "Frontend Architecture & CI/CD Platform",
    category: "tooling",
    categoryLabel: "Tooling & DX",
    role: "Head of Frontend",
    timeline: "2024 - Present",
    clientOrOrg: "Core Infrastructure",
    summary:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta.",
    whatIDid:
      "Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Standardized multi-repository developer workflows with automated linting gates, commit verification, and edge deployment automation.",
    solutions:
      "Aenean quam. In scelerisque sem at dolor. Maecenas mattis. Sed convallis tristique sem. Proin ut ligula vel nunc egestas porttitor. Configured zero-downtime edge distribution on Cloudflare Pages, decreasing build and deploy turnaround times by 4x.",
    technologies: ["GitHub Actions", "Husky", "Commitlint", "ESLint", "Cloudflare Pages"],
    metrics: "4x faster automated delivery",
    thumbnailUrl: "/assets/showcase/project-gamma.svg",
    previewColor: "#10B981",
    liveUrl: "https://example.com/demo-gamma",
    githubUrl: "https://github.com/jur007",
  },
]
