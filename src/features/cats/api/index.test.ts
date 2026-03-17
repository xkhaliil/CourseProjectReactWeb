import { describe, it, expect } from "vitest"
import * as catsApi from "./index"

describe("cats/api barrel", () => {
  it("re-exports getCat", () => {
    expect(typeof catsApi.getCat).toBe("function")
  })

  it("re-exports useCat", () => {
    expect(typeof catsApi.useCat).toBe("function")
  })
})
