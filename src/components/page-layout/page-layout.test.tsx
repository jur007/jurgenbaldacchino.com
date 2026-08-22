import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { afterEach, describe, expect, it } from "vitest"

import { PageLayout } from "./page-layout"

describe("PageLayout", () => {
  afterEach(() => {
    document.body.style.overflow = ""
  })

  it("renders the page shell, navigation, and supplied content", () => {
    render(
      <PageLayout>
        <p>Page content</p>
      </PageLayout>,
    )

    expect(screen.getByRole("navigation", { name: "Primary navigation" })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "Showcase" })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: "About" })).toBeInTheDocument()
    expect(screen.queryByRole("link", { name: "Expertise" })).not.toBeInTheDocument()
    expect(screen.queryByRole("link", { name: "Approach" })).not.toBeInTheDocument()
    expect(screen.getByText("Page content")).toBeInTheDocument()
    expect(screen.getByRole("contentinfo")).toBeInTheDocument()
  })

  it("toggles the mobile navigation and locks body scroll", async () => {
    const user = userEvent.setup()
    render(
      <PageLayout>
        <p>Page content</p>
      </PageLayout>,
    )

    const menuButton = screen.getByLabelText("Open navigation")

    await user.click(menuButton)
    expect(screen.getByLabelText("Close navigation")).toHaveAttribute("aria-expanded", "true")
    expect(document.body.style.overflow).toBe("hidden")

    const aboutLink = screen.getByRole("link", { name: "About" })
    aboutLink.addEventListener("click", (event) => event.preventDefault(), { once: true })
    await user.click(aboutLink)
    expect(screen.getByLabelText("Open navigation")).toHaveAttribute("aria-expanded", "false")
    expect(document.body.style.overflow).toBe("")
  })

  it("closes mobile navigation when Escape key is pressed", async () => {
    const user = userEvent.setup()
    render(
      <PageLayout>
        <p>Page content</p>
      </PageLayout>,
    )

    const menuButton = screen.getByLabelText("Open navigation")
    await user.click(menuButton)
    expect(document.body.style.overflow).toBe("hidden")

    await user.keyboard("{Escape}")
    expect(screen.getByLabelText("Open navigation")).toHaveAttribute("aria-expanded", "false")
    expect(document.body.style.overflow).toBe("")
  })
})
