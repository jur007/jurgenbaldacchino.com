import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { afterEach, describe, expect, it, vi } from "vitest"

import { CaseStudyModal } from "./case-study-modal"

import type { IProject } from "@data/showcase"

vi.mock("@components/minescrypt-modal", () => ({
  MinesCryptModal: ({ isOpen }: { isOpen: boolean }) =>
    isOpen ? <div aria-label="Crypt of the Cursed Game Engine" role="dialog" /> : null,
}))

vi.mock("@components/mines-vanilla-modal", () => ({
  MinesVanillaModal: ({ isOpen }: { isOpen: boolean }) =>
    isOpen ? <div aria-label="Mines Classic Game Engine" role="dialog" /> : null,
}))

const mockProject: IProject = {
  id: "test-platform",
  title: "Platform Architecture Project",
  subtitle: "High-Performance Web App",
  category: "react",
  categoryLabel: "React Architecture",
  role: "Head of Frontend",
  clientOrOrg: "Test Organization",
  summary: "Comprehensive test summary for the test platform.",
  whatIDid: ["Led frontend team.", "Built WebSockets state."],
  howIBuiltIt: ["Isolated state slices.", "Optimized bundle size."],
  technologies: ["React", "TypeScript", "Vite"],
  metrics: "Sub-second LCP",
  thumbnailUrl: "/assets/showcase/guts.png",
  liveUrl: "https://example.com",
  badgeColor: "#00F0FF",
  isPrivate: false,
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
    expect(
      screen.getByRole("heading", { level: 1, name: "Platform Architecture Project" }),
    ).toBeInTheDocument()
    expect(screen.getByText("High-Performance Web App")).toBeInTheDocument()
    expect(
      screen.getByText("Comprehensive test summary for the test platform."),
    ).toBeInTheDocument()
    expect(screen.getByText("Led frontend team.")).toBeInTheDocument()
    expect(screen.getByText("Isolated state slices.")).toBeInTheDocument()
    expect(screen.getByText("Head of Frontend")).toBeInTheDocument()
    expect(screen.getByText("Sub-second LCP")).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /visit live website/i })).toHaveAttribute(
      "href",
      "https://example.com",
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

  it("renders launch game button for mines-crypt-game and opens MinesCryptModal", async () => {
    const user = userEvent.setup()
    const cryptProject: IProject = {
      ...mockProject,
      id: "mines-crypt-game",
      title: "Crypt of the Cursed",
      liveUrl: undefined,
    }

    render(<CaseStudyModal isOpen={true} onClose={vi.fn()} project={cryptProject} />)

    const launchButton = screen.getByRole("button", { name: /launch webgl game/i })
    expect(launchButton).toBeInTheDocument()

    await user.click(launchButton)
    expect(screen.getByLabelText("Crypt of the Cursed Game Engine")).toBeInTheDocument()
  })

  it("renders launch game button for mines-vanilla-game and opens MinesVanillaModal", async () => {
    const user = userEvent.setup()
    const vanillaProject: IProject = {
      ...mockProject,
      id: "mines-vanilla-game",
      title: "Mines Vanilla",
      liveUrl: undefined,
    }

    render(<CaseStudyModal isOpen={true} onClose={vi.fn()} project={vanillaProject} />)

    const launchButton = screen.getByRole("button", { name: /launch webgl game/i })
    expect(launchButton).toBeInTheDocument()

    await user.click(launchButton)
    expect(screen.getByLabelText("Mines Classic Game Engine")).toBeInTheDocument()
  })
})
