export type ProjectCategory = "all" | "react" | "canvas"

export interface IProject {
  id: string
  title: string
  subtitle: string
  category: "react" | "canvas"
  categoryLabel: string
  role: string
  timeline?: string
  clientOrOrg: string
  summary: string
  whatIDid: string[]
  howIBuiltIt: string[]
  technologies: string[]
  metrics?: string
  thumbnailUrl: string
  liveUrl?: string
  badgeColor?: string
  isPrivate: boolean
}

export const showcaseProjects: IProject[] = [
  {
    id: "mines-crypt-game",
    title: "Crypt of the Cursed",
    subtitle: "Dark Fantasy 2D WebGL Game Engine",
    category: "canvas",
    categoryLabel: "Creative / Canvas",
    role: "Lead Game Developer & Creative Engineer",
    timeline: "2026",
    clientOrOrg: "Independent Production",
    summary:
      "A horror-themed 5x5 grid game built from scratch in Phaser 3 inspired by the original mine-sweeper game. Features custom WebGL point lighting, ambient particle mist, and reactive audio pipelines.",
    whatIDid: [
      "Designed the look and feel of the game from assets, to audio, to animation.",
      "Connected the React  controls and hotkeys (Q/Space) directly to the canvas without re-rendering the game.",
      "Enforced clean WebGL context disposal on unmount so the engine never leaks memory.",
    ],
    howIBuiltIt: [
      "Packaged the game into an isolated, tree-shakeable npm module using Vite multi-entry library mode.",
      "Tuned draw calls and light pipelines so high-DPI viewports stay smooth on both desktop and mobile.",
    ],
    technologies: ["Phaser 3", "WebGL", "TypeScript", "React", "Vite", "CSS Modules"],
    metrics: "WebGL • Own Design",
    thumbnailUrl: "/assets/showcase/crypt-of-the-cursed.jpeg",
    badgeColor: "#38E5A7",
    isPrivate: false,
  },
  {
    id: "mines-vanilla-game",
    title: "Mines Vanilla",
    subtitle: "Lightweight 2D Arcade Engine",
    category: "canvas",
    categoryLabel: "Creative / Canvas",
    role: "Lead Game Developer & Creative Engineer",
    timeline: "2026",
    clientOrOrg: "Independent Production",
    summary:
      "A fast, vanilla experience of a 5x5 mines game focused on snappy input response, crisp particle bursts, and dynamic multiplier curves.",
    whatIDid: [
      "Engineered the 60 FPS Phaser 3 arcade loop with animated tile reveals and responsive board scaling.",
      "Built decoupled React controls for custom grid sizes, mine density, and real-time cashout states.",
      "Wrote strict teardown hooks to ensure zero GPU or canvas memory leaks when closing the game.",
    ],
    howIBuiltIt: [
      "Structured the engine as a standalone sub-module within the multi-entry showcase package.",
      "Batched spritesheets and audio cues for instant, zero-latency touch response on mobile browsers.",
    ],
    technologies: ["Phaser 3", "WebGL", "TypeScript", "React", "Vite", "CSS Modules"],
    metrics: "60 FPS Arcade • Instant Touch Response",
    thumbnailUrl: "/assets/showcase/mines-vanilla.jpeg",
    badgeColor: "#F59E0B",
    isPrivate: false,
  },
  {
    id: "plinko-vanilla-game",
    title: "Plinko Vanilla",
    subtitle: "Physics-Driven Peg Drop Arcade Engine",
    category: "canvas",
    categoryLabel: "Creative / Canvas",
    role: "Lead Game Developer & Creative Engineer",
    timeline: "2026",
    clientOrOrg: "Independent Production",
    summary:
      "A high-performance 2D Plinko arcade experience built with Phaser 3, featuring precision peg collisions, customizable risk rows, and reactive multiplier drop zones.",
    whatIDid: [
      "Engineered real-time physics arcade loop simulating accurate ball-peg deflection and realistic bounce decay.",
      "Built decoupled React wagering controls, selectable row counts (8-16 rows), and adjustable volatility matrices.",
      "Ensured zero-leak lifecycle cleanup, disposing Matter/Arcade physics bodies and WebGL textures on unmount.",
    ],
    howIBuiltIt: [
      "Packaged the Plinko engine as an isolated sub-entry in the multi-entry showcase library.",
      "Optimized collision solver iterations and particle bursts for sustained 60 FPS performance on low-end devices.",
    ],
    technologies: ["Phaser 3", "WebGL", "TypeScript", "React", "Vite", "CSS Modules"],
    metrics: "60 FPS Physics • Instant Payout Curves",
    thumbnailUrl: "/assets/showcase/plinko-vanilla.png",
    badgeColor: "#00F0FF",
    isPrivate: false,
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
    isPrivate: false,
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
    isPrivate: false,
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
    isPrivate: false,
  },
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
    isPrivate: true,
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
    isPrivate: true,
  },
]
