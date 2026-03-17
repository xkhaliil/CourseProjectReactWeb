import { describe, it, expect } from "vitest"
import * as api from "./index"

describe("leaderboard/api barrel", () => {
  it("re-exports getR6Leaderboard", () => {
    expect(typeof api.getR6Leaderboard).toBe("function")
  })

  it("re-exports useR6Leaderboard", () => {
    expect(typeof api.useR6Leaderboard).toBe("function")
  })

  it("re-exports getGame", () => {
    expect(typeof api.getGame).toBe("function")
  })

  it("re-exports useGame", () => {
    expect(typeof api.useGame).toBe("function")
  })
})
