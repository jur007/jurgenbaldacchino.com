import { useEffect, useRef } from "react"
import type { KeyboardEvent, MouseEvent } from "react"

import styles from "./strength-card.module.css"

import { getClassNames } from "@utils/class-names"

export interface IStrengthCard {
  description: string
  expandedDescription: string
  index: string
  isExpanded?: boolean
  onClose?: () => void
  onOpen?: (sourceElement: HTMLElement) => void
  prominent?: boolean
  technicalDetail: string
  title: string
}

const PlusIcon = () => (
  <svg aria-hidden="true" className={styles.cardActionIcon} fill="none" viewBox="0 0 24 24">
    <path d="M5 12H19M12 5V19" stroke="currentColor" strokeLinecap="round" />
  </svg>
)

const CloseIcon = () => (
  <svg aria-hidden="true" className={styles.cardActionIcon} fill="none" viewBox="0 0 24 24">
    <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeLinecap="round" />
  </svg>
)

export const StrengthCard = ({
  description,
  expandedDescription,
  index,
  isExpanded = false,
  onClose,
  onOpen,
  prominent = false,
  technicalDetail,
  title,
}: IStrengthCard) => {
  const closeButtonReference = useRef<HTMLButtonElement>(null)
  const headingId = `strength-${index}-${isExpanded ? "dialog" : "card"}-title`

  useEffect(() => {
    if (!isExpanded) {
      return
    }

    closeButtonReference.current?.focus()
  }, [isExpanded])

  const handleOpen = (event: MouseEvent<HTMLButtonElement>) => {
    onOpen?.(event.currentTarget)
  }

  const handleExpandedCardKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Escape") {
      onClose?.()
      return
    }

    if (event.key === "Tab") {
      event.preventDefault()
      closeButtonReference.current?.focus()
    }
  }

  return (
    <article
      aria-labelledby={headingId}
      aria-modal={isExpanded || undefined}
      className={getClassNames(
        styles.containerWrapper,
        prominent && styles.prominentStrengthCard,
        isExpanded && styles.expandedStrengthCard,
      )}
      onKeyDown={isExpanded ? handleExpandedCardKeyDown : undefined}
      role={isExpanded ? "dialog" : undefined}
    >
      <div className={styles.cardHeaderContainer}>
        <span>{index}</span>
        {isExpanded ? (
          <button
            aria-label={`Close ${title} details`}
            className={styles.cardCloseButton}
            onClick={onClose}
            ref={closeButtonReference}
            type="button"
          >
            <CloseIcon />
          </button>
        ) : (
          <span className={styles.cardSymbol} aria-hidden="true">
            <PlusIcon />
          </span>
        )}
      </div>
      <h3 id={headingId}>{title}</h3>
      <p>{description}</p>
      {isExpanded && <p className={styles.expandedDescription}>{expandedDescription}</p>}
      <span className={styles.technicalDetail}>{technicalDetail}</span>
      {!isExpanded && (
        <button
          aria-label={`Open ${title} details`}
          className={styles.cardOpenButton}
          onClick={handleOpen}
          type="button"
        ></button>
      )}
    </article>
  )
}

export default StrengthCard
