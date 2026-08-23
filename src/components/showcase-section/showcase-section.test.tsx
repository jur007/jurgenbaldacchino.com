import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { afterEach, describe, expect, it } from "vitest"

import { ShowcaseSection } from "./showcase-section"

describe("ShowcaseSection", () => {
  afterEach(() => {
    document.body.style.overflow = ""
  })

  it("renders showcase title, category filter buttons, and project cards", () => {
    render(<ShowcaseSection />)

    expect(screen.getByRole("heading", { level: 2, name: "Showcase" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /all \(3\)/i })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /react architecture \(3\)/i })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /creative \/ canvas \(0\)/i })).toBeInTheDocument()

    expect(screen.getByRole("heading", { level: 3, name: "Guts Sportsbook" })).toBeInTheDocument()
    expect(screen.getByRole("heading", { level: 3, name: "Rizk Sportsbook" })).toBeInTheDocument()
    expect(screen.getByRole("heading", { level: 3, name: "Wetten.com" })).toBeInTheDocument()
  })

  it("filters project cards when category pills are clicked", async () => {
    const user = userEvent.setup()
    render(<ShowcaseSection />)

    const canvasFilter = screen.getByRole("button", { name: /creative \/ canvas \(0\)/i })
    await user.click(canvasFilter)

    expect(
      screen.getByText("No projects found matching the selected category."),
    ).toBeInTheDocument()
    expect(
      screen.queryByRole("heading", { level: 3, name: "Guts Sportsbook" }),
    ).not.toBeInTheDocument()
    expect(
      screen.queryByRole("heading", { level: 3, name: "Rizk Sportsbook" }),
    ).not.toBeInTheDocument()
    expect(screen.queryByRole("heading", { level: 3, name: "Wetten.com" })).not.toBeInTheDocument()

    const allFilter = screen.getByRole("button", { name: /all \(3\)/i })
    await user.click(allFilter)

    expect(screen.getByRole("heading", { level: 3, name: "Guts Sportsbook" })).toBeInTheDocument()
    expect(screen.getByRole("heading", { level: 3, name: "Rizk Sportsbook" })).toBeInTheDocument()
    expect(screen.getByRole("heading", { level: 3, name: "Wetten.com" })).toBeInTheDocument()
  })

  it("opens case study modal when a card is selected and closes when back is clicked", async () => {
    const user = userEvent.setup()
    render(<ShowcaseSection />)

    const gutsCard = screen.getByRole("button", {
      name: /view case study for guts sportsbook/i,
    })
    await user.click(gutsCard)

    expect(screen.getByRole("dialog")).toBeInTheDocument()
    expect(screen.getByRole("heading", { level: 1, name: "Guts Sportsbook" })).toBeInTheDocument()
    expect(screen.getByText("What I Did")).toBeInTheDocument()

    const backButton = screen.getByRole("button", { name: /back to showcase gallery/i })
    await user.click(backButton)

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
  })
})
