/**
 * useGameDisplay
 *
 * Derives all display-layer state from the raw store values.
 * Keeps business logic (evaluateGuess, calculateKeyboardState) out of
 * the Game component so rendering logic and business logic stay independent.
 */
import { useGameStore } from "#shared/store"
import {
  calculateKeyboardState,
  evaluateGuess,
  type LetterStatus,
} from "./logic"

export interface GameDisplayState {
  guesses: string[]
  currentRow: number
  secretWord: string
  getCellState: (
    guessWord: string,
    position: number,
    rowIndex: number,
  ) => LetterStatus
  getKeyState: (letter: string) => LetterStatus
  typeKey: (key: string) => void
  deleteLetter: () => void
  submitGuess: () => void
}

export function useGameDisplay(): GameDisplayState {
  const {
    secretWord,
    guesses,
    currentRow,
    typeKey,
    deleteLetter,
    submitGuess,
  } = useGameStore()

  const committedGuesses = guesses.slice(0, currentRow)
  const keyboardStateMap = calculateKeyboardState(committedGuesses, secretWord)

  const getKeyState = (letter: string): LetterStatus =>
    keyboardStateMap[letter.toUpperCase()] ?? "unused"

  const getCellState = (
    guessWord: string,
    position: number,
    rowIndex: number,
  ): LetterStatus => {
    if (rowIndex >= currentRow) return "unused"
    return evaluateGuess(guessWord, secretWord)[position]
  }

  return {
    guesses,
    currentRow,
    secretWord,
    getCellState,
    getKeyState,
    typeKey,
    deleteLetter,
    submitGuess,
  }
}
