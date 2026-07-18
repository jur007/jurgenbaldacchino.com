import styles from "./ai-section.module.css"

export const AiSection = () => {
  return (
    <section className={styles.containerWrapper} aria-labelledby="ai-section-title">
      <div className={styles.headingContainer}>
        <p className={styles.eyebrow}>Working with AI</p>
        <h2 id="ai-section-title">
          AI-assisted. <em>Human-led.</em>
        </h2>
      </div>

      <div className={styles.contentContainer}>
        <p>
          I use AI to explore ideas, accelerate repetitive work and challenge technical
          decisions—while keeping architecture, quality and final judgment firmly human-led.
        </p>
        <div className={styles.signalContainer} aria-label="AI working principles">
          <span>Faster Exploration</span>
          <span aria-hidden="true">·</span>
          <span>Human Judgment</span>
        </div>
      </div>
    </section>
  )
}

export default AiSection
