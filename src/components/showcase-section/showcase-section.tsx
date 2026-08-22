import { useEffect, useState } from "react"

import styles from "./showcase-section.module.css"
import type { IShowcaseCategory, IShowcaseSection } from "./showcase-section.types"

import { CaseStudyModal } from "@components/case-study-modal"
import { ShowcaseCard } from "@components/showcase-card"
import { showcaseProjects } from "@data/showcase"
import type { IProject } from "@data/showcase"
import { getClassNames } from "@utils/class-names"

const categories: Array<{ id: IShowcaseCategory; label: string }> = [
  { id: "all", label: "ALL" },
  { id: "react", label: "REACT ARCHITECTURE" },
  { id: "canvas", label: "CREATIVE / CANVAS" },
]

const getInitialProjectId = (initialProjectId?: string): string | null => {
  if (initialProjectId) {
    return initialProjectId
  }

  if (typeof window !== "undefined") {
    const searchParameters = new URLSearchParams(window.location.search)
    const projectFromUrl = searchParameters.get("project")
    if (projectFromUrl && showcaseProjects.some((project) => project.id === projectFromUrl)) {
      return projectFromUrl
    }
  }

  return null
}

export const ShowcaseSection = ({ initialProjectId, className }: IShowcaseSection) => {
  const [selectedCategory, setSelectedCategory] = useState<IShowcaseCategory>("all")
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(() =>
    getInitialProjectId(initialProjectId),
  )

  useEffect(() => {
    const handlePopState = () => {
      const searchParameters = new URLSearchParams(window.location.search)
      const projectFromUrl = searchParameters.get("project")
      setSelectedProjectId(projectFromUrl ?? null)
    }

    window.addEventListener("popstate", handlePopState)
    return () => window.removeEventListener("popstate", handlePopState)
  }, [])

  const selectedProject = showcaseProjects.find((project) => project.id === selectedProjectId)

  const handleCategoryFilterChange = (categoryId: IShowcaseCategory) => {
    setSelectedCategory(categoryId)
  }

  const handleProjectSelect = (project: IProject) => {
    setSelectedProjectId(project.id)
    if (typeof window !== "undefined" && window.history?.pushState) {
      const url = new URL(window.location.href)
      url.searchParams.set("project", project.id)
      window.history.pushState({}, "", url)
    }
  }

  const handleModalClose = () => {
    setSelectedProjectId(null)
    if (typeof window !== "undefined" && window.history?.pushState) {
      const url = new URL(window.location.href)
      url.searchParams.delete("project")
      window.history.pushState({}, "", url)
    }
  }

  const filteredProjects = showcaseProjects.filter((project) => {
    if (selectedCategory === "all") {
      return true
    }
    return project.category === selectedCategory
  })

  const getCategoryCount = (categoryId: IShowcaseCategory) => {
    if (categoryId === "all") {
      return showcaseProjects.length
    }
    return showcaseProjects.filter((project) => project.category === categoryId).length
  }

  return (
    <section
      aria-labelledby="showcase-title"
      className={getClassNames(styles.containerWrapper, className)}
      id="showcase"
    >
      <header className={styles.showcaseHeader}>
        <span className={styles.showcaseEyebrow}>Selected Work</span>
        <h2 className={styles.showcaseTitle} id="showcase-title">
          Showcase
        </h2>
        <p className={styles.showcaseSubtitle}>
          A selection of production systems, web platforms, and interactive engines I&apos;ve been a
          part of leading and building.
        </p>
      </header>

      <div className={styles.filterNavigationWrapper}>
        <nav aria-label="Filter showcase projects" className={styles.filterNavigation}>
          {categories.map((category) => {
            const count = getCategoryCount(category.id)
            const isActive = selectedCategory === category.id

            return (
              <button
                aria-pressed={isActive}
                className={getClassNames(
                  styles.filterButton,
                  isActive && styles.filterButtonActive,
                )}
                key={category.id}
                onClick={() => handleCategoryFilterChange(category.id)}
                type="button"
              >
                <span>{category.label}</span>
                <span className={styles.filterCount}>({count})</span>
              </button>
            )
          })}
        </nav>
      </div>

      <ul aria-label="Showcase projects gallery" className={styles.projectGrid}>
        {filteredProjects.map((project) => (
          <li key={project.id}>
            <ShowcaseCard onSelect={handleProjectSelect} project={project} />
          </li>
        ))}
      </ul>

      {filteredProjects.length === 0 && (
        <div className={styles.emptyStateMessage}>
          <p>No projects found matching the selected category.</p>
        </div>
      )}

      <CaseStudyModal
        isOpen={Boolean(selectedProject)}
        onClose={handleModalClose}
        project={selectedProject ?? null}
      />
    </section>
  )
}

export const ShowcaseGrid = ShowcaseSection
export default ShowcaseSection
