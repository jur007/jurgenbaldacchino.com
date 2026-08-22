import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { AboutSection } from "./about-section"

describe("AboutSection", () => {
  it("renders the about heading, portrait, and personal introduction", () => {
    render(<AboutSection />)

    expect(
      screen.getByRole("heading", { name: /Driven by curiosity, craft, and exploration/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole("img", {
        name: /Jurgen Baldacchino overlooking a snow-covered mountain landscape/i,
      }),
    ).toBeInTheDocument()
    expect(screen.getByText(/Originally from Malta and working globally/i)).toBeInTheDocument()
  })
})
