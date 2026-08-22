import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { afterEach, describe, expect, it, vi } from "vitest"

import { CaseStudyModal } from "./case-study-modal"

import type { IProject } from "@data/showcase"

const mockProject: IProject = {
  id: "metaspins-test",
  title: "Metaspins",
  subtitle: "Crypto Casino Platform",
  category: "react",
  categoryLabel: "React Architecture",
  role: "Head of Frontend",
  clientOrOrg: "Metaspins",
  summary: "Comprehensive test summary for Metaspins.",
  whatIDid: ["Led frontend team.", "Built WebSockets state."],
  howIBuiltIt: ["Isolated state slices.", "Optimized bundle size."],
  technologies: ["React", "TypeScript", "Vite"],
  metrics: "Sub-second LCP",
  thumbnailUrl: "/assets/showcase/metaspins.png",
  liveUrl: "https://metaspins.com",
  badgeColor: "#00F0FF",
}

describe("CaseStudyModal", () => {
  afterEach(() => {
    document.body.style.overflow = ""
  })

  it("does not render when isOpen is false", () => {
    render(<CaseStudyModal isOpen={false} onClose={vi.fn()} project={mockProject} />)
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
  })

  it("renders modal details and locks body scroll when isOpen is true", () => {
    render(<CaseStudyModal isOpen={true} onClose={vi.fn()} project={mockProject} />)

    expect(screen.getByRole("dialog")).toBeInTheDocument()
    expect(screen.getByRole("heading", { level: 1, name: "Metaspins" })).toBeInTheDocument()
    expect(screen.getByText("Crypto Casino Platform")).toBeInTheDocument()
    expect(screen.getByText("Comprehensive test summary for Metaspins.")).toBeInTheDocument()
    expect(screen.getByText("Led frontend team.")).toBeInTheDocument()
    expect(screen.getByText("Isolated state slices.")).toBeInTheDocument()
    expect(screen.getByText("Head of Frontend")).toBeInTheDocument()
    expect(screen.getByText("Sub-second LCP")).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /visit live website/i })).toHaveAttribute(
      "href",
      "https://metaspins.com",
    )
    expect(document.body.style.overflow).toBe("hidden")
  })

  it("calls onClose when close button or Escape is triggered", async () => {
    const handleClose = vi.fn()
    const user = userEvent.setup()
    render(<CaseStudyModal isOpen={true} onClose={handleClose} project={mockProject} />)

    const closeButton = screen.getByRole("button", { name: /close case study modal/i })
    await user.click(closeButton)
    expect(handleClose).toHaveBeenCalledTimes(1)

    await user.keyboard("{Escape}")
    expect(handleClose).toHaveBeenCalledTimes(2)
  })

  it("toggles collapsible sections", async () => {
    const user = userEvent.setup()
    render(<CaseStudyModal isOpen={true} onClose={vi.fn()} project={mockProject} />)

    const whatIDidButton = screen.getByRole("button", { name: /what i did/i })
    expect(screen.getByText("Led frontend team.")).toBeInTheDocument()

    await user.click(whatIDidButton)
    expect(screen.queryByText("Led frontend team.")).not.toBeInTheDocument()

    await user.click(whatIDidButton)
    expect(screen.getByText("Led frontend team.")).toBeInTheDocument()
  })
})
