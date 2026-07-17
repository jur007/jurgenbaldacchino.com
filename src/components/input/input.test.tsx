import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"

import { Input } from "./input"

describe("Input", () => {
  it("associates its label and accepts input", async () => {
    render(<Input id="name" label="Name" />)

    const input = screen.getByRole("textbox", { name: "Name" })
    await userEvent.type(input, "Jurgen")

    expect(input).toHaveValue("Jurgen")
  })

  it("connects an error message to the input", () => {
    render(<Input id="email" label="Email" errorMessage="Enter a valid email" />)

    const input = screen.getByRole("textbox", { name: "Email" })

    expect(input).toHaveAttribute("aria-invalid", "true")
    expect(input).toHaveAccessibleDescription("Enter a valid email")
  })
})
