import { describe, it, expect, beforeEach } from "vitest"
import { create } from "zustand"
import { createGameSlice, type GameSlice } from "./gameSlice"
import { MAX_GUESSES, WORD_LENGTH } from "../config"

function makeStore() {
  return create<GameSlice>()((...args) => createGameSlice(...args))
}

describe("gameSlice", () => {
  let store: ReturnType<typeof makeStore>

  beforeEach(() => {
    store = makeStore()
  })

  it("initialises with the default secret word and empty guesses", () => {
    const { secretWord, guesses, currentRow } = store.getState()
    expect(secretWord).toHaveLength(WORD_LENGTH)
    expect(guesses).toHaveLength(MAX_GUESSES)
    expect(currentRow).toBe(0)
    guesses.forEach((g) => expect(g.trim()).toBe(""))
  })

  it("typeKey appends a letter to the current guess", () => {
    store.getState().typeKey("A")
    expect(store.getState().guesses[0].trim()).toBe("A")
  })

  it("typeKey does not exceed WORD_LENGTH", () => {
    for (let i = 0; i < WORD_LENGTH + 5; i++) store.getState().typeKey("A")
    expect(store.getState().guesses[0].trim()).toHaveLength(WORD_LENGTH)
  })

  it("deleteLetter removes the last typed character", () => {
    store.getState().typeKey("A")
    store.getState().typeKey("B")
    store.getState().deleteLetter()
    expect(store.getState().guesses[0].trim()).toBe("A")
  })

  it("deleteLetter does nothing when the current guess is empty", () => {
    store.getState().deleteLetter()
    expect(store.getState().guesses[0].trim()).toBe("")
  })

  it("submitGuess advances currentRow when word is complete", () => {
    for (let i = 0; i < WORD_LENGTH; i++) store.getState().typeKey("A")
    store.getState().submitGuess()
    expect(store.getState().currentRow).toBe(1)
  })

  it("submitGuess does not advance when guess is incomplete", () => {
    store.getState().typeKey("A")
    store.getState().submitGuess()
    expect(store.getState().currentRow).toBe(0)
  })

  it("resetGame clears the board and optionally sets a new word", () => {
    for (let i = 0; i < WORD_LENGTH; i++) store.getState().typeKey("A")
    store.getState().submitGuess()
    store.getState().resetGame("CRANE")
    const { secretWord, guesses, currentRow } = store.getState()
    expect(secretWord).toBe("CRANE")
    expect(currentRow).toBe(0)
    guesses.forEach((g) => expect(g.trim()).toBe(""))
  })
})
