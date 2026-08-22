import styles from "./about-section.module.css"

import aboutProfileImage from "@/assets/about-profile.jpg"

export const AboutSection = () => {
  return (
    <section className={styles.containerWrapper} id="top" aria-labelledby="about-title">
      <div className={styles.imagePanelContainer}>
        <img
          src={aboutProfileImage}
          alt="Jurgen Baldacchino overlooking a snow-covered mountain landscape"
          decoding="async"
          fetchPriority="high"
          height="2166"
          width="1624"
        />
      </div>

      <div className={styles.aboutContentContainer}>
        <p className={styles.aboutEyebrow}>A life in motion</p>
        <h1 id="about-title">
          Driven by curiosity, craft, and <em>exploration.</em>
        </h1>
        <p className={styles.aboutIntroduction}>
          Originally from Malta and working globally, I&apos;m drawn to mountains exploration, and
          anything with an engine. Immersing myself in new environments keeps my thinking fresh,
          bringing energetic perspective to how I approach technical architecture, complex product
          challenges, and team leadership.
        </p>
        <div className={styles.aboutLocationContainer} aria-label="Location">
          <span>From</span>
          <strong>Malta</strong>
          <span aria-hidden="true">→</span>
          <span>Now</span>
          <strong>Wherever next</strong>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
