import { describe, it, expect } from "vitest"
import { calculateKeyboardState, evaluateGuess } from "./logic"

describe("evaluateGuess", () => {
  it("identifies green letters correctly", () => {
    const result = evaluateGuess("KHALI", "KHALI")
    expect(result).toEqual(["green", "green", "green", "green", "green"])
  })

  it("identifies yellow letters correctly", () => {
    const result = evaluateGuess("KLAIH", "KHALI")

    expect(result[0]).toBe("green")
    expect(result[1]).toBe("yellow")
    expect(result[2]).toBe("green")
    expect(result[3]).toBe("yellow")
    expect(result[4]).toBe("yellow")
  })

  it("identifies dark letters correctly", () => {
    const result = evaluateGuess("BROON", "KHALI")
    expect(result).toEqual(["dark", "dark", "dark", "dark", "dark"])
  })

  it("returns all unused for empty input", () => {
    const result = evaluateGuess("     ", "KHALI")
    expect(result).toEqual(["unused", "unused", "unused", "unused", "unused"])
  })
})

describe("calculateKeyboardState", () => {
  it("keeps strongest status per letter across guesses", () => {
    const state = calculateKeyboardState(["ZZZZZ", "AZZZZ", "APPLE"], "APPLE")

    expect(state.Z).toBe("dark")
    expect(state.A).toBe("green")
    expect(state.P).toBe("green")
    expect(state.L).toBe("green")
    expect(state.E).toBe("green")
  })

  it("ignores empty guesses and returns empty map when no guesses are committed", () => {
    const state = calculateKeyboardState(["     ", "     "], "KHALI")
    expect(state).toEqual({})
  })
})
