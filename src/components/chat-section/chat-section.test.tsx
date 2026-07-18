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

  it("submits the supplied details and confirms success", async () => {
    const user = userEvent.setup()
    const submitContactForm = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue({ ok: true } as Response)
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

    expect(submitContactForm).toHaveBeenCalledWith(
      "https://formspree.io/f/mzdnrraj",
      expect.objectContaining({
        method: "POST",
        headers: { Accept: "application/json" },
      }),
    )
    const request = submitContactForm.mock.calls[0]?.[1]
    const submittedFormData = request?.body as FormData
    expect(submittedFormData.get("fullName")).toBe("Alex Smith")
    expect(submittedFormData.get("email")).toBe("alex@example.com")
    expect(submittedFormData.get("message")).toBe("Let's discuss the idea.")
    expect(await screen.findByRole("status")).toHaveTextContent("your message is on its way")
    expect(screen.getByRole("textbox", { name: /Full name.*required/i })).toHaveValue("")
  })

  it("shows a failure message when the submission is rejected", async () => {
    const user = userEvent.setup()
    vi.spyOn(globalThis, "fetch").mockResolvedValue({ ok: false } as Response)
    render(<ChatSection />)

    await user.type(screen.getByRole("textbox", { name: /Full name.*required/i }), "Alex Smith")
    await user.type(
      screen.getByRole("textbox", { name: /Email address.*required/i }),
      "alex@example.com",
    )
    await user.type(screen.getByRole("textbox", { name: /Message.*required/i }), "Hello")
    await user.click(screen.getByRole("button", { name: "Send message" }))

    expect(await screen.findByRole("alert")).toHaveTextContent("could not be sent")
    expect(screen.getByRole("textbox", { name: /Full name.*required/i })).toHaveValue("Alex Smith")
  })

  it("disables the button while the message is being sent", async () => {
    const user = userEvent.setup()
    let resolveSubmission: ((response: Response) => void) | undefined
    vi.spyOn(globalThis, "fetch").mockImplementation(
      () =>
        new Promise<Response>((resolve) => {
          resolveSubmission = resolve
        }),
    )
    render(<ChatSection />)

    await user.type(screen.getByRole("textbox", { name: /Full name.*required/i }), "Alex Smith")
    await user.type(
      screen.getByRole("textbox", { name: /Email address.*required/i }),
      "alex@example.com",
    )
    await user.type(screen.getByRole("textbox", { name: /Message.*required/i }), "Hello")
    await user.click(screen.getByRole("button", { name: "Send message" }))

    const sendingButton = screen.getByRole("button", { name: "Sending message" })
    expect(sendingButton).toBeDisabled()
    expect(sendingButton).toHaveAttribute("aria-busy", "true")

    resolveSubmission?.({ ok: true } as Response)
    expect(await screen.findByRole("status")).toBeInTheDocument()
  })
})
