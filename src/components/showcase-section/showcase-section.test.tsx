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
    expect(screen.getByRole("button", { name: /all \(6\)/i })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /react architecture \(5\)/i })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /creative \/ canvas \(1\)/i })).toBeInTheDocument()

    expect(screen.getByRole("heading", { level: 3, name: "Metaspins" })).toBeInTheDocument()
    expect(screen.getByRole("heading", { level: 3, name: "Mines Classic" })).toBeInTheDocument()
    expect(screen.getByRole("heading", { level: 3, name: "Bombastic" })).toBeInTheDocument()
    expect(screen.getByRole("heading", { level: 3, name: "Guts Sportsbook" })).toBeInTheDocument()
    expect(screen.getByRole("heading", { level: 3, name: "Rizk Sportsbook" })).toBeInTheDocument()
    expect(screen.getByRole("heading", { level: 3, name: "Wetten.com" })).toBeInTheDocument()
  })

  it("filters project cards when category pills are clicked", async () => {
    const user = userEvent.setup()
    render(<ShowcaseSection />)

    const canvasFilter = screen.getByRole("button", { name: /creative \/ canvas \(1\)/i })
    await user.click(canvasFilter)

    expect(screen.getByRole("heading", { level: 3, name: "Mines Classic" })).toBeInTheDocument()
    expect(screen.queryByRole("heading", { level: 3, name: "Metaspins" })).not.toBeInTheDocument()
    expect(screen.queryByRole("heading", { level: 3, name: "Bombastic" })).not.toBeInTheDocument()
    expect(
      screen.queryByRole("heading", { level: 3, name: "Guts Sportsbook" }),
    ).not.toBeInTheDocument()

    const allFilter = screen.getByRole("button", { name: /all \(6\)/i })
    await user.click(allFilter)

    expect(screen.getByRole("heading", { level: 3, name: "Metaspins" })).toBeInTheDocument()
    expect(screen.getByRole("heading", { level: 3, name: "Bombastic" })).toBeInTheDocument()
    expect(screen.getByRole("heading", { level: 3, name: "Guts Sportsbook" })).toBeInTheDocument()
  })

  it("opens case study modal when a card is selected and closes when back is clicked", async () => {
    const user = userEvent.setup()
    render(<ShowcaseSection />)

    const metaspinsCard = screen.getByRole("button", {
      name: /view case study for metaspins/i,
    })
    await user.click(metaspinsCard)

    expect(screen.getByRole("dialog")).toBeInTheDocument()
    expect(screen.getByRole("heading", { level: 1, name: "Metaspins" })).toBeInTheDocument()
    expect(screen.getByText("What I Did")).toBeInTheDocument()

    const backButton = screen.getByRole("button", { name: /back to showcase gallery/i })
    await user.click(backButton)

    expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
  })
})
