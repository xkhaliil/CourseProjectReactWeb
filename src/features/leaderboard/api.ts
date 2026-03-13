export type R6Player = {
  id: string
  kd: number
  matchesPlayed: number
  rankPoints: number
  position: number
}

export async function getR6Leaderboard(page: number = 1): Promise<R6Player[]> {
  const response = await fetch(
    `https://api.r6data.eu/api/stats?type=leaderboards&page=${page}`,
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