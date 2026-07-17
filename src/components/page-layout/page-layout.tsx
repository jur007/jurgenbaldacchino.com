import type { ReactNode } from "react"

import styles from "./page-layout.module.css"

export interface IPageLayout {
  children: ReactNode
}

export const PageLayout = ({ children }: IPageLayout) => {
  return (
    <div className={styles.containerWrapper}>
      <a className={styles.skipToContentLink} href="#main-content">
        Skip to content
      </a>
      <header className={styles.headerContainer}>
        <a className={styles.brandLink} href="#top" aria-label="Jurgen Baldacchino — home">
          <span className={styles.brandMonogram} aria-hidden="true">
            JB
          </span>
          <span className={styles.brandTextContainer}>
            Jurgen Baldacchino
            <small>Frontend engineering · Leadership</small>
          </span>
        </a>
        <nav className={styles.navigationContainer} aria-label="Primary navigation">
          <a href="#expertise">Expertise</a>
          <a href="#approach">Approach</a>
          <a className={styles.navigationCallToAction} href="#contact">
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
