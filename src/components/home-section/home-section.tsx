import { useEffect, useRef, useState } from "react"

import styles from "./home-section.module.css"

import profileImage from "@/assets/profile.jpg"
import { StrengthCard } from "@components/strength-card"
import { getClassNames } from "@utils/class-names"

interface IStrengthItem {
  description: string
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
    description: "Building scalable, maintainable frontend applications with React and TypeScript.",
    index: "01",
    prominent: true,
    technicalDetail: "React · TypeScript",
    title: "React Engineering",
  },
  {
    description:
      "Combining engineering with creativity through interactive experiences and 2D development.",
    index: "02",
    technicalDetail: "Interactive experiences · Phaser",
    title: "Creative Development",
  },
  {
    description: "Automating reliable frontend delivery across modern platforms and environments.",
    index: "03",
    technicalDetail: "YAML · Azure DevOps · Cloudflare",
    title: "Frontend DevOps",
  },
  {
    description:
      "Creating readable, intentional solutions that remain easy to understand, maintain and evolve.",
    index: "04",
    technicalDetail: "Readable · Intentional · Adaptable",
    title: "Simplicity and Clarity",
  },
  {
    description:
      "Bringing design, product and engineering together around shared goals and collective ownership.",
    index: "05",
    technicalDetail: "Design · Product · Engineering",
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
    }, 42)

    return () => window.clearInterval(typingTimer)
  }, [isActive])

  return heading.slice(0, visibleCharacterCount)
}

export const HomeSection = () => {
  const [introductionReference, isIntroductionVisible] = useRevealOnIntersection<HTMLDivElement>()
  const [showcaseReference, isShowcaseVisible] = useRevealOnIntersection<HTMLDivElement>()
  const visibleHeading = useTypedHeading(isIntroductionVisible)
  const visibleRegularHeading = visibleHeading.slice(0, regularHeading.length)
  const visibleEmphasizedHeading = visibleHeading.slice(regularHeading.length)

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
          <p className={styles.heroEyebrow}>Senior Frontend Developer · Head of Frontend</p>
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
              <img src={profileImage} alt="Jur Baldacchino" />
            </div>
            <p>Frontend engineering · Leadership</p>
            <h2>Building the systems and teams behind excellent products.</h2>
            <a href="#contact">
              Let&apos;s work together <span aria-hidden="true">↗</span>
            </a>
          </div>

          <ul className={styles.strengthsList} aria-label="Core strengths">
            {strengths.map((strength) => (
              <li className={styles.strengthListItem} key={strength.index}>
                <StrengthCard {...strength} />
              </li>
            ))}
          </ul>
        </section>
      </section>
    </div>
  )
}

export default HomeSection
