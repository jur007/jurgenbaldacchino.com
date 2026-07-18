import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { afterEach, describe, expect, it, vi } from "vitest"

import { ChatSection } from "./chat-section"

describe("ChatSection", () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("renders the contact heading and required email fields", () => {
    render(<ChatSection />)

    expect(
      screen.getByRole("heading", { name: "Have an idea? Let's build it together." }),
    ).toBeInTheDocument()
    expect(screen.getByRole("textbox", { name: /Full name.*required/i })).toBeRequired()
    expect(screen.getByRole("textbox", { name: /Email address.*required/i })).toBeRequired()
    expect(screen.getByRole("textbox", { name: /Message.*required/i })).toBeRequired()
  })

  it("composes an encoded email from the supplied details", async () => {
    const user = userEvent.setup()
    const openEmail = vi.spyOn(window, "open").mockImplementation(() => null)
    render(<ChatSection />)

    await user.type(screen.getByRole("textbox", { name: /Full name.*required/i }), "Alex Smith")
    await user.type(
      screen.getByRole("textbox", { name: /Email address.*required/i }),
      "alex@example.com",
    )
    await user.type(
      screen.getByRole("textbox", { name: /Message.*required/i }),
      "Let's discuss the idea.",
    )
    await user.click(screen.getByRole("button", { name: "Send message" }))

    expect(openEmail).toHaveBeenCalledWith(
      "mailto:hello@jurgenbaldacchino.com?subject=Website%20enquiry%20from%20Alex%20Smith&body=Name%3A%20Alex%20Smith%0AEmail%3A%20alex%40example.com%0A%0ALet's%20discuss%20the%20idea.",
      "_self",
    )
  })
})
