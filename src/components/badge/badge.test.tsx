import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { Badge } from "./badge"
import { IBadgeType } from "./badge.types"

describe("Badge", () => {
  it("renders its content and accent type", () => {
    render(<Badge type={IBadgeType.ACCENT}>Available</Badge>)

    const badge = screen.getByText("Available")

    expect(badge.className).toContain("accent")
  })
})
