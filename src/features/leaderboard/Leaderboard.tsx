import { Suspense, useState } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { Link } from "react-router-dom"
import useAsync from "../../shared/useAsync"
import { getR6Leaderboard, type R6Player } from "./api"
import styles from "./Leaderboard.module.css"

export const Leaderboard = () => {
  return (
    <ErrorBoundary
      fallbackRender={({ error, resetErrorBoundary }) => (
        <div className={styles.leaderboardContainer}>
          <p>Something went wrong: {(error as Error).message}</p>
          <button onClick={resetErrorBoundary}>Retry</button>
        </div>
      )}
    >
      <Suspense
        fallback={<div className={styles.leaderboardContainer}>Loading...</div>}
      >
        <LeaderboardInner />
      </Suspense>
    </ErrorBoundary>
  )
}

const LeaderboardInner = () => {
  const [page, setPage] = useState(1)
  const [allPlayers, { refresh }] = useAsync(() => getR6Leaderboard(), [])

  if (!allPlayers)
    return <div className={styles.leaderboardContainer}>Loading...</div>

  const players = allPlayers.slice((page - 1) * 5, page * 5)

  return (
    <LeaderboardView
      players={players}
      page={page}
      setPage={setPage}
      refresh={refresh}
    />
  )
}

const LeaderboardView = ({
  players,
  page,
  setPage,
  refresh,
}: {
  players: R6Player[]
  page: number
  setPage: (page: number) => void
  refresh: () => void
}) => {
  return (
    <div className={styles.leaderboardContainer}>
      <h1 className={styles.title}>R6 Leaderboard</h1>

      <ul className={styles.gameList}>
        {players.map((player) => (
          <li key={player.id} className={styles.gameItem}>
            <div className={styles.gameHeader}>
              <span className={styles.gameLink}>
                #{player.position} — {player.id}
              </span>
            </div>
            <div className={styles.topScores}>
              <div className={styles.scoreItem}>
                <span>Rank Points</span>
                <span>{player.rankPoints}</span>
              </div>
              <div className={styles.scoreItem}>
                <span>K/D</span>
                <span>{player.kd}</span>
              </div>
              <div className={styles.scoreItem}>
                <span>Matches</span>
                <span>{player.matchesPlayed}</span>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div
        style={{
          display: "flex",
          gap: "8px",
          justifyContent: "center",
          marginTop: "16px",
        }}
      >
        <button
          onClick={() => setPage(Math.max(1, page - 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button onClick={() => setPage(page + 1)} disabled={players.length < 5}>
          Next
        </button>
        <button onClick={refresh}>Refresh</button>
      </div>

      <div style={{ marginTop: "16px", textAlign: "center" }}>
        <Link to="/leaderboard/game/1">View Game Scores</Link>
      </div>
    </div>
  )
}
