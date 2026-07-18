import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
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
    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument()
    expect(screen.queryByRole("link", { name: "Expertise" })).not.toBeInTheDocument()
    expect(screen.queryByRole("link", { name: "Approach" })).not.toBeInTheDocument()
    expect(screen.getByText("Page content")).toBeInTheDocument()
    expect(screen.getByRole("contentinfo")).toBeInTheDocument()
  })

  it("toggles the mobile navigation and closes it after a selection", async () => {
    const user = userEvent.setup()
    render(
      <PageLayout>
        <p>Page content</p>
      </PageLayout>,
    )

    const menuButton = screen.getByLabelText("Open navigation")

    await user.click(menuButton)
    expect(screen.getByLabelText("Close navigation")).toHaveAttribute("aria-expanded", "true")

    const aboutLink = screen.getByRole("link", { name: "About" })
    aboutLink.addEventListener("click", (event) => event.preventDefault(), { once: true })
    await user.click(aboutLink)
    expect(screen.getByLabelText("Open navigation")).toHaveAttribute("aria-expanded", "false")
  })
})
