import { useEffect, useState } from "react"
import type { KeyboardEvent, ReactNode } from "react"

import styles from "./page-layout.module.css"

import { ChatSection } from "@components/chat-section"
import { SiteFooter } from "@components/site-footer"
import { getClassNames } from "@utils/class-names"

export interface IPageLayout {
  children: ReactNode
}

const MenuIcon = () => (
  <svg aria-hidden="true" className={styles.mobileMenuIcon} fill="none" viewBox="0 0 24 24">
    <path d="M4 7.5H20M4 12H20M4 16.5H20" stroke="currentColor" strokeLinecap="round" />
  </svg>
)

const CloseIcon = () => (
  <svg aria-hidden="true" className={styles.mobileMenuCloseIcon} fill="none" viewBox="0 0 24 24">
    <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeLinecap="round" />
  </svg>
)

export const PageLayout = ({ children }: IPageLayout) => {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false)

  useEffect(() => {
    if (isNavigationOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [isNavigationOpen])

  useEffect(() => {
    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape" && isNavigationOpen) {
        setIsNavigationOpen(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isNavigationOpen])

  const handleMenuToggle = () => {
    setIsNavigationOpen((isOpen) => !isOpen)
  }

  const handleNavigationClick = () => {
    setIsNavigationOpen(false)
  }

  const handleBackdropClick = () => {
    setIsNavigationOpen(false)
  }

  const handleBackdropKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      setIsNavigationOpen(false)
    }
  }

  return (
    <div className={styles.containerWrapper}>
      {isNavigationOpen && (
        <div
          aria-hidden="true"
          className={styles.mobileBackdropOverlay}
          onClick={handleBackdropClick}
          onKeyDown={handleBackdropKeyDown}
        />
      )}

      <header
        className={getClassNames(
          styles.headerContainer,
          isNavigationOpen && styles.headerContainerNavOpen,
        )}
      >
        <a className={styles.brandLink} href="/" aria-label="Jurgen Baldacchino — home">
          <span className={styles.brandMonogram} aria-hidden="true">
            JB
          </span>
          <span className={styles.brandTextContainer}>
            Jurgen Baldacchino
            <small>Head of Frontend · React Engineer</small>
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
          <MenuIcon />
          <CloseIcon />
        </button>

        <nav
          className={getClassNames(
            styles.navigationContainer,
            isNavigationOpen && styles.navigationContainerOpen,
          )}
          id="primary-navigation"
          aria-label="Primary navigation"
        >
          <a href="/" onClick={handleNavigationClick}>
            Home
          </a>
          <a href="/showcase/" onClick={handleNavigationClick}>
            Showcase
          </a>
          <a href="/about/" onClick={handleNavigationClick}>
            About
          </a>
          <a
            className={styles.navigationCallToAction}
            href="#contact"
            onClick={handleNavigationClick}
          >
            Let&apos;s chat
          </a>
        </nav>
      </header>

      <main id="main-content">{children}</main>
      <ChatSection />
      <SiteFooter />
    </div>
  )
}

export default PageLayout
