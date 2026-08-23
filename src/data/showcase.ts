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
    id: "crypto-casinos-web3-services",
    title: "Crypto Casinos and Web3 Services",
    subtitle: "Crypto Casino Platforms & Modern Web Architecture",
    category: "react",
    categoryLabel: "React Architecture",
    role: "Head of Frontend",
    clientOrOrg: "Crypto Gaming & Web3 Platforms",
    summary:
      "Built, modernized, and scaled web applications for high-traffic crypto casinos, keeping the interface snappy, wallet states synced in real time, and delivering high-converting reward mechanics.",
    whatIDid: [
      "Led the frontend team and established core architecture, state patterns, and code quality standards.",
      "Built key interactive engagement features including daily drops, custom lootboxes, rakeback rewards, and native in-house games.",
      "Integrated real-time crypto wallet synchronization, seamless game launching flows, and automated continuous delivery pipelines.",
    ],
    howIBuiltIt: [
      "Optimized Gatsby build processes, caching strategies, and bundle splitting to cut compilation times and deploy updates faster.",
      "Standardized reusable UI tokens and responsive layout systems for seamless multi-device play across desktop and mobile.",
      "Worked hand in hand across product, design, and backend teams to turn complex feature concepts into smooth, shippable web experiences.",
    ],
    technologies: ["React", "TypeScript", "Gatsby", "WebSockets", "CSS Modules", "Cloudflare"],
    metrics: "Built from the ground up & modernized",
    thumbnailUrl: "/assets/showcase/crypto-casinos-web3.jpg",
    badgeColor: "#00F0FF",
  },
  {
    id: "phaser-2d-casino-games",
    title: "Phaser 2D Games for Casinos",
    subtitle: "Custom 2D Canvas & WebGL Game Engine",
    category: "canvas",
    categoryLabel: "Creative / Canvas",
    role: "Lead Game Developer & Creative Engineer",
    clientOrOrg: "Independent Production",
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
    thumbnailUrl: "/assets/showcase/phaser-2d-games.jpg",
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
