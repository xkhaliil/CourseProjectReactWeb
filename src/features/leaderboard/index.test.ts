import { describe, it, expect } from "vitest"
import * as leaderboardModule from "./index"

describe("leaderboard barrel", () => {
  it("re-exports Leaderboard", () => {
    expect(typeof leaderboardModule.Leaderboard).toBe("function")
  })

  it("re-exports GameDetail", () => {
    expect(typeof leaderboardModule.GameDetail).toBe("function")
  })
})
