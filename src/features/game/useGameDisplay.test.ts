import { describe, it, expect, beforeEach } from "vitest"
import { renderHook, act } from "@testing-library/react"
import { useGameDisplay } from "./useGameDisplay"
import { useStore } from "#shared/store"

describe("useGameDisplay", () => {
  beforeEach(() => {
    useStore.getState().resetGame("CRANE")
  })

  it("returns guesses and currentRow from the store", () => {
    const { result } = renderHook(() => useGameDisplay())
    expect(result.current.guesses).toHaveLength(6)
    expect(result.current.currentRow).toBe(0)
  })

  it("getCellState returns unused for rows not yet submitted", () => {
    const { result } = renderHook(() => useGameDisplay())
    expect(result.current.getCellState("CRANE", 0, 0)).toBe("unused")
  })

  it("getCellState returns green for a correct letter after submission", () => {
    act(() => {
      const store = useStore.getState()
      "CRANE".split("").forEach((l) => store.typeKey(l))
      store.submitGuess()
    })
    const { result } = renderHook(() => useGameDisplay())
    expect(result.current.getCellState("CRANE", 0, 0)).toBe("green")
  })

  it("getKeyState returns unused for a letter that has not been guessed", () => {
    const { result } = renderHook(() => useGameDisplay())
    expect(result.current.getKeyState("Z")).toBe("unused")
  })

  it("getKeyState returns dark for a letter that is not in the word", () => {
    act(() => {
      const store = useStore.getState()
      "ZZZZZ".split("").forEach((l) => store.typeKey(l))
      store.submitGuess()
    })
    const { result } = renderHook(() => useGameDisplay())
    expect(result.current.getKeyState("Z")).toBe("dark")
  })

  it("exposes typeKey, deleteLetter, and submitGuess actions", () => {
    const { result } = renderHook(() => useGameDisplay())
    expect(typeof result.current.typeKey).toBe("function")
    expect(typeof result.current.deleteLetter).toBe("function")
    expect(typeof result.current.submitGuess).toBe("function")
  })
})
