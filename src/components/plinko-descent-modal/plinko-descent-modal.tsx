import { lazy, Suspense, useEffect } from "react"
import type { KeyboardEvent, MouseEvent } from "react"

import styles from "./plinko-descent-modal.module.css"
import type { IPlinkoDescentModalProps } from "./plinko-descent-modal.types"

import { CloseIcon } from "@components/icons"
import { getClassNames } from "@utils/class-names"

const PlinkoDescentGame = lazy(() =>
  import("@jurgenbaldacchino/phaser-showcase/plinko/descent").then((module) => ({
    default: module.PlinkoDescentGame,
  })),
)

export const PlinkoDescentModal = ({ isOpen, onClose, className }: IPlinkoDescentModalProps) => {
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

  if (!isOpen) {
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

  return (
    <div
      aria-label="Descent of the Damned Game Engine"
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
        <button
          aria-label="Close Descent"
          className={styles.closeButton}
          onClick={onClose}
          type="button"
        >
          <CloseIcon className={styles.closeIcon} />
        </button>

        <div className={styles.canvasViewportFrame}>
          <Suspense
            fallback={
              <div className={styles.loaderFallback}>
                <div className={styles.spinner} />
                <span className={styles.loaderText}>Entering the Descent...</span>
              </div>
            }
          >
            <PlinkoDescentGame />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default PlinkoDescentModal
