import { describe, it, expect } from "vitest"
import { getGame } from "./games"

describe("getGame", () => {
  it("returns a game record for a known id", async () => {
    const game = await getGame("1")
    expect(game).toBeDefined()
    expect(game?.id).toBe("1")
    expect(typeof game?.word).toBe("string")
    expect(typeof game?.date).toBe("string")
  })

  it("returns undefined for an unknown id", async () => {
    expect(await getGame("999")).toBeUndefined()
  })

  it("returns all five seeded records", async () => {
    const ids = await Promise.all(["1", "2", "3", "4", "5"].map(getGame))
    ids.forEach((g) => expect(g).toBeDefined())
  })
})
