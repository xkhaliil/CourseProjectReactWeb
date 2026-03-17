import { describe, it, expect } from "vitest"
import useAsync from "./index"

describe("useAsync barrel", () => {
  it("re-exports useAsync as the default export", () => {
    expect(typeof useAsync).toBe("function")
  })
})
