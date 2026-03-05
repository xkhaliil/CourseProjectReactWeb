import { useMemo } from "react"
import { getGames, getTopScores } from "../../data/mockData"
import styles from "./Leaderboard.module.css"
import { Link } from "react-router-dom"

export const Leaderboard = () => {
  const games = useMemo(() => {
    const gamesData = getGames()
    return gamesData.map((game) => ({
      game,
      topScores: getTopScores(game.id, 3),
    }))
  }, [])

  return (
    <div className={styles.leaderboardContainer}>
      <h1 className={styles.title}>Leaderboard</h1>
      <ul className={styles.gameList}>
        {games.map(({ game, topScores }) => (
          <li key={game.id} className={styles.gameItem}>
            <div className={styles.gameHeader}>
              <Link to={`/leaderboard/${game.id}`} className={styles.gameLink}>
                Game #{game.id} - {game.date}
              </Link>
            </div>
            <div className={styles.topScores}>
              <h4>Top 3 Scorers</h4>
              {topScores.map((score, index) => (
                <div key={score.id} className={styles.scoreItem}>
                  <span>
                    {index + 1}. {score.userId}
                  </span>
                  <span>
                    {score.guesses} guesses ({score.duration}s)
                  </span>
                </div>
              ))}
              {topScores.length === 0 && <div>No scores yet</div>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
