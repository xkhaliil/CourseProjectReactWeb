import useAsync from "../../shared/useAsync"

export type R6Player = {
  id: string
  kd: number
  matchesPlayed: number
  rankPoints: number
  position: number
}

export async function getR6Leaderboard(): Promise<R6Player[]> {
  if (import.meta.env.DEV) {
    const response = await fetch(`/r6api/api/stats?type=leaderboards&page=1`, {
      headers: {
        "api-key": import.meta.env.VITE_R6_API_KEY as string,
      },
    })

    if (!response.ok) {
      const text = await response.text()
      throw new Error(`Failed to fetch leaderboard. ${text}`)
    }

    return response.json() as Promise<R6Player[]>
  }

  const response = await fetch(
    `${import.meta.env.BASE_URL}data/leaderboard.json`,
  )

  if (!response.ok) {
    throw new Error(`Failed to fetch leaderboard data.`)
  }

  return response.json() as Promise<R6Player[]>
}

export function useR6Leaderboard(): [
  R6Player[] | undefined,
  { refresh: () => void },
] {
  return useAsync(getR6Leaderboard)
}
