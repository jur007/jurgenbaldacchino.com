import { useEffect, useRef, useState } from "react"
import type { MouseEvent } from "react"

import styles from "./home-section.module.css"

import profileImage from "@/assets/profile-optimized.jpg"
import { AiSection } from "@components/ai-section"
import { ButtonLink } from "@components/button"
import { IButtonSize, IButtonType } from "@components/button/button.types"
import { getClassNames } from "@utils/class-names"

const heading = "Building high-impact frontend architectures made to last."
const emphasizedHeading = "made to last."
const regularHeading = heading.slice(0, -emphasizedHeading.length)

const useRevealOnIntersection = <TElement extends HTMLElement>() => {
  const elementReference = useRef<TElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const element = elementReference.current

    if (!element || typeof IntersectionObserver === "undefined") {
      setIsVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return
        }

        setIsVisible(true)
        observer.disconnect()
      },
      {
        rootMargin: "0px 0px -10% 0px",
        threshold: 0.15,
      },
    )

    observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return [elementReference, isVisible] as const
}

const useTypedHeading = (isActive: boolean) => {
  const [visibleCharacterCount, setVisibleCharacterCount] = useState(0)

  useEffect(() => {
    if (!isActive) {
      return
    }

    const prefersReducedMotion =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches

    if (prefersReducedMotion) {
      const reducedMotionTimer = window.setTimeout(
        () => setVisibleCharacterCount(heading.length),
        0,
      )

      return () => window.clearTimeout(reducedMotionTimer)
    }

    const typingTimer = window.setInterval(() => {
      setVisibleCharacterCount((currentCount) => {
        if (currentCount >= heading.length) {
          window.clearInterval(typingTimer)
          return currentCount
        }

        return currentCount + 1
      })
    }, 18)

    return () => window.clearInterval(typingTimer)
  }, [isActive])

  return heading.slice(0, visibleCharacterCount)
}

const ExperienceIcon = () => (
  <svg
    aria-hidden="true"
    className={styles.metricIcon}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <rect height="18" rx="2" width="18" x="3" y="4" />
    <path d="M16 2v4M8 2v4M3 10h18" />
  </svg>
)

