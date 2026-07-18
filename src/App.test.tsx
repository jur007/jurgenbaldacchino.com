import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import App from "./App"

describe("App", () => {
  it("renders the home page heading", () => {
    render(<App />)

    expect(
      screen.getByRole("heading", {
        name: /Turning ideas into thoughtful frontend experiences, built together and made to last/i,
      }),
    ).toBeInTheDocument()
  })
})
