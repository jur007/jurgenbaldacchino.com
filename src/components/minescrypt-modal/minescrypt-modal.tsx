import { lazy, Suspense, useEffect } from "react"
import type { FC, KeyboardEvent, MouseEvent } from "react"

import styles from "./minescrypt-modal.module.css"
import type { IMinesCryptModalProps } from "./minescrypt-modal.types"

import { CloseIcon } from "@components/icons"
import { getClassNames } from "@utils/class-names"

const MinesCryptGame = lazy(() =>
  import("@jurgenbaldacchino/phaser-showcase/minescrypt").then((module) => ({
    default: module.MinesCryptGame,
  })),
)

export const MinesCryptModal: FC<IMinesCryptModalProps> = ({ isOpen, onClose, className }) => {
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
      aria-label="Crypt of the Cursed Game Engine"
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
          aria-label="Close Crypt"
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
                <span className={styles.loaderText}>Awakening Crypt...</span>
              </div>
            }
          >
            <MinesCryptGame />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default MinesCryptModal
