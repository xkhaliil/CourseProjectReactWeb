import catsGame from "../features/cats"
import wordleGame from "../features/game"
import { type Game } from "../features/game/types"

export type { Game }

const games: Record<string, Game> = {
  wordle: wordleGame,
  cats: catsGame,
}

export default games
