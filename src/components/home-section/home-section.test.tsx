import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { HomeSection } from "./home-section"

describe("HomeSection", () => {
  it("renders the introduction, personal card, and five capability cards", () => {
    render(<HomeSection />)

    expect(
      screen.getByRole("heading", { name: /I build frontend teams and products/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole("heading", {
        name: /Building the systems and teams behind excellent products/i,
      }),
    ).toBeInTheDocument()
    expect(screen.getAllByRole("article")).toHaveLength(5)
  })
})
