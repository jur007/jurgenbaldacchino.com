import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import { PlinkoDescentModal } from "./plinko-descent-modal"

describe("PlinkoDescentModal", () => {
  it("renders nothing when isOpen is false", () => {
    const handleClose = vi.fn()
    const { container } = render(<PlinkoDescentModal isOpen={false} onClose={handleClose} />)
    expect(container.firstChild).toBeNull()
  })

  it("renders modal dialog when isOpen is true", () => {
    const handleClose = vi.fn()
    render(<PlinkoDescentModal isOpen={true} onClose={handleClose} />)

    const dialog = screen.getByRole("dialog")
    expect(dialog).toBeInTheDocument()
    expect(screen.getByLabelText("Close Descent")).toBeInTheDocument()
  })

  it("calls onClose when close button is clicked", () => {
    const handleClose = vi.fn()
    render(<PlinkoDescentModal isOpen={true} onClose={handleClose} />)

    const closeButton = screen.getByLabelText("Close Descent")
    fireEvent.click(closeButton)
    expect(handleClose).toHaveBeenCalledTimes(1)
  })

  it("calls onClose when Escape key is pressed", () => {
    const handleClose = vi.fn()
    render(<PlinkoDescentModal isOpen={true} onClose={handleClose} />)

    fireEvent.keyDown(window, { key: "Escape" })
    expect(handleClose).toHaveBeenCalledTimes(1)
  })

  it("locks and unlocks body scroll appropriately", () => {
    const handleClose = vi.fn()
    const { unmount, rerender } = render(<PlinkoDescentModal isOpen={true} onClose={handleClose} />)

    expect(document.body.style.overflow).toBe("hidden")

    rerender(<PlinkoDescentModal isOpen={false} onClose={handleClose} />)
    expect(document.body.style.overflow).toBe("")

    rerender(<PlinkoDescentModal isOpen={true} onClose={handleClose} />)
    expect(document.body.style.overflow).toBe("hidden")

    unmount()
    expect(document.body.style.overflow).toBe("")
  })
})
