import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { Card } from "./card"
import { ICardType } from "./card.types"

describe("Card", () => {
  it("renders with the requested semantic element and surface type", () => {
    render(
      <Card as="article" type={ICardType.ACCENT}>
        Architecture
      </Card>,
    )

    const card = screen.getByRole("article")

    expect(card).toHaveTextContent("Architecture")
    expect(card.className).toContain("accent")
  })
})
