import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"

import { HomeSection } from "./home-section"

describe("HomeSection", () => {
  it("renders the introduction, personal card, and five core strengths", () => {
    render(<HomeSection />)

    expect(
      screen.getByRole("heading", {
        name: /Turning ideas into thoughtful frontend experiences, built together and made to last/i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole("heading", {
        name: /Building the systems and teams behind excellent products/i,
      }),
    ).toBeInTheDocument()
    expect(screen.getByRole("img", { name: "Jur Baldacchino" })).toBeInTheDocument()
    expect(screen.getByRole("heading", { name: "Core strengths" })).toBeInTheDocument()
    expect(screen.getByRole("list", { name: "Core strengths" })).toBeInTheDocument()
    expect(screen.getAllByRole("article")).toHaveLength(5)
    expect(screen.getByRole("heading", { name: "React Engineering" })).toBeInTheDocument()
    expect(screen.getByRole("heading", { name: "Creative Development" })).toBeInTheDocument()
    expect(screen.getByRole("heading", { name: "Frontend DevOps" })).toBeInTheDocument()
    expect(screen.getByRole("heading", { name: "Simplicity and Clarity" })).toBeInTheDocument()
    expect(screen.getByRole("heading", { name: "One-Team Collaboration" })).toBeInTheDocument()
  })

  it("opens and closes expanded strength details", async () => {
    const user = userEvent.setup()
    render(<HomeSection />)

    const openButton = screen.getByRole("button", { name: "Open React Engineering details" })
    await user.click(openButton)

    expect(screen.getByRole("dialog", { name: "React Engineering" })).toBeInTheDocument()
    expect(
      screen.getByText(/This expanded space will explore how thoughtful architecture/i),
    ).toBeInTheDocument()

    await user.click(screen.getByRole("button", { name: "Close React Engineering details" }))

    expect(screen.queryByRole("dialog", { name: "React Engineering" })).not.toBeInTheDocument()
  })
})