const LeadershipIcon = () => (
  <svg
    aria-hidden="true"
    className={styles.metricIcon}
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

const AiSparkIcon = () => (
  <svg
    aria-hidden="true"
    className={styles.metricIcon}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path d="m12 3 1.912 5.885L19.8 10.8 13.912 12.715 12 18.6l-1.912-5.885L4.2 10.8l5.888-1.915L12 3Z" />
  </svg>
)

const GamepadIcon = () => (
  <svg
    aria-hidden="true"
    className={styles.bentoCardHeaderIcon}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <rect height="14" rx="4" width="20" x="2" y="5" />
    <path d="M6 12h4M8 10v4M15 11h.01M18 13h.01" />
  </svg>
)

const CodeIcon = () => (
  <svg
    aria-hidden="true"
    className={styles.bentoCardHeaderIcon}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
)

const TerminalIcon = () => (
  <svg
    aria-hidden="true"
    className={styles.bentoCardHeaderIcon}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <polyline points="4 17 10 11 4 5" />
    <line x1="12" x2="20" y1="19" y2="19" />
  </svg>
)

const UsersIcon = () => (
  <svg
    aria-hidden="true"
    className={styles.bentoCardHeaderIcon}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
)

interface IParticle {
  alpha: number
  color: string
  radius: number
  speedX: number
  speedY: number
  x: number
  y: number
}

export const HomeSection = () => {
  const [heroReference, isHeroVisible] = useRevealOnIntersection<HTMLDivElement>()
  const [bentoReference, isBentoVisible] = useRevealOnIntersection<HTMLDivElement>()
  const [activeParticleCount, setActiveParticleCount] = useState(0)
  const canvasReference = useRef<HTMLCanvasElement>(null)
  const particlesReference = useRef<IParticle[]>([])

  const visibleHeading = useTypedHeading(isHeroVisible)
  const visibleRegularHeading = visibleHeading.slice(0, regularHeading.length)
  const visibleEmphasizedHeading = visibleHeading.slice(regularHeading.length)

  const handleCardMouseMove = (event: MouseEvent<HTMLElement>) => {
    const card = event.currentTarget
    const rect = card.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    card.style.setProperty("--mouse-x", `${x}px`)
    card.style.setProperty("--mouse-y", `${y}px`)
  }

  useEffect(() => {
    const canvas = canvasReference.current
    if (!canvas) {
      return
    }

    const context = canvas.getContext("2d")
    if (!context) {
      return
    }

    let animationFrameId: number
    const width = (canvas.width = canvas.offsetWidth || 280)
    const height = (canvas.height = canvas.offsetHeight || 130)

    if (particlesReference.current.length === 0) {
      particlesReference.current = Array.from({ length: 24 }, () => ({
        alpha: Math.random() * 0.7 + 0.3,
        color: Math.random() > 0.35 ? "#00f0ff" : "#f59e0b",
        radius: Math.random() * 2.2 + 1.5,
        speedX: (Math.random() - 0.5) * 1.4,
        speedY: (Math.random() - 0.5) * 1.4,
        x: Math.random() * width,
        y: Math.random() * height,
      }))
    }

    const render = () => {
      context.clearRect(0, 0, width, height)

      // Draw subtle grid
      context.strokeStyle = "rgba(0, 240, 255, 0.08)"
      context.lineWidth = 1
      for (let x = 0; x < width; x += 24) {
        context.beginPath()
        context.moveTo(x, 0)
        context.lineTo(x, height)
        context.stroke()
      }
      for (let y = 0; y < height; y += 24) {
        context.beginPath()
        context.moveTo(0, y)
        context.lineTo(width, y)
        context.stroke()
      }

      const particles = particlesReference.current

      // Update and draw particles
      for (let indexA = 0; indexA < particles.length; indexA += 1) {
        const particleA = particles[indexA]
        if (!particleA) {
          continue
        }

        particleA.x += particleA.speedX
        particleA.y += particleA.speedY

        // Bounce on boundaries
        if (particleA.x <= particleA.radius || particleA.x >= width - particleA.radius) {
          particleA.speedX *= -1
        }
        if (particleA.y <= particleA.radius || particleA.y >= height - particleA.radius) {
          particleA.speedY *= -1
        }

        context.beginPath()
        context.arc(particleA.x, particleA.y, particleA.radius, 0, Math.PI * 2)
        context.fillStyle = particleA.color
        context.shadowColor = particleA.color
        context.shadowBlur = 10
        context.fill()

        for (let indexB = indexA + 1; indexB < particles.length; indexB += 1) {
          const particleB = particles[indexB]
          if (!particleB) {
            continue
          }

          const distance = Math.hypot(particleA.x - particleB.x, particleA.y - particleB.y)
          if (distance < 58) {
            context.beginPath()
            context.moveTo(particleA.x, particleA.y)
            context.lineTo(particleB.x, particleB.y)
            context.strokeStyle = `rgba(0, 240, 255, ${0.4 * (1 - distance / 58)})`
            context.stroke()
          }
        }
      }

      animationFrameId = window.requestAnimationFrame(render)
    }

    render()

    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [activeParticleCount])

  const handleCanvasInteraction = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault()
    const canvas = canvasReference.current
    if (!canvas) {
      return
    }

    const rect = canvas.getBoundingClientRect()
    const clickX = event.clientX - rect.left
    const clickY = event.clientY - rect.top

    // Spawn interactive burst of 6 particles from click position
    const burstParticles: IParticle[] = Array.from({ length: 6 }, () => ({
      alpha: 1,
      color: Math.random() > 0.5 ? "#00f0ff" : "#f59e0b",
      radius: Math.random() * 2.5 + 2,
      speedX: (Math.random() - 0.5) * 3.5,
      speedY: (Math.random() - 0.5) * 3.5,
      x: clickX,
      y: clickY,
    }))

    particlesReference.current = [...particlesReference.current.slice(-24), ...burstParticles]
    setActiveParticleCount((count) => count + 1)
  }

  return (
    <div className={styles.containerWrapper} id="top">
      <section
        aria-labelledby="hero-title"
        className={getClassNames(styles.heroSectionContainer, isHeroVisible && styles.heroVisible)}
        ref={heroReference}
      >
        <div className={styles.heroContentColumn}>
          <div className={styles.heroAvailabilityBadge}>
            <span className={styles.availabilityIndicator} aria-hidden="true"></span>
            <span>Available for Senior Lead & Architecture Roles</span>
          </div>

          <h1 id="hero-title" aria-label={heading}>
            <span className={styles.heroHeadingSizer} aria-hidden="true">
              {regularHeading}
              <em>{emphasizedHeading}</em>
            </span>
            <span className={styles.heroHeadingTypedText} aria-hidden="true">
              {visibleRegularHeading}
              <em>{visibleEmphasizedHeading}</em>
            </span>
          </h1>

          <p className={styles.heroIntroduction}>
            I’m Jur 👋 — frontend engineer and technical leader with 12+ years of experience. I lead
            frontend teams, architect large-scale React systems, and build web applications that
            stay fast under load.
          </p>

          <div className={styles.heroCallToActionGroup}>
            <ButtonLink href="#expertise" size={IButtonSize.LARGE} type={IButtonType.PRIMARY}>
              View Work
            </ButtonLink>
            <ButtonLink href="#contact" size={IButtonSize.LARGE} type={IButtonType.SECONDARY}>
              Let&apos;s Talk
            </ButtonLink>
          </div>
        </div>

        <div className={styles.heroPortraitColumn}>
          <div className={styles.heroPortraitWrapper}>
            <div className={styles.portraitAmbientGlow} aria-hidden="true"></div>
            <div className={styles.portraitHaloRing} aria-hidden="true"></div>

            <div className={styles.portraitImageContainer}>
              <img
                alt="Portrait of Jurgen Baldacchino"
                decoding="async"
                height="479"
                loading="lazy"
                src={profileImage}
                width="480"
              />
            </div>

            {/* Floating Metric 1: 12+ Years Experience */}
            <div
              className={getClassNames(styles.floatingMetricCard, styles.floatingMetricExperience)}
            >
              <div className={styles.metricIconContainer}>
                <ExperienceIcon />
              </div>
              <div className={styles.metricTextContainer}>
                <strong>12+ Years</strong>
                <small>Experience</small>
              </div>
            </div>

            {/* Floating Metric 2: Senior Lead Frontend & Architecture */}
            <div
              className={getClassNames(styles.floatingMetricCard, styles.floatingMetricLeadership)}
            >
              <div className={styles.metricIconContainer}>
                <LeadershipIcon />
              </div>
              <div className={styles.metricTextContainer}>
                <strong>Senior Lead</strong>
                <small>Frontend & Architecture</small>
              </div>
            </div>

            {/* Floating Metric 3: AI-Assisted Modern Engineering */}
            <div className={getClassNames(styles.floatingMetricCard, styles.floatingMetricAi)}>
              <div className={styles.metricIconContainer}>
                <AiSparkIcon />
              </div>
              <div className={styles.metricTextContainer}>
                <strong>AI-Assisted</strong>
                <small>Modern Engineering</small>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bento Grid Section for Core Capabilities */}
      <section
        aria-labelledby="bento-title"
        className={getClassNames(
          styles.bentoSectionContainer,
          isBentoVisible && styles.bentoSectionVisible,
        )}
        id="expertise"
        ref={bentoReference}
      >
        <div className={styles.bentoSectionHeader}>
          <p className={styles.bentoEyebrow}>Core Capabilities</p>
          <h2 id="bento-title">Engineered for speed, scale, and longevity.</h2>
          <p className={styles.bentoSectionSubtitle}>
            Combining high-performance React architectures, interactive 2D canvas engines, automated
            CI/CD pipelines, and empathetic team leadership.
          </p>
        </div>

        <ul className={styles.bentoGrid} aria-label="Core strengths and capabilities">
          {/* Card 1: React Engineering & Frontend Architecture (Span 2 cols desktop) */}
          <li className={getClassNames(styles.bentoGridItem, styles.bentoGridItemArchitecture)}>
            <article
              className={getClassNames(styles.bentoCard, styles.bentoCardArchitecture)}
              onMouseMove={handleCardMouseMove}
            >
              <div className={styles.bentoCardHeader}>
                <div className={styles.bentoCardIconContainer}>
                  <CodeIcon />
                </div>
                <span className={styles.bentoCardIndex}>01 / ARCHITECTURE</span>
              </div>
              <div className={styles.bentoCardBody}>
                <h3>React Engineering & Frontend Architecture</h3>
                <p>
                  I build accessible, high-performance web applications designed for long-term
                  maintainability. Specializing in modern React, strict TypeScript architectures,
                  and modular design systems.
                </p>
              </div>
              <div className={styles.bentoMetricsBar}>
                <div className={styles.metricIndicatorItem}>
                  <span className={styles.metricIndicatorValue}>Sub-Second</span>
                  <span className={styles.metricIndicatorLabel}>Fast Load Times</span>
                </div>
                <div className={styles.metricIndicatorItem}>
                  <span className={styles.metricIndicatorValue}>Design Systems</span>
                  <span className={styles.metricIndicatorLabel}>Reusable & Modular</span>
                </div>
                <div className={styles.metricIndicatorItem}>
                  <span className={styles.metricIndicatorValue}>Accessible</span>
                  <span className={styles.metricIndicatorLabel}>Built for Everyone</span>
                </div>
              </div>
              <div className={styles.bentoTechBadgeList}>
                <span
                  className={getClassNames(styles.bentoTechBadge, styles.badgeArchitectureCyan)}
                >
                  React
                </span>
                <span
                  className={getClassNames(styles.bentoTechBadge, styles.badgeArchitectureCyan)}
                >
                  TypeScript
                </span>
                <span
                  className={getClassNames(styles.bentoTechBadge, styles.badgeArchitectureCyan)}
                >
                  Vite
                </span>
                <span
                  className={getClassNames(styles.bentoTechBadge, styles.badgeArchitectureCyan)}
                >
                  Design Systems
                </span>
                <span
                  className={getClassNames(styles.bentoTechBadge, styles.badgeArchitectureCyan)}
                >
                  State Management
                </span>
              </div>
            </article>
          </li>

          {/* Card 2: Creative Dev & Interactive Canvas (Span 1 col) */}
          <li className={getClassNames(styles.bentoGridItem, styles.bentoGridItemCreative)}>
            <article
              className={getClassNames(styles.bentoCard, styles.bentoCardCreative)}
              onClick={handleCanvasInteraction}
              onMouseMove={handleCardMouseMove}
            >
              <div className={styles.bentoCardHeader}>
                <div
                  className={getClassNames(
                    styles.bentoCardIconContainer,
                    styles.bentoCardIconCreative,
                  )}
                >
                  <GamepadIcon />
                </div>
                <span className={styles.bentoCardIndex}>02 / INTERACTIVE</span>
              </div>
              <div className={styles.bentoCardBody}>
                <h3>Creative Dev & Interactive Canvas</h3>
                <p>
                  Bringing creative product ideas to life with custom 2D canvas engines and playable
                  web games. Blending web standards with 60FPS physics and WebGL micro-interactions.
                </p>
              </div>
              <div
                className={styles.canvasPreviewContainer}
                title="Click anywhere to burst particles!"
              >
                <canvas className={styles.canvasElement} ref={canvasReference} />
                <span className={styles.canvasLiveBadge}>Live 2D Physics · Click to Play</span>
              </div>
              <div className={styles.bentoTechBadgeList}>
                <span className={getClassNames(styles.bentoTechBadge, styles.badgeCreativeAmber)}>
                  Phaser 3
                </span>
                <span className={getClassNames(styles.bentoTechBadge, styles.badgeCreativeAmber)}>
                  HTML5 Canvas
                </span>
                <span className={getClassNames(styles.bentoTechBadge, styles.badgeCreativeAmber)}>
                  WebGL
                </span>
                <span className={getClassNames(styles.bentoTechBadge, styles.badgeCreativeAmber)}>
                  Web Games
                </span>
              </div>
            </article>
          </li>

          {/* Card 3: DevOps, CI/CD & Engineering Standards (Span 1 col) */}
          <li className={getClassNames(styles.bentoGridItem, styles.bentoGridItemDevOps)}>
            <article
              className={getClassNames(styles.bentoCard, styles.bentoCardDevOps)}
              onMouseMove={handleCardMouseMove}
            >
              <div className={styles.bentoCardHeader}>
                <div
                  className={getClassNames(
                    styles.bentoCardIconContainer,
                    styles.bentoCardIconDevOps,
                  )}
                >
                  <TerminalIcon />
                </div>
                <span className={styles.bentoCardIndex}>03 / STANDARDS</span>
              </div>
              <div className={styles.bentoCardBody}>
                <h3>DevOps, CI/CD & Engineering Standards</h3>
                <p>
                  Great developer experience directly shapes product quality. I build automated
                  CI/CD pipelines, strict linting suites, and robust test gates so teams ship
                  quickly with zero hesitation.
                </p>
              </div>
              <div className={styles.pipelineVisualContainer}>
                <div className={styles.pipelineNode}>
                  <span className={styles.pipelineNodeDot}></span>
                  <span>Husky / Commitlint</span>
                </div>
                <span className={styles.pipelineConnector}>→</span>
                <div className={styles.pipelineNode}>
                  <span className={styles.pipelineNodeDot}></span>
                  <span>ESLint & Vitest</span>
                </div>
                <span className={styles.pipelineConnector}>→</span>
                <div className={styles.pipelineNode}>
                  <span className={styles.pipelineNodeDot}></span>
                  <span>GitHub Actions</span>
                </div>
              </div>
              <div className={styles.bentoTechBadgeList}>
                <span className={getClassNames(styles.bentoTechBadge, styles.badgeDevOpsIndigo)}>
                  GitHub Actions
                </span>
                <span className={getClassNames(styles.bentoTechBadge, styles.badgeDevOpsIndigo)}>
                  Husky
                </span>
                <span className={getClassNames(styles.bentoTechBadge, styles.badgeDevOpsIndigo)}>
                  Commitlint
                </span>
                <span className={getClassNames(styles.bentoTechBadge, styles.badgeDevOpsIndigo)}>
                  ESLint
                </span>
                <span className={getClassNames(styles.bentoTechBadge, styles.badgeDevOpsIndigo)}>
                  Docker
                </span>
                <span className={getClassNames(styles.bentoTechBadge, styles.badgeDevOpsIndigo)}>
                  Cloudflare
                </span>
              </div>
            </article>
          </li>

          {/* Card 4: Technical Leadership & AI-Assisted Workflows (Span 2 cols desktop) */}
          <li className={getClassNames(styles.bentoGridItem, styles.bentoGridItemLeadership)}>
            <article
              className={getClassNames(styles.bentoCard, styles.bentoCardLeadership)}
              onMouseMove={handleCardMouseMove}
            >
              <div className={styles.bentoCardHeader}>
                <div
                  className={getClassNames(
                    styles.bentoCardIconContainer,
                    styles.bentoCardIconLeadership,
                  )}
                >
                  <UsersIcon />
                </div>
                <span className={styles.bentoCardIndex}>04 / LEADERSHIP</span>
              </div>
              <div className={styles.bentoCardBody}>
                <h3>Technical Leadership & AI-Assisted Workflows</h3>
                <p>
                  Guiding engineering teams through hands-on mentoring, thoughtful code reviews, and
                  clear architecture standards. Using AI pragmatically to accelerate delivery while
                  keeping engineering craft firmly human-led.
                </p>
              </div>
              <div className={styles.leadershipHighlights}>
                <div className={styles.leadershipPill}>Technical Mentoring</div>
                <div className={styles.leadershipPill}>Code Review Standards</div>
                <div className={styles.leadershipPill}>AI-Assisted DX</div>
                <div className={styles.leadershipPill}>Human-Led Quality</div>
              </div>
              <div className={styles.bentoTechBadgeList}>
                <span className={getClassNames(styles.bentoTechBadge, styles.badgeLeadershipTeal)}>
                  Team Mentoring
                </span>
                <span className={getClassNames(styles.bentoTechBadge, styles.badgeLeadershipTeal)}>
                  Code Reviews
                </span>
                <span className={getClassNames(styles.bentoTechBadge, styles.badgeLeadershipTeal)}>
                  AI Workflows
                </span>
                <span className={getClassNames(styles.bentoTechBadge, styles.badgeLeadershipTeal)}>
                  Architecture
                </span>
              </div>
            </article>
          </li>
        </ul>
      </section>

      <AiSection />
    </div>
  )
}

export default HomeSection
