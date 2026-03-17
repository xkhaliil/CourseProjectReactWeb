import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import { MemoryRouter } from "react-router-dom"
import { HomePage } from "./HomePage"

describe("HomePage", () => {
  it("renders a heading", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    )
    expect(screen.getByRole("heading", { name: /games/i })).toBeInTheDocument()
  })

  it("renders a link for each registered game", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    )
    const links = screen.getAllByRole("link")
    expect(links.length).toBeGreaterThanOrEqual(2)
  })

  it("links point to /play/<slug> paths", () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>,
    )
    const links = screen.getAllByRole("link") as HTMLAnchorElement[]
    links.forEach((link) => {
      expect(link.href).toMatch(/\/play\//)
    })
  })
})
