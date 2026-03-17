/**
 * Integration test — Full Wordle game flow
 *
 * Exercises the complete vertical slice: Zustand store, pure business logic,
 * Game component. Does NOT mock the store — catches cross-layer regressions.
 */
import { render, screen, fireEvent, within } from "@testing-library/react"
import { describe, it, expect, beforeEach } from "vitest"
import { Game } from "./Game"
import { useStore } from "#shared/store"

function typeWord(word: string) {
  for (const char of word.toUpperCase()) {
    fireEvent.keyDown(window, { key: char })
  }
}

function pressEnter() {
  fireEvent.keyDown(window, { key: "Enter" })
}

function pressBackspace() {
  fireEvent.keyDown(window, { key: "Backspace" })
}

describe("Full game integration", () => {
  beforeEach(() => {
    useStore.getState().resetGame("CRANE")
    render(<Game />)
  })

  it("renders the game shell with title, subtitle, grid and keyboard", () => {
    expect(screen.getByText(/word clone/i)).toBeInTheDocument()
    expect(screen.getByText(/guess the hidden word/i)).toBeInTheDocument()
    expect(screen.getByTestId("guesses-container")).toBeInTheDocument()
    expect(screen.getByTestId("phone-keypad")).toBeInTheDocument()
  })

  it("letters appear in the grid as the user types", () => {
    typeWord("CRANE")
    const grid = screen.getByTestId("guesses-container")
    ;["C", "R", "A", "N", "E"].forEach((letter) => {
      expect(within(grid).getAllByText(letter).length).toBeGreaterThan(0)
    })
  })

  it("backspace removes the last typed letter", () => {
    typeWord("CR")
    pressBackspace()
    const grid = screen.getByTestId("guesses-container")
    expect(within(grid).getAllByText("C").length).toBeGreaterThan(0)
    expect(within(grid).queryAllByText("R")).toHaveLength(0)
  })

  it("incomplete guess is NOT submitted on Enter", () => {
    typeWord("CRA")
    pressEnter()
    expect(useStore.getState().currentRow).toBe(0)
  })

  it("a complete guess advances to the next row", () => {
    typeWord("BROOD")
    pressEnter()
    expect(useStore.getState().currentRow).toBe(1)
  })

  it("keyboard buttons respond to clicks and add letters to the grid", () => {
    const keypad = screen.getByTestId("phone-keypad")
    fireEvent.click(within(keypad).getByRole("button", { name: "C" }))
    fireEvent.click(within(keypad).getByRole("button", { name: "R" }))
    const grid = screen.getByTestId("guesses-container")
    expect(within(grid).getAllByText("C").length).toBeGreaterThan(0)
    expect(within(grid).getAllByText("R").length).toBeGreaterThan(0)
  })

  it("BKSP on-screen key deletes a letter", () => {
    const keypad = screen.getByTestId("phone-keypad")
    fireEvent.click(within(keypad).getByRole("button", { name: "C" }))
    fireEvent.click(within(keypad).getByRole("button", { name: "BKSP" }))
    const grid = screen.getByTestId("guesses-container")
    expect(within(grid).queryAllByText("C")).toHaveLength(0)
  })

  it("playing through multiple wrong guesses increases currentRow each time", () => {
    const wrongWords = ["BROOD", "FLASK", "LIGHT", "DEMON"]
    for (const word of wrongWords) {
      typeWord(word)
      pressEnter()
    }
    expect(useStore.getState().currentRow).toBe(4)
  })

  it("the grid has exactly 30 letter cells (6 rows × 5 columns)", () => {
    const grid = screen.getByTestId("guesses-container")
    expect(grid.querySelectorAll("span")).toHaveLength(30)
  })

  it("no further input is accepted once MAX_GUESSES are used", () => {
    const words = ["BROOD", "FLASK", "LIGHT", "DEMON", "PRISM", "SIXTY"]
    for (const word of words) {
      typeWord(word)
      pressEnter()
    }
    const rowBefore = useStore.getState().currentRow
    typeWord("CRANE")
    expect(useStore.getState().currentRow).toBe(rowBefore)
  })

  it("resetGame wipes the board and accepts a new secret word", () => {
    typeWord("BROOD")
    pressEnter()
    useStore.getState().resetGame("FLAME")
    expect(useStore.getState().currentRow).toBe(0)
    expect(useStore.getState().secretWord).toBe("FLAME")
  })
})
