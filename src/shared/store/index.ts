import { create } from "zustand"
import { createGameSlice, type GameSlice } from "./gameSlice"
import {
  createLeaderboardSlice,
  type LeaderboardSlice,
} from "./leaderboardSlice"

type AppStore = GameSlice & LeaderboardSlice

export const useStore = create<AppStore>((...args) => ({
  ...createGameSlice(...args),
  ...createLeaderboardSlice(...args),
}))

export const useGameStore = () => ({
  secretWord: useStore((s) => s.secretWord),
  guesses: useStore((s) => s.guesses),
  currentRow: useStore((s) => s.currentRow),
  typeKey: useStore((s) => s.typeKey),
  deleteLetter: useStore((s) => s.deleteLetter),
  submitGuess: useStore((s) => s.submitGuess),
  resetGame: useStore((s) => s.resetGame),
})

export const useLeaderboardStore = () => ({
  page: useStore((s) => s.page),
  setPage: useStore((s) => s.setPage),
  nextPage: useStore((s) => s.nextPage),
  prevPage: useStore((s) => s.prevPage),
  resetPage: useStore((s) => s.resetPage),
})
