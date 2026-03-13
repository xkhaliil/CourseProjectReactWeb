import { lazy } from "react"
import { type Game } from "../game/types"

const game: Game = {
  title: "Cats",
  Play: lazy(() => import("./Play")),
}

export default game
