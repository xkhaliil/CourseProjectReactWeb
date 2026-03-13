import { describe, expect, it } from "vitest"
import { getGame, getGames, getScores, getTopScores } from "./mockData"

describe("mockData helpers", () => {
  it("returns games and can fetch one by id", async () => {
    const games = await getGames()
    expect(games.length).toBeGreaterThan(0)
    expect((await getGame("1"))?.id).toBe("1")
    expect(await getGame("999")).toBeUndefined()
  })

  it("returns sorted scores and respects top score limit", async () => {
    const scores = getScores("1")
    const topThree = await getTopScores("1", 3)

    expect(topThree.length).toBeLessThanOrEqual(3)
    expect(scores.length).toBeGreaterThanOrEqual(topThree.length)

    for (let i = 1; i < scores.length; i++) {
      const previous = scores[i - 1]
      const current = scores[i]
      const orderedByGuesses = previous.guesses <= current.guesses
      const tieBreakByDuration =
        previous.guesses < current.guesses ||
        previous.duration <= current.duration

      expect(orderedByGuesses && tieBreakByDuration).toBe(true)
    }
  })
})
