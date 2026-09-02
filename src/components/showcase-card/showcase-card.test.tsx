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
  clientOrOrg: "Test Org",
  summary: "A test summary description for the showcase card.",
  whatIDid: ["Built core architecture."],
  howIBuiltIt: ["Applied state management."],
  technologies: ["React", "TypeScript", "Vite"],
  metrics: "Sub-second sync",
  thumbnailUrl: "/assets/showcase/guts.png",
  badgeColor: "#00F0FF",
  isPrivate: false,
}

describe("ShowcaseCard", () => {
  it("renders project title, subtitle, category, role, summary, and technologies", () => {
    const handleSelect = vi.fn()
    render(<ShowcaseCard onSelect={handleSelect} project={mockProject} />)

    expect(
      screen.getByRole("heading", { level: 3, name: "Test Application Platform" }),
    ).toBeInTheDocument()
    expect(screen.getByText("Web Platform Subtitle")).toBeInTheDocument()
    expect(screen.getByText("React Architecture")).toBeInTheDocument()
    expect(screen.getByText("Lead Engineer")).toBeInTheDocument()
    expect(screen.getByText("Test Org")).toBeInTheDocument()
    expect(
      screen.getByText("A test summary description for the showcase card."),
    ).toBeInTheDocument()
    expect(screen.getByText("React")).toBeInTheDocument()
    expect(screen.getByText("TypeScript")).toBeInTheDocument()
    expect(screen.getByText("Sub-second sync")).toBeInTheDocument()
  })

  it("calls onSelect when card is clicked or entered", async () => {
    const handleSelect = vi.fn()
    const user = userEvent.setup()
    render(<ShowcaseCard onSelect={handleSelect} project={mockProject} />)

    const cardButton = screen.getByRole("button", {
      name: /view case study for test application platform/i,
    })
    await user.click(cardButton)

    expect(handleSelect).toHaveBeenCalledWith(mockProject)
  })

  it("renders live image preview with correct alt text", () => {
    render(<ShowcaseCard onSelect={vi.fn()} project={mockProject} />)
    const image = screen.getByRole("img", { name: /test application platform preview/i })
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute("src", "/assets/showcase/guts.png")
  })
})
