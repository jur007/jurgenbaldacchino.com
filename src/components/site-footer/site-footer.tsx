import styles from "./site-footer.module.css"

enum SocialIcon {
  GitHub = "github",
  Instagram = "instagram",
  LinkedIn = "linkedin",
}

interface ISocialLink {
  href: string
  icon: SocialIcon
  label: string
}

const socialLinks: ISocialLink[] = [
  {
    href: "https://github.com/jur007",
    icon: SocialIcon.GitHub,
    label: "GitHub",
  },
  {
    href: "https://mt.linkedin.com/in/jurgen-baldacchino-aab41062",
    icon: SocialIcon.LinkedIn,
    label: "LinkedIn",
  },
  {
    href: "https://www.instagram.com/jur_007/",
    icon: SocialIcon.Instagram,
    label: "Instagram",
  },
]

interface ISocialIconGraphic {
  icon: SocialIcon
}

const SocialIconGraphic = ({ icon }: ISocialIconGraphic) => {
  if (icon === SocialIcon.Instagram) {
    return (
      <svg aria-hidden="true" className={styles.socialIcon} fill="none" viewBox="0 0 24 24">
        <rect height="18" rx="5" stroke="currentColor" strokeWidth="1.8" width="18" x="3" y="3" />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="17.5" cy="6.5" fill="currentColor" r="1" />
      </svg>
    )
  }

  const path =
    icon === SocialIcon.GitHub
      ? "M12 .7C5.7.7.6 5.8.6 12.1c0 5 3.3 9.2 7.8 10.7.6.1.8-.3.8-.6v-2.3c-3.2.7-3.9-1.4-3.9-1.4-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.4 1 .1-.8.4-1.3.8-1.6-2.5-.3-5.2-1.3-5.2-5.6 0-1.2.4-2.2 1.2-3-.1-.3-.5-1.5.1-3 0 0 1-.3 3.2 1.2.9-.3 1.9-.4 2.9-.4s2 .1 2.9.4C17 6 18 6.3 18 6.3c.6 1.5.2 2.7.1 3 .8.8 1.2 1.8 1.2 3 0 4.3-2.7 5.3-5.2 5.6.4.4.8 1.1.8 2.1v3.1c0 .4.2.7.8.6 4.5-1.5 7.8-5.7 7.8-10.7C23.4 5.8 18.3.7 12 .7Z"
      : "M5.3 7.9H1.8V22h3.5V7.9ZM3.5 2A2 2 0 1 0 3.5 6a2 2 0 0 0 0-4ZM22 13.9c0-4.3-2.3-6.3-5.4-6.3a4.7 4.7 0 0 0-4.2 2.3v-2H8.9V22h3.5v-7c0-1.8.3-3.6 2.6-3.6s2.3 2.1 2.3 3.7V22H22v-8.1Z"

  return (
    <svg aria-hidden="true" className={styles.socialIcon} fill="currentColor" viewBox="0 0 24 24">
      <path d={path} />
    </svg>
  )
}

export const SiteFooter = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.containerWrapper} id="contact">
      <div className={styles.contactContainer}>
        <span className={styles.contactEyebrow}>Start a conversation</span>
        <a className={styles.contactLink} href="mailto:hello@jurgenbaldacchino.com">
          hello@jurgenbaldacchino.com
        </a>
      </div>

      <nav aria-label="Social media">
        <ul className={styles.socialLinksList}>
          {socialLinks.map(({ href, icon, label }) => (
            <li key={label}>
              <a className={styles.socialLink} href={href} rel="noreferrer" target="_blank">
                <SocialIconGraphic icon={icon} />
                <span>{label}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <p className={styles.copyrightText}>
        © {currentYear} Jurgen Baldacchino. All rights reserved.
      </p>
    </footer>
  )
}

export default SiteFooter
