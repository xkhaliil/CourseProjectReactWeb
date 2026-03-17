import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"
import { useParams, Link } from "react-router-dom"
import { useGame } from "./api"
import type { GameRecord } from "./api"
import { getErrorMessage } from "#shared/getErrorMessage"
import styles from "./GameDetail.module.css"

export const GameDetail = () => {
  const { id } = useParams<{ id: string }>()

  return (
    <ErrorBoundary
      fallbackRender={({ error, resetErrorBoundary }) => (
        <div className={styles.detailContainer}>
          <p>Something went wrong: {getErrorMessage(error)}</p>
          <button onClick={resetErrorBoundary}>Retry</button>
        </div>
      )}
    >
      <Suspense
        fallback={<div className={styles.detailContainer}>Loading...</div>}
      >
        <GameDetailInner id={id ?? ""} />
      </Suspense>
    </ErrorBoundary>
  )
}

interface GameDetailInnerProps {
  id: string
}

const GameDetailInner = ({ id }: GameDetailInnerProps) => {
  const [game] = useGame(id)

  if (!game) {
    return <div className={styles.detailContainer}>Game not found.</div>
  }

  return <GameDetailView game={game} />
}

interface GameDetailViewProps {
  game: GameRecord
}

const GameDetailView = ({ game }: GameDetailViewProps) => {
  return (
    <div className={styles.detailContainer}>
      <Link to="/leaderboard" className={styles.backLink}>
        Back to Leaderboard
      </Link>
      <h1 className={styles.title}>
        Game #{game.id} — {game.date}
      </h1>
      <p>Word: *{game.word[0]}***</p>
    </div>
  )
}
