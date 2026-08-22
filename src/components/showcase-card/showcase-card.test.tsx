import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import { ShowcaseCard } from "./showcase-card"

import type { IProject } from "@data/showcase"

const mockProject: IProject = {
  id: "test-project",
  title: "Test Application Platform",
  subtitle: "Web Platform Subtitle",
  category: "react",
  categoryLabel: "React Architecture",
  role: "Lead Engineer",
  timeline: "2024 - 2025",
  clientOrOrg: "Test Org",
  summary: "A test summary description for the showcase card.",
  whatIDid: ["Built core architecture."],
  technicalSolutions: ["Applied state management."],
  technologies: ["React", "TypeScript", "Vite"],
  metrics: "Sub-second sync",
  thumbnailUrl: "/assets/showcase/metaspins.png",
  badgeColor: "#00F0FF",
}

describe("ShowcaseCard", () => {
  it("renders project title, subtitle, category, role, summary, and technologies", () => {
    const handleSelect = vi.fn()
    render(<ShowcaseCard onSelect={handleSelect} project={mockProject} />)

    expect(screen.getByText("Test Application Platform")).toBeInTheDocument()
    expect(screen.getByText("Web Platform Subtitle")).toBeInTheDocument()
    expect(screen.getByText("React Architecture")).toBeInTheDocument()
    expect(screen.getByText("Lead Engineer")).toBeInTheDocument()
    expect(
      screen.getByText("A test summary description for the showcase card."),
    ).toBeInTheDocument()
    expect(screen.getByText("Sub-second sync")).toBeInTheDocument()
    expect(screen.getByText("React")).toBeInTheDocument()
    expect(screen.getByText("TypeScript")).toBeInTheDocument()
  })

  it("triggers onSelect callback when clicked", async () => {
    const handleSelect = vi.fn()
    const user = userEvent.setup()

    render(<ShowcaseCard onSelect={handleSelect} project={mockProject} />)

    const card = screen.getByRole("button", {
      name: /view case study for test application platform/i,
    })
    await user.click(card)
    expect(handleSelect).toHaveBeenCalledWith(mockProject)
    expect(handleSelect).toHaveBeenCalledTimes(1)
  })

  it("triggers onSelect callback when activated with keyboard", async () => {
    const handleSelect = vi.fn()
    const user = userEvent.setup()

    render(<ShowcaseCard onSelect={handleSelect} project={mockProject} />)

    const card = screen.getByRole("button", {
      name: /view case study for test application platform/i,
    })
    card.focus()
    await user.keyboard("{Enter}")
    expect(handleSelect).toHaveBeenCalledWith(mockProject)
  })
})
