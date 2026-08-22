import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import { ProjectDetail } from "./project-detail"

import type { IProject } from "@data/showcase"

const mockProject: IProject = {
  id: "test-project-detail",
  title: "Test Application Platform",
  subtitle: "High-Performance Web App",
  category: "react",
  categoryLabel: "React Architecture",
  role: "Head of Frontend",
  clientOrOrg: "Test Organization",
  summary: "Comprehensive summary of the test application platform.",
  whatIDid: ["Designed component state layers and WebSocket integration."],
  howIBuiltIt: ["Applied immutable cache keys and fine-grained DOM updates."],
  technologies: ["React", "TypeScript", "TailwindCSS", "Vite"],
  metrics: "Sub-second real-time sync",
  thumbnailUrl: "/assets/showcase/guts.png",
  liveUrl: "https://example.com",
}

describe("ProjectDetail", () => {
  it("renders title, summary, specifications, and links", () => {
    const handleBack = vi.fn()
    render(<ProjectDetail onBack={handleBack} project={mockProject} />)

    expect(
      screen.getByRole("heading", { level: 1, name: "Test Application Platform" }),
    ).toBeInTheDocument()
    expect(
      screen.getByText("Comprehensive summary of the test application platform."),
    ).toBeInTheDocument()
    expect(screen.getByText("Test Organization", { selector: "dd" })).toBeInTheDocument()
    expect(screen.getByText("Head of Frontend")).toBeInTheDocument()
    expect(screen.getByText("Sub-second real-time sync")).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /visit live website/i })).toHaveAttribute(
      "href",
      "https://example.com",
    )
  })

  it("toggles accordion sections when clicked", async () => {
    const handleBack = vi.fn()
    const user = userEvent.setup()
    render(<ProjectDetail onBack={handleBack} project={mockProject} />)

    expect(
      screen.getByText("Designed component state layers and WebSocket integration."),
    ).toBeInTheDocument()

    const whatIDidButton = screen.getByRole("button", {
      name: /what i did/i,
    })
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

    const backButton = screen.getByRole("button", {
      name: /back to showcase gallery/i,
    })
    await user.click(backButton)

    expect(handleBack).toHaveBeenCalledTimes(1)
  })
})
