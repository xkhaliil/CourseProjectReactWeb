import { describe, it, expect } from "vitest"
import catsGame from "./index"

describe("cats/index (game registration)", () => {
  it("exports a game object with title Cats", () => {
    expect(catsGame.title).toBe("Cats")
  })

  it("exports a Play component", () => {
    expect(catsGame.Play).toBeDefined()
  })

  it("Play is a lazy-loaded component (React lazy object shape)", () => {
    expect(catsGame.Play).toHaveProperty("$$typeof")
  })
})
