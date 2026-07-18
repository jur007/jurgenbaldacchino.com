import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { AiSection } from "./ai-section"

describe("AiSection", () => {
  it("renders the AI approach and working principles", () => {
    render(<AiSection />)

    expect(screen.getByRole("heading", { name: "AI-assisted. Human-led." })).toBeInTheDocument()
    expect(
      screen.getByText(/I use AI to explore ideas, accelerate repetitive work/i),
    ).toBeInTheDocument()
    expect(screen.getByLabelText("AI working principles")).toHaveTextContent(
      /Faster Exploration\s*·\s*Human Judgment/,
    )
  })
})
