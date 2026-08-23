export type ProjectCategory = "all" | "react" | "canvas"

export interface IProject {
  id: string
  title: string
  subtitle: string
  category: "react" | "canvas"
  categoryLabel: string
  role: string
  clientOrOrg: string
  summary: string
  whatIDid: string[]
  howIBuiltIt: string[]
  technologies: string[]
  metrics?: string
  thumbnailUrl: string
  liveUrl?: string
  badgeColor?: string
}

export const showcaseProjects: IProject[] = [
  {
    id: "crypto-casino-platform",
    title: "Crypto Casino Platform",
    subtitle: "Crypto Casino Platform Architecture",
    category: "react",
    categoryLabel: "React Architecture",
    role: "Head of Frontend",
    clientOrOrg: "Confidential (NDA)",
    summary:
      "Built and scaled the core web app for a high-traffic crypto casino, keeping the interface snappy and wallet states synced in real time.",
    whatIDid: [
      "Led the frontend team and established our core architecture, state patterns, and code quality standards.",
      "Built key interactive engagement features including daily drops, custom lootboxes, and native in-house games.",
      "Set up automated continuous delivery pipelines to speed up internal feature releases and ship with confidence.",
    ],
    howIBuiltIt: [
      "Optimized our Gatsby build processes and caching strategies to cut compilation times and deploy updates faster.",
      "Worked hand in hand across product, design, and backend teams to turn complex feature concepts into smooth, shippable web experiences.",
    ],
    technologies: ["React", "TypeScript", "Gatsby", "WebSockets", "CSS Modules", "Cloudflare"],
    metrics: "Built from the ground up",
    thumbnailUrl: "/assets/showcase/confidential-crypto.jpg",
    badgeColor: "#00F0FF",
  },
  {
    id: "phaser-2d-casino-games",
    title: "Phaser 2D Games for Casinos",
    subtitle: "Custom 2D Canvas & WebGL Game Engine",
    category: "canvas",
    categoryLabel: "Creative / Canvas",
    role: "Lead Game Developer & Creative Engineer",
    clientOrOrg: "Confidential (NDA)",
    summary:
      "A custom 2D casual game built from scratch as an isolated standalone bundle with smooth animations and physics.",
    whatIDid: [
      "Built the full 2D interactive canvas game loop, custom particle effects, and sprite animations using Phaser 3.",
      "Created a clean state bridge between React UI controls and the WebGL game canvas.",
      "Packaged the game engine into an independent module ready for easy host-app embedding.",
    ],
    howIBuiltIt: [
      "Handled strict context cleanup on unmount to completely eliminate GPU and WebGL memory leaks.",
      "Optimized sprite sheets and render budgets to maintain an unbroken 60 FPS on mobile browsers.",
      "Worked hand in hand with designers to shape the visual identity, feel, and narrative flow of the game.",
    ],
    technologies: ["Phaser 3", "HTML5 Canvas", "WebGL", "TypeScript", "Vite"],
    metrics: "Smooth 60 FPS mobile gameplay",
    thumbnailUrl: "/assets/showcase/confidential-crypto.jpg",
    badgeColor: "#FF6B00",
  },
  {
    id: "crypto-sportsbook-revamp",
    title: "Crypto Casino & Sportsbook",
    subtitle: "Brand Revamp & Modern Web Architecture",
    category: "react",
    categoryLabel: "React Architecture",
    role: "Head of Frontend",
    clientOrOrg: "Confidential (NDA)",
    summary:
      "Modernized a legacy platform into a contemporary crypto casino and sportsbook web app, delivering smooth wallet streaming and high-converting reward mechanics.",
    whatIDid: [
      "Led the frontend brand revamp and migrated legacy views to a modular React architecture.",
      "Built core casino and sportsbook features, including daily lootboxes, rakeback rewards, and in-house originals.",
      "Integrated real-time crypto wallet synchronization and seamless game launching flows.",
    ],
    howIBuiltIt: [
      "Standardized reusable UI tokens and responsive layout systems for seamless multi-device play.",
      "Optimized WebSocket state streams and bundle splitting to ensure fast, responsive page transitions.",
    ],
    technologies: ["React", "TypeScript", "Gatsby", "WebSockets", "CSS Modules", "Cloudflare"],
    metrics: "Modern architecture revamp",
    thumbnailUrl: "/assets/showcase/confidential-crypto.jpg",
    badgeColor: "#F97316",
  },
  {
    id: "guts-sportsbook",
    title: "Guts Sportsbook",
    subtitle: "Full Modern Architecture Rewrite",
    category: "react",
    categoryLabel: "React Architecture",
    role: "Senior Frontend Engineer",
    clientOrOrg: "Guts.com",
    summary:
      "Rewrote a legacy monolithic sportsbook into a modern, modular React app that handles high-concurrency match days with ease.",
    whatIDid: [
      "Rebuilt legacy web views into clean, reusable React components with strict TypeScript types.",
      "Engineered interactive betslip validation, combination bets, and live odds tickers.",
      "Unified the betting UI design system across desktop and mobile browsers.",
    ],
    howIBuiltIt: [
      "Decoupled betslip state calculations from the DOM to eliminate UI stutter when odds change rapidly.",
      "Streamlined WebSocket event handling to keep live scores updating with minimal network overhead.",
    ],
    technologies: ["React", "TypeScript", "Redux Toolkit", "WebSockets", "SCSS Modules"],
    metrics: "Fast & responsive betslip",
    thumbnailUrl: "/assets/showcase/guts.png",
    liveUrl: "https://guts.com",
    badgeColor: "#E11D48",
  },
  {
    id: "rizk-sportsbook",
    title: "Rizk Sportsbook",
    subtitle: "High-Traffic Sports Betting Platform",
    category: "react",
    categoryLabel: "React Architecture",
    role: "Senior Frontend Engineer",
    clientOrOrg: "Rizk.com",
    summary:
      "Engineered the flagship Rizk sportsbook web platform, prioritizing fast navigation and clear live market tracking.",
    whatIDid: [
      "Built live betting dashboards, multi-sport category trees, and real-time match visualizations.",
      "Integrated brand design tokens and custom assets into a shared multi-brand frontend library.",
    ],
    howIBuiltIt: [
      "Used virtualized lists for large betting markets to guarantee smooth 60 FPS scrolling on mobile.",
      "Refined keyboard navigation and accessibility standards across complex betting dialogs.",
    ],
    technologies: ["React", "TypeScript", "External Teams", "CSS Modules"],
    metrics: "High-traffic reliability",
    thumbnailUrl: "/assets/showcase/rizk.png",
    liveUrl: "https://rizk.com",
    badgeColor: "#FACC15",
  },
  {
    id: "wetten-sportsbook",
    title: "Wetten.com",
    subtitle: "Complete Sportsbook Implementation",
    category: "react",
    categoryLabel: "React Architecture",
    role: "Frontend Engineer",
    clientOrOrg: "Wetten.com",
    summary:
      "Delivered a fast sports betting web platform focused on clean odds presentation, simple navigation, and smooth user onboarding.",
    whatIDid: [
      "Developed high-converting sign-up flows, account verification steps, and localized sport hubs.",
      "Built responsive betting tables and bet placement widgets tailored for mobile screens.",
    ],
    howIBuiltIt: [
      "Created modular multi-step form validation with instant client-side error feedback.",
      "Optimized layout rendering so live odds updates never cause content jumping or layout shifts.",
    ],
    technologies: ["React", "TypeScript", "REST APIs", "Styled Components"],
    metrics: "Clean betting flow & fast onboarding",
    thumbnailUrl: "/assets/showcase/wetten.png",
    liveUrl: "https://wetten.com",
    badgeColor: "#38BDF8",
  },
]
