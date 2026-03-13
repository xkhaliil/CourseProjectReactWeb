import { lazy } from "react"
import { type Game } from "./types"

const game: Game = {
  title: "Wordle",
  Play: lazy(() => import("./Game").then((m) => ({ default: m.Game }))),
}

export default game