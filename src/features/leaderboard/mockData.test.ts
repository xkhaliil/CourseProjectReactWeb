import { describe, expect, it } from "vitest"
import { getGame } from "./mockData"

describe("mockData helpers", () => {
  it("can fetch a game by id", async () => {
    expect((await getGame("1"))?.id).toBe("1")
    expect(await getGame("999")).toBeUndefined()
  })
})
