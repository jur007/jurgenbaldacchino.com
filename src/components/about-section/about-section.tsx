import styles from "./about-section.module.css"

import aboutProfileImage from "@/assets/about-profile.jpg"

export const AboutSection = () => {
  return (
    <section className={styles.containerWrapper} id="top" aria-labelledby="about-title">
      <div className={styles.imagePanelContainer}>
        <img
          src={aboutProfileImage}
          alt="Jur overlooking a snow-covered mountain landscape"
          decoding="async"
          fetchPriority="high"
          height="2166"
          width="1624"
        />
      </div>

      <div className={styles.aboutContentContainer}>
        <p className={styles.aboutEyebrow}>A life in motion</p>
        <h1 id="about-title">
          Curiosity keeps me <em>moving.</em>
        </h1>
        <p className={styles.aboutIntroduction}>
          Originally from Malta and now living as a digital nomad, I’m drawn to travel, mountains,
          adventure and anything with an engine. Exploring new places and experiencing different
          ways of life keeps me curious, offers fresh perspectives and brings new energy to how I
          approach products, challenges and people.
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
