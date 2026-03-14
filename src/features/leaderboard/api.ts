export type R6Player = {
  id: string
  kd: number
  matchesPlayed: number
  rankPoints: number
  position: number
}

export async function getR6Leaderboard(page: number = 1): Promise<R6Player[]> {
  const validPage = Math.max(1, Math.floor(page))

  if (import.meta.env.DEV) {
    const response = await fetch(
      `/r6api/api/stats?type=leaderboards&page=${validPage}`,
      {
        headers: {
          "api-key": import.meta.env.VITE_R6_API_KEY as string,
        },
      },
    )

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
