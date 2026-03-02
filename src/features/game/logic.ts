export type LetterStatus = "green" | "yellow" | "dark" | "unused"

export const evaluateGuess = (
  guessWord: string,
  secretWord: string,
): LetterStatus[] => {
  if (guessWord.trim().length === 0) {
    return Array(5).fill("unused")
  }

  const result: LetterStatus[] = Array(5).fill("dark")
  const secretLetters = secretWord.toUpperCase().split("")
  const guessLetters = guessWord.toUpperCase().split("")

  for (let i = 0; i < 5; i++) {
    if (guessLetters[i] === secretLetters[i]) {
      result[i] = "green"
      secretLetters[i] = ""
    }
  }

  for (let i = 0; i < 5; i++) {
    if (result[i] !== "green") {
      const indexInSecret = secretLetters.indexOf(guessLetters[i])
      if (indexInSecret !== -1) {
        result[i] = "yellow"
        secretLetters[indexInSecret] = ""
      }
    }
  }

  return result
}

export const calculateKeyboardState = (
  guesses: string[],
  secretWord: string,
): Record<string, LetterStatus> => {
  const keyboardState: Record<string, LetterStatus> = {}

  guesses.forEach((guess) => {
    if (guess.trim().length === 0) return

    const evaluated = evaluateGuess(guess, secretWord)
    const guessLetters = guess.toUpperCase().split("")

    for (let i = 0; i < 5; i++) {
      const letter = guessLetters[i]
      const status = evaluated[i]
      const currentStatus = keyboardState[letter] || "unused"

      if (status === "green") {
        keyboardState[letter] = "green"
      } else if (status === "yellow" && currentStatus !== "green") {
        keyboardState[letter] = "yellow"
      } else if (status === "dark" && currentStatus === "unused") {
        keyboardState[letter] = "dark"
      }
    }
  })

  return keyboardState
}
