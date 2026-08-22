import type { KeyboardEvent, MouseEvent } from "react"

import styles from "./showcase-card.module.css"
import type { IShowcaseCard } from "./showcase-card.types"

import { getClassNames } from "@utils/class-names"

const ArrowRightIcon = () => (
  <svg
    aria-hidden="true"
    className={styles.actionIcon}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
)

export const ShowcaseCard = ({ project, onSelect, className }: IShowcaseCard) => {
  const handleClick = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault()
    onSelect(project)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      onSelect(project)
    }
  }

  return (
    <div
      aria-label={`View details for ${project.title}`}
      className={getClassNames(styles.containerWrapper, className)}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      <div className={styles.previewContainer}>
        <img
          alt={`${project.title} preview`}
          className={styles.previewImage}
          decoding="async"
          loading="lazy"
          src={project.thumbnailUrl}
        />
        <div className={styles.categoryOverlayBadge}>
          <span
            className={styles.categoryDot}
            style={{
              backgroundColor: project.previewColor || "var(--color-electric-cyan)",
              boxShadow: `0 0 8px ${project.previewColor || "var(--color-electric-cyan)"}`,
            }}
          />
          <span>{project.categoryLabel}</span>
        </div>
      </div>

      <div className={styles.contentContainer}>
        <div className={styles.headerContainer}>
          <div className={styles.metaRow}>
            <span>{project.role}</span>
            {project.clientOrOrg && (
              <>
                <span className={styles.metaDivider}>·</span>
                <span>{project.clientOrOrg}</span>
              </>
            )}
            <span className={styles.metaDivider}>·</span>
            <span>{project.timeline}</span>
          </div>
          <h3 className={styles.projectTitle}>{project.title}</h3>
        </div>

        <p className={styles.projectSummary}>{project.summary}</p>

        {project.metrics && (
          <div className={styles.metricBadge}>
            <span className={styles.metricDot} />
            <span>{project.metrics}</span>
          </div>
        )}

        <div className={styles.footerContainer}>
          <div className={styles.techTagList}>
            {project.technologies.slice(0, 4).map((technology) => (
              <span className={styles.techTag} key={technology}>
                {technology}
              </span>
            ))}
          </div>
          <span className={styles.viewDetailsAction}>
            <span>Explore</span>
            <ArrowRightIcon />
          </span>
        </div>
      </div>
    </div>
  )
}

export default ShowcaseCard
