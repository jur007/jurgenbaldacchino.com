import styles from "./not-found-section.module.css"

export const NotFoundSection = () => {
  return (
    <section className={styles.containerWrapper} aria-labelledby="not-found-title">
      <p className={styles.statusCode}>404 · Page not found</p>
      <h1 id="not-found-title">This page wandered off.</h1>
      <p className={styles.description}>
        The address may have changed, or the page may no longer exist. Let&apos;s get you back
        somewhere useful.
      </p>
      <a className={styles.homeLink} href="/">
        Return home
      </a>
    </section>
  )
}

export default NotFoundSection
