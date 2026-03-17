import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { MemoryRouter, Route, Routes } from "react-router-dom"
import { Layout } from "./Layout"

describe("Layout", () => {
  it("renders navigation links and nested route content", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<div>Child Content</div>} />
          </Route>
        </Routes>
      </MemoryRouter>,
    )

    expect(screen.getByRole("link", { name: "Play" })).toBeInTheDocument()
    expect(
      screen.getByRole("link", { name: "Leaderboard" }),
    ).toBeInTheDocument()
    expect(screen.getByText("Child Content")).toBeInTheDocument()
  })
})
