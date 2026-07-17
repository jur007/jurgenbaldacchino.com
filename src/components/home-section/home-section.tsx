import styles from "./home-section.module.css"

import { Badge, IBadgeSize } from "@components/badge"
import { ButtonLink, IButtonSize, IButtonType } from "@components/button"
import { Card } from "@components/card"

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
    <div className={styles.containerWrapper} id="top">
      <section className={styles.heroSectionContainer} aria-labelledby="hero-title">
        <div className={styles.heroBackgroundGlow} aria-hidden="true"></div>
        <div className={styles.heroContentContainer}>
          <Badge className={styles.availabilityBadge} size={IBadgeSize.MEDIUM} dot>
            Open to the right opportunity
          </Badge>
          <p className={styles.sectionEyebrow}>Senior Frontend Developer · Head of Frontend</p>
          <h1 id="hero-title">
            I build frontend teams and products that <em>endure.</em>
          </h1>
          <p className={styles.heroIntroduction}>
            Twelve years turning complex product challenges into clear, scalable experiences—and
            helping the engineers behind them grow.
          </p>
          <div className={styles.heroActionsContainer}>
            <ButtonLink href="#expertise" size={IButtonSize.LARGE}>
              Explore my expertise <span aria-hidden="true">↓</span>
            </ButtonLink>
            <ButtonLink href="#contact" type={IButtonType.SECONDARY} size={IButtonSize.LARGE}>
              Start a conversation
            </ButtonLink>
          </div>
        </div>

        <Card as="aside" className={styles.experiencePanel} aria-label="Experience overview">
          <div className={styles.experienceMonogramContainer} aria-hidden="true">
            <span>JB</span>
          </div>
          <div className={styles.experienceStatusContainer}>
            <span>Current focus</span>
            <strong>Frontend at scale</strong>
          </div>
          <dl className={styles.experienceMetricsList}>
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
          <div className={styles.experienceSignalBars} aria-hidden="true">
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
            <i></i>
          </div>
        </Card>
      </section>

      <section
        className={styles.professionalQualitiesContainer}
        aria-label="Professional qualities"
      >
        <p>Strategy with technical depth</p>
        <span aria-hidden="true">◆</span>
        <p>Systems built for people</p>
        <span aria-hidden="true">◆</span>
        <p>Quality without theatre</p>
      </section>

      <section
        className={styles.expertiseSectionContainer}
        id="expertise"
        aria-labelledby="expertise-title"
      >
        <div className={styles.sectionHeadingContainer}>
          <div>
            <p className={styles.sectionEyebrow}>What I bring</p>
            <h2 id="expertise-title">From interface detail to organisational direction.</h2>
          </div>
          <p>
            I work across the full frontend landscape: shaping the product, strengthening the
            platform, and creating the conditions for teams to deliver with confidence.
          </p>
        </div>

        <div className={styles.expertiseCardsGrid}>
          {expertise.map((item) => (
            <Card
              as="article"
              className={styles.expertiseCardContainer}
              interactive
              key={item.index}
            >
              <span className={styles.expertiseCardIndex}>{item.index}</span>
              <div className={styles.expertiseCardIcon} aria-hidden="true">
                <span></span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
              <ul className={styles.expertiseSkillsList} aria-label={`${item.title} skills`}>
                {item.tags.map((tag) => (
                  <li key={tag}>
                    <Badge>{tag}</Badge>
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </section>

      <section
        className={styles.leadershipSectionContainer}
        id="approach"
        aria-labelledby="approach-title"
      >
        <div className={styles.leadershipVisualContainer} aria-hidden="true">
          <div className={`${styles.leadershipOrbit} ${styles.leadershipOuterOrbit}`}></div>
          <div className={`${styles.leadershipOrbit} ${styles.leadershipInnerOrbit}`}></div>
          <div className={styles.leadershipExperienceValue}>12</div>
          <span>years of perspective</span>
        </div>
        <div className={styles.leadershipContentContainer}>
          <p className={styles.sectionEyebrow}>How I lead</p>
          <h2 id="approach-title">Clarity creates momentum.</h2>
          <p>
            The best frontend organisations combine high standards with low ego. I make the
            important decisions visible, turn ambiguity into a workable path, and keep quality
            connected to real customer outcomes.
          </p>
          <div className={styles.leadershipPrinciplesList}>
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
