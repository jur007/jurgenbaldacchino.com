import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import { PlinkoVanillaModal } from "./plinko-vanilla-modal"

describe("PlinkoVanillaModal", () => {
  it("renders nothing when isOpen is false", () => {
    const handleClose = vi.fn()
    const { container } = render(<PlinkoVanillaModal isOpen={false} onClose={handleClose} />)
    expect(container.firstChild).toBeNull()
  })

  it("renders modal dialog when isOpen is true", () => {
    const handleClose = vi.fn()
    render(<PlinkoVanillaModal isOpen={true} onClose={handleClose} />)

    const dialog = screen.getByRole("dialog")
    expect(dialog).toBeInTheDocument()
    expect(screen.getByLabelText("Close Plinko")).toBeInTheDocument()
  })

  it("calls onClose when close button is clicked", () => {
    const handleClose = vi.fn()
    render(<PlinkoVanillaModal isOpen={true} onClose={handleClose} />)

    const closeButton = screen.getByLabelText("Close Plinko")
    fireEvent.click(closeButton)
    expect(handleClose).toHaveBeenCalledTimes(1)
  })

  it("calls onClose when Escape key is pressed", () => {
    const handleClose = vi.fn()
    render(<PlinkoVanillaModal isOpen={true} onClose={handleClose} />)

    fireEvent.keyDown(window, { key: "Escape" })
    expect(handleClose).toHaveBeenCalledTimes(1)
  })

  it("locks and unlocks body scroll appropriately", () => {
    const handleClose = vi.fn()
    const { unmount, rerender } = render(<PlinkoVanillaModal isOpen={true} onClose={handleClose} />)

    expect(document.body.style.overflow).toBe("hidden")

    rerender(<PlinkoVanillaModal isOpen={false} onClose={handleClose} />)
    expect(document.body.style.overflow).toBe("")

    rerender(<PlinkoVanillaModal isOpen={true} onClose={handleClose} />)
    expect(document.body.style.overflow).toBe("hidden")

    unmount()
    expect(document.body.style.overflow).toBe("")
  })
})
