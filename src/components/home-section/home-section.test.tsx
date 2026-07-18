import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { HomeSection } from "./home-section"

describe("HomeSection", () => {
  it("renders the introduction, personal card, and five core strengths", () => {
    render(<HomeSection />)

    expect(
      screen.getByRole("heading", {
        name: /Turning ideas into thoughtful frontend experiences, built together and made to last/i,
      }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole("heading", {
        name: /Building the systems and teams behind excellent products/i,
      }),
    ).toBeInTheDocument()
    expect(screen.getByRole("heading", { name: "Core strengths" })).toBeInTheDocument()
    expect(screen.getByRole("list", { name: "Core strengths" })).toBeInTheDocument()
    expect(screen.getAllByRole("article")).toHaveLength(5)
    expect(screen.getByRole("heading", { name: "React Engineering" })).toBeInTheDocument()
    expect(screen.getByRole("heading", { name: "Creative Development" })).toBeInTheDocument()
    expect(screen.getByRole("heading", { name: "Frontend DevOps" })).toBeInTheDocument()
    expect(screen.getByRole("heading", { name: "Simplicity and Clarity" })).toBeInTheDocument()
    expect(screen.getByRole("heading", { name: "One-Team Collaboration" })).toBeInTheDocument()
  })
})
