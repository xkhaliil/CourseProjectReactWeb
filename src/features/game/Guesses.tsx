import type { LetterStatus } from "./logic"
import { MAX_GUESSES, WORD_LENGTH } from "../../shared/config"
import styles from "./Guesses.module.css"

interface GuessesProps {
  guesses: string[]
  getCellState: (
    guessWord: string,
    position: number,
    rowIndex: number,
  ) => LetterStatus
}

export function Guesses({ guesses, getCellState }: GuessesProps) {
  const displayGuesses = Array.from(
    { length: MAX_GUESSES },
    (_, i) => guesses[i] || " ".repeat(WORD_LENGTH),
  )

  return (
    <div className={styles.guesses} data-testid="guesses-container">
      {displayGuesses.map((guessWord, rowIndex) => (
        <div key={rowIndex} className={styles.row}>
          {guessWord.split("").map((letter, letterIndex) => {
            const status = getCellState(guessWord, letterIndex, rowIndex)

            const backgroundColor =
              status === "green"
                ? "#274b37"
                : status === "yellow"
                  ? "#466a4c"
                  : status === "dark"
                    ? "#7d9478"
                    : "transparent"

            const borderColor =
              status === "unused" && letter.trim()
                ? "#42604c"
                : status === "unused"
                  ? "#355846"
                  : "transparent"
            return (
              <span
                key={letterIndex}
                className={styles.letter}
                style={{
                  backgroundColor,
                  borderColor: borderColor,
                }}
              >
                {letter}
              </span>
            )
          })}
        </div>
      ))}
    </div>
  )
}
