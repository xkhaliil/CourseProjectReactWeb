import { describe, it, expect } from "vitest"
import wordleGame from "./index"

describe("game/index (game registration)", () => {
  it("exports a game object with a title", () => {
    expect(wordleGame.title).toBe("Wordle")
  })

  it("exports a Play component", () => {
    expect(wordleGame.Play).toBeDefined()
  })

  it("Play is a lazy-loaded component (React lazy object shape)", () => {
    // React.lazy returns an object with $$typeof and _payload
    expect(wordleGame.Play).toHaveProperty("$$typeof")
  })
})
