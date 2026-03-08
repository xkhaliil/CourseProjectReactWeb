import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { Keyboard } from "./Keyboard"

describe("Keyboard", () => {
  it("smoke test: renders one-letter buttons and action keys", () => {
    render(<Keyboard getKeyState={() => "unused"} />)

    expect(screen.getByRole("button", { name: "A" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "M" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Z" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "BKSP" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "ENTER" })).toBeInTheDocument()
    expect(screen.getAllByRole("button")).toHaveLength(28)
  })

  it("dispatches a matching letter keydown when a key is clicked", () => {
    const listener = vi.fn()
    window.addEventListener("keydown", listener)

    render(<Keyboard getKeyState={() => "unused"} />)
    fireEvent.click(screen.getByRole("button", { name: "Q" }))

    expect(listener).toHaveBeenCalled()
    const event = listener.mock.calls[0][0] as KeyboardEvent
    expect(event.key).toBe("Q")

    window.removeEventListener("keydown", listener)
  })
})
