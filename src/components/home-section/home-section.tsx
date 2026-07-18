import { useEffect, useRef, useState } from "react"

import styles from "./home-section.module.css"

import profileImage from "@/assets/profile-optimized.jpg"
import { AiSection } from "@components/ai-section"
import { StrengthCard } from "@components/strength-card"
import { getClassNames } from "@utils/class-names"

interface IStrengthItem {
  description: string
  expandedDescription: string
  index: string
  prominent?: boolean
  technicalDetail: string
  title: string
}

const heading =
  "Turning ideas into thoughtful frontend experiences, built together and made to last."
const emphasizedHeading = "made to last."
const regularHeading = heading.slice(0, -emphasizedHeading.length)

const strengths: IStrengthItem[] = [
  {
    description:
      "Building fast, scalable and mobile-first React products designed for users, search and long-term growth.",
    expandedDescription:
      "I build fast, discoverable and mobile-first products with performance, accessibility and SEO considered from the beginning. My experience across React, Next.js, Gatsby and different state-management approaches helps me choose solutions around the product’s needs—not a preferred tool.",
    index: "01",
    prominent: true,
    technicalDetail: "React · TypeScript",
    title: "React Engineering",
  },
  {
    description:
      "Turning creative ideas into engaging interactive experiences, including custom 2D products built with Phaser.",
    expandedDescription:
      "I enjoy turning ambitious ideas into engaging digital experiences. This has included developing an in-house 2D game with Phaser, bringing creativity and engineering together to take an interactive concept through to a finished product.",
    index: "02",
    technicalDetail: "Phaser · Interaction",
    title: "Creative Development",
  },
  {
    description:
      "Creating reliable delivery pipelines that move frontend products from validation to production with confidence.",
    expandedDescription:
      "I create dependable paths from development to production, helping teams release with greater speed and confidence. Using Azure DevOps, Docker, Cloudflare, GitHub Actions and YAML, I’ve built validation, development and production pipelines that reduce manual work and catch problems earlier.",
    index: "03",
    technicalDetail: "Azure · Cloudflare",
    title: "Frontend DevOps",
  },
  {
    description: "Making tasks, code and architecture easier to understand, maintain and evolve.",
    expandedDescription:
      "I believe successful delivery starts with work that people can clearly understand. From well-defined tasks to readable, maintainable code, I focus on reducing unnecessary complexity so teams can move confidently and products can evolve more easily.",
    index: "04",
    technicalDetail: "Readable · Maintainable",
    title: "Simplicity and Clarity",
  },
  {
    description:
      "Aligning people, disciplines and goals to guide teams and products successfully from idea to delivery.",
    expandedDescription:
      "I’ve led frontend teams and guided projects from their earliest stages through delivery. My priority is creating an environment where people have clear goals, feel supported and work as one team around the success of the product.",
    index: "05",
    technicalDetail: "People · Ownership",
    title: "One-Team Collaboration",
  },
]

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
        threshold: 0.2,
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

export const HomeSection = () => {
  const [activeStrength, setActiveStrength] = useState<IStrengthItem | null>(null)
  const activeCardReference = useRef<HTMLElement | null>(null)
  const [introductionReference, isIntroductionVisible] = useRevealOnIntersection<HTMLDivElement>()
  const [showcaseReference, isShowcaseVisible] = useRevealOnIntersection<HTMLDivElement>()
  const visibleHeading = useTypedHeading(isIntroductionVisible)
  const visibleRegularHeading = visibleHeading.slice(0, regularHeading.length)
  const visibleEmphasizedHeading = visibleHeading.slice(regularHeading.length)

  useEffect(() => {
    if (!activeStrength) {
      return
    }

    const originalBodyOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    return () => {
      document.body.style.overflow = originalBodyOverflow
    }
  }, [activeStrength])

  const handleStrengthOpen = (strength: IStrengthItem, sourceElement: HTMLElement) => {
    activeCardReference.current = sourceElement
    setActiveStrength(strength)
  }

  const handleStrengthClose = () => {
    setActiveStrength(null)
    window.requestAnimationFrame(() => activeCardReference.current?.focus())
  }

  return (
    <div className={styles.containerWrapper} id="top">
      <section className={styles.heroSectionContainer} aria-labelledby="hero-title">
        <div
          className={getClassNames(
            styles.heroIntroductionContainer,
            isIntroductionVisible && styles.heroIntroductionVisible,
          )}
          ref={introductionReference}
        >
          <p className={styles.heroEyebrow}>12+ Years · Products · People</p>
          <h1 id="hero-title" aria-label={heading}>
            <span aria-hidden="true">
              {visibleRegularHeading}
              <em>{visibleEmphasizedHeading}</em>
            </span>
          </h1>
          <p className={styles.heroIntroduction}>
            I’m Jur 👋—a frontend engineer and technical leader who enjoys turning complex ideas
            into clear, scalable experiences while helping the people around me do their best work.
          </p>
        </div>

        <section
          aria-labelledby="strengths-title"
          className={getClassNames(
            styles.capabilityShowcaseContainer,
            isShowcaseVisible && styles.capabilityShowcaseVisible,
          )}
          id="expertise"
          ref={showcaseReference}
        >
          <h2 className={styles.visuallyHidden} id="strengths-title">
            Core strengths
          </h2>
          <div className={styles.orbitOuter} aria-hidden="true"></div>
          <div className={styles.orbitInner} aria-hidden="true"></div>
          <div className={styles.orbitGlow} aria-hidden="true"></div>

          <div className={styles.profileCardContainer} id="approach">
            <div className={styles.profileImageContainer}>
              <img
                src={profileImage}
                alt="Portrait of Jurgen Baldacchino"
                decoding="async"
                height="479"
                loading="lazy"
                width="480"
              />
            </div>
            <p>Head of Frontend · React Engineer</p>
            <h2>Building the systems and teams behind excellent products.</h2>
            <a href="#contact">
              Let&apos;s work together <span aria-hidden="true">↗</span>
            </a>
          </div>

          <ul className={styles.strengthsList} aria-label="Core strengths">
            {strengths.map((strength) => (
              <li className={styles.strengthListItem} key={strength.index}>
                <StrengthCard
                  {...strength}
                  onOpen={(sourceElement) => handleStrengthOpen(strength, sourceElement)}
                />
              </li>
            ))}
          </ul>
        </section>
      </section>
      <AiSection />
      {activeStrength && (
        <div className={styles.expandedStrengthCardOverlay}>
          <StrengthCard {...activeStrength} isExpanded onClose={handleStrengthClose} />
        </div>
      )}
    </div>
  )
}

export default HomeSection
