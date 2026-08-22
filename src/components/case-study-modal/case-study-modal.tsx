import { useEffect, useState } from "react"
import type { KeyboardEvent, MouseEvent } from "react"

import styles from "./case-study-modal.module.css"
import type { ICaseStudyModal } from "./case-study-modal.types"

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

const CloseIcon = () => (
  <svg
    aria-hidden="true"
    className={styles.closeIcon}
    fill="none"
    stroke="currentColor"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
  >
    <line x1="18" x2="6" y1="6" y2="18" />
    <line x1="6" x2="18" y1="6" y2="18" />
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

export const CaseStudyModal = ({ project, isOpen, onClose, className }: ICaseStudyModal) => {
  const [isScopeOpen, setIsScopeOpen] = useState(true)
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(true)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  useEffect(() => {
    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen || !project) {
    return null
  }

  const handleBackdropClick = () => {
    onClose()
  }

  const handleBackdropKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      onClose()
    }
  }

  const handleDialogClick = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
  }

  const handleToggleScope = () => {
    setIsScopeOpen((open) => !open)
  }

  const handleToggleSolutions = () => {
    setIsSolutionsOpen((open) => !open)
  }

  return (
    <div
      aria-labelledby="case-study-title"
      aria-modal="true"
      className={getClassNames(styles.containerWrapper, className)}
      role="dialog"
    >
      <div
        aria-hidden="true"
        className={styles.modalBackdrop}
        onClick={handleBackdropClick}
        onKeyDown={handleBackdropKeyDown}
      />

      <div className={styles.modalDialog} onClick={handleDialogClick} role="document">
        <header className={styles.topBar}>
          <button
            aria-label="Back to showcase gallery"
            className={styles.backButton}
            onClick={onClose}
            type="button"
          >
            <BackArrowIcon />
            <span>Back to Showcase</span>
          </button>

          <button
            aria-label="Close case study modal"
            className={styles.closeButton}
            onClick={onClose}
            type="button"
          >
            <CloseIcon />
          </button>
        </header>

        <div className={styles.modalScrollArea}>
          <div className={styles.splitLayout}>
            <div className={styles.mainColumn}>
              <div className={styles.headerContainer}>
                <span className={styles.categoryTag}>
                  <span
                    className={styles.categoryDot}
                    style={{
                      backgroundColor: project.badgeColor || "var(--color-electric-cyan)",
                      boxShadow: `0 0 8px ${project.badgeColor || "var(--color-electric-cyan)"}`,
                    }}
                  />
                  <span>{project.categoryLabel}</span>
                </span>
                <h1 className={styles.projectTitle} id="case-study-title">
                  {project.title}
                </h1>
                <p className={styles.projectSubtitle}>{project.subtitle}</p>
                <p className={styles.projectSummary}>{project.summary}</p>
              </div>

              <section aria-label="Case study details" className={styles.accordionSection}>
                <div
                  className={getClassNames(
                    styles.accordionItem,
                    isScopeOpen && styles.accordionItemOpen,
                  )}
                >
                  <button
                    aria-controls="accordion-scope"
                    aria-expanded={isScopeOpen}
                    className={styles.accordionTrigger}
                    onClick={handleToggleScope}
                    type="button"
                  >
                    <span>What I Did</span>
                    <span className={styles.accordionToggleSymbol} aria-hidden="true">
                      {isScopeOpen ? "−" : "+"}
                    </span>
                  </button>
                  {isScopeOpen && (
                    <div className={styles.accordionContent} id="accordion-scope">
                      <ul className={styles.bulletList}>
                        {project.whatIDid.map((item, index) => (
                          <li className={styles.bulletListItem} key={index}>
                            {item}
                          </li>
                        ))}
                      </ul>
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
                    <span>Under the Hood</span>
                    <span className={styles.accordionToggleSymbol} aria-hidden="true">
                      {isSolutionsOpen ? "−" : "+"}
                    </span>
                  </button>
                  {isSolutionsOpen && (
                    <div className={styles.accordionContent} id="accordion-solutions">
                      <ul className={styles.bulletList}>
                        {project.technicalApproach.map((item, index) => (
                          <li className={styles.bulletListItem} key={index}>
                            {item}
                          </li>
                        ))}
                      </ul>
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
                <a
                  className={styles.actionButtonPrimary}
                  href={project.liveUrl}
                  rel="noreferrer"
                  target="_blank"
                >
                  <span>Visit Live Website</span>
                  <ExternalLinkIcon />
                </a>
              )}

              <div className={styles.sidebarFooterText}>
                Engineered with Modern Frontend &amp; Web Standards
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CaseStudyModal
