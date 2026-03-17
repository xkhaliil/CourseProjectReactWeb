import { Suspense } from "react"
import { Link, useParams } from "react-router-dom"
import games from "../../shared/games"

export function PlayPage() {
  const { slug } = useParams()

  const game = slug && games[slug]
  if (!game) {
    return (
      <>
        <h1>Error</h1>
        <p>Cannot find game {slug}.</p>
        <p>
          <Link to="/">Go Home</Link>
        </p>
      </>
    )
  }

  const { title, Play } = game

  return (
    <>
      <h1>Play {title}</h1>
      <Suspense fallback={<p>Loading game…</p>}>
        <Play />
      </Suspense>
    </>
  )
}
