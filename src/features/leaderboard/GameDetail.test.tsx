import { render, screen, waitFor } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { MemoryRouter, Route, Routes } from "react-router-dom"
import { GameDetail } from "./GameDetail"

vi.mock("../../data/mockData", () => ({
  getGame: (id: string) =>
    Promise.resolve(id === "1" ? { id: "1", word: "APPLE", date: "2023-10-01" } : undefined),
  getTopScores: (id: string) =>
    Promise.resolve(
      id === "1"
        ? [
            { id: "1-0", userId: "Alpha", guesses: 2, duration: 50 },
            { id: "1-1", userId: "Beta", guesses: 3, duration: 90 },
          ]
        : [],
    ),
  useGameDetail: (id: string) => [
    id === "1"
      ? [
          { id: "1", word: "APPLE", date: "2023-10-01" },
          [
            { id: "1-0", userId: "Alpha", guesses: 2, duration: 50 },
            { id: "1-1", userId: "Beta", guesses: 3, duration: 90 },
          ],
        ]
      : [undefined, []],
    { refresh: vi.fn() },
  ],
}))

describe("GameDetail", () => {
  it("renders full game details with scores for a valid route id", async () => {
    render(
      <MemoryRouter initialEntries={["/leaderboard/1"]}>
        <Routes>
          <Route path="/leaderboard/:id" element={<GameDetail />} />
        </Routes>
      </MemoryRouter>,
    )

    await waitFor(() => {
      expect(screen.getByRole("heading", { name: /Game #1 - 2023-10-01/i })).toBeInTheDocument()
    })

    expect(screen.getByRole("link", { name: "Back to Leaderboard" })).toBeInTheDocument()
    expect(screen.getByText("Word: *A***")).toBeInTheDocument()
    expect(screen.getByText("#1")).toBeInTheDocument()
    expect(screen.getByText("Alpha")).toBeInTheDocument()
    expect(screen.getByText("2 guesses (50s)")).toBeInTheDocument()
  })

  it("renders fallback message when game does not exist", async () => {
    render(
      <MemoryRouter initialEntries={["/leaderboard/999"]}>
        <Routes>
          <Route path="/leaderboard/:id" element={<GameDetail />} />
        </Routes>
      </MemoryRouter>,
    )

    await waitFor(() => {
      expect(screen.getByText(/Loading or Game not found/i)).toBeInTheDocument()
    })
  })
})