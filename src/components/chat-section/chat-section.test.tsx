import { act, render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"

import { ChatSection } from "./chat-section"

interface ITurnstileTestOptions {
  callback: () => void
  "error-callback": () => void
  "expired-callback": () => void
  sitekey: string
  size: string
  theme: string
}

describe("ChatSection", () => {
  let turnstileOptions: ITurnstileTestOptions

  beforeEach(() => {
    vi.stubEnv("VITE_TURNSTILE_SITE_KEY", "test-turnstile-site-key")
    window.turnstile = {
      remove: vi.fn(),
      render: vi.fn((container, options) => {
        turnstileOptions = options
        const responseField = document.createElement("input")
        responseField.name = "cf-turnstile-response"
        responseField.value = "verified-turnstile-token"
        container.append(responseField)
        return "contact-turnstile"
      }),
      reset: vi.fn(),
    }
  })

  afterEach(() => {
    vi.restoreAllMocks()
    vi.unstubAllEnvs()
    delete window.turnstile
  })

  const verifyHuman = async () => {
    await waitFor(() => expect(window.turnstile?.render).toHaveBeenCalled())
    act(() => turnstileOptions.callback())
  }

  it("renders the contact heading, required email fields, and spam protection", async () => {
    render(<ChatSection />)

    expect(
      screen.getByRole("heading", { name: "Have an idea? Let's build it together." }),
    ).toBeInTheDocument()
    expect(screen.getByRole("textbox", { name: /Full name.*required/i })).toBeRequired()
    expect(screen.getByRole("textbox", { name: /Email address.*required/i })).toBeRequired()
    expect(screen.getByRole("textbox", { name: /Message.*required/i })).toBeRequired()
    expect(screen.getByLabelText("Spam protection")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Send message" })).toBeDisabled()

    await verifyHuman()

    expect(screen.getByRole("button", { name: "Send message" })).toBeEnabled()
    expect(window.turnstile?.render).toHaveBeenCalledWith(
      expect.any(HTMLElement),
      expect.objectContaining({
        sitekey: "test-turnstile-site-key",
        size: "flexible",
        theme: "dark",
      }),
    )
  })

  it("submits the supplied details and confirms success", async () => {
    const user = userEvent.setup()
    const submitContactForm = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue({ ok: true } as Response)
    render(<ChatSection />)
    await verifyHuman()

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
    expect(submittedFormData.get("cf-turnstile-response")).toBe("verified-turnstile-token")
    expect(await screen.findByText(/your message is on its way/i)).toBeInTheDocument()
    expect(screen.getByRole("textbox", { name: /Full name.*required/i })).toHaveValue("")
    expect(window.turnstile?.reset).toHaveBeenCalledWith("contact-turnstile")
  })

  it("shows a failure message when the submission is rejected", async () => {
    const user = userEvent.setup()
    vi.spyOn(globalThis, "fetch").mockResolvedValue({ ok: false } as Response)
    render(<ChatSection />)
    await verifyHuman()

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
    await verifyHuman()

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
    expect(await screen.findByText(/your message is on its way/i)).toBeInTheDocument()
  })

  it("requires a fresh verification after the Turnstile token expires", async () => {
    render(<ChatSection />)
    await verifyHuman()

    expect(screen.getByRole("button", { name: "Send message" })).toBeEnabled()
    act(() => turnstileOptions["expired-callback"]())

    expect(screen.getByRole("button", { name: "Send message" })).toBeDisabled()
    expect(screen.getByRole("status")).toHaveTextContent("Checking that you're human")
  })

  it("shows an accessible error when Turnstile cannot verify the visitor", async () => {
    render(<ChatSection />)
    await waitFor(() => expect(window.turnstile?.render).toHaveBeenCalled())
    act(() => turnstileOptions["error-callback"]())

    expect(screen.getByRole("alert")).toHaveTextContent("Spam protection could not load")
    expect(screen.getByRole("button", { name: "Send message" })).toBeDisabled()
  })
})
