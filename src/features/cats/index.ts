import { lazy } from "react"
import { type Game } from "../game/types"

const game: Game = {
  title: "Cats",
  Play: lazy(() => import("./CatsPage").then((m) => ({ default: m.CatsPage }))),
}

export default game
