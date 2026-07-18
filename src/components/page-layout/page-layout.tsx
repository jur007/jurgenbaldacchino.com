import { useState } from "react"
import type { ReactNode } from "react"

import styles from "./page-layout.module.css"

import { getClassNames } from "@utils/class-names"

export interface IPageLayout {
  children: ReactNode
}

export const PageLayout = ({ children }: IPageLayout) => {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false)

  const handleMenuToggle = () => {
    setIsNavigationOpen((isOpen) => !isOpen)
  }

  const handleNavigationClick = () => {
    setIsNavigationOpen(false)
  }

  return (
    <div className={styles.containerWrapper}>
      <a className={styles.skipToContentLink} href="#main-content">
        Skip to content
      </a>
      <header className={styles.headerContainer}>
        <a className={styles.brandLink} href="/" aria-label="Jurgen Baldacchino — home">
          <span className={styles.brandMonogram} aria-hidden="true">
            JB
          </span>
          <span className={styles.brandTextContainer}>
            Jurgen Baldacchino
            <small>Frontend engineering · Leadership</small>
          </span>
        </a>
        <button
          className={getClassNames(
            styles.mobileMenuButton,
            isNavigationOpen && styles.mobileMenuButtonOpen,
          )}
          type="button"
          aria-controls="primary-navigation"
          aria-expanded={isNavigationOpen}
          aria-label={isNavigationOpen ? "Close navigation" : "Open navigation"}
          onClick={handleMenuToggle}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
        <nav
          className={getClassNames(
            styles.navigationContainer,
            isNavigationOpen && styles.navigationContainerOpen,
          )}
          id="primary-navigation"
          aria-label="Primary navigation"
        >
          <a href="/#expertise" onClick={handleNavigationClick}>
            Expertise
          </a>
          <a href="/#approach" onClick={handleNavigationClick}>
            Approach
          </a>
          <a href="/about" onClick={handleNavigationClick}>
            About
          </a>
          <a
            className={styles.navigationCallToAction}
            href="#contact"
            onClick={handleNavigationClick}
          >
            Let&apos;s talk
          </a>
        </nav>
      </header>
      <main id="main-content">{children}</main>
      <footer className={styles.footerContainer} id="contact">
        <div>
          <span className={styles.footerEyebrow}>Start a conversation</span>
          <h2>Building something ambitious?</h2>
        </div>
        <a className={styles.contactLink} href="mailto:hello@jurgenbaldacchino.com">
          hello@jurgenbaldacchino.com <span aria-hidden="true">↗</span>
        </a>
      </footer>
    </div>
  )
}

export default PageLayout
