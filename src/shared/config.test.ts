import { describe, it, expect } from "vitest"
import { DEFAULT_SECRET_WORD, MAX_GUESSES, WORD_LENGTH } from "./config"

describe("shared/config", () => {
  it("DEFAULT_SECRET_WORD has exactly WORD_LENGTH characters", () => {
    expect(DEFAULT_SECRET_WORD).toHaveLength(WORD_LENGTH)
  })

  it("DEFAULT_SECRET_WORD is all uppercase letters", () => {
    expect(DEFAULT_SECRET_WORD).toMatch(/^[A-Z]+$/)
  })

  it("MAX_GUESSES is a positive integer", () => {
    expect(Number.isInteger(MAX_GUESSES)).toBe(true)
    expect(MAX_GUESSES).toBeGreaterThan(0)
  })

  it("WORD_LENGTH is a positive integer", () => {
    expect(Number.isInteger(WORD_LENGTH)).toBe(true)
    expect(WORD_LENGTH).toBeGreaterThan(0)
  })

  it("standard Wordle values are 6 guesses and 5 letters", () => {
    expect(MAX_GUESSES).toBe(6)
    expect(WORD_LENGTH).toBe(5)
  })
})
