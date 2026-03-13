import { render, screen } from "@testing-library/react"
import { describe, expect, it, vi, beforeEach } from "vitest"
import { MemoryRouter } from "react-router-dom"
import { Leaderboard } from "./Leaderboard"

vi.mock("../../shared/useAsync", () => ({
  default: vi.fn(),
}))

import useAsync from "../../shared/useAsync"

describe("Leaderboard", () => {
  beforeEach(() => {
    vi.mocked(useAsync).mockReturnValue([
      [
        {
          id: "UserA",
          position: 1,
          rankPoints: 4000,
          kd: 1.5,
          matchesPlayed: 100,
        },
        {
          id: "UserB",
          position: 2,
          rankPoints: 3900,
          kd: 1.2,
          matchesPlayed: 90,
        },
      ],
      { refresh: vi.fn() },
    ])
  })

  it("renders games, top scores, and empty state", () => {
    render(
      <MemoryRouter>
        <Leaderboard />
      </MemoryRouter>,
    )

    expect(
      screen.getByRole("heading", { name: "R6 Leaderboard" }),
    ).toBeInTheDocument()
    expect(screen.getByText(/#1 — UserA/i)).toBeInTheDocument()
    expect(screen.getByText(/#2 — UserB/i)).toBeInTheDocument()
    expect(screen.getByText("4000")).toBeInTheDocument()
    expect(screen.getByText("1.5")).toBeInTheDocument()
    expect(screen.getByText("100")).toBeInTheDocument()
  })
})
