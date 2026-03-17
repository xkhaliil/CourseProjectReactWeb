import { describe, it, expect, vi, afterEach } from "vitest"
import { getR6Leaderboard } from "./r6"

afterEach(() => {
  vi.restoreAllMocks()
})

describe("r6 API module", () => {
  it("getR6Leaderboard returns typed player array on success", async () => {
    const mockData = [
      { id: "TopPlayer", kd: 2.1, matchesPlayed: 300, rankPoints: 6000, position: 1 },
    ]
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockData),
    } as unknown as Response)

    const result = await getR6Leaderboard()
    expect(result[0].id).toBe("TopPlayer")
    expect(result[0].kd).toBe(2.1)
    expect(result[0].position).toBe(1)
  })

  it("getR6Leaderboard throws a descriptive error on failure", async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      text: () => Promise.resolve("Server Error"),
    } as unknown as Response)

    await expect(getR6Leaderboard()).rejects.toThrow()
  })
})
