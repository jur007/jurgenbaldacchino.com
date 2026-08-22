export type ProjectCategory = "all" | "react" | "canvas"

export interface IProject {
  id: string
  title: string
  subtitle: string
  category: "react" | "canvas"
  categoryLabel: string
  role: string
  timeline: string
  clientOrOrg: string
  summary: string
  whatIDid: string[]
  technicalSolutions: string[]
  technologies: string[]
  metrics?: string
  thumbnailUrl: string
  liveUrl?: string
  badgeColor?: string
}

export const showcaseProjects: IProject[] = [
  {
    id: "metaspins-platform",
    title: "Metaspins Web Platform",
    subtitle: "Next-Gen Crypto Casino Web Application",
    category: "react",
    categoryLabel: "React Architecture",
    role: "Head of Frontend",
    timeline: "2023 - Present",
    clientOrOrg: "Metaspins",
    summary:
      "Architected and scaled the flagship crypto casino web application from foundation to high-volume production, delivering high-performance UI and real-time state management.",
    whatIDid: [
      "Led frontend architectural strategy, core state orchestration, and team delivery standards.",
      "Engineered dynamic real-time crypto wallet balance synchronization and transaction tracking.",
      "Enforced automated CI/CD quality gates, bundle optimization, and strict TypeScript patterns across the frontend repository.",
    ],
    technicalSolutions: [
      "Architected an isolated reactive state layer between high-frequency WebSocket balance tickers and the UI, ensuring smooth 60 FPS renders.",
      "Implemented progressive bundle chunking and asset pre-caching to achieve sub-second Largest Contentful Paint (LCP).",
    ],
    technologies: ["React", "TypeScript", "Vite", "WebSockets", "TailwindCSS", "Cloudflare"],
    metrics: "Sub-second load times & 60 FPS UI",
    thumbnailUrl: "/assets/showcase/metaspins.png",
    liveUrl: "https://metaspins.com",
    badgeColor: "#00F0FF",
  },
  {
    id: "mines-classic-game",
    title: "Mines Classic",
    subtitle: "Custom 2D Canvas & WebGL Game Engine",
    category: "canvas",
    categoryLabel: "Creative / Canvas",
    role: "Lead Game Developer & Creative Engineer",
    timeline: "2024",
    clientOrOrg: "Independent Production",
    summary:
      "Custom built 2D interactive canvas game built from the ground up as a standalone package with high-performance WebGL rendering and physics.",
    whatIDid: [
      "Engineered the complete 2D interactive canvas game loop, custom particle systems, and sprite animations using Phaser 3.",
      "Architected a clean bidirectional state bridge connecting reactive UI controls with imperative WebGL game states.",
      "Packaged the game as a modular, decoupled standalone bundle for integration into external host platforms.",
    ],
    technicalSolutions: [
      "Implemented strict context lifecycle management with automatic WebGL memory cleanup on unmount to eliminate GPU leaks.",
      "Optimized texture atlases and frame rendering budgets to maintain steady 60 FPS across low-tier mobile devices.",
    ],
    technologies: ["Phaser 3", "HTML5 Canvas", "WebGL", "TypeScript", "Vite"],
    metrics: "Steady 60 FPS on mobile web",
    thumbnailUrl: "/assets/showcase/mines.png",
    badgeColor: "#FF6B00",
  },
  {
    id: "guts-sportsbook",
    title: "Guts Sportsbook",
    subtitle: "Modern Architecture Rewrite & Real-Time Betting Suite",
    category: "react",
    categoryLabel: "React Architecture",
    role: "Senior Frontend Engineer",
    timeline: "2021 - 2023",
    clientOrOrg: "Guts.com",
    summary:
      "Full architectural overhaul of the legacy sportsbook platform into a modular, high-concurrency React frontend engine.",
    whatIDid: [
      "Re-engineered legacy monolithic frontend into maintainable, modular React component architecture.",
      "Built multi-market slip validation, live odds streaming, and multi-tier combination bet builder logic.",
      "Standardized reusable betting market UI components across desktop and mobile viewports.",
    ],
    technicalSolutions: [
      "Decoupled calculation engines from DOM rendering, eliminating UI lag during rapid live market odds shifts.",
      "Optimized network payload serialization for high-frequency WebSocket match event feeds.",
    ],
    technologies: ["React", "TypeScript", "Redux Toolkit", "WebSockets", "SCSS Modules"],
    metrics: "Zero-latency betslip interaction",
    thumbnailUrl: "/assets/showcase/guts.png",
    liveUrl: "https://guts.com",
    badgeColor: "#E11D48",
  },
  {
    id: "rizk-sportsbook",
    title: "Rizk Sportsbook",
    subtitle: "High-Traffic Live Sports Betting Platform",
    category: "react",
    categoryLabel: "React Architecture",
    role: "Senior Frontend Engineer",
    timeline: "2020 - 2022",
    clientOrOrg: "Rizk.com",
    summary:
      "Implemented the flagship Rizk Sportsbook platform with heavy traffic resilience, dark-mode visual hierarchy, and responsive live market tracking.",
    whatIDid: [
      "Built high-frequency live betting interfaces, event category hierarchies, and responsive live match visualizations.",
      "Integrated branding design tokens and custom iconography into a shared multi-brand frontend core.",
    ],
    technicalSolutions: [
      "Implemented virtualized lists for large sportsbook market trees, maintaining 60 FPS scrolling on mobile browsers.",
      "Enforced strict accessibility (a11y) and keyboard navigation across complex betting dialogs.",
    ],
    technologies: ["React", "TypeScript", "State Machines", "CSS Modules"],
    metrics: "High-traffic concurrency resilience",
    thumbnailUrl: "/assets/showcase/rizk.png",
    liveUrl: "https://rizk.com",
    badgeColor: "#FACC15",
  },
  {
    id: "wetten-sportsbook",
    title: "Wetten.com Platform",
    subtitle: "Full Sportsbook Implementation & Core Betting Architecture",
    category: "react",
    categoryLabel: "React Architecture",
    role: "Frontend Engineer",
    timeline: "2019 - 2021",
    clientOrOrg: "Wetten.com",
    summary:
      "Delivered a high-speed sportsbook web platform featuring live event odds ladders, multi-sport navigation, and conversion-focused betting workflows.",
    whatIDid: [
      "Built high-speed onboarding funnels, account flows, and localized sports market views.",
      "Engineered interactive odds tables and responsive bet placement modules optimized for mobile devices.",
    ],
    technicalSolutions: [
      "Architected modular multi-step form verification flows with client-side schema validation and instantaneous error feedback.",
      "Optimized layout rendering pipelines to prevent layout shifts during live odds updates.",
    ],
    technologies: ["React", "TypeScript", "REST APIs", "Styled Components"],
    metrics: "Fast mobile onboarding & zero CLS",
    thumbnailUrl: "/assets/showcase/wetten.png",
    liveUrl: "https://wetten.com",
    badgeColor: "#38BDF8",
  },
]
