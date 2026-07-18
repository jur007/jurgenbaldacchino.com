import { render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"

import { SiteFooter } from "./site-footer"

describe("SiteFooter", () => {
  it("renders the contact and social links", () => {
    render(<SiteFooter />)

    expect(screen.getByRole("contentinfo")).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "hello@jurgenbaldacchino.com" })).toHaveAttribute(
      "href",
      "mailto:hello@jurgenbaldacchino.com",
    )

    const socialLinks = [
      ["GitHub", "https://github.com/jur007"],
      ["LinkedIn", "https://mt.linkedin.com/in/jurgen-baldacchino-aab41062"],
      ["Instagram", "https://www.instagram.com/jur_007/"],
    ]

    socialLinks.forEach(([label, href]) => {
      expect(screen.getByRole("link", { name: label })).toHaveAttribute("href", href)
      expect(screen.getByRole("link", { name: label })).toHaveAttribute("target", "_blank")
    })
  })

  it("uses the current year in the copyright", () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date("2032-03-15"))

    render(<SiteFooter />)

    expect(screen.getByText("© 2032 Jurgen Baldacchino. All rights reserved.")).toBeInTheDocument()

    vi.useRealTimers()
  })
})
