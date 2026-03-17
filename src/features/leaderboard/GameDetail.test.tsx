import { render, screen, waitFor } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { MemoryRouter, Route, Routes } from "react-router-dom"
import { GameDetail } from "./GameDetail"

vi.mock("./api", () => ({
  useGame: (id: string) => [
    id === "1" ? { id: "1", word: "APPLE", date: "2023-10-01" } : undefined,
    { refresh: vi.fn() },
  ],
  useR6Leaderboard: vi.fn(),
  getR6Leaderboard: vi.fn(),
  getGame: (id: string) =>
    Promise.resolve(
      id === "1" ? { id: "1", word: "APPLE", date: "2023-10-01" } : undefined,
    ),
}))

describe("GameDetail", () => {
  it("renders full game details for a valid route id", async () => {
    render(
      <MemoryRouter initialEntries={["/leaderboard/1"]}>
        <Routes>
          <Route path="/leaderboard/:id" element={<GameDetail />} />
        </Routes>
      </MemoryRouter>,
    )

    await waitFor(() => {
      expect(
        screen.getByRole("heading", { name: /Game #1 — 2023-10-01/i }),
      ).toBeInTheDocument()
    })

    expect(
      screen.getByRole("link", { name: "Back to Leaderboard" }),
    ).toBeInTheDocument()
    expect(screen.getByText("Word: *A***")).toBeInTheDocument()
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
      expect(screen.getByText(/Game not found/i)).toBeInTheDocument()
    })
  })
})
