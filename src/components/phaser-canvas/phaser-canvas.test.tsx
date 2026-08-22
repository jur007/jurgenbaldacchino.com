import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { PhaserCanvas } from "./phaser-canvas"

describe("PhaserCanvas", () => {
  it("renders the container, live badge, and accessible region", () => {
    render(<PhaserCanvas ariaLabel="Interactive 2D physics demonstration" />)

    const canvasRegion = screen.getByRole("region", {
      name: "Interactive 2D physics demonstration",
    })
    expect(canvasRegion).toBeInTheDocument()
    expect(screen.getByText(/Phaser 3 · Live Physics/i)).toBeInTheDocument()
  })
})
