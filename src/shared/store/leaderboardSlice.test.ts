import { describe, it, expect, beforeEach } from "vitest"
import { create } from "zustand"
import { createLeaderboardSlice, type LeaderboardSlice } from "./leaderboardSlice"

function makeStore() {
  return create<LeaderboardSlice>()((...args) =>
    createLeaderboardSlice(...args),
  )
}

describe("leaderboardSlice", () => {
  let store: ReturnType<typeof makeStore>

  beforeEach(() => {
    store = makeStore()
  })

  it("initialises on page 1", () => {
    expect(store.getState().page).toBe(1)
  })

  it("setPage jumps to an arbitrary page", () => {
    store.getState().setPage(5)
    expect(store.getState().page).toBe(5)
  })

  it("nextPage increments the page", () => {
    store.getState().nextPage()
    expect(store.getState().page).toBe(2)
  })

  it("prevPage decrements the page", () => {
    store.getState().setPage(3)
    store.getState().prevPage()
    expect(store.getState().page).toBe(2)
  })

  it("prevPage does not go below page 1", () => {
    store.getState().prevPage()
    expect(store.getState().page).toBe(1)
  })

  it("resetPage returns to page 1 from any page", () => {
    store.getState().setPage(10)
    store.getState().resetPage()
    expect(store.getState().page).toBe(1)
  })
})
