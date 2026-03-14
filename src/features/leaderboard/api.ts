export type R6Player = {
  id: string
  kd: number
  matchesPlayed: number
  rankPoints: number
  position: number
}

export async function getR6Leaderboard(page: number = 1): Promise<R6Player[]> {
  const targetUrl = `https://api.r6data.eu/api/stats?type=leaderboards&page=${page}`
  const response = await fetch(
    `https://thingproxy.freeboard.io/fetch/${targetUrl}`,
    {
      headers: {
        "api-key": import.meta.env.VITE_R6_API_KEY as string,
      },
    },
  )

  if (!response.ok) {
    const text = await response.text()
    throw new Error(`Failled to fetch leaderboard. ${text}`)
  }

  return response.json() as Promise<R6Player[]>
}
