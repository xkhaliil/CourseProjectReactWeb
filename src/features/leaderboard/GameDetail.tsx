import { useMemo } from "react"
import { useParams, Link } from "react-router-dom"
import { getGame, getTopScores } from "../../data/mockData"
import styles from "./GameDetail.module.css"

export const GameDetail = () => {
  const { id } = useParams<{ id: string }>()

  const game = useMemo(() => (id ? getGame(id) : null), [id])
  const scores = useMemo(() => (id ? getTopScores(id, 10) : []), [id])

  if (!game) {
    return (
      <div className={styles.detailContainer}>Loading or Game not found...</div>
    )
  }

  return (
    <div className={styles.detailContainer}>
      <Link to="/leaderboard" className={styles.backLink}>
        Back to Leaderboard
      </Link>
      <h1 className={styles.title}>
        Game #{game.id} - {game.date}
      </h1>
      <p>Word: *{game.word[0]}***</p>
      <ul className={styles.scoreList}>
        {scores.map((score, index) => (
          <li key={score.id} className={styles.scoreItem}>
            <span className={styles.rank}>#{index + 1}</span>
            <span className={styles.user}>{score.userId}</span>
            <span className={styles.stats}>
              {score.guesses} guesses ({score.duration}s)
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
