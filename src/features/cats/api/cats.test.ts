import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { getCat } from "./cats"

describe("getCat", () => {
  beforeEach(() => {
    vi.useFakeTimers()
    global.fetch = vi.fn()
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  it("returns a cat object with a url on success", async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: true,
      url: "https://cataas.com/cat?v=123",
    } as Response)

    // Advance the fake timer past the 1 s delay inside getCat
    const promise = getCat()
    vi.advanceTimersByTime(1100)
    const cat = await promise

    expect(cat).toHaveProperty("url")
    expect(cat.url).toMatch(/cataas\.com/)
  })

  it("throws when the fetch response is not ok", async () => {
    vi.mocked(fetch).mockResolvedValue({
      ok: false,
      statusText: "Not Found",
    } as Response)

    const promise = getCat()
    vi.advanceTimersByTime(1100)

    await expect(promise).rejects.toThrow("Cannot get cat")
  })
})
