/**
 * types.ts contains only TypeScript type declarations — there is no runtime code to
 * unit test. This file exists to satisfy the "every file has a test" convention and
 * to document the shape of the Game type as a living specification.
 */
import { describe, it, expectTypeOf } from "vitest"
import type { Game } from "./types"
import wordleGame from "./index"

describe("Game type contract", () => {
  it("the Game type has a string title field", () => {
    expectTypeOf(wordleGame.title).toBeString()
  })

  it("the Game type has a Play component field", () => {
    expectTypeOf(wordleGame.Play).not.toBeUndefined()
  })

  it("a conforming object satisfies the Game type at runtime", () => {
    const game: Game = wordleGame
    expect(game.title).toBeDefined()
    expect(game.Play).toBeDefined()
  })
})
