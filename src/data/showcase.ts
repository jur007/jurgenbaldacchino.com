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
    id: "metaspins",
    title: "Metaspins",
    subtitle: "Web3 Crypto Casino & Real-Time Sportsbook",
    category: "react",
    categoryLabel: "React Architecture",
    role: "Head of Frontend",
    timeline: "2022 - 2024",
    clientOrOrg: "Metaspins",
    summary:
      "Architected and led the frontend engineering for a premier Web3 crypto gaming platform and real-time sportsbook. Engineered from ground up to deliver sub-second page loads, real-time live odds synchronization, interactive multiplayer chat, and multi-currency Web3 wallet reconciliation.",
    whatIDid: [
      "Led and mentored the frontend engineering team, establishing strict TypeScript standards, automated CI/CD pipelines, and design token architectures.",
      "Architected the single-page application foundation using modern React, Vite, and modular CSS systems to achieve sub-second LCP and high Lighthouse scores.",
      "Engineered high-concurrency WebSocket channels for real-time live betting slips, odds tickers, user balance updates, and localized community chat feeds.",
      "Implemented secure Web3 wallet connectivity and instant crypto deposit/withdrawal state machines across multiple blockchain networks.",
    ],
    technicalSolutions: [
      "Isolated high-frequency live odds streaming from component rendering trees using dedicated event emitter state slices, eliminating wasteful re-renders across the casino grid.",
      "Designed an intelligent pre-fetching and lazy-loading strategy for game assets and sportsbook markets, slashing initial bundle sizes by over 60%.",
      "Standardized multi-currency and crypto decimal arithmetic with precision wrappers, preventing rounding discrepancies under high transaction throughput.",
    ],
    technologies: ["React", "TypeScript", "Vite", "WebSockets", "Web3 / Crypto", "CSS Modules"],
    metrics: "Sub-second LCP · 60 FPS live ticker",
    thumbnailUrl: "/assets/showcase/metaspins.svg",
    liveUrl: "https://metaspins.com",
    badgeColor: "#00F0FF",
  },
  {
    id: "mines-classic",
    title: "Mines Classic",
    subtitle: "Custom 2D Phaser Canvas Engine · Metaspins Originals",
    category: "canvas",
    categoryLabel: "Creative / Canvas",
    role: "Lead Game Developer & Creative Engineer",
    timeline: "2023 - 2024",
    clientOrOrg: "Metaspins Originals",
    summary:
      "Engineered a proprietary, provably fair 2D Mines canvas game from scratch using Phaser 3 and WebGL. Built as a standalone micro-frontend seamlessly embedded inside the Metaspins React application with custom sound synthesis, tile revealing particle bursts, and hardware-accelerated animations.",
    whatIDid: [
      "Designed and coded the entire 2D game engine loop, state machine, and audio-visual particle effects in Phaser 3 and TypeScript.",
      "Constructed a robust bi-directional bridge synchronizing React UI inputs, bet configurations, and provably fair server seeds with imperative Phaser game scenes.",
      "Built custom WebGL shader effects for glowing tile reveals, win multipliers, and dynamic mine detonator physics.",
      "Optimized rendering performance and memory allocation to guarantee a consistent 60 FPS on low-power mobile devices.",
    ],
    technicalSolutions: [
      "Implemented strict WebGL context cleanup and texture unloading on React component unmount, completely eliminating browser memory leaks.",
      "Used sprite atlas packing and programmatic shape rendering to keep game asset bundle overhead under 250 KB.",
      "Integrated SHA-256 client seed verification directly into the game HUD so players can independently verify game round fairness in real time.",
    ],
    technologies: ["Phaser 3", "WebGL", "HTML5 Canvas", "TypeScript", "React", "Web Audio API"],
    metrics: "60 FPS on mobile · <250KB asset payload",
    thumbnailUrl: "/assets/showcase/mines-classic.svg",
    liveUrl: "https://metaspins.com",
    badgeColor: "#FF2A4D",
  },
  {
    id: "guts",
    title: "Guts",
    subtitle: "Enterprise Sportsbook & Tech Stack Modernization",
    category: "react",
    categoryLabel: "React Architecture",
    role: "Senior Frontend Engineer",
    timeline: "2020 - 2022",
    clientOrOrg: "Guts (GiG / Betsson Group)",
    summary:
      "Engineered enterprise-grade sportsbook experiences and modern frontend architecture for Guts. Delivered high-velocity live betting interfaces, complex multi-leg bet slip builders, and odds matrix rendering serving hundreds of thousands of concurrent active bettors.",
    whatIDid: [
      "Contributed to the complete architectural modernization and rewrite from legacy monolithic stacks into modern modular React and TypeScript.",
      "Built high-performance live betting slip components supporting single, combi, and complex system bets with dynamic odds change reconciliation.",
      "Integrated real-time live event match trackers with animated visual field representations and instantaneous scoreboard updates.",
      "Collaborated with UX and product teams to optimize bet-placement conversion funnels during high-stakes global sporting tournaments.",
    ],
    technicalSolutions: [
      "Constructed a normalized in-memory market cache that efficiently merges incoming WebSocket odds delta patches without invalidating full market trees.",
      "Implemented virtualized rendering for extensive league tables and event lists, ensuring smooth 60 FPS scrolling through thousands of live fixtures.",
      "Standardized multi-lingual localization and regional odds format converters (Decimal, Fractional, American) with zero layout shifts.",
    ],
    technologies: ["React", "TypeScript", "Redux Toolkit", "WebSockets", "CSS Modules", "Vitest"],
    metrics: "100k+ concurrent active users · 0s downtime",
    thumbnailUrl: "/assets/showcase/guts.svg",
    liveUrl: "https://guts.com",
    badgeColor: "#EF4444",
  },
  {
    id: "rizk",
    title: "Rizk",
    subtitle: "High-Traffic Sports Betting & Live Event Platform",
    category: "react",
    categoryLabel: "React Architecture",
    role: "Senior Frontend Engineer",
    timeline: "2019 - 2021",
    clientOrOrg: "Rizk (GiG / Betsson Group)",
    summary:
      "Developed high-traffic sportsbook and interactive gaming features for Rizk's flagship global brand. Focused on high-speed event navigation, responsive live event tracking, and custom branded reward gamification mechanisms.",
    whatIDid: [
      "Implemented responsive sportsbook navigation structures supporting fast multi-sport filtering and deep-linked betting markets.",
      "Developed custom live event betting widgets with instant cashout capability and interactive match timeline trackers.",
      "Created resilient error-handling and network retry boundaries for mobile betting under intermittent connectivity.",
      "Built reusable design system components in compliance with brand guidelines and WCAG 2.1 AA accessibility standards.",
    ],
    technicalSolutions: [
      "Optimized live odds re-rendering cycles by applying fine-grained selector memoization and debounce wrappers around volatile betting ticker streams.",
      "Designed responsive layout grids that adapt seamlessly from 320px mobile screens up to multi-monitor sportsbook desktop dashboards.",
      "Configured automated unit and integration test coverage across bet placement workflows, preventing regression risks in high-concurrency releases.",
    ],
    technologies: ["React", "TypeScript", "State Management", "WebSockets", "REST APIs", "Jest"],
    metrics: "99.99% bet-placement reliability",
    thumbnailUrl: "/assets/showcase/rizk.svg",
    liveUrl: "https://rizk.com",
    badgeColor: "#F59E0B",
  },
  {
    id: "wetten",
    title: "Wetten.com",
    subtitle: "Regulated German Market Sportsbook Platform",
    category: "react",
    categoryLabel: "React Architecture",
    role: "Frontend Engineer",
    timeline: "2017 - 2019",
    clientOrOrg: "Wetten.com",
    summary:
      "Delivered regulated sportsbook web solutions tailored for the German and European iGaming markets. Engineered compliance-driven player verification flows, custom deposit limit controls, and high-converting affiliate landing experiences.",
    whatIDid: [
      "Built localized frontend sportsbook pages compliant with strict German regulatory frameworks (GlüStV) and identity verification standards.",
      "Engineered multi-step onboarding and automated KYC verification flows with responsive client-side document validation.",
      "Developed high-speed affiliate conversion funnels, promotional landing page generators, and dynamic marketing campaign trackers.",
      "Collaborated with backend engineers to integrate payment gateways including Sofort, Trustly, and credit cards with rigorous fraud checks.",
    ],
    technicalSolutions: [
      "Engineered modular form validation state machines that adapt dynamic validation rules according to player jurisdiction and deposit limits.",
      "Automated asset bundling and critical CSS extraction to optimize mobile first-paint speeds for paid affiliate acquisition channels.",
      "Maintained zero-downtime release cadences through automated continuous integration pipelines and smoke test suites.",
    ],
    technologies: ["JavaScript / TypeScript", "React", "CSS Modules", "HTML5", "Payment APIs"],
    metrics: "Fully compliant regulatory delivery",
    thumbnailUrl: "/assets/showcase/wetten.svg",
    liveUrl: "https://wetten.com",
    badgeColor: "#10B981",
  },
]
