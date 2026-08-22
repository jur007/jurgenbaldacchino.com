import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"

import { ShowcaseSection } from "./showcase-section"

describe("ShowcaseSection", () => {
  it("renders showcase title, category filter buttons, and project cards", () => {
    render(<ShowcaseSection />)

    expect(screen.getByRole("heading", { level: 1, name: "Showcase" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /all \(3\)/i })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /react architecture \(1\)/i })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /creative \/ canvas \(1\)/i })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /tooling & dx \(1\)/i })).toBeInTheDocument()

    expect(screen.getByText("High-Concurrency Web Platform")).toBeInTheDocument()
    expect(screen.getByText("Interactive 2D Canvas Engine")).toBeInTheDocument()
    expect(screen.getByText("Frontend Architecture & CI/CD Platform")).toBeInTheDocument()
  })

  it("filters project cards when category pills are clicked", async () => {
    const user = userEvent.setup()
    render(<ShowcaseSection />)

    const reactFilter = screen.getByRole("button", { name: /react architecture \(1\)/i })
    await user.click(reactFilter)

    expect(screen.getByText("High-Concurrency Web Platform")).toBeInTheDocument()
    expect(screen.queryByText("Interactive 2D Canvas Engine")).not.toBeInTheDocument()
    expect(screen.queryByText("Frontend Architecture & CI/CD Platform")).not.toBeInTheDocument()

    const allFilter = screen.getByRole("button", { name: /all \(3\)/i })
    await user.click(allFilter)

    expect(screen.getByText("Interactive 2D Canvas Engine")).toBeInTheDocument()
  })

  it("opens project detail when a card is selected and returns when back is clicked", async () => {
    const user = userEvent.setup()
    render(<ShowcaseSection />)

    const alphaCard = screen.getByRole("button", {
      name: /view details for high-concurrency web platform/i,
    })
    await user.click(alphaCard)

    expect(
      screen.getByRole("heading", { level: 1, name: "High-Concurrency Web Platform" }),
    ).toBeInTheDocument()
    expect(screen.getByText("What I Did")).toBeInTheDocument()

    const backButton = screen.getByRole("button", { name: /back to showcase gallery/i })
    await user.click(backButton)

    expect(screen.getByRole("heading", { level: 1, name: "Showcase" })).toBeInTheDocument()
  })
})
