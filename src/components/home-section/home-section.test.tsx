import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { HomeSection } from "./home-section"

describe("HomeSection", () => {
  it("renders the introduction and all expertise areas", () => {
    render(<HomeSection />)

    expect(
      screen.getByRole("heading", { name: /I build frontend teams and products/i }),
    ).toBeInTheDocument()
    expect(screen.getAllByRole("article")).toHaveLength(3)
  })
})
