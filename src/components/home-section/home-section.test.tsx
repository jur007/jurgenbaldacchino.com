import { render, screen, within } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { afterEach, describe, expect, it } from "vitest"

import { HomeSection } from "./home-section"

describe("HomeSection", () => {
  afterEach(() => {
    document.body.style.overflow = ""
  })

  it("renders the 2-column Hero section with dual CTAs and floating metric badges", () => {
    render(<HomeSection />)

    expect(
      screen.getByRole("heading", {
        name: /Building high-impact frontend architectures made to last/i,
      }),
    ).toBeInTheDocument()
    expect(screen.getByRole("img", { name: "Portrait of Jurgen Baldacchino" })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "View Work" })).toHaveAttribute("href", "#showcase")
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

    const bentoList = screen.getByRole("list", { name: "Core strengths and capabilities" })
    expect(bentoList).toBeInTheDocument()
    expect(within(bentoList).getAllByRole("article")).toHaveLength(4)

    // Card 1
    expect(
      within(bentoList).getByRole("heading", {
        name: "React Engineering & Frontend Architecture",
      }),
    ).toBeInTheDocument()
    expect(within(bentoList).getByText("State Management")).toBeInTheDocument()

    // Card 2
    expect(
      within(bentoList).getByRole("heading", {
        name: "Creative Dev & Interactive Canvas",
      }),
    ).toBeInTheDocument()
    expect(within(bentoList).getByText("Web Games")).toBeInTheDocument()

    // Card 3
    expect(
      within(bentoList).getByRole("heading", {
        name: "DevOps, CI/CD & Engineering Standards",
      }),
    ).toBeInTheDocument()
    expect(within(bentoList).getByText("Husky")).toBeInTheDocument()
    expect(within(bentoList).getByText("Commitlint")).toBeInTheDocument()

    // Card 4
    expect(
      within(bentoList).getByRole("heading", {
        name: "Technical Leadership & AI-Assisted Workflows",
      }),
    ).toBeInTheDocument()
    expect(within(bentoList).getByText("Team Mentoring")).toBeInTheDocument()
    expect(within(bentoList).getByText("AI Workflows")).toBeInTheDocument()
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

    const badgeElements = await screen.findAllByText(
      /Phaser 3 · Live Physics/i,
      {},
      { timeout: 4000 },
    )
    expect(badgeElements.length).toBeGreaterThan(0)
  })
})
