export type R6Player = {
  id: string
  kd: number
  matchesPlayed: number
  rankPoints: number
  position: number
}

export async function getR6Leaderboard(page: number = 1): Promise<R6Player[]> {
  const validPage = Math.max(1, Math.floor(page))
  const url = import.meta.env.DEV
    ? `/r6api/api/stats?type=leaderboards&page=${validPage}`
    : `https://api.r6data.eu/api/stats?type=leaderboards&page=${validPage}`
  const response = await fetch(url, {
    headers: {
      "api-key": import.meta.env.VITE_R6_API_KEY as string,
    },
  })

  if (!response.ok) {
    const text = await response.text()
    throw new Error(`Failled to fetch leaderboard. ${text}`)
  }

  return response.json() as Promise<R6Player[]>
}
