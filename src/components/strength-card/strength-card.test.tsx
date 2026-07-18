import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { StrengthCard } from "./strength-card"

describe("StrengthCard", () => {
  it("renders its accessible heading and technical detail", () => {
    render(
      <StrengthCard
        description="Building maintainable frontend applications."
        index="01"
        technicalDetail="React · TypeScript"
        title="React Engineering"
      />,
    )

    expect(screen.getByRole("article", { name: "React Engineering" })).toBeInTheDocument()
    expect(screen.getByRole("heading", { name: "React Engineering" })).toBeInTheDocument()
    expect(screen.getByText("React · TypeScript")).toBeInTheDocument()
  })
})
