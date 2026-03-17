import type { StateCreator } from "zustand"

export interface LeaderboardSlice {
  page: number
  setPage: (page: number) => void
  nextPage: () => void
  prevPage: () => void
  resetPage: () => void
}

export const createLeaderboardSlice: StateCreator<LeaderboardSlice> = (
  set,
  get,
) => ({
  page: 1,

  setPage: (page: number) => set({ page }),

  nextPage: () => set({ page: get().page + 1 }),

  prevPage: () => set({ page: Math.max(1, get().page - 1) }),

  resetPage: () => set({ page: 1 }),
})
