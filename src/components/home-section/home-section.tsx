import styles from "./home-section.module.css"

interface ICapabilityItem {
  index: string
  title: string
  copy: string
}

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

export const HomeSection = () => {
  return (
    <div className={styles.containerWrapper} id="top">
      <section className={styles.heroSectionContainer} aria-labelledby="hero-title">
        <div className={styles.heroIntroductionContainer}>
          <p className={styles.heroEyebrow}>Senior Frontend Developer · Head of Frontend</p>
          <h1 id="hero-title">
            I build frontend teams and products that <em>endure.</em>
          </h1>
          <p className={styles.heroIntroduction}>
            I&apos;m Jurgen, a frontend engineer and technical leader focused on turning complex
            product challenges into clear, scalable experiences—and helping the people behind them
            grow.
          </p>
        </div>

        <div className={styles.capabilityShowcaseContainer} id="expertise">
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
