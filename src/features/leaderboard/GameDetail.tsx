import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { useParams, Link } from "react-router-dom"
import { useGameDetail } from "../../data/mockData"
import type { Game, Score } from "../../data/mockData"
import styles from "./GameDetail.module.css"

export const GameDetail = () => {
  const { id } = useParams<{ id: string }>()

  return (
    <ErrorBoundary
      fallbackRender={({ error, resetErrorBoundary }) => (
        <div className={styles.detailContainer}>
          <p>Something went wrong: {(error as Error).message}</p>
          <button onClick={resetErrorBoundary}>Retry</button>
        </div>
      )}
    >
      <Suspense fallback={<div className={styles.detailContainer}>Loading...</div>}>
        <GameDetailInner id={id ?? ""} />
      </Suspense>
    </ErrorBoundary>
  )
}

const GameDetailInner = ({ id }: { id: string }) => {
  const [result] = useGameDetail(id)

  if (!result) return <div className={styles.detailContainer}>Loading...</div>

  const [game, scores] = result

  if (!game) {
    return <div className={styles.detailContainer}>Loading or Game not found...</div>
  }

  return <GameDetailView game={game} scores={scores} />
}

const GameDetailView = ({ game, scores }: { game: Game; scores: Score[] }) => {
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