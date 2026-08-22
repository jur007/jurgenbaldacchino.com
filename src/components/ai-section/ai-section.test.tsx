import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { AiSection } from "./ai-section"

describe("AiSection", () => {
  it("renders the AI approach, 4-step process roadmap, and core tenets", () => {
    render(<AiSection />)

    expect(screen.getByRole("heading", { name: "AI-assisted. Human-led." })).toBeInTheDocument()
    expect(
      screen.getByText(/I use AI to speed up prototyping, challenge technical assumptions/i),
    ).toBeInTheDocument()
    expect(screen.getByRole("list", { name: "4-step engineering process" })).toBeInTheDocument()
    expect(screen.getByRole("heading", { name: "Discover & Align" })).toBeInTheDocument()
    expect(screen.getByRole("heading", { name: "Architect & Prototype" })).toBeInTheDocument()
    expect(screen.getByRole("heading", { name: "Build & Optimize" })).toBeInTheDocument()
    expect(screen.getByRole("heading", { name: "Deliver & Scale" })).toBeInTheDocument()

    // Core tenets
    expect(screen.getByText("Predictability First")).toBeInTheDocument()
    expect(screen.getByText("Pragmatic Evolution")).toBeInTheDocument()
    expect(screen.getByText("DX Multiplier")).toBeInTheDocument()
  })
})
