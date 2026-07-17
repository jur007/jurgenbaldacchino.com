import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { PageLayout } from "./page-layout"

describe("PageLayout", () => {
  it("renders the page shell, navigation, and supplied content", () => {
    render(
      <PageLayout>
        <p>Page content</p>
      </PageLayout>,
    )

    expect(screen.getByRole("navigation", { name: "Primary navigation" })).toBeInTheDocument()
    expect(screen.getByText("Page content")).toBeInTheDocument()
    expect(screen.getByRole("contentinfo")).toBeInTheDocument()
  })
})
