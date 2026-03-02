// src/Keyboard.tsx
import { useRef } from "react"
import type { LetterStatus } from "./logic"
import styles from "./Keyboard.module.css"

interface KeyboardProps {
  getKeyState: (letter: string) => LetterStatus
}

type PhoneKey = {
  id: string
  label: string
  keyValue: string
  letter?: string
  special?: "backspace" | "enter"
}

const PHONE_KEYS: PhoneKey[] = [
  { id: "a", label: "A", keyValue: "A", letter: "A" },
  { id: "b", label: "B", keyValue: "B", letter: "B" },
  { id: "c", label: "C", keyValue: "C", letter: "C" },
  { id: "d", label: "D", keyValue: "D", letter: "D" },
  { id: "e", label: "E", keyValue: "E", letter: "E" },
  { id: "f", label: "F", keyValue: "F", letter: "F" },
  { id: "g", label: "G", keyValue: "G", letter: "G" },
  { id: "h", label: "H", keyValue: "H", letter: "H" },
  { id: "i", label: "I", keyValue: "I", letter: "I" },
  { id: "j", label: "J", keyValue: "J", letter: "J" },
  { id: "k", label: "K", keyValue: "K", letter: "K" },
  { id: "l", label: "L", keyValue: "L", letter: "L" },
  { id: "m", label: "M", keyValue: "M", letter: "M" },
  { id: "n", label: "N", keyValue: "N", letter: "N" },
  { id: "o", label: "O", keyValue: "O", letter: "O" },
  { id: "p", label: "P", keyValue: "P", letter: "P" },
  { id: "q", label: "Q", keyValue: "Q", letter: "Q" },
  { id: "r", label: "R", keyValue: "R", letter: "R" },
  { id: "s", label: "S", keyValue: "S", letter: "S" },
  { id: "t", label: "T", keyValue: "T", letter: "T" },
  { id: "u", label: "U", keyValue: "U", letter: "U" },
  { id: "v", label: "V", keyValue: "V", letter: "V" },
  { id: "w", label: "W", keyValue: "W", letter: "W" },
  { id: "x", label: "X", keyValue: "X", letter: "X" },
  { id: "y", label: "Y", keyValue: "Y", letter: "Y" },
  { id: "z", label: "Z", keyValue: "Z", letter: "Z" },
  { id: "backspace", label: "BKSP", keyValue: "Backspace", special: "backspace" },
  { id: "enter", label: "ENTER", keyValue: "Enter", special: "enter" },
]

export function Keyboard({ getKeyState }: KeyboardProps) {
  const cycleRef = useRef<Record<string, number>>({})

  const getKeyVisualState = (phoneKey: PhoneKey): LetterStatus => {
    if (!phoneKey.letter) {
      return "unused"
    }
    return getKeyState(phoneKey.letter)
  }

  const dispatchKey = (key: string) => {
    window.dispatchEvent(new KeyboardEvent("keydown", { key }))
  }

  const onPhoneKeyPress = (phoneKey: PhoneKey) => {
    if (phoneKey.special === "backspace" || phoneKey.special === "enter") {
      dispatchKey(phoneKey.keyValue)
      return
    }

    cycleRef.current[phoneKey.id] = (cycleRef.current[phoneKey.id] ?? 0) + 1
    dispatchKey(phoneKey.keyValue)
  }

  return (
    <div className={styles.keyboard} data-testid="phone-keypad">
      {PHONE_KEYS.map((phoneKey) => {
        const status = getKeyVisualState(phoneKey)

        const backgroundColor =
          status === "green"
            ? "#274b37"
            : status === "yellow"
              ? "#466a4c"
              : status === "dark"
                ? "#7d9478"
                : "#6d857e"

        return (
          <button
            key={phoneKey.id}
            className={styles.key}
            style={{
              backgroundColor,
            }}
            onClick={() => onPhoneKeyPress(phoneKey)}
            aria-label={phoneKey.label}
          >
            <span className={styles.keyNumber}>{phoneKey.label}</span>
          </button>
        )
      })}
    </div>
  )
}
