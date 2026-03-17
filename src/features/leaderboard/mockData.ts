import useAsync from "../../shared/useAsync"

export interface Game {
  id: string
  word: string
  date: string
}

const games: Game[] = [
  { id: "1", word: "FLAME", date: "2026-03-08" },
  { id: "2", word: "DRIFT", date: "2026-03-09" },
  { id: "3", word: "BRUSH", date: "2026-03-10" },
  { id: "4", word: "CLIMB", date: "2026-03-11" },
  { id: "5", word: "GRASP", date: "2026-03-12" },
]

export const getGame = async (id: string): Promise<Game | undefined> => {
  return games.find((g) => g.id === id)
}

export function useGame(
  id: string,
): [Game | undefined, { refresh: () => void }] {
  return useAsync(() => getGame(id), [id])
}
