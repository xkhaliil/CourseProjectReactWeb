import { render, screen } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import { MemoryRouter, Route, Routes } from "react-router-dom"
import { PlayPage } from "./PlayPage"

vi.mock("../../shared/games", () => ({
  default: {
    wordle: {
      title: "Wordle",
      Play: () => <div>Wordle Game</div>,
    },
  },
}))

function renderAtPath(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/play/:slug" element={<PlayPage />} />
      </Routes>
    </MemoryRouter>,
  )
}

describe("PlayPage", () => {
  it("renders the game title heading for a known slug", () => {
    renderAtPath("/play/wordle")
    expect(
      screen.getByRole("heading", { name: /play wordle/i }),
    ).toBeInTheDocument()
  })

  it("renders the game component for a known slug", () => {
    renderAtPath("/play/wordle")
    expect(screen.getByText("Wordle Game")).toBeInTheDocument()
  })

  it("shows an error heading for an unknown slug", () => {
    renderAtPath("/play/unknown-game")
    expect(screen.getByRole("heading", { name: /error/i })).toBeInTheDocument()
  })

  it("shows a descriptive message for an unknown slug", () => {
    renderAtPath("/play/unknown-game")
    expect(screen.getByText(/cannot find game/i)).toBeInTheDocument()
  })

  it("shows a home link when the slug is not found", () => {
    renderAtPath("/play/notreal")
    expect(screen.getByRole("link", { name: /go home/i })).toBeInTheDocument()
  })
})
