import { useEffect, useRef, useState } from "react"
import type { CSSProperties } from "react"

import styles from "./home-section.module.css"

import { getClassNames } from "@utils/class-names"

interface ICapabilityItem {
  index: string
  title: string
  copy: string
}

interface IAnimationProperties extends CSSProperties {
  "--animation-index": number
}

interface IHeadingWord {
  emphasized?: boolean
  text: string
}

const heading = "I build frontend teams and products that endure."
const headingWords: IHeadingWord[] = [
  { text: "I" },
  { text: "build" },
  { text: "frontend" },
  { text: "teams" },
  { text: "and" },
  { text: "products" },
  { text: "that" },
  { emphasized: true, text: "endure." },
]

const capabilities: ICapabilityItem[] = [
  {
    index: "01",
    title: "Frontend architecture",
    copy: "Scalable foundations for ambitious digital products.",
  },
  {
    index: "02",
    title: "Engineering leadership",
    copy: "Direction, mentorship, and healthy delivery practices.",
  },
  {
    index: "03",
    title: "Design systems",
    copy: "Shared language that helps teams build with confidence.",
  },
  {
    index: "04",
    title: "Product experience",
    copy: "Accessible interfaces shaped around real user needs.",
  },
  {
    index: "05",
    title: "Technical strategy",
    copy: "Practical paths through complex product decisions.",
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

export const HomeSection = () => {
  const [introductionReference, isIntroductionVisible] = useRevealOnIntersection<HTMLDivElement>()
  const [showcaseReference, isShowcaseVisible] = useRevealOnIntersection<HTMLDivElement>()
  let characterIndex = 0

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
              {headingWords.map((word) => (
                <span
                  className={getClassNames(
                    styles.headingWord,
                    word.emphasized && styles.headingWordEmphasized,
                  )}
                  key={word.text}
                >
                  {[...word.text].map((character) => {
                    const animationIndex = characterIndex
                    characterIndex += 1

                    return (
                      <span
                        className={styles.headingCharacter}
                        key={`${word.text}-${animationIndex}`}
                        style={{ "--animation-index": animationIndex } as IAnimationProperties}
                      >
                        {character}
                      </span>
                    )
                  })}
                </span>
              ))}
            </span>
          </h1>
          <p className={styles.heroIntroduction}>
            I&apos;m Jurgen, a frontend engineer and technical leader focused on turning complex
            product challenges into clear, scalable experiences—and helping the people behind them
            grow.
          </p>
        </div>

        <div
          className={getClassNames(
            styles.capabilityShowcaseContainer,
            isShowcaseVisible && styles.capabilityShowcaseVisible,
          )}
          id="expertise"
          ref={showcaseReference}
        >
          <div className={styles.orbitOuter} aria-hidden="true"></div>
          <div className={styles.orbitInner} aria-hidden="true"></div>
          <div className={styles.orbitGlow} aria-hidden="true"></div>

          <div className={styles.profileCardContainer} id="approach">
            <div className={styles.profileMonogram} aria-hidden="true">
              JB
            </div>
            <p>Frontend engineering · Leadership</p>
            <h2>Building the systems and teams behind excellent products.</h2>
            <a href="#contact">
              Let&apos;s work together <span aria-hidden="true">↗</span>
            </a>
          </div>

          <div className={styles.capabilityCardsContainer}>
            {capabilities.map((capability) => (
              <article className={styles.capabilityCardContainer} key={capability.index}>
                <div className={styles.capabilityCardHeader}>
                  <span>{capability.index}</span>
                  <span className={styles.capabilityCardSymbol} aria-hidden="true"></span>
                </div>
                <h2>{capability.title}</h2>
                <p>{capability.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomeSection
