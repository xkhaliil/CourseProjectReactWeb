import type { StateCreator } from "zustand"
import { DEFAULT_SECRET_WORD, MAX_GUESSES, WORD_LENGTH } from "../config"

export interface GameSlice {
  secretWord: string
  guesses: string[]
  currentRow: number
  typeKey: (key: string) => void
  deleteLetter: () => void
  submitGuess: () => void
  resetGame: (newSecretWord?: string) => void
}

const EMPTY_GUESS = " ".repeat(WORD_LENGTH)
const INITIAL_GUESSES = Array(MAX_GUESSES).fill(EMPTY_GUESS)

export const createGameSlice: StateCreator<GameSlice> = (set, get) => ({
  secretWord: DEFAULT_SECRET_WORD,
  guesses: INITIAL_GUESSES,
  currentRow: 0,

  typeKey: (key: string) => {
    const { guesses, currentRow } = get()
    if (currentRow >= MAX_GUESSES) return
    const currentWord = guesses[currentRow].trim()
    if (currentWord.length >= WORD_LENGTH) return
    const newGuesses = [...guesses]
    newGuesses[currentRow] = (currentWord + key).padEnd(WORD_LENGTH, " ")
    set({ guesses: newGuesses })
  },

  deleteLetter: () => {
    const { guesses, currentRow } = get()
    if (currentRow >= MAX_GUESSES) return
    const currentWord = guesses[currentRow].trim()
    if (currentWord.length === 0) return
    const newGuesses = [...guesses]
    newGuesses[currentRow] = currentWord.slice(0, -1).padEnd(WORD_LENGTH, " ")
    set({ guesses: newGuesses })
  },

  submitGuess: () => {
    const { guesses, currentRow } = get()
    if (currentRow >= MAX_GUESSES) return
    const currentWord = guesses[currentRow].trim()
    if (currentWord.length !== WORD_LENGTH) return
    set({ currentRow: currentRow + 1 })
  },

  resetGame: (newSecretWord?: string) => {
    set({
      secretWord: newSecretWord ?? DEFAULT_SECRET_WORD,
      guesses: INITIAL_GUESSES,
      currentRow: 0,
    })
  },
})
