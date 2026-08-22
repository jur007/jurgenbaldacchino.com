import { useState } from "react"

import styles from "./project-detail.module.css"
import type { IProjectDetail } from "./project-detail.types"

import { getClassNames } from "@utils/class-names"

const BackArrowIcon = () => (
  <svg
    aria-hidden="true"
    className={styles.backIcon}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <line x1="19" x2="5" y1="12" y2="12" />
    <polyline points="12 19 5 12 12 5" />
  </svg>
)

const ExternalLinkIcon = () => (
  <svg
    aria-hidden="true"
    className={styles.externalIcon}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" x2="21" y1="14" y2="3" />
  </svg>
)

export const ProjectDetail = ({ project, onBack, className }: IProjectDetail) => {
  const [isWhatIDidOpen, setIsWhatIDidOpen] = useState(true)
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(true)

  const handleToggleWhatIDid = () => {
    setIsWhatIDidOpen((isOpen) => !isOpen)
  }

  const handleToggleSolutions = () => {
    setIsSolutionsOpen((isOpen) => !isOpen)
  }

  return (
    <article className={getClassNames(styles.containerWrapper, className)}>
      <button
        aria-label="Back to showcase gallery"
        className={styles.backButton}
        onClick={onBack}
        type="button"
      >
        <BackArrowIcon />
        <span>Back to Showcase</span>
      </button>

      <div className={styles.detailLayoutGrid}>
        <div className={styles.mainColumn}>
          <header className={styles.titleHeader}>
            <span className={styles.categoryTag}>{project.categoryLabel}</span>
            <h1 className={styles.projectTitle}>{project.title}</h1>
            {project.subtitle && <p className={styles.projectSubtitle}>{project.subtitle}</p>}
            <p className={styles.projectSummary}>{project.summary}</p>
          </header>

          <section aria-label="Project breakdown" className={styles.accordionSection}>
            <div
              className={getClassNames(
                styles.accordionItem,
                isWhatIDidOpen && styles.accordionItemOpen,
              )}
            >
              <button
                aria-controls="accordion-what-i-did"
                aria-expanded={isWhatIDidOpen}
                className={styles.accordionTrigger}
                onClick={handleToggleWhatIDid}
                type="button"
              >
                <span>Key Responsibilities &amp; Scope</span>
                <span className={styles.accordionToggleSymbol} aria-hidden="true">
                  {isWhatIDidOpen ? "−" : "+"}
                </span>
              </button>
              {isWhatIDidOpen && (
                <div className={styles.accordionContent} id="accordion-what-i-did">
                  {Array.isArray(project.whatIDid) ? (
                    <ul>
                      {project.whatIDid.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>{project.whatIDid}</p>
                  )}
                </div>
              )}
            </div>

            <div
              className={getClassNames(
                styles.accordionItem,
                isSolutionsOpen && styles.accordionItemOpen,
              )}
            >
              <button
                aria-controls="accordion-solutions"
                aria-expanded={isSolutionsOpen}
                className={styles.accordionTrigger}
                onClick={handleToggleSolutions}
                type="button"
              >
                <span>Technical Architecture &amp; Solutions</span>
                <span className={styles.accordionToggleSymbol} aria-hidden="true">
                  {isSolutionsOpen ? "−" : "+"}
                </span>
              </button>
              {isSolutionsOpen && (
                <div className={styles.accordionContent} id="accordion-solutions">
                  {Array.isArray(project.technicalSolutions) ? (
                    <ul>
                      {project.technicalSolutions.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>{project.technicalSolutions}</p>
                  )}
                </div>
              )}
            </div>
          </section>
        </div>

        <aside aria-label="Project metadata" className={styles.sidebarCard}>
          <div className={styles.sidebarTitle}>Project Specifications</div>

          <dl className={styles.metaTable}>
            <div className={styles.metaRow}>
              <dt className={styles.metaLabel}>Role</dt>
              <dd className={styles.metaValue}>{project.role}</dd>
            </div>

            <div className={styles.metaRow}>
              <dt className={styles.metaLabel}>Client / Org</dt>
              <dd className={styles.metaValue}>{project.clientOrOrg}</dd>
            </div>

            <div className={styles.metaRow}>
              <dt className={styles.metaLabel}>Timeline</dt>
              <dd className={styles.metaValue}>{project.timeline}</dd>
            </div>

            {project.metrics && (
              <div className={styles.metaRow}>
                <dt className={styles.metaLabel}>Key Impact</dt>
                <dd className={getClassNames(styles.metaValue, styles.metricValue)}>
                  {project.metrics}
                </dd>
              </div>
            )}

            <div className={styles.metaRow}>
              <dt className={styles.metaLabel}>Tech Stack</dt>
              <dd className={styles.metaValue}>
                <div className={styles.techTagList}>
                  {project.technologies.map((tech) => (
                    <span className={styles.techTag} key={tech}>
                      {tech}
                    </span>
                  ))}
                </div>
              </dd>
            </div>
          </dl>

          {project.liveUrl && (
            <div className={styles.sidebarActions}>
              <a
                className={styles.actionButtonPrimary}
                href={project.liveUrl}
                rel="noreferrer"
                target="_blank"
              >
                <span>Visit Live Website</span>
                <ExternalLinkIcon />
              </a>
            </div>
          )}

          <div className={styles.sidebarFooterText}>
            Engineered with Modern TypeScript &amp; Performance Standards
          </div>
        </aside>
      </div>
    </article>
  )
}

export default ProjectDetail
