import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import { ProjectDetail } from "./project-detail"

import type { IProject } from "@data/showcase"

const mockProject: IProject = {
  id: "test-project-detail",
  title: "Full Scale Web Application",
  category: "react",
  categoryLabel: "React Architecture",
  role: "Lead Frontend Engineer",
  timeline: "2024 - 2025",
  clientOrOrg: "Acme Corp",
  summary: "Comprehensive summary of the test application platform.",
  whatIDid: "Designed component state layers and WebSocket integration.",
  solutions: "Applied immutable cache keys and fine-grained DOM updates.",
  technologies: ["React", "TypeScript", "TailwindCSS", "Vite"],
  metrics: "Sub-second real-time sync",
  thumbnailUrl: "/assets/showcase/project-alpha.svg",
  previewColor: "#FF2A4D",
  liveUrl: "https://example.com/live",
  githubUrl: "https://github.com/jur007/test-repo",
}

describe("ProjectDetail", () => {
  it("renders title, summary, specifications, and links", () => {
    const handleBack = vi.fn()
    render(<ProjectDetail onBack={handleBack} project={mockProject} />)

    expect(
      screen.getByRole("heading", { level: 1, name: "Full Scale Web Application" }),
    ).toBeInTheDocument()
    expect(
      screen.getByText("Comprehensive summary of the test application platform."),
    ).toBeInTheDocument()
    expect(screen.getByText("Acme Corp")).toBeInTheDocument()
    expect(screen.getByText("Lead Frontend Engineer")).toBeInTheDocument()
    expect(screen.getByText("Sub-second real-time sync")).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /live prototype/i })).toHaveAttribute(
      "href",
      "https://example.com/live",
    )
    expect(screen.getByRole("link", { name: /view repository/i })).toHaveAttribute(
      "href",
      "https://github.com/jur007/test-repo",
    )
  })

  it("toggles accordion sections when clicked", async () => {
    const handleBack = vi.fn()
    const user = userEvent.setup()
    render(<ProjectDetail onBack={handleBack} project={mockProject} />)

    expect(
      screen.getByText("Designed component state layers and WebSocket integration."),
    ).toBeInTheDocument()

    const whatIDidButton = screen.getByRole("button", { name: /what i did/i })
    await user.click(whatIDidButton)

    expect(
      screen.queryByText("Designed component state layers and WebSocket integration."),
    ).not.toBeInTheDocument()

    await user.click(whatIDidButton)
    expect(
      screen.getByText("Designed component state layers and WebSocket integration."),
    ).toBeInTheDocument()
  })

  it("calls onBack when back button is pressed", async () => {
    const handleBack = vi.fn()
    const user = userEvent.setup()
    render(<ProjectDetail onBack={handleBack} project={mockProject} />)

    const backButton = screen.getByRole("button", { name: /back to showcase gallery/i })
    await user.click(backButton)

    expect(handleBack).toHaveBeenCalledTimes(1)
  })
})
