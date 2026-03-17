import { useEffect } from "react"
import { Guesses } from "./Guesses"
import { Keyboard } from "./Keyboard"
import { useGameDisplay } from "./useGameDisplay"
import { MAX_GUESSES } from "../../shared/config"
import styles from "./Game.module.css"

export function Game() {
  const {
    guesses,
    currentRow,
    getCellState,
    getKeyState,
    typeKey,
    deleteLetter,
    submitGuess,
  } = useGameDisplay()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentRow >= MAX_GUESSES) return
      const key = e.key.toUpperCase()

      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return
      }

      if (key === "ENTER") {
        submitGuess()
      } else if (key === "BACKSPACE") {
        deleteLetter()
      } else if (/^[A-Z]$/.test(key)) {
        typeKey(key)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentRow, typeKey, deleteLetter, submitGuess])

  return (
    <div className={styles.gameShell}>
      <div className={styles.nokiaLogo} aria-label="Phone logo">
        NOKIA
      </div>
      <section className={styles.phoneScreen}>
        <h1 className={styles.header}>word clone</h1>
        <p className={styles.subtitle}>Guess the hidden word in six tries.</p>
        <Guesses guesses={guesses} getCellState={getCellState} />
      </section>
      <Keyboard getKeyState={getKeyState} />
    </div>
  )
}
