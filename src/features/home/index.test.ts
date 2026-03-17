import { describe, it, expect } from "vitest"
import * as homeModule from "./index"

describe("home barrel", () => {
  it("re-exports HomePage", () => {
    expect(typeof homeModule.HomePage).toBe("function")
  })
})
