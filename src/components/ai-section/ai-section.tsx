import type { MouseEvent, ReactNode } from "react"

import styles from "./ai-section.module.css"

interface IProcessStep {
  description: string
  icon: ReactNode
  stepNumber: string
  title: string
}

interface ITenet {
  description: string
  icon: string
  title: string
}

const DiscoverIcon = () => (
  <svg
    aria-hidden="true"
    className={styles.stepIcon}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
    <path d="M11 8v6M8 11h6" />
  </svg>
)

const ArchitectIcon = () => (
  <svg
    aria-hidden="true"
    className={styles.stepIcon}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path d="M12 2 2 7l10 5 10-5-10-5Z" />
    <path d="m2 17 10 5 10-5" />
    <path d="m2 12 10 5 10-5" />
  </svg>
)

const DevelopIcon = () => (
  <svg
    aria-hidden="true"
    className={styles.stepIcon}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
    <line x1="14" x2="10" y1="4" y2="20" />
  </svg>
)

const DeliverIcon = () => (
  <svg
    aria-hidden="true"
    className={styles.stepIcon}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
    <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
    <path d="M9 12H4s.55-3.03 2-4.5c1.62-1.63 5-2.5 5-2.5" />
    <path d="M15 6v5s3.03-.55 4.5-2c1.63-1.62 2.5-5 2.5-5" />
  </svg>
)

const processSteps: IProcessStep[] = [
  {
    description:
      "Understanding the problem, aligning on goals, and validating technical ideas early.",
    icon: <DiscoverIcon />,
    stepNumber: "01",
    title: "Discover & Align",
  },
  {
    description:
      "Designing modular systems with strict TypeScript contracts and accessible UI foundations.",
    icon: <ArchitectIcon />,
    stepNumber: "02",
    title: "Architect & Prototype",
  },
  {
    description:
      "Writing clean React code backed by thorough test coverage and smooth performance.",
    icon: <DevelopIcon />,
    stepNumber: "03",
    title: "Build & Optimize",
  },
  {
    description: "Automating CI/CD pipelines for fast, reliable, and continuous delivery at scale.",
    icon: <DeliverIcon />,
    stepNumber: "04",
    title: "Deliver & Scale",
  },
]

const personalTenets: ITenet[] = [
  {
    description: "Clean, readable, and predictable code beats clever shortcuts every time.",
    icon: "🌟",
    title: "Predictability First",
  },
  {
    description: "Strong opinions, weakly held — guided by user feedback and real-world metrics.",
    icon: "💡",
    title: "Pragmatic Evolution",
  },
  {
    description:
      "Great developer tooling and ergonomics directly shape exceptional user experiences.",
    icon: "🚀",
    title: "DX Multiplier",
  },
]

export const AiSection = () => {
  const handleStepMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    const card = event.currentTarget
    const rect = card.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    card.style.setProperty("--mouse-x", `${x}px`)
    card.style.setProperty("--mouse-y", `${y}px`)
  }

  return (
    <section className={styles.containerWrapper} aria-labelledby="ai-section-title" id="process">
      <div className={styles.headerContainer}>
        <p className={styles.eyebrow}>Philosophy & Process</p>
        <h2 id="ai-section-title">
          AI-assisted. <em>Human-led.</em>
        </h2>
        <p className={styles.introductionCopy}>
          I use AI to accelerate exploration, challenge technical decisions, and automate repetitive
          tasks — while keeping architecture, product craftsmanship, and final engineering judgment
          firmly human-led.
        </p>
      </div>

      <div className={styles.roadmapContainer}>
        <ol className={styles.processRoadmap} aria-label="4-step engineering process">
          {processSteps.map((step) => (
            <li className={styles.stepItem} key={step.stepNumber}>
              <div className={styles.stepCard} onMouseMove={handleStepMouseMove}>
                <div className={styles.stepCardHeader}>
                  <div className={styles.stepIconContainer}>{step.icon}</div>
                  <span className={styles.stepNumberBadge}>{step.stepNumber}</span>
                </div>
                <h3 className={styles.stepTitle}>{step.title}</h3>
                <p className={styles.stepDescription}>{step.description}</p>
              </div>
            </li>
          ))}
        </ol>

        {/* 3 Core Guiding Tenets */}
        <div className={styles.tenetsContainer} aria-label="Core engineering tenets">
          {personalTenets.map((tenet) => (
            <div className={styles.tenetCard} key={tenet.title} onMouseMove={handleStepMouseMove}>
              <div className={styles.tenetHeader}>
                <span className={styles.tenetIcon} aria-hidden="true">
                  {tenet.icon}
                </span>
                <h4 className={styles.tenetTitle}>{tenet.title}</h4>
              </div>
              <p className={styles.tenetDescription}>{tenet.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AiSection
