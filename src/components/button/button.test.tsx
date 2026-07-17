import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it, vi } from "vitest"

import { Button, ButtonLink } from "./button"
import { IButtonType } from "./button.types"

describe("Button", () => {
  it("renders the requested variant and handles clicks", async () => {
    const handleClick = vi.fn()

    render(
      <Button type={IButtonType.SECONDARY} onClick={handleClick}>
        View work
      </Button>,
    )

    const button = screen.getByRole("button", { name: "View work" })
    await userEvent.click(button)

    expect(button.className).toContain("secondary")
    expect(handleClick).toHaveBeenCalledOnce()
  })

  it("disables interaction while loading", () => {
    render(<Button loading>Saving</Button>)

    expect(screen.getByRole("button", { name: "Saving" })).toBeDisabled()
  })
})

describe("ButtonLink", () => {
  it("renders a navigational button", () => {
    render(<ButtonLink href="#contact">Contact me</ButtonLink>)

    expect(screen.getByRole("link", { name: "Contact me" })).toHaveAttribute("href", "#contact")
  })
})
