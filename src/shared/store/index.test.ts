import { describe, it, expect, beforeEach } from "vitest"
import { renderHook } from "@testing-library/react"
import { useStore, useGameStore, useLeaderboardStore } from "./index"

describe("store/index — scoped hooks", () => {
  describe("useGameStore", () => {
    beforeEach(() => {
      useStore.getState().resetGame("CRANE")
    })

    it("exposes secretWord, guesses, and currentRow", () => {
      const { result } = renderHook(() => useGameStore())
      expect(result.current.secretWord).toBeDefined()
      expect(Array.isArray(result.current.guesses)).toBe(true)
      expect(typeof result.current.currentRow).toBe("number")
    })

    it("exposes typeKey, deleteLetter, submitGuess, resetGame actions", () => {
      const { result } = renderHook(() => useGameStore())
      expect(typeof result.current.typeKey).toBe("function")
      expect(typeof result.current.deleteLetter).toBe("function")
      expect(typeof result.current.submitGuess).toBe("function")
      expect(typeof result.current.resetGame).toBe("function")
    })

    it("does NOT expose leaderboard state (no data leakage)", () => {
      const { result } = renderHook(() => useGameStore())
      expect(result.current).not.toHaveProperty("page")
      expect(result.current).not.toHaveProperty("setPage")
    })
  })

  describe("useLeaderboardStore", () => {
    it("exposes page and pagination actions", () => {
      const { result } = renderHook(() => useLeaderboardStore())
      expect(typeof result.current.page).toBe("number")
      expect(typeof result.current.setPage).toBe("function")
      expect(typeof result.current.nextPage).toBe("function")
      expect(typeof result.current.prevPage).toBe("function")
      expect(typeof result.current.resetPage).toBe("function")
    })

    it("does NOT expose game state (no data leakage)", () => {
      const { result } = renderHook(() => useLeaderboardStore())
      expect(result.current).not.toHaveProperty("secretWord")
      expect(result.current).not.toHaveProperty("guesses")
      expect(result.current).not.toHaveProperty("typeKey")
    })
  })
})
