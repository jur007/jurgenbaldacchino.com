import type { ReactNode } from "react"

import styles from "./ai-section.module.css"

interface IProcessStep {
  description: string
  icon: ReactNode
  stepNumber: string
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
      "Rapid requirements analysis, domain modeling, and AI-accelerated technical exploration.",
    icon: <DiscoverIcon />,
    stepNumber: "01",
    title: "Discover & Align",
  },
  {
    description:
      "Modular system design, strict TypeScript contracts, accessibility, and performance budgets.",
    icon: <ArchitectIcon />,
    stepNumber: "02",
    title: "Architect & Prototype",
  },
  {
    description:
      "High-precision React engineering, automated test coverage, and clean component architecture.",
    icon: <DevelopIcon />,
    stepNumber: "03",
    title: "Build & Optimize",
  },
  {
    description:
      "Automated CI/CD pipelines, Cloudflare edge delivery, and production performance monitoring.",
    icon: <DeliverIcon />,
    stepNumber: "04",
    title: "Deliver & Scale",
  },
]

export const AiSection = () => {
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
              <div className={styles.stepCard}>
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
      </div>
    </section>
  )
}

export default AiSection
