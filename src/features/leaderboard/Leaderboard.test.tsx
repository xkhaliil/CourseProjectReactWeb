import { render, screen, fireEvent } from "@testing-library/react"
import { describe, expect, it, vi, beforeEach } from "vitest"
import { MemoryRouter } from "react-router-dom"
import { Leaderboard } from "./Leaderboard"

vi.mock("./api/index.ts", () => ({
  useR6Leaderboard: vi.fn(),
}))

import { useR6Leaderboard } from "./api/index.ts"

const MOCK_PLAYERS = Array.from({ length: 6 }, (_, i) => ({
  id: `User${String.fromCharCode(65 + i)}`,
  position: i + 1,
  rankPoints: 4000 - i * 100,
  kd: +(1.5 - i * 0.1).toFixed(1),
  matchesPlayed: 100 - i * 5,
}))

describe("Leaderboard", () => {
  beforeEach(() => {
    vi.mocked(useR6Leaderboard).mockReturnValue([
      MOCK_PLAYERS,
      { refresh: vi.fn() },
    ])
  })

  it("renders the heading", () => {
    render(
      <MemoryRouter>
        <Leaderboard />
      </MemoryRouter>,
    )
    expect(
      screen.getByRole("heading", { name: "R6 Leaderboard" }),
    ).toBeInTheDocument()
  })

  it("renders the first page of players (5 per page)", () => {
    render(
      <MemoryRouter>
        <Leaderboard />
      </MemoryRouter>,
    )
    expect(screen.getByText(/#1 — UserA/i)).toBeInTheDocument()
    expect(screen.getByText(/#5 — UserE/i)).toBeInTheDocument()
    expect(screen.queryByText(/#6 — UserF/i)).not.toBeInTheDocument()
  })

  it("shows rank points, K/D, and matches for each player", () => {
    render(
      <MemoryRouter>
        <Leaderboard />
      </MemoryRouter>,
    )
    expect(screen.getByText("4000")).toBeInTheDocument()
    expect(screen.getByText("1.5")).toBeInTheDocument()
    expect(screen.getByText("100")).toBeInTheDocument()
  })

  it("Previous button is disabled on the first page", () => {
    render(
      <MemoryRouter>
        <Leaderboard />
      </MemoryRouter>,
    )
    expect(screen.getByRole("button", { name: /previous/i })).toBeDisabled()
  })

  it("navigates to page 2 when Next is clicked", () => {
    render(
      <MemoryRouter>
        <Leaderboard />
      </MemoryRouter>,
    )
    fireEvent.click(screen.getByRole("button", { name: /next/i }))
    expect(screen.getByText(/page 2/i)).toBeInTheDocument()
    expect(screen.getByText(/#6 — UserF/i)).toBeInTheDocument()
  })
})
