import { lazy, Suspense, useEffect } from "react"
import type { FC, KeyboardEvent, MouseEvent } from "react"

import styles from "./mines-vanilla-modal.module.css"
import type { IMinesVanillaModalProps } from "./mines-vanilla-modal.types"

import { getClassNames } from "@utils/class-names"

const MinesVanillaGame = lazy(() =>
  import("@jurgenbaldacchino/phaser-showcase/mines/vanilla").then((module) => ({
    default: module.MinesVanillaGame,
  })),
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

export const MinesVanillaModal: FC<IMinesVanillaModalProps> = ({ isOpen, onClose, className }) => {
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
      aria-label="Mines Classic Game Engine"
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
          aria-label="Close Mines"
          className={styles.closeButton}
          onClick={onClose}
          type="button"
        >
          <CloseIcon />
        </button>

        <div className={styles.canvasViewportFrame}>
          <Suspense
            fallback={
              <div className={styles.loaderFallback}>
                <div className={styles.spinner} />
                <span className={styles.loaderText}>Loading Mines Engine...</span>
              </div>
            }
          >
            <MinesVanillaGame />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default MinesVanillaModal
