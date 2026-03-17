import { describe, it, expect } from "vitest"
import games from "./games"

describe("shared/games registry", () => {
  it("contains at least two games", () => {
    expect(Object.keys(games).length).toBeGreaterThanOrEqual(2)
  })

  it("includes wordle and cats", () => {
    expect(games).toHaveProperty("wordle")
    expect(games).toHaveProperty("cats")
  })

  it("every game entry has a title string", () => {
    for (const [slug, game] of Object.entries(games)) {
      expect(typeof game.title, `${slug}.title`).toBe("string")
      expect(game.title.length, `${slug}.title is non-empty`).toBeGreaterThan(0)
    }
  })

  it("every game entry has a Play component (lazy or otherwise)", () => {
    for (const [slug, game] of Object.entries(games)) {
      expect(game.Play, `${slug}.Play`).toBeDefined()
    }
  })

  it("returns undefined for unknown slugs", () => {
    expect(games["not-a-real-game"]).toBeUndefined()
  })
})
