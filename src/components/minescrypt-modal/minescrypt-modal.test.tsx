import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import { MinesCryptModal } from "./minescrypt-modal"

describe("MinesCryptModal", () => {
  it("renders nothing when isOpen is false", () => {
    const handleClose = vi.fn()
    const { container } = render(<MinesCryptModal isOpen={false} onClose={handleClose} />)
    expect(container.firstChild).toBeNull()
  })

  it("renders modal dialog when isOpen is true", () => {
    const handleClose = vi.fn()
    render(<MinesCryptModal isOpen={true} onClose={handleClose} />)

    const dialog = screen.getByRole("dialog")
    expect(dialog).toBeInTheDocument()
    expect(screen.getByLabelText("Close Crypt")).toBeInTheDocument()
  })

  it("calls onClose when close button is clicked", () => {
    const handleClose = vi.fn()
    render(<MinesCryptModal isOpen={true} onClose={handleClose} />)

    const closeButton = screen.getByLabelText("Close Crypt")
    fireEvent.click(closeButton)
    expect(handleClose).toHaveBeenCalledTimes(1)
  })

  it("calls onClose when Escape key is pressed", () => {
    const handleClose = vi.fn()
    render(<MinesCryptModal isOpen={true} onClose={handleClose} />)

    fireEvent.keyDown(window, { key: "Escape" })
    expect(handleClose).toHaveBeenCalledTimes(1)
  })

  it("locks and unlocks body scroll appropriately", () => {
    const handleClose = vi.fn()
    const { unmount, rerender } = render(<MinesCryptModal isOpen={true} onClose={handleClose} />)

    expect(document.body.style.overflow).toBe("hidden")

    rerender(<MinesCryptModal isOpen={false} onClose={handleClose} />)
    expect(document.body.style.overflow).toBe("")

    rerender(<MinesCryptModal isOpen={true} onClose={handleClose} />)
    expect(document.body.style.overflow).toBe("hidden")

    unmount()
    expect(document.body.style.overflow).toBe("")
  })
})
