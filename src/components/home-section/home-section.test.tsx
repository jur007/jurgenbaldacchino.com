import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"

import { HomeSection } from "./home-section"

describe("HomeSection", () => {
  it("renders the 2-column Hero section with dual CTAs and floating metric badges", () => {
    render(<HomeSection />)

    expect(
      screen.getByRole("heading", {
        name: /Turning ideas into thoughtful frontend experiences, built together and made to last/i,
      }),
    ).toBeInTheDocument()
    expect(screen.getByRole("img", { name: "Portrait of Jurgen Baldacchino" })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "View Work" })).toHaveAttribute("href", "#expertise")
    expect(screen.getByRole("link", { name: "Let's Talk" })).toHaveAttribute("href", "#contact")
    expect(screen.getByText("12+ Years")).toBeInTheDocument()
    expect(screen.getByText("Senior Lead")).toBeInTheDocument()
    expect(screen.getByText("AI-Assisted")).toBeInTheDocument()
  })

  it("renders the asymmetric Bento Grid capabilities layout with 4 feature cards and badges", () => {
    render(<HomeSection />)

    expect(
      screen.getByRole("heading", { name: "Engineered for speed, scale, and longevity." }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole("list", { name: "Core strengths and capabilities" }),
    ).toBeInTheDocument()
    expect(screen.getAllByRole("article")).toHaveLength(4)

    // Card 1
    expect(
      screen.getByRole("heading", { name: "React Engineering & Frontend Architecture" }),
    ).toBeInTheDocument()
    expect(screen.getByText("State Management")).toBeInTheDocument()

    // Card 2
    expect(
      screen.getByRole("heading", { name: "Creative Dev & Interactive Canvas" }),
    ).toBeInTheDocument()
    expect(screen.getByText("Web Games")).toBeInTheDocument()

    // Card 3
    expect(
      screen.getByRole("heading", { name: "DevOps, CI/CD & Engineering Standards" }),
    ).toBeInTheDocument()
    expect(screen.getByText("Husky")).toBeInTheDocument()
    expect(screen.getByText("Commitlint")).toBeInTheDocument()

    // Card 4
    expect(
      screen.getByRole("heading", { name: "Technical Leadership & AI-Assisted Workflows" }),
    ).toBeInTheDocument()
    expect(screen.getByText("Team Mentoring")).toBeInTheDocument()
    expect(screen.getByText("AI Workflows")).toBeInTheDocument()
  })

  it("interacts with the creative development canvas preview card", async () => {
    const user = userEvent.setup()
    render(<HomeSection />)

    const creativeCard = screen
      .getByRole("heading", { name: "Creative Dev & Interactive Canvas" })
      .closest("article")
    expect(creativeCard).toBeInTheDocument()

    if (creativeCard) {
      await user.click(creativeCard)
    }

    expect(screen.getByText(/Live 2D Physics · Click to Play/i)).toBeInTheDocument()
  })
})
