import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"

import { StrengthCard } from "./strength-card"

describe("StrengthCard", () => {
  it("renders its accessible heading and technical detail", () => {
    render(
      <StrengthCard
        description="Building maintainable frontend applications."
        expandedDescription="More information about maintainable frontend applications."
        index="01"
        technicalDetail="React · TypeScript"
        title="React Engineering"
      />,
    )

    expect(screen.getByRole("article", { name: "React Engineering" })).toBeInTheDocument()
    expect(screen.getByRole("heading", { name: "React Engineering" })).toBeInTheDocument()
    expect(screen.getByText("React · TypeScript")).toBeInTheDocument()
    expect(
      screen.getByRole("button", { name: "Open React Engineering details" }),
    ).toBeInTheDocument()
  })

  it("renders expanded content and closes from its icon", async () => {
    const user = userEvent.setup()
    let isClosed = false

    render(
      <StrengthCard
        description="Building maintainable frontend applications."
        expandedDescription="More information about maintainable frontend applications."
        index="01"
        isExpanded
        onClose={() => {
          isClosed = true
        }}
        technicalDetail="React · TypeScript"
        title="React Engineering"
      />,
    )

    expect(screen.getByRole("dialog", { name: "React Engineering" })).toBeInTheDocument()
    expect(
      screen.getByText("More information about maintainable frontend applications."),
    ).toBeInTheDocument()

    await user.click(screen.getByRole("button", { name: "Close React Engineering details" }))

    expect(isClosed).toBe(true)
  })
})
