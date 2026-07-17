import type { ReactNode } from "react"

import styles from "@styles/app.module.css"

export interface IPageLayout {
  children: ReactNode
}

export const PageLayout = ({ children }: IPageLayout) => {
  return (
    <div className={styles.pageLayout}>
      <a className={styles.skipLink} href="#main-content">
        Skip to content
      </a>
      <header className={styles.siteHeader}>
        <a className={styles.brand} href="#top" aria-label="Jurgen Baldacchino — home">
          <span className={styles.brandMark} aria-hidden="true">
            JB
          </span>
          <span className={styles.brandCopy}>
            Jurgen Baldacchino
            <small>Frontend engineering · Leadership</small>
          </span>
        </a>
        <nav className={styles.siteNav} aria-label="Primary navigation">
          <a href="#expertise">Expertise</a>
          <a href="#approach">Approach</a>
          <a className={styles.navCta} href="#contact">
            Let&apos;s talk
          </a>
        </nav>
      </header>
      <main id="main-content">{children}</main>
      <footer className={styles.siteFooter} id="contact">
        <div>
          <span className={styles.eyebrow}>Start a conversation</span>
          <h2>Building something ambitious?</h2>
        </div>
        <a className={styles.textLink} href="mailto:hello@jurgenbaldacchino.com">
          hello@jurgenbaldacchino.com <span aria-hidden="true">↗</span>
        </a>
      </footer>
    </div>
  )
}

export default PageLayout
