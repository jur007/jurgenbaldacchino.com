import { render, screen } from "@testing-library/react"
import { afterEach, describe, expect, it } from "vitest"
import App from "./App"

describe("App", () => {
  afterEach(() => {
    window.history.pushState({}, "", "/")
  })

  it("renders the home page heading", () => {
    window.history.pushState({}, "", "/")
    render(<App />)

    expect(
      screen.getByRole("heading", {
        name: /Building high-impact frontend architectures made to last/i,
      }),
    ).toBeInTheDocument()
  })

  it("renders the about page at the about path", async () => {
    window.history.pushState({}, "", "/about")
    render(<App />)

    expect(
      await screen.findByRole(
        "heading",
        { name: /Driven by curiosity, craft, and exploration/i },
        { timeout: 4000 },
      ),
    ).toBeInTheDocument()
  })

  it("renders the about page with a trailing slash", async () => {
    window.history.pushState({}, "", "/about/")
    render(<App />)

    expect(
      await screen.findByRole(
        "heading",
        { name: /Driven by curiosity, craft, and exploration/i },
        { timeout: 4000 },
      ),
    ).toBeInTheDocument()
  })

  it("renders the showcase page at the showcase path", async () => {
    window.history.pushState({}, "", "/showcase")
    render(<App />)

    expect(
      await screen.findByRole("heading", { name: "Showcase" }, { timeout: 4000 }),
    ).toBeInTheDocument()
  })

  it("renders the not found page for an unknown path", async () => {
    window.history.pushState({}, "", "/missing-page")
    render(<App />)

    expect(
      await screen.findByRole("heading", { name: "This page wandered off." }, { timeout: 4000 }),
    ).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "Return home" })).toHaveAttribute("href", "/")
  })
})
