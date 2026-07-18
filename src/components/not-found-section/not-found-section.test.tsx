import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { NotFoundSection } from "./not-found-section"

describe("NotFoundSection", () => {
  it("identifies the missing page and provides a route home", () => {
    render(<NotFoundSection />)

    expect(screen.getByRole("heading", { name: "This page wandered off." })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "Return home" })).toHaveAttribute("href", "/")
  })
})
