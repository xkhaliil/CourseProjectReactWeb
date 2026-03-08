import { render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { Guesses } from "./Guesses"
import type { LetterStatus } from "./logic"

describe("Guesses", () => {
  it("smoke test: renders a 6x5 grid", () => {
    const getCellState = vi.fn<
      (guessWord: string, position: number, rowIndex: number) => LetterStatus
    >(() => "unused")

    render(
      <Guesses
        guesses={["HELLO", "WORLD"]}
        getCellState={getCellState}
      />,
    )

    const container = screen.getByTestId("guesses-container")
    expect(container.querySelectorAll("span")).toHaveLength(30)
  })

  it("calls getCellState with row and position for each cell", () => {
    const getCellState = vi.fn<
      (guessWord: string, position: number, rowIndex: number) => LetterStatus
    >(() => "unused")

    render(
      <Guesses
        guesses={["ABCDE"]}
        getCellState={getCellState}
      />,
    )

    expect(getCellState).toHaveBeenCalledWith("ABCDE", 0, 0)
    expect(getCellState).toHaveBeenCalledWith("ABCDE", 4, 0)
    expect(getCellState).toHaveBeenCalledTimes(30)
  })
})
