import { render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { MemoryRouter } from "react-router-dom"
import { Leaderboard } from "./Leaderboard"

vi.mock("../../data/mockData", () => ({
  getGames: () => [
    { id: "1", word: "APPLE", date: "2023-10-01" },
    { id: "2", word: "BEACH", date: "2023-10-02" },
  ],
  getTopScores: (gameId: string) => {
    if (gameId === "1") {
      return [
        { id: "1-0", userId: "UserA", guesses: 2, duration: 45 },
        { id: "1-1", userId: "UserB", guesses: 3, duration: 60 },
        { id: "1-2", userId: "UserC", guesses: 4, duration: 75 },
      ]
    }
    return []
  },
}))

describe("Leaderboard", () => {
  it("renders games, top scores, and empty state", () => {
    render(
      <MemoryRouter>
        <Leaderboard />
      </MemoryRouter>,
    )

    expect(screen.getByRole("heading", { name: "Leaderboard" })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /Game #1 - 2023-10-01/i })).toBeInTheDocument()
    expect(screen.getByRole("link", { name: /Game #2 - 2023-10-02/i })).toBeInTheDocument()

    expect(screen.getByText("1. UserA")).toBeInTheDocument()
    expect(screen.getByText("2 guesses (45s)")).toBeInTheDocument()
    expect(screen.getByText("No scores yet")).toBeInTheDocument()
  })
})
