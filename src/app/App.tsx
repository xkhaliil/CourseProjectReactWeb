import { Routes, Route } from "react-router-dom"
import { Layout } from "./Layout"
import { HomePage } from "../features/home"
import { PlayPage } from "../features/play"
import { Leaderboard, GameDetail } from "../features/leaderboard"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="play/:slug" element={<PlayPage />} />
        <Route path="leaderboard" element={<Leaderboard />} />
        <Route path="leaderboard/:id" element={<GameDetail />} />
      </Route>
    </Routes>
  )
}

export default App
