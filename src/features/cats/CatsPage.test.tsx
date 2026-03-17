import { render, screen, fireEvent } from "@testing-library/react"
import { describe, it, expect, vi, beforeEach } from "vitest"
import { CatsPage } from "./CatsPage"

vi.mock("./api", () => ({
  useCat: vi.fn(),
}))

import { useCat } from "./api"

describe("CatsPage", () => {
  beforeEach(() => {
    vi.mocked(useCat).mockReturnValue([undefined, { refresh: vi.fn() }])
  })

  it("renders the get new cat button", () => {
    render(<CatsPage />)
    expect(
      screen.getByRole("button", { name: /get new cat/i }),
    ).toBeInTheDocument()
  })

  it("button is disabled while no cat is loaded", () => {
    render(<CatsPage />)
    expect(screen.getByRole("button", { name: /get new cat/i })).toBeDisabled()
  })

  it("renders the cat image with alt text when one is available", () => {
    vi.mocked(useCat).mockReturnValue([
      { url: "https://example.com/cat.jpg" },
      { refresh: vi.fn() },
    ])
    render(<CatsPage />)
    const img = screen.getByRole("img") as HTMLImageElement
    expect(img.src).toBe("https://example.com/cat.jpg")
    expect(img.alt).toBe("A random cat")
  })

  it("calls refresh when the button is clicked", () => {
    const refresh = vi.fn()
    vi.mocked(useCat).mockReturnValue([
      { url: "https://example.com/cat2.jpg" },
      { refresh },
    ])
    render(<CatsPage />)
    fireEvent.click(screen.getByRole("button", { name: /get new cat/i }))
    expect(refresh).toHaveBeenCalledTimes(1)
  })
})
