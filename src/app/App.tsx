import { Routes, Route } from "react-router-dom"
import { Game } from "../features/game/Game"
import { Leaderboard } from "../features/leaderboard/Leaderboard"
import { GameDetail } from "../features/leaderboard/GameDetail"
import { Layout } from "./Layout"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Game />} />
        <Route path="leaderboard" element={<Leaderboard />} />
        <Route path="leaderboard/:id" element={<GameDetail />} />
      </Route>
    </Routes>
  )
}

export default App
