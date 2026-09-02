import { render } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { ArrowRightIcon, BackArrowIcon, CloseIcon, ExternalLinkIcon, PlayIcon } from "./index"

describe("Shared Icons", () => {
  it("renders CloseIcon with default and custom props", () => {
    const { container } = render(<CloseIcon className="custom-close" size={32} />)
    const svg = container.querySelector("svg")
    expect(svg).toBeInTheDocument()
    expect(svg).toHaveClass("custom-close")
    expect(svg).toHaveAttribute("width", "32")
    expect(svg).toHaveAttribute("height", "32")
  })

  it("renders PlayIcon", () => {
    const { container } = render(<PlayIcon />)
    expect(container.querySelector("svg")).toBeInTheDocument()
  })

  it("renders BackArrowIcon", () => {
    const { container } = render(<BackArrowIcon />)
    expect(container.querySelector("svg")).toBeInTheDocument()
  })

  it("renders ArrowRightIcon", () => {
    const { container } = render(<ArrowRightIcon />)
    expect(container.querySelector("svg")).toBeInTheDocument()
  })

  it("renders ExternalLinkIcon", () => {
    const { container } = render(<ExternalLinkIcon />)
    expect(container.querySelector("svg")).toBeInTheDocument()
  })
})
