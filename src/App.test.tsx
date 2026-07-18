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
        name: /Turning ideas into thoughtful frontend experiences, built together and made to last/i,
      }),
    ).toBeInTheDocument()
  })

  it("renders the about page at the about path", async () => {
    window.history.pushState({}, "", "/about")
    render(<App />)

    expect(
      await screen.findByRole("heading", { name: /Curiosity keeps me moving/i }),
    ).toBeInTheDocument()
  })

  it("renders the about page with a trailing slash", async () => {
    window.history.pushState({}, "", "/about/")
    render(<App />)

    expect(
      await screen.findByRole("heading", { name: /Curiosity keeps me moving/i }),
    ).toBeInTheDocument()
  })
})
