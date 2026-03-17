import { describe, it, expect } from "vitest"
import * as playModule from "./index"

describe("play barrel", () => {
  it("re-exports PlayPage", () => {
    expect(typeof playModule.PlayPage).toBe("function")
  })
})
