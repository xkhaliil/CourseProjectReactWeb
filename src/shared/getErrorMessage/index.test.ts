import { describe, it, expect } from "vitest"
import { getErrorMessage } from "./index"

describe("getErrorMessage", () => {
  it("returns the message from an Error instance", () => {
    expect(getErrorMessage(new Error("boom"))).toBe("boom")
  })

  it("returns a plain string as-is", () => {
    expect(getErrorMessage("something broke")).toBe("something broke")
  })

  it("returns a fallback for unknown values", () => {
    expect(getErrorMessage(42)).toBe("An unexpected error occurred.")
    expect(getErrorMessage(null)).toBe("An unexpected error occurred.")
    expect(getErrorMessage(undefined)).toBe("An unexpected error occurred.")
    expect(getErrorMessage({ code: 500 })).toBe("An unexpected error occurred.")
  })
})
