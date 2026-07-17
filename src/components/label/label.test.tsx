import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { Label } from "./label"

describe("Label", () => {
  it("renders a required label for its associated field", () => {
    render(
      <>
        <Label htmlFor="name" required>
          Name
        </Label>
        <input id="name" />
      </>,
    )

    const label = screen.getByText("Name").closest("label")

    expect(label).toHaveAttribute("for", "name")
    expect(label).toHaveTextContent("required")
    expect(screen.getByLabelText(/Name/)).toBeInTheDocument()
  })
})
