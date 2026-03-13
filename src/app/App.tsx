import { Routes, Route } from "react-router-dom"
import { Layout } from "./Layout"
import Home from "./Home"
import PlayPage from "./PlayPage"
import { Leaderboard } from "../features/leaderboard/Leaderboard"
import { GameDetail } from "../features/leaderboard/GameDetail"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="play/:slug" element={<PlayPage />} />
        <Route path="leaderboard" element={<Leaderboard />} />
        <Route path="leaderboard/:id" element={<GameDetail />} />
      </Route>
    </Routes>
  )
}

export default App
