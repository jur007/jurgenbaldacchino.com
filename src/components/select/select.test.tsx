import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"

import { Select } from "./select"

describe("Select", () => {
  it("associates its label and changes value", async () => {
    render(
      <Select id="role" label="Role" defaultValue="">
        <option value="" disabled>
          Choose a role
        </option>
        <option value="frontend">Frontend</option>
        <option value="leadership">Leadership</option>
      </Select>,
    )

    const select = screen.getByRole("combobox", { name: "Role" })
    await userEvent.selectOptions(select, "leadership")

    expect(select).toHaveValue("leadership")
  })
})
