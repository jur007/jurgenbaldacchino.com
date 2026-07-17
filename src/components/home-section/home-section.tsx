import styles from "@styles/app.module.css"

interface IExpertiseItem {
  index: string
  title: string
  copy: string
  tags: string[]
}

const expertise: IExpertiseItem[] = [
  {
    index: "01",
    title: "Frontend architecture",
    copy: "Scalable foundations, thoughtful boundaries, and systems that stay understandable as teams and products grow.",
    tags: ["React", "TypeScript", "Design systems"],
  },
  {
    index: "02",
    title: "Engineering leadership",
    copy: "Clear technical direction, healthy delivery practices, and an environment where engineers can do their best work.",
    tags: ["Strategy", "Mentoring", "Delivery"],
  },
  {
    index: "03",
    title: "Product experience",
    copy: "Accessible, high-quality interfaces shaped through close collaboration with product and design partners.",
    tags: ["UX craft", "Accessibility", "Performance"],
  },
]

export const HomeSection = () => {
  return (
    <div id="top">
      <section className={styles.heroSection} aria-labelledby="hero-title">
        <div className={styles.heroGlow} aria-hidden="true"></div>
        <div className={styles.heroCopy}>
          <div className={styles.availability}>
            <span aria-hidden="true"></span>
            Open to the right opportunity
          </div>
          <p className={styles.eyebrow}>Senior Frontend Developer · Head of Frontend</p>
          <h1 id="hero-title">
            I build frontend teams and products that <em>endure.</em>
          </h1>
          <p className={styles.heroIntro}>
            Twelve years turning complex product challenges into clear, scalable experiences—and
            helping the engineers behind them grow.
          </p>
          <div className={styles.heroActions}>
            <a className={`${styles.button} ${styles.buttonPrimary}`} href="#expertise">
              Explore my expertise <span aria-hidden="true">↓</span>
            </a>
            <a className={`${styles.button} ${styles.buttonSecondary}`} href="#contact">
              Start a conversation
            </a>
          </div>
        </div>

        <aside className={styles.heroPanel} aria-label="Experience overview">
          <div className={styles.heroMonogram} aria-hidden="true">
            <span>JB</span>
          </div>
          <div className={styles.panelStatus}>
            <span>Current focus</span>
            <strong>Frontend at scale</strong>
          </div>
          <dl className={styles.metrics}>
            <div>
              <dt>Experience</dt>
              <dd>
                12<small>+ years</small>
              </dd>
            </div>
            <div>
              <dt>Perspective</dt>
              <dd>
                IC<small>+ leader</small>
              </dd>
            </div>
          </dl>
          <div className={styles.signal} aria-hidden="true">
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
          </div>
        </aside>
      </section>

      <section className={styles.proofStrip} aria-label="Professional qualities">
        <p>Strategy with technical depth</p>
        <span aria-hidden="true">◆</span>
        <p>Systems built for people</p>
        <span aria-hidden="true">◆</span>
        <p>Quality without theatre</p>
      </section>

      <section className={styles.expertiseSection} id="expertise" aria-labelledby="expertise-title">
        <div className={styles.sectionHeading}>
          <div>
            <p className={styles.eyebrow}>What I bring</p>
            <h2 id="expertise-title">From interface detail to organisational direction.</h2>
          </div>
          <p>
            I work across the full frontend landscape: shaping the product, strengthening the
            platform, and creating the conditions for teams to deliver with confidence.
          </p>
        </div>

        <div className={styles.expertiseGrid}>
          {expertise.map((item) => (
            <article className={styles.expertiseCard} key={item.index}>
              <span className={styles.cardIndex}>{item.index}</span>
              <div className={styles.cardIcon} aria-hidden="true">
                <span></span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
              <ul aria-label={`${item.title} skills`}>
                {item.tags.map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.approachSection} id="approach" aria-labelledby="approach-title">
        <div className={styles.approachVisual} aria-hidden="true">
          <div className={`${styles.orbit} ${styles.orbitOne}`}></div>
          <div className={`${styles.orbit} ${styles.orbitTwo}`}></div>
          <div className={styles.core}>12</div>
          <span>years of perspective</span>
        </div>
        <div className={styles.approachCopy}>
          <p className={styles.eyebrow}>How I lead</p>
          <h2 id="approach-title">Clarity creates momentum.</h2>
          <p>
            The best frontend organisations combine high standards with low ego. I make the
            important decisions visible, turn ambiguity into a workable path, and keep quality
            connected to real customer outcomes.
          </p>
          <div className={styles.principles}>
            <div>
              <span>01</span>
              <strong>Make the system legible</strong>
            </div>
            <div>
              <span>02</span>
              <strong>Give ownership with context</strong>
            </div>
            <div>
              <span>03</span>
              <strong>Measure what users feel</strong>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomeSection
